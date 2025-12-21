"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FlaskConical,
    Users,
    ClipboardList,
    Tent,
    Settings
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { label: "Dashboard", href: "/hospital/dashboard", icon: LayoutDashboard },
    { label: "Inventory", href: "/hospital/inventory", icon: FlaskConical },
    { label: "Donors", href: "/hospital/donors", icon: Users },
    { label: "Requests", href: "/hospital/requests", icon: ClipboardList },
    { label: "Camps", href: "/hospital/camps", icon: Tent },
    { label: "Settings", href: "/hospital/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-[#1e293b]">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
                    <span className="text-xl font-bold text-[#E63946]">JeevanDhaara</span>
                    <span className="ml-2 text-xs font-medium text-gray-500">Hospital</span>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[#E63946]/10 text-[#E63946]"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>


            </div>
        </aside>
    );
}
