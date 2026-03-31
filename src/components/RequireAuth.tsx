import type React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  const demoMode = !url || !key;

  if (demoMode) return children;
  if (loading) return <div className="text-sm text-gray-400">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return children;
}
