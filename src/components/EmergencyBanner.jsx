import React from 'react';
import { PhoneCall, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';

export const EmergencyBanner = () => {
  const { t } = useLanguage();
  const { openEmergency } = useHealth();

  return (
    <div className="bg-red-700 text-white py-2 px-4 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-300 animate-pulse shrink-0" />
          <span className="tracking-wide">{t('emergencyNotice')}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:108"
            className="bg-white text-red-700 hover:bg-yellow-300 hover:text-red-900 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            DIAL 108 (Ambulance)
          </a>
          <button
            onClick={() => openEmergency("Header persistent callout")}
            className="bg-red-900 hover:bg-red-950 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors border border-red-500"
          >
            Emergency Care Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
