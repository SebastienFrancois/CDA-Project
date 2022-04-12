import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from './locales/config.json';

const resources = { fr: {}, en: {} };
config.localeFiles.forEach((local) => {
  try {
    resources.fr[local] = require(`./locales/fr/${local}.json`); // eslint-disable-line
    resources.en[local] = require(`./locales/en/${local}.json`); // eslint-disable-line
  } catch (e) {
    throw new Error(`i18n Error, the module ${local} is not found or can not be imported !: ${e}`);
  }
});

export default use(initReactI18next).init({
  resources,
  lng: 'fr',

  interpolation: {
    escapeValue: false,
  },
});
