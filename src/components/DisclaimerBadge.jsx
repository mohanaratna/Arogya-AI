import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DisclaimerBadge = ({ className = "" }) => {
  const { t } = useLanguage();

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm leading-relaxed shadow-sm ${className}`}>
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="font-medium">
        <span className="font-bold uppercase text-xs tracking-wider block text-amber-700 dark:text-amber-400 mb-0.5">Medical Safety Notice:</span>
        {t('disclaimer')}
      </div>
    </div>
  );
};
