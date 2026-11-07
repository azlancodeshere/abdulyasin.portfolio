import { ArrowDown, ArrowUpRight, Download, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { useContributions } from "../hooks/useContributions.js";
import { useGithub } from "../hooks/useGithub.js";
import { profile, stats } from "../data/profile.js";

const coreTech = ["React.js", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB"];

const terminalLines = [
  { prompt: "azlan", cmd: "whoami",       out: "Abdul Yasin — Full Stack Developer" },
  { prompt: "azlan", cmd: "cat stack.txt",out: "MERN · Next.js · TypeScript · REST" },
  { prompt: "azlan", cmd: "ls ./shipped", out: "surhires  notes-keeper  inventory  ticket-booking" },
  { prompt: "azlan", cmd: "echo $STATUS", out: "✓ Open to full-time & internships" },
];

export default function Hero() {
  const { total: contributions } = useContributions();
  const { publicRepos, liveApps }  = useGithub();
  const liveValues = { repos: publicRepos, liveApps, contributions };

  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="radial-glow pointer-events-none absolute inset-x-0 top-0 h-[500px]" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="grid items-center gap-10 md:grid-cols-[1.35fr_1fr] lg:gap-14">

          {/* ── Left copy ── */}
          <div>
            {/* Status badge — GitHub pill style */}
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-live/25 bg-emerald-live/8 px-3.5 py-1.5 text-xs font-semibold text-emerald-live">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-live" />
              </span>
              Open to Full-Time &amp; Internships
            </div>

            <div className="reveal mt-5">
              <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase mb-2">
                full-stack developer
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-[2.8rem] leading-[1.1]">
                Hi, I&rsquo;m{" "}
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                  {profile.name}
                </span>
                .
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-2">
                I build end-to-end web products — REST APIs, JWT auth &amp; MongoDB on the backend; React and Tailwind on the front. Shipped live on Vercel.
              </p>
            </div>

            {/* Tech pills — GitHub label style */}
            <div className="reveal mt-6 flex flex-wrap gap-1.5" style={{ transitionDelay: "80ms" }}>
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-ink-3 hover:border-accent/40 hover:text-ink-2 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs — GitHub green primary button */}
            <div className="reveal mt-7 flex flex-wrap items-center gap-2.5" style={{ transitionDelay: "140ms" }}>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-md border border-emerald-live/40 bg-emerald-live/10 px-4 py-2 text-sm font-semibold text-emerald-live transition-all hover:bg-emerald-live/15 hover:border-emerald-live/60"
              >
                View Projects
                <ArrowDown className="size-3.5" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-accent/40 hover:text-accent"
              >
                <Download className="size-3.5" />
                Résumé
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/8 px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/14"
              >
                Hire Me
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            {/* Social links */}
            <div className="reveal mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5" style={{ transitionDelay: "200ms" }}>
              <a href={profile.links.github} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink-3 transition-all hover:border-accent/30 hover:text-ink">
                <GithubIcon className="size-3.5 text-accent" />
                <span className="font-mono">azlancodeshere</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink-3 transition-all hover:border-accent/30 hover:text-ink">
                <LinkedinIcon className="size-3.5 text-accent" />
                <span className="font-mono">abdulyasin-devstack</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </a>
            </div>
          </div>

          {/* ── Right: Terminal card ── */}
          <div className="reveal flex justify-center md:justify-end" style={{ transitionDelay: "100ms" }}>
            {/* GitHub-style box border */}
            <div className="w-full max-w-sm overflow-hidden rounded-md border border-line shadow-xl" style={{ background: "#0d1117" }}>
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 border-b border-white/8 bg-subtle px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-500/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-500/70" />
                <div className="ml-3 flex items-center gap-1.5 text-[11px] text-white/35 font-mono">
                  <Terminal className="size-3" />
                  <span>zsh — ~/portfolio</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-[12px] leading-loose space-y-2">
                {terminalLines.map((line, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-400">{line.prompt}</span>
                      <span className="text-white/20">@dev</span>
                      <span className="text-white/35 ml-1">$</span>
                      <span className="text-sky-300 ml-1.5">{line.cmd}</span>
                    </div>
                    <div className="text-white/55">{line.out}</div>
                  </div>
                ))}
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="text-emerald-400">azlan</span>
                  <span className="text-white/20">@dev</span>
                  <span className="text-white/35 ml-1">$</span>
                  <span className="ml-1.5 inline-block w-2 h-[13px] bg-accent/80 cursor-blink align-middle" />
                </div>
              </div>

              {/* Profile strip — GitHub user card style */}
              <div className="flex items-center gap-3 border-t border-white/8 bg-white/[0.02] px-4 py-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-full border border-white/15 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-white/90">{profile.name}</p>
                  <p className="text-[10px] text-white/35 font-mono">{profile.location}</p>
                </div>
                <span className="ml-auto rounded-full border border-emerald-live/30 bg-emerald-live/12 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-live">
                  OPEN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats — GitHub counter boxes ── */}
        <div className="reveal mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ transitionDelay: "260ms" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-md border border-line bg-subtle p-4 transition-all hover:border-accent/35 hover:bg-surface"
            >
              <div className="font-mono text-2xl font-extrabold text-ink group-hover:text-accent transition-colors md:text-3xl">
                {s.live ? liveValues[s.live] : s.value}
                {s.plus && <span className="text-accent">+</span>}
              </div>
              <div className="mt-1 text-xs text-ink-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
