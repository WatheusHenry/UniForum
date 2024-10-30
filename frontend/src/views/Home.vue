<template>
  <div class="container">
    <SideBar />

    <div class="container-main">
      <SearchBar @update-search="pesquisa = $event" />

      <main class="main-content">
        <header class="header">
          <h1>Feed</h1>
          <button class="ask-button" @click="openModal">Perguntar +</button>
        </header>

        <!-- Lista de Posts -->
        <Post v-for="(post, index) in posts" :key="index" :author="post.author" :content="post.content"
          :profilePic="post.profilePic" />
      </main>
    </div>

    <ListagemAlunos />

    <!-- Modal de Nova Publicação -->
    <NewPostModal v-if="isModalOpen" @post-submitted="addPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import Post from '@/components/Post.vue';
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import NewPostModal from '@/components/NewPostModal.vue';

const posts = ref([
  {
    author: 'Fulano da Silva',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    profilePic: '../assets/images/perfil-de-usuario.png'
  },
  // Adicione outros posts aqui
]);

const pesquisa = ref('');
const user = ref();
const isModalOpen = ref(false); // Controle de exibição do modal

// Função para abrir o modal
const openModal = () => {
  isModalOpen.value = true;
};

// Função para fechar o modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Adicionar uma nova publicação ao array de posts
const addPost = (newPost) => {
  posts.value.unshift(newPost); // Adiciona a nova publicação ao início da lista
  closeModal(); // Fecha o modal
};

// Funções de busca de dados
onMounted(() => {
  fetchUserData();
});

const fetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  const userid = localStorage.getItem('id');

  try {
    const response = await axios.get(`http://localhost:3000/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
};
</script>

<style scoped>
.container-main {
  margin-top: 1rem;
  height: 100vh;
  overflow-y: auto;
  width: 60%;
}

.container {
  height: 100vh;
  display: flex;
  background-color: #2D2D30;
}

/* Estilos para a barra de rolagem */
.container-main::-webkit-scrollbar {
  width: 8px;
}

.container-main::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 10px;
}

.container-main::-webkit-scrollbar-thumb {
  background-color: #272727;
  border-radius: 10px;
  border: 2px solid #2d2d2d;
}

.container-main::-webkit-scrollbar-thumb:hover {
  background-color: #5e5e5e;
}

.main-content {
  width: 90%;
  margin: auto;
}

.header {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ask-button {
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.ask-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.ask-button:active {
  background-color: #1e7e34;
  transform: scale(0.98);
}
</style>
