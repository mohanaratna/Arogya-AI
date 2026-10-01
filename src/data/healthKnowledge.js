// Health Information, Emergency Guides & Medicines Encyclopedia

export const healthArticles = [
  {
    id: 'art_fever',
    category: 'Common Health Problems',
    title: 'Fever & High Body Temperature (बुखार / జ్వరం)',
    summary: 'Understanding viral fever, home hydration, temperature monitoring, and when to seek immediate care.',
    source: 'ICMR Guidelines & National Health Portal (NHP India)',
    content: {
      explanation: 'Fever is a natural immune response of the body fighting an infection (viral or bacterial). Normal body temperature ranges between 97°F and 99°F (36.1°C to 37.2°C).',
      symptoms: ['Elevated temperature (>100°F)', 'Chills or shivering', 'Sweating', 'Body pain and headache'],
      warningSigns: ['Fever above 103°F that does not drop', 'Stiff neck or severe confusion', 'Fever lasting more than 4 days', 'Difficulty breathing or extreme chest pain'],
      precautions: [
        'Drink plenty of boiled warm water, tender coconut water, or fresh fruit juices.',
        'Use cool water sponge wipes on forehead and limbs if temperature is high.',
        'Wear light, breathable cotton clothing.',
        'Get adequate rest.'
      ],
      avoid: [
        'Avoid wrapping in heavy blankets when temperature is high.',
        'Avoid taking unprescribed antibiotics (antibiotics do not cure viral fever).',
        'Avoid cold water baths.'
      ],
      whenDoctor: 'Visit Primary Health Centre (PHC) if fever stays above 101°F for more than 48 hours or is accompanied by severe shivering or rash.'
    }
  },
  {
    id: 'art_diarrhea',
    category: 'Common Health Problems',
    title: 'Diarrhea & Dehydration Care (दस्त / విరేచనాలు)',
    summary: 'Preventing severe dehydration in adults and children using ORS and zinc supplements.',
    source: 'WHO Child Health Guidelines & ICMR',
    content: {
      explanation: 'Diarrhea involves frequent loose or watery stools. The greatest risk is dehydration (loss of essential water and salts from the body).',
      symptoms: ['Watery stools', 'Stomach cramps', 'Thirst', 'Dry mouth and fatigue'],
      warningSigns: ['Severe weakness or inability to stand', 'Blood or mucus in stool', 'No urination for over 8 hours', 'Extreme sunken eyes and dry tongue'],
      precautions: [
        'Immediately start Oral Rehydration Solution (ORS): Dissolve 1 sachet ORS in 1 Liter of clean boiled water.',
        'Drink rice water (Kanji), buttermilk (Majjiga), or light coconut water.',
        'Continue feeding children normal soft foods (banana, rice, curd).'
      ],
      avoid: [
        'Do not take anti-diarrheal stop-medicines without doctor consultation.',
        'Avoid raw or uncooked street foods, carbonated drinks, and high-sugar juices.'
      ],
      whenDoctor: 'Visit nearest PHC or hospital if blood is visible in stool or severe dehydration symptoms appear.'
    }
  },
  {
    id: 'art_emergency_signs',
    category: 'Emergency Warning Signs',
    title: 'Critical Red-Flag Symptoms: Know When to Call 108',
    summary: 'Life-threatening medical symptoms requiring urgent emergency hospital evaluation.',
    source: 'Ministry of Health and Family Welfare (MoHFW India) Emergency Protocol',
    content: {
      explanation: 'Certain symptoms indicate acute cardiovascular, neurological, or respiratory emergencies. Immediate action saves lives.',
      symptoms: [
        'Severe squeezing chest pain radiating to left arm or jaw',
        'Sudden loss of speech, facial drooping, or arm weakness (Stroke FAST test)',
        'Extreme difficulty breathing or gasping for air',
        'Uncontrolled severe bleeding or coughing blood',
        'Seizures / Fits lasting over 2 minutes'
      ],
      warningSigns: ['ANY of the above symptoms is an immediate medical emergency.'],
      precautions: [
        'Call 108 (Ambulance) or 112 (National Emergency) immediately.',
        'Keep patient calm and seated in upright position.',
        'Loosen tight clothing around neck and waist.'
      ],
      avoid: [
        'Do not attempt to walk or drive if experiencing chest pain or severe dizziness.',
        'Do not offer water or food if patient is drowsy or unconscious.'
      ],
      whenDoctor: 'IMMEDIATE EMERGENCY ROOM VISIT REQUIRED.'
    }
  },
  {
    id: 'art_phc_guide',
    category: 'PHC / Govt Hospital Guide',
    title: 'Navigating Your Nearest Primary Health Centre (PHC)',
    summary: 'Free healthcare facilities, Ayushman Bharat health centers, and government medical services in India.',
    source: 'Ayushman Bharat - Health & Wellness Centres (AB-HWC)',
    content: {
      explanation: 'Government Primary Health Centres (PHCs) and Community Health Centres (CHCs) provide free basic medical checkups, essential medicines, maternal care, immunizations, and doctor consultations.',
      symptoms: ['Minor infections', 'Routine health checkup', 'Free blood test / BP check', 'Maternal and child vaccination'],
      warningSigns: ['For major surgeries or specialized care, PHC will issue a referral to District Govt Hospital.'],
      precautions: [
        'Carry your ABHA ID (Ayushman Bharat Health Account) or Aadhaar card.',
        'Visit morning OPD hours (usually 8:00 AM to 1:00 PM).',
        'Collect free essential medicines prescribed by the PHC medical officer.'
      ],
      avoid: [
        'Do not pay any unauthorized fees; primary government care services are free.'
      ],
      whenDoctor: 'Available daily during OPD hours at your local PHC.'
    }
  }
];

