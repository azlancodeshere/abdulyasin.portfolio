import { useState } from "react";
import { ArrowUpRight, ExternalLink, Star, Zap } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";
import { useGithub } from "../hooks/useGithub.js";

function StackPill({ label }) {
  return (
    <li className="rounded-full border border-line bg-subtle px-2.5 py-0.5 font-mono text-[10px] font-medium text-ink-3 tracking-wide">
      {label}
    </li>
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

  const filtered = featured.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="projects"
      kicker="Selected Work"
      heading="Featured"
      heading2="Projects"
      sub="Production web applications and full-stack platforms I've engineered and shipped."
    >
      {/* Filter bar */}
      <div className="reveal flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-line bg-surface/80 p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-accent text-page shadow-sm shadow-accent/30"
                  : "text-ink-3 hover:bg-surface-hover hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-xs text-ink-3">
          <Zap className="size-3 text-accent" />
          {filtered.length} projects · live on GitHub
        </span>
      </div>

      {/* Projects list */}
      {filtered.length > 0 && (
        <div className="mt-6 space-y-5">
          {filtered.map((p, idx) => (
            <article
              key={p.repo}
              className="reveal group overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-lg transition-all hover:border-line-hi hover:shadow-2xl hover:-translate-y-0.5 md:grid md:grid-cols-[1fr_0.85fr]"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {/* Content */}
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  {/* Category + Kind */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full bg-accent/12 border border-accent/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent uppercase tracking-wider">
                      {p.category}
                    </span>
                    <span className="text-xs text-ink-3">{p.kind}</span>
                    {typeof p.stars === "number" && p.stars > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-subtle border border-line px-2 py-0.5 text-[10px] font-mono text-ink-3">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {p.stars}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>

                  {/* Blurb */}
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{p.blurb}</p>

                  {/* Bullet points */}
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-6 border-t border-line/60 pt-5 space-y-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {(p.stack?.length ? p.stack : ["GitHub"]).map((t) => (
                      <StackPill key={t} label={t} />
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-page shadow-md shadow-accent/20 transition-all hover:bg-sky-300 hover:-translate-y-0.5"
                      >
                        Live Demo
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-subtle px-4 py-2 text-xs font-semibold text-ink-2 transition-all hover:border-line-hi hover:text-ink hover:-translate-y-0.5"
                    >
                      <GithubIcon className="size-3.5" />
                      Source
                    </a>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative flex items-center justify-center overflow-hidden border-t border-line bg-subtle md:border-t-0 md:border-l min-h-[220px]">
                <a
                  href={p.live || p.code}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0"
                  aria-label={`View ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.kind}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-page/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-page/90 px-4 py-2 text-xs font-bold text-ink backdrop-blur-sm border border-line">
                      <ExternalLink className="size-3.5 text-accent" />
                      Open Project
                    </span>
                  </div>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="reveal mt-6 rounded-2xl border border-dashed border-line bg-surface/40 px-5 py-10 text-center text-sm text-ink-3">
          No projects in this category — choose &ldquo;All&rdquo; to see everything.
        </p>
      )}
    </Section>
  );
}
