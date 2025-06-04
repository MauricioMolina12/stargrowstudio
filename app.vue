<template>
  <div :class="{ dark: isDarkMode }">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
<style global>
body {
  margin: 0;
  padding: 0;
}
</style>
<script setup>
import { ref } from 'vue';
const isDarkMode = ref(false);
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
    },
  ],
})
</script>

