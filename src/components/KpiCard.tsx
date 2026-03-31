import type { ReactNode } from "react";

export function KpiCard({
  title,
  value,
  delta,
  deltaTone = "neutral",
  right,
  children,
}: {
  title: string;
  value: ReactNode;
  delta?: ReactNode;
  deltaTone?: "up" | "down" | "neutral";
  right?: ReactNode;
  children?: ReactNode;
}) {
  const tone =
    deltaTone === "up"
      ? "text-green-400"
      : deltaTone === "down"
        ? "text-red-400"
        : "text-gray-400";

  return (
    <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {delta != null && <p className={`text-xs ${tone} mt-1`}>{delta}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
