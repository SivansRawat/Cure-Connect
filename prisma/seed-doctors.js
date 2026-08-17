const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SEED_DOCTORS = [
  // 1. General Medicine
  {
    clerkUserId: "doc_gen_sarah_jenkins",
    email: "dr.sarah.jenkins@cureconnect.med",
    name: "Sarah Jenkins, MD",
    specialty: "General Medicine",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_gen_sarah_jenkins",
    description:
      "Harvard Medical School graduate specializing in comprehensive adult primary care, preventive wellness screenings, and chronic illness management.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_gen_michael_chang",
    email: "dr.michael.chang@cureconnect.med",
    name: "Michael Chang, MD",
    specialty: "General Medicine",
    experience: 8,
    credentialUrl: "https://www.medboard.org/verify/doc_gen_michael_chang",
    description:
      "Board-certified family physician focused on lifestyle medicine, routine health examinations, and acute illness management for patients of all ages.",
    verificationStatus: "VERIFIED",
  },

  // 2. Cardiology
  {
    clerkUserId: "doc_cardio_elena_rostova",
    email: "dr.elena.rostova@cureconnect.med",
    name: "Elena Rostova, MD, FACC",
    specialty: "Cardiology",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_cardio_elena_rostova",
    description:
      "Senior Cardiologist with extensive fellowship training at Johns Hopkins. Expert in cardiac imaging, hypertension management, and coronary artery disease prevention.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_cardio_amara_okoye",
    email: "dr.amara.okoye@cureconnect.med",
    name: "Amara Okoye, MD",
    specialty: "Cardiology",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_cardio_amara_okoye",
    description:
      "Clinical cardiologist specializing in arrhythmia management, heart failure therapy, and cardiovascular health optimization.",
    verificationStatus: "VERIFIED",
  },

  // 3. Dermatology
  {
    clerkUserId: "doc_derm_marcus_vance",
    email: "dr.marcus.vance@cureconnect.med",
    name: "Marcus Vance, MD, FAAD",
    specialty: "Dermatology",
    experience: 11,
    credentialUrl: "https://www.medboard.org/verify/doc_derm_marcus_vance",
    description:
      "Fellow of the American Academy of Dermatology specializing in medical dermatology, severe acne, eczema, psoriasis, and early skin lesion evaluations.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_derm_aisha_patel",
    email: "dr.aisha.patel@cureconnect.med",
    name: "Aisha Patel, MD",
    specialty: "Dermatology",
    experience: 7,
    credentialUrl: "https://www.medboard.org/verify/doc_derm_aisha_patel",
    description:
      "Dermatologist focused on chronic skin conditions, hair and scalp health, allergy-related rashes, and holistic dermal care.",
    verificationStatus: "VERIFIED",
  },

  // 4. Neurology
  {
    clerkUserId: "doc_neuro_alexander_hayes",
    email: "dr.alexander.hayes@cureconnect.med",
    name: "Alexander Hayes, MD, PhD",
    specialty: "Neurology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_neuro_alexander_hayes",
    description:
      "Stanford-trained neurologist specializing in refractory migraines, neuropathic pain management, vertigo, and peripheral nervous system disorders.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_neuro_sophia_rivera",
    email: "dr.sophia.rivera@cureconnect.med",
    name: "Sophia Rivera, MD",
    specialty: "Neurology",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_neuro_sophia_rivera",
    description:
      "Cognitive and clinical neurologist dedicated to chronic headache management, sleep disorders, and post-concussion recovery.",
    verificationStatus: "VERIFIED",
  },

  // 5. Pediatrics
  {
    clerkUserId: "doc_peds_emily_watson",
    email: "dr.emily.watson@cureconnect.med",
    name: "Emily Watson, MD, FAAP",
    specialty: "Pediatrics",
    experience: 13,
    credentialUrl: "https://www.medboard.org/verify/doc_peds_emily_watson",
    description:
      "Pediatric specialist focused on newborn growth, developmental milestones, childhood nutrition, and acute pediatric infections.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_peds_lucas_bennett",
    email: "dr.lucas.bennett@cureconnect.med",
    name: "Lucas Bennett, MD",
    specialty: "Pediatrics",
    experience: 6,
    credentialUrl: "https://www.medboard.org/verify/doc_peds_lucas_bennett",
    description:
      "Passionate pediatrician offering empathetic care for child allergies, respiratory health, vaccination schedules, and adolescent medicine.",
    verificationStatus: "VERIFIED",
  },

  // 6. Orthopedics
  {
    clerkUserId: "doc_ortho_david_miller",
    email: "dr.david.miller@cureconnect.med",
    name: "David Miller, MD",
    specialty: "Orthopedics",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_ortho_david_miller",
    description:
      "Orthopedic surgeon and sports medicine consultant specializing in knee & shoulder injuries, joint preservation, and non-surgical arthritis therapies.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_ortho_chloe_zhang",
    email: "dr.chloe.zhang@cureconnect.med",
    name: "Chloe Zhang, MD",
    specialty: "Orthopedics",
    experience: 8,
    credentialUrl: "https://www.medboard.org/verify/doc_ortho_chloe_zhang",
    description:
      "Musculoskeletal and orthopedic specialist focusing on spine wellness, posture correction, sports injury rehab, and bone health.",
    verificationStatus: "VERIFIED",
  },

  // 7. Psychiatry
  {
    clerkUserId: "doc_psych_robert_sterling",
    email: "dr.robert.sterling@cureconnect.med",
    name: "Robert Sterling, MD",
    specialty: "Psychiatry",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_psych_robert_sterling",
    description:
      "Columbia University faculty psychiatrist with deep expertise in anxiety disorders, adult ADHD, clinical depression, and psychopharmacology.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_psych_hannah_meyer",
    email: "dr.hannah.meyer@cureconnect.med",
    name: "Hannah Meyer, MD",
    specialty: "Psychiatry",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_psych_hannah_meyer",
    description:
      "Integrative psychiatrist combining modern psychiatric care with mindfulness, stress mitigation, and cognitive behavioral therapy (CBT).",
    verificationStatus: "VERIFIED",
  },

  // 8. Gastroenterology
  {
    clerkUserId: "doc_gastro_julian_morales",
    email: "dr.julian.morales@cureconnect.med",
    name: "Julian Morales, MD",
    specialty: "Gastroenterology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_gastro_julian_morales",
    description:
      "Digestive disease specialist experienced in treating GERD, IBS, inflammatory bowel disease, gut microbiome imbalances, and food intolerances.",
    verificationStatus: "VERIFIED",
  },

  // 9. Endocrinology
  {
    clerkUserId: "doc_endo_rachel_adams",
    email: "dr.rachel.adams@cureconnect.med",
    name: "Rachel Adams, MD",
    specialty: "Endocrinology",
    experience: 11,
    credentialUrl: "https://www.medboard.org/verify/doc_endo_rachel_adams",
    description:
      "Specialist in metabolic health, thyroid conditions, type 1 & 2 diabetes optimization, and hormonal balance therapies.",
    verificationStatus: "VERIFIED",
  },

  // 10. Obstetrics & Gynecology
  {
    clerkUserId: "doc_obgyn_claire_dupont",
    email: "dr.claire.dupont@cureconnect.med",
    name: "Claire Dupont, MD, FACOG",
    specialty: "Obstetrics & Gynecology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_obgyn_claire_dupont",
    description:
      "Women's health advocate providing expert reproductive healthcare, prenatal consultation, PCOS management, and hormonal wellness.",
    verificationStatus: "VERIFIED",
  },

  // 11. Oncology
  {
    clerkUserId: "doc_onco_kenneth_wright",
    email: "dr.kenneth.wright@cureconnect.med",
    name: "Kenneth Wright, MD",
    specialty: "Oncology",
    experience: 18,
    credentialUrl: "https://www.medboard.org/verify/doc_onco_kenneth_wright",
    description:
      "Medical oncologist providing compassionate cancer second opinions, targeted immunotherapy navigation, and personalized treatment planning.",
    verificationStatus: "VERIFIED",
  },

  // 12. Ophthalmology
  {
    clerkUserId: "doc_opht_olivia_martinez",
    email: "dr.olivia.martinez@cureconnect.med",
    name: "Olivia Martinez, MD",
    specialty: "Ophthalmology",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_opht_olivia_martinez",
    description:
      "Eye physician specializing in virtual triage for ocular symptoms, digital eye strain, glaucoma monitoring, and dry eye disease.",
    verificationStatus: "VERIFIED",
  },

  // 13. Pulmonology
  {
    clerkUserId: "doc_pulm_christopher_lee",
    email: "dr.christopher.lee@cureconnect.med",
    name: "Christopher Lee, MD, FCCP",
    specialty: "Pulmonology",
    experience: 13,
    credentialUrl: "https://www.medboard.org/verify/doc_pulm_christopher_lee",
    description:
      "Pulmonary disease consultant expert in asthma management, chronic cough, COPD, and post-viral respiratory rehabilitation.",
    verificationStatus: "VERIFIED",
  },

  // 14. Radiology
  {
    clerkUserId: "doc_rad_vikram_nair",
    email: "dr.vikram.nair@cureconnect.med",
    name: "Vikram Nair, MD",
    specialty: "Radiology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_rad_vikram_nair",
    description:
      "Diagnostic radiologist providing second-opinion reviews for MRI, CT, and X-ray imaging reports with clear patient explanations.",
    verificationStatus: "VERIFIED",
  },

  // 15. Urology
  {
    clerkUserId: "doc_uro_thomas_anderson",
    email: "dr.thomas.anderson@cureconnect.med",
    name: "Thomas Anderson, MD",
    specialty: "Urology",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_uro_thomas_anderson",
    description:
      "Urologist specializing in urinary tract wellness, kidney stone prevention, and men's preventative urological health.",
    verificationStatus: "VERIFIED",
  },
];

