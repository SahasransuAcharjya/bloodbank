"use client";

import { useEffect, useState } from "react";

type Request = {
  _id: string;
  bloodType: string;
  units: number;
  urgency: string;
  city?: string;
  status: string;
};

export function RequestList() {
  const [items, setItems] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    try {
      const token = localStorage.getItem("jeevandhaara-token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/requests`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const data = await res.json();
      if (res.ok) setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-4 text-xs text-[#333333]/70">
        Loading requests…
      </div>
    );
  }

  return (
    <div className="glass-card space-y-2 p-4 text-sm">
      <h2 className="mb-1 text-sm font-semibold text-[#1D3557]">
        Existing requests
      </h2>
      {items.length === 0 ? (
        <p className="text-xs text-[#333333]/70">
          No requests yet.
        </p>
      ) : (
        items.map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between rounded-2xl bg-white/70 px-3 py-2 text-xs"
          >
            <div>
              <p className="font-semibold text-[#1D3557]">
                {req.bloodType} – {req.units} units
              </p>
              <p className="text-[11px] text-[#333333]/70">
                Urgency: {req.urgency} · Status: {req.status}
              </p>
            </div>
            <span className="pill bg-[#E63946]/10 text-[#E63946] text-[10px]">
              {req.city ?? "Unknown"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
