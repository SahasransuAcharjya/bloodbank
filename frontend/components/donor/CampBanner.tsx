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
    const [camps, setCamps] = useState<Camp[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        async function fetchCamps() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setCamps(data);
                        // Check registration for the first camp initially, or handle per-camp registration check
                        // For now, we reset isRegistered when slide changes
                    }
                }
            } catch (err) {
                console.error("Failed to fetch camps", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCamps();
    }, []);

    // Auto-slide every 30 seconds
    useEffect(() => {
        if (camps.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % camps.length);
            setIsRegistered(false); // Reset registration state for new slide (simplification)
        }, 30000);

        return () => clearInterval(interval);
    }, [camps.length]);

    const handleRegister = async () => {
        const currentCamp = camps[currentIndex];
        if (!currentCamp) return;
        setRegistering(true);

        const token = localStorage.getItem("jeevandhaara-token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/camps/${currentCamp._id}/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                setIsRegistered(true);
                // Update local count for the specific camp
                setCamps(prevCamps =>
                    prevCamps.map((c, idx) =>
                        idx === currentIndex
                            ? { ...c, registeredDonors: [...c.registeredDonors, "me"] }
                            : c
                    )
                );
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

    // Check if user is already registered for the CURRENT camp
    useEffect(() => {
        const currentCamp = camps[currentIndex];
        if (currentCamp) {
            // Ideally check against user ID if available, or rely on a "me" flag if backend sent it
            // For now, we'll just reset it to false unless we know for sure.
            // If we want to persist "Registered" state across slides without re-fetching, 
            // we need to check the `registeredDonors` array of the current camp.
            // Since we don't have the user's ID easily here without decoding token, 
            // we might miss showing "Registered" if they revisit the slide.
            // Improvement: Decode token to get ID and check `currentCamp.registeredDonors.includes(userId)`
            const token = localStorage.getItem("jeevandhaara-token");
            if (token) {
                // Simple check: if we just registered locally, isRegistered is true.
                // If we switched slides, we reset it. 
                // Real implementation needs user ID.
            }
        }
    }, [currentIndex, camps]);

    if (loading) {
        return <div className="h-64 w-full animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"></div>;
    }

    if (camps.length === 0) {
        return null;
    }

    const camp = camps[currentIndex];
    const progress = Math.min((camp.registeredDonors.length / camp.targetUnits) * 100, 100);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-[#1D3557] text-white shadow-lg transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] to-[#457B9D] opacity-90"></div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#E63946]/20 blur-xl"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
                <div className="flex-1 animate-fade-in">
                    <div className="mb-2 inline-flex items-center gap-2">
                        <div className="rounded-full bg-[#E63946] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                            Upcoming Camp
                        </div>
                        {camps.length > 1 && (
                            <span className="text-xs text-white/60">
                                {currentIndex + 1} / {camps.length}
                            </span>
                        )}
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

                <div className="shrink-0 flex flex-col items-center gap-2">
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

                    {/* Navigation Dots */}
                    {camps.length > 1 && (
                        <div className="flex gap-1.5 mt-2">
                            {camps.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
