"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Stethoscope, ArrowRight, Loader2, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <Card className="border-emerald-700/30 bg-gradient-to-br from-emerald-950/40 via-muted/30 to-background shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 px-3 py-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            AI Health Assistant
          </Badge>
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          Symptom Checker & Doctor Matcher
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Describe what you&apos;re feeling in plain words. Our AI assistant will recommend the right medical specialty and connect you with top doctors.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Box */}
        <div className="space-y-3">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have been experiencing a throbbing headache, light sensitivity, and nausea since yesterday morning..."
            className="w-full h-28 rounded-lg bg-background border border-emerald-900/40 p-4 text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
          />

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground font-medium mr-1">Quick examples:</span>
            {QUICK_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSymptoms(suggestion);
                  handleAnalyze(suggestion);
                }}
                className="text-xs bg-emerald-900/20 hover:bg-emerald-800/40 border border-emerald-700/30 text-emerald-300 rounded-full px-3 py-1 transition-all"
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing Symptoms with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Analyze Symptoms & Find Doctors
            </>
          )}
        </Button>

        {/* Result Display Card */}
        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <h4 className="text-lg font-bold text-white">Recommended Specialty</h4>
                </div>
                <Badge className="bg-emerald-500 text-black font-extrabold text-sm px-3 py-1">
                  {result.recommendedSpecialty}
                </Badge>
              </div>

              <p className="text-sm text-emerald-200/90 leading-relaxed">
                {result.reason}
              </p>
            </div>

            {/* Matching Doctors List */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-emerald-400" />
                Available Verified Specialists ({result.doctors?.length || 0})
              </h5>

              {result.doctors && result.doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.doctors.map((doctor) => {
                    const validName = doctor.name && doctor.name !== "null null" && doctor.name !== "null" ? doctor.name : null;
                    const displayName = validName ? (validName.startsWith("Dr.") ? validName : `Dr. ${validName}`) : "Dr. Verified Specialist";
                    const initial = validName ? validName.replace(/^Dr\.\s*/, "")[0] : "D";

                    return (
                      <Card
                        key={doctor.id}
                        className="bg-card border-emerald-900/30 hover:border-emerald-600/50 transition-all flex flex-col justify-between"
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 font-bold">
                              {initial}
                            </div>
                            <div>
                              <CardTitle className="text-base font-semibold text-white">
                                {displayName}
                              </CardTitle>
                              <p className="text-xs text-emerald-400 font-medium">
                                {doctor.specialty || result.recommendedSpecialty} • {doctor.experience || 5}+ yrs
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {doctor.description || "Experienced healthcare provider dedicated to personalized patient care."}
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                        >
                          <Link href={`/doctors/${doctor.id}`}>
                            Book Consultation <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
                </div>
              ) : (
                <div className="text-center py-6 bg-muted/20 rounded-lg text-sm text-muted-foreground">
                  No verified doctors currently available in this specialty. You can consult our General Practitioners.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
