'use client';

import { useEffect, useState } from "react";

type Props = {
  items?: { title: string; description: string; image: string }[];
};

const SliderProjects = ({ items = [] }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % items.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % items.length
    );
  };

  const currentBanner = items[currentIndex];

  return (
    <main className="w-full p-4 bg-[var(--color-primary)] relative overflow-hidden lg:min-h-[70vh] flex items-center">
      <button onClick={goToPrevious} className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <span className="material-symbols-outlined text-white text-5xl">arrow_back_ios</span>
      </button>

      {currentBanner && (
        <div key={currentBanner.title} className="inner w-full h-full flex flex-col lg:flex-row items-center justify-around transition-all duration-500 ease-in-out">
          <figure className="h-full w-full lg:w-1/2 flex justify-center p-4">
            <img src={currentBanner.image} alt={currentBanner.title} className="w-2/3 h-2/3 object-contain" />
          </figure>
          <div className="description flex flex-col gap-4 w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-white text-4xl font-semibold">{currentBanner.title}</h1>
            <p className="text-gray-100 max-w-[90%] mx-auto lg:mx-0">{currentBanner.description}</p>
          </div>
        </div>
      )}

      <button onClick={goToNext} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10">
        <span className="material-symbols-outlined text-white text-5xl">arrow_forward_ios</span>
      </button>

      <div className="points absolute right-1 bottom-1 h-5 flex items-center justify-between px-2 gap-2">
         {items.map((_,index)=>(
            <div className={`point w-2 h-2 bg-gray-700 rounded-[50%] ${index === currentIndex ? 'bg-white' : 'initial'}`}></div>
         ))}
      </div>
    </main>
  );
};

export default SliderProjects;
