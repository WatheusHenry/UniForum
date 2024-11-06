<template>
  <div class="container">
    <section class="input-container">
      <div class="inputs">
        <img class="logo-unimar" src="../assets/images/logoUnimar.svg" alt="Logo Unimar" />
        <h1>Cadastro do Usuário</h1>

        <div class="form-group">
          <div class="image-preview-container">
            <div v-if="previewImage" class="image-preview">
              <img :src="previewImage" alt="Foto de Perfil Selecionada" class="profile-preview" />
            </div>
            <div v-else class="image-placeholder">
              <span>icon</span>
            </div>
          </div>

          <button class="upload-button" @click="triggerFileInput">Selecionar Foto de Perfil</button>
          <input type="file" ref="fileInput" @change="onImageChange" accept="image/*" class="file-input" />

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
const profilePicture = ref(null);
const previewImage = ref(null);

const termos = ref([
  { nome: '1º Termo', id: 1 },
  { nome: '2º Termo', id: 2 },
  { nome: '3º Termo', id: 3 },
]);

const triggerFileInput = () => {
  const fileInput = document.querySelector('.file-input');
  fileInput.click();
};

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file && file instanceof File) {
    profilePicture.value = file;
    previewImage.value = URL.createObjectURL(file);
  } else {
    console.error('Nenhum arquivo válido foi selecionado');
    alert('Por favor, selecione uma imagem de perfil válida.');
  }
};

const handleRegister = async () => {
  if (!nome.value || !email.value || !senha.value || !cursoSelecionado.value || !termoSelecionado.value) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (senha.value !== senhaRepetida.value) {
    alert('As senhas não coincidem');
    return;
  }

  const newUser = {
    name: nome.value,
    email: email.value,
    password: senha.value,
    courseIds: cursoSelecionado.value ? cursoSelecionado.value.id : [],
    currentTerm: termoSelecionado.value ? termoSelecionado.value.nome : '',
  };

  try {
    console.log(newUser);
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
  height: 100vh;
  background: #2D2D30;
  justify-content: end;
}

.image-preview-container {
  width: 10vw;
  height: 10vw;
  border-radius: 10rem;
  margin: auto;
  background-color: #1f1f1f;
}

.image-preview {
  width: 10vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252526;
  border-radius: 10rem;
  padding: 10px;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 10vw;
  color: #bbb;
  font-size: 1rem;
  text-align: center;
}

.profile-preview {
  width: 10vw;
  height: 10vw;
  border-radius: 10rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.file-input {
  display: none;
}

.upload-button {
  width: 60%;
  padding: 10px;
  background-color: #1DB954;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  text-align: center;
}

.input-container {
  width: 40vw;
  background: #252526;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
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

.p-inputtext,
.p-password,
.dropdown {
  width: 100%;
}

.register-button {
  width: 60%;
  background-color: #1DB954;
  color: #ffffff;
  border: none;
}
</style>
