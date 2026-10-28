export const GITHUB_USER = "azlancodeshere";

const API = "https://api.github.com";

async function get(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function toCard(repo) {
  return {
    name: repo.name,
    description: repo.description || "",
    homepage: (repo.homepage || "").trim(),
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || "",
    topics: repo.topics || [],
    pushedAt: repo.pushed_at,
    archived: Boolean(repo.archived),
  };
}

export async function fetchGithub() {
  const [user, repos] = await Promise.all([
    get(`/users/${GITHUB_USER}`),
    get(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`),
  ]);

  const usable = repos.filter((r) => !r.fork && !r.archived);

  return {
    fetchedAt: new Date().toISOString(),
    public_repos: user.public_repos,
    followers: user.followers,
    stars: usable.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
    liveApps: usable.filter((r) => (r.homepage || "").trim()).length,
    repos: usable.map(toCard),
  };
}
