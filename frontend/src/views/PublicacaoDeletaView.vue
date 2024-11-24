<template>
    <div class="container">
    <SideBar/>
    <div class="container-main">
      <SearchBar/>
      <main class="main-content">
        <header class="header">
          <h1>Publicações deletadas</h1>
        </header>

        <div style="padding: 1rem;">
          <ListagemPublicacaoDeletada/>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import ListagemPublicacaoDeletada from '@/components/ListagemPublicacaoDeletada.vue';
import SideBar from '@/components/SideBar.vue';
</script>

<style scoped>
.container {
  display: flex;
  background-color: #141416;
  height: 100vh;
  overflow: auto;
}

.container-main {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.header {
  border-bottom: 1px solid #303030;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>