async function seed() {
  console.log("🌱 Starting CureConnect doctor seeding with clean names...");

  for (const doc of SEED_DOCTORS) {
    const user = await prisma.user.upsert({
      where: { email: doc.email },
      update: {
        name: doc.name,
        specialty: doc.specialty,
        experience: doc.experience,
        credentialUrl: doc.credentialUrl,
        description: doc.description,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
      create: {
        clerkUserId: doc.clerkUserId,
        email: doc.email,
        name: doc.name,
        specialty: doc.specialty,
        experience: doc.experience,
        credentialUrl: doc.credentialUrl,
        description: doc.description,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
        credits: 10,
      },
    });

    const existingSlot = await prisma.availability.findFirst({
      where: {
        doctorId: user.id,
        status: "AVAILABLE",
      },
    });

    if (!existingSlot) {
      const startTime = new Date();
      startTime.setHours(9, 0, 0, 0);

      const endTime = new Date();
      endTime.setHours(18, 0, 0, 0);

      await prisma.availability.create({
        data: {
          doctorId: user.id,
          startTime,
          endTime,
          status: "AVAILABLE",
        },
      });
    }

    console.log(`✅ Updated Doctor: ${doc.name} [${doc.specialty}]`);
  }

  console.log("🎉 Clean name doctor seeding complete!");
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
