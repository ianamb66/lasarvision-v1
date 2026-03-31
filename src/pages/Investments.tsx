import { useQuery } from "@tanstack/react-query";
import { listOrders } from "../lib/db";

export default function Investments() {
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await listOrders();
      if (error) throw error;
      return data ?? [];
    },
  });

  const orders = ordersQuery.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My assets</h1>
        <p className="text-sm text-gray-500 mt-1">Órdenes reales (desde DB).</p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-3">Created</th>
                <th className="py-3">Opportunity</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-t border-[#1f1f25]">
                  <td className="py-3 text-gray-300">
                    {new Date(o.created_at).toLocaleString("es-MX")}
                  </td>
                  <td className="py-3 text-white font-medium">
                    {o.opportunities?.title ?? "—"}
                    <div className="text-xs text-gray-500">
                      {o.opportunities?.countries?.name ?? ""}
                      {o.opportunities?.industries?.name
                        ? ` • ${o.opportunities.industries.name}`
                        : ""}
                    </div>
                  </td>
                  <td className="py-3 text-gray-300">
                    {o.currency?.toUpperCase?.() ?? "USD"} {Number(o.amount).toLocaleString()}
                  </td>
                  <td className="py-3 text-gray-300">{o.status}</td>
                </tr>
              ))}

              {orders.length === 0 && !ordersQuery.isLoading && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={4}>
                    No hay órdenes todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
