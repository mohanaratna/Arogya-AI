import React from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Mic, 
  Camera, 
  BookOpen, 
  Users, 
  Video, 
  Calendar, 
  Clock, 
  Trash2, 
  PhoneCall, 
  ShieldAlert, 
  Globe, 
  User,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const DashboardView = () => {
  const { t, lang, setLang, languages } = useLanguage();
  const { 
    setActiveView, 
    healthHistory, 
    deleteHistoryRecord, 
    appointments, 
    openEmergency 
  } = useHealth();
  const { user } = useAuth();

  const upcomingAppt = appointments.find(a => a.status === 'Confirmed');

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 gradient-bg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-200 uppercase tracking-wider block">
              Patient Health Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              {t('dashboard.welcome')} {user?.name || "Patient"}!
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 font-medium">
              Registered ID: {user?.id || 'usr_101'} • Age: {user?.age || '35'} • Preferred Language: {languages.find(l => l.code === lang)?.nativeName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('profile')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => openEmergency("Dashboard emergency action")}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Emergency 108</span>
            </button>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Upcoming Appointment Highlight Widget */}
      {upcomingAppt ? (
        <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-3xl p-6 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {t('dashboard.upcomingAppt')}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {upcomingAppt.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{upcomingAppt.doctorName}</h3>
              <p className="text-xs text-slate-500 font-semibold">{upcomingAppt.specialty} • {upcomingAppt.hospital}</p>
              <p className="text-xs text-indigo-600 font-bold pt-1">
                Date: {upcomingAppt.date} at {upcomingAppt.time} ({upcomingAppt.mode})
              </p>
            </div>

            <button
              onClick={() => setActiveView('videoConsultation')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md shrink-0"
            >
              <Video className="w-4 h-4" />
              <span>Join Telehealth Call</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 text-center font-bold">
          {t('dashboard.noAppts')}
        </div>
      )}

      {/* QUICK TILES GRID */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          {t('dashboard.quickActions')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveView('symptomChecker')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left space-y-2 shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-xs block">{t('nav.symptomChecker')}</span>
          </button>

          <button
            onClick={() => setActiveView('voiceAssistant')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left space-y-2 shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-xs block">{t('nav.voiceAssistant')}</span>
          </button>

          <button
            onClick={() => setActiveView('photoAnalysis')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left space-y-2 shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-xs block">{t('nav.photoAnalysis')}</span>
          </button>

          <button
            onClick={() => setActiveView('doctors')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left space-y-2 shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-xs block">{t('nav.doctors')}</span>
          </button>
        </div>
      </div>

      {/* HEALTH HISTORY TIMELINE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-teal-600" />
            {t('dashboard.healthTimeline')}
          </h2>

          <button
            onClick={() => setActiveView('symptomChecker')}
            className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
          >
            <span>Check New Symptoms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {healthHistory.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6 font-semibold">
            {t('dashboard.emptyHistory')}
          </p>
        ) : (
          <div className="space-y-4">
            {healthHistory.map((record) => (
              <div
                key={record.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">{record.date}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      record.severity === 'Urgent' ? 'bg-red-600 text-white' : record.severity === 'Moderate' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {record.severity}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(t('dashboard.confirmDelete'))) {
                        deleteHistoryRecord(record.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                    title={t('dashboard.deleteRecord')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {record.category}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Symptoms:</strong> {Array.isArray(record.symptoms) ? record.symptoms.join(', ') : record.symptoms}
                </p>

                <p className="text-xs text-teal-700 dark:text-teal-300 font-medium">
                  <strong>Guidance:</strong> {record.guidance}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
