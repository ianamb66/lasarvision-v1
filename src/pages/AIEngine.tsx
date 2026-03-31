import toast from "react-hot-toast";

export default function AIEngine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Motor IA (Beta)</h1>
        <p className="text-sm text-gray-500 mt-1">
          Vista lista para conectar a prompts/LLM. Por ahora muestra un flujo demo.
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
        <p className="text-sm text-gray-300">
          Objetivo: generar recomendaciones para asignación de capital y alertas.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            className="bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm px-4"
            onClick={() => toast.success("Reporte generado (demo)")}
            type="button"
          >
            Generar reporte
          </button>
          <button
            className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm px-4 hover:bg-[#1f1f25]"
            onClick={() => toast("Crear alerta (demo)")}
            type="button"
          >
            Crear alerta
          </button>
        </div>
      </div>
    </div>
  );
}
