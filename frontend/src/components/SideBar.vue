<template>
  <div class="container-left">
    <div class="image">
      <img class="ajuste" src="../assets/images/logoUnimar.svg" alt="Logo" />
    </div>
    <div class="profile">
      <img class="profile-picture" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
      <div class="profile-details">
        <p class="profile-name">{{ user ? user.name : 'Carregando...' }}</p>
        <a href="#" class="view-profile">Visualizar perfil</a>
      </div>
    </div>
    <nav class="menu">
      <ul>
        <li>
          <a href="/home">
            <img src="../assets/images/home.svg" />
            Página Inicial
          </a>
        </li>
        <li>
          <a href="/cadMateria">
            <img src="../assets/images/msg.svg" />
            Matérias
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/global.svg" />
            Explorar
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/settings.svg" />
            Configurações
          </a>
        </li>
      </ul>
    </nav>
    <div class="fixed-subjects">
      <h3>Matérias fixadas</h3>
      <ul>
        <li v-for="(disciplina, index) in disciplinas" :key="index">
          {{ disciplina.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const disciplinas = ref([]);
const user = ref({});
const userCourse = ref();


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

const fetchDisciplines = async () => {
  const token = localStorage.getItem('authToken');
  userCourse.value = user.value.curso.id;

  try {
    const response = await axios.get(`http://localhost:3000/disciplina/curso/${userCourse.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    disciplinas.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
  }
};


onMounted(() => {
  fetchUserData();
  watch(user, (newUser) => {
    if (newUser && newUser.curso) {
      fetchDisciplines();
    }
  });
  
});
</script>

<style scoped>
/* Coloque aqui o estilo que está em container-left, image, ajuste, profile, profile-picture, profile-details, menu, fixed-subjects */
</style>
