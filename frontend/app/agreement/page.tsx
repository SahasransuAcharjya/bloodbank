"use client";

export default function AgreementPage() {
    return (
        <main className="min-h-screen bg-[#F1FAEE] px-4 py-12 dark:bg-[#0f172a] sm:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-[#1e293b]">
                <h1 className="mb-8 text-3xl font-bold text-[#1D3557] dark:text-[#A8DADC]">
                    User Agreement & Policies
                </h1>

                <div className="space-y-8 text-[#333333] dark:text-gray-300">
                    <section>
                        <h2 className="mb-4 text-xl font-bold text-[#E63946]">
                            1. Terms of Service
                        </h2>
                        <p className="mb-2 leading-relaxed">
                            Welcome to JeevanDhaara. By using our platform, you agree to comply
                            with and be bound by the following terms and conditions of use.
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                You must be at least 18 years old to register as a donor.
                            </li>
                            <li>
                                You agree to provide accurate and truthful information about your
                                health and eligibility.
                            </li>
                            <li>
                                JeevanDhaara acts as a facilitator and is not liable for any
                                medical complications arising from donations.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-bold text-[#E63946]">
                            2. Privacy Policy
                        </h2>
                        <p className="mb-2 leading-relaxed">
                            Your privacy is paramount to us. We are committed to protecting your
                            personal information.
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                <strong>Data Collection:</strong> We collect your name, contact
                                details, blood type, and location to facilitate donations.
                            </li>
                            <li>
                                <strong>Data Usage:</strong> Your data is shared only with
                                verified hospitals and blood banks when a match is found.
                            </li>
                            <li>
                                <strong>Security:</strong> We employ industry-standard encryption
                                to safeguard your data.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-bold text-[#E63946]">
                            3. Donor Eligibility Guidelines
                        </h2>
                        <p className="mb-2 leading-relaxed">
                            To ensure the safety of both donors and recipients, please adhere to
                            the following guidelines:
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Weight must be at least 50 kg (110 lbs).</li>
                            <li>Must be in good general health and feeling well.</li>
                            <li>
                                Must not have donated blood in the last 56 days (8 weeks).
                            </li>
                            <li>
                                Must not have any transmissible infections (HIV, Hepatitis, etc.).
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Last updated: December 2025
                </div>
            </div>
        </main>
    );
}
