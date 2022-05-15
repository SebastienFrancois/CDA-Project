import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translation/en.json';
import fr from './translation/fr.json';

const ressources = {
  en,
  fr,
};

export const availableLanguages = Object.keys(ressources);

i18n.use(initReactI18next).use(LanguageDetector).init({
  ressources,
  lng: 'fr',
  defaultNS: 'common',
  fallbackLng: 'fr',
});
