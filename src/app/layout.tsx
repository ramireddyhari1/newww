import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import KolamFooter from "@/components/KolamFooter";
import TempleBorder from "@/components/TempleBorder";
import MandalaPattern from "@/components/MandalaPattern";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GoldenDust from "@/components/GoldenDust";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishnavi Organics",
  description: "Pure • Natural • Farm to Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-ivory text-jaggeryBrown cursor-none`}>
        <CartProvider>
          <Preloader />
          <CustomCursor />
          <GoldenDust />
          <MandalaPattern />
          <TempleBorder>
            <PageTransition>
              {children}
            </PageTransition>
          </TempleBorder>
          <WhatsAppButton />
          <KolamFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
