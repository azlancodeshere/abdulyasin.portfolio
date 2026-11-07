import { ArrowUpRight, Download, Code2, Server, Database, ShieldCheck } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const pillars = [
  { icon: Code2,       title: "Frontend",        desc: "React, Next.js, TypeScript & Tailwind CSS — fast, accessible UIs." },
  { icon: Server,      title: "Backend & APIs",   desc: "Node.js + Express — REST endpoints, error handling, MVC architecture." },
  { icon: Database,    title: "Database",         desc: "MongoDB & Mongoose — schema design, validation, indexing." },
  { icon: ShieldCheck, title: "Auth & Security",  desc: "JWT, HTTP-only cookies, bcrypt hashing, role-based access." },
];

export default function About() {
  const { publicRepos, liveApps } = useGithub();

  return (
    <Section
      id="about"
      kicker="About Me"
      heading="Background &amp;"
      heading2="Engineering Focus"
      sub="CS student building production-ready applications with a backend-first mindset."
    >
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">

        {/* Left */}
        <div className="reveal space-y-6">
          <div className="space-y-3 text-sm leading-relaxed text-ink-2">
            <p>
              I&rsquo;m a <strong className="text-ink font-semibold">Full Stack Developer</strong> pursuing
              B.Tech CS at <strong className="text-ink font-semibold">Govt. Engineering College, Ajmer</strong>.
              I focus on shipping real software — not toy projects.
            </p>
            <p>
              <strong className="text-ink font-semibold">{publicRepos} public repos</strong> and{" "}
              <strong className="text-ink font-semibold">{liveApps} live deployments</strong> on Vercel.
              I care about clean code, Lighthouse scores, and user privacy.
            </p>
          </div>

          {/* Pillar boxes — GitHub card grid */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-md border border-line bg-subtle p-4 transition-all hover:border-accent/35 hover:bg-surface"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex size-7 items-center justify-center rounded-md border border-line bg-surface text-accent">
                    <Icon className="size-3.5" />
                  </span>
                  <h4 className="text-sm font-semibold text-ink">{title}</h4>
                </div>
                <p className="text-xs leading-relaxed text-ink-3">{desc}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-live/40 bg-emerald-live/10 px-4 py-2 text-sm font-semibold text-emerald-live hover:bg-emerald-live/15 transition-colors"
            >
              <Download className="size-3.5" />
              Download  Resume
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-2 hover:border-accent/35 hover:text-ink transition-colors"
            >
              <GithubIcon className="size-3.5" />
              GitHub Profile
              <ArrowUpRight className="size-3.5 opacity-50" />
            </a>
          </div>
        </div>

        {/* Right — GitHub user profile card style */}
        <aside className="reveal" style={{ transitionDelay: "120ms" }}>
          <div className="sticky top-20 overflow-hidden rounded-md border border-line bg-subtle shadow-lg">
            {/* Avatar area */}
            <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: "4/3" }}>
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-subtle via-subtle/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-md border border-line bg-subtle/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                  {profile.name}
                </span>
                <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                  Full Stack
                </span>
              </div>
            </div>

            {/* Info rows — GitHub profile metadata style */}
            <div className="divide-y divide-line">
              {[
                ["Education", "B.Tech CS · 2025–2029"],
                ["College",   "GEC Ajmer, Rajasthan"],
                ["Specialty", "MERN · Next.js · REST"],
                ["Status",    "Open to Opportunities"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-center justify-between px-4 py-2.5 text-xs">
                  <span className="font-mono text-ink-3 uppercase tracking-wider">{term}</span>
                  <span className="font-semibold text-ink text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
