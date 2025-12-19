import { Sidebar } from "@/components/hospital/Sidebar";
import { TopBar } from "@/components/hospital/TopBar";

export default function HospitalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
            <Sidebar />
            <div className="ml-64">
                <TopBar />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
