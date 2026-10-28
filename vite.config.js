import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fetchContributions, GITHUB_USER } from "./scripts/lib/contributions.mjs";
import { fetchGithub } from "./scripts/lib/github.mjs";

const routes = {
  "/api/contributions": async () => {
    const { days, total } = await fetchContributions(GITHUB_USER);
    return { user: GITHUB_USER, fetchedAt: new Date().toISOString(), total, days };
  },
  "/api/github": async () => fetchGithub(),
};

function githubDevApi() {
  return {
    name: "github-dev-api",
    configureServer(server) {
      server.middlewares.use("/api", async (req, res) => {
        const path = req.url.split("?")[0];
        const handler = routes[`/api${path}`];
        if (!handler) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: "Not found" }));
          return;
        }
        try {
          const payload = await handler();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(JSON.stringify(payload));
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
  plugins: [react(), tailwindcss(), githubDevApi()],
});
