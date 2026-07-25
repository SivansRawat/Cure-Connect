import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { History, Clock } from "lucide-react";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { upcoming = [], past = [], error } = await getPatientAppointments();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar />}
        title="My Appointments"
        backLink="/doctors"
        backLabel="Find Doctors"
      />

      {error ? (
        <Card className="border-red-900/40 bg-red-950/20">
          <CardContent className="text-center py-8">
            <p className="text-red-400">Error: {error}</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-muted/30 border border-emerald-900/30 p-1">
            <TabsTrigger value="upcoming" className="flex items-center gap-2 px-4 py-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Upcoming Appointments ({upcoming.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2 px-4 py-2">
              <History className="h-4 w-4 text-emerald-400" />
              <span>Past & Completed ({past.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="border-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
                  Upcoming Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcoming.length > 0 ? (
                  <div className="space-y-4">
                    {upcoming.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        userRole="PATIENT"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-xl font-medium text-white mb-2">
                      No upcoming appointments
                    </h3>
                    <p className="text-muted-foreground">
                      You don&apos;t have any scheduled upcoming appointments. Browse our
                      doctors and book your next consultation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card className="border-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <History className="h-5 w-5 mr-2 text-emerald-400" />
                  Past & Completed History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {past.length > 0 ? (
                  <div className="space-y-4">
                    {past.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        userRole="PATIENT"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-xl font-medium text-white mb-2">
                      No past appointments history
                    </h3>
                    <p className="text-muted-foreground">
                      Your completed or past appointment records will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
