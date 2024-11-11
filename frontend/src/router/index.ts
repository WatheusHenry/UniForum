import Register from '@/views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import CadMateria from '@/views/MateriasView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MateriaDetails from '@/views/MateriaDetails.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login')
      }
    },
    {
      path: '/materias',
      name: 'materias',
      component: CadMateria,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login')
      }
    },
    {
      path: '/materia/:materiaId',
      name: 'MateriaDetails',
      component: MateriaDetails,
      props: true
    },
    {
      path: '/post/:id',
      name: 'postDetail',
      component: PostDetailView,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login')
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login')
      }
    }
  ]
})

export default router
