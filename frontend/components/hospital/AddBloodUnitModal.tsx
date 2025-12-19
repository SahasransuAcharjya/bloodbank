"use client";

import { useState } from "react";
import { X, Droplet, Calendar } from "lucide-react";
import { clsx } from "clsx";

interface AddBloodUnitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function AddBloodUnitModal({ isOpen, onClose, onSuccess }: AddBloodUnitModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bloodType: "A+",
        volumeML: 450,
        expiryDate: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/inventory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onClose();
                if (onSuccess) onSuccess();
                // Reset form
                setFormData({
                    bloodType: "A+",
                    volumeML: 450,
                    expiryDate: "",
                });
            } else {
                console.error("Failed to add blood unit");
                alert("Failed to add blood unit");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#1e293b]">
                {/* Header */}
                <div className="relative bg-[#E63946] p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full bg-white/20 p-1 hover:bg-white/30"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white/20 p-2">
                            <Droplet className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Add Blood Unit</h2>
                            <p className="text-sm text-white/80">Register new inventory</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Blood Type
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {BLOOD_TYPES.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, bloodType: type })}
                                    className={clsx(
                                        "rounded-lg border py-2 text-sm font-medium transition-colors",
                                        formData.bloodType === type
                                            ? "border-[#E63946] bg-[#E63946] text-white"
                                            : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Volume (mL)
                        </label>
                        <input
                            type="number"
                            required
                            value={formData.volumeML}
                            onChange={(e) => setFormData({ ...formData, volumeML: Number(e.target.value) })}
                            className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Expiry Date
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                required
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full rounded-xl bg-[#E63946] py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? "Adding..." : "Add to Inventory"}
                    </button>
                </form>
            </div>
        </div>
    );
}
