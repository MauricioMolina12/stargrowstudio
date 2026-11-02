import type { LegalDoc } from "./legalTypes";

/** Fecha de última actualización. Coherente con la implementación actual. */
export const PRIVACY_LAST_UPDATED = "14 de agosto de 2026";

export const PRIVACY_POLICY: LegalDoc = {
  eyebrow: "Star Grow Studio",
  title: "Política de Privacidad y Tratamiento de Datos Personales",
  intro:
    "En Star Grow Studio S.A.S. tratamos tu información personal de manera transparente, segura y conforme a la normativa colombiana de protección de datos personales. Esta política explica qué información recopilamos a través de nuestro sitio web, con qué finalidades la utilizamos y los derechos que tienes sobre ella.",
  updatedAt: PRIVACY_LAST_UPDATED,
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      blocks: [
        {
          kind: "paragraph",
          text: "El responsable del tratamiento de los datos personales recopilados a través de este sitio web es:",
        },
        {
          kind: "list",
          items: [
            "Empresa: Star Grow Studio S.A.S.",
            "NIT: 901992414-1",
            "País: Colombia",
          ],
        },
        {
          kind: "paragraph",
          text: "Para cualquier consulta relacionada con esta política o con el tratamiento de tus datos personales, puedes contactarnos a través de:",
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
    {
      id: "informacion-que-recopilamos",
      title: "Información que recopilamos",
      blocks: [
        {
          kind: "paragraph",
          text: "A través de los formularios propios de nuestro sitio web (por ejemplo, el formulario de contacto), podemos recopilar la información que nos proporcionas de forma voluntaria:",
        },
        { kind: "list", items: ["Nombre.", "Correo electrónico.", "Asunto.", "Mensaje."] },
        {
          kind: "paragraph",
          text: "Únicamente recopilamos la información que nos suministras directamente a través de estos formularios. No recopilamos información adicional de manera automática con fines de seguimiento, análisis o publicidad.",
        },
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades del tratamiento",
      blocks: [
        {
          kind: "paragraph",
          text: "La información que recopilamos se utiliza principalmente para:",
        },
        {
          kind: "list",
          items: [
            "Responder tus solicitudes.",
            "Contactarte cuando nos escribes.",
            "Atender tus consultas.",
            "Preparar y gestionar cotizaciones.",
            "Prestar los servicios que hayas solicitado.",
            "Establecer comunicaciones relacionadas con los servicios solicitados.",
          ],
        },
      ],
    },
    {
      id: "comunicacion-terceros",
      title: "Comunicación a través de servicios de terceros",
      blocks: [
        {
          kind: "paragraph",
          text: "Nuestro sitio web puede ofrecerte la posibilidad de comunicarte con nosotros a través de canales externos como WhatsApp ([https://wa.me/573003856084](https://wa.me/573003856084)) o mediante enlaces de correo electrónico.",
        },
        {
          kind: "paragraph",
          text: "Cuando utilizas estos servicios externos, la información que compartes puede estar sujeta a las políticas de privacidad, términos de uso y condiciones de los respectivos proveedores. Star Grow Studio no controla los datos que son tratados directamente por WhatsApp u otros terceros, por lo que te recomendamos revisar sus políticas antes de utilizarlos.",
        },
      ],
    },
    {
      id: "agendamiento-calendly",
      title: "Agendamiento de reuniones (Calendly)",
      blocks: [
        {
          kind: "paragraph",
          text: "Para agendar reuniones, nuestro sitio web puede remitirte al servicio de agendamiento de terceros Calendly. Calendly es un proveedor externo e independiente de Star Grow Studio.",
        },
        {
          kind: "paragraph",
          text: "Cuando utilizas el sistema de agendamiento, puedes proporcionar información directamente al proveedor del servicio durante el proceso de reserva. Dicha información es tratada de acuerdo con la configuración del servicio y las políticas de Calendly, sobre las cuales Star Grow Studio no ejerce control.",
        },
      ],
    },
    {
      id: "servicios-tecnologicos",
      title: "Servicios tecnológicos e infraestructura",
      blocks: [
        {
          kind: "paragraph",
          text: "Nuestro sitio web funciona sobre Next.js como framework de aplicación y es alojado en la infraestructura de Vercel. Estos proveedores pueden tratar información técnica necesaria para el funcionamiento del sitio, conforme a sus propias políticas.",
        },
        {
          kind: "paragraph",
          text: "El envío de los mensajes del formulario de contacto se realiza a través de un proveedor de correo electrónico de terceros, que actúa únicamente para entregar el mensaje a nuestro equipo. Los datos del formulario son transmitidos a dicho proveedor con esa única finalidad.",
        },
        {
          kind: "note",
          text: "Actualmente no utilizamos herramientas de analítica ni de publicidad que recopilen datos de navegación, y nuestro sistema de gestión de contenido (Sanity CMS) se encuentra desactivado y no recopila información de los usuarios del sitio.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies y tecnologías similares",
      blocks: [
        {
          kind: "paragraph",
          text: "Este sitio utiliza cookies y tecnologías similares. La gestión técnica del consentimiento se realiza mediante el servicio de terceros CookieYes, que organiza las cookies en categorías (necesarias, funcionales, analíticas y de marketing) y registra tu decisión.",
        },
        {
          kind: "paragraph",
          text: "Las cookies necesarias son esenciales para el funcionamiento del sitio. Las categorías opcionales solo se activan si nos das tu consentimiento; por ejemplo, si permites las cookies funcionales, podemos cargar el servicio de agendamiento de reuniones (Calendly).",
        },
        {
          kind: "paragraph",
          text: "Puedes modificar tus preferencias de cookies en cualquier momento desde el panel de preferencias:",
        },
        { kind: "consentButton", label: "Configurar preferencias de cookies" },
      ],
    },
    {
      id: "derechos",
      title: "Derechos de los titulares de los datos",
      blocks: [
        {
          kind: "paragraph",
          text: "De conformidad con la normativa colombiana de protección de datos personales (Ley 1581 de 2012 y las normas que la modifiquen o reglamenten), tienes derecho a:",
        },
        {
          kind: "list",
          items: [
            "Conocer los datos personales que tratamos sobre ti.",
            "Solicitar la actualización, rectificación o corrección de tus datos.",
            "Solicitar información sobre el uso que les damos a tus datos.",
            "Solicitar la supresión de tus datos cuando corresponda.",
            "Revocar la autorización para el tratamiento cuando sea procedente.",
            "Presentar consultas o reclamos ante nosotros o ante la autoridad competente.",
            "Los demás derechos reconocidos por la normativa aplicable.",
          ],
        },
        {
          kind: "paragraph",
          text: "Para ejercer cualquiera de estos derechos, puedes escribirnos a [stargrowstudio@gmail.com](mailto:stargrowstudio@gmail.com). Atenderemos tu solicitud de acuerdo con lo previsto en la normativa aplicable.",
        },
      ],
    },
    {
      id: "seguridad",
      title: "Seguridad de la información",
      blocks: [
        {
          kind: "paragraph",
          text: "Star Grow Studio adopta medidas razonables de seguridad, técnicas, administrativas y organizativas, para proteger la información contra acceso no autorizado, pérdida, alteración, divulgación y uso indebido.",
        },
        {
          kind: "note",
          text: "Ninguna transmisión de datos por internet puede garantizar una seguridad absoluta. Hacemos nuestro mejor esfuerzo, pero no podemos prometer una seguridad total.",
        },
      ],
    },
    {
      id: "conservacion",
      title: "Conservación de la información",
      blocks: [
        {
          kind: "paragraph",
          text: "La información será conservada durante el tiempo necesario para cumplir las finalidades para las cuales fue recopilada y las obligaciones legales aplicables. Una vez ya no sea necesaria, será eliminada o anonimizada conforme a la normativa vigente.",
        },
      ],
    },
    {
      id: "cambios",
      title: "Cambios a esta política",
      blocks: [
        {
          kind: "paragraph",
          text: "Star Grow Studio puede actualizar esta política cuando sea necesario para reflejar cambios en el sitio, en los servicios o en la normativa aplicable. Te invitamos a revisar periódicamente esta página.",
        },
        { kind: "paragraph", text: `Última actualización: ${PRIVACY_LAST_UPDATED}.` },
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      blocks: [
        {
          kind: "paragraph",
          text: "Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos personales, puedes contactarnos a través de:",
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
