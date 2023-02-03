// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/notification-list',
    name: 'NotificationsMain',
    component: () => import('../views/NotificationsMain')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/AdminNotifications.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/', '/notification-list']
  // const adminPages = ['/notifications']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.isAuthenticated) {
    return '/login'
  }
  if (!authRequired && auth.isAuthenticated && auth.isAdmin) {
    return '/notifications'
  }
})
export default router
