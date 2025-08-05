'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'; 
import "./Splash.css";

export default function SplashScreen() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="splash-container flex flex-col">
      <Image
        src="/logo.png" 
        alt="Logo"
        width={100}
        height={100}
        className="splash-logo"
      />
    </div>
  );
}
