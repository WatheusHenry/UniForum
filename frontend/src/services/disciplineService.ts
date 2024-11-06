// src/services/disciplineService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

const token = () => localStorage.getItem('authToken');

export const fetchDisciplinesByCourse = async (courseId: any) => {
  try {
    const response = await axios.get(`${API_URL}/disciplina/curso/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    throw error;
  }
};
