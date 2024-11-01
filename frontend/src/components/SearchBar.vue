<template>
    <div class="search-container">
      <input
        type="text"
        placeholder="Pressione '/' para pesquisar"
        v-model="searchQuery"
        @input="updateSearch"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted } from 'vue';
  
  const emit = defineEmits(['update-search']);
  const searchQuery = ref('');
  
  const updateSearch = () => {
    emit('update-search', searchQuery.value);
  };
  
  onMounted(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === '/') {
        event.preventDefault();
        document.querySelector('.search-container input').focus();
      }
    });
  });
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
  
  .search-container input[type="text"] {
    width: 50%;
    max-width: 500px;
    background-color: #33343a;
    color: #ffffff;
    padding: 12px 20px;
    font-size: 16px;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .search-container input[type="text"]::placeholder {
    color: #7a7a7a;
  }
  
  .search-container input[type="text"]:focus {
    border-color: #4a90e2;
    background-color: #2a2b30;
  }
  
  .search-container input[type="text"]:hover {
    background-color: #3a3b40;
  }
  
  .search-container input[type="text"]:focus::placeholder {
    color: #b0b0b0;
  }
  </style>
  