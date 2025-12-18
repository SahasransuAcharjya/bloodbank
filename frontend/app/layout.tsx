import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
        className={`${font.className} bg-[#F1FAEE] text-[#333333] antialiased dark:bg-[#0f172a] dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-[#F1FAEE] via-white to-[#E63946]/5 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
