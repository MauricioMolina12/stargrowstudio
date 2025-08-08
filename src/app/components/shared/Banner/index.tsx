'use client';
import { useEffect, useRef, useState } from "react";
import styles from './Banner.module.scss';
import useDarkMode from "@/app/hooks/useDarkMode";
import { CallAction, Services } from "@/app/types/Services";


type Props = {
  banners?: Services[];
  isDynamic?: boolean;
  fallbackBanner?: Services;
  defaultCallActions?: CallAction[]
  hideService?: boolean;
};

export default function Banner({
  banners = [],
  isDynamic = true,
  fallbackBanner = {
    icon: "",
    service: "",
    title: { main: "", second: "" },
    subtitle: "",
    image: "",
    alt: "",
    callAction: [],
  },
  hideService = false,
  defaultCallActions = []
}: Props) {
  const { isDark } = useDarkMode();

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [animate, setAnimate] = useState(false);


  const bannerContentRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const parallaxImageRef = useRef<HTMLImageElement>(null);

  const bannerList = banners.length > 0 ? banners : [fallbackBanner];
  const currentBanner = bannerList[currentIndex];


  const callActions: CallAction[] =
    currentBanner.callAction && currentBanner.callAction.length > 0
      ? currentBanner.callAction
      : defaultCallActions;

  const actionMap: Record<string, () => void> = {
    contact: () => console.log("Contacto desde banner"),
  };


  useEffect(() => {
    if (isDynamic && bannerList.length > 1) {
      intervalRef.current = setInterval(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
        setCurrentIndex((prev) => (prev + 1) % bannerList.length);
      }, 10000);
    }

    const handleParallax = () => {
      const scrollY = window.scrollY;
      parallaxTextRef.current?.style.setProperty("transform", `translateY(${scrollY * 0.1}px)`);
      parallaxImageRef.current?.style.setProperty("transform", `translateY(${scrollY * 0.05}px)`);
      bannerContentRef.current?.style.setProperty("transform", `translateY(${scrollY * 0.02}px)`);
    };

    window.addEventListener("scroll", handleParallax);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("scroll", handleParallax);
    };
  }, [isDynamic, bannerList.length]);




  return (
    <section className={`${styles.banner} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles["banner--inner"]}>
        <div key={currentIndex} className={`${styles.banner__content} ${animate ? styles.animated : ""}`} ref={bannerContentRef}>
          <div className={styles.banner__description} ref={parallaxTextRef}>
            <div className={styles["banner__description--hero"]}>
              {currentBanner.service && !hideService && (
                <span className={styles["banner__description--hero-service"]}>
                  <img
                    ref={parallaxImageRef}
                    src={currentBanner.icon}
                    alt="icono 3D"
                    className={styles["banner__icon-3d"]}
                  />
                  {currentBanner.service}
                </span>
              )}
              <h1 className={styles["banner__description--hero-title"]}>
                {currentBanner.title.main}
                <br></br>
                <span>{currentBanner.title.second}</span>
              </h1>
              <div className={styles["banner__description--buttons-call-action"]}>
                {Array.isArray(callActions) &&
                  callActions.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => actionMap[button.actionKey]?.()}
                    >
                      {button.label}
                    </button>
                  ))}
              </div>
              <p className={styles["banner__description--hero-subtitle"]}>
                {currentBanner.subtitle}
              </p>
            </div>
          </div>
          <div className={styles.banner__image}>
            <img
              src={currentBanner.image}
              alt={currentBanner.alt}
              className={styles["banner-image"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
