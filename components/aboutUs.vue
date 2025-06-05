<template>
  <section class="about">
    <div class="about--inner">
      <div class="about__description">
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
      <div class="about__image">
        <img src="../public/team.png" alt="team" />
      </div>
    </div>
  </section>
</template>
<style scoped>
.about {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
}

.about--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}

.about::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(var(--color-primary) 0%, #e0e0ff 50%);
  opacity: 0.5;
  filter: blur(1000px);
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
  color: var(-color-dark-gray);
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
  .about {
    max-width: 90%;
    height: 80vh;
    margin: 0 auto;
  }

  .about--inner {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
  }

  .about__description {
    width: 60%;
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
    width: 40%;
    display: flex;
    justify-content: start;
  }

  .about__image img {
    max-width: 90%;
    height: 90%;
  }
}
</style>
<script lang="ts"></script>
