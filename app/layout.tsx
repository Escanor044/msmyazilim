import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieConsent } from "@/components/ui/cookie-consent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MSM Yazılım - Metin2 Server Files ve Sistemleri",
  description: "Premium Metin2 server files, sistemler, kurulum ve destek hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={cn(inter.variable, "font-sans min-h-screen bg-background text-foreground")}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
