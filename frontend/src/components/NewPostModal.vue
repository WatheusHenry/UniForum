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

        <select v-model="post.disciplineID" class="input-field">
          <option disabled value="Selecione uma disciplina">Selecione uma disciplina</option>
          <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
            {{ discipline.name }}
          </option>
        </select>
        <!-- 
        <input type="file" @change="onImageSelect" accept="image/*" class="input-field file-input" />
        <div v-if="post.profilePic" class="image-preview">
          <img :src="post.profilePic" alt="Imagem selecionada" />
        </div> -->
      </div>

      <footer class="modal-footer">
        <button class="cancel-button" @click="closeModal">Cancelar</button>
        <button class="submit-button" @click="submitPost">Publicar</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { fetchDisciplinesByCourse } from '@/services/disciplineService';
import { ref, defineEmits, onMounted } from 'vue';

const emit = defineEmits(['post-submitted', 'close']);

const isVisible = ref(true);
const cursoId = localStorage.getItem('idCourse');

const post = ref({
  title: '',
  content: '',
  createdAt: new Date().toISOString(),
  user: null,
  disciplineID: null,
  profilePic: null,
});

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
  post.value.disciplineID = null;
  post.value.profilePic = null;
};

const loadDisciplines = async () => {
  try {
    disciplines.value = await fetchDisciplinesByCourse(cursoId);
  } catch (error) {
    alert('Erro ao carregar disciplinas. Por favor, tente novamente mais tarde.');
  }
};

const onImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    post.value.profilePic = URL.createObjectURL(file);
  }
};

const submitPost = () => {
  if (!post.value.title || !post.value.content || !post.value.disciplineID) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  emit('post-submitted', { ...post.value });
};

onMounted(() => {
  loadDisciplines();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.74);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #171718;
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
  font-size: 1.2rem;
  background-color: #121213;
  border: 1px solid #555;
  color: #ffffff;

}
option {
  color: white;
}

.input-field:focus {
  outline: none;
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
  margin-top: 3rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
}

.cancel-button {
  background-color: #444;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
}
</style>
