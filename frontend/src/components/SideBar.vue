<template>
  <div class="sidebar">
    <div class="logoContainer">
      <img class="unimarLogo" src="../assets/images/logoUnimar.svg" alt="Logo" />
    </div>
    <div class="profile" @click="profile()">
      <img class="profile-picture" :src="`
      ${user.profilePicture}`" alt="Profile Picture" />
      <div class="profile-details">
        <p class="profile-name">{{ user ? user.name : 'Carregando...' }}</p>
        <p class="profile-course">{{ user ? user.curso?.name : 'Carregando...' }}</p>
      </div>
    </div>
    <nav class="menu">
      <ul>
        <li>
          <a href="/home">
            <i class="pi pi-home"></i>
            Página Inicial
          </a>
        </li>
        <li>
          <a href="/materias">
            <i class="pi pi-book"></i>
            Matérias
          </a>
        </li>
        <li>
          <a href="#">
            <i class="pi pi-cog"></i>
            Configurações
          </a>
        </li>
        <li>
          <a @click="logout" class="logout">
            <i class="pi pi-sign-out"></i>
            Logout
          </a>
        </li>
        <li>
          <a href="/publicacoes-deletadas">
            <i class="pi pi-comment"></i>
            Publicações deletadas
          </a>
        </li>
      </ul>
    </nav>
    <div class="fixed-subjects">
      <h3>Matérias matriculadas</h3>
      <ul>
        <li v-for="(disciplina, index)  in disciplinas" :key="index" @click="SeeDiscipline(disciplina)">
          {{ disciplina.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchUserData } from '@/services/userService';
import { fetchDisciplinesByCourse } from '@/services/disciplineService';

const disciplinas = ref([]);
const user = ref({});
const router = useRouter();

const loadUserData = async () => {
  const userid = localStorage.getItem('idUser');
  user.value = await fetchUserData(userid);
  localStorage.setItem('idCourse', user.value.curso.id);
};

const loadDisciplines = async () => {
  const userCourseId = user.value.curso.id;
  disciplinas.value = await fetchDisciplinesByCourse(userCourseId);
};

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('idUser');
  localStorage.removeItem('idCourse');
  router.push('/login');
};

const profile = () => {
  router.push({
    path: '/profile',
    query: {
      user: JSON.stringify(user.value),
      disciplinas: JSON.stringify(disciplinas.value)
    }
  });
}

const SeeDiscipline = (disciplina) => {
  router.push({
    path: `/materia/${disciplina.id}`,
    
  });
}


onMounted(() => {
  loadUserData();
  watch(user, (newUser) => {
    if (newUser && newUser.curso) {
      loadDisciplines();
    }
  });
});
</script>


<style scoped>
.sidebar {
  background-color: #141416;
  width: 40vh;
  height: 100vh;
  border-right: 1px solid #484849;
  margin-left: 15rem;
}

.logoContainer {
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.unimarLogo {
  width: 8rem;
}

.profile {
  display: flex;
  margin-inline: 1rem;
  width: 18rem;
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

i {
  font-size: 1.5rem;
  color: #c5c5c5;
}

.menu {
  padding: 15px;
  width: 200px;
  /* Largura do menu */
  height: fit-content;
  /* Altura para ocupar a tela inteira */
}

.menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  /* Organiza os itens verticalmente */
}

.menu ul li {
  margin-bottom: 10px;
  /* Espaçamento entre os itens */
}

.menu ul li a {
  color: #fff;
  /* Cor do texto */
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  /* Espaçamento entre o ícone e o texto */
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.menu ul li a:hover {
  background-color: #555;
  /* Cor de fundo ao passar o mouse */
}

.menu ul li a img {
  width: 24px;
  /* Tamanho do ícone */
  height: 24px;
}

.fixed-subjects {
  margin-top: 20px;
  padding: 15px;
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

.logout {
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout:hover {
  background-color: #555;
}

.logout img {
  width: 24px;
  height: 24px;
}
</style>
