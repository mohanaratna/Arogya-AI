import React from 'react';
import { HeartHandshake, PhoneCall, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { DisclaimerBadge } from './DisclaimerBadge';

export const Footer = () => {
  const { t, languages, setLang } = useLanguage();
  const { openEmergency, toggleLowBandwidth, isLowBandwidth } = useHealth();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Mandatory Medical Disclaimer Badge */}
        <DisclaimerBadge className="bg-slate-800/80 border-slate-700 text-amber-300" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">{t('appName')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('subTagline')}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Attributed to WHO, ICMR & MoHFW</span>
            </div>
          </div>

          {/* Quick Helpline Numbers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Helplines</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="tel:108" className="text-red-400 hover:underline font-bold flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> 108 — National Ambulance
                </a>
              </li>
              <li>
                <a href="tel:112" className="text-amber-400 hover:underline font-bold flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> 112 — Emergency Response
                </a>
              </li>
              <li>
                <a href="tel:104" className="text-teal-400 hover:underline font-bold flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> 104 — Health Information Line
                </a>
              </li>
              <li>
                <button 
                  onClick={() => openEmergency("Footer helpline trigger")}
                  className="mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs"
                >
                  Open Emergency Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Multilingual Switcher Footer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-teal-400" /> Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
            <button
              onClick={toggleLowBandwidth}
              className="mt-2 text-xs text-amber-400 hover:underline font-semibold block"
            >
              {isLowBandwidth ? "Disable Low-Bandwidth Mode" : "Enable Low-Bandwidth Mode (Faster Load)"}
            </button>
          </div>

          {/* Verified Sources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Verified Medical Resources</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                <span>ICMR (Indian Council of Medical Research)</span>
              </li>
              <li className="flex items-center gap-1 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                <span>Ministry of Health & Family Welfare (MoHFW)</span>
              </li>
              <li className="flex items-center gap-1 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                <span>World Health Organization (WHO India)</span>
              </li>
              <li className="flex items-center gap-1 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                <span>Ayushman Bharat Digital Mission (ABDM)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 SwasthyaSaathi. Built for Public Health Guidance & Accessibility.</p>
          <p className="text-slate-400">Designed with simple language, high-contrast & voice-first AI.</p>
        </div>

      </div>
    </footer>
  );
};
