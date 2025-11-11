import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvestIQ",
  description:
    "Track real-time stock prices, get personalized alerts, and explore detailed company insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-neutral-100 antialiased min-h-screen`}
      >
        {/* Global Header */}
        <Header />

        {/* Page content */}
        <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
