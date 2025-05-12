import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '../firebase'
import { isAdmin } from '../services/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/autorization',
    name: 'Autorization',
    component: () => import('@/pages/Autorization.vue'),
  },
  {
    path: '/group-trainings',
    name: 'GroupTrenings',
    component: () => import('@/pages/GroupTrenings.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/pages/Registration.vue'),
  },
  {
    path: '/calculate',
    name: 'Calculate',
    component: () => import('@/pages/Calculate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/pages/Account.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/adminAccount',
    name: 'AdminAccount',
    component: () => import('@/pages/AdminAccount.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/adminUsers',
    name: 'AdminUsers',
    component: () => import('@/pages/AdminUsers.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)
  const isUserAdmin = await isAdmin()

  if (requiresAuth && !auth.currentUser) {
    next('/autorization')
  } else if (requiresAdmin && !isUserAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
