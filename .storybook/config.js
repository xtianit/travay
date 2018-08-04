// import { configure } from '@storybook/vue';
// import Vue from 'vue';
// import VueI18n from 'vue-i18n';
// import VueRouter from 'vue-router';
// import VeeValidate from 'vee-validate';
//
// Vue.use(VueI18n);
// Vue.use(VueRouter);
// Vue.use(VeeValidate);
// Vue.use('vue-moment');
//
// // automatically import all files ending in *.stories.ts
// const req = require.context(
//   '../src/components/shared',
//   true,
//   /.stories.ts$/
// );
//
// const loadStories = () => {
//   req.keys().forEach(filename => req(filename));
// };
//
// configure(loadStories, module);
//

import { configure } from "@storybook/vue";

import Vue from "vue";
import Vuex from "vuex"; // Vue plugins

// Install Vue plugins.
Vue.use(Vuex);

// automatically import all files ending in *.stories.ts
const req = require.context(
  "../src/app/shared/components",
  true,
  /.stories.ts$/
);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
x;
