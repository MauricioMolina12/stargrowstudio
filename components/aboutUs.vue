<template>
  <section class="about" :class="{ dark: isDark }">
    <div class="about--inner">
      <div class="about__description parallaxElement">
        <span class="about__description-subtitle">Quienes somos</span>
        <h1 class="about__description-title">
          En <span>Star Grow Studio</span> somos un equipo multidisciplinario
          apasionado por la tecnología, el diseño y la innovación.
        </h1>
        <p class="about__description-text">
          Conectamos ideas con tecnología para transformar negocios y generar
          impacto real.
        </p>
        <button class="about__description-call-action">
          Agenda tu cita
          <span class="material-symbols-outlined chevron-right"
            >arrow_forward</span
          >
        </button>
      </div>
      <div class="about__image parallaxElement">
        <img src="../public/team.png" alt="team" />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useIntersectionObserver } from "./composables/useIntersectionObserver";
import { useDarkMode } from "./composables/useDarkMode";

onMounted(() => {
  useIntersectionObserver(".parallaxElement", { threshold: 0.8 }, "2");
});

const { isDark } = useDarkMode();
</script>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
}

.about.dark {
  background-color: #121245;
}

.about.dark .about__description .about__description-title {
  color: var(--color-white);
}
.about.dark .about__description .about__description-title span {
  color: var(--color-yellow);
}

.about.dark .about__description .about__description-subtitle{
  color: var(--color-white);
}

.about.dark .about__description .about__description-text{
  color: var(--color-white);
}

.about--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}

.about__image,
.about__description {
  width: 100%;
  height: 50%;
}

.about__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
}

.about__description .about__description-subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.about__description .about__description-title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  text-align: center;
  max-width: 90%;
  color: var(--color-black);
}

.about__description .about__description-title span {
  color: var(--color-primary);
}

.about__description .about__description-text {
  color: var(--color-dark-gray);
  font-weight: 300;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  text-align: center;
  max-width: 90%;
}

.about__description .about__description-call-action {
  padding: 15px;
  outline: none;
  border: none;
  background-color: var(--color-yellow);
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  width: max-content;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-white);
  cursor: pointer;
}

.about__image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.about__image img {
  max-width: 80%;
  height: 80%;
  object-fit: contain;
}

@media (min-width: 1280px) {
  .about--inner {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
  }

  .about__description {
    width: 50%;
    align-items: start;
  }

  .about__description .about__description-title {
    font-size: clamp(2.4rem, 2vw, 3rem);
    max-width: 75%;
  }

  .about__description .about__description-call-action {
    width: max-content;
  }

  .about__description .about__description-title,
  .about__description-subtitle,
  .about__description-text {
    text-align: start !important;
  }

  .about__image {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .about__image img {
    max-width: 90%;
    height: 90%;
  }
}
</style>
