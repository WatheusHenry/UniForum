<template>
    <div class="container">
        <SideBar />
        <div class="profile-container">
            <SearchBar />
            <div class="profile-header">
                <div
                    style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-bottom: 1rem;">
                    <div style="display: flex;gap: 2rem;">
                        <div class="profile-picture-wrapper">
                            <img class="profile-picture" :src="user.profilePicture" alt="Profile Picture" />
                        </div>
                        <div class="profile-info">
                            <h2>{{ user.name }}</h2>
                            <p>{{ user.curso?.name }}</p>
                            <p>{{ user.currentTerm }}</p>
                        </div>
                    </div>
                </div>
                <h3>Publicações</h3>
            </div>


            <div class="user-posts">
                <Post v-for="post in posts" :key="post.id" :id="post.id" :title="post.title" :content="post.content"
                    :createdAt="post.createdAt" :user="post.user" :discipline="post.discipline" />
            </div>
        </div>
        <ListagemAlunos />
    </div>
</template>

<script setup>
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import Post from '@/components/Post.vue';
import SearchBar from '@/components/SearchBar.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const userId = route.params.userId;
const user = ref({});
const posts = ref([]);
const token = () => localStorage.getItem('authToken')

const fetchUserProfile = async () => {
    try {
        const userResponse = await axios.get(`http://localhost:3000/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token()}` // Adiciona o token no cabeçalho
            }
        });
        user.value = userResponse.data;

        const postsResponse = await axios.get(`http://localhost:3000/post/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token()}` // Adiciona o token no cabeçalho
            }
        });
        posts.value = postsResponse.data;
    } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
    }
};

onMounted(() => {
    fetchUserProfile();
});

watch(
    () => route.params.userId,
    () => {
        fetchUserProfile();
    }
);

</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    background-color: #141416;
}

.profile-container {
    width: 40vw;
    overflow: auto;
    margin-top: 1rem;
    color: #fff;
    border-right: 1px solid #303030;
}

.profile-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
    padding: 3rem 3rem 0.1rem 3rem;
    border-top: 1px solid #303030;
    border-bottom: 1px solid #303030;
}

.profile-header h3 {
    width: fit-content;
    padding: 0.5rem;
    border-bottom: #0056b3 3px solid;
}

.profile-picture-wrapper {
    position: relative;
    display: inline-block;
}

.profile-picture {
    min-width: 8rem;
    min-height: 8rem;
    max-width: 8rem;
    max-height: 8rem;
    border-radius: 50%;
    background-color: #ddd;
    transition: all 0.3s ease;
}

.profile-picture-wrapper:hover .profile-picture {
    background-color: #2929296c;
    filter: brightness(0.7);
    cursor: pointer;
    /* Torna a imagem mais escura */
}

.edit-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    /* Fundo escuro para o ícone */
    color: white;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
}

.profile-picture-wrapper:hover .edit-icon {
    opacity: 1;
    /* Torna o ícone visível ao passar o mouse */
}

.profile-info h2 {
    font-weight: 600;
    margin: 0;
    font-size: 1.5rem;
    color: #ffffff;
}

.profile-info p {
    font-size: 1rem;
    color: #c9c9c9;
}

.edit-button,
.save-button {
    height: fit-content;
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 10rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
}







.enrolled-subjects h3,
.user-posts h3 {
    font-size: 1.2rem;
    margin: 0.5rem;
    text-align: center;
    color: #555;
}

.enrolled-subjects ul,
.user-posts ul {
    list-style-type: none;
    padding: 0;
}

.enrolled-subjects ul li,
.user-posts ul li {
    padding: 8px;
    border-radius: 5px;
    background-color: #333;
    margin-bottom: 0.5rem;
    color: #e0e0e0;
    transition: background-color 0.3s ease;
}



/* Estilos para a barra de rolagem */
.profile-container::-webkit-scrollbar {
    width: 8px;
}

.profile-container::-webkit-scrollbar-track {
    background: none;
    border-radius: 10px;
}

.profile-container::-webkit-scrollbar-thumb {
    background-color: #272727;
    border-radius: 10px;
    border: 2px solid #2d2d2d;
}

.profile-container::-webkit-scrollbar-thumb:hover {
    background-color: #5e5e5e;
}
</style>
