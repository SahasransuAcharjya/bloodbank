async function getHospitalRequests() {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${base}/api/hospitals/requests`, {
      cache: "no-store",
      // later: add Authorization header from a client component
    });
    if (!res.ok) return [];
    return res.json();
  }
  
  export default async function HospitalDashboardPage() {
    const requests = await getHospitalRequests();
  
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1D3557]">
            Hospital Dashboard
          </h1>
          <p className="text-sm text-[#333333]/70">
            Track blood requests created by your center.
          </p>
        </header>
  
        <section className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-sm text-[#333333]/70">
              No requests yet. Start by creating a new blood request.
            </p>
          ) : (
            requests.map((req: any) => (
              <div key={req._id} className="glass-card flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-semibold text-[#1D3557]">
                    {req.bloodType} – {req.units} units
                  </p>
                  <p className="text-xs text-[#333333]/70">
                    Urgency: {req.urgency} · Status: {req.status}
                  </p>
                </div>
                <span className="pill bg-[#E63946]/10 text-[#E63946] text-xs">
                  {req.city ?? "Unknown city"}
                </span>
              </div>
            ))
          )}
        </section>
      </main>
    );
  }
  