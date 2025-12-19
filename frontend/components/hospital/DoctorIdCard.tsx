"use client";

import { useState, useEffect } from "react";
import { User, QrCode } from "lucide-react";

export function DoctorIdCard() {
    const [user, setUser] = useState<{ name: string; id: string } | null>(null);

    useEffect(() => {
        // Fetch user details for the card
        async function fetchUser() {
            const token = localStorage.getItem("jeevandhaara-token");
            if (!token) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/me`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    setUser({ name: data.name, id: data._id });
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, []);

    if (!user) return null;

    return (
        <div className="group h-56 w-full [perspective:1000px]">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* Front of Card */}
                <div className="absolute inset-0 flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1e293b] [backface-visibility:hidden]">
                    <div className="flex items-start justify-between">
                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                            {/* Placeholder Avatar */}
                            <User className="h-full w-full p-3 text-gray-400" />
                        </div>
                        <QrCode className="h-8 w-8 text-gray-800 dark:text-white" />
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {user.name}
                        </h3>
                        <p className="text-sm font-medium text-[#E63946]">
                            Chief Medical Officer
                        </p>
                        <p className="mt-1 text-xs text-gray-500 font-mono">
                            ID: {user.id.slice(-8).toUpperCase()}
                        </p>
                    </div>

                    {/* Decorative stripe */}
                    <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#E63946] to-[#457B9D] rounded-b-xl"></div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#1D3557] to-[#457B9D] p-6 text-center text-white shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="font-serif text-lg italic leading-relaxed">
                        "Wherever the art of Medicine is loved, there is also a love of Humanity."
                    </p>
                    <p className="mt-4 text-sm font-medium opacity-80">
                        — Hippocrates
                    </p>

                    <div className="mt-auto text-xs opacity-60">
                        JeevanDhaara Medical Corps
                    </div>
                </div>
            </div>
        </div>
    );
}
