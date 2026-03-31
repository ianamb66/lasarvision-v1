import { useMemo, useState } from "react";
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
  ArrowDownRight,
  TrendingUp,
  Zap,
  Globe,
  Lock,
  Play,
  Link2,
  Share2,
} from "lucide-react";

// --- SVGs para los Mini Gráficos (Sparklines) ---
const SparklineGreen = () => (
  <svg
    viewBox="0 0 100 30"
    className="w-full h-12 stroke-green-400 fill-none"
    preserveAspectRatio="none"
  >
    <path
      d="M0,25 C10,20 20,25 30,15 C40,5 50,20 60,10 C70,0 80,15 90,5 L100,0"
      strokeWidth="2"
    />
    <circle cx="90" cy="5" r="3" className="fill-green-400" />
  </svg>
);

const SparklinePurple = () => (
  <svg
    viewBox="0 0 100 30"
    className="w-full h-12 stroke-purple-400 fill-none"
    preserveAspectRatio="none"
  >
    <path
      d="M0,20 C15,25 25,10 40,15 C50,20 65,5 80,10 L100,5"
      strokeWidth="2"
    />
    <circle cx="80" cy="10" r="3" className="fill-purple-400" />
  </svg>
);

const SparklineRed = () => (
  <svg
    viewBox="0 0 100 30"
    className="w-full h-12 stroke-red-500 fill-none"
    preserveAspectRatio="none"
  >
    <path
      d="M0,5 C20,10 30,5 50,15 C60,20 70,10 85,25 L100,20"
      strokeWidth="2"
    />
    <circle cx="85" cy="25" r="3" className="fill-red-500" />
  </svg>
);

