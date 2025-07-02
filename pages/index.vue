<template>
  <div class="home">
    <section id="inicio">
      <Banner :bannersProp="banners"></Banner>
    </section>
    <section id="servicios">
      <OurServices></OurServices>
    </section>
    <section id="nosotros">
      <AboutUs></AboutUs>
    </section>
    <section id="progreso">
      <OurWay></OurWay>
    </section>
    <section id="paquetes">
      <Packages @emitPackage="viewPackage"></Packages>
    </section>
    <section id="portafolio">
      <Portfolio></Portfolio>
    </section>
    <!-- <section id="whyChoose">
      <WhyChoose></WhyChoose>
    </section> -->

    <MettingModal v-if="isVisible" @close="hide" />
    <PurchaseIntentModal
      v-if="showPackageDetail"
      :plan="packageDetail"
      @close="showPackageDetail = false"
    ></PurchaseIntentModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useComponentMeeting } from "~/components/composables/useComponentMeeting";
import MettingModal from "~/components/metting-modal.vue";
import Packages from "~/components/packages.vue";
import PurchaseIntentModal from "~/components/PurchaseIntentModal.vue";

const showThemes = ref(false);
const currentTheme = ref("light");
const showPackageDetail = ref(false);
const packageDetail = ref({});

const { isVisible, hide } = useComponentMeeting();

function viewPackage(data) {
  showPackageDetail.value = true;
  packageDetail.value = data;
}

function closeModalPurchase() {
  showPackageDetail.value = true;
}

function toggleThemesMenu() {
  showThemes.value = !showThemes.value;
}

function setTheme(theme) {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

const isMetting = ref(false);
function handleConfirm(valor) {
  isMetting.value = valor;
}

const banners = ref([
  {
    image: "software.png",
    alt: "Desarrollador",
    service: "Desarrollo de software a medida",
    icon: "icons/computer.png",
    title: {
      main: "Transforma tu idea en software real.",
      second: "Creamos soluciones que hacen la diferencia.",
    },
    subtitle: "Desarrollamos tecnología con propósito, visión y estrategia.",
    callAction: "Cotiza ahora",
  },
  {
    image: "dashboards.png",
    alt: "Analista de datos",
    service: "Análisis de datos y visualización",
    icon: "icons/analisis.png",
    title: {
      main: "Convierte tus datos en decisiones inteligentes.",
      second: "Te ayudamos a entender lo que importa.",
    },
    subtitle:
      "Diseñamos dashboards y reportes personalizados para impulsar tu crecimiento.",
    callAction: "Cotiza ahora",
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
    callAction: "Cotiza ahora",
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
    callAction: "Cotiza ahora",
  },
  {
    image: "design.webp",
    alt: "Diseño",
    service: "Diseño UX/UI centrado en el usuario",
    icon: "icons/diseño.png",
    title: {
      main: "Haz que tu producto enamore a primera vista.",
      second: "Diseñamos experiencias memorables.",
    },
    subtitle:
      "Combinamos estética y funcionalidad para conectar con tu audiencia desde el primer clic.",
    callAction: "Cotiza ahora",
  },
]);
</script>

<style>
.home {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: #fafafa;
  position: relative;
}

#inicio,
#servicios,
#nosotros,
#paquetes,
#whyChoose {
  display: flex;
  justify-content: center;
  scroll-padding-top: 80px;
}

#progreso {
  width: 100%;
}
</style>
