<template>
    <div class="home">
        <NavBar />
        <Banner></Banner>
    </div>
</template>

<script setup>
import NavBar from '~/components/navBar.vue';
</script>

<style scoped>
.home {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1 {
    color: #2c3e50;
}
</style>