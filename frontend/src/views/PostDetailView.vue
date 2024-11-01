<template>
    <div class="post-detail">
      <h1 class="post-title">{{ post.title || "Título não encontrado" }}</h1>
      <p class="post-content">{{ post.content || "Conteúdo não disponível" }}</p>
      <p class="post-date">{{ post.createdAt }}</p>
  
      <section class="comments-section">
        <h2 class="comments-title">Comentários</h2>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <p><strong>{{ comment.user.name }}:</strong> {{ comment.text }}</p>
        </div>
        <div class="comment-input">
          <input v-model="newComment" placeholder="Adicionar um comentário" />
          <button @click="addNewComment">Comentar</button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { fetchPostById } from '@/services/postService';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const post = ref({});
  const comments = ref([]);
  const newComment = ref('');
  
  const loadPostDetails = async () => {
    const postId = route.params.id;
    post.value = await fetchPostById(postId);
    comments.value = post.value.comments || [];
    console.log(post.value, "Post details loaded");
  };
  
  const addNewComment = async () => {
    if (newComment.value.trim()) {
      const addedComment = await addComment(route.params.id, newComment.value);
      comments.value.push(addedComment);
      newComment.value = '';
    }
  };
  
  onMounted(() => {
    loadPostDetails();
  });
  </script>
  
  <style scoped>
  .post-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #2D2D30;
    border-radius: 10px;
    color: #f5f5f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .post-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  
  .post-content {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: #d3d3d3;
  }
  
  .post-date {
    font-size: 0.9rem;
    color: #a5a5a5;
    margin-bottom: 2rem;
  }
  
  .comments-section {
    margin-top: 2rem;
    color: #f5f5f5;
  }
  
  .comments-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  
  .comment {
    background-color: #3c3c3c;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    color: #eaeaea;
  }
  
  .comment strong {
    color: #a9d8ff;
  }
  
  .comment-input {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #1f1f1f;
    color: #eaeaea;
    outline: none;
  }
  
  input::placeholder {
    color: #888;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  button:active {
    background-color: #1e7e34;
    transform: scale(0.98);
  }
  </style>
  