import type { LegalDoc } from "./legalTypes";

/** Fecha de última actualización. Coherente con la implementación actual. */
export const TERMS_LAST_UPDATED = "14 de agosto de 2026";

export const TERMS_CONDITIONS: LegalDoc = {
  eyebrow: "Star Grow Studio",
  title: "Términos y Condiciones de Uso",
  intro:
    "Estos Términos y Condiciones regulan el uso del sitio web de Star Grow Studio S.A.S. Al navegar, acceder o utilizar este sitio, aceptas cumplir con los términos aquí descritos.",
  updatedAt: TERMS_LAST_UPDATED,
  sections: [
    {
      id: "informacion-general",
      title: "Información general",
      blocks: [
        {
          kind: "paragraph",
          text: "El sitio web es operado por Star Grow Studio S.A.S., sociedad colombiana identificada con NIT 901992414-1. Star Grow Studio es una agencia de desarrollo de software y soluciones digitales.",
        },
        {
          kind: "paragraph",
          text: "Estos términos aplican a todas las personas que accedan o utilicen el sitio web. Si no estás de acuerdo con ellos, te pedimos que no utilices el sitio.",
        },
      ],
    },
    {
      id: "uso-del-sitio",
      title: "Uso del sitio",
      blocks: [
        { kind: "paragraph", text: "Al utilizar nuestro sitio web, te comprometes a hacerlo de forma:" },
        {
          kind: "list",
          items: [
            "Lícita y de buena fe.",
            "Responsable y respetuosa.",
            "Sin intentar vulnerar la seguridad del sitio o de terceros.",
            "Sin introducir código malicioso, virus u otros elementos dañinos.",
            "Sin utilizar nuestros servicios o contenidos para actividades ilícitas.",
          ],
        },
      ],
    },
    {
      id: "servicios",
      title: "Servicios",
      blocks: [
        {
          kind: "paragraph",
          text: "Star Grow Studio ofrece servicios de desarrollo de software, desarrollo web, desarrollo de aplicaciones, diseño web, landing pages, e-commerce, mantenimiento de sitios web y aplicaciones, integraciones, CMS, SEO, fotografía, diseño gráfico, diseño UI/UX y otros servicios relacionados con soluciones digitales.",
        },
        {
          kind: "paragraph",
          text: "Nuestro sitio web funciona principalmente como un espacio de información, portafolio, contacto y solicitud de cotización. La contratación de servicios se realiza por fuera del sitio web, mediante comunicación directa con nuestro equipo.",
        },
        {
          kind: "note",
          text: "Actualmente el sitio no cuenta con un sistema de checkout ni de contratación automática de servicios.",
        },
      ],
    },
    {
      id: "cotizaciones",
      title: "Cotizaciones y propuestas",
      blocks: [
        {
          kind: "paragraph",
          text: "Las solicitudes de cotización realizadas a través del sitio no constituyen automáticamente un contrato.",
        },
        {
          kind: "paragraph",
          text: "Las cotizaciones, propuestas, precios, alcances, tiempos y condiciones definitivas serán establecidos entre Star Grow Studio y el cliente mediante los mecanismos de contratación correspondientes.",
        },
      ],
    },
    {
      id: "pagos",
      title: "Pagos",
      blocks: [
        {
          kind: "paragraph",
          text: "Este sitio no procesa pagos, no cuenta con sistema de checkout y no vende directamente servicios a través de una plataforma de comercio electrónico. Los acuerdos comerciales y de pago se gestionan de forma directa entre Star Grow Studio y el cliente.",
        },
      ],
    },
    {
      id: "propiedad-intelectual",
      title: "Propiedad intelectual",
      blocks: [
        {
          kind: "paragraph",
          text: "Salvo indicación expresa en contrario o derechos de terceros, la marca Star Grow Studio, los logotipos, la identidad visual, el código, los componentes, el diseño del sitio, las interfaces, los textos, las fotografías propias, los gráficos, las ilustraciones, el material audiovisual, el contenido original y los elementos de UI/UX pertenecen a Star Grow Studio S.A.S. o se utilizan legítimamente bajo las licencias correspondientes.",
        },
        {
          kind: "paragraph",
          text: "Sin la autorización correspondiente, cuando legalmente sea exigible, no está permitido copiar, reproducir, distribuir, modificar, publicar, reutilizar ni explotar comercialmente estos elementos.",
        },
        { kind: "paragraph", text: "Es importante diferenciar los siguientes casos:" },
        {
          kind: "list",
          items: [
            "El contenido y los activos propios de Star Grow Studio (marca, identidad visual, diseño del sitio, textos y materiales propios) pertenecen a Star Grow Studio o se utilizan bajo licencias legítimas.",
            "Los trabajos desarrollados para clientes: la propiedad de cada proyecto se determina por el contrato o propuesta correspondiente, y puede corresponder al cliente según lo pactado.",
            "Los materiales proporcionados por terceros o por clientes (por ejemplo, imágenes, textos o logotipos suministrados por el cliente) conservan los derechos de sus respectivos titulares.",
            "Las licencias de terceros (por ejemplo, librerías de código, tipografías o herramientas) se rigen por los términos de sus propios autores y proveedores.",
          ],
        },
      ],
    },
    {
      id: "terceros",
      title: "Contenido y servicios de terceros",
      blocks: [
        {
          kind: "paragraph",
          text: "Algunos elementos del sitio pueden depender de servicios o contenidos de terceros, como el agendamiento de reuniones (Calendly), WhatsApp u otros servicios externos que puedan integrarse posteriormente.",
        },
        {
          kind: "paragraph",
          text: "Star Grow Studio no es propietaria de esos servicios y no controla su contenido, su disponibilidad ni sus políticas. Su uso se rige por los términos y condiciones de cada proveedor.",
        },
      ],
    },
    {
      id: "disponibilidad",
      title: "Disponibilidad del sitio",
      blocks: [
        {
          kind: "paragraph",
          text: "Procuramos mantener nuestro sitio web funcionando correctamente, pero no podemos garantizar una disponibilidad del 100%.",
        },
        {
          kind: "list",
          items: [
            "Labores de mantenimiento y actualización.",
            "Errores o fallos técnicos.",
            "Interrupciones del servicio.",
            "Problemas con proveedores o servicios de terceros.",
            "Circunstancias fuera del control de Star Grow Studio.",
          ],
        },
      ],
    },
    {
      id: "enlaces-externos",
      title: "Enlaces externos",
      blocks: [
        {
          kind: "paragraph",
          text: "El sitio puede contener enlaces a sitios web de terceros. Star Grow Studio no controla necesariamente el contenido, las políticas de privacidad ni las prácticas de esos sitios externos, y no asume responsabilidad por ellos.",
        },
      ],
    },
    {
      id: "responsabilidad",
      title: "Limitación de responsabilidad",
      blocks: [
        {
          kind: "paragraph",
          text: "Star Grow Studio no garantiza que el sitio esté libre de errores o interrupciones. El sitio se ofrece en la medida de lo posible y la responsabilidad por su uso se manejará conforme a la legislación aplicable.",
        },
        {
          kind: "paragraph",
          text: "Nada en estos términos pretende excluir o limitar derechos que legalmente no puedan excluirse o limitarse. No utilizamos cláusulas abusivas.",
        },
      ],
    },
    {
      id: "modificaciones",
      title: "Modificaciones de los términos",
      blocks: [
        {
          kind: "paragraph",
          text: "Star Grow Studio puede actualizar estos términos cuando sea necesario. Te invitamos a revisar periódicamente esta página.",
        },
        { kind: "paragraph", text: `Última actualización: ${TERMS_LAST_UPDATED}.` },
      ],
    },
    {
      id: "legislacion",
      title: "Legislación aplicable",
      blocks: [
        {
          kind: "paragraph",
          text: "Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada del uso del sitio se resolverá de conformidad con la legislación colombiana aplicable.",
        },
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      blocks: [
        {
          kind: "paragraph",
          text: "Si tienes preguntas sobre estos términos, puedes contactarnos a través de:",
        },
        {
          kind: "list",
          items: [
            "Correo electrónico: [stargrowstudio@gmail.com](mailto:stargrowstudio@gmail.com)",
            "WhatsApp: [+57 300 385 6084](https://wa.me/573003856084)",
          ],
        },
      ],
    },
  ],
};
