import { useState } from "react";
import toast from "react-hot-toast";

type Tab = "datasets" | "insights" | "users";

export default function AdminCMS() {
  const [tab, setTab] = useState<Tab>("datasets");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin & Content CMS</h1>
        <p className="text-sm text-gray-500 mt-1">
          Estructura UI lista (MVP). Para “producto final” falta auth + BD + permisos.
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-2 flex gap-2">
        {(
          [
            { id: "datasets", label: "Upload datasets" },
            { id: "insights", label: "Create charts & publish" },
            { id: "users", label: "Manage users" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 rounded-2xl text-sm transition-colors ${
              tab === t.id
                ? "bg-[#1f1f25] text-white"
                : "text-gray-400 hover:bg-[#16161a]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "datasets" && (
        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
          <p className="text-sm text-gray-300">
            Aquí el admin sube CSV/Sheets para alimentar dashboards e insights.
          </p>
          <button
            type="button"
            className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm px-4"
            onClick={() => toast("Upload dataset (pendiente backend)")}
          >
            Upload dataset
          </button>
        </div>
      )}

      {tab === "insights" && (
        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
          <p className="text-sm text-gray-300">
            Crear insight card: título, chart, takeaway, why it matters, tags.
          </p>
          <button
            type="button"
            className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm px-4"
            onClick={() => toast("Publish insight (pendiente backend)")}
          >
            Publish
          </button>
        </div>
      )}

      {tab === "users" && (
        <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
          <p className="text-sm text-gray-300">
            Gestión de usuarios/roles (admin/editor/user).
          </p>
          <button
            type="button"
            className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm px-4 hover:bg-[#1f1f25]"
            onClick={() => toast("Crear usuario (pendiente backend)")}
          >
            Create user
          </button>
        </div>
      )}
    </div>
  );
}
