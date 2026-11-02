'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Banner.module.scss';
import { Check } from "lucide-react";

const WHATSAPP_NUMBER = "573003856084";

/* ─────────────────────────────────────────────
   Single banner data – one slide with hero content
   ───────────────────────────────────────────── */
const SINGLE_BANNER = {
  title: {
    main: "El crecimiento que buscas",
    second: "empieza con tecnología que transforma",
  },
  images: [
    "/img/hero-banner/desarrollo/website-business.jpg",
    "/img/hero-banner/desarrollo/ecommerce.png",
    "/img/hero-banner/analisis-de-datos/dashboard-graphs.jpg",
    "/img/hero-banner/desarrollo/watch.png",
  ],
  list: [
    "Calidad garantizada en cada proyecto",
    "Soporte técnico continuo y personalizado",
    "Tecnologías modernas, escalables y seguras",
    "Resultados medibles orientados a tu crecimiento",
  ],
};

/* Nombres de servicios que rotan en el badge */
const SERVICE_NAMES = [
  "Desarrollo Web",
  "Apps Móviles",
  "Diseño UI/UX",
  "Consultoría Digital",
  "Marketing Online",
];

/* ─────────────────────────────────────────────
   Props (mantenemos la interfaz para no romper
   posibles usos externos, pero internamente
   ignoramos banners y usamos el dato fijo)
   ───────────────────────────────────────────── */
type Props = {
  banners?: never[];
  services?: unknown[];
  isDynamic?: boolean;
  fallbackBanner?: never;
  defaultCallActions?: never[];
  hideService?: boolean;
};

export default function Banner({}: Props) {
  const router = useRouter();

  /* ── Imágenes: carrusel (misma animación) ── */
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ── Badge de servicios: animación rotativa ── */
  const [serviceIndex, setServiceIndex] = useState(0);
  const [serviceVisible, setServiceVisible] = useState(true);

  /* ── Refs ── */
  const sliderRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);

  /* ─────────────────────────────────────────────
     Ciclo del badge – cambia cada 4 s con fade
     ───────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceVisible(false);               // desaparece
      setTimeout(() => {                       // cambia texto
        setServiceIndex((prev) => (prev + 1) % SERVICE_NAMES.length);
        setServiceVisible(true);               // aparece
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ─────────────────────────────────────────────
     Carrusel de imágenes (misma lógica original)
     ───────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= SINGLE_BANNER.images.length ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ─────────────────────────────────────────────
     Parallax en scroll
     ───────────────────────────────────────────── */
  useEffect(() => {
    const handleParallax = () => {
      const scrollY = window.scrollY;
      parallaxTextRef.current?.style.setProperty(
        "transform",
        `translateY(${scrollY * 0.1}px)`
      );
      bannerContentRef.current?.style.setProperty(
        "transform",
        `translateY(${scrollY * 0.02}px)`
      );
    };
    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  /* ─────────────────────────────────────────────
     CTA – Cotizar
     ───────────────────────────────────────────── */
  const requestQuote = () => {
    const text =
      "Hola Star Grow Studio 👋, quiero impulsar mi empresa con transformación digital y solicitar una cotización.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  return (
    <section className={styles.banner}>
      <div className={styles["banner--inner"]}>
        <div className={styles.banner__content} ref={bannerContentRef}>
          {/* ── Texto / Hero ── */}
          <div className={styles.banner__description} ref={parallaxTextRef}>
            <div className={styles["banner__description--hero"]}>
              {/* Badge animado con nombres de servicio */}
              <span
                className={`${styles["banner__description--hero-service"]} ${
                  serviceVisible
                    ? styles["badge-visible"]
                    : styles["badge-hidden"]
                }`}
              >
                {SERVICE_NAMES[serviceIndex]}
              </span>

              {/* Título con dos colores (main / second) */}
              <h1 className={styles["banner__description--hero-title"]}>
                <span>{SINGLE_BANNER.title.main}</span>
                <br />
                <span>{SINGLE_BANNER.title.second}</span>
              </h1>

              {/* Lista de calidad / garantía */}
              {SINGLE_BANNER.list && (
                <ul className={styles["banner__description--list"]}>
                  {SINGLE_BANNER.list.map((item, idx) => (
                    <li
                      key={idx}
                      className={styles["banner__description--list-item"]}
                    >
                      <Check className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Botones CTA */}
              <div
                className={styles["banner__description--buttons-call-action"]}
              >
                <button type="button" onClick={requestQuote}>
                  Solicitar cotización
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/cotizar")}
                >
                  Agendar reunión
                </button>
              </div>
            </div>
          </div>

          {/* ── Carrusel de imágenes (mismo estilo) ── */}
          <div className={styles.banner__sliderContainer} ref={sliderRef}>
            {SINGLE_BANNER.images.map((image, index) => {
              const isActive = index === currentSlide;
              const isPrev =
                index ===
                (currentSlide - 1 + SINGLE_BANNER.images.length) %
                  SINGLE_BANNER.images.length;
              const isNext =
                index ===
                (currentSlide + 1) % SINGLE_BANNER.images.length;

              return (
                <div
                  key={index}
                  className={`${styles.banner__slide} 
                    ${isActive ? styles.active : ""} 
                    ${isPrev ? styles.prev : ""} 
                    ${isNext ? styles.next : ""}`}
                >
                  <img src={image} alt={`imagen-${index}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}