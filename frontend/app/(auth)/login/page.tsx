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
    <main className="flex min-h-screen items-center justify-center bg-[#F1FAEE] px-4 dark:bg-slate-950 transition-colors duration-300">
      <div className="glass-card w-full max-w-md p-8 animate-fade-in border border-white/20 dark:border-slate-800/50">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#1D3557] dark:text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-[#333333]/70 dark:text-slate-400">
            Login to access your JeevanDhaara dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D3557]/80 dark:text-slate-300 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-[#1D3557]/10 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10 transition-all duration-200 dark:bg-slate-900/50 dark:border-slate-700 dark:text-white dark:focus:border-[#E63946] dark:placeholder-slate-500"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1">
              <label className="block text-xs font-semibold text-[#1D3557]/80 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-[#E63946] hover:text-[#d42f3b] transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-[#1D3557]/10 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10 transition-all duration-200 dark:bg-slate-900/50 dark:border-slate-700 dark:text-white dark:focus:border-[#E63946] dark:placeholder-slate-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-[#E63946] dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-btn w-full justify-center text-base py-3.5 shadow-xl shadow-[#E63946]/20 hover:shadow-[#E63946]/40"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-[#333333]/60 dark:text-slate-500 mt-6">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-[#E63946] hover:text-[#d42f3b] transition-colors">
              Create account
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
