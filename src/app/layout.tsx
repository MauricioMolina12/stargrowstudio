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
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
