//layout.tsx

import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "modern-normalize";
import "./globals.css";

import Header from "../components/Header/Header";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Web application for car rental from RentalCar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <TanStackProvider>
          <Header />

          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
