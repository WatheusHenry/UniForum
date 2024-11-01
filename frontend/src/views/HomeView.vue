<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div class="container">
    <SideBar />
    <div class="container-main" @scroll.native="onScroll">
      <SearchBar @update-search="pesquisa = $event" />
      <main class="main-content">
        <header class="header">
          <h1>Feed</h1>
          <button class="ask-button" @click="openModal">Perguntar +</button>
        </header>
        <Post v-for="(post, index) in posts" :key="index" :title="post.title" :content="post.content"
          :createdAt="post.createdAt" :user="post.user" :discipline="post.discipline" :id="post.id" />

        <div v-if="isLoading" class="loading-indicator">Carregando...</div>
      </main>
    </div>
    <ListagemAlunos />
    <NewPostModal v-if="isModalOpen" @post-submitted="handleAddPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchPosts, addPost } from '@/services/postService';
import { fetchUserData } from '@/services/userService';
import SideBar from '@/components/SideBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import Post from '@/components/Post.vue';
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import NewPostModal from '@/components/NewPostModal.vue';

const posts = ref([]);
const pesquisa = ref('');
const user = ref();
const isModalOpen = ref(false);
const limit = ref(10);
const page = ref(1);
const isLoading = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleAddPost = async (newPost) => {
  const userid = localStorage.getItem('idUser');
  const courseId = localStorage.getItem('idCourse');

  newPost.user = { id: userid };
  newPost.course = { id: courseId };

  try {
    const createdPost = await addPost(newPost);
    posts.value.unshift(createdPost);
    closeModal();
  } catch (error) {
    console.error('Erro ao adicionar a publicação:', error);
  }
};

const loadUserData = async () => {
  const userid = localStorage.getItem('idUser');
  try {
    user.value = await fetchUserData(userid);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
};

const loadPosts = async () => {
  try {
    const fetchedPosts = await fetchPosts(page.value, limit.value);
    if (fetchedPosts.length === 0) {
      return;
    }

    posts.value = [...posts.value, ...fetchedPosts];
    console.log(posts.value)

  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
};

const onScroll = async (event) => {

  const target = event.target;
  const { scrollTop, clientHeight, scrollHeight } = target;

  console.log(`scrollTop: ${scrollTop}, clientHeight: ${clientHeight}, scrollHeight: ${scrollHeight}`);

  if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading.value) {
    isLoading.value = true;
    page.value++;

    try {
      await loadPosts();
    } catch (error) {
      console.error("Erro ao carregar mais posts:", error);
    } finally {
      isLoading.value = false;
    }
  }
};



onMounted(() => {
  loadUserData();
  loadPosts();
});
</script>



<style scoped>
.container-main {
  padding-top: 1rem;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
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
  min-height: 150vh;
  /* Exemplo de altura mínima para permitir rolagem */

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

.loading-indicator {
  text-align: center;
  color: white;
  padding: 1rem;
}
</style>
