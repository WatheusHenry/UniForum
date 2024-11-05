import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

const token = () => localStorage.getItem('authToken');


export async function fetchCursos() {
  try {
    const response = await apiClient.get('/curso', {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar cursos:', error)
    throw error
  }
}
