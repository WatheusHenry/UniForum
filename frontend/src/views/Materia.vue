<template>
  <div class="container">
    <SideBar />
    <div class="container-main">
      <div class="search-container">
        <input type="text" placeholder="Aperte a tecla “/” para pesquisar" v-model="pesquisa" />
      </div>
      <main class="main-content">
        <header class="header">
          <h1 style="text-align: left; margin-right:37rem;">Projeto Integrador II</h1>
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
            nisl.</p>
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
          <li v-for="(aluno, index) in alunos" :key="index" :class="{ ativo: index === 0 }">
            <div class="avatar"></div>
            <div class="aluno-info">
              <span>{{ aluno.nome }}</span>
              <small>{{ aluno.status }}</small>
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

<script>
import SideBar from '@/components/SideBar.vue';


export default {
  data() {
    return {
      alunos: [
        { nome: "Fulano da Silva", status: "Analise e desenvolvimento de sistemas - 2024" },
        { nome: "Fulano da Silva", status: "Analise e desenvolvimento de sistemas - 2024" },
        { nome: "Fulano da Silva", status: "Analise e desenvolvimento de sistemas - 2024" },
        { nome: "Fulano da Silva", status: "Analise e desenvolvimento de sistemas - 2024" },
        { nome: "Fulano da Silva", status: "Analise e desenvolvimento de sistemas - 2024" },

      ],
      dica: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus. Etiam eu ex tincidunt, tristique augue vitae, faucibus tellus. Sed luctus, lacus vel viverra convallis, mi odio feugiat ipsum,"
    };
  }
};

</script>

<style scoped>
.container {
  display: flex;
  background-color: #2D2D30;
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
</style>