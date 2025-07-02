<template>
  <section class="portfolio" :class="{ dark: isDark }">
    <div class="portfolio--inner">
      <div class="portfolio--inner__description parallaxElement">
        <span class="subtitle">Nuestro portafolio</span>
        <h1 class="title">
          <span>Proyectos que transforman ideas</span> en soluciones reales y
          efectivas
        </h1>
      </div>
      <div class="tabs parallaxElement">
        <button
          v-for="tab of tabs"
          :class="{ active: tab.filterKey === currentTab }"
          @click="filterPackages(tab.filterKey)"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="cards-wrapper parallaxElement">
        <div class="cards-slider" ref="slider">
          <div class="card" v-for="project of filteredProjects">
            <figure class="card--image">
              <img :src="project.image" :alt="project.name" />
            </figure>
            <div class="card--content">
              <h2 class="card--name">{{ project.name }}</h2>
              <p class="card--description">{{ project.description }}</p>
            </div>
          </div>
        </div>
        <button
          class="card-button-left"
          @click="scrollSlider('left')"
          :class="{ disabled: isAtStart }"
        >
          <span class="material-symbols-outlined">arrow_left</span>
        </button>
        <button
          :class="{ disabled: isAtEnd }"
          class="card-button-right"
          @click="scrollSlider('right')"
        >
          <span class="material-symbols-outlined">arrow_right</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useDarkMode } from "./composables/useDarkMode";
import { useIntersectionObserver } from "./composables/useIntersectionObserver";
useIntersectionObserver(".parallaxElement", { threshold: [0, 0.2, 0.8] }, "2");

const { isDark } = useDarkMode();
const emit = defineEmits(["emitPackage"]);

function emitPackage(data: {}) {
  emit("emitPackage", { ...data });
}

onMounted(() => {
  checkScrollPosition();
  initContent();
  slider.value?.addEventListener("scroll", checkScrollPosition);
});

const slider = ref<HTMLDivElement | null>(null);
let valueLeft = ref<number>(0);
let isAtStart = ref<boolean>(true);
let isAtEnd = ref<boolean>(false);
function scrollSlider(direction: "left" | "right") {
  valueLeft.value = direction === "left" ? -300 : 300;
  slider.value?.scrollBy({ left: valueLeft.value, behavior: "smooth" });
  checkScrollPosition();
}

function checkScrollPosition() {
  const scrollLeft = slider.value?.scrollLeft ?? 0;
  const maxScrollLeft =
    (slider.value?.scrollWidth ?? 0) - (slider.value?.clientWidth ?? 0);
  const tolerance = 3;

  isAtStart.value = scrollLeft <= tolerance;
  isAtEnd.value = scrollLeft + tolerance >= maxScrollLeft;
}

function debounce(fn: () => void, delay: number) {
  let timeout: any;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(), delay);
  };
}

const projects = ref<project[]>([
  {
    name: "Renta GO",
    category: "web",
    image: "projects/rentago.jpg",
    description:
      "Renta Go es un proyecto innovador de renta de autos que ofrece una experiencia rápida, confiable y flexible para todo tipo de viajeros. Nuestro compromiso es poner la movilidad al alcance de todos, brindando vehículos modernos, seguros y bien mantenidos para satisfacer cualquier necesidad, ya sea un viaje de negocios, vacaciones familiares o traslados urbanos. Con procesos de reserva sencillos y atención personalizada, Renta Go transforma la forma de moverte.",
  },
  {
    name: "Mercadatos SAS BIC",
    category: "web",
    image: "projects/mercadatos.png",
    description:
      "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información. Con procesos eficientes y tecnología de vanguardia, Mercadatos ayuda a digitalizar, organizar y mantener seguros los documentos críticos de empresas e instituciones. Su compromiso con la calidad y la mejora continua se refleja en cada proyecto, aportando valor y confianza a sus clientes.",
  },
  {
    name: "Mercadatos SAS BIC",
    category: "web",
    image: "projects/mercadatos.png",
    description:
      "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información. Con procesos eficientes y tecnología de vanguardia, Mercadatos ayuda a digitalizar, organizar y mantener seguros los documentos críticos de empresas e instituciones. Su compromiso con la calidad y la mejora continua se refleja en cada proyecto, aportando valor y confianza a sus clientes.",
  },
  {
    name: "Mercadatos SAS BIC",
    category: "web",
    image: "projects/mercadatos.png",
    description:
      "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información. Con procesos eficientes y tecnología de vanguardia, Mercadatos ayuda a digitalizar, organizar y mantener seguros los documentos críticos de empresas e instituciones. Su compromiso con la calidad y la mejora continua se refleja en cada proyecto, aportando valor y confianza a sus clientes.",
  },
  {
    name: "Mercadatos SAS BIC",
    category: "web",
    image: "projects/mercadatos.png",
    description:
      "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información. Con procesos eficientes y tecnología de vanguardia, Mercadatos ayuda a digitalizar, organizar y mantener seguros los documentos críticos de empresas e instituciones. Su compromiso con la calidad y la mejora continua se refleja en cada proyecto, aportando valor y confianza a sus clientes.",
  },
  {
    name: "Mercadatos SAS BIC",
    category: "web",
    image: "projects/mercadatos.png",
    description:
      "Mercadatos SAS BIC es una empresa especializada en gestión documental, dedicada a optimizar la forma en que las organizaciones administran, protegen y transforman su información. Con procesos eficientes y tecnología de vanguardia, Mercadatos ayuda a digitalizar, organizar y mantener seguros los documentos críticos de empresas e instituciones. Su compromiso con la calidad y la mejora continua se refleja en cada proyecto, aportando valor y confianza a sus clientes.",
  },
  {
    name: "Vehicle care",
    category: "design",
    image: "projects/vehicleCare.png",
    description:
      "Vehicle Care es el diseño de una app móvil pensada para ayudar a conductores a identificar posibles problemas mecánicos en sus autos y recibir recomendaciones sobre soluciones. La aplicación permite registrar y gestionar la información de cada vehículo, contactar a asesores especializados, obtener diagnósticos preliminares y dar seguimiento al estado del auto. Con Vehicle Care, los conductores cuentan con una herramienta práctica y confiable para mantener sus vehículos en óptimas condiciones.",
  },
]);

