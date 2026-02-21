import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UnifiedProvider from "./UnifiedProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SignEdu – Multilingual Sign Language Learning Platform",
  description:
    "SignEdu is interactive multilingual sign language learning platform using AI for real-time gesture feedback and cross-language collaboration. Break barriers in global education—start signing today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white min-h-screen`}
      >
        <main className="max-w-6xl mx-auto px-4 py-8">
          <UnifiedProvider>
            <Navbar />
            {children}
            <Footer />
          </UnifiedProvider>
        </main>
      </body>
    </html>
  );
}
