"use client";
import { useState } from "react";

export default function PrivacyPolicy() {
  const items = [
    {
      title: "Tipos de información que recopilamos",
      description: `
Recopilamos información personal que nos proporcionas directamente cuando interactúas con nuestro sitio o servicios, como:
- Nombre, correo electrónico, número de teléfono
- Datos de registro y de cuenta
- Información enviada a través de formularios, comentarios o soporte
- Contenido generado por ti (opiniones, fotos, etc.)
      `
    },
    {
      title: "Información recopilada automáticamente",
      description: `
Al utilizar nuestros servicios, podemos recopilar automáticamente:
- Dirección IP, tipo de navegador y sistema operativo
- Páginas visitadas, tiempo de permanencia y actividad en el sitio
- Cookies y tecnologías similares para análisis y personalización
      `
    },
    {
      title: "Cómo usamos tu información",
      description: `
Utilizamos la información recopilada para:
- Brindar, operar y mejorar nuestros servicios
- Personalizar tu experiencia y mostrar contenido relevante
- Enviar comunicaciones relacionadas con el servicio, como actualizaciones o alertas
- Cumplir obligaciones legales y proteger nuestros derechos
      `
    },
    {
      title: "Información que compartimos",
      description: `
Podemos compartir tu información con:
- Proveedores de servicios y socios comerciales que ayudan a operar nuestro sitio
- Autoridades legales cuando sea requerido por ley o para proteger derechos
- En casos de fusión, adquisición o venta de activos, los datos pueden transferirse como parte de la transacción
      `
    },
    {
      title: "Privacidad de los niños",
      description: `
No recopilamos intencionalmente información personal de menores de 13 años. 
Si descubrimos que hemos recopilado datos de un menor sin consentimiento parental, los eliminaremos de inmediato.
      `
    },
    {
      title: "Opciones sobre tu privacidad",
      description: `
Tienes derecho a:
- Acceder, corregir o eliminar tu información personal
- Oponerte al tratamiento de tus datos para ciertos fines
- Gestionar tus preferencias de cookies y comunicaciones
Para ejercer estos derechos, contáctanos mediante los datos proporcionados al final de esta política.
      `
    },
    {
      title: "Seguridad de los datos",
      description: `
Implementamos medidas técnicas, administrativas y organizativas para proteger tus datos personales contra pérdida, uso indebido, acceso no autorizado o divulgación.
Sin embargo, ninguna transmisión de datos por internet puede garantizar seguridad absoluta.
      `
    },
    {
      title: "Sitios de terceros y plugins de redes sociales",
      description: `
Nuestro sitio puede incluir enlaces o integraciones con sitios de terceros y redes sociales. 
No somos responsables de sus políticas de privacidad o prácticas de manejo de datos. Te recomendamos revisar sus políticas antes de interactuar.
      `
    },
    {
      title: "Detalles de contacto",
      description: `
Si tienes preguntas sobre esta política o deseas ejercer tus derechos de privacidad, contáctanos a través de:

Correo electrónico: contacto@tuempresa.com  
Dirección: Calle Falsa 123, Ciudad, País  
Teléfono: +57 123 456 7890
      `
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="w-full min-h-screen bg-white">

      <div className="relative bg-[var(--color-primary)] text-white clip-path-[polygon(0_0,_100%_0%,_100%_78%,_0%_100%)]">
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="text-4xl font-bold">Política de privacidad</h1>
          <p className="mt-2">Por favor, lee este acuerdo detenidamente, ya que contiene información importante sobre tus derechos y recursos legales.</p>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[20%_80%] border-t border-gray-200">
          <aside className="border-r border-gray-300 p-4 bg-gray-50 sticky top-20 h-fit">
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-sm p-2 hover:bg-gray-200 transition ${activeIndex === index ? "text-[var(--color-primary)] font-semibold border-b-2 border-b-[var(--color-primary)]" : "text-black"
                    }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </aside>

          <main className="p-6 text-[#5656b5]">
            <h2 className="text-2xl font-bold mb-4">{items[activeIndex].title}</h2>
            <div className="whitespace-pre-line text-base leading-relaxed">
              {items[activeIndex].description}
            </div>
          </main>
        </div>

      </div>
    </main>
  );
}
