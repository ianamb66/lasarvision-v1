import toast from "react-hot-toast";

const opportunities = [
  {
    title: "Expansión Fintech (México)",
    sector: "Finanzas",
    risk: "Medio",
    irr: "2.23%",
  },
  {
    title: "AgroTech (Argentina)",
    sector: "Agro & Tech",
    risk: "Alto",
    irr: "1.74%",
  },
  {
    title: "Infra Renovable (Brasil)",
    sector: "Energía",
    risk: "Bajo",
    irr: "0.98%",
  },
];

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Marketplace</h1>
        <p className="text-sm text-gray-500 mt-1">
          Flujo listo: lista → detalle → invertir/contactar (conectar backend cuando
          toque).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {opportunities.map((o) => (
          <div
            key={o.title}
            className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5"
          >
            <p className="text-xs text-gray-500">{o.sector}</p>
            <h3 className="text-white font-semibold text-lg mt-1">{o.title}</h3>
            <div className="flex gap-2 mt-4 text-xs">
              <span className="bg-[#16161a] border border-[#1f1f25] text-gray-300 px-2 py-1 rounded">
                Riesgo: {o.risk}
              </span>
              <span className="bg-[#16161a] border border-[#1f1f25] text-gray-300 px-2 py-1 rounded">
                IRR: {o.irr}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              <button
                type="button"
                className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm w-full sm:w-auto px-4"
                onClick={() => toast.success(`Orden creada: ${o.title} (demo)`) }
              >
                Invertir
              </button>
              <button
                type="button"
                className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm w-full sm:w-auto px-4 hover:bg-[#1f1f25]"
                onClick={() => toast(`Contacto solicitado: ${o.title} (demo)`) }
              >
                Contactar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
