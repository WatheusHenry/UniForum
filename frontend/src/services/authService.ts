// services/authService.js
import axios from 'axios'

const API_URL = 'http://localhost:3000/auth'

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    })

    if (response.data) {
      console.log(response.data)
      localStorage.setItem('authToken', response.data.token.access_token)
      localStorage.setItem('idUser', response.data.token.userId)
    }

    return response.data
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
  }
}

export async function register(createUser: { name: any; email: any; password: any; courseIds: any; currentTerm: any }, profilePicture: string | Blob | null) {
  const { name, email, password, courseIds, currentTerm } = createUser

  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('courseIds', JSON.stringify(courseIds)) // Enviar como string JSON
  formData.append('currentTerm', currentTerm)

  if (profilePicture) {
    formData.append('profilePicture', profilePicture) // Adiciona a imagem
  }

  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data) {
      localStorage.setItem('authToken', response.data.user.access_token)
      localStorage.setItem('idUser', response.data.user.userId)
    }

    return response.data
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    throw error
  }
}

export function logout() {
  localStorage.removeItem('authToken')
}
