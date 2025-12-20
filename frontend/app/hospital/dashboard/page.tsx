"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { StockVisualizer } from "@/components/hospital/StockVisualizer";
import { ExpiryWatchlist } from "@/components/hospital/ExpiryWatchlist";
import { DoctorIdCard } from "@/components/hospital/DoctorIdCard";
import { RequestKanban } from "@/components/hospital/RequestKanban";
import { BroadcastSOS } from "@/components/hospital/BroadcastSOS";
import { CreateCampModal } from "@/components/hospital/CreateCampModal";
import { AddBloodUnitModal } from "@/components/hospital/AddBloodUnitModal";
import { Activity, AlertCircle, Clock, Users } from "lucide-react";

export default function HospitalDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSOS, setShowSOS] = useState(false);
  const [showCampModal, setShowCampModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const fetchStats = async () => {
    const token = localStorage.getItem("jeevandhaara-token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/dashboard-stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        if (res.status === 403 || res.status === 401) {
          console.warn("Authentication failed (redirecting to login):", res.status);
          localStorage.removeItem("jeevandhaara-token");
          router.push("/login");
          return;
        }
        // If 403/401, maybe not a hospital or invalid token
        // For now, let's just log it. In real app, redirect or show error.
        console.error("Failed to fetch stats:", res.status, res.statusText);
        const text = await res.text();
        console.error("Response body:", text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E63946] border-t-transparent"></div>
      </div>
    );
  }

  // Fallback data if stats are empty (e.g. new hospital)
  const inventory = stats?.inventory || {};
  const expiringUnits = stats?.expiringUnits || [];
  const pendingRequestsCount = stats?.pendingRequests || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hospital Command Center
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          System Operational
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Units"
          value={Object.values(inventory).reduce((a: any, b: any) => a + b, 0)}
          icon={Activity}
          trend="+12% from last week"
        />
        <StatCard
          label="Pending Requests"
          value={pendingRequestsCount}
          icon={Clock}
          alert={pendingRequestsCount > 0}
        />
        <StatCard
          label="Critical Low"
          value="2 Types"
          icon={AlertCircle}
          color="text-red-600"
        />
        <StatCard
          label="Donors Today"
          value="14"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content - 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          <StockVisualizer inventory={inventory} />

          {/* Request Command Center */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Request Command Center
            </h2>
            <RequestKanban />
          </div>
        </div>

        {/* Sidebar Content - 1/3 width */}
        <div className="space-y-6">
          <DoctorIdCard />
          <ExpiryWatchlist units={expiringUnits} />

          {/* Quick Actions */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowSOS(true)}
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400"
              >
                Broadcast SOS Alert
              </button>
              <button
                onClick={() => setShowAddUnitModal(true)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                Add Blood Unit (Walk-in)
              </button>
              <button
                onClick={() => setShowCampModal(true)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                Schedule Blood Camp
              </button>
            </div>
          </div>
        </div>
      </div>

      <BroadcastSOS isOpen={showSOS} onClose={() => setShowSOS(false)} />
      <CreateCampModal isOpen={showCampModal} onClose={() => setShowCampModal(false)} />
      <AddBloodUnitModal
        isOpen={showAddUnitModal}
        onClose={() => setShowAddUnitModal(false)}
        onSuccess={fetchStats}
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, trend, alert, color }: any) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1e293b]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <h3 className={clsx("mt-2 text-3xl font-bold", color || "text-gray-900 dark:text-white")}>
            {value}
          </h3>
        </div>
        <div className={clsx("rounded-lg p-2", alert ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400")}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {trend && (
        <p className="mt-2 text-xs font-medium text-green-600">
          {trend}
        </p>
      )}
    </div>
  );
}