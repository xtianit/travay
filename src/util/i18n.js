import axios   from 'axios';
import {i18n} from '../main'

export const doChangeLocale = (locale) => {
  if (i18n.locale !== locale) {
    i18n.locale = locale;
    axios.defaults.headers.common['Accept-Language'] = locale;
    document.querySelector('html').setAttribute('lang', locale.substr(0, 2));
    return locale;
  }
};
