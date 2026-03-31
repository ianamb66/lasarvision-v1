import { useMemo, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Calculator() {
  const [investment, setInvestment] = useState(10000);
  const [months, setMonths] = useState(6);
  const [irr, setIrr] = useState(2.23);

  const result = useMemo(() => {
    const m = clamp(months, 1, 120);
    const rate = irr / 100;
    const future = investment * Math.pow(1 + rate, m / 12);
    return {
      future,
      profit: future - investment,
    };
  }, [investment, months, irr]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Calculadora ROI</h1>
        <p className="text-sm text-gray-500 mt-1">
          Cálculo simple (demo) — listo para conectar a modelos más complejos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500">Inversión (USD)</label>
            <input
              type="number"
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              min={0}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Periodo (meses)</label>
            <input
              type="number"
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              min={1}
              max={120}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">IRR anual (%)</label>
            <input
              type="number"
              className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              value={irr}
              onChange={(e) => setIrr(Number(e.target.value))}
              step={0.01}
            />
          </div>
        </div>

        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
          <p className="text-xs text-gray-500">Resultado estimado</p>
          <p className="text-4xl text-white font-semibold mt-2">
            ${result.future.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm mt-3 text-gray-400">
            Ganancia: <span className="text-white">${result.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
