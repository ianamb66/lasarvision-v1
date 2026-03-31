import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import type { Insight, InsightTopic } from "../data/insights";
import { INSIGHTS } from "../data/insights";

function Card({ insight }: { insight: Insight }) {
  return (
    <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            {insight.country} • {insight.industry} • {insight.topic}
          </p>
          <h3 className="text-white font-semibold text-lg mt-1">{insight.title}</h3>
        </div>
      </div>

      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          {insight.chart.type === "line" ? (
            <LineChart data={insight.chart.data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <XAxis dataKey="label" stroke="#4b5563" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#0d0d12",
                  border: "1px solid #1f1f25",
                  color: "#e5e7eb",
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#c4b5fd" strokeWidth={2} dot={false} />
            </LineChart>
          ) : (
            <BarChart data={insight.chart.data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <XAxis dataKey="label" stroke="#4b5563" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#0d0d12",
                  border: "1px solid #1f1f25",
                  color: "#e5e7eb",
                }}
              />
              <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Key takeaway</p>
          <p className="text-sm text-gray-200 mt-1">{insight.takeaway}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Why it matters</p>
          <p className="text-sm text-gray-200 mt-1">{insight.whyItMatters}</p>
        </div>
      </div>

      {!!insight.sources?.length && (
        <p className="text-[11px] text-gray-600 mt-4">Fuentes: {insight.sources.join(" • ")}</p>
      )}
    </div>
  );
}

export default function DataHub() {
  const [country, setCountry] = useState<string>("México");
  const [industry, setIndustry] = useState<string>("");
  const [topic, setTopic] = useState<InsightTopic | "">("");

  const countries = useMemo(
    () => Array.from(new Set(INSIGHTS.map((i) => i.country))).sort(),
    []
  );
  const industries = useMemo(
    () => Array.from(new Set(INSIGHTS.map((i) => i.industry))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return INSIGHTS.filter((i) => {
      if (country && i.country !== country) return false;
      if (industry && i.industry !== industry) return false;
      if (topic && i.topic !== topic) return false;
      return true;
    });
  }, [country, industry, topic]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Data Storytelling Hub</h1>
        <p className="text-sm text-gray-500 mt-1">
          Insight cards (Title + Chart + Key takeaway + Why it matters) — estilo Latinometrics.
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500">Country</label>
            <select
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">Industry</label>
            <select
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">All</option>
              {industries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">Topic</label>
            <select
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={topic}
              onChange={(e) => setTopic(e.target.value as any)}
            >
              <option value="">All</option>
              <option value="AI">AI</option>
              <option value="Trade">Trade</option>
              <option value="Investment">Investment</option>
              <option value="Consumers">Consumers</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((insight) => (
          <Card key={insight.id} insight={insight} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
            <p className="text-sm text-gray-400">No hay insights con esos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
