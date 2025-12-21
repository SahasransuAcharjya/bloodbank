"use client";

import { useState } from "react";
import { X, Calendar, MapPin, Clock, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateCampModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CreateCampModal({ isOpen, onClose, onSuccess }: CreateCampModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        city: "",
        state: "",
        address: "",
        targetUnits: 100,
        organizerName: "Hospital Name", // Should be fetched/autofilled
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const userStr = localStorage.getItem("jeevandhaara-user");
            const user = userStr ? JSON.parse(userStr) : null;

            if (user && user.role !== "HOSPITAL" && user.role !== "ADMIN") {
                alert(`You are currently logged in as a ${user.role}. Only HOSPITAL or ADMIN accounts can create camps.`);
                setLoading(false);
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    location: {
                        city: formData.city,
                        state: formData.state,
                        address: formData.address,
                    },
                }),
            });

            if (res.ok) {
                onSuccess?.();
                onClose();
                // Reset form
                setFormData({
                    name: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    city: "",
                    state: "",
                    address: "",
                    targetUnits: 100,
                    organizerName: "Hospital Name",
                });
            } else {
                const error = await res.json();
                alert(error.message || "Failed to create camp");
            }
        } catch (err) {
            console.error(err);
            alert("Error creating camp");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl dark:bg-[#1e293b]"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Schedule Blood Camp
                            </h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Camp Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. City Center Blood Drive"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Organizer Name
                                    </label>
                                    <input
                                        required
                                        name="organizerName"
                                        value={formData.organizerName}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <input
                                            required
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 pl-9 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Start Time
                                    </label>
                                    <input
                                        required
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        End Time
                                    </label>
                                    <input
                                        required
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    <MapPin className="h-4 w-4" /> Location Details
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        required
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <input
                                        required
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <input
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Full Address / Venue"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Target Units
                                </label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        required
                                        type="number"
                                        name="targetUnits"
                                        value={formData.targetUnits}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 pl-9 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-[#E63946] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#d62839] focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50"
                            >
                                {loading ? "Scheduling..." : "Schedule Camp"}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
