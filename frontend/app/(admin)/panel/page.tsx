import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel – JeevanDhaara",
};

async function getAdminStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/stats`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function AdminPanelPage() {
  const stats = await getAdminStats();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1D3557]">
            Admin Panel
          </h1>
          <p className="text-sm text-[#333333]/70">
            Monitor donors, requests, and overall JeevanDhaara impact.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="glass-card p-4">
          <p className="text-xs text-[#333333]/60">Total donors</p>
          <p className="mt-2 text-2xl font-semibold text-[#1D3557]">
            {stats?.donorCount ?? "—"}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-[#333333]/60">Total donations</p>
          <p className="mt-2 text-2xl font-semibold text-[#E63946]">
            {stats?.totalDonations ?? "—"}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-[#333333]/60">Open requests</p>
          <p className="mt-2 text-2xl font-semibold text-[#E63946]">
            {stats?.openRequests ?? "—"}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-[#333333]/60">Completed appointments</p>
          <p className="mt-2 text-2xl font-semibold text-[#1D3557]">
            {stats?.completedAppointments ?? "—"}
          </p>
        </div>
      </section>
    </main>
  );
}
