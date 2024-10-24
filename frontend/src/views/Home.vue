<template>
  <div class="container">
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
              <a href="#">
                <img src="../assets/images/home.svg" />
                Página Inicial
              </a>
            </li>
            <li>
              <a href="#">
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
            {{ disciplina.name }} <!-- Supondo que a disciplina tem um campo "name" -->
          </li>
        </ul>
      </div>

    </div>
    <div>

    </div>
    <div class="container-main">
      <div class="search-container">
        <input type="text" placeholder="Aperte a tecla “/” para pesquisar" v-model="pesquisa" />
      </div>
      <main class="main-content">
        <header class="header">
          <h1 style="text-align: left; margin-right:37rem;">Feed</h1>
          <button class="ask-button">Perguntar +</button>
        </header>
        <div class="post">
          <div class="post-header">
            <img style="width: 50px;" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
            <p style="margin-top: 0.5rem;">Fulano da Silva</p>
          </div>
          <p class="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero
            ullamcorper cursus finibus.<br> Etiam eu ex tincidunt, tristique augue vitae, faucibus tellus. Sed
            luctus,<br> lacus vel viverra convallis,
            mi odio feugiat ipsum, bibendum pharetra mi erat in mi.<br>
            Pellentesque habitant morbi tristique senectus et netus et<br>
            malesuada fames ac turpis egestas. Pellentesque ipsum nisl,
            sodales ut tortor ac, ultricies auctor justo. Maecenas in erat
            nisl. </p>
          <div class="post-actions">
            <button>
              <img src="../assets/images/like.svg" />

            </button>
            <button>
              <img src="../assets/images/comment.svg" />

            </button>
            <button>
              <img src="../assets/images/compart.svg" />

            </button>
          </div>
        </div>
      </main>



      <div class="area-comentarios">
        <div class="post-coment">
          <img style="width: 50px;" src="../assets/images/profileblack.svg" alt="Profile Picture" />
          <p style="margin-top: 0.5rem;">Fulano da Silva</p>
          <p class="coment-vizualizador">Comentario</p>
        </div>

        <div class="coment-materia">
          <p>Analise e Desenvolvimento de sistemas - 2024</p>
        </div>

        <p class="coment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero
          ullamcorper cursus finibus.</p>
      </div>


      <div class="container-main">
        <main class="main-content">
          <div class="post">
            <div class="post-header">
              <img style="width: 50px;" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
              <p style="margin-top: 0.5rem;">Fulano da Silva</p>
            </div>
            <p class="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero
              ullamcorper cursus finibus.<br> Etiam eu ex tincidunt, tristique augue vitae, faucibus tellus. Sed
              luctus,<br> lacus vel viverra convallis,
              mi odio feugiat ipsum, bibendum pharetra mi erat in mi.<br>
            </p>
            <img style="margin-left: 4rem; margin-top: 0.5rem;" src="../assets/images/codig_example.svg" />

            <div class="post-actions">
              <button>
                <img src="../assets/images/like.svg" />

              </button>
              <button>
                <img src="../assets/images/comment.svg" />

              </button>
              <button>
                <img src="../assets/images/compart.svg" />

              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="container-2">
      <div class="alunos-matriculados">
        <h2>Alunos matriculados</h2>
        <ul>
          <li v-for="(aluno, index) in alunos.slice(0, 6)" :key="index" :class="{ ativo: index === 0 }">
            <div class="avatar"></div>
            <div class="aluno-info">
              <span>{{ aluno.name }}</span>
              <small>{{ curso.name }}</small>
            </div>
          </li>
        </ul>
        <div class="dicas">
          <div class="dicas-header">
            <img src="../assets/images/dicas.svg" alt="Ícone de dicas" />
            <h3 style="margin-top: 1rem;">Dicas</h3>
          </div>
          <p>{{ dica }}</p>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const alunos = ref([]);
const curso = ref({});
const disciplinas = ref([]);
const dica = ref("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus. Etiam eu ex tincidunt, tristique augue vitae, faucibus tellus. Sed luctus, lacus vel viverra convallis, mi odio feugiat ipsum,");
const user = ref()

const fetchAlunos = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.get('http://localhost:3000/curso/1/alunos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alunos.value = response.data.alunos;
    curso.value = response.data.curso;
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  }
};

const fetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  const userid = localStorage.getItem('id');

  try {
    const response = await axios.get(`http://localhost:3000/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    user.value = response.data

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
}

const fetchDisciplines = async () => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`http://localhost:3000/disciplina`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    disciplinas.value = response.data

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
}

onMounted(() => {
  fetchAlunos();
  fetchUserData()
  fetchDisciplines()
});


</script>

<style>
.container {
  display: flex;
  background-color: #2D2D30;
}

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

.main-content {
  flex: 1;
  padding: 2rem;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ask-button {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
}

.post {
  background-color: #1E1E1E;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 5px;
  color: white;
}

.post-header {
  display: flex;
  gap: 1rem;


}

.post-content {
  margin-top: 1rem;
  margin-left: 4rem;
}

.post-actions button {
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

}

.container-2 {
  margin-top: 5rem;
}

.alunos-matriculados {
  color: white;
  margin-left: 2rem;


}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;

}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #555;
  border-radius: 50%;
  margin-top: 1rem;
}

.aluno-info {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

}

.dicas {
  margin-top: 2rem;
  width: 50vh;
  height: 25vh;
  background-color: #1f1f1f;
  border-radius: 5px;
  text-align: center;

}

.dicas-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-left: 1rem;
  gap: 10px;
}

.dicas-header img {
  width: 24px !important;
  height: 24px !important;
  margin-top: 1rem;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.search-container input[type="text"] {
  width: 50%;
  background-color: #292A2F;
  padding: 5px;
  font-size: 15px;
  border: 2px solid #BCBCBC;
  border-radius: 5px 5px 5px 5px;
  outline: none;


}


.area-comentarios {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 9rem;
}


.post-coment {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-bottom: -20px;
}

.coment-vizualizador {
  margin-top: 10px;
  background-color: #898282;
  width: 5.2rem;
  height: 1.6rem;
  border-radius: 10%;
  font-size: medium;
  color: #2D2D30;
}

.coment-materia {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: small;
  padding-left: 3.5rem;

}
</style>