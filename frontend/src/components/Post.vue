<template>
  <div class="post" @click="goToDetail">
    <div class="post-header">
      <img :src="`${profilePicture}`" alt="Profile Picture" class="profile-pic" />
      <div class="post-info">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <p class="post-author">{{ userName }}</p>
          <p class="post-discipline">{{ disciplineName }}</p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <p class="post-date">{{ formattedDate }}</p>
          <button class="menu-button" @click.stop="showMenu($event)">
            <i class="pi pi-ellipsis-v"></i>
          </button>
          <Menu :model="menuItems" popup ref="menu" />
        </div>
      </div>
    </div>
    <h2 class="post-title">{{ title }}</h2>
    <p class="post-content">{{ content }}</p>
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
import { defineProps, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menu = ref(null); // Referência ao Menu

const props = defineProps({
  id: Number,
  title: String,
  content: String,
  createdAt: String,
  user: Object,
  discipline: Object,
});

const userName = computed(() => props.user?.name || "Usuário Desconhecido");
const profilePicture = computed(() => props.user?.profilePicture || "a");
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

const menuItems = [
  {
    label: 'Deletar',
    icon: 'pi pi-trash',
    command: () => handleDeletePost()
  },
  {
    label: 'Denunciar',
    icon: 'pi pi-exclamation-triangle',
    command: () => handleReportPost()
  }
];

const showMenu = (event) => {
  menu.value.toggle(event);
};

const handleDeletePost = () => {
  // Implementar a lógica para deletar o post
  console.log('Deletar post:', props.id);
};

const handleReportPost = () => {
  // Implementar a lógica para denunciar o post
  console.log('Denunciar post:', props.id);
};

const goToDetail = () => {
  router.push({ name: 'postDetail', params: { id: props.id } });
};
</script>


<style scoped>
.post {
  cursor: pointer;
  padding: 1rem 3rem;
  border-bottom: 1px solid #525151;
  transition: 0.1s linear;
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
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3a3a3a;
}

.post-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

.post-author {
  font-weight: bold;
  font-size: 1.2rem;
}

.post-discipline {
  background-color: #1e4f63;
  padding: 0rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #eeeeee;
  width: fit-content;
  height: fit-content;

}

.post-date {
  font-size: 0.8rem;
  color: #a0a0a0;
  height: fit-content;

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

.menu-button {
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  /* font-size: 24px; */
  color: #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, background-color 0.3s;
}

.menu-button:hover {
  background-color: #4e4e4e;
  border-radius: 5px;
}


</style>
