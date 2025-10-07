import { Services } from "@/app/types/Services";

type Service = Omit<Services, "callAction"> & {
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
    techs: [
      { name: "Html", image: "/techs/html.png" },
      { name: "Css", image: "/techs/css.png" },
      { name: "JavaScript", image: "/techs/js.png" },
      { name: "Angular", image: "/techs/angular.png" },
      { name: "React", image: "/techs/react.png" },
      { name: "Next.js", image: "/techs/next.png" },
      { name: "Vue", image: "/techs/vue.png" },
      { name: "Nuxt", image: "/techs/nuxt.png" },
      { name: "Astro", image: "/techs/astro.png" },
      { name: "Typescript", image: "/techs/typescript.png" },
      { name: "Mongo", image: "/techs/mongo.webp" },
      { name: "SqlServer", image: "/techs/sqlserver.png" },
    ],
  },
  {
    slug: "desarrollo-apps",
    icon: "/icons/mobile.webp",
    service: "Desarrollo de apps móviles",
    title: {
      main: "Apps que Impulsan tu Negocio",
      second: "Diseñadas para Crecer Contigo.",
    },
    subtitle:
      "Desarrollamos aplicaciones móviles a medida con tecnología escalable y diseño centrado en el usuario.",
    image: "/img/mobile.png",
    alt: "Banner desarrollo",
    callAction: [
      {
        label: "Contáctanos",
        actionKey: "contact",
      },
    ],
    techs: [
      { name: "Flutter", image: "/techs/flutter.png" },
      { name: "Ionic", image: "/techs/ionic.png" },
      { name: "Swift", image: "/techs/swift.png" },
      { name: "Kotlin", image: "/techs/kotlin.png" },
      { name: "React Native", image: "/techs/react.png" },
    ],
    projects: [
      {
        title: "App empresarial",
        image: "/projects-services/businness-app.png",
        description:
          "Elije entre variedad de soluciones de software personalizables a las necesidad des de su negocio.",
      },
      {
        title: "App comercial",
        image: "/img/design.webp",
        description:
          "Elije entre variedad de soluciones de software personalizables a las necesidad des de su negocio.",
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
    techs: [
      { name: "Figma", image: "/techs/figma.png" },
      { name: "Adobe XD", image: "/techs/Adobe_XD.png" },
      { name: "Adobe Ilustrator", image: "/techs/Adobe_Illustrator.png" },
      { name: "Adobe Photoshop", image: "/techs/Adobe_Photoshop.png" },
      { name: "Adobe Premiere Pro", image: "/techs/Adobe_Premiere_Pro.png" },
      { name: "Canva", image: "/techs/Canva_Logo.png" },
      { name: "Corel Draw", image: "/techs/coreldraw.png" },
    ],
  },
];
