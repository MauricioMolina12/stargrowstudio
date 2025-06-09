<template>
  <nav class="nav">
    <div class="nav__inner">
      <figure class="nav__inner-figure">
        <img src="public/logo.png" alt="logo stargrow" />
        <figcaption>STAR GROW STUDIO</figcaption>
      </figure>
      <div class="nav__inner-links" :class="{ 'is-open': isMenuOpen }">
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">home</span>
          <HeaderLink label="Inicio" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">handshake</span>
          <HeaderLink label="Servicios" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">groups</span>
          <HeaderLink label="Nosotros" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">trending_up</span>
          <HeaderLink label="Progreso" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">collections</span>
          <HeaderLink label="Portafolio" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <div class="nav__inner-link">
          <span class="material-symbols-outlined">mail</span>
          <HeaderLink label="Contacto" color="var(--color-dark)" padding="22px"/>
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <Button name="Cotiza ahora">Cotiza ahora</Button>

        <div class="dark-mode-switch">
          <label class="switch-theme-text">Modo {{ isDarkMode ? 'oscuro' : 'claro' }}</label>
          <label>
            <input type="checkbox" v-model="isDarkMode" />
          </label>
        </div>
      </div>

      <button
        class="burger"
        aria-label="Abrir menú"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>
    </div>
  </nav>
</template>
<script>
import Button from "../UI/button.vue";
import HeaderLink from "../UI/headerLink.vue";
import { useDarkMode } from "../composables/useDarkMode";
import { ref } from "vue";
const isMenuOpen = ref(false);

export default {
  components: {
    Button,
    HeaderLink,
  },
  setup() {
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const { isDark, toggleDark, setDark } = useDarkMode();

    return {
      isMenuOpen,
      toggleMenu,
      isDarkMode: isDark,
      toggleDarkMode: toggleDark,
    };
  },

  methods: {
  }
};
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
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav .nav__inner {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 15px;
}

.nav .nav__inner figure {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.nav .nav__inner figure img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav .nav__inner figure figcaption {
  font-weight: 700;
  font-size: 100%;
  white-space: nowrap;
  color: var(--color-primary);
}

.nav .nav__inner .nav__inner-links {
  min-width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all 0.5s ease;
}

.nav .nav__inner .nav__inner-links .nav__inner-link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav
  .nav__inner
  .nav__inner-links
  .nav__inner-link
  > [class*="material-symbols"] {
  display: none;
}

.nav .nav__inner .nav__inner-links button {
  margin-left: auto;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 6px;
}

.burger__line {
  display: block;
  width: 28px;
  height: 4px;
  background-color: var(--color-primary, #2d2d2d);
  border-radius: 4px;
  transition: all 0.3s;
}

.dark-mode-switch {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.dark-mode-switch .switch-theme-text {
  display: none;
}

.dark-mode-switch label {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  font-size: 1.2rem;
  user-select: none;
}

.dark-mode-switch input[type="checkbox"] {
  appearance: none;
  width: 46px;
  height: 25px;
  background: var(--color-light-gray, #e0e0e0);
  border-radius: 12px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 8px;
}

.dark-mode-switch input[type="checkbox"]:checked {
  background: var(--color-primary, #2d2d2d);
}

.dark-mode-switch input[type="checkbox"]::before {
  content: "🌙";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.5s;
}

.dark-mode-switch input[type="checkbox"]:not(:checked)::before {
  content: "🔆";
}

.dark-mode-switch input[type="checkbox"]:checked::before {
  transform: translateX(16px);
}

.dark-mode-switch span {
  font-size: 1.3rem;
  color: var(--color-primary, #2d2d2d);
  margin-left: 2px;
}

@media (max-width: 900px) {
  .burger {
    display: flex;
  }

  .nav .nav__inner .nav__inner-links {
    display: none;
  }

  .nav .nav__inner {
    width: 100%;
  }

  .nav .nav__inner .nav__inner-links.is-open {
    display: flex;
    position: absolute;
    top: 8vh;
    left: 0;
    width: 100%;
    height: calc(100vh - 8vh);
    overflow-y: auto;
    z-index: 100;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    gap: 40px;
    background-color: var(--color-white);
    padding: 20px;
  }

  .nav .nav__inner .nav__inner-links.is-open + .burger .burger__line {
    width: 22px;
  }

  .nav
    .nav__inner
    .nav__inner-links.is-open
    + .burger
    .burger__line:first-of-type {
    transform: rotate(50deg) translate(5px, 0px);
  }

  .nav
    .nav__inner
    .nav__inner-links.is-open
    + .burger
    .burger__line:last-of-type {
    transform: rotate(-50deg) translate(6px, -2px);
  }

  .nav
    .nav__inner
    .nav__inner-links
    .nav__inner-link
    > [class*="material-symbols"] {
    display: block;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    padding: 6px;
    border-radius: 10px;
  }

  .nav .nav__inner .nav__inner-links .nav__inner-link .chevron-right {
    margin-left: auto;
    background-color: transparent;
    color: var(--color-dark-gray);
  }

  .nav .nav__inner .nav__inner-links .nav__inner-link {
    width: 100%;
  }

  .nav .nav__inner .nav__inner-links button {
    margin-left: 0;
    padding-block: 14px;
  }

  .dark-mode-switch {
    flex-direction: column;
    align-items: start;
    gap: 5px;
    margin-left: 0;
  }

  .dark-mode-switch .switch-theme-text {
    display: block;
    color: var(--color-primary);
  }
}

@media (max-width: 380px) {
  .nav {
    height: 12vh;
  }

  .nav .nav__inner .nav__inner-links.is-open {
    top: 10vh;
  }
}
</style>
