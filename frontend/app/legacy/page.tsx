// frontend/app/page.tsx
import Image from "next/image";

async function getHealth() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/health`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return { status: "error", message: "Backend not reachable" };
  }
  return res.json();
}

export default async function Home() {
  const health = await getHealth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-6 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            JeevanDhaara – Blood Donation Platform
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Backend health:
          </p>
          <pre className="rounded-lg bg-zinc-900/90 p-4 text-xs text-zinc-100">
            {JSON.stringify(health, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}

