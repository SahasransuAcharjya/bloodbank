"use client";

export function DonationJourney() {
    const steps = [
        {
            status: "completed",
            title: "Donation Completed",
            time: "2 days ago",
            desc: "Verified by City Hospital",
        },
        {
            status: "current",
            title: "Certificate Generated",
            time: "Yesterday",
            desc: "Download your certificate",
        },
        {
            status: "upcoming",
            title: "Next Eligible Date",
            time: "Mar 20, 2026",
            desc: "Recovery period",
        },
    ];

    return (
        <div className="glass-card p-5">
            <h3 className="mb-4 text-sm font-bold text-[#1D3557] dark:text-[#A8DADC]">My Journey</h3>
            <div className="relative border-l-2 border-[#1D3557]/10 ml-2 space-y-6 pl-6 dark:border-white/10">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div
                            className={`absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-white shadow-sm dark:border-[#1e293b] ${step.status === "completed"
                                    ? "bg-[#2A9D8F]"
                                    : step.status === "current"
                                        ? "bg-[#E63946] ring-4 ring-[#E63946]/20"
                                        : "bg-gray-300 dark:bg-gray-600"
                                }`}
                        ></div>
                        <h4
                            className={`text-sm font-semibold ${step.status === "upcoming"
                                    ? "text-gray-400 dark:text-gray-500"
                                    : "text-[#1D3557] dark:text-gray-200"
                                }`}
                        >
                            {step.title}
                        </h4>
                        <p className="text-xs text-[#333333]/60 dark:text-gray-400">{step.time}</p>
                        {step.desc && (
                            <p className="mt-1 text-xs text-[#333333]/50 dark:text-gray-500">{step.desc}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
