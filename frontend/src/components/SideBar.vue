<template>
    <div class="container-left">
      <div class="image">
        <img class="ajuste" src="../assets/images/logoUnimar.svg">
      </div>
      <div class="profile">
        <img class="profile-picture" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
        <div class="profile-details">
          <p class="profile-name">{{ user ? user.name : 'Carregando...' }}</p>
          <a href="#" class="view-profile">Visualizar perfil</a>
        </div>
      </div>
      <div>
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
      </div>
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
  import { defineProps } from 'vue';
  
  const props = defineProps({
    user: Object,
    disciplinas: Array,
  });
  </script>
  
  <style scoped>
  .container-left {
    background-color: #252526;
    width: 30vh;
    height: 100vh;
  }
  
  .image {
    width: 50px;
    height: 50px;
  }
  
  .ajuste {
    width: 100px;
    height: 50px;
    margin-top: 2rem;
    margin-left: 1rem;
  }
  
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-picture {
    width: 50px;
    height: 50px;
    margin-top: 4rem;
    margin-left: 0.60rem;
  }
  
  .profile-details {
    color: white;
    margin-top: 4rem;
  }
  
  .profile-name {
    font-weight: bold;
  }
  
  .view-profile {
    color: #ccc;
    font-size: 0.9rem;
    text-decoration: none;
  }
  
  .menu {
    margin-top: 3rem;
    margin-left: 1rem;
  }
  
  .menu ul {
    list-style-type: none;
    padding: 0;
  }
  
  .menu li {
    margin: 1rem 0;
  }
  
  .menu a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
  }
  
  .menu a:hover {
    color: #ccc;
  }
  
  .fixed-subjects {
    margin-top: 2rem;
    margin-left: 1rem;
  }
  
  .fixed-subjects h3 {
    color: white;
  }
  
  .fixed-subjects ul {
    list-style-type: none;
    padding: 0;
  }
  
  .fixed-subjects li {
    background-color: #1E1E1E;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    color: white;
    width: 25vh;
    height: auto;
  }
  </style>
  