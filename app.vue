<template>
  <div :class="{ dark: isDarkMode }">
    <NavBar />
    <NuxtRouteAnnouncer />
    <NuxtPage />
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
const isDarkMode = ref(false);

const isMetting = ref(false);
function handleConfirm(valor) {
  isMetting.value = valor;
}

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
    },
  ],
});
</script>
