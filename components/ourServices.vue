<template>
  <section class="our-services">
    <h2 class="title">Nuestros Servicios</h2>
    <p class="subtitle">
      Soluciones integrales que combinan tecnología, estrategia y diseño para
      impulsar tu negocio.
    </p>
    <div class="services-grid">
      <div class="service-card" v-for="service in services" :key="service.name">
        <img :src="`/${service.icon}`" :alt="service.name" class="icon-3d" />
        <h3 class="service-name">{{ service.name }}</h3>
        <p class="service-desc">{{ service.description }}</p>
        <button class="see-more">
          Leer más
          <span class="material-symbols-outlined chevron-right"
            >arrow_forward</span
          >
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

const services = [
  {
    icon: "icons/computer.png",
    name: "Desarrollo de software a medida",
    description:
      "Creamos aplicaciones web y móviles adaptadas a tus necesidades y objetivos.",
  },
  {
    icon: "icons/analisis.png",
    name: "Análisis de datos y visualización",
    description:
      "Convierte tus datos en decisiones inteligentes con dashboards personalizados.",
  },
  {
    icon: "icons/basesdedatos.png",
    name: "Arquitectura y gestión de bases de datos",
    description:
      "Optimizamos la estructura de datos para asegurar rendimiento y escalabilidad.",
  },
  {
    icon: "icons/consultoria.png",
    name: "Consultoría en transformación digital",
    description:
      "Te guiamos paso a paso hacia una transformación tecnológica estratégica.",
  },
  {
    icon: "icons/diseño.png",
    name: "Diseño UX/UI centrado en el usuario",
    description:
      "Creamos experiencias digitales memorables que conectan con tu audiencia.",
  },
];

onMounted(() => {
  const cards = document.querySelectorAll(".service-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        }else{
          entry.target.classList.remove("visible");
          entry.target.classList.add("hidden");

        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  cards.forEach((card) => {
    card.classList.add("hidden");
    observer.observe(card);
  });
});
</script>

<style scoped>
.our-services {
  min-width: 60%;
  margin: 0 auto;
  padding: 2rem 1rem;
  padding-block: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

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
  gap: 1rem;
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
  transition: box-shadow 0.2s, transform 1s,opacity 1s ease;
  cursor: pointer;
  opacity: 1;
  transform: translateY(0);
}


.hidden {
  opacity: 0;
  transform: translateY(40px);
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  transform: scale(1.01);
  box-shadow: 10px 10px 10px rgb(247, 247, 247);
}

.service-card img {
  width: 25px;
  height: 25px;
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
}

.service-desc {
  font-size: 1rem;
  color: var(--color-dark-gray);
  margin-bottom: 1.2rem;
  font-weight: 200;
  text-align: center;
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
}

@media (min-width: 1280px) {
  .our-services {
    min-width: 50%;
  }

  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
