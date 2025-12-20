"use client";

import { X, MapPin, Building2, User, Phone, Clock, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";

interface RequestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: any; // Using any for now to match existing types, ideally should be shared interface
    onDonate: () => void;
    onShare: () => void;
}

export function RequestDetailsModal({ isOpen, onClose, request, onDonate, onShare }: RequestDetailsModalProps) {
    if (!isOpen || !request) return null;

    const isUrgent = request.urgency === "EMERGENCY";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#1e293b]">
                {/* Header */}
                <div className={clsx(
                    "relative p-6 text-white",
                    isUrgent ? "bg-[#D90429]" : "bg-[#1D3557]"
                )}>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full bg-white/20 p-1 hover:bg-white/30"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold backdrop-blur-sm">
                            {request.bloodType}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Blood Request</h2>
                            <p className="text-white/80">
                                {request.unitsRequired} Units Required
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {isUrgent && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="font-medium">Urgent Request - Patient needs blood immediately</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <User className="mt-1 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient Name</p>
                                <p className="text-gray-900 dark:text-white">{request.patientName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Building2 className="mt-1 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hospital</p>
                                <p className="text-gray-900 dark:text-white">{request.hospitalName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                                <p className="text-gray-900 dark:text-white">
                                    {request.location?.city || "Unknown City"}
                                    {request.location?.address && `, ${request.location.address}`}
                                </p>
                            </div>
                        </div>

                        {request.contactPhone && (
                            <div className="flex items-start gap-3">
                                <Phone className="mt-1 h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</p>
                                    <p className="text-gray-900 dark:text-white">{request.contactPhone}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => {
                                onDonate();
                                onClose();
                            }}
                            className="flex-1 rounded-xl bg-[#1D3557] py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-[#457B9D]"
                        >
                            I Can Donate
                        </button>
                        <button
                            onClick={() => {
                                onShare();
                                onClose();
                            }}
                            className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
