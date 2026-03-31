export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
};

export async function fetchMarkets(ids?: string): Promise<MarketCoin[]> {
  const url = new URL("/api/markets", window.location.origin);
  if (ids) url.searchParams.set("ids", ids);
  const r = await fetch(url.toString());
  const json = await r.json();
  if (!r.ok || !json?.ok) throw new Error(json?.error || "fetch_failed");
  return json.data as MarketCoin[];
}
