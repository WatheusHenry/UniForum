<template>
    <div class="container">
        <SideBar />
        <div class="profile-container">
            <SearchBar />
            <div class="profile-header">
                <div
                    style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-bottom: 1rem;">
                    <div style="display: flex;gap: 2rem;">
                        <div class="profile-picture-wrapper" @mouseenter="isHovering = true"
                            @mouseleave="isHovering = false" @click="chooseProfilePicture">
                            <img class="profile-picture" :src="user.profilePicture" alt="Profile Picture" />
                            <input type="file" ref="fileInput" @change="handleProfilePictureChange"
                                style="display: none" />
                            <div class="edit-icon" v-if="isHovering">
                                <i class="pi pi-pencil"></i>
                            </div>
                        </div>
                        <div class="profile-info">
                            <h2>{{ user.name }}</h2>
                            <p>{{ user.curso?.name }}</p>
                            <p>{{ user.currentTerm }}</p>
                        </div>
                    </div>
                    <button @click="editMode = !editMode" class="edit-button">
                        {{ editMode ? 'Cancelar' : 'Editar Perfil' }}
                    </button>
                </div>
                <h3>Publicações</h3>
            </div>

            <div v-if="editMode" class="edit-form">
                <label>Nome:
                    <input v-model="user.name" type="text" />
                </label>
                <label>Curso:
                    <input v-model="user.curso.name" type="text" />
                </label>
                <button @click="saveProfile" class="save-button">Salvar</button>
            </div>

            <div class="user-posts">
                <Post v-for="post in userPosts" :key="post.id" :id="post.id" :title="post.title" :content="post.content"
                    :createdAt="post.createdAt" :user="post.user" :discipline="post.discipline" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Post from '@/components/Post.vue';
import SearchBar from '@/components/SearchBar.vue';
import SideBar from '@/components/SideBar.vue';
import { fetchPostsByUser } from '@/services/postService';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const user = ref({});
const userPosts = ref([]);
const editMode = ref(false);
const fileInput = ref(null);
const isHovering = ref(false);

const loadUserPosts = async () => {
    try {
        const page = 1;
        const limit = 10;
        const courseId = user.value.curso?.id;
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('idUser');

        const posts = await fetchPostsByUser(page, limit, courseId, authToken, userId);
        userPosts.value = posts;
    } catch (error) {
        console.error("Erro ao carregar publicações do usuário:", error);
    }
};

// Lógica para salvar o perfil
const saveProfile = () => {
    editMode.value = false;
};

const triggerFileInput = () => {
    fileInput.value.click();  // Aciona o input de arquivo
};

// Função para escolher a foto de perfil
const chooseProfilePicture = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', handleFileSelect);
    fileInput.click();
};

const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                `http://localhost:3000/user/updateProfilePicture/${user.value.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Atualizar a foto de perfil no estado
            user.value.profilePicture = response.data.user.profilePicture;
            alert('Foto de perfil atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil:', error);
            alert('Erro ao atualizar foto de perfil');
        }
    }
};

onMounted(() => {
    user.value = JSON.parse(route.query.user || '{}');
    loadUserPosts(); // Carrega as publicações do usuário ao montar o componente
});
</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    background-color: #141416;
}

.profile-container {
    width: 40vw;
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

.edit-button:hover,
.save-button:hover {
    background-color: #0056b3;
}

.edit-form {
    margin: 1rem 0;
}

.edit-form label {
    display: block;
    margin-bottom: 0.5rem;
}

.edit-form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.enrolled-subjects {
    margin-top: 1.5rem;
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

.enrolled-subjects ul li:hover,
.user-posts ul li:hover {
    background-color: #555;
}
</style>
