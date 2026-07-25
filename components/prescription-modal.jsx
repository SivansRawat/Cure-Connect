"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Stethoscope, Printer, CheckCircle, Loader2 } from "lucide-react";
import { createPrescription } from "@/actions/prescriptions";
import { toast } from "sonner";

export default function PrescriptionModal({ appointment, userRole, existingPrescription }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [diagnosis, setDiagnosis] = useState(existingPrescription?.diagnosis || "");
  const [medications, setMedications] = useState(existingPrescription?.medications || "");
  const [instructions, setInstructions] = useState(existingPrescription?.instructions || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis.trim() || !medications.trim()) {
      toast.error("Please enter both diagnosis and medications.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("appointmentId", appointment.id);
      formData.append("diagnosis", diagnosis);
      formData.append("medications", medications);
      formData.append("instructions", instructions);

      const res = await createPrescription(formData);
      if (res.success) {
        toast.success("Digital Prescription issued successfully!");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to issue prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isDoctor = userRole === "DOCTOR";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-700/40 hover:bg-emerald-900/30 text-emerald-300 flex items-center gap-1.5"
        >
          <FileText className="h-4 w-4 text-emerald-400" />
          {existingPrescription ? "View Prescription" : isDoctor ? "Issue Prescription" : "View Prescription"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-card border-emerald-900/40 text-white">
        <DialogHeader className="border-b border-emerald-900/30 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-emerald-400" />
              Digital Clinical Prescription
            </DialogTitle>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
              Cure-Connect Medical Rx
            </Badge>
          </div>
        </DialogHeader>

        {isDoctor && !existingPrescription ? (
          /* Form for doctor to issue prescription */
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-emerald-300 block mb-1">
                Clinical Diagnosis *
              </label>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Acute Sinusitis, Mild Hypertension..."
                required
                className="w-full h-20 bg-background border border-emerald-900/40 rounded-md p-3 text-sm text-white placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-300 block mb-1">
                Prescribed Medications & Dosage *
              </label>
              <textarea
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="e.g. 1. Amoxicillin 500mg - 1 tablet 3x daily for 7 days&#10;2. Paracetamol 500mg - as needed for fever"
                required
                className="w-full h-28 bg-background border border-emerald-900/40 rounded-md p-3 text-sm text-white placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-300 block mb-1">
                Special Instructions & Follow-up
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Drink plenty of fluids, rest for 3 days. Follow up in 1 week if symptoms persist."
                className="w-full h-20 bg-background border border-emerald-900/40 rounded-md p-3 text-sm text-white placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    Issuing Rx...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Save & Issue Prescription
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          /* View Mode for Patient & Doctor */
          <div className="space-y-6 pt-2 print:text-black">
            <div className="bg-emerald-950/30 border border-emerald-800/30 p-4 rounded-lg space-y-2">
              <div className="grid grid-cols-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-semibold text-emerald-300">Doctor:</span>{" "}
                  {appointment?.doctor?.name || "Verified Practitioner"}
                </div>
                <div>
                  <span className="font-semibold text-emerald-300">Patient:</span>{" "}
                  {appointment?.patient?.name || "Patient"}
                </div>
                <div>
                  <span className="font-semibold text-emerald-300">Date:</span>{" "}
                  {new Date(appointment?.startTime || Date.now()).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold text-emerald-300">Rx ID:</span>{" "}
                  {existingPrescription?.id?.substring(0, 8) || appointment?.id?.substring(0, 8)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Diagnosis
              </h4>
              <p className="text-sm bg-background border border-emerald-900/30 p-3 rounded-md text-white">
                {existingPrescription?.diagnosis || "Consultation Completed"}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Prescribed Medications
              </h4>
              <pre className="text-sm bg-background border border-emerald-900/30 p-3 rounded-md text-white whitespace-pre-wrap font-sans">
                {existingPrescription?.medications || "No medications specified."}
              </pre>
            </div>

            {existingPrescription?.instructions && (
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Instructions
                </h4>
                <p className="text-sm bg-background border border-emerald-900/30 p-3 rounded-md text-white">
                  {existingPrescription.instructions}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-emerald-900/30 pt-4">
              <span className="text-xs text-muted-foreground">
                Official Digital Prescription • Cure-Connect Telemedicine
              </span>
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="border-emerald-700/40 text-emerald-300 hover:bg-emerald-900/30"
              >
                <Printer className="h-4 w-4 mr-1.5" />
                Print / Save PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
