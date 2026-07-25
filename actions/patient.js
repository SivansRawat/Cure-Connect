import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Get all appointments for the authenticated patient
 */
export async function getPatientAppointments() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("Patient not found");
    }

    const now = new Date();

    const allAppointments = await db.appointment.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            imageUrl: true,
          },
        },
        prescription: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    const upcoming = allAppointments.filter(
      (app) => app.status === "SCHEDULED" && new Date(app.endTime) >= now
    );

    const past = allAppointments.filter(
      (app) => app.status !== "SCHEDULED" || new Date(app.endTime) < now
    );

    return { upcoming, past, appointments: allAppointments };
  } catch (error) {
    console.error("Failed to get patient appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}
