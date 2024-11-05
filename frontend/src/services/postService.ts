import axios from 'axios'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

const API_URL = 'http://localhost:3000'

const token = () => localStorage.getItem('authToken')

export const fetchPosts = async (page: number, limit: number, courseId: any, authToken: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/post/curso/${courseId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const posts = response.data;
    return posts.sort(
      (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};


export const fetchPostById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    })
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar o post com ID ${id}:`, error)
    throw error
  }
}

export const addPost = async (newPost: any) => {
  try {
    const response = await axios.post(`${API_URL}/post`, newPost, {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Erro ao adicionar a publicação:', error)
    throw error
  }
}

export const fetchCommentsByPostId = async (postId: number) => {
  try {
    const response = await axios.get(`${API_URL}/message/${postId}`, {
      headers: {
        Authorization: `Bearer ${token()}` // Adiciona o token no cabeçalho
      }
    })

    return response.data.messages // Retorna os comentários em formato JSON
  } catch (error) {
    console.error(error) // Log de erro para depuração
    throw new Error('Erro ao carregar comentários') // Lança erro em caso de falha
  }
}

export const addComment = async (postId: number, commentContent: string) => {
  try {
    const userId = localStorage.getItem('idUser')
    const response = await axios.post(
      `${API_URL}/message`,
      {
        postId,
        content: commentContent,
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token()}` // Adiciona o token no cabeçalho
        }
      }
    )

    return response.data // Retorna o comentário adicionado
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error)
    throw error // Lança erro em caso de falha
  }
}
