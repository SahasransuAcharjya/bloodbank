import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JeevanDhaara – Blood Donation Platform",
  description: "Find blood, donate safely, and save lives in your city.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#F1FAEE] text-[#333333] antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-[#F1FAEE] via-[#F1FAEE] to-white">
          {children}
        </div>
      </body>
    </html>
  );
}
