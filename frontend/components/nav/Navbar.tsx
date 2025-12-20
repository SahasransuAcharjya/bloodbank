"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, [pathname]); // Refetch on navigation

  async function fetchNotifications() {
    const token = localStorage.getItem("jeevandhaara-token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotificationCount(data.length);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  }

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

          <Link href="/notifications" className="relative ml-2 text-[#333333]/70 hover:text-[#1D3557]">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E63946] text-[10px] font-bold text-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
