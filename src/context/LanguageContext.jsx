import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Read saved language or default to 'en'
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('swasthya_lang') || 'en';
  });

  const setLang = (newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem('swasthya_lang', newLang);
    }
  };

  // Helper function to resolve nested keys like t('nav.home')
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[lang] || translations.en;
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation key missing
        let fallback = translations.en;
        for (const k of keys) {
          if (fallback && fallback[k] !== undefined) {
            fallback = fallback[k];
          } else {
            return path; // Return key path if not found
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
