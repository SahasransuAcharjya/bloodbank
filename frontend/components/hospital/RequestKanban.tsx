"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertCircle, MoreHorizontal, User, Droplet } from "lucide-react";
import { clsx } from "clsx";

interface Request {
    _id: string;
    patientName: string;
    bloodType: string;
    unitsRequired: number;
    urgency: "STANDARD" | "EMERGENCY";
    status: "OPEN" | "IN_PROGRESS" | "FULFILLED" | "CANCELLED";
    createdAt: string;
}

const COLUMNS = [
    { id: "OPEN", title: "Pending Requests", color: "bg-blue-500" },
    { id: "IN_PROGRESS", title: "In Progress", color: "bg-amber-500" },
    { id: "FULFILLED", title: "Fulfilled", color: "bg-green-500" },
];

export function RequestKanban() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    async function fetchRequests() {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Note: The dashboard-stats endpoint currently returns a count for pendingRequests.
            // We need a dedicated endpoint to list all requests for the Kanban board.
            // For now, let's assume we'll use a new endpoint or update the existing one.
            // Let's use the /api/requests endpoint we saw earlier.

            // Fetch ALL requests (including donor requests) for the command center
            const requestsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests?status=ALL`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (requestsRes.ok) {
                const data = await requestsRes.json();
                setRequests(data);
            }
        } catch (err) {
            console.error("Failed to fetch requests", err);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, newStatus: string) {
        // Optimistic update
        setRequests((prev) =>
            prev.map((req) => (req._id === id ? { ...req, status: newStatus as any } : req))
        );

        try {
            const token = localStorage.getItem("jeevandhaara-token");
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (err) {
            console.error("Failed to update status", err);
            // Revert on error (could be improved)
            fetchRequests();
        }
    }

    if (loading) {
        return <div className="h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"></div>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {COLUMNS.map((col) => (
                <div key={col.id} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                            <span className={clsx("h-2 w-2 rounded-full", col.color)}></span>
                            {col.title}
                            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
                                {requests.filter((r) => r.status === col.id).length}
                            </span>
                        </h3>
                    </div>

                    <div className="flex min-h-[200px] flex-col gap-3 rounded-xl bg-gray-50 p-2 dark:bg-[#1e293b]/50">
                        {requests
                            .filter((req) => req.status === col.id)
                            .map((req) => (
                                <motion.div
                                    layoutId={req._id}
                                    key={req._id}
                                    className="group relative flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-[#1e293b]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={clsx(
                                                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                                                    req.urgency === "EMERGENCY"
                                                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                                )}
                                            >
                                                {req.bloodType}
                                            </span>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {req.patientName}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {req.unitsRequired} units • {req.urgency === "EMERGENCY" ? "Urgent" : "Standard"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions Menu (Simplified for now) */}
                                        <div className="opacity-0 transition-opacity group-hover:opacity-100">
                                            {col.id === "OPEN" && (
                                                <button
                                                    onClick={() => updateStatus(req._id, "IN_PROGRESS")}
                                                    className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    title="Move to In Progress"
                                                >
                                                    <Clock className="h-4 w-4 text-amber-500" />
                                                </button>
                                            )}
                                            {col.id === "IN_PROGRESS" && (
                                                <button
                                                    onClick={() => updateStatus(req._id, "FULFILLED")}
                                                    className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    title="Mark as Fulfilled"
                                                >
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                                        <span className="font-mono">#{req._id.slice(-4)}</span>
                                    </div>
                                </motion.div>
                            ))}

                        {requests.filter((r) => r.status === col.id).length === 0 && (
                            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-400 dark:border-gray-700">
                                No requests
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
