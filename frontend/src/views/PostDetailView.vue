<template>
    <div class="container">
        <SideBar />
        <div class="comment-container">
            <div class="header-back">
                <button @click="goBack" class="back-button">
                    <i class="pi pi-arrow-left" style="font-size: 1.2rem"></i>
                </button>
            </div>
            <Post :key="post.id" :id="post.id" :title="post.title" :content="post.content" :createdAt="post.createdAt"
                :user="post.user" :discipline="post.discipline" :imageUrl="post.imageUrl" />

            <section class="comments-section">
                <div class="comment-input">
                    <p style="padding: 0.5rem;color: gray;margin-left: 1.3rem;">Respondendo o usuário: {{
                        post.user?.name }}</p>
                    <div style="display: flex;">
                        <input v-model="newComment" placeholder="Adicionar um comentário" class="inputResponse" />
                    </div>
                    <input type="file" @change="handleImageUpload" accept="image/*" id="commentImage"
                        style="display: none" />
                    <div v-if="imagePreview" class="image-preview">
                        <img :src="imagePreview" alt="Image Preview" class="image-preview-img" />
                        <button class="remove-button" @click="clearImage">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>
                    <div style="display:flex;justify-content: space-between;margin-bottom: 0.5rem;">

                        <button class="iconBtn" @click="openFileInput"><i class="pi pi-image"></i></button>
                        <button @click="addNewComment">Responder</button>
                    </div>

                </div>

                <div v-for="comment in comments" :key="comment.id" class="comment">
                    <img :src="`${comment.user.profilePicture}`" alt="Profile Picture" class="profile-pic-response" />
                    <div style="margin-top: 1rem;">
                        <p><strong>{{ comment.user.name }}</strong></p>
                        <p>{{ comment.content }}</p>

                        <img :src="`${comment.imageUrl}`" style="width: 90%;border-radius: 1rem;" alt="">
                    </div>
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
import Post from '@/components/Post.vue';

const route = useRoute();
const router = useRouter();
const post = ref({});
const comments = ref([]);
const newComment = ref('');
const imagePreview = ref(null);
const selectedImage = ref(null);

const loadPostDetails = async () => {
    try {
        const postId = route.params.id;
        post.value = await fetchPostById(postId);
        await loadComments(postId);
        console.log(post.value, postId)
    } catch (error) {
        console.error("Erro ao carregar os detalhes do post:", error);
    }
};

const loadComments = async (postId) => {
    try {
        comments.value = await fetchCommentsByPostId(postId);
        console.log(comments.value, comments)
    } catch (error) {
        console.error("Erro ao carregar comentários:", error);
    }
};

const clearImage = () => {
    imagePreview.value = null;
    selectedImage.value = null;
};

const addNewComment = async () => {
    if (newComment.value.trim() || selectedImage.value) {
        try {
            const addedComment = await addComment(route.params.id, newComment.value, selectedImage.value);
            comments.value.push(addedComment);
            newComment.value = '';
            imagePreview.value = null;
            selectedImage.value = null;
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    }
};


const goBack = () => {
    router.back();
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            selectedImage.value = file;
        };
        reader.readAsDataURL(file);
    }
};

const openFileInput = () => {
    document.getElementById('commentImage').click();
};

onMounted(() => {
    loadPostDetails();
});
</script>


<style scoped>
.image-preview {
    position: relative;
    margin: 1rem;
    max-width: 100%;
    display: flex;
}

.image-preview-img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
}

/* Botão de remoção posicionado no canto superior direito */
.remove-button {
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.493);
    border: none;
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
    cursor: pointer;
    width: 2rem;
    padding: 0.4rem;
    height: 2rem;
    margin: 0.5rem;
    border-radius: 10rem;
    z-index: 1;
    /* Garante que o botão fique acima da imagem */
}

.remove-button:hover {
    color: #ffffff;
    background-color: #00000054;
    /* Altere a cor de hover, se desejar */
}


/* Style Adjustments for Buttons */
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

.header-back {
    /* margin: 0.5rem 1rem; */
    border-bottom: 1px solid #303030;
}

.back-button {
    background-color: transparent;
    color: #e2e2e2;
    margin: 1rem;
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
    padding: 0.5rem 2rem 2rem 2rem;
    border: none;
    background-color: #141416;
    width: 100%;
    color: #eaeaea;
    font-size: 1.3rem;
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
    height: 4rem;
    border-radius: 100rem;
}

.comment-container {
    width: 40%;
    overflow-y: auto;
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

.iconBtn {
    width: fit-content;
    background: none;
    color: #70b1ca;
    font-size: 1rem;
    margin-left: 1rem;
}

.iconBtn:hover {
    background: #28505f;
    color: #e0ebf0;
    font-size: 1rem;
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

.clear-image-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.clear-image-btn:hover {
    background-color: #c0392b;
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
    margin-bottom: 1rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #303030;
    display: flex;
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
    flex-direction: column;
    justify-content: start;


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

/* Estilos para a barra de rolagem */
.comment-container::-webkit-scrollbar {
    width: 8px;
}

.comment-container::-webkit-scrollbar-track {
    background: none;
    border-radius: 10px;
}

.comment-container::-webkit-scrollbar-thumb {
    background-color: #272727;
    border-radius: 10px;
    border: 2px solid #2d2d2d;
}

.comment-container::-webkit-scrollbar-thumb:hover {
    background-color: #5e5e5e;
}
</style>