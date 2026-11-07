import { useState } from "react";
import { ArrowUpRight, ExternalLink, Star, Zap } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";
import { useGithub } from "../hooks/useGithub.js";

const CATEGORY_ORDER = ["Frontend", "Full Stack", "Backend"];

export default function Projects() {
  const { repos }  = useGithub();
  const [filter, setFilter] = useState("All");

  const byName = new Map(repos.map((r) => [r.name, r]));
  const featured = profile.featured.map((p) => {
    const gh = byName.get(p.repo);
    return gh ? { ...p, stars: gh.stars, live: gh.homepage || p.live } : p;
  });

  const existing    = new Set(featured.map((p) => p.category).filter(Boolean));
  const categories  = ["All", ...CATEGORY_ORDER.filter((c) => existing.has(c))];
  const filtered    = featured.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="projects"
      kicker="Selected Work"
      heading="Featured"
      heading2="Projects"
      sub="Production web applications and full-stack platforms I've engineered and shipped."
    >
      {/* Filter — GitHub tab style */}
      <div className="reveal flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-0 overflow-hidden rounded-md border border-line bg-subtle">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                idx !== 0 ? "border-l border-line" : ""
              } ${
                filter === cat
                  ? "bg-accent text-page"
                  : "text-ink-3 hover:bg-surface hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-xs text-ink-3">
          <Zap className="size-3 text-accent" />
          {filtered.length} projects · synced with GitHub
        </span>
      </div>

      {/* Project cards — GitHub repository card style */}
      {filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((p, idx) => (
            <article
              key={p.repo}
              className="reveal group overflow-hidden rounded-md border border-line bg-subtle transition-all hover:border-accent/35 md:grid md:grid-cols-[1fr_0.9fr]"
              style={{ transitionDelay: `${idx * 55}ms` }}
            >
              {/* Content */}
              <div className="flex flex-col justify-between p-5 md:p-6">
                <div>
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="rounded-full border border-accent/25 bg-accent/8 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent uppercase">
                      {p.category}
                    </span>
                    <span className="text-xs text-ink-3">{p.kind}</span>
                    {typeof p.stars === "number" && p.stars > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-line bg-surface px-1.5 py-0.5 text-[10px] font-mono text-ink-3">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {p.stars}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.blurb}</p>

                  <ul className="mt-3 space-y-1.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs leading-relaxed text-ink-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/60" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-5 border-t border-line pt-4 space-y-3">
                  {/* Stack pills */}
                  <ul className="flex flex-wrap gap-1">
                    {(p.stack || []).map((t) => (
                      <li key={t} className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-3">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-emerald-live/35 bg-emerald-live/10 px-3 py-1.5 text-xs font-semibold text-emerald-live hover:bg-emerald-live/15 transition-colors">
                        Live Demo <ArrowUpRight className="size-3" />
                      </a>
                    )}
                    <a href={p.code} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-accent/35 hover:text-ink transition-colors">
                      <GithubIcon className="size-3" /> Source
                    </a>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative overflow-hidden border-t border-line bg-page md:border-t-0 md:border-l min-h-[200px]">
                <a href={p.live || p.code} target="_blank" rel="noreferrer" className="absolute inset-0" aria-label={`View ${p.name}`}>
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-page/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-subtle/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm">
                      <ExternalLink className="size-3 text-accent" /> Open Project
                    </span>
                  </div>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="reveal rounded-md border border-dashed border-line bg-subtle px-5 py-10 text-center text-sm text-ink-3">
          No projects in this category — choose &ldquo;All&rdquo; to see everything.
        </p>
      )}
    </Section>
  );
}
