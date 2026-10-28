import { fetchContributions, GITHUB_USER } from "../scripts/lib/contributions.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  try {
    const { days, total } = await fetchContributions(GITHUB_USER);
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 200;
    return res.end(
      JSON.stringify({ user: GITHUB_USER, fetchedAt: new Date().toISOString(), total, days }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: `GitHub contributions fetch failed: ${err.message}` }));
  }
}
