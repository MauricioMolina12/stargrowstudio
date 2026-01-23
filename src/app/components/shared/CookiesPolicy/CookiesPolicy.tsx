

export default function CookiesPolicy() {

  return (
    <main className="w-full min-h-screen bg-white max-w-4xl space-y-8 leading-relaxed pb-15 rounded-lg shadow-md px-10">

        <div className="relative ">
            <div className="max-w-4xl py-8">     
              <p className="font-medium mb-6 text-[var(--primary--800)] text-[12px]">ACTUALIZADO OCTUBRE 8, 2026</p>
              <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-5 sm:text-5xl xl:text-6xl">Política de Cookies</h1>
              <p className="mt-2">Por favor, lee este acuerdo detenidamente, ya que contiene información importante sobre tus derechos y recursos legales.</p>
            </div>
        </div>     
       <section>
        <h2 className="text-2xl font-bold  mb-4">1. ¿Qué son las Cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, tablet o teléfono
          móvil) cuando visitas un sitio web. Las cookies se utilizan ampliamente para hacer que los sitios web
          funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
        </p>
        <p className="mt-4">
          En Star Grow Studio, utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio
          web y entender cómo se utiliza nuestro contenido.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">2. Tipos de Cookies que Utilizamos</h2>

        <h3 className="text-xl font-semibold  mt-6 mb-3">2.1 Cookies Estrictamente Necesarias</h3>
        <p>
          Estas cookies son esenciales para que puedas navegar por el sitio web y utilizar sus funciones. Sin estas
          cookies, ciertos servicios que has solicitado no pueden ser proporcionados.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-black/10 rounded-lg overflow-hidden">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-3 ">Cookie</th>
                <th className="text-left p-3 ">Propósito</th>
                <th className="text-left p-3 ">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/10">
                <td className="p-3">session_id</td>
                <td className="p-3">Mantener tu sesión activa</td>
                <td className="p-3">Sesión</td>
              </tr>
              <tr className="border-t border-black/10">
                <td className="p-3">csrf_token</td>
                <td className="p-3">Seguridad de formularios</td>
                <td className="p-3">Sesión</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold  mt-6 mb-3">2.2 Cookies de Rendimiento y Análisis</h3>
        <p>
          Estas cookies nos permiten contar las visitas y las fuentes de tráfico para poder medir y mejorar el
          rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y las menos populares, y a ver cómo
          los visitantes se mueven por el sitio.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-black/10 rounded-lg overflow-hidden">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-3 ">Cookie</th>
                <th className="text-left p-3 ">Propósito</th>
                <th className="text-left p-3 ">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/10">
                <td className="p-3">_va</td>
                <td className="p-3">Vercel Analytics</td>
                <td className="p-3">1 año</td>
              </tr>
              <tr className="border-t border-black/10">
                <td className="p-3">_ga</td>
                <td className="p-3">Google Analytics - Identificador</td>
                <td className="p-3">2 años</td>
              </tr>
              <tr className="border-t border-black/10">
                <td className="p-3">_gid</td>
                <td className="p-3">Google Analytics - Sesión</td>
                <td className="p-3">24 horas</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold  mt-6 mb-3">2.3 Cookies de Funcionalidad</h3>
        <p>
          Estas cookies permiten que el sitio proporcione una funcionalidad y personalización mejoradas. Pueden ser
          establecidas por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-black/10 rounded-lg overflow-hidden">
            <thead className="bg-black/5">
              <tr>
                <th className="text-left p-3 ">Cookie</th>
                <th className="text-left p-3 ">Propósito</th>
                <th className="text-left p-3 ">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-black/10">
                <td className="p-3">theme</td>
                <td className="p-3">Preferencia de tema (claro/oscuro)</td>
                <td className="p-3">1 año</td>
              </tr>
              <tr className="border-t border-black/10">
                <td className="p-3">language</td>
                <td className="p-3">Preferencia de idioma</td>
                <td className="p-3">1 año</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">3. Cookies de Terceros</h2>
        <p>
          Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas. Utilizamos los
          siguientes servicios de terceros:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
          <li>
            <strong className="">Vercel Analytics:</strong> Para análisis de rendimiento y tráfico del sitio
          </li>
          <li>
            <strong className="">Google Analytics:</strong> Para entender el comportamiento de los usuarios
          </li>
          <li>
            <strong className="">Sanity:</strong> Para gestión de contenido
          </li>
        </ul>
        <p className="mt-4">
          No tenemos control sobre las cookies de terceros. Puedes consultar las políticas de privacidad de estos
          servicios en sus respectivos sitios web.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">4. ¿Cómo Gestionar las Cookies?</h2>
        <p>
          La mayoría de los navegadores web aceptan cookies automáticamente, pero puedes modificar la configuración de
          tu navegador para rechazar cookies si lo prefieres. Sin embargo, ten en cuenta que esto puede impedir que
          aproveches al máximo el sitio web.
        </p>

        <h3 className="text-xl font-semibold  mt-6 mb-3">4.1 Configuración del Navegador</h3>
        <p>Puedes gestionar las cookies a través de la configuración de tu navegador:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
          <li>
            <strong className="">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
          </li>
          <li>
            <strong className="">Firefox:</strong> Opciones → Privacidad y seguridad → Cookies
          </li>
          <li>
            <strong className="">Safari:</strong> Preferencias → Privacidad → Cookies
          </li>
          <li>
            <strong className="">Edge:</strong> Configuración → Privacidad → Cookies
          </li>
        </ul>

        <h3 className="text-xl font-semibold  mt-6 mb-3">4.2 Opt-out de Analytics</h3>
        <p>
          Para desactivar Google Analytics, puedes instalar el complemento de inhabilitación para navegadores de Google
          Analytics disponible en:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary--500)] font-medium hover:underline"
          >
            tools.google.com/dlpage/gaoptout
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">5. Consentimiento</h2>
        <p>
          Al continuar navegando en nuestro sitio web después de haber sido informado sobre el uso de cookies (a través
          del banner de cookies), estás dando tu consentimiento para el uso de las cookies descritas en esta política.
        </p>
        <p className="mt-4">
          Puedes retirar tu consentimiento en cualquier momento eliminando las cookies de tu navegador y configurándolo
          para que las rechace.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">6. Actualizaciones de esta Política</h2>
        <p>
          Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos
          o por otras razones operativas, legales o regulatorias. Te recomendamos revisar esta página regularmente para
          estar informado sobre nuestro uso de cookies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">7. Más Información</h2>
        <p>Si deseas obtener más información sobre las cookies y cómo gestionarlas, puedes visitar:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
          <li>
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary--500)] font-medium hover:underline"
            >
              www.allaboutcookies.org
            </a>
          </li>
          <li>
            <a
              href="https://www.youronlinechoices.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary--500)] font-medium hover:underline"
            >
              www.youronlinechoices.eu
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold  mb-4">13. Contacto</h2>
        <p>Para preguntas sobre estos Términos de Servicio, contáctanos en:</p>
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
