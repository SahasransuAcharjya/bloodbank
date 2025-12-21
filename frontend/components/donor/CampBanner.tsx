"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Camp {
    _id: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    location: {
        city: string;
        address: string;
    };
    targetUnits: number;
    registeredDonors: string[];
}

export function CampBanner() {
    const router = useRouter();
    const [camp, setCamp] = useState<Camp | null>(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        async function fetchCamp() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setCamp(data[0]);
                        // Check if user is already registered (requires checking user ID against registeredDonors)
                        // For simplicity, we'll check this when we try to register or if we had the user ID handy.
                        // A better approach is to have the backend tell us if "me" is registered, or check locally if we have the user object.
                        // For now, we'll rely on the button state or a separate check if needed.
                        // Actually, let's fetch the user profile to check registration status if we want to be precise, 
                        // but for this "banner" component, we might just check if the ID is in the list if we have the user ID.
                        // Let's assume the user might be registered if their ID is in the list.

                        const token = localStorage.getItem("jeevandhaara-token");
                        if (token) {
                            // We'd ideally decode the token or fetch /me to get the ID.
                            // For this implementation, we'll just let the backend handle the "already registered" error gracefully.
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch camps", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCamp();
    }, []);

    const handleRegister = async () => {
        if (!camp) return;
        setRegistering(true);

        const token = localStorage.getItem("jeevandhaara-token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps/${camp._id}/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                setIsRegistered(true);
                // Update local count
                setCamp(prev => prev ? { ...prev, registeredDonors: [...prev.registeredDonors, "me"] } : null);
            } else {
                const error = await res.json();
                if (error.message === "Already registered") {
                    setIsRegistered(true);
                } else {
                    alert(error.message || "Failed to register");
                }
            }
        } catch (err) {
            console.error("Registration error", err);
            alert("Something went wrong");
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return <div className="h-64 w-full animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"></div>;
    }

    if (!camp) {
        return null; // Or a "No upcoming camps" message
    }

    const progress = Math.min((camp.registeredDonors.length / camp.targetUnits) * 100, 100);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-[#1D3557] text-white shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] to-[#457B9D] opacity-90"></div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#E63946]/20 blur-xl"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
                <div className="flex-1">
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#E63946] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        Upcoming Camp
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">{camp.name}</h2>
                    <p className="mb-4 text-sm text-white/80">
                        Join us at {camp.location.address}. Help us reach our goal of {camp.targetUnits} units!
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/70">
                        <span className="flex items-center gap-1">
                            📅 {new Date(camp.date).toLocaleDateString('en-GB')}
                        </span>
                        <span className="flex items-center gap-1">
                            ⏰ {camp.startTime} - {camp.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                            📍 {camp.location.address}, {camp.location.city}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs">
                            <span>{camp.registeredDonors.length} Donors Registered</span>
                            <span>Goal: {camp.targetUnits}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                            <div
                                className="h-full rounded-full bg-[#E63946] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0">
                    {isRegistered ? (
                        <div className="flex h-12 w-40 items-center justify-center rounded-full bg-green-500 font-bold shadow-lg">
                            ✓ Registered
                        </div>
                    ) : (
                        <button
                            onClick={handleRegister}
                            disabled={registering}
                            className="flex h-12 w-40 items-center justify-center rounded-full bg-white font-bold text-[#1D3557] shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70"
                        >
                            {registering ? "Registering..." : "Count Me In"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
