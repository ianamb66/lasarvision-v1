export function EnvGate({ children }: { children: React.ReactNode }) {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  const missing = !url || !key;

  return (
    <>
      {missing && (
        <div className="fixed top-3 left-3 right-3 z-50">
          <div className="max-w-3xl mx-auto bg-[#121216] border border-[#1f1f25] rounded-2xl px-4 py-3 text-sm text-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="font-semibold text-white">Demo mode:</span>{" "}
                falta configurar Supabase. El Dashboard se ve, pero login/acciones de escritura están deshabilitadas.
              </div>
              <div className="text-xs text-gray-500">
                Requiere: <code>VITE_SUPABASE_URL</code> + <code>VITE_SUPABASE_ANON_KEY</code>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
