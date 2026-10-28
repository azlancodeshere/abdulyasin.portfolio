import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fetchContributions, GITHUB_USER } from "./scripts/lib/contributions.mjs";

/**
 * `/api/contributions` only exists on Vercel. This middleware serves the
 * exact same payload in `npm run dev` so the calendar shows live data
 * locally too.
 */
function contributionsDevApi() {
  return {
    name: "contributions-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/contributions", async (req, res) => {
        try {
          const { days, total } = await fetchContributions(GITHUB_USER);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(
            JSON.stringify({ user: GITHUB_USER, fetchedAt: new Date().toISOString(), total, days }),
          );
        } catch (err) {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: String(err.message) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contributionsDevApi()],
});
