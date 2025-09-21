'use client';
import { useEffect, useRef, useState } from "react";
import styles from './Banner.module.scss';
import useDarkMode from "@/app/hooks/useDarkMode";
import { CallAction, Services } from "@/app/types/Services";
import { Check } from "lucide-react";


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
    list: [],
    callAction: [],
  },
  hideService = false,
  defaultCallActions = []
}: Props) {
  const { isDark } = useDarkMode();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);


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
        setTimeout(() => setAnimate(false), 600000);
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % bannerList.length;
          return nextIndex;
        });

      }, 80000);
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


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= (currentBanner?.images?.length ?? 0) ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentBanner?.images]);



  return (
    <section className={`${styles.banner} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles["banner--inner"]}>
        <div key={currentIndex} className={`${styles.banner__content} ${animate ? styles.animated : ""}`} ref={bannerContentRef}>
          <div className={styles.banner__description} ref={parallaxTextRef}>
            <div className={styles["banner__description--hero"]}>
              {currentBanner.service && !hideService && (
                <span className={styles["banner__description--hero-service"]}>
                  {currentBanner.service}
                </span>
              )}
              <h1 className={styles["banner__description--hero-title"]}>
                {currentBanner.title.main}
                <br></br>
                <span>{currentBanner.title.second}</span>
              </h1>

              <ul className={styles["banner__description--list"]}>
                {currentBanner.list?.map((item, idx) => (
                  <li key={idx} className={styles["banner__description--list-item"]}>
                    <Check className="text-green-500"></Check>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

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
          <div className={styles.banner__sliderContainer}>
            {currentBanner.images && currentBanner?.images!.map((image, index) => {
              const isActive = index === currentSlide;
              const isPrev = index === (currentSlide - 1 + currentBanner.images!.length) % currentBanner.images!.length;
              const isNext = index === (currentSlide + 1) % currentBanner.images!.length;

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
