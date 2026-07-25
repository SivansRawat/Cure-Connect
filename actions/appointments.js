"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deductCreditsForAppointment } from "@/actions/credits";
import { Vonage } from "@vonage/server-sdk";
import { addDays, addMinutes, format, isBefore, endOfDay } from "date-fns";
import { Auth } from "@vonage/auth";

// Initialize Vonage Video API client
const credentials = new Auth({
  applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY,
});
const options = {};
const vonage = new Vonage(credentials, options);

/**
 * Book a new appointment with a doctor (Atomic Transaction)
 */
export async function bookAppointment(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const doctorId = formData.get("doctorId");
    const startTime = new Date(formData.get("startTime"));
    const endTime = new Date(formData.get("endTime"));
    const patientDescription = formData.get("description") || null;

    if (!doctorId || !startTime || !endTime) {
      throw new Error("Doctor, start time, and end time are required");
    }

    // Generate video session ID (Vonage or fallback)
    const sessionId = await createVideoSession();

    // Execute atomic transaction for slot check, credit transfer, and appointment creation
    const appointment = await db.$transaction(async (tx) => {
      // 1. Get patient
      const patient = await tx.user.findUnique({
        where: { clerkUserId: userId, role: "PATIENT" },
      });

      if (!patient) {
        throw new Error("Patient not found");
      }

      if (patient.credits < 2) {
        throw new Error("Insufficient credits to book an appointment");
      }

      // 2. Check doctor verification
      const doctor = await tx.user.findUnique({
        where: {
          id: doctorId,
          role: "DOCTOR",
          verificationStatus: "VERIFIED",
        },
      });

      if (!doctor) {
        throw new Error("Doctor not found or not verified");
      }

      // 3. Check overlapping appointment
      const overlappingAppointment = await tx.appointment.findFirst({
        where: {
          doctorId: doctorId,
          status: "SCHEDULED",
          OR: [
            { startTime: { lte: startTime }, endTime: { gt: startTime } },
            { startTime: { lt: endTime }, endTime: { gte: endTime } },
            { startTime: { gte: startTime }, endTime: { lte: endTime } },
          ],
        },
      });

      if (overlappingAppointment) {
        throw new Error("This time slot is already booked");
      }

      // 4. Create credit deduction & addition transactions
      await tx.creditTransaction.create({
        data: {
          userId: patient.id,
          amount: -2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      await tx.creditTransaction.create({
        data: {
          userId: doctor.id,
          amount: 2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // 5. Update credit balances
      await tx.user.update({
        where: { id: patient.id },
        data: { credits: { decrement: 2 } },
      });

      await tx.user.update({
        where: { id: doctor.id },
        data: { credits: { increment: 2 } },
      });

      // 6. Create appointment record
      const newAppointment = await tx.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: doctor.id,
          startTime,
          endTime,
          patientDescription,
          status: "SCHEDULED",
          videoSessionId: sessionId,
        },
      });

      return newAppointment;
    });

    revalidatePath("/appointments");
    return { success: true, appointment };
  } catch (error) {
    console.error("Failed to book appointment:", error);
    throw new Error("Failed to book appointment: " + error.message);
  }
}

/**
 * Generate a Vonage Video API session (with fallback)
 */
async function createVideoSession() {
  try {
    if (
      process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID &&
      process.env.VONAGE_PRIVATE_KEY &&
      !process.env.VONAGE_PRIVATE_KEY.includes("your-vonage")
    ) {
      const session = await vonage.video.createSession({ mediaMode: "routed" });
      return session.sessionId;
    }
  } catch (error) {
    console.warn("Vonage Video Session creation failed, using mock session:", error.message);
  }
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a token for a video session
 */
export async function generateVideoToken(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appointmentId = formData.get("appointmentId");

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.doctorId !== user.id && appointment.patientId !== user.id) {
      throw new Error("You are not authorized to join this call");
    }

    if (appointment.status !== "SCHEDULED") {
      throw new Error("This appointment is not currently scheduled");
    }

    let token = null;
    try {
      if (
        process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID &&
        process.env.VONAGE_PRIVATE_KEY &&
        !process.env.VONAGE_PRIVATE_KEY.includes("your-vonage")
      ) {
        const connectionData = JSON.stringify({
          name: user.name,
          role: user.role,
          userId: user.id,
        });

        token = vonage.video.generateClientToken(appointment.videoSessionId, {
          role: "publisher",
          expireTime: Math.floor(new Date(appointment.endTime).getTime() / 1000) + 3600,
          data: connectionData,
        });
      }
    } catch (err) {
      console.warn("Vonage token generation failed, using mock token fallback:", err.message);
    }

    if (!token) {
      token = `mock_token_${user.id}_${Date.now()}`;
    }

    await db.appointment.update({
      where: { id: appointmentId },
      data: { videoSessionToken: token },
    });

    return {
      success: true,
      videoSessionId: appointment.videoSessionId,
      token,
    };
  } catch (error) {
    console.error("Failed to generate video token:", error);
    throw new Error("Failed to generate video token: " + error.message);
  }
}

/**
 * Get doctor by ID
 */
export async function getDoctorById(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return { doctor };
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    throw new Error("Failed to fetch doctor details");
  }
}

