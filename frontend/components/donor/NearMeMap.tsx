"use client";

export function NearMeMap() {
    return (
        <div className="glass-card flex h-48 flex-col items-center justify-center overflow-hidden bg-gray-100 p-0 relative dark:bg-[#1e293b]">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10 dark:opacity-5 dark:invert"></div>

            <div className="z-10 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#E63946]/10 text-xl">
                    📍
                </div>
                <p className="text-sm font-semibold text-[#1D3557] dark:text-[#A8DADC]">Near Me</p>
                <p className="text-xs text-[#333333]/60 dark:text-gray-400">Map integration coming soon</p>
            </div>
        </div>
    );
}
