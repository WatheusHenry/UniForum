<template>
  <div class="container">
    <SideBar/>
    <div class="container-main">
      <SearchBar/>
      <main class="main-content">
        <header class="header">
          <h1>Matérias</h1>
        </header>
        <div class="post-container">
          <div v-for="(disciplina, index) in disciplinas" :key="index" class="post">
            <div class="post-header">
              <img class="icon" src="../assets/images/materia.svg" alt="Matéria" />
              <p class="post-title">{{ disciplina.name }}</p>
            </div>
            <p class="post-content">{{ disciplina.description }}</p>
          </div>
        </div>
      </main>
    </div>
    <ListagemAlunos/>
  </div>
</template>

<script setup>
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import SearchBar from '@/components/SearchBar.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const disciplinas = ref([]);

const fetchDisciplines = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(`http://localhost:3000/disciplina/curso/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    disciplinas.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
  }
}

onMounted(() => {
  fetchDisciplines();
});
</script>

<style scoped>
.container {
  display: flex;
  background-color: #141416;
  height: 100vh;
  overflow: auto;
}

.container-main {
  display: flex;
  width: 40%;
  flex-direction: column;
  border-right: 1px solid #303030;
  overflow-y: auto;
}

.search-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-container input[type="text"] {
  width: 50%;
  padding: 10px;
  font-size: 15px;
  background-color: #292A2F;
  border: 2px solid #BCBCBC;
  border-radius: 5px;
  outline: none;
  color: #fff;
}

.main-content {
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.8rem;
  color: #fff;
}

.back-arrow {
  width: 40px;
}

.post-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.post {
  background-color: #1E1E1E;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
  flex: 1 1 280px;
  min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.post:hover {
  transform: translateY(-5px);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 50px;
}

.post-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.post-content {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #B0B0B0;
  line-height: 1.5;
}

.action-button:hover {
  background-color: #333;
}
</style>
