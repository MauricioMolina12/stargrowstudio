<template>
  <div class="overlay" :class="{'not-connection': !isOnline}">
    <button class="close" @click="closeAction">X</button>

    <!-- Loader overlay -->
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-if="!isOnline">
      <span class="not-connection">No tienes conexión a internet</span>
    </div>

    <ClientOnly v-if="isOnline">
      <iframe
        @load="loading = false"
        src="https://calendly.com/molinamau37/30min?primary_color=5656b5"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        style="border: none; min-width: 320px"
      ></iframe>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close"]);
const loading = ref(true);

const isOnline = ref(window.navigator.onLine);

function updateOnlineStatus() {
  isOnline.value = window.navigator.onLine;
}

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
  document.body.style.overflow = "auto";
});

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

function closeAction() {
  emit("close", false);
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease-out forwards 10s;
  backface-visibility: hidden;
  will-change: opacity, transform;
}

.overlay.not-connection{
  background-color: aliceblue;
}

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #5656b5;
  border-radius: 50%;
  animation: loader 1s linear infinite;
}

.not-connection{
  color: red;
  font-size: 1.8rem;
  font-weight: 700;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
}
</style>
