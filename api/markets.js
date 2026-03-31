// Vercel Serverless Function (Node)
// Proxy sencillo para evitar CORS y centralizar caching.
// Fuente: CoinGecko (sin key) — datos casi en tiempo real.

module.exports = async (req, res) => {
  try {
    const ids =
      typeof req.query?.ids === "string" && req.query.ids.trim().length
        ? req.query.ids
        : "bitcoin,ethereum,solana";

    const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
    url.searchParams.set("vs_currency", "usd");
    url.searchParams.set("ids", ids);
    url.searchParams.set("order", "market_cap_desc");
    url.searchParams.set("per_page", "10");
    url.searchParams.set("page", "1");
    url.searchParams.set("sparkline", "true");
    url.searchParams.set("price_change_percentage", "24h");

    const r = await fetch(url.toString(), {
      headers: {
        accept: "application/json",
        "user-agent": "lasarvision-v1/1.0",
      },
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      res.setHeader("Cache-Control", "no-store");
      return res
        .status(r.status)
        .json({ ok: false, error: "upstream_error", detail: text.slice(0, 500) });
    }

    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ ok: true, data });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
};
