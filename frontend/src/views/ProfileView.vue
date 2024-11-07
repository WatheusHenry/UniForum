<template>
    <div class="container">
        <SideBar />
        <div class="profile-container">
            <SearchBar />
            <div class="profile-header">
                <div style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-bottom: 1rem;">
                    <div style="display: flex;gap: 2rem;">

                        <img class="profile-picture" :src="user.profilePicture" alt="Profile Picture" />
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

            <!-- Formulário de edição do perfil -->
            <div v-if="editMode" class="edit-form">
                <label>Nome:
                    <input v-model="user.name" type="text" />
                </label>
                <label>Curso:
                    <input v-model="user.curso.name" type="text" />
                </label>
                <button @click="saveProfile" class="save-button">Salvar</button>
            </div>


            <!-- Publicações do usuário -->
            <div class="user-posts">
                <!-- <ul>
                    <li v-for="(post, index) in userPosts" :key="index">
                        <h4>{{ post.title }}</h4>
                        <p>{{ post.content }}</p>
                    </li>
                </ul> -->
                <Post v-for="post in userPosts" :key="post.id" :id="post.id" :title="post.title" :content="post.content"
                    :createdAt="post.createdAt" :user="post.user" :discipline="post.discipline" />
            </div>
        </div>
        <!-- Matérias matriculadas
        <div class="enrolled-subjects">
            <h3>Matérias matriculadas</h3>
            <ul>
                <li v-for="(disciplina, index) in disciplinas" :key="index">
                    {{ disciplina.name }}
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script setup>
import Post from '@/components/Post.vue';
import SearchBar from '@/components/SearchBar.vue';
import SideBar from '@/components/SideBar.vue';
import { fetchPostsByUser } from '@/services/postService';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';



const route = useRoute();
const user = ref({});
const disciplinas = ref([]);
const userPosts = ref([]);
const editMode = ref(false);

const loadUserPosts = async () => {
    try {
        const page = 1;
        const limit = 10;
        const courseId = user.value.curso?.id;
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('idUser');

        const posts = await fetchPostsByUser(page, limit, courseId, authToken, userId);
        userPosts.value = posts;
        console.log(userPosts.value)
    } catch (error) {
        console.error("Erro ao carregar publicações do usuário:", error);
    }
};

const saveProfile = () => {
    console.log("Perfil atualizado:", user.value);
    editMode.value = false;
};

onMounted(() => {
    user.value = JSON.parse(route.query.user || '{}');
    disciplinas.value = JSON.parse(route.query.disciplinas || '[]');
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

.profile-picture {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: #ddd;
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
