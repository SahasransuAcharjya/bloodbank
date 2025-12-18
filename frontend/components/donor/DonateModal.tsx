"use client";

import { Phone, X, HeartHandshake } from "lucide-react";

interface DonateModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestData: any;
}

export function DonateModal({ isOpen, onClose, requestData }: DonateModalProps) {
    if (!isOpen || !requestData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1e293b]">
                <div className="mb-4 flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#E63946]">
                        <HeartHandshake className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1D3557] dark:text-white">You're a Hero!</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Thank you for stepping up to save a life. Please contact the requester immediately.
                    </p>
                </div>

                <div className="mt-6 space-y-4 rounded-2xl bg-gray-50 p-4 dark:bg-[#0f172a]">
                    <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Patient</span>
                        <span className="font-bold text-[#1D3557] dark:text-white">{requestData.patientName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Hospital</span>
                        <span className="font-bold text-[#1D3557] dark:text-white">{requestData.hospitalName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Blood Type</span>
                        <span className="font-bold text-[#E63946]">{requestData.bloodType}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <a
                        href={`tel:${requestData.contactPhone}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        <Phone className="h-5 w-5" />
                        Call Now: {requestData.contactPhone}
                    </a>
                    <p className="mt-2 text-center text-xs text-gray-400">
                        Please verify eligibility before donating.
                    </p>
                </div>
            </div>
        </div>
    );
}
