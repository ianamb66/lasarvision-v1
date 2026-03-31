import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLead, createOpportunity, createOrder, listCountries, listIndustries, listOpportunities, getRole } from "../lib/db";

export default function Marketplace() {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [risk, setRisk] = useState("Medio");
  const [irr, setIrr] = useState<number>(2.23);
  const [countryId, setCountryId] = useState<string>("");
  const [industryId, setIndustryId] = useState<string>("");

  const roleQuery = useQuery({ queryKey: ["role"], queryFn: getRole });
  const isAdmin = roleQuery.data === "admin";

  const countriesQuery = useQuery({ queryKey: ["countries"], queryFn: async () => (await listCountries()).data ?? [] });
  const industriesQuery = useQuery({ queryKey: ["industries"], queryFn: async () => (await listIndustries()).data ?? [] });

  const opportunitiesQuery = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await listOpportunities();
      if (error) throw error;
      return data ?? [];
    },
  });

  const opportunities = opportunitiesQuery.data ?? [];

  const canCreate = useMemo(() => isAdmin, [isAdmin]);

  const submitOpportunity = async () => {
    if (!canCreate) return toast.error("Solo admin puede publicar");
    if (!title.trim()) return toast.error("Título requerido");
    setCreating(true);
    try {
      const { error } = await createOpportunity({
        title: title.trim(),
        description: description.trim(),
        risk,
        irr,
        country_id: countryId || null,
        industry_id: industryId || null,
      });
      if (error) throw error;
      toast.success("Oportunidad publicada");
      setTitle("");
      setDescription("");
      opportunitiesQuery.refetch();
    } catch (e: any) {
      toast.error(e.message || "No se pudo publicar");
    } finally {
      setCreating(false);
    }
  };

  const invest = async (opportunityId: string) => {
    const amountStr = prompt("Monto a invertir (USD)", "1000");
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (!Number.isFinite(amount) || amount <= 0) return toast.error("Monto inválido");
    const { error } = await createOrder({ opportunity_id: opportunityId, amount, currency: "usd" });
    if (error) return toast.error(error.message);
    toast.success("Orden creada (real)");
  };

  const contact = async (opportunityId: string) => {
    const msg = prompt("Mensaje para contacto", "Me interesa esta oportunidad.");
    const { error } = await createLead({ opportunity_id: opportunityId, message: msg ?? "" });
    if (error) return toast.error(error.message);
    toast.success("Solicitud enviada (real)");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Opportunity Marketplace</h1>
        <p className="text-sm text-gray-500 mt-1">
          Publicar, invertir y contactar — acciones reales (persisten en DB).
        </p>
      </div>

      {/* Create */}
      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-white font-semibold">Publicar oportunidad</p>
          <p className="text-xs text-gray-500">
            Permisos: <span className="text-gray-300">{roleQuery.data ?? "…"}</span>
          </p>
        </div>

        {!canCreate ? (
          <p className="text-sm text-gray-500 mt-3">
            Esta acción requiere rol <span className="text-gray-300">admin</span>.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs text-gray-500">Título</label>
              <input
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">IRR anual (%)</label>
              <input
                type="number"
                step={0.01}
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
                value={irr}
                onChange={(e) => setIrr(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">País</label>
              <select
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
              >
                <option value="">(sin país)</option>
                {(countriesQuery.data ?? []).map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500">Industria</label>
              <select
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
                value={industryId}
                onChange={(e) => setIndustryId(e.target.value)}
              >
                <option value="">(sin industria)</option>
                {(industriesQuery.data ?? []).map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="text-xs text-gray-500">Descripción</label>
              <textarea
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white min-h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Riesgo</label>
              <select
                className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
              >
                <option value="Bajo">Bajo</option>
                <option value="Medio">Medio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                disabled={creating}
                onClick={submitOpportunity}
                className="w-full bg-[#c8b6ff] hover:bg-[#b096ff] disabled:opacity-60 text-black font-semibold py-3 rounded-xl text-sm"
              >
                {creating ? "Publicando…" : "Publicar"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {opportunities.map((o: any) => (
          <div key={o.id} className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5">
            <p className="text-xs text-gray-500">
              {(o.countries?.name ?? "—")} • {(o.industries?.name ?? "—")}
            </p>
            <h3 className="text-white font-semibold text-lg mt-1">{o.title}</h3>
            {o.description && <p className="text-sm text-gray-400 mt-2">{o.description}</p>}
            <div className="flex gap-2 mt-4 text-xs flex-wrap">
              <span className="bg-[#16161a] border border-[#1f1f25] text-gray-300 px-2 py-1 rounded">
                Riesgo: {o.risk ?? "—"}
              </span>
              <span className="bg-[#16161a] border border-[#1f1f25] text-gray-300 px-2 py-1 rounded">
                IRR: {o.irr ?? "—"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              <button
                type="button"
                className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm w-full sm:w-auto px-4"
                onClick={() => invest(o.id)}
              >
                Invertir
              </button>
              <button
                type="button"
                className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm w-full sm:w-auto px-4 hover:bg-[#1f1f25]"
                onClick={() => contact(o.id)}
              >
                Contactar
              </button>
            </div>
          </div>
        ))}

        {opportunitiesQuery.isLoading && (
          <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
            <p className="text-sm text-gray-400">Cargando…</p>
          </div>
        )}
      </div>
    </div>
  );
}
