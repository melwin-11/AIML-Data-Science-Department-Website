import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// If you want to use Geist fonts too
// import { GeistSans, GeistMono } from "geist/font"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIML & Data Science Department",
  description: "CHRIST (Deemed to be University) - AIML & DS Department",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
