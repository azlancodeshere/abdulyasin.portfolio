/**
 * GET /api/contributions — real-time GitHub contribution calendar.
 *
 * Scrapes github.com/users/<user>/contributions on the server (the endpoint
 * is not CORS-enabled, so the browser cannot call it directly) and returns
 * { user, fetchedAt, total, days }. The CDN caches it for 30 minutes, so the
 * grid stays fresh without a redeploy and without hammering GitHub.
 *
 * On failure the client keeps rendering the bundled snapshot in
 * src/data/contributions.json (refreshed by `npm run sync`).
 */
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
