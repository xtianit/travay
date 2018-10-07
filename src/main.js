// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/'
import VueUI from 'vue-ui/dist/vue-ui.common';
import 'vue-ui/dist/vue-ui.css';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import { userRole } from './directives/userRole'
// import VueMultianalytics from 'vue-multianalytics'
import VueI18n from 'vue-i18n'
import enlocale from '../i18n/en.json';
import htlocale from '../i18n/ht.json';
import frlocale from '../i18n/fr.json';

Vue.directive('userRole', userRole);

Vue.use(VueI18n);

const messages = {
  en: enlocale,
  ht: htlocale,
  fr: frlocale
};

const dateTimeFormats = {
  'en': {
    datePicker: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'ht': {
    datePicker: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  },
  'fr': {
    datePicker: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  }
};

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: 'ht', // set default locale
  messages,
  dateTimeFormats
});

window['$d'] = i18n.d.bind(i18n);
window['$t'] = i18n.t.bind(i18n);
window['$i18n'] = i18n;

Vue.use(VueUI, {
  store,
  i18n,
});

// vue-multianalytics
// let gaConfig = {
//   appName: 'Travay', // Mandatory
//   appVersion: '0.0.1', // Mandatory
//   trackingId: 'UA-71718222-9', // Mandatory
//   debug: true, // Whether or not display console logs debugs (optional)
// };
//
// let mixpanelConfig = {
//   token: '4be6f13d7bef9dab00a44273cade05a3'
// };
//
// Vue.use(VueMultianalytics, {
//   modules: {
//     ga: gaConfig,
//     mixpanel: mixpanelConfig
//   }
// });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
});

const prod = process.env.NODE_ENV === 'production';
const shouldSW = 'serviceWorker' in navigator && prod;

if (shouldSW) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('SW registered')
  })
}

