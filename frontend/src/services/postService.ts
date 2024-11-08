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
          Authorization: `Bearer ${authToken}`
        }
      }
    )

    const posts = response.data
    return posts.sort(
      (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}

export const fetchPostsByUser = async (
  page: any,
  limit: any,
  courseId: any,
  authToken: any,
  userId: any
) => {
  try {
    const response = await axios.get(`${API_URL}/post/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    const posts = response.data
    return posts.sort(
      (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}

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

export const addComment = async (
  postId: string | string[],
  newComment: string,
  selectedImage: File
) => {
  const userId = localStorage.getItem('idUser') || "";
  try {
    const formData = new FormData();
    formData.append('content', newComment);
    formData.append('userId', userId);
    formData.append('postId', postId as string); 

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    const response = await axios.post(
      `${API_URL}/message`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token()}` 
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar o comentário:', error);
    throw error;
  }
}


export const deletePost = async (postId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token()}` // Adiciona o token no cabeçalho
      }
    })
    return response.data // Retorna os dados da resposta após a deleção
  } catch (error) {
    console.error(`Erro ao deletar o post com ID ${postId}:`, error)
    throw error // Lança erro em caso de falha
  }
}
