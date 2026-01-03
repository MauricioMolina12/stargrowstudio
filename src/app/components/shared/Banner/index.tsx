'use client';
import { useEffect, useRef, useState } from "react";
import useDarkMode from "@/app/hooks/useDarkMode";
import { Check } from "lucide-react";
import { CallAction, BannerTypes } from "@/app/types/banner";
import { urlFor } from "@/sanity/lib/image";
import { actionMap } from "@/app/utils/functions/actionMap";

type Props = {
  banners?: BannerTypes | BannerTypes[];
  bgColor?: string;
};


export default function Banner({
  banners = [],
  bgColor = ''
}: Props) {
  const { isDark } = useDarkMode();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);


  const bannerContentRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const parallaxImageRef = useRef<HTMLImageElement>(null);

  const bannerList: BannerTypes[] = Array.isArray(banners) ? banners.length > 0 ? banners : [] : banners ? [banners] : [];

  const currentBanner = bannerList[currentIndex];
  const resolvedBgColor = bgColor ? bgColor : currentBanner?.bgColor;
  const isPrimaryBg = resolvedBgColor?.trim().toLowerCase() === "#5656b5";
  const textColor = isPrimaryBg ? "#ffffff" : "#5656B5";



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= (currentBanner?.images?.length ?? 0) ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [currentBanner?.images]);

  useEffect(() => {
    if (bannerList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerList.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [bannerList.length]);


  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    if (currentBanner.animationTitle) {
      setAnimateTitle(false);
      const timeout = setTimeout(() => setAnimateTitle(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentBanner.animationTitle]);


  return (
    <section
      className={`w-full h-full relative overflow-hidden flex flex-col justify-center gap-[30px] ${isDark ? 'dark-theme-styles' : 'light-theme-styles'}`}
      style={{
        background: resolvedBgColor,
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div
        className={`absolute left-0 top-0 w-full h-full pointer-events-none z-0 ${isDark ? 'opacity-100 blur-0 bg-transparent' : 'filter blur-[1000px]'}`}
      />

      <div className="w-full h-full relative overflow-hidden">
        {bannerList.map((banner, index) => (
          <div
            key={index}
            className={`
              absolute inset-0
              transition-all duration-[900ms]
              ease-[cubic-bezier(0.4,0,0.2,1)]
              will-change-[opacity,transform,filter]

              ${index === currentIndex
                ? 'opacity-100 scale-100 blur-0 z-20'
                : 'opacity-0 scale-[0.96] blur-[2px] z-10 pointer-events-none'}
            `}
          >

            <div
              className={`w-full h-full flex flex-col justify-center z-10 relative py-[14px] md:p-[15px] lg:flex-row lg:items-center lg:pl-[30px] xl:p-0 xl:w-full transition-transform duration-200 ease-out will-change-transform`}
              ref={index === currentIndex ? bannerContentRef : null}
            >
              <div
                className="w-full h-fit flex flex-col items-center justify-center gap-[10px] lg:h-full lg:w-1/2 xl:justify-stretch xl:pl-[12px] transition-transform duration-200 ease-out will-change-transform"
                ref={index === currentIndex ? parallaxTextRef : null}
              >
                <div className="py-[10px] flex flex-col items-center justify-center gap-[25px] text-center md:items-start md:text-start md:p-[12px] xl:h-full xl:items-start xl:pl-[6%]">

                  <h1
                    className={`font-light px-[10px] max-w-[90%] leading-[35px] text-2xl lg:text-4xl md:p-0 lg:max-w-[80%] lg:leading-[50px] text-start xl:px-0 xl:max-w-full 2xl:leading-[50px] ${banner.animationTitle ? 'inline-block' : ''} ${isDark ? 'dark:text-[var(--color-yellow)]' : ''}`}
                    style={{ color: textColor }}
                  >
                    <span
                      className={`title ${banner.animationTitle && index === currentIndex ? 'animate-[fadeUp_0.8s_forwards]' : ''} ${isDark ? 'dark:text-[var(--color-white)]' : ''}`}
                      style={{ color: textColor }}
                    >
                      {banner?.title.main}
                    </span>

                    {banner?.title.optional && (
                      <br />
                    )}

                    {banner?.title.optional && (
                      <span
                        className={`title inline-block ${banner.animationTitle && index === currentIndex ? 'opacity-0 translate-x-[-30%] animate-[fadeUp_0.8s_forwards] [animation-delay:1.5s]' : ''} ${isDark ? 'dark:text-[var(--color-white)]' : ''}`}
                        style={{ color: textColor }}
                      >
                        {banner.title.optional}
                      </span>
                    )}
                    <br />
                    <span
                      className={`font-bold inline-block ${banner.animationTitle && index === currentIndex ? 'opacity-0 translate-x-[-30%] animate-[fadeUp_0.8s_forwards] [animation-delay:2.5s]' : ''} ${isDark ? 'dark:text-[var(--color-white)]' : ''}`}
                      style={{ color: textColor }}
                    >
                      {banner?.title.second}
                    </span>
                  </h1>

                  {banner.list && (
                    <ul className="flex flex-col">
                      {banner.list?.map((item, idx) => (
                        <li key={idx} className={`flex items-center gap-[10px] my-[5px] text-[clamp(14px,1vw,16px)] ${isPrimaryBg ? 'text-[var(--color-white)]' : 'text-[var(--color-dark)]'} sm:text-[clamp(12px,1vw,14px)]`}>
                          <Check className="text-green-500 text-[clamp(12px,1vw,14px)]"></Check>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {banner.callAction && (
                    <div className="flex w-full px-6 lg:px-0 items-center gap-[10px]">
                      <button
                        key={index}
                        onClick={() => {
                          const actionFn = banner.callAction?.actionKey ? actionMap[banner.callAction.actionKey] : undefined;
                          if (actionFn) actionFn();
                        }}
                        className="p-[14px] w-full lg:w-fit rounded-[10px] outline-none border-none cursor-pointer bg-[#5656b5] text-[#fff]"
                      >
                        {banner.callAction.label}
                      </button>
                    </div>
                  )}

                  {banner.subtitle && (
                    <p className={`max-w-[90%] text-start px-[10px] lg:px-0 fs-14 xl:text-start ${isPrimaryBg ? 'text-white' : 'text-gray-500'}`}>
                      {banner.subtitle}
                    </p>
                  )}

                </div>
              </div>

              
              <div className="relative overflow-hidden lg:w-1/2 lg:h-full h-1/2 flex items-center justify-center">

                {banner.images && banner?.images!.map((image, index) => {
                  const isActive = index === currentSlide;
                  const isPrev = index === (currentSlide - 1 + banner.images!.length) % banner.images!.length;
                  const isNext = index === (currentSlide + 1) % banner.images!.length;

                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-600 ease-in opacity-0 flex justify-center lg:block

                          ${isActive ? 'opacity-100 translate-x-0 lg:translate-x-0 lg:translate-y-0 scale-100 z-30' : ''}
                          
                          ${isPrev ? 'opacity-80 translate-x-[-100%] lg:translate-x-0 lg:translate-y-[-100%] scale-90 z-20' : ''}
      
                          ${isNext ? 'opacity-80 translate-x-[100%] lg:translate-x-0 lg:translate-y-[100%] scale-90 z-20' : ''}`}>
                            
                      <div className="relative w-full max-w-[90%] aspect-[16/9] rounded-[14px] overflow-hidden mb-4">
                        <img
                          src={typeof image === 'string' ? image : urlFor(image).width(1200).url()}
                          alt={banner.title?.main || 'Banner image'}
                          className="object-cover rounded-[10px]"
                        />
                      </div>
                    </div>
                  );

                })}

                {banner.image && (
                  <div className="h-full p-6 flex items-center justify-center rounded-[10px]">
                    <img
                      src={typeof banner.image === 'string' ? banner.image : urlFor(banner.image).width(1200).url()}
                      alt={banner.title?.main || 'Banner image'}
                      className="lg:max-w-[90%] lg:h-[90%] object-contain rounded-[10px]"
                      ref={index === currentIndex ? parallaxImageRef : null}
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}