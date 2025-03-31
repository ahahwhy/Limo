import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/Home.vue'
import GroupTrenings from '../pages/GroupTrenings.vue'
import Autorization from '../pages/Autorization.vue'
import Registration from '@/pages/Registration.vue'
import Account from '../pages/Account.vue'
import Calculate from '@/pages/Calculate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/groupTrenings',
    name: 'GroupTrenings',
    component: GroupTrenings,
  },
  {
    path: '/autorization',
    name: 'Autorization',
    component: Autorization,
  },

  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/calculate',
    name: 'Calculate',
    component: Calculate,
  },

  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { showHeader: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
