<template>
  <section class="our-services" :class="{ dark: isDark }">
    <div class="our-services--inner">
      <h2 class="title">Nuestros Servicios</h2>
      <p class="subtitle">
        Soluciones integrales que combinan tecnología, estrategia y diseño para
        impulsar tu negocio.
      </p>
      <div class="services-grid">
        <div
          class="service-card"
          v-for="service in services"
          :key="service.name"
        >
          <img :src="`/${service.icon}`" :alt="service.name" class="icon-3d" />
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <NuxtLink :to="'/test'" class="see-more">
            Leer más
            <span class="material-symbols-outlined chevron-right">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDarkMode } from "./composables/useDarkMode";
import { useIntersectionObserver } from "./composables/useIntersectionObserver";
import { useRouter } from "vue-router";

const router = useRouter();

const { isDark, toggleDark, setDark } = useDarkMode();

const services = [
  {
    icon: "icons/computer.png",
    name: "Desarrollo de software a medida",
    slug: "desarrollo-software",
    description:
      "Creamos aplicaciones web adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/mobile.webp",
    name: "Desarrollo de apps móviles",
    slug: "desarrollo-apps",
    description:
      "Creamos aplicaciones móviles adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/analisis.png",
    name: "Análisis de datos y visualización",
    slug: "analisis-datos",
    description:
      "Convierte tus datos en decisiones inteligentes con dashboards personalizados.",
  },
  {
    icon: "icons/basesdedatos.png",
    name: "Arquitectura y gestión de bases de datos",
    slug: "bases-datos",
    description:
      "Optimizamos la estructura de datos para asegurar rendimiento y escalabilidad.",
  },
  {
    icon: "icons/consultoria.png",
    name: "Consultoría en transformación digital",
    slug: "consultoria-transformacion",
    description:
      "Te guiamos paso a paso hacia una transformación tecnológica estratégica.",
  },
  {
    icon: "icons/diseño.png",
    name: "Diseño UX/UI centrado en el usuario",
    slug: "diseno-ux-ui",
    description:
      "Creamos experiencias digitales memorables que conectan con tu audiencia.",
  },
];

function navigateToService(serviceSlug: string) {
  router.push({ name: "service-detail", params: { slug: serviceSlug } });
}

useIntersectionObserver(".service-card", { threshold: 0.8 }, "2");
</script>

<style scoped>
.our-services {
  width: 100%;
  padding: 2rem 1rem;
  padding-block: 50px;
  position: relative;
}

.our-services.dark {
  background: linear-gradient(#121245 0%, #121245 50%);
}

.our-services .our-services--inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.our-services.dark .title {
  color: var(--color-white);
}

.our-services.dark .service-card {
  box-shadow: none;
}

/*
.our-services.dark .service-card .service-name,
.our-services.dark .service-card .service-desc,
.our-services.dark .service-card .see-more {
  color: var(--color-white);
}
 */

.title {
  font-size: clamp(1.6rem, 2.5vw, 2.5rem);
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--color-primary);
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.6rem);
  color: var(--color-dark-gray);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 80%;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.4rem;
  width: 100%;
}

.service-card {
  background: #fff;
  border-radius: 0.6rem;
  padding: 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: box-shadow 0.2s, transform 1s, opacity 1s ease;
  opacity: 1;
  transform: translateY(0);
}

.hidden {
  opacity: 0;
  transform: translateY(40px) scale(0.8);
}

.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.service-card:hover {
  transform: scale(1.01);
  box-shadow: 10px 10px 10px rgb(247, 247, 247);
}

.service-card img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.emoji {
  font-size: clamp(1.8rem, 2.5vw, 2rem);
  margin-bottom: 1rem;
}

.service-name {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: 0.5rem;
  text-align: center;
  height: 60px;
}

.service-desc {
  font-size: 1rem;
  color: var(--color-dark-gray);
  margin-bottom: 1.2rem;
  font-weight: 200;
  text-align: center;
  min-height: 60px;
}

.see-more {
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--color-primary);
  height: 60px;
  transition: transform 1s ease;
  text-decoration: none;
}

.see-more:hover {
  transform: translateX(10px);
}

@media (min-width: 1280px) {
  .our-services {
    padding: 0;
    width: 100%;
    margin: 0;
  }

  .our-services .our-services--inner {
    max-width: 60%;
    margin: 0 auto;
  }

  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .service-name {
    max-width: 90%;
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
  }

  .service-desc {
    font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  }

  .subtitle {
    font-size: clamp(0.7rem, 2vw, 1rem);
  }
}
</style>
