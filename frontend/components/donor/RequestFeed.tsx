"use client";

import { useState, useEffect, useCallback } from "react";
import { RequestBloodModal } from "./RequestBloodModal";
import { ShareModal } from "./ShareModal";
import { DonateModal } from "./DonateModal";

type Tab = "EMERGENCY" | "MATCHED" | "ALL";

interface Request {
    _id: string;
    type: string; // "EMERGENCY" | "ACTIVE" (mapped from urgency)
    patientName: string;
    hospitalName: string;
    unitsRequired: number;
    bloodType: string;
    urgency: string;
    contactPhone: string;
    location: {
        city: string;
    };
    createdAt: string;
}

interface RequestFeedProps {
    donor?: {
        bloodType: string | null;
    };
}

export function RequestFeed({ donor }: RequestFeedProps) {
    const [activeTab, setActiveTab] = useState<Tab>("EMERGENCY");
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [shareModalData, setShareModalData] = useState<Request | null>(null);
    const [donateModalData, setDonateModalData] = useState<Request | null>(null);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (err) {
            console.error("Failed to fetch requests", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const canGiveBlood = (donorType: string, recipientType: string) => {
        const compatibility: Record<string, string[]> = {
            "A+": ["A+", "AB+"],
            "A-": ["A+", "A-", "AB+", "AB-"],
            "B+": ["B+", "AB+"],
            "B-": ["B+", "B-", "AB+", "AB-"],
            "AB+": ["AB+"],
            "AB-": ["AB+", "AB-"],
            "O+": ["O+", "A+", "B+", "AB+"],
            "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
        };
        return compatibility[donorType]?.includes(recipientType) || false;
    };

    const filteredRequests = requests.filter((req) => {
        if (activeTab === "ALL") return true;
        if (activeTab === "EMERGENCY") return req.urgency === "EMERGENCY";
        if (activeTab === "MATCHED") {
            return donor?.bloodType ? canGiveBlood(donor.bloodType, req.bloodType) : false;
        }
        return true;
    });

    const getTimeLeft = (createdAt: string) => {
        // Mock logic for time left based on urgency
        return "2 hours";
    };

    const getDistance = (location: any) => {
        // Mock logic for distance
        return "2.5 km";
    };

    if (loading) {
        return <div className="h-64 w-full animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"></div>;
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1D3557] dark:text-[#A8DADC]">Live Requests</h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsRequestModalOpen(true)}
                        className="hidden rounded-full bg-[#E63946] px-4 py-1.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-105 sm:block"
                    >
                        + Request Blood
                    </button>
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
            </div>

            {/* Mobile Request Button */}
            <button
                onClick={() => setIsRequestModalOpen(true)}
                className="block w-full rounded-xl bg-[#E63946] py-3 text-sm font-bold text-white shadow-md sm:hidden"
            >
                + Request Blood
            </button>

            <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: "500px" }}>
                {filteredRequests.map((req) => (
                    <div
                        key={req._id}
                        className={`relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-[#1e293b] ${req.urgency === "EMERGENCY"
                                ? "border-l-4 border-[#D90429] ring-1 ring-[#D90429]/10"
                                : "border-l-4 border-[#2A9D8F]"
                            }`}
                    >
                        {req.urgency === "EMERGENCY" && (
                            <div className="absolute right-0 top-0 rounded-bl-xl bg-[#D90429] px-3 py-1 text-[10px] font-bold text-white animate-pulse">
                                URGENT • {getTimeLeft(req.createdAt)} left
                            </div>
                        )}

                        <div className="flex justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-[#1D3557] dark:text-[#A8DADC]">
                                        {req.bloodType}
                                    </span>
                                    <span className="text-sm font-medium text-[#333333] dark:text-gray-200">
                                        for {req.patientName}
                                    </span>
                                </div>
                                <p className="text-xs text-[#333333]/60 dark:text-gray-400">
                                    {req.hospitalName} • {req.location?.city || "Unknown"} • {getDistance(req.location)} away
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-[#333333]/60 dark:text-gray-400">Needs</p>
                                <p className="font-bold text-[#1D3557] dark:text-[#A8DADC]">{req.unitsRequired} Units</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setDonateModalData(req)}
                                className="flex-1 rounded-xl bg-[#1D3557] py-2 text-xs font-bold text-white transition-colors hover:bg-[#162a45] dark:bg-[#457B9D] dark:hover:bg-[#35607a]"
                            >
                                I Can Donate
                            </button>
                            <button
                                onClick={() => setShareModalData(req)}
                                className="rounded-xl border border-[#1D3557]/10 bg-gray-50 px-4 py-2 text-xs font-medium text-[#1D3557] hover:bg-gray-100 dark:border-white/10 dark:bg-[#0f172a] dark:text-gray-300 dark:hover:bg-[#1e293b]"
                            >
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

            <RequestBloodModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSuccess={fetchRequests}
            />

            <ShareModal
                isOpen={!!shareModalData}
                onClose={() => setShareModalData(null)}
                requestData={shareModalData}
            />

            <DonateModal
                isOpen={!!donateModalData}
                onClose={() => setDonateModalData(null)}
                requestData={donateModalData}
            />
        </div>
    );
}
