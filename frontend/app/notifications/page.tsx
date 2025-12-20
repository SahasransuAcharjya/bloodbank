"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, X, Eye, Calendar, Droplet } from "lucide-react";

interface Notification {
    _id: string;
    type: "REQUEST" | "CAMP" | "SYSTEM";
    title: string;
    message: string;
    referenceId?: string;
    isRead: boolean;
    createdAt: string;
}

export default function NotificationsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            if (!token) {
                router.push("/login");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        } finally {
            setLoading(false);
        }
    }

    async function deleteNotification(id: string) {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications((prev) => prev.filter((n) => n._id !== id));
        } catch (err) {
            console.error("Failed to delete notification", err);
        }
    }

    function handleView(notification: Notification) {
        // For now, redirect to dashboard where they can see the item
        // Ideally, we would open a specific modal or page
        if (notification.type === "REQUEST") {
            router.push("/hospital/dashboard"); // Or donor dashboard depending on role
        } else if (notification.type === "CAMP") {
            router.push("/donor/dashboard");
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F1FAEE] dark:bg-[#0f172a]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E63946] border-t-transparent"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F1FAEE] p-4 sm:p-8 dark:bg-[#0f172a]">
            <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center gap-3">
                    <Bell className="h-8 w-8 text-[#1D3557] dark:text-[#A8DADC]" />
                    <h1 className="text-2xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
                        Notifications
                    </h1>
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm dark:bg-[#1e293b] dark:text-gray-400">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className="flex items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-[#1e293b]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 rounded-full p-2 ${notification.type === "REQUEST"
                                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                        }`}>
                                        {notification.type === "REQUEST" ? (
                                            <Droplet className="h-5 w-5" />
                                        ) : (
                                            <Calendar className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {notification.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {notification.message}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleView(notification)}
                                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        title="View Details"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteNotification(notification._id)}
                                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                                        title="Remove"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
