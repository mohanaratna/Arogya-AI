import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  Pill, 
  Hospital, 
  HeartPulse, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { healthArticles, medicinesEncyclopedia } from '../data/healthKnowledge';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const HealthInfoView = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' or 'medicines'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState('art_fever');

  const filteredArticles = healthArticles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMedicines = medicinesEncyclopedia.filter(med =>
    med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <BookOpen className="w-8 h-8 text-teal-600" />
              {t('library.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('library.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ICMR & WHO Sources</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'articles'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>{t('library.tabProblems')} & Guides</span>
          </button>

          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'medicines'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>{t('library.tabMedicines')}</span>
          </button>
        </div>
      </div>

      <DisclaimerBadge />

      {/* HEALTH ARTICLES SECTION */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          {filteredArticles.map((art) => {
            const isExpanded = expandedArticle === art.id;
            return (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-teal-500 transition-colors"
              >
                <div 
                  onClick={() => setExpandedArticle(isExpanded ? null : art.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                      {art.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white pt-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500">{art.summary}</p>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-teal-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Article Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 animate-in fade-in">
                    
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase text-xs tracking-wider text-teal-600 mb-1">
                        Explanation:
                      </h4>
                      <p>{art.content.explanation}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block">Common Symptoms:</span>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          {art.content.symptoms.map((s, idx) => <li key={idx}>{s}</li>)}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-950 dark:text-red-200 space-y-1">
                        <span className="font-bold block">Red-Flag Warning Signs:</span>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          {art.content.warningSigns.map((w, idx) => <li key={idx}>{w}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 space-y-1">
                      <span className="font-bold uppercase text-xs tracking-wider block">Safe Precautions:</span>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        {art.content.precautions.map((p, idx) => <li key={idx}>{p}</li>)}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="font-semibold text-teal-600">{art.source}</span>
                      <span>{art.content.whenDoctor}</span>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MEDICINES ENCYCLOPEDIA SECTION */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
            <strong>Educational Disclaimer:</strong> Medicines information is for public health education only and does NOT constitute a prescription engine. Always consult a qualified medical doctor or PHC officer before taking any medication.
          </div>

          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                    {t('library.genericName')}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white pt-1">
                    {med.genericName}
                  </h3>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                  {med.isOTC ? "Over-The-Counter (OTC)" : "Prescription Required"}
                </span>
              </div>

              <div className="text-xs sm:text-sm space-y-2 text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-200 dark:border-slate-800">
                <p><strong>{t('library.purpose')}</strong> {med.purpose}</p>
                <p><strong>{t('library.precautions')}</strong> {med.precautions}</p>
                <p className="text-red-600 dark:text-red-400"><strong>{t('library.warnings')}</strong> {med.warnings}</p>
              </div>

              <div className="text-xs text-slate-400 font-semibold pt-1 flex items-center justify-between">
                <span>Source: {med.source}</span>
                <span className="text-teal-600 font-bold">Non-Prescription Information</span>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};
