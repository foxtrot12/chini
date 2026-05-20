import { useState, useEffect } from 'react';
import { TranslationService } from '../services/TranslationService';
import type { Language } from '../services/TranslationService';

export function useTranslation() {
  const [lang, setLang] = useState<Language>(() => TranslationService.getLanguage());

  useEffect(() => {
    const subscription = TranslationService.currentLanguage$.subscribe((newLang) => {
      setLang(newLang);
    });
    return () => subscription.unsubscribe();
  }, []);

  const t = (key: string): string => {
    return TranslationService.translate(key);
  };

  const changeLanguage = (newLang: Language) => {
    TranslationService.setLanguage(newLang);
  };

  return { t, lang, changeLanguage };
}
