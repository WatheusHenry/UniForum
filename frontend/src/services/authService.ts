// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; 

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data) {
      console.log(response.data)
      localStorage.setItem('authToken', response.data.token.access_token);
      localStorage.setItem('id', response.data.token.userId);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function register(createUser: { name: any; email: any; password: any; courseIds: any; currentTerm: any; }) {
  const { name, email, password, courseIds, currentTerm } = createUser;
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      courseIds,
      currentTerm,
    });
    console.log(response.data)
    if (response) {
      localStorage.setItem('authToken', response.data.user.access_token);
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
