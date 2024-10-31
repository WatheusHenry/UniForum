<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <header class="modal-header">
        <h2>Nova Publicação</h2>
        <button class="close-button" @click="closeModal">×</button>
      </header>

      <div class="modal-body">
        <input type="text" v-model="post.title" placeholder="Título" class="input-field" required />
        <textarea v-model="post.content" placeholder="Conteúdo" class="input-field textarea" required></textarea>

        <!-- Dropdown para selecionar a disciplina -->
        <select v-model="post.discipline" class="input-field">
          <option disabled value="">Selecione uma disciplina</option>
          <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
            {{ discipline.name }}
          </option>
        </select>

        <input type="file" @change="onImageSelect" accept="image/*" class="input-field file-input" />
        <div v-if="post.profilePic" class="image-preview">
          <img :src="post.profilePic" alt="Imagem selecionada" />
        </div>
      </div>

      <footer class="modal-footer">
        <button class="submit-button" @click="submitPost">Publicar</button>
        <button class="cancel-button" @click="closeModal">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['post-submitted', 'close']);

const isVisible = ref(true);
const cursoId = localStorage.getItem('idCourse')
const token = localStorage.getItem('authToken')

const post = ref({
  title: '',
  content: '',
  createdAt: new Date().toISOString(),
  user: null,
  discipline: null,
  profilePic: null,
});

// Lista de disciplinas
const disciplines = ref([]);

const closeModal = () => {
  emit('close');
  isVisible.value = false;
  resetForm();
};

const resetForm = () => {
  post.value.title = '';
  post.value.content = '';
  post.value.createdAt = new Date().toISOString();
  post.value.user = null;
  post.value.discipline = null;
  post.value.profilePic = null;
};

// Função para buscar disciplinas
const fetchDisciplines = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/disciplina/curso/${cursoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    disciplines.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
  }
};

const onImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    post.value.profilePic = URL.createObjectURL(file);
  }
};

const submitPost = () => {
  // Validar se os campos obrigatórios estão preenchidos
  if (!post.value.title || !post.value.content || !post.value.discipline) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Emitir o evento com os dados da publicação
  emit('post-submitted', { ...post.value });

  // Fechar o modal e resetar o formulário
  closeModal();
};

// Chama a função de busca de disciplinas quando o componente é montado
onMounted(() => {
  fetchDisciplines();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2d2d30;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
}

.input-field {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: #33343a;
  border: 1px solid #555;
  color: #ffffff;
}

.file-input {
  border: none;
}

.textarea {
  resize: none;
  height: 100px;
}

.image-preview {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  border-radius: 5px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>
