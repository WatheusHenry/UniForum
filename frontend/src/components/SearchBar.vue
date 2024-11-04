<template>
  <div class="search-container">
    <div class="input-wrapper">
      <span class="search-icon"><i class="pi pi-search"></i></span>
      <input type="text" placeholder="Pressione '/' para pesquisar" v-model="searchQuery"
        @input="updateSearch(searchQuery)" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const emit = defineEmits(['update-search']);
const searchQuery = ref('');
const page = ref(1);
const posts = ref([]);

const updateSearch = async (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
  emit('update-search', searchQuery.value);
  page.value = 1;
  posts.value = [];
  await loadPosts();
};

const loadPosts = async () => {
  // Lógica para carregar os posts com base em searchQuery e page
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
}

.input-wrapper {
  position: relative;
  width: 50%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #7a7a7a;
}

.input-wrapper input[type="text"] {
  width: 100%;
  background-color: #33343a;
  color: #ffffff;
  padding: 12px 20px 12px 40px;
  /* Adiciona espaço para o ícone */
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 5rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-wrapper input[type="text"]::placeholder {
  color: #7a7a7a;
}

.input-wrapper input[type="text"]:focus {
  border-color: #4a90e2;
  background-color: #2a2b30;
}

.input-wrapper input[type="text"]:hover {
  background-color: #3a3b40;
}

.input-wrapper input[type="text"]:focus::placeholder {
  color: #b0b0b0;
}
</style>
