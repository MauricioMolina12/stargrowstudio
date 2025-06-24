<template>
  <section class="packages" :class="{ dark: isDark }">
    <div class="packages--inner">
      <div class="packages--inner__description parallaxElement">
        <span class="subtitle">Planes a tu Medida</span>
        <h1 class="title">
          <span>Diseñamos el éxito juntos: </span>Explora nuestras soluciones
          flexibles.
        </h1>
      </div>
      <div class="tabs">
        <button
          :class="{ active: tab.name === currentTab }"
          @click="filterPackages(tab.filterKey, tab.name)"
          v-for="tab of tabs"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="cards parallaxElement">
        <TransitionGroup
          name="fade-cards"
          tag="div"
          class="cards-transition-wrapper"
        >
          <div
            class="package-card-container"
            v-for="plan of filteredServices"
            :key="plan.name"
            :class="{ premium: plan.tier === 'Premium' }"
          >
            <div class="package-card-content">
              <div class="corner-ribbon">
                <span>{{ plan.tier }}</span>
              </div>

              <h2>{{ plan.name }}</h2>
              <div class="prices">
                <p class="price-old" v-if="plan.priceOld">
                  ${{ plan.priceOld }}
                </p>
                <p class="price-new">${{ plan.priceNew }} <span>(COP)</span></p>
              </div>
              <p class="description">
                {{ plan.description }}
              </p>

              <ul class="features-list">
                <li
                  class="has-feature"
                  v-for="feature of plan.features.included"
                >
                  {{ feature }}
                </li>
                <li
                  class="no-feature"
                  v-for="feature of plan.features.excluded"
                >
                  {{ feature }}
                </li>
              </ul>
              <button @click="emitPackage(plan)">
                Solicitar este servicio
              </button>
            </div>
          </div>
        </TransitionGroup>
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

