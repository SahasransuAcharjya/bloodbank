type InventoryItem = {
    _id: string;
    centerId: string;
    bloodType: string;
    unitsAvailable: number;
    city?: string;
  };
  
  interface InventoryTableProps {
    items: InventoryItem[];
  }
  
  export function InventoryTable({ items }: InventoryTableProps) {
    return (
      <div className="glass-card overflow-hidden p-4">
        <h2 className="mb-3 text-sm font-semibold text-[#1D3557]">
          Inventory
        </h2>
        <div className="max-h-72 overflow-auto text-xs">
          <table className="min-w-full text-left">
            <thead className="border-b border-[#1D3557]/10 text-[11px] text-[#333333]/60">
              <tr>
                <th className="pb-2 pr-3">Blood type</th>
                <th className="pb-2 pr-3">Units</th>
                <th className="pb-2">City</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id} className="border-b border-[#1D3557]/5">
                  <td className="py-1.5 pr-3 font-medium text-[#1D3557]">
                    {row.bloodType}
                  </td>
                  <td className="py-1.5 pr-3">{row.unitsAvailable}</td>
                  <td className="py-1.5">
                    {row.city ?? "—"}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 text-center text-[#333333]/60"
                  >
                    No inventory data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  