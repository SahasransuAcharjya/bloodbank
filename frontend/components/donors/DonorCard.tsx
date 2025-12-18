interface DonorCardProps {
    name: string;
    bloodType: string;
    city?: string;
    lastDonationDate?: string;
    totalDonations?: number;
  }
  
  export function DonorCard({
    name,
    bloodType,
    city,
    lastDonationDate,
    totalDonations,
  }: DonorCardProps) {
    return (
      <div className="glass-card flex items-center justify-between p-4 text-sm">
        <div>
          <p className="font-semibold text-[#1D3557]">{name}</p>
          <p className="text-xs text-[#333333]/70">
            {city ?? "City not specified"}
          </p>
          {lastDonationDate && (
            <p className="mt-1 text-xs text-[#333333]/70">
              Last donation: {new Date(lastDonationDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="pill bg-[#E63946]/10 text-[#E63946] text-xs">
            {bloodType}
          </span>
          {totalDonations !== undefined && (
            <span className="text-[11px] text-[#333333]/70">
              {totalDonations} donations
            </span>
          )}
        </div>
      </div>
    );
  }
  