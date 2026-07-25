"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Issue or update a digital prescription for an appointment
 */
export async function createPrescription(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || user.role !== "DOCTOR") {
      throw new Error("Only verified doctors can issue prescriptions.");
    }

    const appointmentId = formData.get("appointmentId");
    const diagnosis = formData.get("diagnosis");
    const medications = formData.get("medications");
    const instructions = formData.get("instructions") || "";

    if (!appointmentId || !diagnosis || !medications) {
      throw new Error("Appointment ID, diagnosis, and medications are required.");
    }

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.doctorId !== user.id) {
      throw new Error("You are not the assigned doctor for this appointment.");
    }

    const prescription = await db.prescription.upsert({
      where: { appointmentId },
      update: {
        diagnosis,
        medications,
        instructions,
      },
      create: {
        appointmentId,
        doctorId: user.id,
        patientId: appointment.patientId,
        diagnosis,
        medications,
        instructions,
      },
    });

    // Mark appointment as COMPLETED when prescription is issued
    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "COMPLETED" },
    });

    revalidatePath("/appointments");
    revalidatePath("/doctor/appointments");

    return { success: true, prescription };
  } catch (error) {
    console.error("Failed to issue prescription:", error);
    throw new Error("Failed to issue prescription: " + error.message);
  }
}

/**
 * Fetch prescription for a specific appointment
 */
export async function getPrescription(appointmentId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const prescription = await db.prescription.findUnique({
      where: { appointmentId },
      include: {
        appointment: {
          include: {
            doctor: true,
            patient: true,
          },
        },
      },
    });

    return { success: true, prescription };
  } catch (error) {
    console.error("Failed to fetch prescription:", error);
    return { success: false, error: error.message };
  }
}
