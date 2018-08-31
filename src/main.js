// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/'
import VueI18n from 'vue-i18n'
import 'font-awesome/css/font-awesome.css'

import VueUI from 'vue-ui/dist/vue-ui.common';
import 'vue-ui/dist/vue-ui.css';
import { userRole } from '@/directives/userRole'
import enlocale from '../i18n/en.json';

Vue.use(VueI18n)

const messages = {
  en: enlocale
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

window['$d'] = i18n.d.bind(i18n);
window['$t'] = i18n.t.bind(i18n);
window['$i18n'] = i18n;

Vue.use(VueUI, {
  store,
  i18n,
});

Vue.directive('userRole', userRole)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
