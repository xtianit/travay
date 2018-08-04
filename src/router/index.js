import Vue from 'vue'
import Router from 'vue-router'
import Travay from '@/components/travay'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'travay',
    component: Travay
  }]
})
