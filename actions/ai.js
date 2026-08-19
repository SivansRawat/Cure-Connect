"use server";

import { db } from "@/lib/prisma";

const SPECIALTY_KEYWORDS = {
  Cardiology: ["chest pain", "heart", "blood pressure", "palpitations", "shortness of breath", "cardiac", "angina"],
  Dermatology: ["rash", "skin", "itching", "acne", "eczema", "mole", "lesion", "spots", "psoriasis", "dermatitis"],
  Neurology: ["headache", "migraine", "dizziness", "numbness", "seizure", "memory", "brain", "tremor", "vertigo", "neuropathy"],
  Pediatrics: ["child", "baby", "infant", "toddler", "growth", "vaccination", "pediatric", "newborn"],
  Orthopedics: ["joint pain", "bone", "fracture", "back pain", "knee", "shoulder", "spine", "arthritis", "ligament", "sprain"],
  Psychiatry: ["anxiety", "depression", "stress", "sleep", "insomnia", "mood", "mental health", "panic", "adhd", "burnout"],
  Gastroenterology: ["stomach", "stomach pain", "acid reflux", "nausea", "digestion", "gut", "diarrhea", "constipation", "bloating", "gerd", "ibs"],
  Endocrinology: ["thyroid", "diabetes", "blood sugar", "hormone", "metabolic", "adrenal", "pcos", "insulin", "weight gain"],
  "Obstetrics & Gynecology": ["pregnancy", "period", "menstrual", "gynecology", "pelvic", "fertility", "prenatal", "ovary", "uterus", "pcos"],
  Oncology: ["tumor", "cancer", "oncology", "chemotherapy", "biopsy", "malignancy", "radiation", "immunotherapy"],
  Ophthalmology: ["eye", "vision", "blur", "glaucoma", "cornea", "retina", "dry eye", "cataract", "astigmatism"],
  Pulmonology: ["cough", "breathing", "lung", "asthma", "copd", "respiratory", "bronchitis", "wheezing", "sleep apnea"],
  Radiology: ["mri", "x-ray", "ct scan", "ultrasound", "scan", "imaging", "radiology", "dexa"],
  Urology: ["urinary", "kidney stone", "bladder", "prostate", "urine", "uti", "urology", "incontinence"],
  "General Medicine": ["fever", "flu", "cough", "cold", "fatigue", "weakness", "checkup", "malaise", "body ache", "infection"],
};

/**
  * Analyze patient symptoms and return specialty recommendations + suggested doctors
  */
export async function analyzeSymptoms(symptomsText) {
  if (!symptomsText || typeof symptomsText !== "string" || symptomsText.trim().length === 0) {
    throw new Error("Please enter a description of your symptoms.");
  }

  const cleanText = symptomsText.toLowerCase();

  try {
    let matchedSpecialty = "General Medicine";
    let matchedScore = 0;
    let matchingReason = "General wellness consultation recommended.";

    // Simple intelligent keyword match
    for (const [specialty, keywords] of Object.entries(SPECIALTY_KEYWORDS)) {
      const hits = keywords.filter((kw) => cleanText.includes(kw));
      if (hits.length > matchedScore) {
        matchedScore = hits.length;
        matchedSpecialty = specialty;
        matchingReason = `Symptoms match typical signs of ${specialty} (e.g. ${hits.join(", ")}).`;
      }
    }

    // Try calling Gemini API if GEMINI_API_KEY is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI Triage Medical Assistant for Cure-Connect. Analyze these symptoms: "${symptomsText}".
Respond in JSON with:
{
  "specialty": "One of (General Medicine, Cardiology, Dermatology, Endocrinology, Gastroenterology, Neurology, Obstetrics & Gynecology, Oncology, Ophthalmology, Orthopedics, Pediatrics, Psychiatry, Pulmonology, Radiology, Urology)",
  "reason": "Brief 1-sentence medical rationale",
  "urgency": "Low | Moderate | High"
}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          const jsonMatch = rawText?.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.specialty) {
              matchedSpecialty = parsed.specialty;
              matchingReason = parsed.reason || matchingReason;
            }
          }
        }
      } catch (err) {
        console.warn("Gemini API call warning, falling back to local medical classifier:", err.message);
      }
    }

    // Fetch up to 3 verified doctors in the recommended specialty
    const doctors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
        specialty: {
          contains: matchedSpecialty,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        specialty: true,
        experience: true,
        description: true,
      },
      take: 3,
    });

    // If no exact specialty doctors found, fallback to any verified doctors
    let finalDoctors = doctors;
    if (doctors.length === 0) {
      finalDoctors = await db.user.findMany({
        where: {
          role: "DOCTOR",
          verificationStatus: "VERIFIED",
        },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          specialty: true,
          experience: true,
          description: true,
        },
        take: 3,
      });
    }

    return {
      success: true,
      recommendedSpecialty: matchedSpecialty,
      reason: matchingReason,
      doctors: finalDoctors,
    };
  } catch (error) {
    console.error("Failed to analyze symptoms:", error);
    throw new Error("Symptom analysis error: " + error.message);
  }
}
