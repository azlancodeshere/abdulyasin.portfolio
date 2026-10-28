import { ArrowUpRight, Download, Code2, Server, Database, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const pillars = [
  {
    icon: Code2,
    title: "Modern Frontend",
    desc: "React, Next.js, TypeScript and Tailwind CSS — crafting fast, accessible, and responsive user interfaces.",
  },
  {
    icon: Server,
    title: "Backend & REST APIs",
    desc: "Node.js and Express.js — designing structured endpoints, robust error handling, and clean MVC architecture.",
  },
  {
    icon: Database,
    title: "Database Modeling",
    desc: "MongoDB & Mongoose — schema design, validation, efficient indexing, and persistent state management.",
  },
  {
    icon: ShieldCheck,
    title: "Auth & Security",
    desc: "JWT authentication, secure HTTP cookies, bcrypt password hashing, and role-based access control.",
  },
];

export default function About() {
  const { publicRepos, liveApps } = useGithub();

  return (
    <Section
      id="about"
      kicker="About Me"
      heading="Background &"
      heading2="Engineering Focus"
      sub="A computer science student building practical, production-ready web applications."
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="reveal">
          <div className="space-y-4 text-base leading-relaxed text-ink-2">
            <p>
              I am a <strong className="font-semibold text-ink">Full Stack Developer</strong> currently pursuing my Bachelor of Technology in Computer Science at Government Engineering College, Ajmer.
            </p>
            <p>
              My focus is on creating end-to-end applications where intuitive, accessible frontends meet reliable backend services. Rather than building throwaway toys, I focus on shipping real software — from recruitment boards and AI note apps to inventory management systems.
            </p>
            <p>
              I have published <strong className="font-semibold text-ink">{publicRepos} repositories</strong> and deployed <strong className="font-semibold text-ink">{liveApps} live web apps</strong> on Vercel. I care deeply about clean code, Lighthouse performance scores, and user privacy.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-xl border border-line bg-surface/70 p-4 transition-all hover:border-line-hi hover:bg-surface"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-subtle text-accent">
                    <Icon className="size-4" />
                  </span>
                  <h4 className="text-sm font-semibold text-ink">{title}</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-3">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-page shadow-sm transition-all hover:bg-sky-400 hover:-translate-y-0.5"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-accent"
            >
              Get in Touch
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-accent"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        <aside className="reveal" style={{ transitionDelay: "120ms" }}>
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-xl backdrop-blur-md">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-subtle">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="rounded-md border border-line bg-surface/80 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                  {profile.name}
                </span>
                <span className="rounded-md bg-accent/90 px-2 py-0.5 text-xs font-bold text-page">
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="divide-y divide-line p-2">
              {[
                ["Education", "B.Tech in Computer Science (2025–2029)"],
                ["College", "Govt. Engineering College, Ajmer"],
                ["Location", "Ajmer, Rajasthan, India"],
                ["Specialty", "MERN Stack, Next.js & REST APIs"],
                ["Status", "Open to Full-Time & Internships"],
              ].map(([term, value]) => (
                <div key={term} className="flex items-start justify-between gap-4 px-3 py-2.5 text-xs">
                  <span className="font-mono text-ink-3 uppercase">{term}</span>
                  <span className="text-right font-medium text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