const SoundWave = () => {
  const bars = useMemo(
    () => Array.from({ length: 20 }, () => Math.max(6, Math.random() * 100)),
    []
  );
  return (
    <div className="flex items-center gap-1 h-8 opacity-50">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 bg-purple-400 rounded-full"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-300 font-sans flex overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 flex-shrink-0 border-r border-[#1f1f25] flex flex-col h-screen overflow-y-auto hidden md:flex">
        {/* Header Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white text-black font-bold rounded flex items-center justify-center text-xs">
              MI
            </div>
            <span className="text-white font-bold text-lg tracking-wide">
              Market<span className="text-gray-500">®</span>
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>

        {/* User Profile & Action */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 bg-[#16161a] p-2 rounded-xl border border-[#1f1f25]">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-8 h-8 rounded-full bg-gray-800"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Empresa PRO</p>
              <p className="text-sm text-white font-semibold">Grupo Inversor</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-2.5 rounded-xl text-sm transition-colors">
            Publicar Oportunidad
          </button>
        </div>

        {/* Navigation */}
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
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "assets", icon: PieChart, label: "Mis Inversiones" },
            { id: "marketplace", icon: Briefcase, label: "Marketplace" },
            { id: "calculator", icon: BarChart2, label: "Calculadora ROI" },
            { id: "api", icon: Globe, label: "API Externa", external: true },
            { id: "ai", icon: Cpu, label: "Motor IA", badge: "Beta" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === item.id
                  ? "bg-[#1f1f25] text-white font-medium"
                  : "text-gray-400 hover:bg-[#16161a] hover:text-gray-200"
              }`}
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
            </button>
          ))}
        </div>

        {/* Active tracking section */}
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
              name: "Fintech México",
              val: "$7,699.00",
              icon: Zap,
              color: "text-purple-400",
              bg: "bg-purple-400/10",
            },
            {
              name: "AgroTech Arg",
              val: "$1,340.00",
              icon: TrendingUp,
              color: "text-red-400",
              bg: "bg-red-400/10",
            },
            {
              name: "Energía Brasil",
              val: "$540.00",
              icon: Globe,
              color: "text-indigo-400",
              bg: "bg-indigo-400/10",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-3">
              <div
                className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-white">{item.name}</p>
                <p className="text-xs text-gray-500">Valor {item.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Banner */}
        <div className="mx-4 mb-6 mt-2 p-4 rounded-2xl bg-gradient-to-br from-[#1c1c25] to-[#121216] border border-[#2a2a35] relative overflow-hidden group cursor-pointer hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
          <p className="text-sm text-white font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" /> Activar Super
          </p>
          <p className="text-xs text-gray-500 mt-1">Desbloquea datos del FMI y BM.</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0b0b0f]">
        {/* Top Header */}
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
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c8b6ff] rounded-full border-2 border-[#0b0b0f]" />
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Settings</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pt-2">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">
                Recomendadas últimas 24 hrs{" "}
                <span className="bg-[#16161a] px-2 py-0.5 rounded text-white text-xs ml-2">
                  3 Mercados
                </span>
              </p>
              <h1 className="text-3xl font-bold text-white mt-1">
                Oportunidades Principales
              </h1>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
              {["24H", "Sectores", "Desc"].map((filter) => (
                <button
                  key={filter}
                  className="bg-[#16161a] border border-[#1f1f25] text-gray-300 text-sm px-3 py-2 rounded-lg hover:bg-[#1f1f25] transition-colors flex items-center gap-2"
                >
                  {filter} <ChevronRight className="w-3 h-3 rotate-90" />
                </button>
              ))}
            </div>
          </div>

          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Asset Card 1 */}
            <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sector Financiero</p>
                    <p className="text-white font-semibold">Fintech México</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#16161a] flex items-center justify-center cursor-pointer group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">Tasa de Crecimiento</p>
              <p className="text-2xl font-bold text-white mb-1">13.62%</p>
              <p className="text-xs text-green-400 flex items-center gap-1 mb-4">
                <ArrowUpRight className="w-3 h-3" /> 6.25%
              </p>
              <div className="relative h-12">
                <span className="absolute top-0 right-0 text-xs text-gray-400 bg-[#0b0b0f] px-1 rounded">
                  +$2,956
                </span>
                <SparklinePurple />
              </div>
            </div>

            {/* Asset Card 2 */}
            <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Agro & Tech</p>
                    <p className="text-white font-semibold">AgroTech Arg.</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#16161a] flex items-center justify-center cursor-pointer group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">Tasa de Crecimiento</p>
              <p className="text-2xl font-bold text-white mb-1">12.72%</p>
              <p className="text-xs text-green-400 flex items-center gap-1 mb-4">
                <ArrowUpRight className="w-3 h-3" /> 5.67%
              </p>
              <div className="relative h-12">
                <span className="absolute top-0 right-0 text-xs text-gray-400 bg-[#0b0b0f] px-1 rounded">
                  +$2,009
                </span>
                <SparklineGreen />
              </div>
            </div>

            {/* Asset Card 3 */}
            <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Energía Renovable</p>
                    <p className="text-white font-semibold">Infra Brasil</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#16161a] flex items-center justify-center cursor-pointer group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">Tasa de Crecimiento</p>
              <p className="text-2xl font-bold text-white mb-1">6.29%</p>
              <p className="text-xs text-red-400 flex items-center gap-1 mb-4">
                <ArrowDownRight className="w-3 h-3" /> 1.89%
              </p>
              <div className="relative h-12">
                <span className="absolute top-0 right-0 text-xs text-gray-400 bg-[#0b0b0f] px-1 rounded">
                  -$0,987
                </span>
                <SparklineRed />
              </div>
            </div>

            {/* AI Promo Card */}
            <div className="bg-gradient-to-br from-[#1b143a] via-[#100b21] to-[#0b0b0f] border border-[#3b2d6e] rounded-3xl p-6 relative flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-[80px] opacity-20" />
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white text-black font-bold rounded flex items-center justify-center text-xs">
                      MI
                    </div>
                    <span className="text-white font-bold text-sm">AI Engine®</span>
                  </div>
                  <span className="bg-[#c8b6ff] text-black text-xs px-2 py-1 rounded font-bold">
                    New
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Estrategias Generadas por IA
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[80%]">
                  Un portafolio todo en uno que analiza datos del FMI para
                  recomendaciones inteligentes en LatAm.
                </p>
              </div>
              <div className="mt-6 space-y-3 z-10">
                <button className="w-full bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center gap-2">
                  Ver Reporte Detallado <Briefcase className="w-4 h-4" />
                </button>
                <button className="w-full bg-[#1f1f25]/80 hover:bg-[#2a2a35] text-white border border-[#2a2a35] font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center gap-2 backdrop-blur-sm">
                  Configurar Objetivos <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Large Bottom Panel */}
          <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 relative">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
            <p className="text-sm font-semibold text-white mb-6">
              Análisis Detallado de Mercado
            </p>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-[#1f1f25] pb-8">
              {/* Left side */}
              <div className="flex-1">
                <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                  Última actualización - Hace 45 minutos <Settings className="w-3 h-3" />
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Expansión Fintech (México)
                    <div className="bg-red-500/20 p-1 rounded">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    </div>
                  </h2>

                  <div className="flex flex-wrap gap-2 sm:ml-auto">
                    <button className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a20] border border-[#2a2a35] flex items-center justify-center hover:bg-[#2a2a35] transition-colors">
                      <Link2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a20] border border-[#2a2a35] flex items-center justify-center hover:bg-[#2a2a35] transition-colors">
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="px-3 h-9 sm:h-8 rounded-lg bg-[#1a1a20] border border-[#2a2a35] flex items-center gap-2 text-xs text-gray-300 hover:bg-[#2a2a35] transition-colors">
                      <span className="hidden sm:inline">Ver Perfil</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  Volumen de Mercado Proyectado, MXN
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                  <span className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    31.39686
                    <span className="text-xl sm:text-2xl text-gray-500">M</span>
                  </span>

                  <div className="flex flex-col sm:flex-row gap-2 sm:mb-1 w-full sm:w-auto">
                    <button className="bg-[#c8b6ff] text-black px-4 py-2.5 rounded-xl text-sm font-bold w-full sm:w-auto">
                      Invertir
                    </button>
                    <button className="bg-[#1f1f25] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2a2a35] transition-colors w-full sm:w-auto">
                      Contactar Socio
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side widget */}
              <div className="w-full lg:w-1/3 bg-[#0d0d12] border border-[#1f1f25] rounded-2xl p-5 relative">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-semibold text-white">
                    Periodo de Inversión
                  </span>
                  <span className="bg-[#1f1f25] text-xs px-2 py-1 rounded text-gray-400">
                    6 Meses
                  </span>
                </div>
                <p className="text-xs text-gray-500 absolute top-12">
                  Periodo de Contribución (Meses)
                </p>
                <div className="mt-8 relative">
                  <div className="flex items-center justify-center mb-2 relative">
                    <SoundWave />
                    <div className="w-8 h-8 bg-[#c8b6ff] rounded-full absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(200,182,255,0.4)] border-4 border-[#0d0d12]">
                      <Play className="w-3 h-3 text-black fill-current" />
                    </div>
                    <div className="absolute top-[-25px] left-2/3 -translate-x-1/2 bg-[#1f1f25] text-white text-[10px] px-2 py-1 rounded border border-[#2a2a35]">
                      4 Meses
                    </div>
                  </div>
                  <div className="h-0.5 bg-gray-800 w-full relative">
                    <div className="absolute top-0 left-0 h-full bg-[#c8b6ff] w-2/3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="pt-6">
              {/* Headers (scrollable on mobile) */}
              <div className="flex items-center justify-between gap-6 overflow-x-auto pb-3 mb-3 border-b border-[#1f1f25]">
                {[
                  { label: "Momentum", sides: true },
                  { label: "General" },
                  { label: "Riesgo", sides: true },
                  { label: "Retorno", sides: true },
                ].map((h) => (
                  <div
                    key={h.label}
                    className="flex items-center gap-2 bg-[#121216] px-2 shrink-0"
                  >
                    {h.sides && (
                      <ChevronRight className="w-3 h-3 text-gray-600 rotate-180" />
                    )}
                    <span className="text-[10px] font-bold uppercase text-gray-400">
                      {h.label}
                    </span>
                    {h.sides && (
                      <ChevronRight className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Crecimiento Sectorial</span>
                    <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">
                      24H
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">-0.82%</p>
                </div>

                <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Ticket Promedio</span>
                    <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">
                      24H
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white flex items-end gap-1">
                    $41.99
                    <span className="text-xs text-red-500 font-normal flex items-center mb-1">
                      <ArrowDownRight className="w-3 h-3" />-1.09%
                    </span>
                  </p>
                </div>

                <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Ratio de Inversión</span>
                    <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">
                      24H
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">60.6%</p>
                </div>

                <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25] flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">Tasa de Retorno (IRR)</span>
                  </div>
                  <div className="space-y-2 relative">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[#1f1f25] h-1.5 rounded-full relative">
                        <div className="absolute top-0 left-0 bg-[#c8b6ff] h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(200,182,255,0.5)]" />
                        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full" />
                      </div>
                      <span className="text-[10px] text-white whitespace-nowrap">
                        2.23% <span className="text-gray-600">24H Ago</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-[60%] bg-[#1f1f25] h-1.5 rounded-full relative">
                        <div className="absolute top-0 left-0 bg-gray-500 h-full w-full rounded-full" />
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap">
                        1.46% <span className="text-gray-700">48H Ago</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
