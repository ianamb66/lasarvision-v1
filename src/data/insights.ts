export type InsightTopic = "AI" | "Trade" | "Investment" | "Consumers";

export type Insight = {
  id: string;
  title: string;
  takeaway: string;
  whyItMatters: string;
  industry: string;
  country: string;
  topic: InsightTopic;
  chart: {
    type: "line" | "bar";
    seriesLabel: string;
    data: Array<{ label: string; value: number }>;
  };
  sources?: string[];
};

export const INSIGHTS: Insight[] = [
  {
    id: "mx-fintech-growth",
    title: "Fintech México: crecimiento sostenido en adopción digital",
    takeaway: "El crecimiento en adopción y transacciones sugiere ventana de entrada para servicios B2B y pagos.",
    whyItMatters: "Acelera GTM: partners locales + compliance temprano reducen tiempo a revenue.",
    industry: "Fintech",
    country: "México",
    topic: "Investment",
    chart: {
      type: "line",
      seriesLabel: "Índice (base 100)",
      data: [
        { label: "2019", value: 100 },
        { label: "2020", value: 112 },
        { label: "2021", value: 130 },
        { label: "2022", value: 148 },
        { label: "2023", value: 165 },
        { label: "2024", value: 182 },
      ],
    },
    sources: ["(placeholder)"],
  },
  {
    id: "mx-trade-us",
    title: "México: resiliencia exportadora hacia Norteamérica",
    takeaway: "El nearshoring mantiene demanda en manufactura y logística.",
    whyItMatters: "Define qué estados/zonas priorizar y qué partners logísticos habilitar.",
    industry: "Manufactura",
    country: "México",
    topic: "Trade",
    chart: {
      type: "bar",
      seriesLabel: "Índice",
      data: [
        { label: "Q1", value: 84 },
        { label: "Q2", value: 92 },
        { label: "Q3", value: 98 },
        { label: "Q4", value: 103 },
      ],
    },
    sources: ["(placeholder)"],
  },
  {
    id: "mx-ai-talent",
    title: "Talento AI en México: crecimiento de oferta, brecha en seniority",
    takeaway: "Fuerte pipeline junior; el cuello de botella está en perfiles senior y data engineering.",
    whyItMatters: "GTM: conviene partner con universidades + hiring distribuido + nearshore.",
    industry: "AI",
    country: "México",
    topic: "AI",
    chart: {
      type: "line",
      seriesLabel: "Vacantes",
      data: [
        { label: "Ene", value: 40 },
        { label: "Feb", value: 44 },
        { label: "Mar", value: 52 },
        { label: "Abr", value: 57 },
        { label: "May", value: 63 },
        { label: "Jun", value: 70 },
      ],
    },
    sources: ["(placeholder)"],
  },
];
