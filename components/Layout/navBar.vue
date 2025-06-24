<template>
  <nav class="nav" :class="{ dark: isDarkMode, light: !isDarkMode }">
    <div class="nav__inner">
      <NuxtLink :to="'/'" class="nav__inner-logo">
        <figure class="nav__inner-figure">
          <img
            :src="isDarkMode ? '/logo-white.png' : '/logo.png'"
            alt="logo stargrow"
          />
          <figcaption>STAR GROW STUDIO</figcaption>
        </figure>
      </NuxtLink>
      <div class="nav__inner-links" :class="{ 'is-open': isMenuOpen }">
        <div class="nav__inner-link" v-for="tab of sections">
          <span class="material-symbols-outlined">{{ tab.icon }}</span>
          <HeaderLink
            :label="tab.label"
            :is-active="tab.label === activeSection"
            :href="'#' + tab.id"
            :color="
              !isDarkMode ? 'var(--color-dark-gray)' : 'var(--color-white)'
            "
            padding="22px"
          />
          <span class="material-symbols-outlined chevron-right"
            >navigate_next</span
          >
        </div>
        <Button name="Cotiza ahora" @click="show()">Cotiza ahora</Button>

        <!-- <div class="dark-mode-switch">
          <label class="switch-theme-text"
            >Modo {{ isDarkMode ? "oscuro" : "claro" }}</label
          >
          <label>
            <input type="checkbox" v-model="isDarkMode" />
          </label>
        </div> -->
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
import { useComponentMeeting } from "../composables/useComponentMeeting";
import { useDarkMode } from "../composables/useDarkMode";

import { ref } from "vue";
const isMenuOpen = ref(false);
const { show } = useComponentMeeting();

export default {
  components: {
    Button,
    HeaderLink,
  },
  setup() {
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const sections = [
      { id: "inicio", label: "Inicio", icon: "home" },
      { id: "servicios", label: "Servicios", icon: "handshake" },
      { id: "nosotros", label: "Nosotros", icon: "groups" },
      { id: "progreso", label: "Progreso", icon: "trending_up" },
      { id: "paquetes", label: "Paquetes", icon: "trending_up" },
      { id: "portafolio", label: "Portafolio", icon: "collections" },
      { id: "contacto", label: "Contacto", icon: "mail" },
    ];

    const activeSection = ref("inicio");

    const onScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= (window.innerHeight / 2) * 0.3 && rect.bottom > 0) {
          activeSection.value = section.label;
          break;
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });

    const { isDark, toggleDark, setDark } = useDarkMode();

    return {
      isMenuOpen,
      toggleMenu,
      isDarkMode: isDark,
      toggleDarkMode: toggleDark,
      activeSection,
      sections,
    };
  },

  methods: {},
};
</script>
<style>
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

.nav__inner-logo{
  text-decoration: none;
}

/* THEME */
.nav.dark {
  background: linear-gradient(#121245 0%, #121245 50%);
}

.nav.dark figcaption {
  color: var(--color-white) !important;
}

.nav .nav__inner {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
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
  min-width: 76%;
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

@media (max-width: 1024px) {
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
