import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Bienvenido");
    navigate("/");
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: "" } },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Cuenta creada. Ya puedes iniciar sesión.");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Laservision v1</h1>
        <p className="text-sm text-gray-500 mt-1">
          Inicia sesión para usar la plataforma.
        </p>
      </div>

      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 space-y-4">
        <div>
          <label className="text-xs text-gray-500">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
            placeholder="you@company.com"
            type="email"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-[#0d0d12] border border-[#1f1f25] rounded-xl px-4 py-3 text-white"
            placeholder="••••••••"
            type="password"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={signIn}
            disabled={loading}
            className="bg-[#c8b6ff] hover:bg-[#b096ff] disabled:opacity-60 text-black font-semibold py-2.5 rounded-xl text-sm px-4"
          >
            {loading ? "…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={signUp}
            disabled={loading}
            className="bg-[#16161a] border border-[#1f1f25] text-gray-200 font-semibold py-2.5 rounded-xl text-sm px-4 hover:bg-[#1f1f25]"
          >
            Create account
          </button>
        </div>

        <p className="text-[11px] text-gray-600">
          Nota: para "acciones 100% reales" necesitamos usuarios autenticados.
        </p>
      </div>
    </div>
  );
}
