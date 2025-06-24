<template>
  <div>
    <NavBar />
    <NuxtRouteAnnouncer />
    <NuxtPage  v-if="!showLoader" />
    <globalLoader v-if="showLoader" />
    <Footer />
  </div>
</template>
<style global>
body {
  margin: 0;
  padding: 0;
}
</style>
<script setup>
import { ref } from "vue";
import NavBar from "./components/Layout/navBar.vue";
import Footer from "~/components/Layout/Footer.vue";
import globalLoader from "./components/UI/globalLoader.vue";
const isDarkMode = ref(false);

const isMetting = ref(false);
function handleConfirm(valor) {
  isMetting.value = valor;
}

const showLoader = ref(true);

onMounted(() => {
  setTimeout(() => {
    showLoader.value = false;
  }, 500); 
  
});

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap",
    },
  ],
});
</script>
