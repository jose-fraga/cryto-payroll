import i18n from 'i18n-js';
import supportedLanguages from './languages';
import * as dateFnsLocales from './date-fns';

import english from './languages/en.json';

i18n.translations = { en: english };

i18n.fallbacks = true;

export const setLanguage = (language) => {
  i18n.locale = language;
};

export const getLanguageDetails = (lang) =>
  supportedLanguages.find((obj) => obj.code === lang);

export const getLanguageFlag = (language) => {
  return getLanguageDetails(language)['flag'];
};

export const getLanguageName = (language) => {
  return getLanguageDetails(language)['name'];
};

// TODO: review if it is working
export const getDateFnsLocale = (language = 'us') => {
  const { en } = dateFnsLocales;
  switch (language) {
    case 'es':
      return es;
    default:
      return en;
  }
};

export default i18n;
