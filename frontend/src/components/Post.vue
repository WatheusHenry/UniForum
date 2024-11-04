<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="post" @click="goToDetail">
    <div class="post-header">
      <img :src="'https://placehold.co/400'" alt="Profile Picture" class="profile-pic" />
      <div class="post-info">
        <p class="post-author">{{ userName }}</p>
        <p class="post-discipline">{{ disciplineName }}</p>
      </div>
    </div>
    <h2 class="post-title">{{ title }}</h2>
    <p class="post-content">{{ content }}</p>
    <p class="post-date">{{ formattedDate }}</p>
    <div class="post-actions">
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
import { useRouter } from 'vue-router';


const router = useRouter();


const props = defineProps({
  id: Number, 
  title: String,
  content: String,
  createdAt: String,
  user: Object,
  discipline: Object,
});

const userName = computed(() => props.user?.name || "Usuário Desconhecido");
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


const goToDetail = () => {
  router.push({ name: 'postDetail', params: { id: props.id } });
};
</script>

<style scoped>
.post {
  cursor: pointer;
  padding: 1rem 3rem;
  border-bottom: 1px solid #525151;
  transition:  0.1s linear;
  color: white;
}

.post:hover {
  background-color: #333333;

}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-pic {
  width: 4rem;
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
  font-size: 1.2rem;
}

.post-discipline {
  background-color: #2883a7;
  padding: 0rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #eeeeee;
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
  word-wrap: break-word;
  overflow: hidden;
  max-height: 100px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 5;
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
