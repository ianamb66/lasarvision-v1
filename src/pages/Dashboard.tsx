import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Globe,
  Link2,
  Lock,
  Play,
  Settings,
  Share2,
  TrendingUp,
  Zap,
  ChevronRight,
} from "lucide-react";
import { fetchMarkets } from "../lib/api";
import { KpiCard } from "../components/KpiCard";
import { Sparkline } from "../components/Sparkline";

function formatMoneyUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Dashboard() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["markets"],
    queryFn: () => fetchMarkets("bitcoin,ethereum,solana"),
    staleTime: 60_000,
  });

  const coins = data ?? [];
  const [btc, eth, sol] = coins;

  const updatedText = useMemo(() => {
    const now = new Date();
    return now.toLocaleString("es-MX", {
      weekday: undefined,
      year: undefined,
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [isFetching]);

  const ActionIcon = ({
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-[#1a1a20] border border-[#2a2a35] flex items-center justify-center hover:bg-[#2a2a35] transition-colors"
      aria-label={label}
      title={label}
      type="button"
    >
      {icon}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Datos en vivo (proxy CoinGecko)
            <span className="bg-[#16161a] px-2 py-0.5 rounded text-white text-xs ml-2">
              3 Mercados
            </span>
          </p>
          <h1 className="text-3xl font-bold text-white mt-1">Oportunidades Principales</h1>
          {isError && (
            <p className="text-xs text-red-400 mt-2">
              No se pudieron cargar los datos en este momento. Puedes reintentar.
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
          <button
            onClick={() => refetch()}
            className="bg-[#16161a] border border-[#1f1f25] text-gray-300 text-sm px-3 py-2 rounded-lg hover:bg-[#1f1f25] transition-colors"
            type="button"
          >
            {isFetching ? "Actualizando…" : "Actualizar"}
          </button>
          {["24H", "Sectores", "Desc"].map((filter) => (
            <button
              key={filter}
              className="bg-[#16161a] border border-[#1f1f25] text-gray-300 text-sm px-3 py-2 rounded-lg hover:bg-[#1f1f25] transition-colors flex items-center gap-2"
              type="button"
              onClick={() => toast(`${filter}: (demo) filtro no conectado todavía`)}
            >
              {filter} <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          ))}
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <KpiCard
          title={btc ? `${btc.name} • Precio` : "Bitcoin • Precio"}
          value={isLoading ? "—" : btc ? formatMoneyUSD(btc.current_price) : "N/D"}
          delta={
            btc ? (
              <span className="inline-flex items-center gap-1">
                {btc.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {btc.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : undefined
          }
          deltaTone={
            btc
              ? btc.price_change_percentage_24h >= 0
                ? "up"
                : "down"
              : "neutral"
          }
          right={
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
          }
        >
          {btc?.sparkline_in_7d?.price && (
            <Sparkline data={btc.sparkline_in_7d.price.slice(-48)} stroke="#c4b5fd" />
          )}
        </KpiCard>

        <KpiCard
          title={eth ? `${eth.name} • Precio` : "Ethereum • Precio"}
          value={isLoading ? "—" : eth ? formatMoneyUSD(eth.current_price) : "N/D"}
          delta={
            eth ? (
              <span className="inline-flex items-center gap-1">
                {eth.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {eth.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : undefined
          }
          deltaTone={
            eth
              ? eth.price_change_percentage_24h >= 0
                ? "up"
                : "down"
              : "neutral"
          }
          right={
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
          }
        >
          {eth?.sparkline_in_7d?.price && (
            <Sparkline data={eth.sparkline_in_7d.price.slice(-48)} stroke="#34d399" />
          )}
        </KpiCard>

        <KpiCard
          title={sol ? `${sol.name} • Precio` : "Solana • Precio"}
          value={isLoading ? "—" : sol ? formatMoneyUSD(sol.current_price) : "N/D"}
          delta={
            sol ? (
              <span className="inline-flex items-center gap-1">
                {sol.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {sol.price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : undefined
          }
          deltaTone={
            sol
              ? sol.price_change_percentage_24h >= 0
                ? "up"
                : "down"
              : "neutral"
          }
          right={
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-400" />
            </div>
          }
        >
          {sol?.sparkline_in_7d?.price && (
            <Sparkline data={sol.sparkline_in_7d.price.slice(-48)} stroke="#f87171" />
          )}
        </KpiCard>

        {/* AI Promo */}
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
              Portafolio que consume datos de mercado (demo) y propone recomendaciones.
            </p>
          </div>
          <div className="mt-6 space-y-3 z-10">
            <button
              className="w-full bg-[#c8b6ff] hover:bg-[#b096ff] text-black font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center gap-2"
              type="button"
              onClick={() => toast("Abrir reporte detallado (demo)")}
            >
              Ver Reporte Detallado <Briefcase className="w-4 h-4" />
            </button>
            <button
              className="w-full bg-[#1f1f25]/80 hover:bg-[#2a2a35] text-white border border-[#2a2a35] font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center gap-2 backdrop-blur-sm"
              type="button"
              onClick={() => toast("Configurar objetivos (demo)")}
            >
              Configurar Objetivos <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="bg-[#121216] border border-[#1f1f25] rounded-3xl p-6 relative">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <p className="text-sm font-semibold text-white mb-6">Análisis Detallado de Mercado</p>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-[#1f1f25] pb-8">
          <div className="flex-1">
            <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
              Última actualización - {updatedText} <Settings className="w-3 h-3" />
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Expansión Fintech (México)
                <div className="bg-red-500/20 p-1 rounded">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                </div>
              </h2>

              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <ActionIcon
                  icon={<Link2 className="w-4 h-4 text-gray-400" />}
                  label="Copiar link"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(window.location.href)
                      .then(() => toast.success("Link copiado"))
                      .catch(() => toast.error("No se pudo copiar"));
                  }}
                />
                <ActionIcon
                  icon={<Share2 className="w-4 h-4 text-gray-400" />}
                  label="Compartir"
                  onClick={() => toast("Compartir (demo)")}
                />
                <button
                  className="px-3 h-9 sm:h-8 rounded-lg bg-[#1a1a20] border border-[#2a2a35] flex items-center gap-2 text-xs text-gray-300 hover:bg-[#2a2a35] transition-colors"
                  type="button"
                  onClick={() => toast("Abrir perfil (demo)")}
                >
                  <span className="hidden sm:inline">Ver Perfil</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-1">Volumen de Mercado Proyectado, MXN</p>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <span className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                31.39686
                <span className="text-xl sm:text-2xl text-gray-500">M</span>
              </span>

              <div className="flex flex-col sm:flex-row gap-2 sm:mb-1 w-full sm:w-auto">
                <button
                  className="bg-[#c8b6ff] text-black px-4 py-2.5 rounded-xl text-sm font-bold w-full sm:w-auto"
                  type="button"
                  onClick={() => toast.success("Orden creada (demo)")}
                >
                  Invertir
                </button>
                <button
                  className="bg-[#1f1f25] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#2a2a35] transition-colors w-full sm:w-auto"
                  type="button"
                  onClick={() => toast("Solicitud enviada (demo)")}
                >
                  Contactar Socio
                </button>
              </div>
            </div>
          </div>

          {/* Widget */}
          <div className="w-full lg:w-1/3 bg-[#0d0d12] border border-[#1f1f25] rounded-2xl p-5 relative">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-white">Periodo de Inversión</span>
              <span className="bg-[#1f1f25] text-xs px-2 py-1 rounded text-gray-400">
                6 Meses
              </span>
            </div>
            <p className="text-xs text-gray-500">Periodo de Contribución (Meses)</p>

            <div className="mt-5 relative">
              <div className="flex items-center justify-center mb-2 relative opacity-80">
                <div className="flex items-center gap-1 h-8 opacity-60">
                  {Array.from({ length: 20 }, (_, i) => i).map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-purple-400 rounded-full"
                      style={{ height: `${Math.max(8, (Math.sin(i) + 1) * 50)}%` }}
                    />
                  ))}
                </div>

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

        {/* Stats */}
        <div className="pt-6">
          <div className="flex items-center justify-between gap-6 overflow-x-auto pb-3 mb-3 border-b border-[#1f1f25]">
            {[
              { label: "Momentum", sides: true },
              { label: "General" },
              { label: "Riesgo", sides: true },
              { label: "Retorno", sides: true },
            ].map((h) => (
              <div key={h.label} className="flex items-center gap-2 bg-[#121216] px-2 shrink-0">
                {h.sides && <ChevronRight className="w-3 h-3 text-gray-600 rotate-180" />}
                <span className="text-[10px] font-bold uppercase text-gray-400">{h.label}</span>
                {h.sides && <ChevronRight className="w-3 h-3 text-gray-600" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Crecimiento Sectorial</span>
                <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">24H</span>
              </div>
              <p className="text-2xl font-bold text-white">-0.82%</p>
            </div>

            <div className="bg-[#0b0b0f] rounded-2xl p-4 border border-[#1f1f25]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Ticket Promedio</span>
                <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">24H</span>
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
                <span className="text-[10px] bg-[#16161a] px-1.5 py-0.5 rounded text-gray-400 border border-[#1f1f25]">24H</span>
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
  );
}
