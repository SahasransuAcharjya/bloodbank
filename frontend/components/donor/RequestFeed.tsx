"use client";

import { useState, useEffect, useCallback } from "react";
import { RequestBloodModal } from "./RequestBloodModal";
import { ShareModal } from "./ShareModal";
import { DonateModal } from "./DonateModal";
import { RequestDetailsModal } from "./RequestDetailsModal";

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
        address?: string;
    };
    createdAt: string;
    status: string;
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

    // Modal States
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [shareModalData, setShareModalData] = useState<Request | null>(null);
    const [donateModalData, setDonateModalData] = useState<Request | null>(null);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests?status=OPEN`);
            if (res.ok) {
                const data = await res.json();
                console.log("RequestFeed fetched:", data);
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
        if (req.status !== "OPEN") return false;
        if (activeTab === "ALL") return true;
        if (activeTab === "EMERGENCY") return req.urgency === "EMERGENCY";
        if (activeTab === "MATCHED") {
            return donor?.bloodType ? canGiveBlood(donor.bloodType, req.bloodType) : false;
        }
        return true;
    });

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

            {/* Grid Layout for Tiles */}
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 custom-scrollbar sm:grid-cols-3 md:grid-cols-4" style={{ maxHeight: "500px" }}>
                {filteredRequests.map((req) => (
                    <button
                        key={req._id}
                        onClick={() => setSelectedRequest(req)}
                        className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md ${req.urgency === "EMERGENCY"
                            ? "bg-[#D90429] text-white"
                            : "bg-white text-[#1D3557] dark:bg-[#1e293b] dark:text-[#A8DADC]"
                            }`}
                    >
                        {req.urgency === "EMERGENCY" && (
                            <div className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-white" />
                        )}

                        <span className="text-3xl font-black tracking-tighter">
                            {req.bloodType}
                        </span>
                        <div className="flex flex-col items-center">
                            <span className={`text-xs font-medium ${req.urgency === "EMERGENCY" ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                                Needs
                            </span>
                            <span className="text-lg font-bold">
                                {req.unitsRequired} <span className="text-xs font-normal">Units</span>
                            </span>
                        </div>
                    </button>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="col-span-full py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No active requests in this category.
                    </div>
                )}
            </div>

            <RequestBloodModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSuccess={fetchRequests}
            />

            <RequestDetailsModal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                request={selectedRequest}
                onDonate={() => setDonateModalData(selectedRequest)}
                onShare={() => setShareModalData(selectedRequest)}
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
