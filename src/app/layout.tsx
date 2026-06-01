import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Velvet Kiss — Luxury Lipstick Maison de Beauté",
  description:
    "Where desire meets perfection. Velvet Kiss is a luxury lipstick house crafting bespoke beauty experiences with 24K gold-infused formulas and rare botanical extracts.",
  keywords: "luxury lipstick, beauty, velvet kiss, premium cosmetics, lip colour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="grain">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
