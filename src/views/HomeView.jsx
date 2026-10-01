import React from 'react';
import { 
  Stethoscope, 
  Mic, 
  Camera, 
  Users, 
  Video, 
  ShieldAlert, 
  PhoneCall, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const HomeView = () => {
  const { t } = useLanguage();
  const { setActiveView, openEmergency, toggleLowBandwidth, isLowBandwidth } = useHealth();

  const mainServices = [
    {
      id: 'symptomChecker',
      title: t('home.checkSymptoms'),
      desc: 'Smart AI symptom evaluation with instant red-flag emergency detection.',
      icon: Stethoscope,
      bg: 'bg-teal-500',
      textColor: 'text-teal-600',
      badge: 'Interactive Triage'
    },
    {
      id: 'voiceAssistant',
      title: t('home.talkVoice'),
      desc: 'Speak naturally in Telugu, Hindi, Tamil, Kannada, or English. Listen to voice responses.',
      icon: Mic,
      bg: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      badge: '5 Languages'
    },
    {
      id: 'photoAnalysis',
      title: t('home.uploadPhoto'),
      desc: 'Take or upload photos of skin rashes, wounds, or eye redness for visual AI screening.',
      icon: Camera,
      bg: 'bg-sky-500',
      textColor: 'text-sky-600',
      badge: 'Visual Screening'
    },
    {
      id: 'doctors',
      title: t('home.findDoctor'),
      desc: 'Connect with verified general physicians, pediatricians, AYUSH, and skin specialists.',
      icon: Users,
      bg: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      badge: 'Verified Doctors'
    },
    {
      id: 'videoConsultation',
      title: t('home.bookVideo'),
      desc: 'Consult doctors over video with real-time speech translation in your native language.',
      icon: Video,
      bg: 'bg-purple-500',
      textColor: 'text-purple-600',
      badge: 'Live Dual Translation'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white p-6 sm:p-10 md:p-16 shadow-xl gradient-bg">
        <div className="max-w-3xl space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/60 border border-teal-400/40 text-teal-200 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Public Health Companion & Early Guidance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {t('home.heroTitle')}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-teal-100 font-normal leading-relaxed opacity-95">
            {t('home.heroDesc')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => setActiveView('symptomChecker')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm md:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-transform transform hover:-translate-y-0.5"
            >
              <Stethoscope className="w-5 h-5" />
              <span>{t('home.checkSymptoms')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('voiceAssistant')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm md:text-base flex items-center gap-2 border border-white/20 backdrop-blur-md transition-colors"
            >
              <Mic className="w-5 h-5 text-teal-300" />
              <span>{t('home.talkVoice')}</span>
            </button>

            <button
              onClick={toggleLowBandwidth}
              className={`px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition-colors ${
                isLowBandwidth 
                  ? 'bg-yellow-400 text-slate-900 border-yellow-300' 
                  : 'bg-slate-900/60 text-slate-300 border-slate-700'
              }`}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>{isLowBandwidth ? "Low-Bandwidth Mode Active" : "Low Bandwidth Mode"}</span>
            </button>
          </div>

        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <Activity className="w-96 h-96 text-white" />
        </div>
      </section>

      {/* Mandatory Medical Safety Disclaimer */}
      <DisclaimerBadge />

      {/* Main Service Feature Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Core Health Services
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Choose how you want to get guidance today
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setActiveView(service.id === 'videoConsultation' ? 'doctors' : service.id)}
                className="card-box bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${service.bg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className={`text-xs font-bold flex items-center gap-1 ${service.textColor}`}>
                  <span>Open Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Callout Card */}
      <section className="bg-red-50 dark:bg-red-950/40 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-extrabold uppercase text-xs tracking-wider">
              <ShieldAlert className="w-5 h-5 animate-bounce" />
              <span>{t('home.emergencySectionTitle')}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Severe Chest Pain, Extreme Shortness of Breath, or Unconsciousness?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t('home.emergencyDesc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:108"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('home.call108')}</span>
            </a>

            <button
              onClick={() => openEmergency("Home emergency section button")}
              className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:bg-slate-800"
            >
              {t('home.findPHC')}
            </button>
          </div>
        </div>
      </section>

      {/* Key Architectural Pillars */}
      <section className="space-y-6 pt-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
          {t('home.featuresTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t('home.feat1Title')}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.feat1Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t('home.feat2Title')}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.feat2Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t('home.feat3Title')}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.feat3Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t('home.feat4Title')}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.feat4Desc')}</p>
          </div>
        </div>
      </section>

    </div>
  );
};
