import { BehaviorSubject } from 'rxjs';
import enTranslations from '../i18n/en.json';
import esTranslations from '../i18n/es.json';

export type Language = 'en' | 'es';

const dictionaries: Record<Language, Record<string, string>> = {
  en: enTranslations as Record<string, string>,
  es: esTranslations as Record<string, string>,
};

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('portfolio_lang');
  if (stored === 'en' || stored === 'es') return stored;
  
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'es' ? 'es' : 'en';
};

const currentLanguageSubject = new BehaviorSubject<Language>(getInitialLanguage());

export const TranslationService = {
  currentLanguage$: currentLanguageSubject.asObservable(),

  setLanguage(lang: Language) {
    localStorage.setItem('portfolio_lang', lang);
    currentLanguageSubject.next(lang);
  },

  getLanguage(): Language {
    return currentLanguageSubject.value;
  },

  translate(key: string): string {
    const lang = currentLanguageSubject.value;
    return dictionaries[lang]?.[key] || dictionaries['en']?.[key] || key;
  }
};
