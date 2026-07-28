import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import { MeetingProvider } from "./context/MeetingContext";
import { AppProviders } from "@/providers/AppProviders";
import Footer from "./components/layout/Footer";
import InternetStatus from "./components/layout/InternetStatus";
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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <AppProviders>
          <NavBar services={navServices} />
          {children}

          {/* <div className="options-container fixed right-4 bottom-16 w-[200px] h-[200px] bg-white border border-gray-200 z-50 rounded-xl"></div>
          <button className="fixed bottom-4 right-4 bg-gray-800 w-[40px] h-[40px] rounded-full border border-gray-800 text-white cursor-pointer">
            S
          </button> */}
          
          
          <Footer services={navServices} />
        </AppProviders>
        <InternetStatus />
      </body>
    </html>
  );
}
