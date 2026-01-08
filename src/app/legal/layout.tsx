import { AppProviders } from "@/providers/AppProviders";
import Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (   

    <AppProviders>
        <div className="w-full bg-[var(--primary--100)] ">
        <div className="w-full max-w-11/12 mx-auto flex items-center gap-8 px-6 py-4">
            <Link className="text-sm font-semibold" href={"/legal/privacy-policy"}>Política de privacidad</Link>
            <Link className="text-sm font-semibold" href={"/legal/terms-of-service"}>Términos de servicio</Link>
            <Link className="text-sm font-semibold" href={"/legal/cookies-policy"}>Políticas de cookies</Link>
        </div>
        </div>
        {children}
    </AppProviders>
      
  );
}