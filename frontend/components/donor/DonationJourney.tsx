"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Clock, Calendar } from "lucide-react";

interface JourneyStep {
    status: "completed" | "current" | "upcoming";
    title: string;
    time: string;
    desc?: string;
}

export function DonationJourney() {
    const [steps, setSteps] = useState<JourneyStep[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const token = localStorage.getItem("jeevandhaara-token");
                if (!token) return;

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/donors/history`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const history = await res.json();
                    // Logic to build journey from history
                    // Assuming history is sorted by date desc
                    const latestDonation = history[0];

                    const newSteps: JourneyStep[] = [];

                    if (latestDonation) {
                        const donationDate = new Date(latestDonation.date);
                        newSteps.push({
                            status: "completed",
                            title: "Last Donation",
                            time: donationDate.toLocaleDateString(),
                            desc: "Thank you for saving a life!",
                        });

                        // Certificate (Mock logic: available if completed)
                        newSteps.push({
                            status: "current",
                            title: "Certificate Available",
                            time: "Ready",
                            desc: "Download from profile",
                        });

                        // Next Eligible Date (3 months later)
                        const nextDate = new Date(donationDate);
                        nextDate.setMonth(nextDate.getMonth() + 3);
                        newSteps.push({
                            status: "upcoming",
                            title: "Next Eligible Date",
                            time: nextDate.toLocaleDateString(),
                            desc: "Recovery period",
                        });
                    } else {
                        // No history
                        newSteps.push({
                            status: "current",
                            title: "Ready to Donate",
                            time: "Today",
                            desc: "Find a camp or hospital nearby",
                        });
                    }
                    setSteps(newSteps);
                }
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    if (loading) {
        return <div className="h-40 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"></div>;
    }

    return (
        <div className="glass-card p-5">
            <h3 className="mb-4 text-sm font-bold text-[#1D3557] dark:text-[#A8DADC]">My Journey</h3>
            <div className="relative border-l-2 border-[#1D3557]/10 ml-2 space-y-6 pl-6 dark:border-white/10">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div
                            className={`absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-white shadow-sm dark:border-[#1e293b] ${step.status === "completed"
                                    ? "bg-[#2A9D8F]"
                                    : step.status === "current"
                                        ? "bg-[#E63946] ring-4 ring-[#E63946]/20"
                                        : "bg-gray-300 dark:bg-gray-600"
                                }`}
                        ></div>
                        <h4
                            className={`text-sm font-semibold ${step.status === "upcoming"
                                    ? "text-gray-400 dark:text-gray-500"
                                    : "text-[#1D3557] dark:text-gray-200"
                                }`}
                        >
                            {step.title}
                        </h4>
                        <p className="text-xs text-[#333333]/60 dark:text-gray-400">{step.time}</p>
                        {step.desc && (
                            <p className="mt-1 text-xs text-[#333333]/50 dark:text-gray-500">{step.desc}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
