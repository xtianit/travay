import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Jobs from '@/components/jobs'
import Job from '@/components/job'
import CreateJob from '@/components/createJob'
import Profile from '@/components/profile'
import GetStarted from '@/components/get-started'
import UserGuide from '@/components/userGuide'
import Privacy from '@/components/privacy'
import CodeOfConduct from '@/components/code-of-conduct'
import SetUpMetaMask from '@/components/set-up-metamask'
import Tip from '@/components/tip'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/job/:id',
      name: 'job',
      component: Job
    },
    {
      path: '/createJob',
      name: 'create-job',
      component: CreateJob
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/get-started',
      name: 'get-started',
      component: GetStarted
    },
    {
      path: '/userGuide',
      name: 'user-guide',
      component: UserGuide
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/code-of-conduct',
      name: 'code-of-conduct',
      component: CodeOfConduct
    },
    {
      path: '/set-up-metamask',
      name: 'set-up-metamask',
      component: SetUpMetaMask
    },
    {
      path: '/tip',
      name: 'tip',
      component: Tip
    }
  ]
})
