import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";

// 1. Sin el "export" para que Next.js no chille en producción
const playfair = Playfair_Display({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
});

// El metadata se queda con el export porque Next.js sí lo requiere acá
export const metadata: Metadata = {
  title: "AMsolutions | Desarrollo web enfocado en resultados",
  description: "Soluciones de infraestructura digital orientadas al crecimiento y la eficiencia de su negocio."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dancing.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}