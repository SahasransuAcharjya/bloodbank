"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState<"DONOR" | "HOSPITAL">("DONOR");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, role }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        window.location.href = "/(auth)/login";
      }
    } catch {
      setError("Unable to reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1FAEE] px-4">
      <div className="glass-card w-full max-w-md p-6">
        <h1 className="mb-2 text-xl font-semibold text-[#1D3557]">
          Create an account
        </h1>
        <p className="mb-4 text-sm text-[#333333]/70">
          Join JeevanDhaara as a donor or hospital.
        </p>

        <div className="mb-4 flex gap-2 rounded-full bg-white/70 p-1 text-xs">
          <button
            type="button"
            onClick={() => setRole("DONOR")}
            className={`flex-1 rounded-full py-1.5 ${
              role === "DONOR"
                ? "bg-[#E63946] text-white"
                : "text-[#1D3557]"
            }`}
          >
            Donor
          </button>
          <button
            type="button"
            onClick={() => setRole("HOSPITAL")}
            className={`flex-1 rounded-full py-1.5 ${
              role === "HOSPITAL"
                ? "bg-[#1D3557] text-white"
                : "text-[#1D3557]"
            }`}
          >
            Hospital
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              Full name
            </label>
            <input
              required
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>
          {role === "DONOR" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-[#333333]/80">
                Blood type
              </label>
              <input
                className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
                placeholder="e.g., O+"
                value={form.bloodType}
                onChange={(e) => updateField("bloodType", e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              City
            </label>
            <input
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-[#E63946]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-btn w-full justify-center"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}
