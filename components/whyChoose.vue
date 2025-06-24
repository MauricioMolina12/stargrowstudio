<template>
  <section class="whyChoose" :class="{ dark: isDark }">
    <div class="whyChoose--inner">
      <div class="whyChoose--inner__description parallaxElement">
        <span class="subtitle"
          >En Star Grow queremos hacer todo fácil para ti.</span
        >
        <h1 class="title">¿Por qué elegirnos?</h1>
      </div>
      <div class="whyChoose--inner__grid">
        <div class="item">
          <header class="item--header">Soluciones 360°</header>
          <div class="item--body">
            <div class="item--body-icon">
              <span class="material-symbols-outlined">autorenew</span>
            </div>
            <aside class="item--body-information">
              <p>Integramos diseño, tecnología y asesoría legal en un servicio unificado para simplificar tu crecimiento.</p>
            </aside>
          </div>
        </div>
        <div class="item">
          <header class="item--header">Resultados medibles</header>
          <div class="item--body">
            <div class="item--body-icon">
              <span class="material-symbols-outlined">bar_chart</span>
            </div>
            <aside class="item--body-information">
              <p>Trabajamos con indicadores claros que demuestran el impacto de nuestros servicios en tu negocio.</p>
            </aside>
          </div>
        </div>
        <div class="item">
          <header class="item--header">Soporte continuo</header>
          <div class="item--body">
            <div class="item--body-icon">
              <span class="material-symbols-outlined">headset_mic</span>
            </div>
            <aside class="item--body-information">
              <p>Relación a largo plazo con mantenimiento, actualizaciones y mejoras post-implementación.</p>
            </aside>
          </div>
        </div>
        <div class="item">
          <header class="item--header">Expertos en tu sector</header>
          <div class="item--body">
            <div class="item--body-icon">
              <span class="material-symbols-outlined">workspace_premium</span>
            </div>
            <aside class="item--body-information">
              <p>Conocemos los desafíos de las PYMES y creamos soluciones personalizadas para tus necesidades reales.</p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useDarkMode } from "./composables/useDarkMode";

const { isDark } = useDarkMode();
</script>
<style>
.whyChoose {
  width: 100%;
}

.whyChoose.dark {
  background-color: #121245;
}

.whyChoose.dark .whyChoose--inner__description .subtitle,
.whyChoose.dark .whyChoose--inner__description .title span {
  color: var(--color-white);
}

.whyChoose.dark .whyChoose--inner__description .title {
  color: var(--color-yellow);
}

.whyChoose--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.whyChoose--inner__description {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
  gap: 20px;
  text-align: center;
}

.whyChoose--inner__description .subtitle {
  color: var(--color-primary);
  font-size: clamp(1rem, 1.5vw, 1.5rem);
}

.whyChoose--inner__description .title {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-black);
  max-width: 80%;
}

.whyChoose--inner__description .title span {
  color: var(--color-primary);
}

.whyChoose--inner__grid {
  width: 80%;
  height: 80%;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.whyChoose--inner__grid .item {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--color-gray);
}

.whyChoose--inner__grid .item .item--header {
  width: 100%;
  background-color: var(--color-primary);
  padding-block: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: inherit;
}

.whyChoose--inner__grid .item .item--body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  padding-block: 10px;

}

.whyChoose--inner__grid .item .item--body .item--body-icon {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whyChoose--inner__grid .item .item--body .item--body-icon span {
  font-size: 2.2rem;
  background-color: var(--color-yellow);
  color: white;
  padding: 10px;
  border-radius: 10px;
}

.whyChoose--inner__grid .item:first-of-type .item--body .item--body-icon span {
  background-color: rgb(126, 126, 210);
}

.whyChoose--inner__grid .item:nth-of-type(2) .item--body .item--body-icon span {
  background-color: rgb(127, 210, 126);
}

.whyChoose--inner__grid .item:nth-of-type(4) .item--body .item--body-icon span {
  background-color: rgb(210, 126, 126);
}

.whyChoose--inner__grid .item .item--body .item--body-information {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
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
  .whyChoose--inner {
    width: 60%;
    margin: 0 auto;
  }

  .whyChoose--inner__grid {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .whyChoose--inner__grid .item .item--body{
    padding-block: 40px;
  }

}
</style>
