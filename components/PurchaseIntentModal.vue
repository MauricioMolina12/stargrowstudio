<template>
  <div class="overlay" :class="{ 'not-connection': !isOnline }">
    <button class="close" @click="closeAction">X</button>

    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-if="!isOnline">
      <span class="not-connection">No tienes conexión a internet</span>
    </div>

    <ClientOnly v-if="isOnline">
      <div class="modal-content">
        <h2>{{ plan.name }}</h2>
        <p class="plan-description">{{ plan.description }}</p>
        <h4>{{ plan.priceNew }}</h4>

        <ul>
          <li v-for="(item, i) in plan.features.included" :key="i">
            {{ item }}
          </li>
        </ul>

        <form @submit.prevent="submit">
          <input v-model="form.name" placeholder="Tu nombre" required />
          <input
            v-model="form.email"
            type="email"
            placeholder="Tu correo"
            required
          />
          <textarea
            v-model="form.message"
            placeholder="Mensaje adicional..."
          ></textarea>
          <div class="buttons">
            <button type="submit">Enviar solicitud</button>
            <button type="button" @click="toggleMeeting" class="secondary-btn">
              {{ showMeeting ? "Ocultar" : "Agendar una reunión" }}
            </button>
          </div>
        </form>

        <iframe
          v-if="showMeeting"
          @load="loading = false"
          src="https://calendly.com/molinamau37/nueva-reunion?primary_color=5656b5"
          width="100%"
          height="1050"
          frameborder="0"
          style="border: none; margin-top: 1rem"
        ></iframe>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close", "submit"]);

const props = defineProps({
  plan: {
    type: Object,
    required: true,
    default: () => ({
      title: "Plan personalizado",
      description: "Descripción del plan",
      benefits: [],
    }),
  },
});

const loading = ref(false);
const showMeeting = ref(false);
const isOnline = ref(window.navigator.onLine);

const form = ref({
  name: "",
  email: "",
  message: "",
});

function updateOnlineStatus() {
  isOnline.value = window.navigator.onLine;
}

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
  document.body.style.overflow = "auto";
});

function closeAction() {
  emit("close", false);
}

function toggleMeeting() {
  showMeeting.value = !showMeeting.value;
  if (showMeeting.value) loading.value = true;
  if (showMeeting.value) {
    setTimeout(() => {
      const modal = document.querySelector(".modal-content");
      if (modal) {
        modal.scrollTo({
          top: 800,
          behavior: "smooth",
        });
      }
    }, 3000);
  }
}

function submit() {
  emit("submit", form.value);
  alert("¡Gracias! Te contactaremos pronto.");
  closeAction();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90vh;
}

h2 {
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  font-size: 1.6rem;
  font-weight: 700;
}

h4 {
  font-weight: 600;
}

.plan-description {
  margin-bottom: 1rem;
  color: #666;
}

ul {
  margin-block: 40px;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 0.8rem;
}

ul li {
  position: relative;
}

ul li::before {
  content: "✔";
  color: #90ee90;
  margin-right: 10px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

form .buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 15px;
}

input,
textarea {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  resize: none;
}

textarea {
  height: 200px;
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #5656b5;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.secondary-btn {
  background-color: #eee;
  color: #5656b5;
}

button:hover {
  opacity: 0.9;
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

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
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

.not-connection {
  color: red;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 1024px) {

  .overlay{
    padding: 0;
  }

  .modal-content {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .close {
    right: 5px;
    top: 0px;
  }
}

@keyframes loader {
  to {
    transform: rotate(360deg);
  }
}
</style>
