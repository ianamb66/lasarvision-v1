import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

const MOCK = {
  mexico: {
    name: "México",
    kpis: [
      { label: "GDP (USD)", value: "$1.6T" },
      { label: "FDI (USD)", value: "$36B" },
      { label: "Population", value: "129M" },
      { label: "Inflation", value: "4.2%" },
    ],
    series: [
      { label: "2019", value: 100 },
      { label: "2020", value: 92 },
      { label: "2021", value: 104 },
      { label: "2022", value: 110 },
      { label: "2023", value: 118 },
      { label: "2024", value: 123 },
    ],
  },
} as const;

export default function CountryProfile() {
  const { code } = useParams();

  const country = useMemo(() => {
    const key = (code || "mexico").toLowerCase() as keyof typeof MOCK;
    return MOCK[key] || MOCK.mexico;
  }, [code]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Country profile: {country.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Market Intelligence Dashboard — KPIs + series (placeholder). Se conecta a fuentes reales al definir data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {country.kpis.map((k) => (
          <div key={k.label} className="bg-[#121216] border border-[#1f1f25] rounded-2xl p-4">
            <p className="text-xs text-gray-500">{k.label}</p>
            <p className="text-xl text-white font-semibold mt-1">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
        <p className="text-sm text-white font-semibold">GDP trend (index)</p>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={country.series} margin={{ top: 10, right: 14, bottom: 0, left: 0 }}>
              <XAxis dataKey="label" stroke="#4b5563" />
              <Tooltip
                contentStyle={{
                  background: "#0d0d12",
                  border: "1px solid #1f1f25",
                  color: "#e5e7eb",
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#c4b5fd" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