const servicePlans = ref([
  // DESARROLLO WEB
  {
    category: "development",
    name: "Plan Web Express",
    tier: "Básico",
    priceOld: "1.800.000",
    priceNew: "1.600.000",
    description:
      "Pequeños negocios, emprendedores, freelancers que necesitan una presencia online rápida y profesional.",
    features: {
      included: [
        "Diseño basado en plantilla responsiva.",
        "Hasta 5 secciones/páginas estáticas.",
        "Carga inicial de contenido proporcionado por el cliente.",
        "Formulario de contacto básico.",
        "Configuración de dominio y alojamiento (asesoramiento).",
        "Optimización SEO básica y velocidad de carga inicial.",
        "Una ronda de revisiones y garantía de 30 días post-lanzamiento.",
      ],
      excluded: [
        "Diseño UI/UX a medida o identidad de marca.",
        "Creación de contenido (textos, imágenes, videos).",
        "Funcionalidades de e-commerce o gestión de usuarios.",
        "Mantenimiento y actualizaciones continuas.",
      ],
    },
  },
  {
    category: "development",
    name: "Plan Web Pro",
    tier: "Popular",
    priceOld: "3.200.000",
    priceNew: "2.700.000",
    description:
      "Empresas en crecimiento que buscan una web personalizada, optimizada y con funcionalidades avanzadas.",
    features: {
      included: [
        "Diseño UI/UX personalizado y adaptado a tu marca.",
        "Hasta 12 secciones/páginas dinámicas.",
        "Carga y optimización de contenido inicial.",
        "Formularios avanzados de contacto y cotización.",
        "Integración con redes sociales y Google Analytics.",
        "SEO avanzado y optimización de velocidad.",
        "2 rondas de revisiones y garantía de 60 días post-lanzamiento.",
        "Soporte técnico prioritario durante 2 meses.",
      ],
      excluded: [
        "E-commerce completo o gestión de usuarios.",
        "Creación de contenido multimedia profesional.",
        "Mantenimiento anual incluido.",
      ],
    },
  },
  {
    category: "development",
    name: "Plan Web Elite",
    tier: "Premium",
    priceOld: "6.000.000",
    priceNew: "4.800.000",
    description:
      "Grandes empresas o proyectos que requieren soluciones a medida, integración de sistemas y soporte continuo.",
    features: {
      included: [
        "Diseño UI/UX exclusivo y branding completo.",
        "Sitio web ilimitado en secciones y funcionalidades.",
        "Desarrollo de módulos personalizados (e-commerce, membresías, etc.).",
        "Integración con APIs y sistemas externos.",
        "Creación de contenido profesional (textos, imágenes, videos).",
        "SEO profesional y campañas de marketing digital iniciales.",
        "Soporte y mantenimiento durante 1 año.",
        "Capacitación personalizada para tu equipo.",
        "Actualizaciones y mejoras continuas.",
        "Consultoría estratégica mensual.",
        "Dominio y hosting premium incluidos el primer año.",
      ],
      excluded: [],
    },
  },

  // DISEÑO
  {
    category: "design",
    name: "Branding Express",
    tier: "Básico",
    priceNew: "900.000",
    description:
      "Identidad visual básica para emprendimientos y marcas personales.",
    features: {
      included: [
        "Logo básico (una versión).",
        "Paleta de colores y tipografía recomendada.",
        "Entrega en formato digital listo para uso.",
      ],
      excluded: [
        "Manual de marca completo.",
        "Diseño de piezas para redes sociales.",
        "Identidad visual avanzada o storytelling visual.",
      ],
    },
  },
  {
    category: "design",
    name: "Branding Pro",
    tier: "Popular",
    priceNew: "1.800.000",
    description:
      "Branding profesional con entregables completos para negocios en crecimiento.",
    features: {
      included: [
        "Diseño de logo profesional con variantes.",
        "Manual de marca completo.",
        "Tipografías, iconografía, patrones gráficos.",
        "Diseño de tarjetas de presentación.",
        "Diseño de piezas para redes sociales.",
      ],
      excluded: [
        "Plantillas corporativas (pitch, presentaciones, etc).",
        "Animaciones de logo o brand book interactivo.",
      ],
    },
  },
  {
    category: "design",
    name: "Branding Elite",
    tier: "Premium",
    priceNew: "3.200.000",
    description: "Diseño de marca completo + material de marketing visual.",
    features: {
      included: [
        "Todo lo del plan Pro.",
        "Kit de marca digital e impreso.",
        "Presentación corporativa editable.",
        "Plantillas para pitch y redes sociales.",
        "Storytelling visual y consultoría creativa.",
      ],
      excluded: [],
    },
  },

  // CONSULTORÍA
  {
    category: "consulting",
    name: "Consultoría Inicial",
    tier: "Básico",
    priceNew: "1.200.000",
    description: "Diagnóstico digital y recomendaciones puntuales.",
    features: {
      included: [
        "Análisis de presencia digital.",
        "Benchmark con competidores.",
        "Informe de recomendaciones.",
      ],
      excluded: ["Plan de acción detallado.", "Seguimiento posterior."],
    },
  },
  {
    category: "consulting",
    name: "Consultoría Estratégica",
    tier: "Popular",
    priceNew: "2.400.000",
    description: "Auditoría digital + roadmap estratégico.",
    features: {
      included: [
        "Todo lo del plan básico.",
        "Workshops de descubrimiento.",
        "Plan de acción a 3-6 meses.",
        "Reunión de seguimiento mensual.",
      ],
      excluded: [
        "Implementación de herramientas.",
        "Consultoría legal o financiera.",
      ],
    },
  },
  {
    category: "consulting",
    name: "Consultoría Integral",
    tier: "Premium",
    priceNew: "4.800.000",
    description: "Acompañamiento 360º en procesos tecnológicos y digitales.",
    features: {
      included: [
        "Todo lo del plan estratégico.",
        "Acompañamiento continuo.",
        "Revisión y análisis de métricas.",
        "Consultoría especializada mensual.",
        "Soporte en implementación técnica.",
      ],
      excluded: [],
    },
  },

  // MARKETING
  {
    category: "marketing",
    name: "Marketing Starter",
    tier: "Básico",
    priceNew: "1.000.000",
    description: "Lanzamiento digital con campañas base.",
    features: {
      included: [
        "Configuración de redes y perfiles.",
        "1 campaña publicitaria (meta o Google).",
        "Diseño de 4 posts iniciales.",
      ],
      excluded: ["Manejo mensual de redes.", "Análisis y reportes de campaña."],
    },
  },
  {
    category: "marketing",
    name: "Marketing Pro",
    tier: "Popular",
    priceNew: "2.200.000",
    description: "Gestión mensual de campañas y analítica.",
    features: {
      included: [
        "Todo lo del Starter.",
        "Gestión de redes sociales (hasta 2).",
        "Campañas mensuales (meta/Google).",
        "Informe mensual de resultados.",
        "Optimización de campañas y segmentación.",
      ],
      excluded: [
        "Creación de contenido audiovisual profesional.",
        "Email marketing o CRM.",
      ],
    },
  },
  {
    category: "marketing",
    name: "Marketing 360",
    tier: "Premium",
    priceNew: "4.000.000",
    description: "Estrategia, contenido, pauta y reporting integral.",
    features: {
      included: [
        "Todo lo del Pro.",
        "Producción de contenido profesional (videos, fotos).",
        "Email marketing, newsletters y automatización.",
        "Consultoría y análisis mensual.",
        "Optimización multicanal.",
      ],
      excluded: [],
    },
  },
]);

const tabs = ref([
  {
    name: "Desarrollo",
    filterKey: "development",
  },
  {
    name: "Diseño",
    filterKey: "design",
  },
  {
    name: "Consultoría",
    filterKey: "consulting",
  },
  {
    name: "Marketing",
    filterKey: "marketing",
  },
]);

