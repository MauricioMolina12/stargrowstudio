<template>
  <footer class="footer">
    <div class="footer--inner">
      <div class="footer-branding">
        <figure>
          <img src="../../public/logo-white.png" alt="logo-stargrowstudio" />
          <figcaption>Star Grow Studio</figcaption>
        </figure>
        <p>
          Diseñamos y desarrollamos soluciones digitales que impulsan tu
          crecimiento.Síguenos en nuestras redes sociales y mantente conectado.
        </p>
      </div>
      <div class="footer-services">
        <h3>Servicios</h3>
        <HeaderLink
          label="Desarrollo de software a su medida"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Análisis de datos y visualización"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Arquitectura y gestión de bases de datos"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Consultoría en transformación digital"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Diseño UX/UI centrado en el usuario"
          color="var(--color-light)"
        />
      </div>
      <div class="footer-links">
        <h3>Enlaces rápidos</h3>
        <HeaderLink
          label="Inicio"
          fontWeight="'900'"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Servicios"
          fontWeight="'900'"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Nosotros"
          fontWeight="'900'"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Progreso"
          fontWeight="'900'"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Portafolio"
          fontWeight="'900'"
          color="var(--color-light)"
        />
        <HeaderLink
          label="Contacto"
          fontWeight="'900'"
          color="var(--color-light)"
        />
      </div>
      <div class="footer-contact">
        <h3>Contacto</h3>
        <div class="email">
          <span class="material-symbols-outlined">email</span>
          <HeaderLink label="jstargrowstudio@gmai.com" />
        </div>
        <div class="cellphone">
          <span class="material-symbols-outlined">phone</span>
          <HeaderLink label="+57 3008236761" />
        </div>
        <div class="email">
          <span class="material-symbols-outlined">place</span>
          <HeaderLink label="Calle 27 #7B-05" />
        </div>
      </div>
      <div class="footer-copyright">
        <div class="footer--inner">
          <span> © 2025 StarGrowStudio. Todos los derechos reservados. </span>
          <div class="links">
            <HeaderLink label="Política de privacidad" />
            <HeaderLink label="Términos de servicio" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import HeaderLink from "../UI/headerLink.vue";
</script>
<style scoped>
footer {
  width: 100%;
  min-height: 60vh;
  max-height: fit-content;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.footer-copyright {
  width: 100%;
  background-color: var(--color-secondary);
  padding-block: 10px;
}

.footer-copyright .footer--inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.footer-copyright .footer--inner span {
  color: var(--color-white);
  text-align: center;
}

.footer-copyright .footer--inner .links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer .footer-branding,
.footer .footer-links,
.footer .footer-services,
.footer .footer-contact {
  width: 90%;
  margin: 0 auto;
  padding-block: 25px;
  border-bottom: 1px solid var(--color-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}

.footer-links > *,
.footer-services > * {
  margin-bottom: 12px;
}

.footer-links,
.footer-services,
.footer-contact h3 {
  color: var(--color-light);
  font-weight: 700;
}

.footer .footer-branding figure {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer .footer-branding figure img {
  max-width: 100%;
  height: 100%;
}

.footer .footer-branding figure figcaption {
  color: var(--color-white);
  font-weight: 600;
  white-space: nowrap;
  font-size: 1.4rem;
}

.footer-contact > * {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-white);
}

.footer .footer-branding p {
  color: var(--color-light);
  max-width: 80%;
  line-height: 28px;
}

@media (min-width: 1280px) {
  .footer .footer--inner {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }

  .footer--inner .footer-branding,
  .footer--inner .footer-links,
  .footer--inner .footer-services,
  .footer--inner .footer-contact {
    justify-content: start;
    border: none;
  }

  .footer-copyright {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .footer-copyright .footer--inner {
    flex-direction: row;
    width: 85%;
    justify-content: space-between;
  }
}
</style>
