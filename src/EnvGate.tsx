export function EnvGate({ children }: { children: React.ReactNode }) {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !key) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-gray-200 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-[#121216] border border-[#1f1f25] rounded-3xl p-6">
          <h1 className="text-2xl font-bold text-white">Laservision v1</h1>
          <p className="text-sm text-gray-400 mt-2">
            Falta configurar Supabase en Vercel.
          </p>
          <div className="mt-4 text-sm text-gray-300 space-y-2">
            <p>Agrega estas variables de entorno (Production):</p>
            <ul className="list-disc pl-5 text-gray-300">
              <li>
                <code className="text-gray-100">VITE_SUPABASE_URL</code>
              </li>
              <li>
                <code className="text-gray-100">VITE_SUPABASE_ANON_KEY</code>
              </li>
            </ul>
            <p className="text-xs text-gray-500">
              Una vez configuradas, redeploy y ya podrás usar login y acciones reales.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
