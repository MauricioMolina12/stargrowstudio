<template>
  <div>
    <NavBar />
    <NuxtRouteAnnouncer />
    <globalLoader v-if="showLoader" />
    <NuxtPage v-else />
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '../components/Layout/navBar.vue'
import Footer from '../components/Layout/Footer.vue'
import globalLoader from '~/components/UI/globalLoader.vue'
import { ref, onMounted } from 'vue'

const showLoader = ref(true)

onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
  }, 500)
})


</script>
