import i18n from 'i18next';
import translation from './en/translation.json';
import traduction from './fr/traduction.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  fr: {
    translation: traduction
  },
  en: {
    translation: translation,
  }

} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
});