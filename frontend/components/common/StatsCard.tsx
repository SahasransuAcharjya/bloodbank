interface StatsCardProps {
    label: string;
    value: string | number;
    highlight?: "primary" | "danger";
  }
  
  export function StatsCard({ label, value, highlight }: StatsCardProps) {
    const color =
      highlight === "danger"
        ? "text-[#E63946]"
        : highlight === "primary"
        ? "text-[#1D3557]"
        : "text-[#333333]";
  
    return (
      <div className="glass-card p-4">
        <p className="text-xs text-[#333333]/60">{label}</p>
        <p className={`mt-2 text-2xl font-semibold ${color}`}>{value}</p>
      </div>
    );
  }
  