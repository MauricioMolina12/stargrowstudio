"use client";
import Link from "next/link";
import { useState } from "react";

export default function PrivacyPolicy() {
  const items = [
    {
      title: "Responsable del tratamiento de datos",
      description: `Nombre comercial: Star Grow Studio
Correo electrónico de contacto: stargrowstudio@gmail.com
Actividad: Servicios de diseño y desarrollo digital
      `
    },
    {
      title: "Información personal que recopilamos",
      description: `Recopilamos únicamente la información necesaria para fines profesionales y de comunicación.

a) Información proporcionada directamente por el usuario
A través de formularios o canales de contacto, el usuario puede proporcionar:
- Nombre
- Dirección de correo electrónico
- Nombre de empresa o proyecto
- Mensajes, solicitudes o información relacionada con un servicio
El suministro de esta información es voluntario.

b) Información técnica recopilada automáticamente
Cuando el usuario navega por el Sitio Web, se puede recopilar información de carácter técnico, como:
- Dirección IP
- Tipo de navegador
- Sistema operativo
- Páginas visitadas y tiempo de navegación
Esta información no permite identificar directamente al usuario y se utiliza únicamente para análisis y mejora del Sitio Web.
      `
    },
    {
      title: "Cómo usamos tu información",
      description: `Utilizamos la información recopilada para:
- Brindar, operar y mejorar nuestros servicios
- Personalizar tu experiencia y mostrar contenido relevante
- Enviar comunicaciones relacionadas con el servicio, como actualizaciones o alertas
- Cumplir obligaciones legales y proteger nuestros derechos
      `
    },
    {
      title: "Información que compartimos",
      description: `Podemos compartir tu información con:
- Proveedores de servicios y socios comerciales que ayudan a operar nuestro sitio
- Autoridades legales cuando sea requerido por ley o para proteger derechos
- En casos de fusión, adquisición o venta de activos, los datos pueden transferirse como parte de la transacción
      `
    },
    {
      title: "Privacidad de los niños",
      description: `No recopilamos intencionalmente información personal de menores de 13 años. 
Si descubrimos que hemos recopilado datos de un menor sin consentimiento parental, los eliminaremos de inmediato.
      `
    },
    {
      title: "Opciones sobre tu privacidad",
      description: `Tienes derecho a:
- Acceder, corregir o eliminar tu información personal
- Oponerte al tratamiento de tus datos para ciertos fines
- Gestionar tus preferencias de cookies y comunicaciones
Para ejercer estos derechos, contáctanos mediante los datos proporcionados al final de esta política.
      `
    },
    {
      title: "Seguridad de los datos",
      description: `Implementamos medidas técnicas, administrativas y organizativas para proteger tus datos personales contra pérdida, uso indebido, acceso no autorizado o divulgación.
Sin embargo, ninguna transmisión de datos por internet puede garantizar seguridad absoluta.
      `
    },
    {
      title: "Sitios de terceros y plugins de redes sociales",
      description: `Nuestro sitio puede incluir enlaces o integraciones con sitios de terceros y redes sociales. 
No somos responsables de sus políticas de privacidad o prácticas de manejo de datos. Te recomendamos revisar sus políticas antes de interactuar.
      `
    },
    {
      title: "Detalles de contacto",
      description: `Si tienes preguntas sobre esta política o deseas ejercer tus derechos de privacidad, contáctanos a través de:

Correo electrónico: contacto@tuempresa.com  
Dirección: Calle Falsa 123, Ciudad, País  
Teléfono: +57 123 456 7890
      `
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (

      <main className="w-full min-h-screen bg-white max-w-4xl space-y-8 leading-relaxed pb-15 rounded-lg shadow-md px-10">
        <div className="relative">
          <div className="max-w-4xl py-8">     
            <p className="font-medium mb-6 text-[var(--primary--800)] text-[12px]">ACTUALIZADO OCTUBRE 8, 2026</p>
            <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-5 sm:text-5xl xl:text-6xl">Política de Privacidad</h1>
            <p className="mt-2">Por favor, lee este acuerdo detenidamente, ya que contiene información importante sobre tus derechos y recursos legales.</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introducción</h2>
          <p>
            En Star Grow Studio ("nosotros", "nuestro" o "la empresa"), nos comprometemos a proteger tu privacidad y datos
            personales. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu
            información cuando utilizas nuestros servicios de desarrollo de software, diseño web y soluciones digitales.
          </p>
          <p className="mt-4">
            Al utilizar nuestros servicios o interactuar con nuestra página web, aceptas las prácticas descritas en esta
            política. Te recomendamos leer este documento detenidamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">2. Información que Recopilamos</h2>
          <p>Podemos recopilar los siguientes tipos de información:</p>

          <h3 className="text-xl font-semibold  mt-6 mb-3">2.1 Información proporcionada directamente</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Nombre completo y datos de contacto (correo electrónico, teléfono)</li>
            <li>Información de tu empresa u organización</li>
            <li>Detalles del proyecto o servicio solicitado</li>
            <li>Información de facturación y datos fiscales</li>
            <li>Cualquier otra información que decidas compartir con nosotros</li>
          </ul>

          <h3 className="text-xl font-semibold  mt-6 mb-3">2.2 Información recopilada automáticamente</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dirección IP y datos de ubicación aproximada</li>
            <li>Tipo de navegador y dispositivo utilizado</li>
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>Datos de uso y navegación en nuestro sitio web</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">3. Uso de la Información</h2>
          <p>Utilizamos tu información para los siguientes propósitos:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>Comunicarnos contigo sobre proyectos, actualizaciones y soporte</li>
            <li>Procesar pagos y gestionar facturación</li>
            <li>Enviar información promocional (solo con tu consentimiento)</li>
            <li>Cumplir con obligaciones legales y regulatorias</li>
            <li>Proteger nuestros derechos y prevenir fraudes</li>
            <li>Mejorar la experiencia del usuario en nuestro sitio web</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">4. Compartir Información</h2>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing sin tu
            consentimiento explícito. Sin embargo, podemos compartir información en las siguientes circunstancias:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>
              <strong className="">Proveedores de servicios:</strong> Con empresas que nos ayudan a operar
              nuestro negocio (hosting, procesamiento de pagos, análisis)
            </li>
            <li>
              <strong className="">Requisitos legales:</strong> Cuando sea requerido por ley o autoridades
              competentes
            </li>
            <li>
              <strong className="">Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o
              seguridad
            </li>
            <li>
              <strong className="">Transferencia de negocio:</strong> En caso de fusión, adquisición o venta de
              activos
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">5. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger tu información
            personal contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>Cifrado de datos en tránsito y en reposo</li>
            <li>Acceso restringido a información personal</li>
            <li>Monitoreo regular de nuestros sistemas</li>
            <li>Capacitación del personal en seguridad de datos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">6. Tus Derechos</h2>
          <p>Dependiendo de tu ubicación, puedes tener los siguientes derechos:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>
              <strong className="">Acceso:</strong> Solicitar una copia de tus datos personales
            </li>
            <li>
              <strong className="">Rectificación:</strong> Corregir datos inexactos o incompletos
            </li>
            <li>
              <strong className="">Eliminación:</strong> Solicitar la eliminación de tus datos
            </li>
            <li>
              <strong className="">Portabilidad:</strong> Recibir tus datos en formato estructurado
            </li>
            <li>
              <strong className="">Oposición:</strong> Oponerte al procesamiento de tus datos
            </li>
            <li>
              <strong className="">Retiro del consentimiento:</strong> Retirar tu consentimiento en cualquier
              momento
            </li>
          </ul>
          <p className="mt-4">
            Para ejercer estos derechos, contáctanos en{" "}
            <a href="mailto:contacto@stargrow.co" className="text-[var(--primary--500)] font-medium hover:underline">
              contacto@stargrow.co
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">7. Retención de Datos</h2>
          <p>
            Conservamos tu información personal durante el tiempo necesario para cumplir con los propósitos descritos en
            esta política, a menos que la ley requiera o permita un período de retención más largo. Los criterios
            utilizados para determinar los períodos de retención incluyen:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li>La duración de nuestra relación comercial</li>
            <li>Obligaciones legales de conservación</li>
            <li>Posibles disputas o reclamaciones</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">8. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos
            publicando la nueva política en nuestro sitio web y actualizando la fecha de "última actualización". Te
            recomendamos revisar esta política periódicamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold  mb-4">9. Contacto</h2>
          <p>
            Si tienes preguntas, comentarios o inquietudes sobre esta Política de Privacidad o nuestras prácticas de
            privacidad, puedes contactarnos en:
          </p>
          <div className="mt-4 p-4 bg-black/5 rounded-lg border border-black/10">
            <p>
              <strong className="">Star Grow Studio</strong>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:stargrow2025@gmail.com" className="text-[var(--primary--500)] font-medium hover:underline">
                stargrow2025@gmail.com
              </a>
            </p>
            <p>
              Teléfono:{" "}
              <a href="tel:+573003856084" className="text-[var(--primary--500)] font-medium hover:underline">
                +57 300 385 6084
              </a>
            </p>
            <p>Colombia</p>
          </div>
        </section>


      </main>
  );
}
