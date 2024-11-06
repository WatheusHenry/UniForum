<template>
  <div class="container">
    <div class="image"></div>

    <section class="input-container">
      <div class="inputs">
        <img class="logo-unimar" src="../assets/images/logoUnimar.svg" alt="Logo Unimar">
        <h1>Cadastro do Usuário</h1>
        
        <div class="form-group">
          <FloatLabel>
            <input type="file" @change="onImageChange" />
            <label for="profile-picture">Foto de Perfil</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="name" v-model="nome" />
            <label for="name">Nome</label>
          </FloatLabel>
          
          <FloatLabel>
            <InputText id="username" v-model="email" />
            <label for="username">E-mail</label>
          </FloatLabel>
          
          <FloatLabel>
            <Password v-model="senha" toggleMask :feedback="false" inputId="password" />
            <label for="password">Senha</label>
          </FloatLabel>
          
          <FloatLabel>
            <Password v-model="senhaRepetida" toggleMask :feedback="false" inputId="passwordRepeat" />
            <label for="passwordRepeat">Repita a Senha</label>
          </FloatLabel>
          
          <FloatLabel>
            <Dropdown :options="cursos" v-model="cursoSelecionado" optionLabel="name" class="dropdown" />
            <label for="curso">Selecione seu Curso</label>
          </FloatLabel>
          
          <FloatLabel>
            <Dropdown :options="termos" v-model="termoSelecionado" optionLabel="nome" class="dropdown" />
            <label for="termo">Selecione seu Termo</label>
          </FloatLabel>
        </div>
        
        <Button @click="handleRegister" class="register-button">Cadastrar</Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchCursos } from '../services/courseService';
import { register } from '../services/authService';
import { useRouter } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const router = useRouter();
const nome = ref('');
const email = ref('');
const senha = ref('');
const senhaRepetida = ref('');
const cursoSelecionado = ref(null);
const termoSelecionado = ref(null);
const cursos = ref('');
const profilePicture = ref(null); // Armazena a imagem do usuário

const termos = ref([
  { nome: '1º Termo', id: 1 },
  { nome: '2º Termo', id: 2 },
  { nome: '3º Termo', id: 3 },
]);

// Função para capturar a imagem do usuário
const onImageChange = (event) => {
  const file = event.target.files[0];
  profilePicture.value = file;
};

const handleRegister = async () => {
  if (senha.value !== senhaRepetida.value) {
    alert('As senhas não coincidem');
    return;
  }

  const newUser = {
    name: nome.value,
    email: email.value,
    password: senha.value,
    courseIds: cursoSelecionado.value ? [cursoSelecionado.value.id] : [],
    currentTerm: termoSelecionado.value ? termoSelecionado.value.nome : '',
  };

  try {
    const response = await register(newUser, profilePicture.value);
    if (response) {
      router.push('/home');
    }
  } catch (error) {
    alert('Erro ao realizar cadastro.');
    console.error(error);
  }
};

onMounted(async () => {
  try {
    cursos.value = await fetchCursos();
  } catch (error) {
    console.log(error, 'Erro ao carregar cursos');
  }
});

</script>

<style scoped>
.container {
  display: flex;
  background: #2D2D30;
}

.image {
  width: 70vw;
  height: 100vh;
  background-color: #2D2D30;
}

.input-container {
  width: 30vw;
  background: #252526;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo-unimar {
  width: 5rem;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  text-align: center;
}

h1 {
  color: white;
  font-size: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.p-inputtext, .p-password, .dropdown {
  width: 100%;
  border: none;
}



.p-button, .register-button {
  width: 60%;
  background-color: #1DB954;
  color: #ffffff;
  border: none;
}
</style>
