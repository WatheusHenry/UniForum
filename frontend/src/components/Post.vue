<template>
    <div class="post">
      <div class="post-header">
        <img :src="profilePic" alt="Profile Picture" class="profile-pic" />
        <div class="post-author">
          <p class="author-name">{{ author }}</p>
          <p class="post-date">{{ postDate }}</p>
        </div>
      </div>
      <p class="post-content">{{ content }}</p>
      <div class="post-actions">
        <button class="action-button">
          <img src="../assets/images/like.svg" alt="Like" />
          Curtir
        </button>
        <button class="action-button">
          <img src="../assets/images/comment.svg" alt="Comment" />
          Comentar
        </button>
        <button class="action-button">
          <img src="../assets/images/compart.svg" alt="Share" />
          Compartilhar
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    author: String,
    content: String,
    profilePic: String,
    postDate: {
      type: String,
      default: "Hoje",
    },
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
  
  .post-author {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-weight: bold;
    font-size: 1rem;
  }
  
  .post-date {
    font-size: 0.8rem;
    color: #a0a0a0;
  }
  
  .post-content {
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height: 1.5;
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
  
  .action-button img {
    width: 18px;
    height: 18px;
  }
  </style>
  