"use client";

import { useState } from "react";

interface RequestFormProps {
  onCreated?: () => void;
}

export function RequestForm({ onCreated }: RequestFormProps) {
  const [form, setForm] = useState({
    bloodType: "",
    units: 1,
    urgency: "NORMAL",
    city: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateField(key: string, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("jeevandhaara-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to create request");
      } else {
        setMessage("Request created");
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
      <h2 className="text-sm font-semibold text-[#1D3557]">
        New blood request
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Blood type (e.g., A+)"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.bloodType}
          onChange={(e) => updateField("bloodType", e.target.value)}
        />
        <input
          type="number"
          min={1}
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.units}
          onChange={(e) => updateField("units", Number(e.target.value))}
        />
        <select
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.urgency}
          onChange={(e) => updateField("urgency", e.target.value)}
        >
          <option value="NORMAL">Normal</option>
          <option value="URGENT">Urgent</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <input
          placeholder="City"
          className="rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
        />
      </div>
      <textarea
        placeholder="Additional note (optional)"
        className="mt-1 w-full rounded-2xl border border-[#1D3557]/15 bg-white/80 px-3 py-2 text-xs outline-none focus:border-[#E63946]"
        rows={3}
        value={form.note}
        onChange={(e) => updateField("note", e.target.value)}
      />
      {message && (
        <p className="text-[11px] text-[#333333]/70">{message}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="cta-btn w-full justify-center text-xs"
      >
        {loading ? "Submitting..." : "Create request"}
      </button>
    </form>
  );
}
