"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, History } from "lucide-react";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const upcoming = data?.upcoming || [];
  const past = data?.past || [];

  return (
    <Tabs defaultValue="upcoming" className="space-y-4">
      <TabsList className="bg-muted/30 border border-emerald-900/30 p-1">
        <TabsTrigger value="upcoming" className="flex items-center gap-2 px-4 py-2">
          <Clock className="h-4 w-4 text-emerald-400" />
          <span>Upcoming Appointments ({upcoming.length})</span>
        </TabsTrigger>
        <TabsTrigger value="past" className="flex items-center gap-2 px-4 py-2">
          <History className="h-4 w-4 text-emerald-400" />
          <span>Past Appointments ({past.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        <Card className="border-emerald-900/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
              Upcoming Scheduled Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading appointments...</p>
              </div>
            ) : upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="DOCTOR"
                    refetchAppointments={fetchAppointments}
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
                  You don&apos;t have any scheduled upcoming appointments. Make sure
                  you&apos;ve set your availability to allow patients to book.
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
              Past & Completed Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading appointments...</p>
              </div>
            ) : past.length > 0 ? (
              <div className="space-y-4">
                {past.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="DOCTOR"
                    refetchAppointments={fetchAppointments}
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
                  Completed or past consultations will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
