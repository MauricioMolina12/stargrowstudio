import { AppProviders } from "@/providers/AppProviders";
import { ChevronRight } from "lucide-react";

import Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (   

    <AppProviders>
        <div className="w-full bg-[var(--primary--100)] ">
          <div className="w-full max-w-11/12 mx-auto flex items-center gap-4 justify-between sm:justify-start sm:gap-8 px-2 md:px-6 py-4 text-[12px] sm:text-sm  leading-tight">
              <Link className="font-semibold" href={"/legal/privacy-policy"}>Política de privacidad</Link>
              <Link className="font-semibold" href={"/legal/terms-of-service"}>Términos de servicio</Link>
              <Link className="font-semibold" href={"/legal/cookies-policy"}>Políticas de cookies</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center border-t border-gray-200 gap-3 lg:gap-5 p-3 lg:p-5">
          <aside className="p-4 max-w-md bg-white sticky top-20 h-fit rounded-lg hidden md:block shadow-md">
            <ul className="space-y-2">
              <li className={`cursor-pointer text-sm p-1 hover:bg-gray-200 transition text-[var(--color-primary)] font-semibold border-b-2 border-b-[var(--color-primary)]`}>
                Introduccion
              </li>
              <li className={`cursor-pointer text-sm p-1 hover:bg-gray-200 transition`}>
                Informacion que recopilamos
              </li>
              <li className={`cursor-pointer text-sm p-1 hover:bg-gray-200 transition`}>
                Uso de la Informacion
              </li>
              {/* {items.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-sm p-2 hover:bg-gray-200 transition ${activeIndex === index ? "text-[var(--color-primary)] font-semibold border-b-2 border-b-[var(--color-primary)]" : "text-black"
                    }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.title}
                </li>
              ))} */}
            </ul>
          </aside>
          {children}
        </div>
        <div className="fixed left-0 top-[50%] md:hidden">
          <button className="bg-[var(--color-primary)] text-white p-2 rounded-r-lg shadow-lg">
            <ChevronRight  size={19}/>
          </button>
        </div>
    </AppProviders>
      
  );
}