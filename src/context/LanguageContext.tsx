import React, { createContext, useState } from 'react';
import enTranslations from '../i18n/en.json';
import esTranslations from '../i18n/es.json';

export type Language = 'en' | 'es';

const dictionaries: Record<Language, Record<string, string>> = {
  en: enTranslations as Record<string, string>,
  es: esTranslations as Record<string, string>,
};

interface LanguageContextProps {
  lang: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextProps>({
  lang: 'en',
  changeLanguage: () => {},
  t: (key: string) => key,
});

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('portfolio_lang');
  if (stored === 'en' || stored === 'es') return stored;
  
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'es' ? 'es' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  const changeLanguage = (newLang: Language) => {
    localStorage.setItem('portfolio_lang', newLang);
    setLang(newLang);
  };

  const t = (key: string): string => {
    return dictionaries[lang]?.[key] || dictionaries['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
