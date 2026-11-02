import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import { MeetingProvider } from "./context/MeetingContext";
import { AppProviders } from "@/providers/AppProviders";
import Footer from "./components/layout/Footer";
import InternetStatus from "./components/layout/InternetStatus";
import { ConsentProvider } from "./components/consent/ConsentProvider";
import { COOKIEYES_SCRIPT_ID, COOKIEYES_SCRIPT_URL } from "./lib/consent/consent.config";
import { getNavServices } from "@/sanity/data/services";
import type { ServiceNavGroup } from "@/sanity/types/service";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Grow Studio",
  description:
    "Star grow studio es una agencia de desarrollo, diseño y marketing digital",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

/**
 * Script inline anti-FOUC: aplica la clase `.dark` al <html> ANTES de pintar,
 * leyendo la preferencia guardada (localStorage) o la del sistema. Evita el
 * "flash de tema incorrecto" y la dependencia de `window` durante SSR.
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Servicios (padres + hijos) para el mega-menú y el footer. Vienen solo de Sanity.
  let navServices: ServiceNavGroup[] = [];
  try {
    navServices = await getNavServices();
  } catch {
    navServices = [];
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <AppProviders>
          <ConsentProvider>
            <NavBar services={navServices} />
            {children}

          {/* <div className="options-container fixed right-4 bottom-16 w-[200px] h-[200px] bg-white border border-gray-200 z-50 rounded-xl"></div>
          <button className="fixed bottom-4 right-4 bg-gray-800 w-[40px] h-[40px] rounded-full border border-gray-800 text-white cursor-pointer">
            S
          </button> */}
          
          
            <Footer services={navServices} />
          </ConsentProvider>
        </AppProviders>
        {COOKIEYES_SCRIPT_URL && (
          <Script
            id={COOKIEYES_SCRIPT_ID}
            strategy="beforeInteractive"
            src={COOKIEYES_SCRIPT_URL}
          />
        )}
        {/* <InternetStatus /> */}
      </body>
    </html>
  );
}