export const medicinesEncyclopedia = [
  {
    id: 'med_paracetamol',
    genericName: 'Paracetamol / Acetaminophen (500mg / 650mg)',
    purpose: 'Fever reduction (Antipyretic) & Mild to Moderate Pain Relief (Analgesic)',
    commonUse: 'Used for viral fever, headache, body pain, toothache, and post-vaccination soreness.',
    precautions: 'Take after food with water. Maintain at least 4 to 6 hours gap between doses.',
    warnings: 'DO NOT exceed 4,000mg (4 grams) in 24 hours. Overdose can cause severe liver damage. Avoid alcohol consumption while taking Paracetamol.',
    isOTC: true,
    source: 'Indian Pharmacopoeia & WHO Essential Medicines List'
  },
  {
    id: 'med_ors',
    genericName: 'Oral Rehydration Salts (ORS Sachet)',
    purpose: 'Restoration of lost body water, sodium, potassium, and electrolytes during diarrhea and vomiting.',
    commonUse: 'Essential for dehydration prevention in adults and children.',
    precautions: 'Mix 1 full sachet in exactly 1 Liter of clean boiled & cooled water. Use mixed solution within 24 hours.',
    warnings: 'Do not boil the prepared solution after mixing. Consult doctor if patient with severe kidney disease is taking ORS.',
    isOTC: true,
    source: 'WHO / UNICEF Recommended Formulation'
  },
  {
    id: 'med_cetirizine',
    genericName: 'Cetirizine Hydrochloride (10mg)',
    purpose: 'Antihistamine for Allergy Relief, Cold Symptoms, & Skin Itching',
    commonUse: 'Relieves sneezing, runny nose, watery eyes, insect bites, and allergic skin hives.',
    precautions: 'Usually taken once daily at bedtime.',
    warnings: 'May cause drowsiness or sleepiness. Do NOT drive or operate machinery after taking Cetirizine.',
    isOTC: true,
    source: 'National Essential Medicines List'
  },
  {
    id: 'med_antacid',
    genericName: 'Dried Aluminium Hydroxide & Magnesium Gel (Antacid Syrup / Tablet)',
    purpose: 'Relief from Stomach Acidity, Heartburn, & Indigestion',
    commonUse: 'Neutralizes stomach acid to relieve burning sensation in chest/stomach.',
    precautions: 'Take 1-2 teaspoons or chewable tablets 1 hour after meals or when acid heartburn occurs.',
    warnings: 'Do not take continuously for more than 14 days without consulting a doctor for persistent ulcer check.',
    isOTC: true,
    source: 'Central Drugs Standard Control Organization (CDSCO India)'
  }
];
