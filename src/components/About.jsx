import { ArrowUpRight, Download, Code2, Server, Database, ShieldCheck } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const pillars = [
  {
    icon: Code2,
    title: "Modern Frontend",
    color: "text-sky-400",
    bg: "bg-sky-400/8",
    border: "border-sky-400/20",
    desc: "React, Next.js, TypeScript and Tailwind CSS — crafting fast, accessible, responsive UIs.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    color: "text-violet-400",
    bg: "bg-violet-400/8",
    border: "border-violet-400/20",
    desc: "Node.js and Express.js — structured REST endpoints, error handling, clean MVC architecture.",
  },
  {
    icon: Database,
    title: "Database Modeling",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/20",
    desc: "MongoDB & Mongoose — schema design, validation, efficient indexing, persistent state.",
  },
  {
    icon: ShieldCheck,
    title: "Auth & Security",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
    border: "border-amber-400/20",
    desc: "JWT auth, HTTP-only cookies, bcrypt hashing, and role-based access control.",
  },
];

export default function About() {
  const { publicRepos, liveApps } = useGithub();

  return (
    <Section
      id="about"
      kicker="About Me"
      heading="Background &amp;"
      heading2="Engineering Focus"
      sub="A CS student building practical, production-ready applications with a backend-first mindset."
    >
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
        {/* Left: text + pillars */}
        <div className="reveal space-y-8">
          <div className="space-y-4 text-sm leading-relaxed text-ink-2">
            <p>
              I&rsquo;m a{" "}
              <strong className="font-semibold text-ink">Full Stack Developer</strong>{" "}
              pursuing B.Tech in Computer Science at{" "}
              <strong className="font-semibold text-ink">Govt. Engineering College, Ajmer</strong>.
              My focus is shipping real software — not toy projects.
            </p>
            <p>
              With <strong className="font-semibold text-ink">{publicRepos} public repositories</strong> and{" "}
              <strong className="font-semibold text-ink">{liveApps} live deployments</strong> on Vercel,
              I care deeply about clean code, accessibility, Lighthouse scores, and user privacy.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, color, bg, border, desc }) => (
              <div
                key={title}
                className={`group rounded-xl border ${border} ${bg} p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`flex size-8 items-center justify-center rounded-lg border ${border} bg-page/60 ${color}`}>
                    <Icon className="size-4" />
                  </span>
                  <h4 className="text-sm font-bold text-ink">{title}</h4>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-ink-3">{desc}</p>
              </div>
            ))}
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-page shadow-md shadow-accent/20 transition-all hover:bg-sky-300 hover:-translate-y-0.5"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Résumé
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink-2 transition-all hover:border-line-hi hover:text-ink hover:-translate-y-0.5"
            >
              <GithubIcon className="size-4" />
              GitHub Profile
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right: profile card */}
        <aside className="reveal" style={{ transitionDelay: "120ms" }}>
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl">
            {/* Avatar */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-subtle">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
              {/* Overlay badges */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="rounded-lg border border-line bg-surface/85 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur-sm">
                  {profile.name}
                </span>
                <span className="rounded-lg bg-accent px-2.5 py-1 text-[11px] font-bold text-page">
                  Full Stack
                </span>
              </div>
            </div>

            {/* Info table */}
            <div className="divide-y divide-line">
              {[
                ["Education", "B.Tech CS (2025–2029)"],
                ["College", "GEC Ajmer, Rajasthan"],
                ["Specialty", "MERN · Next.js · REST"],
                ["Status", "Open to Opportunities"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-center justify-between px-4 py-3 text-xs">
                  <span className="font-mono text-ink-3 uppercase tracking-wider">{term}</span>
                  <span className="text-right font-semibold text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
