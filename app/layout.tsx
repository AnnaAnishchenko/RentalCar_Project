import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "modern-normalize";
import "../styles/globals.css";

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
  keywords: ["rental car", "car rent", "cars"],

  icons: {
    icon: "/icon.png",
  },
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
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
