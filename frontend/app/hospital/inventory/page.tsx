"use client";

import { useState, useEffect } from "react";
import { StockVisualizer } from "@/components/hospital/StockVisualizer";
import { ExpiryWatchlist } from "@/components/hospital/ExpiryWatchlist";
import { AddBloodUnitModal } from "@/components/hospital/AddBloodUnitModal";
import { Plus } from "lucide-react";

export default function InventoryPage() {
    const [inventory, setInventory] = useState({});
    const [expiringUnits, setExpiringUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchInventory = async () => {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setInventory(data.inventory || {});
                setExpiringUnits(data.expiringUnits || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#E63946] px-4 py-2 text-sm font-medium text-white hover:bg-[#d62828]"
                >
                    <Plus className="h-4 w-4" />
                    Add Blood Unit
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <StockVisualizer inventory={inventory} />
                </div>
                <div>
                    <ExpiryWatchlist units={expiringUnits} />
                </div>
            </div>

            <AddBloodUnitModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchInventory}
            />
        </div>
    );
}
