#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { fetchContributions } from "./lib/contributions.mjs";
import { fetchGithub } from "./lib/github.mjs";

const USER = "azlancodeshere";
const DATA_FILE = fileURLToPath(new URL("../src/data/profile.js", import.meta.url));

const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`, {
  headers: { Accept: "application/vnd.github+json" },
});

if (!res.ok) {
  console.error(`GitHub API error: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const repos = await res.json();
const byName = new Map(repos.map((r) => [r.name, r]));
const source = await readFile(DATA_FILE, "utf8");

const markers = [...source.matchAll(/repo:\s*"([^"]+)",/g)].map((m) => ({
  name: m[1],
  start: m.index,
}));

let updated = 0;
let missing = 0;
const edits = []; 

for (let i = 0; i < markers.length; i += 1) {
  const { name, start } = markers[i];
  const gh = byName.get(name);

  if (!gh) {
    missing += 1;
    console.warn(`  ! repo not found on GitHub: ${name}`);
    continue;
  }

  const regionEnd = i + 1 < markers.length ? markers[i + 1].start : source.length;
  const regionStart = i > 0 ? markers[i - 1].start : 0;
  const afterRepo = source.slice(start, regionEnd);
  const beforeRepo = source.slice(regionStart, start);

  const starsMatch = afterRepo.match(/stars:\s*(\d+)/);
  if (starsMatch) {
    const next = gh.stargazers_count ?? 0;
    const from = start + starsMatch.index;
    const to = from + starsMatch[0].length;
    if (String(next) !== starsMatch[1]) {
      edits.push({ start: from, end: to, text: `stars: ${next}` });
      console.log(`  ★ ${name}: ${starsMatch[1]} → ${next}`);
    }
  }

  const homepage = gh.homepage ? gh.homepage.trim() : "";
  const liveMatch = beforeRepo.match(/live:\s*"([^"]*)"/);

  if (liveMatch && homepage) {
    const from = regionStart + liveMatch.index;
    const to = from + liveMatch[0].length;
    if (homepage !== liveMatch[1]) {
      edits.push({ start: from, end: to, text: `live: ${JSON.stringify(homepage)}` });
      console.log(`  ↗ ${name}: ${liveMatch[1] || "(none)"} → ${homepage}`);
    }
  } else if (!liveMatch && homepage) {
    const codeOffset = beforeRepo.search(/code:/);
    if (codeOffset !== -1) {
      const at = regionStart + codeOffset;
      const lineStart = beforeRepo.lastIndexOf("\n", codeOffset - 1) + 1;
      const rawIndent = beforeRepo.slice(lineStart, codeOffset);
      const indent = /^[ \t]*$/.test(rawIndent) ? rawIndent : "      ";
      edits.push({
        start: at,
        end: at,
        text: `live: ${JSON.stringify(homepage)},\n${indent}`,
      });
      console.log(`  + ${name}: added live url ${homepage}`);
    }
  }

  updated += 1;
}

edits.sort((a, b) => b.start - a.start);
let out = source;
for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

if (updated === 0) {
  console.error("No project entries matched — check src/data/profile.js");
  process.exit(1);
}

await writeFile(DATA_FILE, out, "utf8");

const CONTRIB_FILE = fileURLToPath(new URL("../src/data/contributions.json", import.meta.url));

try {
  const { days, total } = await fetchContributions(USER);
  await writeFile(CONTRIB_FILE, `${JSON.stringify({ user: USER, total, days })}\n`, "utf8");
  console.log(`  ◧ contributions: ${days.length} days, ${total} total`);
} catch (err) {
  console.warn(`  ! contribution sync failed (kept previous data): ${err.message}`);
}

const GITHUB_FILE = fileURLToPath(new URL("../src/data/github.json", import.meta.url));

try {
  const gh = await fetchGithub();
  await writeFile(GITHUB_FILE, `${JSON.stringify(gh)}\n`, "utf8");
  console.log(
    `  ◧ github: ${gh.public_repos} repos, ${gh.stars} stars, ${gh.liveApps} live apps, ${gh.followers} followers, ${gh.repos.length} listed`,
  );
} catch (err) {
  console.warn(`  ! github stats sync failed (kept previous data): ${err.message}`);
}

console.log(`\nChecked ${updated} project(s), ${edits.length} field(s) changed${missing ? `, ${missing} missing` : ""}.`);
console.log(edits.length ? "Run `npm run build` to verify before deploying." : "Already up to date.");
