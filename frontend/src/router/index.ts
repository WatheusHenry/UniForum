import Register from '@/views/Register.vue'
import Login from '../views/Login.vue'
import Materia from '@/views/Materia.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CadMateria from '@/views/CadMateria.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); 
};

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
      path: '/materia',
      name: 'materia',
      component: Materia,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login');
      }
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login');
      }
    },
    {
      path: '/cadmateria',
      name: 'cadmateria',
      component: CadMateria,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next('/login');
      }
    },
  ]
});

export default router;
