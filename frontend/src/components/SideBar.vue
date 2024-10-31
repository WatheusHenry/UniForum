<template>
  <div class="sidebar">
    <div class="logoContainer">
      <img class="unimarLogo" src="../assets/images/logoUnimar.svg" alt="Logo" />
    </div>
    <div class="profile">
      <img class="profile-picture" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
      <div class="profile-details">
        <p class="profile-name">{{ user ? user.name : 'Carregando...' }}</p>
        <p class="profile-course">{{ user ? user.curso?.name : 'Carregando...' }}</p>
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
          <a href="/materias">
            <img src="../assets/images/msg.svg" />
            Matérias
          </a>
        </li>
        <!-- <li>
          <a href="#">
            <img src="../assets/images/global.svg" />
            Explorar
          </a>
        </li> -->
        <li>
          <a href="#">
            <img src="../assets/images/settings.svg" />
            Configurações
          </a>
        </li>
      </ul>
    </nav>
    <div class="fixed-subjects">
      <h3>Matérias matriculadas</h3>
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
  const userid = localStorage.getItem('idUser');

  try {
    const response = await axios.get(`http://localhost:3000/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user.value = response.data;
    localStorage.setItem('idCourse', user.value.curso.id);

    console.log(user.value)
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
.sidebar {
  background-color: #252526;
  width: 40vh;
  height: 100vh;
}

.logoContainer {
  padding: 1rem;
}

.unimarLogo {
  width: 8rem;
}

.profile {
  display: flex;
  margin-inline: 1.5rem;
  width: 17rem;
  padding: 0.5rem;
  border-radius: 1rem;

  transition: background-color 0.3s ease, transform 0.3s ease;

}

.profile:hover {
  background-color: #555;
  cursor: pointer;
}

.profile-picture {
  width: 3rem;
  height: 3rem;
  background-color: white;
  border-radius: 2rem;

}

.profile-details {
  margin-inline: 1rem;
}

.profile-name {
  font-size: 1.2rem;
  color: white;
  font-weight: 500
}

.profile-course {
  font-size: 1rem;
  color: white;
  line-height: 0.5rem
}

.menu {
  padding: 15px;
  width: 200px; /* Largura do menu */
  height:fit-content; /* Altura para ocupar a tela inteira */
}

.menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* Organiza os itens verticalmente */
}

.menu ul li {
  margin-bottom: 10px; /* Espaçamento entre os itens */
}

.menu ul li a {
  color: #fff; /* Cor do texto */
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px; /* Espaçamento entre o ícone e o texto */
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.menu ul li a:hover {
  background-color: #555; /* Cor de fundo ao passar o mouse */
}

.menu ul li a img {
  width: 24px; /* Tamanho do ícone */
  height: 24px;
}

.fixed-subjects {
  margin-top: 20px;
  padding: 15px;
  background-color: #252526;
  border-radius: 8px;
  color: #ffffff;
}

.fixed-subjects h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.fixed-subjects ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fixed-subjects ul li {
  padding: 8px 12px;
  border-radius: 5px;
  color: #e0e0e0;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1rem;
}

.fixed-subjects ul li:hover {
  background-color: #3b3b3b;
  color: #ffffff;
  cursor: pointer;
}

</style>
