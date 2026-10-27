import { ArrowUpRight, Star } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

function Stack({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded border border-line bg-subtle px-2 py-0.5 font-mono text-[11px] text-ink-3"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ live, code, stars }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-[13px] font-medium text-page transition-transform hover:-translate-y-0.5"
        >
          Live
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      )}
      <a
        href={code}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-ink"
      >
        <GithubIcon className="size-3.5" />
        GitHub
      </a>
      {typeof stars === "number" && stars > 0 && (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-3">
          <Star className="size-3 text-accent" aria-hidden="true" />
          {stars}
        </span>
      )}
    </div>
  );
}

function Placeholder({ name }) {
  return (
    <div className="grid-bg flex aspect-video items-center justify-center rounded-lg border border-line bg-subtle">
      <span className="font-mono text-sm text-ink-3">{name.toLowerCase().replace(/\s+/g, "-")}</span>
    </div>
  );
}

export default function Projects() {
  const { featured, others } = profile;

  return (
    <Section
      id="projects"
      kicker="Selected work"
      heading="Projects"
      sub="Things I've built and shipped — every repo lives on my GitHub."
    >
      <p className="reveal font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
        Production work
      </p>

      <div className="mt-4 space-y-4">
        {featured.map((p) => (
          <article
            key={p.repo}
            className="reveal group grid gap-5 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-hi md:grid-cols-[1.15fr_1fr] md:p-6"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="font-mono text-[11px] text-ink-3">— {p.kind}</span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.blurb}</p>

              <ul className="mt-3 space-y-1.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-ink-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Stack items={p.stack} />
              </div>
              <Links live={p.live} code={p.code} stars={p.stars} />
            </div>

            <a
              href={p.live || p.code}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-lg border border-line bg-subtle transition-colors group-hover:border-line-hi"
              aria-label={`Open ${p.name}`}
            >
              <img
                src={p.image}
                alt={`${p.name} — ${p.kind}`}
                loading="lazy"
                className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </a>
          </article>
        ))}
      </div>

      <p className="reveal mt-10 font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
        Other builds
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p) => (
          <article
            key={p.repo}
            className="reveal flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-hi"
          >
            <a
              href={p.live || p.code}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden border-b border-line"
              aria-label={`Open ${p.name}`}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.kind}`}
                  loading="lazy"
                  className="aspect-video w-full object-cover object-top"
                />
              ) : (
                <Placeholder name={p.name} />
              )}
            </a>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-[15px] font-semibold">{p.name}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{p.blurb}</p>
              <div className="mt-3">
                <Stack items={p.stack} />
              </div>
              <div className="mt-auto">
                <Links live={p.live} code={p.code} stars={p.stars} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
