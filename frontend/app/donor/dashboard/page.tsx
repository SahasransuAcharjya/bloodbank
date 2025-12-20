"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { CampBanner } from "@/components/donor/CampBanner";
import { HeroStats } from "@/components/donor/HeroStats";
import { RequestFeed } from "@/components/donor/RequestFeed";
import { DonationJourney } from "@/components/donor/DonationJourney";
import { NearMeMap } from "@/components/donor/NearMeMap";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export default function DonorDashboardPage() {
  const router = useRouter();
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jeevandhaara-token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch Donor Profile
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/donors/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setDonor(data);
        } else {
          router.push("/login");
        }

        // Fetch Notifications
        const notifRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (notifRes.ok) {
          const data = await notifRes.json();
          setNotificationCount(data.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1FAEE] dark:bg-[#0f172a]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E63946] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1FAEE] px-4 py-8 sm:px-8 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
              Hello, {donor?.name?.split(" ")[0] || "Donor"}! 👋
            </h1>
            <p className="text-sm text-[#333333]/70 dark:text-gray-400">
              You are a hero. Ready to save a life today?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/notifications" className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </a>
            <ProfileDropdown user={{ name: donor?.name || "User", role: "DONOR" }} />
          </div>
        </header>

        {/* Top Banner */}
        <section>
          <CampBanner />
        </section>

        {/* Bento Grid Layout */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Request Feed (Larger) */}
          <div className="lg:col-span-8">
            <RequestFeed donor={donor} />
          </div>

          {/* Right Column: Stats & Widgets */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <HeroStats donor={donor} />
            <DonationJourney />
            <NearMeMap />
          </div>
        </section>
      </div>
    </main>
  );
}