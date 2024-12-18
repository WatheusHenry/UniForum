import axios from 'axios';

const API_URL = 'http://localhost:3000';

const token = () => localStorage.getItem('authToken');

export const fetchUserData = async (userid: any) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};
