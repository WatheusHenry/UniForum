import axios from 'axios';

const API_URL = 'http://localhost:3000';

const token = () => localStorage.getItem('authToken');

export const fetchPosts = async (page: any, limit: any) => {
  try {
    const response = await axios.get(`${API_URL}/post?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const fetchPostById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o post com ID ${id}:`, error);
    throw error;
  }
};


export const addPost = async (newPost: any) => {
  try {
    const response = await axios.post(`${API_URL}/post`, newPost, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar a publicação:', error);
    throw error;
  }
};
