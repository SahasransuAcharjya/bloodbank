"use client";

import { useState } from "react";

interface DonorFormProps {
  onCreated?: () => void;
}

export function DonorForm({ onCreated }: DonorFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, role: "DONOR" }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to create donor");
      } else {
        setMessage("Donor created successfully");
        setForm({ name: "", email: "", password: "", bloodType: "", city: "" });
        onCreated?.();
      }
    } catch {
      setMessage("Unable to reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-3 p-4">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-[#1D3557]">
          Register new donor
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Full name"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
        />
        <input
          placeholder="Blood type (e.g., O+)"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.bloodType}
          onChange={(e) => updateField("bloodType", e.target.value)}
        />
        <input
          placeholder="City"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
        />
      </div>

      {message && (
        <p className="text-[11px] text-[#333333]/70">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cta-btn mt-1 w-full justify-center text-xs"
      >
        {loading ? "Saving..." : "Create donor"}
      </button>
    </form>
  );
}
