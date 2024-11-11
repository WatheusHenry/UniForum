<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <header class="modal-header">
        <h2>Nova Publicação</h2>
        <button class="close-button" @click="closeModal">×</button>
      </header>

      <select v-model="post.disciplineID" class="input-field" style="margin-bottom: 1rem;">
        <option disabled value="Selecione uma disciplina">Selecione uma disciplina</option>
        <option v-for="discipline in disciplines" :key="discipline.id" :value="discipline.id">
          {{ discipline.name }}
        </option>
      </select>
      <div class="modal-body">
        <input type="text" v-model="post.title" placeholder="Título" class="input-field" required />
        <textarea v-model="post.content" placeholder="Conteúdo" class="input-field textarea" required></textarea>

        <input type="file" ref="fileInput" @change="onImageSelect" accept="image/*" class="file-input"
          style="display: none;" />

        <div v-if="post.imageUrl" class="image-preview">
          <img :src="post.imageUrl" alt="Imagem selecionada" />
          <button class="remove-button" @click="removeImage">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <button class="upload-button" @click="triggerFileInput">
          <i class="pi pi-image"></i>
        </button>
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
  imageUrl: null,
  image: null
});

const disciplines = ref([]);

const fileInput = ref(null);

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
  post.value.imageUrl = null;
  post.value.image = null;

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
    post.value.image = file;  // Armazena o arquivo de imagem em vez da URL
    post.value.imageUrl = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeImage = () => {
  post.value.imageUrl = null;
};

const submitPost = async () => {
  if (!post.value.title || !post.value.content || !post.value.disciplineID) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  console.log(post)

  try {
    const userId = localStorage.getItem('idUser');

    const formData = new FormData();
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('disciplineID', post.value.disciplineID);
    formData.append('createdAt', post.value.createdAt);
    formData.append('user', userId);

    if (post.value.image) {
      formData.append('image', post.value.image);
    }

    emit('post-submitted', formData);
    // closeModal();
  } catch (error) {
    console.error('Erro ao adicionar a publicação:', error);
    alert('Erro ao enviar a publicação.');
  }
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
  width: 40vw;
  height: 70vh;
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
  border-radius: 5px;
  font-size: 1rem;
  background-color: #121213;
  color: #ffffff;
  border: none;
}

.modal-body {
  overflow-y: auto;
  background-color: #121213;

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
  margin-inline: 2rem;
  display: flex;
  height: 15rem;
}

.image-preview img {
  max-width: 100%;
  border-radius: 5px;
}

.upload-button {
  background-color: transparent;
  color: rgb(34, 137, 255);
  border: none;
  margin: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.upload-button:hover {
  background-color: #007bff4b;
}

.modal-footer {
  display: flex;
  margin-top: 1rem;

  justify-content: space-between;

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

input {
  border: none;
  outline: none;
}

.remove-button {
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 10rem;
  background-color: #00000083;
  border: none;
  color: white;
  margin: 0.5rem;
  cursor: pointer;
}
</style>
