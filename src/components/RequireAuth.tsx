import type React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="text-sm text-gray-400">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return children;
}
