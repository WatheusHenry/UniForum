<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="image">
      <img src="../assets/images/undraw_polaroid_re_481f.svg" alt="Imagem decorativa" />
    </div>

    <section class="inputContainer">
      <div class="inputs">
        <img class="logoUnimar" src="../assets/images/logoUnimar.svg" alt="Logo Unimar" />
        <h1>Fórum de Perguntas e Respostas</h1>

        <div class="form-group">
          <div class="input-wrapper">
            <input type="email" id="email" v-model="email" required />
            <label for="email" class="floating-label">E-mail</label>
          </div>
          <div class="input-wrapper">
            <input type="password" id="password" v-model="senha" required />
            <label for="password" class="floating-label">Senha</label>
          </div>
        </div>

        <button @click="handleLogin" class="login-button">Entrar</button>
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: center;
  /* width: 100%; */
}

.input-wrapper {
  position: relative;
  width: 100%;
}

input[type="email"],
input[type="password"] {
  width: 20rem;

  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #2D2D30;
  border: none;
  border-radius: 0.5rem;
  border-bottom: 2px solid #555;
  color: white;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-bottom-color: #1DB954;
  outline: none;
}

.floating-label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  font-size: 1rem;
  color: #aaa;
  pointer-events: none;
  transition: 0.2s;
}

input:focus+.floating-label,
input:not(:placeholder-shown)+.floating-label {
  top: -1.5rem;
  font-size: 0.85rem;
  color: #1DB954;
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
