import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ukTranslation from './locales/uk/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('i18nextLng') || 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      // Order of detection
      order: ['localStorage', 'navigator'],
      // Keys to lookup language from
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
