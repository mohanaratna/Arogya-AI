// Medical Triage Rules & Symptom Engine for SwasthyaSaathi

export const commonSymptomsList = [
  { id: 'fever', label: 'Fever / High Temperature', icon: '🌡️' },
  { id: 'cough', label: 'Cough / Phlegm', icon: '😷' },
  { id: 'cold', label: 'Cold / Running Nose', icon: '🤧' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'body_pain', label: 'Body Pain / Muscle Aches', icon: '🦴' },
  { id: 'chest_pain', label: 'Chest Pain / Tightness', icon: '🫀', redFlagPotential: true },
  { id: 'breathlessness', label: 'Shortness of Breath', icon: '🫁', redFlagPotential: true },
  { id: 'diarrhea', label: 'Loose Motions / Diarrhea', icon: '💧' },
  { id: 'vomiting', label: 'Vomiting / Nausea', icon: '🤮' },
  { id: 'stomach_pain', label: 'Stomach Pain / Cramps', icon: '🤢' },
  { id: 'sore_throat', label: 'Sore Throat / Throat Pain', icon: '🗣️' },
  { id: 'skin_rash', label: 'Skin Rash / Itching / Redness', icon: '🧴' },
  { id: 'fatigue', label: 'Extreme Weakness / Dizziness', icon: '💫' },
  { id: 'bleeding', label: 'Uncontrolled Bleeding', icon: '🩸', redFlagPotential: true },
  { id: 'seizure', label: 'Seizure / Fits', icon: '⚡', redFlagPotential: true }
];

export const RED_FLAG_KEYWORDS = [
  'chest pain', 'severe chest pain', 'tightness in chest', 'heart attack',
  'cannot breathe', 'severe difficulty breathing', 'gasping for air', 'choking',
  'seizure', 'fits', 'convulsions', 'unconscious', 'fainted', 'passed out',
  'heavy bleeding', 'uncontrolled bleeding', 'coughing blood', 'vomiting blood',
  'sudden paralysis', 'face drooping', 'slurred speech', 'arm weakness', 'stroke',
  'severe allergic reaction', 'swollen tongue', 'anaphylaxis', 'snake bite',
  'poison', 'extreme head injury', 'high fever with stiff neck'
];

