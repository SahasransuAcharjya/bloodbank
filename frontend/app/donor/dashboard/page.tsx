"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    async function fetchDonor() {
      const token = localStorage.getItem("jeevandhaara-token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDonor();
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
          <ProfileDropdown user={{ name: donor?.name || "User", role: "DONOR" }} />
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