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
  {
    clerkUserId: "doc_gen_priya_sharma",
    email: "dr.priya.sharma@cureconnect.med",
    name: "Priya Sharma, MD",
    specialty: "General Medicine",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_gen_priya_sharma",
    description:
      "Internal medicine specialist focusing on preventative diagnostics, metabolic syndrome management, and comprehensive geriatric wellness.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_gen_james_wilson",
    email: "dr.james.wilson@cureconnect.med",
    name: "James Wilson, MD",
    specialty: "General Medicine",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_gen_james_wilson",
    description:
      "Primary care physician dedicated to evidence-based preventive care, acute infection recovery, and patient-centered chronic disease therapy.",
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
  {
    clerkUserId: "doc_cardio_sanjay_patel",
    email: "dr.sanjay.patel@cureconnect.med",
    name: "Sanjay Patel, MD, FACC",
    specialty: "Cardiology",
    experience: 18,
    credentialUrl: "https://www.medboard.org/verify/doc_cardio_sanjay_patel",
    description:
      "Consultant cardiologist expert in ischemic heart disease, preventive cardiology, lipid management, and echocardiographic evaluation.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_cardio_marcus_brody",
    email: "dr.marcus.brody@cureconnect.med",
    name: "Marcus Brody, MD",
    specialty: "Cardiology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_cardio_marcus_brody",
    description:
      "Heart health specialist focusing on early detection of vascular disease, exercise physiology, and personalized cardioprotective strategies.",
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
  {
    clerkUserId: "doc_derm_hannah_kim",
    email: "dr.hannah.kim@cureconnect.med",
    name: "Hannah Kim, MD, FAAD",
    specialty: "Dermatology",
    experience: 13,
    credentialUrl: "https://www.medboard.org/verify/doc_derm_hannah_kim",
    description:
      "Specialist in inflammatory dermatoses, rosacea management, pediatric dermatology, and proactive skin barrier restoration.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_derm_lucas_moreno",
    email: "dr.lucas.moreno@cureconnect.med",
    name: "Lucas Moreno, MD",
    specialty: "Dermatology",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_derm_lucas_moreno",
    description:
      "Clinical dermatologist expert in early melanoma detection, contact dermatitis, autoimmune blistering disorders, and teledermatology.",
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
  {
    clerkUserId: "doc_neuro_daniel_tanaka",
    email: "dr.daniel.tanaka@cureconnect.med",
    name: "Daniel Tanaka, MD",
    specialty: "Neurology",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_neuro_daniel_tanaka",
    description:
      "Neurologist with deep experience in movement disorders, Parkinson's disease support, restless leg syndrome, and tremors.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_neuro_leah_goldstein",
    email: "dr.leah.goldstein@cureconnect.med",
    name: "Leah Goldstein, MD",
    specialty: "Neurology",
    experience: 11,
    credentialUrl: "https://www.medboard.org/verify/doc_neuro_leah_goldstein",
    description:
      "Expert in neurovascular health, transient ischemic attack (TIA) follow-up, neuropathy relief, and vestibular migraine rehabilitation.",
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
  {
    clerkUserId: "doc_peds_maya_lin",
    email: "dr.maya.lin@cureconnect.med",
    name: "Maya Lin, MD, FAAP",
    specialty: "Pediatrics",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_peds_maya_lin",
    description:
      "Senior pediatrician with focus on developmental pediatrics, childhood asthma management, and comprehensive infant wellness care.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_peds_benjamin_oconnor",
    email: "dr.benjamin.oconnor@cureconnect.med",
    name: "Benjamin O'Connor, MD",
    specialty: "Pediatrics",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_peds_benjamin_oconnor",
    description:
      "Child healthcare consultant specializing in pediatric infectious diseases, gastrointestinal issues in infants, and behavioral health.",
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
  {
    clerkUserId: "doc_ortho_robert_alvarez",
    email: "dr.robert.alvarez@cureconnect.med",
    name: "Robert Alvarez, MD",
    specialty: "Orthopedics",
    experience: 19,
    credentialUrl: "https://www.medboard.org/verify/doc_ortho_robert_alvarez",
    description:
      "Senior orthopedic specialist in hip and knee osteoarthritic conditions, tendon rehabilitation, and post-surgical physical recovery plans.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_ortho_stephanie_ross",
    email: "dr.stephanie.ross@cureconnect.med",
    name: "Stephanie Ross, MD",
    specialty: "Orthopedics",
    experience: 11,
    credentialUrl: "https://www.medboard.org/verify/doc_ortho_stephanie_ross",
    description:
      "Orthopedic specialist focused on upper extremity biomechanics, carpal tunnel management, rotator cuff health, and ergonomic guidance.",
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
  {
    clerkUserId: "doc_psych_tariq_mansoor",
    email: "dr.tariq.mansoor@cureconnect.med",
    name: "Tariq Mansoor, MD",
    specialty: "Psychiatry",
    experience: 17,
    credentialUrl: "https://www.medboard.org/verify/doc_psych_tariq_mansoor",
    description:
      "Consultant psychiatrist specializing in mood disorders, sleep disturbance, burnout recovery, and compassionate medication management.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_psych_jessica_vance",
    email: "dr.jessica.vance@cureconnect.med",
    name: "Jessica Vance, MD",
    specialty: "Psychiatry",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_psych_jessica_vance",
    description:
      "Board-certified psychiatrist focusing on young adult life transitions, panic disorders, somatic symptom distress, and holistic resilience coaching.",
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
  {
    clerkUserId: "doc_gastro_ananya_iyer",
    email: "dr.ananya.iyer@cureconnect.med",
    name: "Ananya Iyer, MD",
    specialty: "Gastroenterology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_gastro_ananya_iyer",
    description:
      "Gastroenterologist and hepatologist focused on non-alcoholic fatty liver disease, acid reflux management, and chronic abdominal discomfort.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_gastro_keith_robinson",
    email: "dr.keith.robinson@cureconnect.med",
    name: "Keith Robinson, MD",
    specialty: "Gastroenterology",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_gastro_keith_robinson",
    description:
      "Senior GI specialist with clinical focus on celiac disease, small intestinal bacterial overgrowth (SIBO), Crohn's, and ulcerative colitis.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_gastro_meiling_wu",
    email: "dr.meiling.wu@cureconnect.med",
    name: "Mei-Ling Wu, MD",
    specialty: "Gastroenterology",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_gastro_meiling_wu",
    description:
      "Digestive health specialist providing nutrition-integrated therapies for gut motility issues, peptic ulcers, and dyspepsia.",
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
  {
    clerkUserId: "doc_endo_carlos_mendez",
    email: "dr.carlos.mendez@cureconnect.med",
    name: "Carlos Mendez, MD",
    specialty: "Endocrinology",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_endo_carlos_mendez",
    description:
      "Endocrine consultant dedicated to thyroid nodules, Hashimoto's disease, adrenal insufficiency, and male/female hormone balancing.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_endo_fatima_alhassan",
    email: "dr.fatima.alhassan@cureconnect.med",
    name: "Fatima Al-Hassan, MD",
    specialty: "Endocrinology",
    experience: 13,
    credentialUrl: "https://www.medboard.org/verify/doc_endo_fatima_alhassan",
    description:
      "Expert in insulin resistance, continuous glucose monitoring analysis, osteoporosis prevention, and parathyroid disorders.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_endo_gregory_cole",
    email: "dr.gregory.cole@cureconnect.med",
    name: "Gregory Cole, MD",
    specialty: "Endocrinology",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_endo_gregory_cole",
    description:
      "Metabolic health clinician specializing in weight management biology, pituitary gland evaluation, and polycystic ovarian syndrome support.",
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
  {
    clerkUserId: "doc_obgyn_sunita_rao",
    email: "dr.sunita.rao@cureconnect.med",
    name: "Sunita Rao, MD, FACOG",
    specialty: "Obstetrics & Gynecology",
    experience: 18,
    credentialUrl: "https://www.medboard.org/verify/doc_obgyn_sunita_rao",
    description:
      "Board-certified OB/GYN with extensive experience in preconception counseling, endometriosis management, and postpartum recovery.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_obgyn_olivia_tremblay",
    email: "dr.olivia.tremblay@cureconnect.med",
    name: "Olivia Tremblay, MD",
    specialty: "Obstetrics & Gynecology",
    experience: 10,
    credentialUrl: "https://www.medboard.org/verify/doc_obgyn_olivia_tremblay",
    description:
      "Gynecologic clinician focusing on menstrual health, perimenopause & menopause hormone guidance, and preventative cervical screenings.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_obgyn_zoe_washington",
    email: "dr.zoe.washington@cureconnect.med",
    name: "Zoe Washington, MD, FACOG",
    specialty: "Obstetrics & Gynecology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_obgyn_zoe_washington",
    description:
      "Specialist in pelvic floor health, fertility optimization consultations, reproductive immunology, and holistic women's wellness.",
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
  {
    clerkUserId: "doc_onco_hiroshi_sato",
    email: "dr.hiroshi.sato@cureconnect.med",
    name: "Hiroshi Sato, MD, PhD",
    specialty: "Oncology",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_onco_hiroshi_sato",
    description:
      "Precision oncology consultant focusing on genomic profiling in cancer therapy, hematologic conditions, and novel clinical trials guidance.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_onco_valerie_morgan",
    email: "dr.valerie.morgan@cureconnect.med",
    name: "Valerie Morgan, MD",
    specialty: "Oncology",
    experience: 13,
    credentialUrl: "https://www.medboard.org/verify/doc_onco_valerie_morgan",
    description:
      "Clinical oncologist specializing in breast health, hereditary cancer risk assessment, survivorship care, and chemotherapy side-effect mitigation.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_onco_arthur_pendelton",
    email: "dr.arthur.pendelton@cureconnect.med",
    name: "Arthur Pendelton, MD",
    specialty: "Oncology",
    experience: 20,
    credentialUrl: "https://www.medboard.org/verify/doc_onco_arthur_pendelton",
    description:
      "Senior oncologist offering in-depth virtual second opinions, multi-disciplinary tumor review analysis, and supportive palliative care.",
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
  {
    clerkUserId: "doc_opht_jonathan_cross",
    email: "dr.jonathan.cross@cureconnect.med",
    name: "Jonathan Cross, MD",
    specialty: "Ophthalmology",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_opht_jonathan_cross",
    description:
      "Ophthalmic specialist in corneal diseases, cataract surgical evaluation, blepharitis care, and vision preservation therapies.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_opht_meera_nambiar",
    email: "dr.meera.nambiar@cureconnect.med",
    name: "Meera Nambiar, MD",
    specialty: "Ophthalmology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_opht_meera_nambiar",
    description:
      "Retina consultant expert in diabetic retinopathy evaluations, macular degeneration lifestyle management, and sudden visual symptom triage.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_opht_edward_vance",
    email: "dr.edward.vance@cureconnect.med",
    name: "Edward Vance, MD",
    specialty: "Ophthalmology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_opht_edward_vance",
    description:
      "Neuro-ophthalmology consultant focusing on optic nerve disorders, unexplained visual changes, double vision, and ocular migraine.",
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
  {
    clerkUserId: "doc_pulm_nadia_petrov",
    email: "dr.nadia.petrov@cureconnect.med",
    name: "Nadia Petrov, MD",
    specialty: "Pulmonology",
    experience: 15,
    credentialUrl: "https://www.medboard.org/verify/doc_pulm_nadia_petrov",
    description:
      "Specialist in sleep-disordered breathing, obstructive sleep apnea CPAP management, interstitial lung conditions, and lung nodules.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_pulm_samuel_brooks",
    email: "dr.samuel.brooks@cureconnect.med",
    name: "Samuel K. Brooks, MD, FCCP",
    specialty: "Pulmonology",
    experience: 17,
    credentialUrl: "https://www.medboard.org/verify/doc_pulm_samuel_brooks",
    description:
      "Pulmonologist with deep expertise in emphysema therapy, bronchiectasis, occupational lung health, and shortness of breath diagnostics.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_pulm_beatrice_lawson",
    email: "dr.beatrice.lawson@cureconnect.med",
    name: "Beatrice Lawson, MD",
    specialty: "Pulmonology",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_pulm_beatrice_lawson",
    description:
      "Respiratory health physician focusing on adult allergic asthma, non-allergic rhinitis, vocal cord dysfunction, and inhalation device education.",
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
  {
    clerkUserId: "doc_rad_danielle_foster",
    email: "dr.danielle.foster@cureconnect.med",
    name: "Danielle Foster, MD",
    specialty: "Radiology",
    experience: 16,
    credentialUrl: "https://www.medboard.org/verify/doc_rad_danielle_foster",
    description:
      "Neuroradiology consultant offering specialized second opinions for brain, spine, head, and neck scans, clarifying ambiguous report findings.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_rad_aaron_chen",
    email: "dr.aaron.chen@cureconnect.med",
    name: "Aaron Chen, MD",
    specialty: "Radiology",
    experience: 11,
    credentialUrl: "https://www.medboard.org/verify/doc_rad_aaron_chen",
    description:
      "Musculoskeletal radiologist reviewing sports injury MRIs, joint arthrograms, bone density scans (DEXA), and tendon ultrasonography.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_rad_patricia_novak",
    email: "dr.patricia.novak@cureconnect.med",
    name: "Patricia Novak, MD",
    specialty: "Radiology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_rad_patricia_novak",
    description:
      "Diagnostic imaging consultant specializing in mammography review, pelvic MRI interpretation, and patient-friendly imaging consultations.",
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
  {
    clerkUserId: "doc_uro_victor_delgado",
    email: "dr.victor.delgado@cureconnect.med",
    name: "Victor Delgado, MD",
    specialty: "Urology",
    experience: 14,
    credentialUrl: "https://www.medboard.org/verify/doc_uro_victor_delgado",
    description:
      "Urological surgeon offering second opinions on benign prostatic hyperplasia (BPH), elevated PSA triage, and metabolic stone prevention.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_uro_karen_lindqvist",
    email: "dr.karen.lindqvist@cureconnect.med",
    name: "Karen Lindqvist, MD",
    specialty: "Urology",
    experience: 12,
    credentialUrl: "https://www.medboard.org/verify/doc_uro_karen_lindqvist",
    description:
      "Specialist in recurrent urinary tract infection management, overactive bladder therapies, interstitial cystitis, and pelvic health.",
    verificationStatus: "VERIFIED",
  },
  {
    clerkUserId: "doc_uro_farhan_siddiqui",
    email: "dr.farhan.siddiqui@cureconnect.med",
    name: "Farhan Siddiqui, MD",
    specialty: "Urology",
    experience: 9,
    credentialUrl: "https://www.medboard.org/verify/doc_uro_farhan_siddiqui",
    description:
      "Endourology clinician focusing on preventative kidney stone diet plans, hematuria triage, and lifestyle-oriented urologic wellness.",
    verificationStatus: "VERIFIED",
  },
];

async function seed() {
  console.log(`🌱 Starting CureConnect doctor seeding with ${SEED_DOCTORS.length} doctors across 15 specialties...`);

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

    console.log(`✅ Seeded/Updated Doctor: ${doc.name} [${doc.specialty}]`);
  }

  console.log(`🎉 Doctor seeding complete! Total ${SEED_DOCTORS.length} verified doctors seeded.`);
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