export const analyzeSymptomsPipeline = ({
  selectedSymptoms = [],
  freeText = '',
  age = 30,
  gender = 'Male',
  durationDays = 2,
  severityScore = 4, // 1 to 10
  existingConditions = ''
}) => {
  const combinedInput = `${freeText} ${selectedSymptoms.join(' ')} ${existingConditions}`.toLowerCase();
  
  // STEP 1: Red Flag Emergency Check
  const detectedRedFlags = RED_FLAG_KEYWORDS.filter(keyword => combinedInput.includes(keyword));
  const isChestPainSelected = selectedSymptoms.includes('chest_pain');
  const isBreathlessSelected = selectedSymptoms.includes('breathlessness');
  const isBleedingSelected = selectedSymptoms.includes('bleeding');
  const isSeizureSelected = selectedSymptoms.includes('seizure');

  const isEmergency = 
    detectedRedFlags.length > 0 || 
    isChestPainSelected || 
    (isBreathlessSelected && severityScore >= 7) ||
    isBleedingSelected ||
    isSeizureSelected ||
    severityScore >= 9;

  if (isEmergency) {
    return {
      severity: 'Urgent',
      severityBadgeClass: 'bg-red-600 text-white',
      isEmergency: true,
      detectedSymptoms: [...selectedSymptoms, ...detectedRedFlags],
      redFlags: detectedRedFlags.length > 0 ? detectedRedFlags : ['Severe distress or emergency symptom indicator'],
      possibleCategories: [
        { name: 'Possible Acute Cardiovascular / Respiratory / Neurological Emergency', probability: 'High Risk' }
      ],
      precautions: [
        'Call 108 Ambulance immediately or go to the nearest emergency hospital.',
        'Keep the patient calm, seated or lying down comfortably.',
        'Do NOT attempt to drive yourself if experiencing severe chest pain or dizziness.',
        'Ensure open airflow around the patient.'
      ],
      avoid: [
        'Do not take unprescribed painkillers or heavy food.',
        'Do not delay seeking hospital emergency care.',
        'Do not leave the patient unattended.'
      ],
      nextAction: 'IMMEDIATE EMERGENCY HOSPITAL REFERRAL (DIAL 108)',
      recommendedSpecialist: 'Emergency Medicine Specialist / Cardiologist / Pulmonologist',
      urgencyLabel: 'CRITICAL / URGENT'
    };
  }

  // STEP 2: Moderate vs Mild Classification
  const isModerate = 
    severityScore >= 6 || 
    durationDays >= 5 || 
    (age > 60 && severityScore >= 5) || 
    existingConditions.toLowerCase().includes('diabetes') ||
    existingConditions.toLowerCase().includes('heart') ||
    existingConditions.toLowerCase().includes('hypertension') ||
    selectedSymptoms.includes('diarrhea') && selectedSymptoms.includes('vomiting');

  // Categorize symptoms into probable health domains
  const categories = [];

  if (selectedSymptoms.includes('fever') || selectedSymptoms.includes('cold') || selectedSymptoms.includes('cough') || selectedSymptoms.includes('sore_throat')) {
    categories.push({ name: 'Viral Upper Respiratory Tract Infection (Common Cold / Flu)', probability: '75%' });
  }

  if (selectedSymptoms.includes('diarrhea') || selectedSymptoms.includes('vomiting') || selectedSymptoms.includes('stomach_pain')) {
    categories.push({ name: 'Acute Gastroenteritis / Stomach Infection', probability: '65%' });
  }

  if (selectedSymptoms.includes('headache') || selectedSymptoms.includes('body_pain') || selectedSymptoms.includes('fatigue')) {
    categories.push({ name: 'Tension Headache / Seasonal Viral Fever', probability: '60%' });
  }

  if (selectedSymptoms.includes('skin_rash')) {
    categories.push({ name: 'Allergic Dermatitis / Superficial Skin Reaction', probability: '55%' });
  }

  if (categories.length === 0) {
    categories.push({ name: 'General Mild Indisposition / Fatigue', probability: '50%' });
  }

  if (isModerate) {
    return {
      severity: 'Moderate',
      severityBadgeClass: 'bg-amber-500 text-white',
      isEmergency: false,
      detectedSymptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Reported general discomfort'],
      possibleCategories: categories,
      precautions: [
        'Drink plenty of clean, boiled water or ORS (Oral Rehydration Solution).',
        'Take adequate bed rest in a well-ventilated room.',
        'Monitor temperature every 6 hours if fever is present.',
        'Eat light, warm, non-spicy cooked meals.'
      ],
      avoid: [
        'Avoid cold drinks, fried foods, and heavy physical strain.',
        'Avoid self-medicating with unprescribed antibiotics.',
        'Avoid skipping meals.'
      ],
      nextAction: 'Consult a Doctor (In-Person or Video Consultation) within 24 hours.',
      recommendedSpecialist: 'General Physician / Internal Medicine Doctor',
      urgencyLabel: 'MODERATE - Doctor Visit Recommended'
    };
  }

  // STEP 3: Mild Case
  return {
    severity: 'Mild',
    severityBadgeClass: 'bg-emerald-600 text-white',
    isEmergency: false,
    detectedSymptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Mild discomfort'],
    possibleCategories: categories,
    precautions: [
      'Get 8 hours of restful sleep and stay warm.',
      'Sip warm fluids, herbal tea, or warm water.',
      'Gargle with warm salt water if throat feels dry or sore.',
      'Maintain good hand hygiene and rest.'
    ],
    avoid: [
      'Avoid sudden exposure to cold air or rain.',
      'Avoid unprescribed medicines.'
    ],
    nextAction: 'Home care precautions. If symptoms persist beyond 3 days, consult a doctor.',
    recommendedSpecialist: 'General Physician',
    urgencyLabel: 'MILD - Home Care & Observation'
  };
};
