import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CaptchaComponent = ({ onVerify, isVerified }) => {
  const { t } = useLanguage();
  const [isVerifying, setIsVerifying] = useState(false);
  const [num1] = useState(Math.floor(Math.random() * 5) + 3);
  const [num2] = useState(Math.floor(Math.random() * 4) + 2);
  const [answerInput, setAnswerInput] = useState('');
  const [showMathCheck, setShowMathCheck] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckboxClick = () => {
    if (isVerified) return;
    setShowMathCheck(true);
  };

  const handleMathVerify = (e) => {
    e.preventDefault();
    if (parseInt(answerInput, 10) === num1 + num2) {
      setIsVerifying(true);
      setErrorMsg('');
      setTimeout(() => {
        setIsVerifying(false);
        setShowMathCheck(false);
        onVerify(true);
      }, 700);
    } else {
      setErrorMsg(`Incorrect. ${num1} + ${num2} = ? Please try again.`);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <label 
          onClick={handleCheckboxClick}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all ${
            isVerified 
              ? 'bg-emerald-600 border-emerald-600 text-white' 
              : 'border-slate-400 dark:border-slate-600 hover:border-emerald-500 bg-white dark:bg-slate-800'
          }`}>
            {isVerified && <CheckCircle2 className="w-5 h-5 text-white" />}
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t('auth.notRobot')}
          </span>
        </label>
        
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>reCAPTCHA Demo</span>
        </div>
      </div>

      {showMathCheck && !isVerified && (
        <form onSubmit={handleMathVerify} className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {t('auth.captchaText')} What is <strong className="text-slate-900 dark:text-white">{num1} + {num2}</strong>?
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Result"
              className="w-24 px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
            >
              {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
            </button>
          </div>
          {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
};
