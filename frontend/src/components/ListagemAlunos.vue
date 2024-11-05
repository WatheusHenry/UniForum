<template>
    <div class="alunos-matriculados">
        <h2>Alunos matriculados</h2>
        <ul>
            <li v-for="(aluno, index) in alunos.slice(0, 4)" :key="index" :class="{ ativo: index === 0 }">
                <div class="avatar"></div>
                <div class="aluno-info">
                    <span>{{ aluno.name }}</span>
                    <small>{{ curso.name }}</small>
                </div>
            </li>
        </ul>
        <div class="dicas">
            <div class="dicas-header">
                <img src="../assets/images/dicas.svg" alt="Ícone de dicas" />
                <h3 style="margin-top: 0.2rem;">Dica do dia</h3>
            </div>
            <p>Manter-se organizado é fundamental para o sucesso nos estudos! Tente criar um cronograma semanal, onde
                você pode definir horários específicos para suas aulas, revisões e descanso. Dessa forma, você consegue
                equilibrar seus estudos e ainda ter tempo para relaxar. Lembre-se: a constância é a chave para o
                aprendizado eficaz!"</p>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const alunos = ref([]);
const curso = ref({});

const waitForLocalStorage = (key, interval = 100) => {
    return new Promise((resolve) => {
        const checkKey = setInterval(() => {
            if (localStorage.getItem(key)) {
                clearInterval(checkKey);
                resolve(localStorage.getItem(key));
            }
        }, interval);
    });
};

const fetchAlunos = async () => {
    try {
        // Aguarda até que o authToken e o idCourse estejam disponíveis no localStorage
        const token = await waitForLocalStorage('authToken');
        const cursoId = await waitForLocalStorage('idCourse');

        const response = await axios.get(`http://localhost:3000/curso/${cursoId}/alunos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        alunos.value = response.data.alunos;
        curso.value = response.data.curso;
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
    }
};

onMounted(() => {
    fetchAlunos();
});
</script>



<style scoped>
.alunos-matriculados {
    width: 23rem;
    background-color: #141416;
    padding: 1.5rem;
    height: fit-content;
    border-radius: 1rem;
    margin-top: 3rem;

}

.alunos-matriculados h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #ffffff;
}

.alunos-matriculados ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.alunos-matriculados li {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.alunos-matriculados li:hover {
    background-color: #3b3b3b;
}


.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-right: 10px;
}

.aluno-info {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
}

.aluno-info span {
    font-weight: bold;
    color: #ffffff;
}

.aluno-info small {
    font-size: 0.8rem;
    color: #a9a9a9;
}

.dicas {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #313132;
    border-radius: 8px;
}

.dicas-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.dicas-header img {
    width: 24px;
    height: 24px;
}

.dicas h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ffffff;
}

.dicas p {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #dcdcdc;
}
</style>