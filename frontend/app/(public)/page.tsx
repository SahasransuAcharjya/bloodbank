import Link from "next/link";

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-[#1D3557]">
          JeevanDhaara – Blood Donation Platform
        </h1>
        <p className="mt-3 text-sm text-[#333333]/75 max-w-xl">
          Find blood in emergencies, book safe donation appointments, and
          track impact across donors, hospitals, and admins.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/(auth)/register" className="cta-btn justify-center">
          Join as Donor / Hospital
        </Link>
        <Link href="/(auth)/login" className="cta-outline justify-center">
          Login
        </Link>
      </div>
    </main>
  );
}
