"use client";

import { useState } from "react";

interface HeroStatsProps {
    donor: {
        name: string;
        bloodType: string | null;
        totalDonations: number;
        lastDonationDate?: string;
    };
}

export function HeroStats({ donor }: HeroStatsProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {/* Digital Blood Card */}
            <div
                className="group relative h-48 w-full cursor-pointer perspective-1000"
                onClick={() => setFlipped(!flipped)}
            >
                <div
                    className={`relative h-full w-full transition-all duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""
                        }`}
                >
                    {/* Front */}
                    <div className="absolute h-full w-full backface-hidden rounded-2xl bg-gradient-to-br from-[#E63946] to-[#D62828] p-6 text-white shadow-xl">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-medium opacity-80">BLOOD DONOR CARD</p>
                                    <h3 className="text-lg font-bold">{donor.name}</h3>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                    <span className="text-xl font-bold">
                                        {donor.bloodType || "?"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs opacity-80">ID NUMBER</p>
                                    <p className="font-mono text-sm">JD-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs opacity-80">Valid Thru</p>
                                    <p className="font-mono text-sm">12/30</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute h-full w-full rotate-y-180 backface-hidden rounded-2xl bg-[#1D3557] p-6 text-white shadow-xl">
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <div className="h-24 w-24 bg-white p-1 rounded-lg">
                                {/* Placeholder for QR Code */}
                                <div className="h-full w-full bg-black/10 flex items-center justify-center text-black text-xs text-center">
                                    QR Code
                                </div>
                            </div>
                            <p className="text-xs opacity-70">Scan for quick check-in</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-[#E63946]">
                        {donor.totalDonations * 3}
                    </p>
                    <p className="text-xs text-[#333333]/60 dark:text-gray-400">Lives Impacted</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
                        {(donor.totalDonations * 0.45).toFixed(1)}L
                    </p>
                    <p className="text-xs text-[#333333]/60 dark:text-gray-400">Volume Donated</p>
                </div>
            </div>
        </div>
    );
}
