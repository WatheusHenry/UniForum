<template>
  <div class="container">
    <SideBar />
    <div class="container-main" @scroll.native="onScroll">
      <SearchBar @update-search="pesquisa = $event" />
      <main class="main-content">
        <header class="header">
          <h1>{{ materia?.disciplineName }}</h1>
          <!-- <button class="ask-button" @click="openModal">Perguntar +</button> -->
        </header>

        <!-- <div v-if="!isLoading && posts.length === 0" class="no-posts-message">
          Nenhuma publicação disponível
        </div> -->


        <Post v-for="(post, index) in materia?.posts" :key="index" :title="post.title" :content="post.content"
          :createdAt="post.createdAt" :user="post.user" :discipline="post.discipline" :id="post.id"
          :imageUrl="post.imageUrl" />

        <div v-if="isLoading" class="loading-indicator">Carregando...</div>
      </main>
    </div>
    <ListagemAlunos />
    <NewPostModal v-if="isModalOpen" @post-submitted="handleAddPost" @close="closeModal" />
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMateriaById } from '@/services/postService';
import Post from '@/components/Post.vue';
import SideBar from '@/components/SideBar.vue';
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import SearchBar from '@/components/SearchBar.vue';

const isModalOpen = ref(false);
const limit = ref(10);
const page = ref(1);
const isLoading = ref(false);
const noMorePosts = ref(false);
const route = useRoute();
const materia = ref();

const loadMateria = async (materiaId) => {
  try {
    materia.value = await fetchMateriaById(materiaId);
  } catch (error) {
    console.error("Erro ao carregar matéria:", error);
  }
};

const handleAddPost = async (newPost) => {
  const userid = localStorage.getItem('idUser');
  const courseId = localStorage.getItem('idCourse');

  Object.assign(newPost, { user: { id: userid }, course: { id: courseId } });

  try {
    const createdPost = await addPost(newPost);
    closeModal();
  } catch (error) {
    console.error('Erro ao adicionar a publicação:', error);
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Carrega a matéria ao montar o componente
onMounted(() => {
  loadMateria(route.params.materiaId);
});

// Observa mudanças no parametro "materiaId" da rota para recarregar os dados
watch(
  () => route.params.materiaId,
  (newMateriaId) => {
    loadMateria(newMateriaId);
  }
);

</script>

<style scoped>
.no-posts-message {
  text-align: center;
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
}

.container-main {
  padding-top: 1rem;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 35%;
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
  /* min-height: 150vh; */
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

.loading-indicator,
.no-more-posts {
  text-align: center;
  color: white;
  padding: 1rem;
}
</style>
