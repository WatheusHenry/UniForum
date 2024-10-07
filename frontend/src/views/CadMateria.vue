<template>
    <div class="container">
    <div class="container-left">
        <div class="image">
            <img  class= "ajuste" src="../assets/images/logoUnimar.svg">
        </div>
        <div class="profile">
         <img class="profile-picture" src="../assets/images/perfil-de-usuario.png" alt="Profile Picture" />
         <div class="profile-details">
          <p class="profile-name">Fulano da Silva</p>
          <a href="#" class="view-profile">Visualizar perfil</a>
        </div> 
        </div>
        <div>
            <nav class="menu">
      <ul>
        <li>
          <a href="#">
            <img src="../assets/images/home.svg"/>
            Página Inicial
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/msg.svg"/>
            Matérias
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/global.svg"/>
            Explorar
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/settings.svg"/>
            Configurações
          </a>
        </li>
      </ul>
    </nav>
        </div>
        <div class="fixed-subjects">
        <h3 style="margin-left: 0.7rem;">Matérias fixadas</h3>
        <ul>
          <li>Projeto Integrador II </li>
          <li>Engenharia de Software</li>
          <li>Orientação a Objetos</li>
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
    <img style="width: 40px;" src="../assets/images/seta-2.svg" alt="Profile Picture" />

    <h1>Matérias</h1>
    
  </header>
  <div class="post-container" style="display: flex; flex-wrap: wrap; gap: 20px;">
    <div class="post" style="flex: 1 1 20rem; padding: 1rem;">
        <div class="post-header">
        <img style="width: 50px;" src="../assets/images/materia.svg" alt="Profile Picture" />
        <p style="margin-top: 0.5rem;">Programação orientada a objetos</p>
      </div>
      <p class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus.
      </p>
    </div>
    
    <div class="post" style="flex: 1 1 20rem; padding: 1rem;">
      <div class="post-header">
        <img style="width: 50px;" src="../assets/images/materia.svg" alt="Profile Picture" />
        <p style="margin-top: 0.5rem;">Laboratório de banco de dados</p>
      </div>
      <p class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus.
      </p>
    </div>

    <div class="post" style="flex: 1 1 20rem; padding: 1rem;">
        <div class="post-header">
        <img style="width: 50px;" src="../assets/images/materia.svg" alt="Profile Picture" />

        <p style="margin-top: 0.5rem;">Projeto Integrador II</p>
        
      </div>
      <p class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus.
      </p>
    </div>

    <div class="post" style="flex: 1 1 20rem; padding: 1rem;">
        <div class="post-header">
        <img style="width: 50px;" src="../assets/images/materia.svg" alt="Profile Picture" />
        <p style="margin-top: 0.5rem;">Engenharia de Software</p>
      </div>
      <p class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus.
      </p>
    </div>

    <div class="post" style="flex: 1 1 20rem; padding: 1rem;">
        <div class="post-header">
        <img style="width: 50px;" src="../assets/images/materia.svg" alt="Profile Picture" />
        <p style="margin-top: 0.5rem;">Aplicativos android</p>
      </div>
      <p class="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim libero ullamcorper cursus finibus.
      </p>
    </div>
  </div>
</main>

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
          <img src="../assets/images/dicas.svg" alt="Ícone de dicas"/>
          <h3 style="margin-top: 1rem;">Dicas</h3>
        </div>
        <p>{{ dica }}</p>
      </div>
    </div>
  </div>

</div>

    
</template>

<script>
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

<style>
.container {
  display: flex;
  background-color: #2D2D30;
}
.container-left{
    background-color: #252526;
    width: 30vh;
    height: 100vh;
}

.image{
    width: 50px;
    height: 50px;
   
}
.ajuste{
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
.menu{
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
  margin-left: 0.5srem;
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
  margin: 0.5rem ;
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



.post {
  background-color: #1E1E1E;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 5px;
  color: white;
  width: 60%;

}

.post-header {
  display: flex;
  gap: 1rem;

  
}



.post-actions button {
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

}
.container-2{
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
  margin-right: 2rem;
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
h1{
    text-align: left;
    margin-left: 2rem;
    font-size: 27px

}
</style>