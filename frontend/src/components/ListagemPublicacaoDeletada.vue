<template>
    <div class="col-12">
        <DataTable v-if="publicacoesDeletadas.length > 0" :value="publicacoesDeletadas" tableStyle="width: 100%">
            <Column field="title" header="Titulo"></Column>
            <Column field="deletedAt" header="Deletado em">
                <template #body="slotProps">
                    {{ formatDateToPTBR(slotProps.data.deletedAt) }}
                </template>
            </Column>
            <Column header="Restaurar">
                <template #body="slotProps">
                    <div style="display: flex; justify-content: center;">
                        <Button
                            type="button"
                            icon="pi pi-refresh"
                            @click="restaurarPublicacao(slotProps.data.id)"
                        />
                    </div>
                </template>
            </Column>
        </DataTable>

        <Message v-else severity="warn">Nenhuma publicação encontrada</Message>
    </div>
</template>



<script setup>
import axiosInstance from '@/services/http.service';
import { ref, onMounted } from 'vue';

const publicacoesDeletadas = ref([]);

const findAllPublicacoesDeletadas = async () => {
    await axiosInstance.get('/post/deleted-by-user')
    .then(res => {
        publicacoesDeletadas.value = res.data;
        console.log(res.data);
    })
    .catch(error => {
        console.error("Erro ao carregar publicações deletadas", error);
    });
};

const restaurarPublicacao = async (publicacaoId) => {
    await axiosInstance.patch(`/post/${publicacaoId}`, {
        id: publicacaoId,
        deletedAt: null,
        deletedBy: null
    })
    .then(() => {
        findAllPublicacoesDeletadas();
    });
};

const formatDateToPTBR = (isoDate) => {
  const date = new Date(isoDate);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo',
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

onMounted(() => {
    findAllPublicacoesDeletadas();
});
</script>