const tabs = ref<{ name: string; filterKey: string }[]>([
  {
    name: "App webs",
    filterKey: "web",
  },
  {
    name: "App móviles",
    filterKey: "mobile",
  },
  {
    name: "Diseños",
    filterKey: "design",
  },
]);

const currentTab = ref("");

interface project {
  name: string;
  category: string;
  image: string;
  description: string;
}

const filteredProjects = ref<project[]>([]);

function filterPackages(category: string) {
  filteredProjects.value = projects.value.filter(
    (value) => value.category === category
  );
  currentTab.value = category;
}

function initContent() {
  currentTab.value = "web";
  filteredProjects.value = projects.value.filter(
    (value) => value.category === "web"
  );
}
</script>
<style scoped>
.portfolio {
  width: 100%;
  max-height: max-content;
  padding-block: 80px;
}

.portfolio.dark {
  background-color: #121245;
}

.portfolio.dark .portfolio--inner__description .subtitle,
.portfolio.dark .portfolio--inner__description .title span {
  color: var(--color-white);
}

.portfolio.dark .portfolio--inner__description .title {
  color: var(--color-yellow);
}

.portfolio.dark .tabs button:not(.active) {
  color: var(--color-white);
}

.portfolio.dark .tabs button.active {
  color: var(--color-yellow);
}

.portfolio.dark .tabs button.active::after {
  background-color: var(--color-yellow);
}

.portfolio.dark .package-card-container {
  border: none;
}

.portfolio--inner {
  width: 100%;
  height: 100%;
}

.portfolio--inner__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
  gap: 20px;
}

.portfolio--inner__description .subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.portfolio--inner__description .title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-black);
  text-align: center;
  max-width: 80%;
}

.portfolio--inner__description .title span {
  color: var(--color-primary);
}

.tabs {
  width: 100%;
  max-width: 100%;
  height: 80px;
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.tabs button {
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--color-dark-gray);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabs button.active {
  color: var(--color-primary);
  font-weight: 600;
}

.tabs button.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
}

.cards-wrapper {
  width: 100%;
  min-height: 45vh;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
}

.cards-slider {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 24px;
}

.cards-slider::-webkit-scrollbar {
  display: none;
}

.cards-slider .card {
  min-height: 350px;
  scroll-snap-align: start;
  flex: 0 0 350px;
  margin-right: 0;
  background: #fff;
  border: 1px solid var(--color-gray);
  border-radius: 12px;
  padding-bottom: 15px;
}

.cards-slider .card .card--image {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  border-radius: 10px 10px 0 0;
  gap: 20px;
}

.card .card--image img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.card .card--content {
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card .card--content .card--name {
  font-weight: 900;
  font-size: 1rem;
}

.card .card--content .card--description {
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-dark-gray);
}

.cards-wrapper button {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 45%;
  padding: 0;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: var(--color-primary);
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  cursor: pointer;
}

.cards-wrapper button.disabled {
  background-color: var(--color-gray);
  opacity: 0.5;
  cursor: not-allowed;
}

.cards-wrapper .card-button-left {
  left: 0;
}

.cards-wrapper .card-button-right {
  right: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1280px) {
  .portfolio--inner {
    width: 60%;
    margin: 0 auto;
  }

  .portfolio--inner__description .title {
    max-width: 50%;
  }

  .tabs {
    justify-content: start;
  }
}
</style>
