<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div class="container">
    <SideBar />
    <div class="container-main" @scroll.native="onScroll">
      <SearchBar @update-search="pesquisa = $event" />
      <main class="main-content">
        <header class="header">
          <h1>Perguntas</h1>
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
    console.log(newPost.value)
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
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
};

const onScroll = async (event) => {

  const target = event.target;
  const { scrollTop, clientHeight, scrollHeight } = target;


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
  width: 40%;
  border-right: 1px solid rgb(41, 41, 41);
  margin-right: 3rem;
}

.container {
  
  height: 100vh;
  display: flex;
  background-color: #141416;
}

/* Estilos para a barra de rolagem */
.container-main::-webkit-scrollbar {
  width: 8px;
}

.container-main::-webkit-scrollbar-track {
  background: none;
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
  margin: auto;
  min-height: 150vh;

}

.header {
  border-bottom: 1px solid #303030;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ask-button {
  background-color: #2883a7;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.ask-button:hover {
  background-color: #246179;
  transform: scale(1.05);
}

.ask-button:active {
  background-color: #246179;
  transform: scale(0.98);
}

.loading-indicator {
  text-align: center;
  color: white;
  padding: 1rem;
}
</style>
