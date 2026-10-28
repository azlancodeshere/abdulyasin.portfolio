import { useState } from "react";
import { ArrowUpRight, ChevronDown, Code2, ExternalLink, FolderGit2, Star } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";
import { useGithub } from "../hooks/useGithub.js";

function StackPills({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {(items.length ? items : ["GitHub"]).map((t) => (
        <li
          key={t}
          className="rounded-md border border-line bg-subtle px-2 py-0.5 font-mono text-[11px] font-medium text-ink-2"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ActionButtons({ live, code, stars }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-page shadow-xs transition-all hover:bg-sky-400 hover:shadow-sm hover:-translate-y-0.5"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      )}
      <a
        href={code}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink transition-all hover:border-line-hi hover:bg-surface-hover hover:text-accent"
      >
        <GithubIcon className="size-3.5" />
        <span>Source Code</span>
      </a>
      {typeof stars === "number" && stars > 0 && (
        <span className="inline-flex items-center gap-1 rounded-md border border-line bg-subtle px-2 py-1 font-mono text-[11px] text-ink-3">
          <Star className="size-3 text-amber-400 fill-amber-400" aria-hidden="true" />
          {stars}
        </span>
      )}
    </div>
  );
}

function CodePlaceholder({ name, category }) {
  return (
    <div className="grid-bg flex h-full w-full flex-col items-center justify-center bg-subtle p-4 text-center">
      <FolderGit2 className="size-8 text-accent/50 mb-2" />
      <span className="font-mono text-sm font-semibold text-ink">
        {name.toLowerCase().replace(/\s+/g, "-")}
      </span>
      <span className="mt-1 text-[11px] text-ink-3">{category || "Open Source"}</span>
    </div>
  );
}

const CATEGORY_RULES = [
  { category: "Full Stack", pattern: /full.?stack|mern|ecommerce|hospital|booking|ticket|chat|uber|inventory|notes|hire|surhires|store/i },
  { category: "Backend", pattern: /api|backend|server|express|node|django|rest|auth|database|mongo|remainder|reminder/i },
  { category: "Frontend", pattern: /react|next|ui|ux|figma|landing|portfolio|gallery|frontend|css/i },
];

function deriveCategory(repo) {
  const haystack = `${repo.name} ${repo.description} ${(repo.topics || []).join(" ")}`;
  const match = CATEGORY_RULES.find((r) => r.pattern.test(haystack));
  return match ? match.category : repo.language ? "Full Stack" : "Tools";
}

function toCard(repo) {
  const category = deriveCategory(repo);
  return {
    name: repo.name,
    repo: repo.name,
    category,
    kind: repo.language || "Open Source",
    blurb: repo.description || "Public repository maintained on GitHub.",
    stack: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 5),
    live: repo.homepage || null,
    code: repo.url,
    stars: repo.stars,
    image: null,
  };
}

export default function Projects() {
  const { repos } = useGithub();
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const byName = new Map(repos.map((r) => [r.name, r]));

  const liveVersion = (p) => {
    const gh = byName.get(p.repo);
    return gh
      ? { ...p, stars: gh.stars, live: gh.homepage || p.live }
      : p;
  };

  const featured = profile.featured.map(liveVersion);
  const handWrittenOthers = profile.others.map(liveVersion);
  const known = new Set(profile.featured.concat(profile.others).map((p) => p.repo));
  const fromGithub = repos
    .filter((r) => !known.has(r.name) && (r.description || r.homepage || r.language))
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))
    .map(toCard);

  const others = [...handWrittenOthers, ...fromGithub];

  const categories = ["All", ...new Set([...featured, ...others].map((p) => p.category).filter(Boolean))];
  const filterFn = (p) => filter === "All" || p.category === filter;

  const filteredFeatured = featured.filter(filterFn);
  const filteredOthers = others.filter(filterFn);

  return (
    <Section
      id="projects"
      kicker="Selected Work"
      heading="Featured"
      heading2="Projects"
      sub="Production web applications, full-stack platforms, and developer tooling I've engineered and shipped."
    >
      <div className="reveal flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-line bg-surface/80 p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-accent text-page shadow-xs"
                  : "text-ink-2 hover:bg-surface-hover hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-medium text-ink-3">
          Showing {filteredFeatured.length + filteredOthers.length} projects · synced with GitHub
        </span>
      </div>

      {filteredFeatured.length > 0 && (
        <div className="mt-6 space-y-6">
          <p className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            ★ Core Featured Builds
          </p>

          <div className="space-y-6">
            {filteredFeatured.map((p) => (
              <article
                key={p.repo}
                className="reveal group overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-md transition-all hover:border-line-hi hover:shadow-xl lg:grid lg:grid-cols-[1.2fr_1fr]"
              >
                <div className="flex flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-accent-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-accent">
                        {p.category}
                      </span>
                      <span className="text-xs font-medium text-ink-3">• {p.kind}</span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{p.blurb}</p>

                    <ul className="mt-4 space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-3">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-line/70 pt-5">
                    <StackPills items={p.stack} />
                    <ActionButtons live={p.live} code={p.code} stars={p.stars} />
                  </div>
                </div>

                <div className="relative flex items-center justify-center overflow-hidden border-t border-line bg-subtle lg:border-t-0 lg:border-l">
                  <a
                    href={p.live || p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block h-full w-full overflow-hidden"
                    aria-label={`View ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={`${p.name} — ${p.kind}`}
                      loading="lazy"
                      className="h-full min-h-[240px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-page/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-page/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm">
                        View Project <ExternalLink className="size-3.5" />
                      </span>
                    </div>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {filteredOthers.length > 0 && (
        <div className="mt-12">
          <p className="font-mono text-xs font-semibold tracking-wider text-ink-3 uppercase">
            More Web Apps & Architecture Builds
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {(showAll ? filteredOthers : filteredOthers.slice(0, 4)).map((p) => (
              <article
                key={p.repo}
                className="reveal group relative overflow-hidden rounded-2xl border border-line bg-subtle transition-all hover:border-line-hi hover:shadow-xl"
              >
                <a
                  href={p.live || p.code}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-video w-full overflow-hidden"
                  aria-label={`Open ${p.name}`}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} — ${p.kind}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <CodePlaceholder name={p.name} category={p.kind} />
                  )}

                  {p.category && (
                    <span className="absolute top-3 left-3 rounded-md bg-page/85 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent backdrop-blur-sm">
                      {p.category}
                    </span>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-page via-page/70 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-ink transition-colors group-hover:text-accent">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 truncate text-[11px] text-ink-3">
                        {p.kind}{typeof p.stars === "number" && p.stars > 0 ? ` · ★ ${p.stars}` : ""}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {p.live && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[10px] font-semibold text-page opacity-0 transition-opacity group-hover:opacity-100">
                          <span>Live</span>
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </span>
                      )}
                      <span className="inline-flex items-center justify-center rounded-md border border-line bg-page/80 p-1.5 text-ink-2 backdrop-blur-sm transition-colors group-hover:text-accent">
                        <Code2 className="size-3.5" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {filteredOthers.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-7 py-3.5 text-sm font-semibold text-ink shadow-lg backdrop-blur-sm transition-all hover:border-line-hi hover:bg-surface-hover hover:-translate-y-0.5"
              >
                <span>{showAll ? "Show fewer projects" : `View all projects (${filteredOthers.length})`}</span>
                <ChevronDown
                  className={`size-4 text-accent transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      )}

      {filteredFeatured.length + filteredOthers.length === 0 && (
        <p className="reveal mt-6 rounded-xl border border-dashed border-line bg-surface/40 px-5 py-8 text-center text-sm text-ink-3">
          No projects in this category yet — choose &ldquo;All&rdquo; to see everything.
        </p>
      )}
    </Section>
  );
}
