<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <header class="modal-header">
          <h2>Nova Publicação</h2>
          <button class="close-button" @click="closeModal">×</button>
        </header>
  
        <div class="modal-body">
          <input type="text" v-model="author" placeholder="Autor" class="input-field" />
          <textarea v-model="content" placeholder="Conteúdo" class="input-field textarea"></textarea>
          <input type="file" @change="onImageSelect" accept="image/*" class="input-field" />
        </div>
  
        <footer class="modal-footer">
          <button class="submit-button" @click="submitPost">Publicar</button>
          <button class="cancel-button" @click="closeModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(['post-submitted', 'close']);
  
  const isVisible = ref(true);
  const author = ref('');
  const content = ref('');
  const profilePic = ref(null);
  
  const closeModal = () => {
    emit('close');
    isVisible.value = false;
  };
  
  const onImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      profilePic.value = URL.createObjectURL(file);
    }
  };
  
  const submitPost = () => {
    if (author.value && content.value) {
      emit('post-submitted', {
        author: author.value,
        content: content.value,
        profilePic: profilePic.value,
      });
      closeModal();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };
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
  
  .textarea {
    resize: none;
    height: 100px;
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
  