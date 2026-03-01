import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GridBackground from "@/components/ui/GridBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compactador de Basura Manual | Ventaja Mecánica y Sostenibilidad",
  description:
    "Proyecto de física: compactador de basura manual. Ventaja mecánica 4:1, fuerza de entrada 120 N, fuerza de salida 480 N.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.className} font-sans min-h-screen`}
      >
        <GridBackground />
        {children}
      </body>
    </html>
  );
}
