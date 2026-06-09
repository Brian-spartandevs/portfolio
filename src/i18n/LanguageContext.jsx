import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

const LanguageContext = createContext();

/**
 * Detects browser/OS language.
 * Returns 'it' if Italian, 'es' for Spanish, defaults to 'es' otherwise.
 */
function detectLanguage() {
  const stored = localStorage.getItem('lang');
  if (stored === 'es' || stored === 'it') return stored;

  const browserLang = navigator.language || navigator.userLanguage || '';
  const primary = browserLang.toLowerCase().split('-')[0];

  if (primary === 'it') return 'it';
  return 'es'; // default
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'es' ? 'it' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
