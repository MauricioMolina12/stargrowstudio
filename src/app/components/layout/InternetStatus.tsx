'use client';

import { useEffect, useState } from 'react';

export default function InternetStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showBanner, setShowBanner] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      document.body.style.overflow = "auto";
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      document.body.classList.add('opacity-50');
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.body.classList.remove('opacity-50');
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      document.body.classList.add('opacity-50');
    } else {
      document.body.classList.remove('opacity-50');
    }
  }, [isOnline]);

  if (!showBanner) return null;

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`fixed top-[40px] left-[40%] px-4 py-2 rounded-lg text-white shadow-lg transition-all
        ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {isOnline ? 'Estás conectado a Internet ✅' : 'Sin conexión ❌'}
    </div>
  );
}
