"use client";

import { useState, useEffect } from "react";
import { Search, User, Phone, Calendar, Droplet } from "lucide-react";

export default function DonorsPage() {
    const [donors, setDonors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDonors = async () => {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            // We'll use inventory to derive donor list for now
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/inventory`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const units = await res.json();
                // Extract unique donors from units
                const uniqueDonors = new Map();
                units.forEach((unit: any) => {
                    if (unit.donorName && !uniqueDonors.has(unit.donorName)) {
                        uniqueDonors.set(unit.donorName, {
                            id: unit.donorId || unit._id,
                            name: unit.donorName,
                            bloodType: unit.bloodType,
                            lastDonation: unit.donationDate,
                            age: unit.donorAge || "N/A",
                            totalDonations: 1 // Simplified
                        });
                    } else if (unit.donorName) {
                        const existing = uniqueDonors.get(unit.donorName);
                        existing.totalDonations += 1;
                        if (new Date(unit.donationDate) > new Date(existing.lastDonation)) {
                            existing.lastDonation = unit.donationDate;
                        }
                    }
                });
                setDonors(Array.from(uniqueDonors.values()));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const filteredDonors = donors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Donor Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search donors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-red-500 dark:border-gray-700 dark:bg-[#1e293b] dark:text-white"
                    />
                </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm dark:bg-[#1e293b]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Donor Name</th>
                                <th className="px-6 py-4 font-medium">Blood Type</th>
                                <th className="px-6 py-4 font-medium">Age</th>
                                <th className="px-6 py-4 font-medium">Last Donation</th>
                                <th className="px-6 py-4 font-medium">Total Donations</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredDonors.map((donor) => (
                                <tr key={donor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">{donor.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                            <Droplet className="h-3 w-3" />
                                            {donor.bloodType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{donor.age}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {new Date(donor.lastDonation).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{donor.totalDonations}</td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredDonors.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No donors found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
