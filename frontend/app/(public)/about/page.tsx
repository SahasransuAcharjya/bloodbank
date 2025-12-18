export default function AboutPage() {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-12">
        <section>
          <h1 className="text-3xl font-semibold text-[#1D3557]">
            About JeevanDhaara
          </h1>
          <p className="mt-3 text-sm text-[#333333]/75 max-w-2xl">
            JeevanDhaara is a digital blood donation platform that connects
            donors, hospitals, and patients in real time to reduce delays in
            life‑saving transfusions in urban areas.
          </p>
        </section>
  
        <section className="grid gap-4 md:grid-cols-3">
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">For donors</p>
            <p className="mt-2 text-sm text-[#333333]/80">
              Track donation history, get reminders when you are eligible again,
              and earn badges for consistent contributions.
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">For hospitals</p>
            <p className="mt-2 text-sm text-[#333333]/80">
              Create requests by blood type and urgency, manage appointments, and
              view real‑time inventory for your blood bank.
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[#333333]/60">For admins</p>
            <p className="mt-2 text-sm text-[#333333]/80">
              Monitor system‑wide stats, optimize stock levels, and coordinate
              emergency responses across multiple centers.
            </p>
          </div>
        </section>
      </main>
    );
  }
  