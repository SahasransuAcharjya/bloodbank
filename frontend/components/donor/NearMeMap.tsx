"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/shared/Map"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-[#1e293b]">
            <p className="text-sm text-gray-500">Loading Map...</p>
        </div>
    ),
});

export function NearMeMap() {
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation([position.coords.latitude, position.coords.longitude]);
                    setLoading(false);
                },
                (err) => {
                    console.warn("Geolocation error:", err.message, "(Code:", err.code, ")");
                    let errorMessage = "Location access denied. Showing default view.";
                    if (err.code === 2) errorMessage = "Location unavailable. Showing default view.";
                    if (err.code === 3) errorMessage = "Location request timed out. Showing default view.";

                    setError(errorMessage);
                    // Default to Mumbai coordinates
                    setLocation([19.0760, 72.8777]);
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation not supported");
            setLocation([19.0760, 72.8777]);
            setLoading(false);
        }
    }, []);

    // Mock nearby centers
    const nearbyCenters = [
        { position: [19.0860, 72.8877] as [number, number], title: "City Blood Bank" },
        { position: [19.0660, 72.8677] as [number, number], title: "Red Cross Center" },
    ];

    return (
        <div className="glass-card flex h-64 flex-col overflow-hidden p-0 relative dark:bg-[#1e293b]">
            {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E63946] border-t-transparent"></div>
                </div>
            ) : location ? (
                <div className="h-full w-full relative z-0">
                    <Map center={location} zoom={13} markers={nearbyCenters} />
                    {error && (
                        <div className="absolute bottom-2 left-2 right-2 z-[1000] rounded-lg bg-white/90 p-2 text-xs text-red-500 shadow-md text-center">
                            {error}
                        </div>
                    )}
                </div>
            ) : null}

            <div className="absolute top-2 right-2 z-[1000] rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1D3557] shadow-md dark:bg-[#0f172a]/90 dark:text-white">
                Near Me
            </div>
        </div>
    );
}
