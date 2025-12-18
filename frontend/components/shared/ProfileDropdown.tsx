"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface ProfileDropdownProps {
    user: {
        name: string;
        role: string;
    };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jeevandhaara-token");
        router.push("/login");
    };

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const profileLink = user.role === "HOSPITAL" ? "/hospital/profile" : "/donor/profile";

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D3557] text-sm font-bold text-white shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 dark:bg-[#457B9D]"
            >
                {initials}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dark:bg-[#1e293b] dark:ring-white/10">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-[#1D3557] truncate dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">{user.role}</p>
                    </div>

                    <div className="py-1">
                        <Link
                            href={profileLink}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Edit Profile
                        </Link>

                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <span>Options</span>
                            <span className="text-xs text-gray-400">{showOptions ? "▲" : "▼"}</span>
                        </button>

                        {showOptions && (
                            <div className="bg-gray-50 py-1 dark:bg-[#0f172a]">
                                <button
                                    onClick={toggleTheme}
                                    className="block w-full px-8 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                >
                                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                                </button>
                                <button className="block w-full px-8 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                                    User Agreement
                                </button>
                                <button className="block w-full px-8 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                                    Support
                                </button>
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left text-sm text-[#E63946] hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
