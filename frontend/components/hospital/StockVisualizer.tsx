"use client";

import { clsx } from "clsx";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface StockVisualizerProps {
    inventory: Record<string, number>; // { "A+": 10, "O-": 2 }
}

export function StockVisualizer({ inventory }: StockVisualizerProps) {
    // Calculate max for relative height, default to 100 if empty to avoid div by zero
    const maxUnits = Math.max(...Object.values(inventory), 20);

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
            <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                Real-Time Blood Inventory
            </h2>

            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
                {BLOOD_TYPES.map((type) => {
                    const count = inventory[type] || 0;
                    const percentage = Math.min((count / maxUnits) * 100, 100);

                    // Color logic: Low stock warning
                    const isLow = count < 5;
                    const colorClass = isLow ? "bg-red-500" : "bg-[#E63946]";

                    return (
                        <div key={type} className="flex flex-col items-center gap-2">
                            {/* Tube Container */}
                            <div className="relative h-32 w-12 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                                {/* Liquid */}
                                <div
                                    className={clsx("absolute bottom-0 w-full transition-all duration-500 ease-out", colorClass)}
                                    style={{ height: `${percentage}%` }}
                                >
                                    {/* Glossy effect */}
                                    <div className="absolute top-0 h-[2px] w-full bg-white/30"></div>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-center">
                                <span className="block font-bold text-gray-900 dark:text-white">{type}</span>
                                <span className={clsx("text-xs font-medium", isLow ? "text-red-500" : "text-gray-500")}>
                                    {count} units
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
