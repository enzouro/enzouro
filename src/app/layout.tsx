
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/global/Navbar/Navbar";
import Transition from "@/components/utils/Transition";
import SplashScreenWrapper from "@/components/splashscreen/SplashScreenWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Lorenz Mayo - Portfolio",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
          
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NavBar/>
          <Transition>{children}</Transition>

      </body>
    </html>
  );
}
