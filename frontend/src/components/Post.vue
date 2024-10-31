<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="post">
    <div class="post-header">
      <img :src="'https://placehold.co/400'" alt="Profile Picture" class="profile-pic" />
      <div class="post-info">
        <p class="post-author">{{ userName }}</p>
        <p class="post-discipline">{{ disciplineName }}</p>
        <p class="post-date">{{ formattedDate }}</p>
      </div>
    </div>
    <h2 class="post-title">{{ title }}</h2>
    <p class="post-content">{{ content }}</p>
    <div class="post-actions">
      <button class="action-button">
        <i class="fas fa-thumbs-up"></i> Curtir
      </button>
      <button class="action-button">
        <i class="fas fa-comment"></i> Comentar
      </button>
      <button class="action-button">
        <i class="fas fa-share-from-square"></i> Compartilhar
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  createdAt: String,
  user: Object,
  discipline: Object,
});

const userName = computed(() => props.user?.name || "Usuário Desconhecido");
const userProfilePic = computed(() => props.user?.profilePic || "default-pic-url.jpg");
const disciplineName = computed(() => props.discipline?.name || "Disciplina Desconhecida");

const formattedDate = computed(() => {
  const date = new Date(props.createdAt);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>

<style scoped>
.post {
  background-color: #1e1e1e;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.post:hover {
  transform: translateY(-5px);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3a3a3a;
}

.post-info {
  display: flex;
  flex-direction: column;
}

.post-author {
  font-weight: bold;
  font-size: 1rem;
}

.post-discipline {
  font-size: 0.9rem;
  color: #b5b5b5;
}

.post-date {
  font-size: 0.8rem;
  color: #a0a0a0;
}

.post-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 1rem;
}

.post-content {
  margin-top: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  /* Garante que palavras longas quebrem */
  word-wrap: break-word;
  /* Compatibilidade com navegadores mais antigos */
  overflow: hidden;
  /* Oculta texto que não cabe */
  max-height: 100px;
  /* Define uma altura máxima */
  display: -webkit-box;
  /* Para limitar o número de linhas */
  -webkit-box-orient: vertical;
  line-clamp: 5;
  /* Número máximo de linhas a serem exibidas */
}

.post-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.action-button:hover {
  background-color: #333333;
  color: white;
}

.action-button i {
  font-size: 18px;
}
</style>
