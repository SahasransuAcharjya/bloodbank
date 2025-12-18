"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("jeevandhaara-token", data.token);

        // Redirect based on role
        const role = data.user?.role;
        if (role === "HOSPITAL") {
          window.location.href = "/hospital/dashboard";
        } else if (role === "ADMIN") {
          window.location.href = "/panel";
        } else {
          // Default to donor dashboard
          window.location.href = "/donor/dashboard";
        }
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
          Login to JeevanDhaara
        </h1>
        <p className="mb-4 text-sm text-[#333333]/70">
          Access your donor, hospital, or admin dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#333333]/80">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-sm outline-none focus:border-[#E63946]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
