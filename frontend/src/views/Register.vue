<template>
  <div style="display: flex;">
    <div class="image"></div>

    <section class="inputContainer">
      <div class="inputs">
        <img class="logoUnimar" src="../assets/images/logoUnimar.svg" alt="Logo Unimar">
        <h1>Cadastro do usuário</h1>
        <div style="display: flex; flex-direction: column; width: 50%; margin-inline: auto; gap: 2rem;">
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
            <label for="passwordRepeat">Repita sua Senha</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown :options="cursos" v-model="cursoSelecionado" optionLabel="nome" class="dropdown-curso"/>
            <label for="curso">Selecione seu curso</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown :options="termos" v-model="termoSelecionado" optionLabel="nome" class="dropdown-termo"/>
            <label for="termo">Selecione seu termo</label>
          </FloatLabel>
        </div>
        <Button style="width: 50%; margin-inline: auto" @click="handleRegister">Cadastrar</Button>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { register } from '../services/authService'; // Importando a função de registro
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter(); // Criar uma instância do router


const nome = ref('');
const email = ref('');
const senha = ref('');
const senhaRepetida = ref('');
const cursoSelecionado = ref(null);
const termoSelecionado = ref(null);

const cursos = ref([
  { nome: 'Ciência da Computação', id: 1 },
  { nome: 'Engenharia Civil', id: 2 },
  { nome: 'Medicina', id: 3 },
  // Adicione mais cursos conforme necessário
]);

const termos = ref([
  { nome: '1º Termo', id: 1 },
  { nome: '2º Termo', id: 2 },
  { nome: '3º Termo', id: 3 },
  // Adicione mais termos conforme necessário
]);

const handleRegister = async () => {
  if (senha.value !== senhaRepetida.value) {
    alert('As senhas não coincidem');
    return;
  }

  const createUser = {
    name: nome.value,
    email: email.value,
    password: senha.value,
    courseIds: cursoSelecionado.value ? [cursoSelecionado.value.id] : [], // Enviando o ID do curso selecionado
    currentTerm: termoSelecionado.value ? termoSelecionado.value.nome : '', // Garantindo que o termo seja enviado corretamente
  }

  try {
    console.log(createUser);
    const response = await register(createUser);
    
    if (response) {
      router.push('/home'); 
    }
  } catch (error) {
    alert('Erro ao realizar cadastro.');
    console.error(error);
  }
};
</script>


<style scoped>
.image {
  width: 70vw;
  height: 100vh;
}

.inputContainer {
  width: 30vw;
  background: #252526;
  margin: auto;
}

.logoUnimar {
  width: 5rem;
  margin-inline: auto;
}

.inputs {
  gap: 2.5rem;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

h1 {
  width: 13rem;
  text-align: center;
  margin-inline: auto;
  color: white;
  font-size: large;
  line-break: auto;
}

.p-inputtext {
  width: 100%;
  border-radius: 0rem !important;
  border: none !important;
  border-bottom: white 1px solid !important;
  background-color: #2d2d30 !important;
  color: white !important;
}

.p-password {
  input {
    width: 100%;
  }
  width: 100%;
}

.p-button {
  width: 7rem !important;
  border-radius: 0rem !important;
  background-color: white !important;
  color: #252526 !important;
  border: none !important;
}

.texto-button-entrar {
  text-decoration: none;
  color: black;
}

.dropdown-curso {
  width: 14.3rem;
  background-color: #2d2d30;
}

.dropdown-termo {
  width: 14.3rem;
  background-color: #2d2d30;
}
</style>
