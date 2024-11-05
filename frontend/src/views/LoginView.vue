<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="image"></div>

    <section class="inputContainer">
      <div class="inputs">
        <img class="logoUnimar" src="../assets/images/logoUnimar.svg" alt="Logo Unimar" />
        <h1>Fórum de Perguntas e Respostas</h1>
        <div class="form-group">
          <FloatLabel>
            <InputText id="username" v-model="email" />
            <label for="username">E-mail</label>
          </FloatLabel>
          <FloatLabel>
            <Password v-model="senha" toggleMask :feedback="false" inputId="password" />
            <label for="password">Senha</label>
          </FloatLabel>
        </div>
        <Button @click="handleLogin" class="login-button">Entrar</Button>
        <a href="/register" class="register-link">Cadastre-se</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const email = ref('');
const senha = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const token = await login(email.value, senha.value);
    if (token) {
      router.push('/home');
    }
  } catch (error) {
    alert('Erro ao fazer login. Verifique suas credenciais.');
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: #1E1E1E;
  color: white;
}

.image {
  flex: 2;
  background: url('../assets/images/background.jpg') 
}

.inputContainer {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #252526;
  padding: 2rem;
  color: white;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.logoUnimar {
  width: 5rem;
}

h1 {
  color: white;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.p-inputtext,
.p-password input {

  border: none;
  border-bottom: 2px solid #555;
  background-color: #2D2D30;
  color: white;
  transition: border-color 0.3s;
}


.p-inputtext:focus,
.p-password input:focus {
  border-bottom-color: #1DB954;
  outline: none;
}


.login-button {
  width: 10rem;
  background-color: #1DB954;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #17a442;
}

.register-link {
  color: #1DB954;
  text-decoration: none;
  margin-top: 1rem;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
