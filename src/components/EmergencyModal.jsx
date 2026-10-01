import React from 'react';
import { PhoneCall, X, AlertTriangle, Hospital, ShieldAlert, MapPin } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { useLanguage } from '../context/LanguageContext';

export const EmergencyModal = () => {
  const { isEmergencyOpen, closeEmergency, emergencyReason } = useHealth();
  const { t } = useLanguage();

  if (!isEmergencyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border-2 border-red-600 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-red-200 dark:border-red-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-red-600 dark:text-red-500 uppercase tracking-tight">
                URGENT EMERGENCY ASSISTANCE
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                {emergencyReason || "Immediate medical attention recommended"}
              </p>
            </div>
          </div>
          <button
            onClick={closeEmergency}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Emergency Call Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="tel:108"
            className="p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-2 text-center transition-transform transform hover:-translate-y-1 shadow-lg"
          >
            <PhoneCall className="w-8 h-8" />
            <span className="font-extrabold text-lg">DIAL 108</span>
            <span className="text-xs opacity-90">Free Ambulance Service</span>
          </a>

          <a
            href="tel:112"
            className="p-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex flex-col items-center justify-center gap-2 text-center transition-transform transform hover:-translate-y-1 shadow-lg"
          >
            <PhoneCall className="w-8 h-8" />
            <span className="font-extrabold text-lg">DIAL 112</span>
            <span className="text-xs opacity-90">National Emergency Helpline</span>
          </a>

          <a
            href="tel:104"
            className="p-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex flex-col items-center justify-center gap-2 text-center transition-transform transform hover:-translate-y-1 shadow-lg"
          >
            <PhoneCall className="w-8 h-8" />
            <span className="font-extrabold text-lg">DIAL 104</span>
            <span className="text-xs opacity-90">Medical Advice Helpline</span>
          </a>
        </div>

        {/* First Aid Instructions */}
        <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-xl border border-red-200 dark:border-red-900 space-y-2 text-sm text-red-950 dark:text-red-200">
          <div className="font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>Immediate First Aid Protocol while waiting for Ambulance:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs md:text-sm pl-2">
            <li>Keep the patient in a comfortable seated position with supported back.</li>
            <li>Loosen tight clothing around throat and waist for breathing room.</li>
            <li>Do NOT give heavy food or drinks if patient is feeling weak or dizzy.</li>
            <li>If bleeding is present, apply direct pressure with a clean cloth.</li>
          </ul>
        </div>

        {/* Nearest PHC / Govt Hospital Locator Mock */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Hospital className="w-4 h-4 text-emerald-600" />
              Nearest Govt Hospital / PHC Referral:
            </span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> 2.4 km away
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
            District Government Civil Hospital & Emergency Trauma Ward
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Main Hospital Road, OPD Emergency Gate #2 • Open 24/7
          </p>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={closeEmergency}
            className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl"
          >
            Close Emergency Window
          </button>
        </div>

      </div>
    </div>
  );
};
