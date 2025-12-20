"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HospitalProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        address: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const token = localStorage.getItem("jeevandhaara-token");
            if (!token) {
                router.push("/login");
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/me`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch profile");

            const data = await res.json();
            setFormData({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                city: data.city || "",
                state: data.state || "",
                address: data.address || "",
            });
        } catch (err) {
            setError("Could not load profile");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("jeevandhaara-token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hospitals/me`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!res.ok) throw new Error("Failed to update profile");

            setSuccess("Profile updated successfully");
        } catch (err) {
            setError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 text-center dark:text-white">Loading...</div>;

    return (
        <main className="min-h-screen bg-[#F1FAEE] p-4 sm:p-8 dark:bg-[#0f172a]">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 text-2xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
                    Hospital Profile
                </h1>

                <div className="glass-card p-6 dark:bg-[#1e293b] dark:border dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Read-only Email */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                disabled
                                value={formData.email}
                                className="w-full rounded-xl border border-[#1D3557]/10 bg-gray-100 px-4 py-2 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                Hospital Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full rounded-xl border border-[#1D3557]/20 bg-white/50 px-4 py-2 outline-none focus:border-[#E63946] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-[#E63946]"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full rounded-xl border border-[#1D3557]/20 bg-white/50 px-4 py-2 outline-none focus:border-[#E63946] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-[#E63946]"
                            />
                        </div>

                        {/* Location */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-[#1D3557]/20 bg-white/50 px-4 py-2 outline-none focus:border-[#E63946] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-[#E63946]"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) =>
                                        setFormData({ ...formData, state: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-[#1D3557]/20 bg-white/50 px-4 py-2 outline-none focus:border-[#E63946] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-[#E63946]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-[#333333]/70 dark:text-gray-400">
                                Address
                            </label>
                            <textarea
                                rows={3}
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                className="w-full rounded-xl border border-[#1D3557]/20 bg-white/50 px-4 py-2 outline-none focus:border-[#E63946] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-[#E63946]"
                            />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}

                        <button
                            type="submit"
                            disabled={saving}
                            className="cta-btn w-full justify-center"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
