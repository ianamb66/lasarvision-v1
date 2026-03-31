import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function AIEngine() {
  const [country, setCountry] = useState("México");
  const [industry, setIndustry] = useState("Fintech");
  const [goal, setGoal] = useState("Entrar al mercado y encontrar partners");

  const output = useMemo(() => {
    return `GTM v1 — ${industry} en ${country}

1) Hipótesis de entrada
- Propuesta de valor enfocada en dolor #1 del segmento.
- Priorización: 1-2 ciudades/estados + un vertical inicial.

2) Playbook (30/60/90)
- 0-30: investigación regulatoria, shortlist de partners, pitch y pricing.
- 31-60: pilotos con 2-3 partners, métricas unitarias, iteración.
- 61-90: expansión controlada + acuerdos marco.

3) Partners recomendados (estructura)
- Tipo A: Distribución
- Tipo B: Integración/implementación
- Tipo C: Compliance/legal

4) KPIs
- Leads calificados/semana
- Tiempo a primer piloto
- CAC estimado vs LTV estimado

(Nota: salida generada por plantilla. Se conecta a IA real en Fase 3.)`;
  }, [country, industry]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI GTM Builder (v1)</h1>
        <p className="text-sm text-gray-500 mt-1">
          Recomendaciones de entrada a mercado (plantillas + reglas). Se conecta a IA/LLM en fase 3.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500">Country</label>
            <input
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Industry</label>
            <input
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Goal</label>
            <input
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm px-4"
              onClick={() => toast.success("Estrategia generada")}
              type="button"
            >
              Generar
            </button>
            <button
              className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm px-4 hover:bg-[#1f1f25]"
              onClick={() => {
                navigator.clipboard
                  .writeText(output)
                  .then(() => toast.success("Copiado"))
                  .catch(() => toast.error("No se pudo copiar"));
              }}
              type="button"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
          <p className="text-sm text-white font-semibold">Output</p>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-gray-300 bg-[#0d0d12] border border-[#1f1f25] rounded-2xl p-4">
            {output}
          </pre>
          <p className="text-[11px] text-gray-600 mt-3">
            *Esto cumple el “Strategy builder (basic AI layer)” del documento en versión plantilla (MVP).
          </p>
        </div>
      </div>
    </div>
  );
}
