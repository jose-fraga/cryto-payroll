import i18n from 'i18n-js';
import supportedLanguages from './languages';
import * as dateFnsLocales from './date-fns';

import german from './languages/de.json';
import english from './languages/en.json';
import spanish from './languages/es.json';
import french from './languages/fr.json';
import italian from './languages/it.json';
import japanese from './languages/ja.json';
import portuguese from './languages/pt.json';
import russian from './languages/ru.json';
import chinese from './languages/zh.json';

i18n.translations = {
  de: german,
  en: english,
  es: spanish,
  fr: french,
  it: italian,
  ja: japanese,
  pt: portuguese,
  ru: russian,
  zh: chinese,
};

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
  const { en, es } = dateFnsLocales;
  switch (language) {
    case 'es':
      return es;
    default:
      return en;
  }
};

export default i18n;
