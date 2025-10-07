'use client';
import { useEffect, useState } from 'react';
import './Splash.css';

export default function SplashScreen() {
  const [hide, setHide] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setShowText(true), 3800)); // texto aparece más tarde
    timers.push(setTimeout(() => setFadeOut(true), 6200));  // empieza a desvanecerse
    timers.push(setTimeout(() => setHide(true), 7500));     // oculta splash

    return () => timers.forEach(clearTimeout);
  }, []);

  if (hide) return null;

  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="logo-wrapper">
        <svg
          id="Capa_1"
          data-name="Capa 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 360.86 382.95"
          className="animated-logo"
        >
          <path
            className="logo-path"
            d="m360.86,63.73V17.99c0-9.93-8.05-17.99-17.99-17.99H80.16C35.89,0,0,35.89,0,80.16v222.63
              c0,44.27,35.89,80.16,80.16,80.16h0c28.38,0,55.87-9.9,77.73-27.99l127.06-105.14v67.41l75.91.57V115h-206.2v82.14h62.88
              l-117.05,87.54c-7.33,5.48-17.78.25-17.78-8.91V101.63c0-10.15,8.2-18.4,18.35-18.47l241.95-1.48
              c9.87-.06,17.85-8.08,17.85-17.96Z"
          />
        </svg>

        {showText && <h1 className="studio-text">Star Grow Studio</h1>}
      </div>
    </div>
  );
}
