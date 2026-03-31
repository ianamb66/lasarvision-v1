import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  PieChart,
  Briefcase,
  BarChart2,
  Cpu,
  Settings,
  Search,
  Bell,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-300 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#1f1f25] flex flex-col h-screen overflow-y-auto hidden md:flex">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white text-black font-bold rounded flex items-center justify-center text-xs">
              MI
            </div>
            <span className="text-white font-bold text-lg tracking-wide">
              Lasarvision<span className="text-gray-500"> v1</span>
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 bg-[#16161a] p-2 rounded-xl border border-[#1f1f25]">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-8 h-8 rounded-full bg-gray-800"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Cuenta</p>
              <p className="text-sm text-white font-semibold">Grupo Inversor</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm transition-colors">
            Publicar Oportunidad
          </button>
        </div>

        <div className="px-4 space-y-1 mb-6">
          <div className="flex gap-2 mb-4 bg-[#16161a] p-1 rounded-xl">
            <button className="flex-1 bg-[#26262f] text-white text-xs py-1.5 rounded-lg font-medium">
              Mercados
            </button>
            <button className="flex-1 text-gray-500 text-xs py-1.5 rounded-lg font-medium hover:text-white">
              Sectores
            </button>
          </div>

          <p className="text-[10px] uppercase font-bold text-gray-600 px-3 py-2">
            Plataforma
          </p>

          {[
            { id: "/", icon: Home, label: "Dashboard" },
            { id: "/investments", icon: PieChart, label: "Mis Inversiones" },
            { id: "/marketplace", icon: Briefcase, label: "Marketplace" },
            { id: "/calculator", icon: BarChart2, label: "Calculadora ROI" },
            { id: "/api", icon: Globe, label: "API Externa", external: true },
            { id: "/ai", icon: Cpu, label: "Motor IA", badge: "Beta" },
          ].map((item) => (
            <NavLink
              key={item.id}
              to={item.id}
              className={({ isActive }) =>
                cx(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                  isActive
                    ? "bg-[#1f1f25] text-white font-medium"
                    : "text-gray-400 hover:bg-[#16161a] hover:text-gray-200"
                )
              }
              end={item.id === "/"}
              onClick={(e) => {
                if (item.external) {
                  e.preventDefault();
                  window.open(
                    "https://www.coingecko.com/en/api/documentation",
                    "_blank"
                  );
                }
              }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.external && <ArrowUpRight className="w-3 h-3" />}
              {item.badge && (
                <span className="bg-[#c8b6ff] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="px-4 mt-auto mb-6 space-y-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center text-[8px] text-white">
                3
              </span>
              Seguimiento
            </span>
          </div>

          {[
            {
              name: "Bitcoin",
              val: "Live",
              icon: Zap,
              color: "text-purple-400",
              bg: "bg-purple-400/10",
            },
            {
              name: "Ethereum",
              val: "Live",
              icon: TrendingUp,
              color: "text-red-400",
              bg: "bg-red-400/10",
            },
            {
              name: "Solana",
              val: "Live",
              icon: Globe,
              color: "text-indigo-400",
              bg: "bg-indigo-400/10",
            },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 px-3">
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-white">{item.name}</p>
                <p className="text-xs text-gray-500">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0b0b0f]">
        <header className="min-h-16 flex items-center justify-between md:justify-end px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-3 bg-[#16161a] border border-[#1f1f25] px-3 py-1.5 rounded-full w-full sm:w-auto">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none text-sm text-white focus:outline-none w-full sm:w-48"
            />
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative cursor-pointer" aria-label="Notificaciones">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c8b6ff] rounded-full border-2 border-[#0b0b0f]" />
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" type="button">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Settings</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pt-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
