<template>
  <section class="ourWay" :class="{'dark' : isDark}">
    <div class="ourWay--inner">
      <div class="ourWay__description parallaxElement">
        <span class="ourWay__description-subtitle">Como conectamos</span>
        <h1 class="ourWay__description-title">
          Nuestro <span>camino</span> hacia proyectos que brillan ✨
        </h1>
      </div>
      <div class="ourWay__grid parallaxElement">
        <div class="item" v-for="(step, index) of steps">
          <span class="item--index">{{ index + 1 }}</span>
          <img class="item--icon" :src="step.icon" :alt="step.title" />
          <h2 class="item--title">{{ step.title }}</h2>
          <p class="item--description">{{ step.description }}</p>
        </div>
      </div>
      <div class="ourWay__quote parallaxElement">
        <div class="ourWay__quote--description">
          <h2>¿Estás listo para llevar tu proyecto al siguiente nivel?</h2>
          <p>
            Contáctanos hoy mismo y comencemos a trabajar juntos en tu próximo
            proyecto.
          </p>
        </div>
        <div class="ourWay__quote--call-action">
          <button @click="show()">Solicitar una cita</button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.ourWay {
  width: 100%;
  max-height: max-content;
  position: relative;
  display: flex;
  align-items: center;
  padding-block: 10px;
}

.ourWay.dark{
  background-color: #121245;
}

.ourWay.dark .ourWay__description-subtitle{
  color: var(--color-white);
}

.ourWay.dark .ourWay__description-title{
  color: var(--color-white);
}

.ourWay.dark .ourWay__description-title span{
  color: var(--color-yellow);
}

.ourWay--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  z-index: 10;
}

.ourWay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  filter: blur(1000px);
}

.ourWay__description {
  width: 100%;
  height: 50%;
}

.ourWay__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  height: 40%;
}

.ourWay__description .ourWay__description-subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.ourWay__description .ourWay__description-title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-black);
  text-align: center;
}

.ourWay__description .ourWay__description-title span {
  color: var(--color-primary);
}

.ourWay__description .ourWay__description-text {
  color: var(-color-dark-gray);
  font-weight: 300;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.ourWay__grid {
  width: 90%;
  height: 60%;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.ourWay__grid .item {
  width: 100%;
  min-height: 240px;
  height: 100%;
  border-radius: 0.6rem;
  padding: 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
  background-color: var(--color-white);
}

.ourWay__grid .item .item--index {
  position: absolute;
  left: -10px;
  top: -10px;
  width: 24px;
  height: 24px;
  padding: 10px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ourWay__grid .item .item--title {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 600;
  color: var(--color-dark);
}

.ourWay__grid .item .item--icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.ourWay__grid .item .item--description {
  font-weight: 300;
  color: var(--color-dark);
}

.ourWay__quote {
  width: 90%;
  min-height: 200px;
  margin: 0 auto;
  background-color: var(--color-primary);
  padding: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.ourWay__quote .ourWay__quote--description {
  width: 100%;
  height: 70%;
  line-height: 25px;
}

.ourWay__quote .ourWay__quote--description h2 {
  color: var(--color-white);
  font-weight: 700;
  font-size: clamp(1.3rem, 2vw, 1.4rem);
  line-height: 35px;
}

.ourWay__quote .ourWay__quote--description p {
  color: var(--color-light);
  font-weight: 200;
  font-size: clamp(0.85rem, 2vw, 0.9rem);
}

.ourWay__quote .ourWay__quote--call-action button {
  padding: 15px;
  outline: none;
  border: none;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  width: max-content;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
}

@media (min-width: 1280px) {
  .ourWay__grid {
    width: 60%;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .ourWay__quote {
    width: 60%;
    min-height: 140px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .ourWay__quote--description {
    width: 70%;
  }

  .ourWay__quote--call-action {
    width: 30%;
  }
}
</style>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "./composables/useIntersectionObserver";
import { useDarkMode } from "./composables/useDarkMode";
import { useComponentMeeting } from "./composables/useComponentMeeting";

interface Step {
  icon: string;
  title: string;
  description: string;
}

const steps = ref<Step[]>([]);

const { show } = useComponentMeeting();

useIntersectionObserver(".parallaxElement", { threshold: [0, 0.2, 0.8] }, "2"); 
const { isDark } = useDarkMode();

onMounted(() => {
  steps.value = [
    {
      icon: "icons/search.png",
      title: "Descubrimiento",
      description:
        "Analizamos tus necesidades, objetivos y público. Esta etapa es clave para entender tu marca y definir el rumbo correcto.",
    },
    {
      icon: "icons/calendar.png",
      title: "Estrategia y Planificación",
      description:
        "Definimos objetivos claros y un plan estratégico para guiar tu proyecto con éxito.",
    },
    {
      icon: "icons/design.png",
      title: "Diseño Creativo",
      description:
        "Nuestro equipo diseña piezas visuales impactantes: desde tu logotipo hasta contenido para redes.",
    },
    {
      icon: "icons/computer.png",
      title: "Desarrollo & Producción",
      description:
        "Construimos tu sitio web, e-commerce o app, y creamos contenido audiovisual de alta calidad.",
    },
    {
      icon: "icons/cohete.png",
      title: "Lanzamiento y Activación",
      description:
        "Ponemos en marcha tu proyecto en redes, campañas publicitarias, mailing, SEO y más.",
    },
    {
      icon: "icons/analisis.png",
      title: "Medición y Optimización",
      description:
        "Monitorizamos resultados y ajustamos estrategias para lograr impacto y crecimiento constante.",
    },
  ];
});
</script>
