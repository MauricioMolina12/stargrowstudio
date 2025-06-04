<template>
  <section class="banner" :class="{ 'dark': isDark, 'light': !isDark }">
    <transition name="fade" mode="out-in">
      <div :key="currentIndex" class="banner__content" ref="bannerContent">
        <div class="banner__description" ref="parallaxText">
          <div class="banner__description--hero">
            <span class="banner__description--hero-service">
              <img
                ref="parallaxImage"
                :src="banners[currentIndex].icon"
                alt="icono 3D"
                class="banner__icon-3d"
              />
              {{ banners[currentIndex].service }}
            </span>
            <h1 class="banner__description--hero-title">
              {{ banners[currentIndex].title.main }}
              <span>
                {{ banners[currentIndex].title.second }}
              </span>
            </h1>
            <p class="banner__description--hero-subtitle">
              {{ banners[currentIndex].subtitle }}
            </p>
            <Button name="Cotiza ahora">Cotiza ahora</Button>
          </div>
        </div>
        <div class="banner__image">
          <img
            :src="banners[currentIndex].image"
            :alt="banners[currentIndex].alt"
            class="banner-image"
          />
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Button from "../components/UI/button.vue";
import { useDarkMode } from "./composables/useDarkMode";

export default {
  name: "DynamicBanner",
  data() {
    return {
      banners: [
        {
          image: "developer.webp",
          alt: "Desarrollador",
          service: "Desarrollo de software a medida",
          icon: "icons/computer.png",
          title: {
            main: "Transforma tu idea en software real.",
            second: "Creamos soluciones que hacen la diferencia.",
          },
          subtitle:
            "Desarrollamos tecnología con propósito, visión y estrategia.",
        },
        {
          image: "analisis.webp",
          alt: "Analista de datos",
          service: "Análisis de datos y visualización",
          icon: "icons/analisis.png",
          title: {
            main: "Convierte tus datos en decisiones inteligentes.",
            second: "Te ayudamos a entender lo que importa.",
          },
          subtitle:
            "Diseñamos dashboards y reportes personalizados para impulsar tu crecimiento.",
        },
        {
          image: "bases-de-datos.webp",
          alt: "Bases de datos",
          service: "Arquitectura y gestión de bases de datos",
          icon: "icons/basesdedatos.png",
          title: {
            main: "Tu información siempre segura y accesible.",
            second: "Optimizamos el corazón de tu sistema.",
          },
          subtitle:
            "Diseñamos estructuras de datos eficientes, escalables y preparadas para el futuro.",
        },
        {
          image: "consultoria.webp",
          alt: "Consultoría",
          service: "Consultoría en transformación digital",
          icon: "icons/consultoria.png",
          title: {
            main: "¿No sabes por dónde empezar?",
            second: "Te guiamos paso a paso.",
          },
          subtitle:
            "Analizamos, proponemos y ejecutamos estrategias tecnológicas adaptadas a tus objetivos.",
        },
        {
          image: "diseño.webp",
          alt: "Diseño",
          service: "Diseño UX/UI centrado en el usuario",
          icon: "icons/diseño.png",

          title: {
            main: "Haz que tu producto enamore a primera vista.",
            second: "Diseñamos experiencias memorables.",
          },
          subtitle:
            "Combinamos estética y funcionalidad para conectar con tu audiencia desde el primer clic.",
        },
      ],
      currentIndex: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startRotation();
    window.addEventListener("scroll", this.handleParallax);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    window.removeEventListener("scroll", this.handleParallax);
  },
  methods: {
    startRotation() {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
      }, 10000);
    },
    handleParallax() {
      const scrollY = window.scrollY;

      const text = this.$refs.parallaxText;
      const image = this.$refs.parallaxImage;
      const content = this.$refs.bannerContent;

      if (text) {
        text.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      if (image) {
        image.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.02}px)`;
      }
    },
  },
  setup() {
    const isMenuOpen = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const { isDark, toggleDark } = useDarkMode();

    return {
      isMenuOpen,
      toggleMenu,
      isDark,
      toggleDark,
    };
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 92vh;
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.banner.dark::before {
  background: none;
  background-color: var(--color-primary);
  opacity: 1;
  filter: blur(0);
}

.banner.light::before {
  background-color: none;
  background: linear-gradient(var(--color-primary) 0%, #e0e0ff 50%);
  opacity: 0.5;
  filter: blur(1000px);
}

.banner__description,
.banner__image,
.banner__content {
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.banner__content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 10;
  position: relative;
}

.banner__description,
.banner__image {
  width: 100%;
}

.banner__description {
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.banner__image {
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner__image img {
  max-width: 60%;
  height: 60%;
  object-fit: cover;
}

.banner__description .banner__description--hero {
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  text-align: center;
}
.banner__description .banner__description--hero-service {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.6rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.banner__description .banner__description--hero-service img {
  width: 20px;
  height: 20px;
}

.banner__description .banner__description--hero-title {
  font-weight: 800;
  padding-inline: 10px;
  max-width: 90%;
  font-size: clamp(1.6rem, 2.5vw, 2.5rem);
  color: var(--color-dark-to-yellow);
}
.banner__description .banner__description--hero-title span {
  color: var(--color-primary-to-white);
}

.banner__description .banner__description--hero-subtitle {
  max-width: 90%;
  color: var(--color-dark-gray);
  font-size: clamp(1rem, 2vw, 1.6rem);
}

.banner__description button {
  padding: 18px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: #5656b5;
  color: #fff;
  font-family: "Montserrat";
}

.fade-enter-active,
.fade-leave-active {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(15%);
}

@media (min-width: 768px) {
  .banner__description .banner__description--hero-service {
    font-size: clamp(1.5rem, 2vw, 2rem);
  }

  .banner__description .banner__description--hero-title {
    font-weight: 800;
    max-width: 80%;
    padding-inline: 10px;
    font-size: clamp(3rem, 2.5vw, 3.5rem);
  }

  .banner__description .banner__description--hero-subtitle {
    font-size: clamp(1.5rem, 2vw, 2rem);
    max-width: 80%;
  }

  .banner__image img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

@media (min-width: 1280px) {
  .banner {
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  }

  .banner__content {
    flex-direction: row;
  }

  .banner__description {
    height: 100%;
    width: 50%;
    justify-content: stretch;
    padding-left: 12px;
  }

  .banner__description .banner__description--hero {
    height: 100%;
    align-items: start;
    padding-left: 6%;
  }

  .banner__image {
    height: 100%;
    width: 50%;
  }

  .banner__image img {
    width: 80%;
    height: 80%;
  }

  .banner__description .banner__description--hero-service {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }

  .banner__description .banner__description--hero-title {
    padding-inline: 0;
    font-size: clamp(2.5rem, 2.5vw, 3rem);
    text-align: start;
  }
  .banner__description .banner__description--hero-subtitle {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
    text-align: start;
  }
}
</style>
