"use client";

import { AlertTriangle } from "lucide-react";

interface BloodUnit {
    _id: string;
    bloodType: string;
    expiryDate: string;
    volumeML: number;
}

interface ExpiryWatchlistProps {
    units: BloodUnit[];
}

export function ExpiryWatchlist({ units }: ExpiryWatchlistProps) {
    if (units.length === 0) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Expiry Watchlist
                </h2>
                <p className="text-sm text-gray-500">No units expiring soon. Great job!</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
            <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Expiry Watchlist (Next 48h)
                </h2>
            </div>

            <div className="space-y-3">
                {units.map((unit) => {
                    const daysLeft = Math.ceil(
                        (new Date(unit.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );

                    return (
                        <div key={unit._id} className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 p-3 dark:border-amber-900/30 dark:bg-amber-900/10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-[#E63946] shadow-sm dark:bg-[#1e293b]">
                                    {unit.bloodType}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Unit #{unit._id.slice(-4)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Expires in {daysLeft} days
                                    </p>
                                </div>
                            </div>
                            <button className="rounded-md bg-white px-3 py-1 text-xs font-medium text-amber-600 shadow-sm hover:bg-gray-50 dark:bg-[#1e293b] dark:text-amber-500">
                                Prioritize
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
