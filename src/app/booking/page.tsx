'use client';

import { useEffect, useState } from "react";

export default function Booking() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f8fa] flex flex-col items-center px-4 py-12">
      
      {/* Header de la página */}
      <section className="max-w-3xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold">Agenda una reunión</h1>
        <p className="text-gray-600 mt-2">
          Cuéntanos sobre tu proyecto y encontremos la mejor solución para ti.
        </p>
      </section>

      {/* Card del calendario */}
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-sm overflow-hidden relative">
        
        {!isOnline && (
          <div className="h-[500px] flex items-center justify-center px-6 text-center">
            <p className="text-gray-500">
              No hay conexión a internet. Verifica tu red para continuar.
            </p>
          </div>
        )}

        {isOnline && (
          <div className="relative h-[650px]">
            <iframe
              src="https://calendly.com/molinamau37/nueva-reunion?primary_color=5656b5"
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              onLoad={() => setIsLoading(false)}
              style={{
                opacity: isLoading ? 0 : 1,
                pointerEvents: isLoading ? "none" : "auto",
                transition: "opacity 0.3s ease-in-out",
              }}
            />

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
