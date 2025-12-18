"use client";

import Link from "next/link";

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-[#F1FAEE] px-4 py-12 dark:bg-[#0f172a] sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="mb-6 text-3xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
                    We're Here to Help
                </h1>
                <p className="mb-12 text-lg text-[#333333]/80 dark:text-gray-300">
                    Have questions or need assistance? Reach out to us through any of the
                    channels below.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Email Support */}
                    <div className="glass-card flex flex-col items-center p-8 transition-transform hover:scale-105 dark:bg-[#1e293b]">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E63946]/10 text-3xl">
                            ✉️
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-[#1D3557] dark:text-white">
                            Email Us
                        </h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            For general inquiries and support
                        </p>
                        <a
                            href="mailto:support@jeevandhaara.com"
                            className="font-medium text-[#E63946] hover:underline"
                        >
                            support@jeevandhaara.com
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="glass-card flex flex-col items-center p-8 transition-transform hover:scale-105 dark:bg-[#1e293b]">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#457B9D]/10 text-3xl">
                            🌐
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-[#1D3557] dark:text-white">
                            Connect With Us
                        </h3>
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Follow us for updates and stories
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                className="rounded-full bg-pink-100 p-3 text-pink-600 transition-colors hover:bg-pink-200 dark:bg-pink-900/20 dark:text-pink-400"
                            >
                                📸
                            </Link>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                className="rounded-full bg-blue-100 p-3 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                            >
                                🐦
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                className="rounded-full bg-indigo-100 p-3 text-indigo-600 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400"
                            >
                                💼
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Emergency Hotline: <span className="font-bold text-[#E63946]">1800-BLOOD-HELP</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
