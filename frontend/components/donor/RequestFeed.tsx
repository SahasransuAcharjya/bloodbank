"use client";

import { useState } from "react";

type Tab = "EMERGENCY" | "MATCHED" | "ALL";

export function RequestFeed() {
    const [activeTab, setActiveTab] = useState<Tab>("EMERGENCY");

    const requests = [
        {
            id: 1,
            type: "EMERGENCY",
            patient: "Rahul Kumar",
            hospital: "Apollo Hospital",
            units: 2,
            bloodType: "O+",
            timeLeft: "2 hours",
            distance: "1.2 km",
        },
        {
            id: 2,
            type: "ACTIVE",
            patient: "Sneha Gupta",
            hospital: "City Care Clinic",
            units: 1,
            bloodType: "A-",
            distance: "3.5 km",
        },
        {
            id: 3,
            type: "ACTIVE",
            patient: "Amit Singh",
            hospital: "Fortis Hospital",
            units: 3,
            bloodType: "B+",
            distance: "5.0 km",
        },
    ];

    const filteredRequests = activeTab === "ALL"
        ? requests
        : activeTab === "EMERGENCY"
            ? requests.filter(r => r.type === "EMERGENCY")
            : requests.filter(r => r.bloodType === "O+"); // Mock matching logic

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1D3557] dark:text-[#A8DADC]">Live Requests</h3>
                <div className="flex gap-2 rounded-lg bg-white/50 p-1 dark:bg-[#1e293b]/50">
                    {(["EMERGENCY", "MATCHED", "ALL"] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${activeTab === tab
                                    ? "bg-[#1D3557] text-white shadow-sm dark:bg-[#457B9D]"
                                    : "text-[#333333]/60 hover:bg-white dark:text-gray-400 dark:hover:bg-[#1e293b]"
                                }`}
                        >
                            {tab === "EMERGENCY" ? "SOS" : tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: "500px" }}>
                {filteredRequests.map((req) => (
                    <div
                        key={req.id}
                        className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-[#1e293b] ${req.type === "EMERGENCY"
                                ? "border-l-4 border-[#D90429] ring-1 ring-[#D90429]/10"
                                : "border-l-4 border-[#2A9D8F]"
                            }`}
                    >
                        {req.type === "EMERGENCY" && (
                            <div className="absolute right-0 top-0 rounded-bl-xl bg-[#D90429] px-3 py-1 text-[10px] font-bold text-white animate-pulse">
                                URGENT • {req.timeLeft} left
                            </div>
                        )}

                        <div className="flex justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-[#1D3557] dark:text-[#A8DADC]">
                                        {req.bloodType}
                                    </span>
                                    <span className="text-sm font-medium text-[#333333] dark:text-gray-200">
                                        for {req.patient}
                                    </span>
                                </div>
                                <p className="text-xs text-[#333333]/60 dark:text-gray-400">
                                    {req.hospital} • {req.distance} away
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-[#333333]/60 dark:text-gray-400">Needs</p>
                                <p className="font-bold text-[#1D3557] dark:text-[#A8DADC]">{req.units} Units</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 rounded-xl bg-[#1D3557] py-2 text-xs font-bold text-white transition-colors hover:bg-[#162a45] dark:bg-[#457B9D] dark:hover:bg-[#35607a]">
                                I Can Donate
                            </button>
                            <button className="rounded-xl border border-[#1D3557]/10 bg-gray-50 px-4 py-2 text-xs font-medium text-[#1D3557] hover:bg-gray-100 dark:border-white/10 dark:bg-[#0f172a] dark:text-gray-300 dark:hover:bg-[#1e293b]">
                                Share
                            </button>
                        </div>
                    </div>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No active requests in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
