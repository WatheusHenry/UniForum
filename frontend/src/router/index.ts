import Register from '@/views/Register.vue'
import Login from '../views/Login.vue'
import Materia from '@/views/Materia.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CadMateria from '@/views/CadMateria.vue'

// Método para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Retorna true se o token existir
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
        if (isAuthenticated()) {
          next(); // Se autenticado, continue para a rota
        } else {
          next('/login'); // Se não autenticado, redirecione para login
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next(); // Se autenticado, continue para a rota
        } else {
          next('/login'); // Se não autenticado, redirecione para login
        }
      }
    },
    {
      path: '/cadmateria',
      name: 'cadmateria',
      component: CadMateria,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next(); // Se autenticado, continue para a rota
        } else {
          next('/login'); // Se não autenticado, redirecione para login
        }
      }
    },
  ]
});

// Exportar o router
export default router;
