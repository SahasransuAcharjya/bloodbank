async function getDonorMe() {
    // token from localStorage cannot be read in server component,
    // so this is placeholder; later move fetch into a client component.
    return null;
  }
  
  export default async function DonorDashboardPage() {
    const donor = await getDonorMe();
  
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1D3557]">
            Donor Dashboard
          </h1>
          <p className="text-sm text-[#333333]/70">
            View your blood type, last donation, and upcoming appointments.
          </p>
        </header>
  
        <section className="grid gap-4 md:grid-cols-3">
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">Blood type</p>
            <p className="mt-2 text-xl font-semibold text-[#1D3557]">
              {donor?.bloodType ?? "O+"}
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">Last donation</p>
            <p className="mt-2 text-sm font-semibold text-[#333333]">
              {donor?.lastDonationDate ?? "—"}
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">Total donations</p>
            <p className="mt-2 text-xl font-semibold text-[#E63946]">
              {donor?.totalDonations ?? 0}
            </p>
          </div>
        </section>
      </main>
    );
  }
  