/**
 * Get available time slots for booking for the next 4 days
 */
export async function getAvailableTimeSlots(doctorId) {
  try {
    // Validate doctor existence and verification
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    // Fetch a single availability record
    const availability = await db.availability.findFirst({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
      },
    });

    if (!availability) {
      throw new Error("No availability set by doctor");
    }

    // Get the next 4 days
    const now = new Date();
    const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];

    // Fetch existing appointments for the doctor over the next 4 days
    const lastDay = endOfDay(days[3]);
    const existingAppointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
        startTime: {
          lte: lastDay,
        },
      },
    });

    const availableSlotsByDay = {};

    // For each of the next 4 days, generate available slots
    for (const day of days) {
      const dayString = format(day, "yyyy-MM-dd");
      availableSlotsByDay[dayString] = [];

      // Create a copy of the availability start/end times for this day
      const availabilityStart = new Date(availability.startTime);
      const availabilityEnd = new Date(availability.endTime);

      // Set the day to the current day we're processing
      availabilityStart.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );
      availabilityEnd.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );

      let current = new Date(availabilityStart);
      const end = new Date(availabilityEnd);

      while (
        isBefore(addMinutes(current, 30), end) ||
        +addMinutes(current, 30) === +end
      ) {
        const next = addMinutes(current, 30);

        // Skip past slots
        if (isBefore(current, now)) {
          current = next;
          continue;
        }

        const overlaps = existingAppointments.some((appointment) => {
          const aStart = new Date(appointment.startTime);
          const aEnd = new Date(appointment.endTime);

          return (
            (current >= aStart && current < aEnd) ||
            (next > aStart && next <= aEnd) ||
            (current <= aStart && next >= aEnd)
          );
        });

        if (!overlaps) {
          availableSlotsByDay[dayString].push({
            startTime: current.toISOString(),
            endTime: next.toISOString(),
            formatted: `${format(current, "h:mm a")} - ${format(
              next,
              "h:mm a"
            )}`,
            day: format(current, "EEEE, MMMM d"),
          });
        }

        current = next;
      }
    }

    // Convert to array of slots grouped by day for easier consumption by the UI
    const result = Object.entries(availableSlotsByDay).map(([date, slots]) => ({
      date,
      displayDate:
        slots.length > 0
          ? slots[0].day
          : format(new Date(date), "EEEE, MMMM d"),
      slots,
    }));

    return { days: result };
  } catch (error) {
    console.error("Failed to fetch available slots:", error);
    throw new Error("Failed to fetch available time slots: " + error.message);
  }
}
