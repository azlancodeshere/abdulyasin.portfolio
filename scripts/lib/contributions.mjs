

export const GITHUB_USER = "azlancodeshere";

export function parseContributionsHtml(html) {
  const cells = [
    ...html.matchAll(
      /data-date="(\d{4}-\d{2}-\d{2})" id="contribution-day-component-(\d+)-(\d+)" data-level="(\d)"/g,
    ),
  ].map(([, date, row, col, level]) => ({ date, row: +row, col: +col, level: +level }));

  if (!cells.length) throw new Error("no contribution cells parsed");

  const counts = new Map();
  for (const [, row, col, text] of html.matchAll(
    /for="contribution-day-component-(\d+)-(\d+)"[^>]*>([^<]+)</g,
  )) {
    const m = text.trim().match(/^(\d+) contributions?/);
    counts.set(`${row}-${col}`, m ? Number(m[1]) : 0);
  }

  cells.sort((a, b) => a.col - b.col || a.row - b.row);
  const days = cells.map((c) => [c.date, c.level, counts.get(`${c.row}-${c.col}`) ?? 0]);
  const total = days.reduce((sum, d) => sum + d[2], 0);

  return { days, total };
}

export async function fetchContributions(user = GITHUB_USER) {
  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers: { "User-Agent": "portfolio-sync", Accept: "text/html" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return parseContributionsHtml(await res.text());
}

