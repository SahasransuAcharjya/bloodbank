"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BroadcastSOSProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BroadcastSOS({ isOpen, onClose }: BroadcastSOSProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bloodType, setBloodType] = useState("O-");
    const [units, setUnits] = useState(1);
    const [hospitalDetails, setHospitalDetails] = useState<{ name: string; city: string; state: string } | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchHospitalDetails();
        }
    }, [isOpen]);

    async function fetchHospitalDetails() {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setHospitalDetails({
                    name: data.name,
                    city: data.location?.city || "Unknown City",
                    state: data.location?.state || "Unknown State"
                });
            }
        } catch (err) {
            console.error("Failed to fetch hospital details", err);
        }
    }

    async function handleBroadcast() {
        setLoading(true);
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    patientName: "EMERGENCY SOS",
                    hospitalName: hospitalDetails?.name || "Emergency Hospital",
                    bloodType,
                    unitsRequired: units,
                    urgency: "EMERGENCY",
                    location: {
                        city: hospitalDetails?.city || "Unknown",
                        state: hospitalDetails?.state || "Unknown",
                        address: "Emergency Broadcast"
                    },
                    contactPhone: "911",
                    description: "CRITICAL SOS BROADCAST - IMMEDIATE ASSISTANCE REQUIRED",
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                }, 2000);
            }
        } catch (err) {
            console.error("Failed to broadcast SOS", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl dark:bg-[#1e293b]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {!success ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                    <AlertTriangle className="h-8 w-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Broadcast SOS Alert
                                </h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    This will send a high-priority notification to all nearby donors and hospitals. Use only for critical emergencies.
                                </p>

                                <div className="mt-6 w-full space-y-4">
                                    <div>
                                        <label className="mb-1 block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Blood Type Required
                                        </label>
                                        <select
                                            value={bloodType}
                                            onChange={(e) => setBloodType(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Units Needed
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={units}
                                            onChange={(e) => setUnits(parseInt(e.target.value))}
                                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <button
                                        onClick={handleBroadcast}
                                        disabled={loading}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50"
                                    >
                                        {loading ? "Broadcasting..." : "BROADCAST SOS NOW"}
                                        {!loading && <Send className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-8 text-center">
                                <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    SOS Broadcast Sent
                                </h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Help is on the way. Nearby donors have been notified.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
