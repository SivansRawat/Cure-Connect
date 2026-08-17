import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { doctor } = await getDoctorById(id);
  const formattedName = doctor?.name?.startsWith("Dr.")
    ? doctor.name
    : `Dr. ${doctor?.name || "Doctor"}`;

  return {
    title: `${formattedName} - CureConnect`,
    description: `Book an appointment with ${formattedName}, ${doctor?.specialty} specialist with ${doctor?.experience} years of experience.`,
  };
}

export default async function DoctorProfileLayout({ children, params }) {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");

  const formattedName = doctor?.name?.startsWith("Dr.")
    ? doctor.name
    : `Dr. ${doctor.name}`;

  return (
    <div className="container mx-auto">
      <PageHeader
        title={formattedName}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Back to ${doctor.specialty}`}
      />

      {children}
    </div>
  );
}