const currentTab = ref("");

interface ServicePlan {
  category: string;
  name: string;
  tier: string;
  priceOld?: string;
  priceNew: string;
  description: string;
  features: {
    included: string[];
    excluded: string[];
  };
}

const filteredServices = ref<ServicePlan[]>([]);
function filterPackages(category: string, tab: string) {
  filteredServices.value = servicePlans.value.filter(
    (value) => value.category === category
  );
  currentTab.value = tab;
}

function initContent() {
  currentTab.value = "Desarrollo";
  filteredServices.value = servicePlans.value.filter(
    (value) => value.category === "development"
  );
}

onMounted(() => {
  initContent();
});
</script>
<style>
.packages {
  width: 100%;
  max-height: max-content;
  padding-block: 80px;
}

.packages.dark {
  background-color: #121245;
}

.packages.dark .packages--inner__description .subtitle,
.packages.dark .packages--inner__description .title span {
  color: var(--color-white);
}

.packages.dark .packages--inner__description .title {
  color: var(--color-yellow);
}

.packages.dark .tabs button:not(.active) {
  color: var(--color-white);
}

.packages.dark .tabs button.active {
  color: var(--color-yellow);
}

.packages.dark .tabs button.active::after{
  background-color: var(--color-yellow);
}

.packages.dark .package-card-container{
  border: none;
}


.packages--inner {
  width: 100%;
  height: 100%;
}

.packages--inner__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
  gap: 20px;
}

.packages--inner__description .subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.packages--inner__description .title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-black);
  text-align: center;
  max-width: 80%;
}

.packages--inner__description .title span {
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

.cards {
  width: 100%;
}

.cards-transition-wrapper {
  width: 100%;
  min-height: 60vh;
  display: flex;
  overflow-x: auto;
  /* grid-template-columns: 1fr;
  grid-template-rows: auto; */
  gap: 10px;
  padding: 10px;
}

.fade-cards-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-cards-enter-active {
  transition: all 0.3s ease-out;
}

.fade-cards-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-cards-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-cards-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
  left: 0;
  right: 0;
}

.fade-cards-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-cards-move {
  transition: transform 0.5s ease;
}

.package-card-container {
  position: relative;
  max-width: 100%;
  min-width: 400px;
  flex-grow: 1;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.package-card-container.premium {
  background-color: var(--color-primary);
}

.package-card-container:not(.premium) h2 {
  color: var(--color-secondary);
}

.package-card-container:not(.premium) .prices .price-old {
  color: var(--color-dark-gray);
}

.package-card-container:not(.premium) .prices .price-new {
  color: var(--color-primary);
}

.package-card-container:not(.premium) .prices .price-new span {
  color: inherit;
  font-weight: 700;
}

.package-card-container:not(.premium) .description {
  color: var(--color-dark);
  font-weight: 400;
}

.package-card-container:not(.premium) .features-list li {
  color: var(--color-dark-gray);
}

.package-card-content {
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.corner-ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.corner-ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 8px 0;
  background-color: var(--color-yellow-light);
  color: var(--color-black);
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  transform: rotate(45deg);
  top: 35px;
  right: -60px;
  transform-origin: 50% 50%;
}

.corner-ribbon span::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #c9b168;
}

.package-card-content h2 {
  font-size: 1.5rem;
  max-width: 90%;
  text-align: center;
  font-weight: 600;
  margin-block: 15px;
  color: white;
}

.prices {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 30px;
}

.price-old {
  font-size: 1em;
  color: var(--color-white);
  text-decoration: line-through;
  margin-right: 10px;
  display: inline-block;
}

.price-new {
  white-space: nowrap;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-yellow-light);
}

.price-new span {
  font-size: 0.8rem;
  font-weight: normal;
  color: var(--color-white);
}

.description {
  font-size: 0.9em;
  color: var(--color-white);
  margin-bottom: 25px;
  text-align: justify;
  line-height: 1.5;
}

.features-list {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-bottom: 50px;
}

.features-list li {
  margin-bottom: 12px;
  color: #ccc;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.features-list li::before {
  content: "✔";
  color: #90ee90;
  margin-right: 10px;
  font-weight: bold;
  font-size: 1.2em;
}

.features-list .no-feature::before {
  content: "✕";
  color: #f08080;
}

.package-card-container button {
  background-color: #ffe08a;
  color: #333;
  border: none;
  padding: 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: .9rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.package-card-container button:hover {
  background-color: #ffd76b;
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
  .packages--inner {
    width: 60%;
    margin: 0 auto;
  }

  .cards-transition-wrapper {
    display: grid;
    overflow: hidden;
    grid-template-columns: repeat(3, 1fr);
  }

  .package-card-container{
    min-width: 100%;
  }

  .tabs{
    justify-content: start;
  }
}
</style>
