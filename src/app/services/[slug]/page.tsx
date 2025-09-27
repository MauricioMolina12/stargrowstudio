import { services } from "@/app/data/services";
import Banner from "@/app/components/shared/Banner";
import Grid from "@/app/components/shared/Grid";
import SliderAutomatic from "@/app/components/shared/SliderAutomatic";
import SliderProjects from "@/app/components/shared/SliderProjects";
import InfoCards from "@/app/components/shared/InfoCards";

export default function ServiceSlugPage({ params, }: { params: { slug: string }; }) {

  const steps = [
    {
      title: "Tecnología Flexible",
      icon: "/icons/flutter.png",
      items: [
        'Nativas o Híbridas',
        'Swift, Kotlin, Flutter, Ionic, React Native',
        'Alto Rendimiento',
        'Asesoría Técnica'
      ]
    },
    {
      title: "Diseños Únicos",
      icon: "/icons/pencil.gif",
      items: [
        'UI/UX intuitivo',
        'Diseño Prototipos',
        'Tests con usuarios',
        'Animaciones fluidas'
      ]
    },
    {
      title: "Soporte Continuo",
      icon: "/icons/settings.gif",
      items: [
        'Mantenimiento',
        'Actualizaciones',
        'Escalabilidad',
        'Seguridad Eficaz'
      ]
    },
  ]



  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return <h1>Servicio no encontrado</h1>;
  }

  return (
    <>
      <main className="w-full flex flex-col gap-16">
        <div className="banner-wrapper">
          <Banner hideService banners={[service]} />
          <aside className="w-full h-5 bg-[var(--color-primary)] my-4 py-6 flex gap-2 items-center justify-center text-white text-[1.2rem]">
            <span>{service.service}</span>
          </aside>
        </div>
        <Grid showMeetingCall={false} title={{ main: 'brillar', left: 'Ventajas que harán', right: 'tu app' }} subtitle="Cómo conectamos" >
          <InfoCards cards={steps} showSteps={false} />
        </Grid>

        {/* Techs */}
        {service.techs && (
          <div className="w-full">
            <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
              <span className="text-[var(--color-primary-to-white)]">Adaptamos la tecnología a tu proyecto, no al reves.</span>
              <h2 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">Nuestras tecnologías</h2>
            </aside>
            <SliderAutomatic items={service.techs}></SliderAutomatic>
          </div>
        )}

        {service.projects && (
          <section className="w-full min-h-[100vh]">
            {/* <aside className="w-full h-1/2 flex flex-col items-center justify-center gap-2.5 p-4 parallax">
              <span className="text-[var(--color-primary-to-white)]">Tu app empresarial, como la imaginaste</span>
              <h2 className="text-3xl text-center font-bold lg:w-[70%] lg:text-4xl">Software personalizado para tu negocio</h2>
            </aside> */}
            <SliderProjects items={service.projects} />
          </section>
        )}
      </main>

    </>
  );
}
