<template>
  <nav class="nav">
    <div class="nav__inner">
      <figure class="nav__inner-figure">
        <img src="public/logo.png" alt="logo stargrow" />
        <figcaption>STAR GROW</figcaption>
      </figure>
      <div class="nav__inner-links">
        <HeaderLink label="Inicio" />
        <HeaderLink label="Servicios" />
        <HeaderLink label="Nosotros" />
        <HeaderLink label="Progreso" />
        <HeaderLink label="Portafolio" />
        <HeaderLink label="Contacto" />
      </div>
      <div class="nav__inner-quote">
        <Button name="Cotiza ahora">Cotiza ahora</Button>
      </div>
    </div>
  </nav>
</template>
<script>
import Button from "./button.vue";
import HeaderLink from "./headerLink.vue";
</script>
<style scoped>
.nav {
  width: 100%;
  height: 8vh;
  min-height: 5vh;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav .nav__inner {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 15px;
}

.nav .nav__inner figure {
  min-width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.nav .nav__inner figure img {
  max-width: 70%;
  height: 70%;
}

.nav .nav__inner figure figcaption {
  font-weight: 700;
  color: var(--color-primary);
}

.nav .nav__inner .nav__inner-links {
  min-width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav .nav__inner .nav__inner-quote {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
