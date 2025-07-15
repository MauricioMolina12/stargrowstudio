import { BannerInterface } from "@/app/types/Banner";

type Service = Omit<BannerInterface, "callAction"> & {
  slug: string;
  callAction: { label: string; actionKey: string }[];
};

export const services: Service[] = [
  {
    slug: "desarrollo-software",
    icon: "/icons/computer.png",
    service: "Desarrollo de software a tu medida",
    title: {
      main: "Impulsa tu negocio",
      second: " con un software hecho a tu medida",
    },
    subtitle: "Soluciones webs escalables y modernas.",
    image: "/img/devices.png",
    alt: "Banner desarrollo",
    callAction: [
      {
        label: "Contáctanos",
        actionKey: "contact",
      },
    ],
  },
  {
    slug: "desarrollo-apps",
    icon: "/icons/mobile.webp",
    service: "Desarrollo de apps móviles",
    title: {
      main: "Impulsa tu empresa",
      second: "con soluciones móviles inteligentes",
    },
    subtitle: "Soluciones móviles escalables y modernas.",
    image: "/img/mobile.png",
    alt: "Banner desarrollo",
    callAction: [
      {
        label: "Contáctanos",
        actionKey: "contact",
      },
    ],
  },
  {
    slug: "analisis-datos",
    service: "Análisis de datos y visualización",
    icon: "/icons/analisis.png",
    title: {
      main: "Convierte tus datos en decisiones inteligentes.",
      second: "Te ayudamos a entender lo que importa.",
    },
    subtitle:
      "Diseñamos dashboards y reportes personalizados para impulsar tu crecimiento.",
    image: "/img/powerbi.png",
    alt: "Analista de datos",
    callAction: [
      {
        label: "Contáctanos",
        actionKey: "contact",
      },
    ],
  },
  {
    slug: "diseno-ux-ui",
    service: "Diseño ui/ux",
    icon: "/icons/diseño.png",
    title: {
      main: "Haz que tu producto enamore a primera vista.",
      second: "Diseñamos experiencias memorables.",
    },
    subtitle:
      "Combinamos estética y funcionalidad para conectar con tu audiencia desde el primer clic.",
    image: "/img/design-figma.png",
    alt: "Diseño figma",
    callAction: [
      {
        label: "Contáctanos",
        actionKey: "contact",
      },
    ],
  },
];
