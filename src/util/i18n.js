import Vue     from 'vue';
import VueI18n from 'vue-i18n';
import axios   from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n(

);

const loadedLocales = [];

const setI18nLocale = (locale) => {
  i18n.locale = locale;
  axios.defaults.headers.common['Accept-Language'] = locale;
  document.querySelector('html').setAttribute('lang', locale.substr(0, 2));
  return locale;
};

export const loadLocaleAsync = (locale) => {
  if (i18n.locale !== locale) {

    if (!loadedLocales.find((l) => l === locale)) {
      return axios.get(`/i18n/${locale}.json`)
        .then((response) => {
          i18n.setLocaleMessage(locale, response.data);
          loadedLocales.push(locale);
          return setI18nLocale(locale);
        });
    }

    return Promise.resolve(setI18nLocale(locale));
  }
  return Promise.resolve(locale);
};
