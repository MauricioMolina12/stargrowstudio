<template>
  <div class="home">
    <NavBar />
    <Banner></Banner>
    <OurServices></OurServices>
    <AboutUs></AboutUs>
    <!-- <button class="choose-theme" @click="toggleThemesMenu()">
      <span class="material-symbols-outlined"> light_mode </span>
    </button>
    <div class="themes" :class="{ active: showThemes }">
      <div class="theme-light" @click="setTheme('light')">
        <span>Tema claro</span>
        <span class="material-symbols-outlined"> light_mode </span>
      </div>
      <div class="theme-dark" @click="setTheme('dark')">
        <span>Tema oscuro</span>
        <span class="material-symbols-outlined"> dark_mode </span>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import NavBar from "~/components/Layout/navBar.vue";
import { ref, onMounted } from "vue";

const showThemes = ref(false);
const currentTheme = ref('light');

function toggleThemesMenu() {
  showThemes.value = !showThemes.value;
}

function setTheme(theme) {
  currentTheme.value = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});
</script>


<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-light);
  position: relative;
}

.choose-theme {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #FFF;
  border: 1px solid var(--color-dark);
  cursor: pointer;
  z-index: 300;
}

.themes {
  position: static;
  right: 10px;
  bottom: 60px;
  width: 240px;
  height: 150px;
  border-radius: 10px;
  background-color: #FFF;
  border: 1px solid var(--color-dark);
  z-index: 1000;
  display: none;
  transition: all 1s ease;
  padding-inline: 10px;
}

.themes.active {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.theme-light,
.theme-dark {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
</style>
