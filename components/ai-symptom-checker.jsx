"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Stethoscope,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analyzeSymptoms } from "@/actions/ai";
import { toast } from "sonner";

const QUICK_SUGGESTIONS = [
  "Severe headache & dizziness for 2 days",
  "Skin rash and itching on arms",
  "Stomach pain after meals with acid reflux",
  "Joint pain and stiffness in knee",
];

export default function AISymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (textToAnalyze) => {
    const query = textToAnalyze || symptoms;
    if (!query.trim()) {
      toast.error("Please enter a description of your symptoms.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await analyzeSymptoms(query);
      if (res.success) {
        setResult(res);
        toast.success(`Recommended Specialty: ${res.recommendedSpecialty}`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to analyze symptoms.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-400" />
          AI Symptom Checker
        </CardTitle>
        <CardDescription className="text-slate-400 text-sm md:text-base leading-relaxed">
          Describe what you&apos;re feeling in plain words. Our AI assistant will
          recommend the right medical specialty and connect you with top
          doctors.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Input Box */}
        <div className="space-y-3">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have been experiencing a throbbing headache, light sensitivity, and nausea since yesterday morning..."
            className="w-full h-28 rounded-xl bg-black/40 border border-white/10 p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm resize-none"
          />

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap gap-2 items-center pt-1">
            <span className="text-xs text-slate-400 font-medium mr-1">
              Quick examples:
            </span>
            {QUICK_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSymptoms(suggestion);
                  handleAnalyze(suggestion);
                }}
                className="text-xs bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-teal-500/30 text-slate-300 hover:text-white rounded-full px-3 py-1 transition-all cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => handleAnalyze()}
          disabled={isAnalyzing || !symptoms.trim()}
          className="w-full bg-white text-slate-950 hover:bg-slate-100 font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/5 cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing Symptoms with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-teal-600" />
              Analyze Symptoms & Find Doctors
            </>
          )}
        </Button>

        {/* Result Display Card */}
        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="bg-teal-950/30 border border-teal-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-400" />
                  <h4 className="text-base md:text-lg font-semibold text-white">
                    Recommended Specialty
                  </h4>
                </div>
                <Badge className="bg-teal-400 text-slate-950 font-bold text-sm px-3 py-1">
                  {result.recommendedSpecialty}
                </Badge>
              </div>

              <p className="text-sm text-teal-200/90 leading-relaxed">
                {result.reason}
              </p>
            </div>

            {/* Matching Doctors List */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-teal-400" />
                Available Verified Specialists ({result.doctors?.length || 0})
              </h5>

              {result.doctors && result.doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.doctors.map((doctor) => {
                    const validName =
                      doctor.name &&
                      doctor.name !== "null null" &&
                      doctor.name !== "null"
                        ? doctor.name
                        : null;
                    const displayName = validName
                      ? validName.startsWith("Dr.")
                        ? validName
                        : `Dr. ${validName}`
                      : "Dr. Verified Specialist";
                    const initial = validName
                      ? validName.replace(/^Dr\.\s*/, "")[0]
                      : "D";

                    return (
                      <Card
                        key={doctor.id}
                        className="bg-white/[0.03] border-white/[0.08] hover:border-teal-500/40 transition-all flex flex-col justify-between rounded-xl"
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 font-semibold">
                              {initial}
                            </div>
                            <div>
                              <CardTitle className="text-sm font-semibold text-white">
                                {displayName}
                              </CardTitle>
                              <p className="text-xs text-teal-400 font-medium">
                                {doctor.specialty || result.recommendedSpecialty}{" "}
                                • {doctor.experience || 5}+ yrs
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                            {doctor.description ||
                              "Experienced healthcare provider dedicated to personalized patient care."}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            className="w-full bg-teal-500/15 text-teal-300 hover:bg-teal-500/25 border border-teal-500/30 text-xs rounded-lg"
                          >
                            <Link href={`/doctors/${doctor.id}`}>
                              Book Consultation{" "}
                              <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-slate-400">
                  No verified doctors currently available in this specialty. You
                  can consult our General Practitioners.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
