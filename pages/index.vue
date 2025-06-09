<template>
  <div class="home">
    <Banner></Banner>
    <OurServices></OurServices>
    <AboutUs></AboutUs>
    <OurWay @openMetting="handleConfirm"></OurWay>
    <MettingModal v-if="isMetting" @close="handleConfirm" />
    <!--
    <button class="choose-theme" @click="toggleThemesMenu()">
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
    </div>
    -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MettingModal from "~/components/metting-modal.vue";

const showThemes = ref(false);
const currentTheme = ref("light");

function toggleThemesMenu() {
  showThemes.value = !showThemes.value;
}

function setTheme(theme) {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

const isMetting = ref(false);
function handleConfirm(valor) {
  isMetting.value = valor;
}
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
  position: relative;
}

</style>
