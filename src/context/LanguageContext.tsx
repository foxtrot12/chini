import React, { createContext, useState } from 'react';
import enTranslations from '../i18n/en.json';
import esTranslations from '../i18n/es.json';
import frTranslations from '../i18n/fr.json';
import hiTranslations from '../i18n/hi.json';

// Single source of truth for language metadata and dictionaries
export const SUPPORTED_LANGUAGES = {
  en: { label: 'English', dictionary: enTranslations as Record<string, string> },
  es: { label: 'Español', dictionary: esTranslations as Record<string, string> },
  fr: { label: 'Français', dictionary: frTranslations as Record<string, string> },
  hi: { label: 'हिन्दी', dictionary: hiTranslations as Record<string, string> },
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;

interface LanguageContextProps {
  lang: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  supportedLanguages: { code: Language; label: string }[];
}

export const LanguageContext = createContext<LanguageContextProps>({
  lang: 'en',
  changeLanguage: () => {},
  t: (key: string) => key,
  supportedLanguages: [],
});

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('portfolio_lang') as Language | null;
  if (stored && stored in SUPPORTED_LANGUAGES) return stored;
  
  const browserLang = navigator.language.split('-')[0] as Language;
  if (browserLang in SUPPORTED_LANGUAGES) return browserLang;
  
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  const changeLanguage = (newLang: Language) => {
    localStorage.setItem('portfolio_lang', newLang);
    setLang(newLang);
  };

  const t = (key: string): string => {
    return SUPPORTED_LANGUAGES[lang]?.dictionary?.[key] || SUPPORTED_LANGUAGES['en']?.dictionary?.[key] || key;
  };

  // Derive supported languages list dynamically from the source of truth
  const supportedLanguages = Object.entries(SUPPORTED_LANGUAGES).map(([code, info]) => ({
    code: code as Language,
    label: info.label,
  }));

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
