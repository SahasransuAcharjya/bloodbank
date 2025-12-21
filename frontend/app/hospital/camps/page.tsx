"use client";

import { useState, useEffect } from "react";
import { CreateCampModal } from "@/components/hospital/CreateCampModal";
import { Plus, MapPin, Calendar, Clock, Users } from "lucide-react";

export default function CampsPage() {
    const [camps, setCamps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchCamps = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps`);
            if (res.ok) {
                const data = await res.json();
                setCamps(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCamps();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blood Donation Camps</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#E63946] px-4 py-2 text-sm font-medium text-white hover:bg-[#d62828]"
                >
                    <Plus className="h-4 w-4" />
                    Schedule Camp
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {camps.map((camp) => (
                    <div key={camp._id} className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{camp.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{new Date(camp.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{camp.startTime} - {camp.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{camp.location?.address}, {camp.location?.city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>{camp.registeredDonors?.length || 0} Donors Registered</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Active
                            </span>
                        </div>
                    </div>
                ))}

                {camps.length === 0 && (
                    <div className="col-span-full flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-200 text-gray-500 dark:border-gray-700">
                        No upcoming camps scheduled.
                    </div>
                )}
            </div>

            <CreateCampModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </div>
    );
}
