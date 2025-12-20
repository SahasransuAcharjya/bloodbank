"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Plus } from "lucide-react";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export function TopBar() {
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);

    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("jeevandhaara-token");
            if (!token) return;

            try {
                // Fetch User
                const userRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/me`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (userRes.ok) {
                    const data = await userRes.json();
                    setUser({ name: data.name, role: "HOSPITAL" });
                }

                // Fetch Notifications
                const notifRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (notifRes.ok) {
                    const data = await notifRes.json();
                    setNotificationCount(data.length);
                }
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        }
        fetchData();
    }, []);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-[#1e293b]">
            {/* Search */}
            <div className="flex w-96 items-center rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
                <Search className="mr-2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search donors, patients, or requests..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 dark:text-white"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 rounded-lg bg-[#E63946] px-4 py-2 text-sm font-medium text-white hover:bg-[#d62828] transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Request
                </button>

                <a href="/notifications" className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                    <Bell className="h-6 w-6" />
                    {notificationCount > 0 && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {notificationCount > 9 ? "9+" : notificationCount}
                        </span>
                    )}
                </a>

                {user ? (
                    <ProfileDropdown user={user} />
                ) : (
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                )}
            </div>
        </header>
    );
}
