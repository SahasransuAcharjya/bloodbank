"use client";

import { useState } from "react";

interface RequestBloodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function RequestBloodModal({ isOpen, onClose, onSuccess }: RequestBloodModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientName: "",
        hospitalName: "",
        bloodType: "O+",
        unitsRequired: 1,
        contactPhone: "",
        city: "",
        isSOS: false,
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("jeevandhaara-token");
        if (!token) {
            alert("Please login to create a request");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    urgency: formData.isSOS ? "EMERGENCY" : "STANDARD",
                    location: {
                        city: formData.city,
                        state: "Unknown", // Default for now
                        address: formData.hospitalName,
                    }
                }),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const error = await res.json();
                alert(error.message || "Failed to create request");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1e293b]">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1D3557] dark:text-white">Request Blood</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Patient Name</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                            value={formData.patientName}
                            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Hospital Name</label>
                        <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                            value={formData.hospitalName}
                            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Type</label>
                            <select
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                                value={formData.bloodType}
                                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                            >
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Units</label>
                            <input
                                type="number"
                                min="1"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                                value={formData.unitsRequired}
                                onChange={(e) => setFormData({ ...formData, unitsRequired: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
                            <input
                                type="tel"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                                value={formData.contactPhone}
                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                            <input
                                type="text"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 focus:border-[#E63946] focus:outline-none dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                        <span className="text-sm font-bold text-[#E63946]">
                            This is an Emergency (SOS)
                        </span>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, isSOS: !formData.isSOS })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 ${formData.isSOS ? 'bg-[#E63946]' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isSOS ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-xl py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${formData.isSOS ? "bg-[#D90429] shadow-red-500/30" : "bg-[#1D3557] shadow-blue-900/30"
                            }`}
                    >
                        {loading ? "Submitting..." : formData.isSOS ? "BROADCAST SOS" : "Submit Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
