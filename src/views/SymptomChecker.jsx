import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  PhoneCall, 
  Calendar, 
  UserCheck, 
  ArrowRight, 
  ShieldAlert,
  Save,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { commonSymptomsList, analyzeSymptomsPipeline } from '../data/symptomRules';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const SymptomChecker = () => {
  const { t } = useLanguage();
  const { setActiveView, openEmergency, saveHistoryRecord } = useHealth();
  const { user } = useAuth();

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [freeText, setFreeText] = useState('');
  const [age, setAge] = useState(user?.age || '35');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [duration, setDuration] = useState('2');
  const [severity, setSeverity] = useState('4');
  const [existingConditions, setExistingConditions] = useState(user?.conditions || '');
  
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleRunTriage = (e) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0 && !freeText.trim()) {
      alert("Please select at least one symptom or describe your problem in words.");
      return;
    }

    const result = analyzeSymptomsPipeline({
      selectedSymptoms,
      freeText,
      age: parseInt(age, 10),
      gender,
      durationDays: parseInt(duration, 10),
      severityScore: parseInt(severity, 10),
      existingConditions
    });

    setAssessmentResult(result);
    setIsSaved(false);

    // Save automatically to patient health history
    saveHistoryRecord({
      type: 'Symptom Triage',
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : [freeText],
      severity: result.severity,
      category: result.possibleCategories[0]?.name || 'Health Assessment',
      guidance: result.precautions.join(' '),
      referral: result.nextAction,
      isEmergency: result.isEmergency
    });

    // Emergency red-flag modal popup
    if (result.isEmergency) {
      openEmergency(`Symptom Triage Red Flag: ${result.redFlags.join(', ')}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('triage.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('triage.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Input Form Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Step 1: Select Common Symptoms */}
        <div className="space-y-3">
          <label className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
            1. {t('triage.selectSymptomsLabel')}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {commonSymptomsList.map((item) => {
              const isSelected = selectedSymptoms.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleSymptom(item.id)}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all text-left ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-500'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Free-text symptoms */}
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
            2. {t('triage.freeTextLabel')}
          </label>
          <textarea
            rows={3}
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="e.g. Having severe headache since yesterday morning with mild shivering and throat dry sensation..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Step 3: Patient Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t('triage.ageLabel')}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t('triage.genderLabel')}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t('triage.durationLabel')}
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t('triage.severityLabel')} ({severity}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Existing Health Conditions */}
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            {t('triage.existingLabel')}
          </label>
          <input
            type="text"
            value={existingConditions}
            onChange={(e) => setExistingConditions(e.target.value)}
            placeholder="e.g. Diabetes, High Blood Pressure, Asthma, Heart disease..."
            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRunTriage}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform transform active:scale-98"
        >
          <Activity className="w-5 h-5" />
          <span>{t('triage.analyzeBtn')}</span>
        </button>

      </div>

      {/* RESULTS CARDS */}
      {assessmentResult && (
        <div className="bg-white dark:bg-slate-900 border-2 border-teal-500 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in slide-in-from-bottom-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${assessmentResult.severityBadgeClass}`}>
                {assessmentResult.severity} SEVERITY
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                {t('triage.resultsTitle')}
              </h2>
            </div>

            <span className="text-xs font-bold text-slate-500">
              {assessmentResult.urgencyLabel}
            </span>
          </div>

          {/* Emergency Alert Banner */}
          {assessmentResult.isEmergency && (
            <div className="p-4 rounded-2xl bg-red-600 text-white space-y-3">
              <div className="font-extrabold text-sm flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
                <span>{t('triage.redFlagWarning')}</span>
              </div>
              <p className="text-xs leading-relaxed">
                Emergency indicators detected: {assessmentResult.redFlags.join(', ')}. Urgent hospital evaluation is required immediately.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="tel:108"
                  className="px-5 py-2.5 bg-white text-red-700 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  CALL 108 AMBULANCE NOW
                </a>
              </div>
            </div>
          )}

          {/* Detected Symptoms */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              {t('triage.detectedSymptoms')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {assessmentResult.detectedSymptoms.map((sym, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700">
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Possible Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              {t('triage.possibleCauses')}
            </h4>
            <div className="space-y-2">
              {assessmentResult.possibleCategories.map((cat, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-teal-950 dark:text-teal-200">{cat.name}</span>
                  <span className="font-semibold text-teal-700 dark:text-teal-400">{cat.probability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Precautions & Avoid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2 text-xs">
              <h4 className="font-extrabold text-emerald-900 dark:text-emerald-300 uppercase">
                {t('triage.precautions')}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-emerald-950 dark:text-emerald-200">
                {assessmentResult.precautions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 space-y-2 text-xs">
              <h4 className="font-extrabold text-red-900 dark:text-red-300 uppercase">
                {t('triage.avoid')}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-red-950 dark:text-red-200">
                {assessmentResult.avoid.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block">{t('triage.nextStep')}</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">{assessmentResult.nextAction}</span>
            </div>

            <button
              onClick={() => setActiveView('doctors')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition-transform transform active:scale-95 shrink-0"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('triage.bookDoctorBtn')}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
