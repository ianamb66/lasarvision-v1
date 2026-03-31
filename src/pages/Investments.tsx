import toast from "react-hot-toast";

const items = [
  { name: "Fintech México", value: 7699, pnl: 6.25 },
  { name: "AgroTech Arg", value: 1340, pnl: 5.67 },
  { name: "Energía Brasil", value: 540, pnl: -1.89 },
];

export default function Investments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mis Inversiones</h1>
        <p className="text-sm text-gray-500 mt-1">
          Lista demo (estructura lista para conectarse a base de datos).
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-3">Activo</th>
                <th className="py-3">Valor</th>
                <th className="py-3">P&L 24h</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.name} className="border-t border-[#1f1f25]">
                  <td className="py-3 text-white font-medium">{it.name}</td>
                  <td className="py-3 text-gray-300">${it.value.toLocaleString()}</td>
                  <td
                    className={`py-3 ${it.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {it.pnl >= 0 ? "+" : ""}
                    {it.pnl}%
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      className="bg-[#16161a] border border-[#1f1f25] text-gray-200 px-3 py-2 rounded-lg hover:bg-[#1f1f25]"
                      onClick={() => toast(`Abrir detalle: ${it.name} (demo)`)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
