<template>
  <section class="banner" :class="{ dark: isDark, light: !isDark }">
    <div class="banner--inner">
      <transition name="fade" mode="out-in">
        <div :key="currentIndex" class="banner__content" ref="bannerContent">
          <div class="banner__description" ref="parallaxText">
            <div class="banner__description--hero">
              <span class="banner__description--hero-service" v-if="currentBanner.service">
                <img
                  ref="parallaxImage"
                  :src="currentBanner.icon"
                  alt="icono 3D"
                  class="banner__icon-3d"
                />
                {{ currentBanner.service }}
              </span>
              <h1 class="banner__description--hero-title">
                {{ currentBanner.title.main }}
                <span>
                  {{ currentBanner.title.second }}
                </span>
              </h1>
              <p class="banner__description--hero-subtitle">
                {{ currentBanner.subtitle }}
              </p>
              <Button name="call-action">{{ currentBanner.callAction }}</Button>
            </div>
          </div>
          <div class="banner__image">
            <img
              :src="currentBanner.image"
              :alt="currentBanner.alt"
              class="banner-image"
            />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Button from "../components/UI/button.vue";
import { useDarkMode } from "./composables/useDarkMode";

export default {
  name: "DynamicBanner",
  props: {
    bannersProp: {
      type: Array,
      default: () => [],
    },
    isDynamic: {
      type: Boolean,
      default: true,
    },
    banner: {
      type: Object,
      default: () => ({
        icon: "",
        service: "",
        title: { main: "", second: "" },
        subtitle: "",
        image: "",
        alt: "",
        callAction: ""
      }),
    },
  },
  data() {
    return {
      currentIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    banners() {
      return this.bannersProp ?? [];
    },
    currentBanner() {
      return this.banners.length > 0
        ? this.banners[this.currentIndex]
        : this.banner;
    },
  },
  mounted() {
    if (this.isDynamic && this.banners.length > 1) {
      this.startRotation();
    }
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
      }, 30000);
    },
    handleParallax() {
      const scrollY = window.scrollY;

      this.$refs.parallaxText?.style.setProperty(
        "transform",
        `translateY(${scrollY * 0.1}px)`
      );
      this.$refs.parallaxImage?.style.setProperty(
        "transform",
        `translateY(${scrollY * 0.05}px)`
      );
      this.$refs.bannerContent?.style.setProperty(
        "transform",
        `translateY(${scrollY * 0.02}px)`
      );
    },
  },
  setup() {
    const { isDark } = useDarkMode();
    return { isDark };
  },
};
</script>

<style>
.banner {
  width: 100%;
  height: 92vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
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

.banner .banner--inner {
  width: 100%;
  height: 100%;
}

/* THEME */

.banner::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--color-primary) 0%, #ffffff 30%);
  filter: blur(1000px);
}

.banner.dark::after {
  background: linear-gradient(#121245 0%, #121245 50%);
  opacity: 1;
  filter: blur(0);
}

.banner.dark .banner__description--hero-title {
  color: var(--color-yellow);
}

.banner.dark .banner__description--hero-title span,
.banner.dark .banner__description--hero-service {
  color: var(--color-white);
}

.banner.dark .banner__description--hero-subtitle {
  color: var(--color-white);
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
  border-radius: 10px;
}

.banner__image img {
  max-width: 70%;
  height: 70%;
  object-fit: contain;
  border-radius: 10px;
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
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(15%);
}

@media (max-width: 380px) {

  .banner{
    height: 100vh;
    gap: 0;
  }

  .banner__description .banner__description--hero-title {
    font-size: clamp(1.2rem, 2vw, 2rem);
  }
  .banner__description .banner__description--hero-subtitle,
  .banner__description .banner__description--hero-service {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }

  .banner__image img {
    height: 40%;
    width: 40%;
  }
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .banner .banner--inner {
    height: 100%;
    width: 90%;
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
    max-width: 100%;
  }
  .banner__description .banner__description--hero-subtitle {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
    text-align: start;
  }
}
</style>
