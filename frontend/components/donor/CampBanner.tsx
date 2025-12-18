"use client";

import { useState } from "react";

export function CampBanner() {
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setRegistered(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-[#1D3557] text-white shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] to-[#457B9D] opacity-90"></div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#E63946]/20 blur-xl"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
                <div className="flex-1">
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#E63946] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Upcoming Camp
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">City Center Blood Drive</h2>
                    <p className="mb-4 text-sm text-white/80">
                        Join us at the Community Hall this Saturday. Help us reach our goal of 100 units!
                    </p>

                    <div className="flex items-center gap-3 text-xs font-medium text-white/70">
                        <span className="flex items-center gap-1">
                            📅 Dec 24, 2025
                        </span>
                        <span className="flex items-center gap-1">
                            📍 Mumbai Central
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs">
                            <span>58 Registered</span>
                            <span>Goal: 100</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                            <div className="h-full w-[58%] rounded-full bg-[#E63946]"></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0">
                    {registered ? (
                        <div className="flex h-12 w-40 items-center justify-center rounded-full bg-green-500 font-bold shadow-lg">
                            ✓ Registered
                        </div>
                    ) : (
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="flex h-12 w-40 items-center justify-center rounded-full bg-white font-bold text-[#1D3557] shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70"
                        >
                            {loading ? "Registering..." : "Count Me In"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
