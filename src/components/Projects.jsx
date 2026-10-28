import { useState } from "react";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
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

const CATEGORY_ORDER = ["Frontend", "Full Stack", "Backend"];

export default function Projects() {
  const { repos } = useGithub();
  const [filter, setFilter] = useState("All");

  const byName = new Map(repos.map((r) => [r.name, r]));

  const featured = profile.featured.map((p) => {
    const gh = byName.get(p.repo);
    return gh ? { ...p, stars: gh.stars, live: gh.homepage || p.live } : p;
  });

  const existing = new Set(featured.map((p) => p.category).filter(Boolean));
  const categories = [
    "All",
    ...CATEGORY_ORDER.filter((c) => existing.has(c)),
    ...[...existing].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const filterFn = (p) => filter === "All" || p.category === filter;
  const filteredFeatured = featured.filter(filterFn);

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
          Showing {filteredFeatured.length} projects · synced with GitHub
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
                className="reveal group overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-md transition-all hover:border-line-hi hover:shadow-xl md:grid md:grid-cols-[1.2fr_1fr]"
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

                <div className="relative flex items-center justify-center overflow-hidden border-t border-line bg-subtle md:border-t-0 md:border-l">
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

      {filteredFeatured.length === 0 && (
        <p className="reveal mt-6 rounded-xl border border-dashed border-line bg-surface/40 px-5 py-8 text-center text-sm text-ink-3">
          No projects in this category yet — choose &ldquo;All&rdquo; to see everything.
        </p>
      )}
    </Section>
  );
}
