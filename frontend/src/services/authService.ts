// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // URL do backend NestJS

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data) {
      localStorage.setItem('authToken', response.data);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function register(name, email, password, courses, currentTerm) {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      courses,
      currentTerm,
    });

    if (response.data) {
      localStorage.setItem('authToken', response.data);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('authToken');
}
