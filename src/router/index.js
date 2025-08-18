import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import NewBookmark from '../views/NewBookmark.vue'
import EditBookmark from '../views/EditBookmark.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/bookmarks/new',
    name: 'NewBookmark',
    component: NewBookmark,
    meta: { requiresAuth: true }
  },
  {
    path: '/bookmarks/edit/:id',
    name: 'EditBookmark',
    component: EditBookmark,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { isSignedIn } = useAuth()
  
  if (to.meta.requiresAuth && !isSignedIn.value) {
    // Redirect to sign in
    window.location.href = '/sign-in'
    return
  }
  
  next()
})

export default router