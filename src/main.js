// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/'
import 'font-awesome/css/font-awesome.css'
import VueI18n from 'vue-i18n'
import VueUI from 'vue-ui/dist/vue-ui.common';
import 'vue-ui/dist/vue-ui.css';

Vue.use(VueI18n)
Vue.use(VueUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
