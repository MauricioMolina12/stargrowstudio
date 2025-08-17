import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import { MeetingProvider } from "./context/MeetingContext";
import { AppProviders } from "@/providers/AppProviders";
import Footer from "./components/layout/Footer";
import InternetStatus from "./components/layout/InternetStatus";
import SplashScreen from "./components/layout/Splash/Splash";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Grow Studio",
  description:
    "Star grow studio es una agencia de desarrollo, diseño y marketing digital",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <InternetStatus />
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <AppProviders>
          <SplashScreen />
          <NavBar />
          {children}

          {/* <div className="options-container fixed right-4 bottom-16 w-[200px] h-[200px] bg-white border border-gray-200 z-50 rounded-xl"></div>
          <button className="fixed bottom-4 right-4 bg-gray-800 w-[40px] h-[40px] rounded-full border border-gray-800 text-white cursor-pointer">
            S
          </button> */}
          
          
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
