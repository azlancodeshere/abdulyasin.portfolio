#!/usr/bin/env node
/**
 * Refresh the portfolio's GitHub-derived fields.
 *
 *   npm run sync
 *
 * Re-reads github.com/azlancodeshere and updates, for every project card:
 *   - stars     (stargazers_count)
 *   - live      (homepage, when the repo gains a deployment)
 *
 * Everything else (copy, skills, links) is hand-written in src/data/profile.js
 * so the site stays aligned with the GitHub profile, resume and LinkedIn.
 *
 * Layout note: inside each project object the fields read
 *   ... live: (optional) ... code: ... repo: "name", stars: N ...
 * so a project's `live:` always sits between its predecessor's `repo:` and its
 * own `repo:` — that is how the two fields are located independently.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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

// Locate every `repo: "name",` marker up front (offsets stay valid while we
// patch from the end of the file backwards).
const markers = [...source.matchAll(/repo:\s*"([^"]+)",/g)].map((m) => ({
  name: m[1],
  start: m.index,
}));

let updated = 0;
let missing = 0;
const edits = []; // { start, end, text }

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

  // --- stars (always the line right after `repo:`) ------------------------
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

  // --- live url -----------------------------------------------------------
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
    // Repo gained a homepage since the card was written — add the link.
    const codeOffset = beforeRepo.search(/code:/);
    if (codeOffset !== -1) {
      const at = regionStart + codeOffset;
      const indent = (beforeRepo.match(/^\s*/m) || ["      "])[0];
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

// Apply from the end backwards so earlier offsets stay valid.
edits.sort((a, b) => b.start - a.start);
let out = source;
for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

if (updated === 0) {
  console.error("No project entries matched — check src/data/profile.js");
  process.exit(1);
}

await writeFile(DATA_FILE, out, "utf8");

console.log(`\nChecked ${updated} project(s), ${edits.length} field(s) changed${missing ? `, ${missing} missing` : ""}.`);
console.log(edits.length ? "Run `npm run build` to verify before deploying." : "Already up to date.");
