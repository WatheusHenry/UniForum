<template>
    <div class="container">
        <SideBar />
        <div class="comment-container">
            <div class="header-back">
                <button @click="goBack" class="back-button"> <i class="pi pi-arrow-left" style="font-size: 1.2rem"></i>
                </button>
            </div>
            <div class="post-detail">
                <div class="user-info">
                    <img :src="'https://placehold.co/200'" alt="Profile Picture" class="profile-pic" />
                    <div>
                        <p class="post-author">{{ post.user?.name }}</p>
                        <p class="post-discipline">{{ post.discipline?.name || "Disciplina não encontrada" }}</p>
                    </div>
                </div>
                <div class="post-header">
                    <h1 class="post-title">{{ post.title || "Título não encontrado" }}</h1>
                </div>
                <p class="post-content">{{ post.content || "Conteúdo não disponível" }}</p>
                <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>

            <section class="comments-section">
                <div class="comment-input">
                    <img :src="'https://placehold.co/200'" alt="Profile Picture" class="profile-pic-response" />
                    <input v-model="newComment" placeholder="Adicionar um comentário" class="inputResponse" />
                    <button @click="addNewComment()">Responder</button>
                </div>
                <div v-for="comment in comments" :key="comment.id" class="comment">
                    <p><strong>{{ comment.user.name }}</strong></p>
                    <p>{{ comment.content }}</p>
                </div>
            </section>
        </div>

        <ListagemAlunos />
    </div>
</template>

<script setup>
import ListagemAlunos from '@/components/ListagemAlunos.vue';
import SideBar from '@/components/SideBar.vue';
import { fetchPostById, fetchCommentsByPostId, addComment } from '@/services/postService';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/utils/dateFormat';

const route = useRoute();
const router = useRouter();
const post = ref({});
const comments = ref([]);
const newComment = ref('');

const loadPostDetails = async () => {
    try {
        const postId = route.params.id;
        post.value = await fetchPostById(postId);
        await loadComments(postId);
    } catch (error) {
        console.error("Erro ao carregar os detalhes do post:", error);
    }
};

const loadComments = async (postId) => {
    try {
        comments.value = await fetchCommentsByPostId(postId);
    } catch (error) {
        console.error("Erro ao carregar comentários:", error);
    }
};

const addNewComment = async () => {
    if (newComment.value.trim()) {
        try {
            const addedComment = await addComment(route.params.id, newComment.value);
            comments.value.push(addedComment);
            newComment.value = '';
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    }
};

const goBack = () => {
    router.back();
};

onMounted(() => {
    loadPostDetails();
});
</script>

<style scoped>
.header-back {
    margin: 0.5rem 1rem;
}

.back-button {
    background-color: transparent;
    color: #e2e2e2;
    margin: 0.5rem;
    border: none;
    border-radius: 5rem;
    cursor: pointer;
    transition: 0.1s linear;
    
}

.back-button:hover {
    color: #f7f7f7;
    background-color: #272727;
}

.profile-pic-response {
    width: 4rem;
    margin: 1rem;
    border-radius: 50%;
    object-fit: cover;
}


.profile-pic-response {
    width: 3rem;
    height: 3rem;
    margin: 1.5rem;
    border-radius: 50%;
    object-fit: cover;

}

.inputResponse {
    border-radius: 0;
    padding: 2rem 2rem 2rem 0rem;
    border: none;
    background-color: #141416;
    width: 100%;
    color: #eaeaea;
    font-size: 1.5rem;
}

.inputResponse:focus {
    border: none;
    outline: none;
}


.user-info {
    display: flex;
    font-size: 1.5rem;
    gap: 1rem;
    margin-bottom: 1rem;
}

.profile-pic {
    width: 4rem;
    border-radius: 100rem;
}

.comment-container {
    width: 40%;
    border-right: #303030 1px solid;
}

.post-header {
    text-indent: 1rem;
    display: flex;
    justify-content: space-between;

}

.post-discipline {
    width: fit-content;
    font-size: 0.9rem;
    background-color: rgb(96, 170, 255);
    height: fit-content;
    color: #1e1e1f;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
}

.post-detail {

    height: fit-content;
    padding: 2rem 4rem 1rem 4rem;
    background-color: #141416;
    color: #f5f5f5;
    border: 1px solid #303030;
}

.post-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;

}

.post-content {
    text-indent: 1rem;

    font-size: 1.2rem;

    line-height: 1.6;
    color: #d3d3d3;
    margin-left: 0.2rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-date {
    text-indent: 1rem;
    font-size: 0.9rem;
    color: #a5a5a5;
    margin-bottom: 2rem;
}

.comments-section {
    color: #f5f5f5;
    background-color: #141416;
    border-radius: 10px;

}

.comments-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    padding-bottom: 0.5rem;
}

.comment {
    padding: 1.5rem 3rem;
    border-bottom: 1px solid #303030;

    color: #eaeaea;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.comment:hover {
    background-color: #4a4a4a;
}

.comment strong {
    color: #a9d8ff;
    font-weight: bold;
    font-size: 1.2rem;
}

.comment-input {
    border: 1px solid #303030;
    display: flex;

}


button {
    background-color: #2883a7;
    color: white;
    padding: 0.5rem 1rem;
    height: fit-content;
    margin: auto;
    margin-right: 1rem;
    border-radius: 1rem;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #2883a7;
    transform: scale(1.01);
}

button:active {
    background-color: #1f5970;
    transform: scale(0.99);
}


.container-main {
    padding-top: 1rem;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: 40%;
}

.container {
    height: 100vh;
    display: flex;
    background-color: #141416;
}
</style>