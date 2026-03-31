import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const PARTNERS = [
  {
    name: "Partner Alpha",
    country: "México",
    industry: "Fintech",
    type: "Distributor",
  },
  {
    name: "Partner Beta",
    country: "México",
    industry: "Manufactura",
    type: "Integrator",
  },
  {
    name: "Partner Gamma",
    country: "México",
    industry: "AI",
    type: "Consulting",
  },
];

export default function PartnerDiscovery() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return PARTNERS;
    return PARTNERS.filter((p) =>
      [p.name, p.country, p.industry, p.type].some((s) =>
        s.toLowerCase().includes(qq)
      )
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Partner discovery</h1>
        <p className="text-sm text-gray-500 mt-1">
          Search + filters (MVP) — conecta a CRM/BD en fase 2.
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search partners…"
          className="w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.name} className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
            <p className="text-xs text-gray-500">{p.country} • {p.industry} • {p.type}</p>
            <p className="text-white font-semibold text-lg mt-1">{p.name}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm px-4"
                type="button"
                onClick={() => toast.success(`Solicitud enviada a ${p.name}`)}
              >
                Connect
              </button>
              <button
                className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm px-4 hover:bg-[#1f1f25]"
                type="button"
                onClick={() => toast(`Ver perfil: ${p.name} (demo)`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
