"use client";

import { RequestKanban } from "@/components/hospital/RequestKanban";

export default function RequestsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blood Requests</h1>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
                <RequestKanban />
            </div>
        </div>
    );
}
