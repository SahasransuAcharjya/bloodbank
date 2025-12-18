"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/donor/dashboard", label: "Donor" },
    { href: "/hospital/dashboard", label: "Hospital" },
    { href: "/panel", label: "Admin" },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-white/60 bg-[#F1FAEE]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-sm font-semibold text-[#1D3557]"
        >
          Jeevan<span className="text-[#E63946]">Dhaara</span>
        </Link>
        <div className="flex gap-4 text-xs sm:text-sm">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-[#1D3557] font-medium"
                    : "text-[#333333]/70 hover:text-[#1D3557]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
