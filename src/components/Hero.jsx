import { ArrowDown, ArrowUpRight, Download, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { useContributions } from "../hooks/useContributions.js";
import { useGithub } from "../hooks/useGithub.js";
import { profile, stats } from "../data/profile.js";

const coreTech = ["React.js", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB"];

const terminalLines = [
  { prompt: "dev", cmd: "whoami", out: "Abdul Yasin — Full Stack Developer" },
  { prompt: "dev", cmd: "cat focus.txt", out: "Backend APIs · Auth · MERN Stack" },
  { prompt: "dev", cmd: "ls ./shipped", out: "surhires  notes-keeper  inventory  ticket-booking" },
  { prompt: "dev", cmd: "echo $STATUS", out: "Open to roles & internships ✓" },
];

export default function Hero() {
  const { total: contributions } = useContributions();
  const { publicRepos, liveApps } = useGithub();
  const liveValues = { repos: publicRepos, liveApps, contributions };

  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28">
      {/* Background layers */}
      <div className="radial-glow pointer-events-none absolute inset-x-0 top-0 h-[600px]" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr] lg:gap-16">

          {/* ── Left: copy ── */}
          <div>
            {/* Status badge */}
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-live/25 bg-emerald-live/8 px-4 py-1.5 text-xs font-medium text-emerald-live backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-live" />
              </span>
              Open to Full-Time &amp; Internships
            </div>

            {/* Headline */}
            <div className="reveal mt-6">
              <p className="font-mono text-xs tracking-[0.2em] text-ink-3 uppercase mb-3">
                &lt;full-stack-developer /&gt;
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-4xl md:leading-[1.08] lg:text-[3.25rem]">
                Hi, I&rsquo;m{" "}
                <span className="bg-gradient-to-r from-accent via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  {profile.name}
                </span>
                .
                <br />
                <span className="text-ink">Full Stack Dev.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-2">
                I build end-to-end web products — REST APIs, JWT auth &amp; MongoDB on the backend; React and Tailwind on the front. Shipped live on Vercel.
              </p>
            </div>

            {/* Tech pills */}
            <div className="reveal mt-7 flex flex-wrap items-center gap-2" style={{ transitionDelay: "80ms" }}>
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] font-medium text-ink-3 transition-all hover:border-accent/40 hover:text-ink-2"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="reveal mt-8 flex flex-wrap items-center gap-3" style={{ transitionDelay: "150ms" }}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-page shadow-lg shadow-accent/25 transition-all hover:bg-sky-300 hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowDown className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/70 px-5 py-2.5 text-sm font-semibold text-ink-2 transition-all hover:border-line-hi hover:text-ink hover:-translate-y-0.5"
              >
                <Download className="size-3.5" aria-hidden="true" />
                Résumé
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-accent/25 bg-accent-muted px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/15 hover:-translate-y-0.5"
              >
                Hire Me
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Socials */}
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-2.5 border-t border-line/50 pt-6"
              style={{ transitionDelay: "220ms" }}
            >
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-xs text-ink-3 transition-all hover:border-line-hi hover:bg-surface hover:text-ink"
              >
                <GithubIcon className="size-3.5 text-accent" />
                <span className="font-mono">azlancodeshere</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/40 px-3 py-1.5 text-xs text-ink-3 transition-all hover:border-line-hi hover:bg-surface hover:text-ink"
              >
                <LinkedinIcon className="size-3.5 text-accent" />
                <span className="font-mono">abdulyasin-devstack</span>
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            </div>
          </div>

          {/* ── Right: Terminal card ── */}
          <div className="reveal flex justify-center md:justify-end" style={{ transitionDelay: "100ms" }}>
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/8 shadow-2xl" style={{ background: "#0d1117" }}>
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/3 px-4 py-3">
                <span className="size-3 rounded-full bg-red-500/70" />
                <span className="size-3 rounded-full bg-yellow-400/70" />
                <span className="size-3 rounded-full bg-green-500/70" />
                <div className="ml-3 flex items-center gap-1.5 text-[11px] text-white/30 font-mono">
                  <Terminal className="size-3" />
                  <span>zsh — portfolio</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-[12px] leading-loose space-y-2">
                {terminalLines.map((line, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">{line.prompt}</span>
                      <span className="text-white/20">~</span>
                      <span className="text-white/40">$</span>
                      <span className="text-sky-300 ml-1">{line.cmd}</span>
                    </div>
                    <div className="text-white/55 pl-0">{line.out}</div>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-emerald-400">dev</span>
                  <span className="text-white/20">~</span>
                  <span className="text-white/40">$</span>
                  <span className="ml-1 inline-block w-2 h-[13px] bg-accent/80 cursor-blink align-middle" />
                </div>
              </div>

              {/* Profile strip */}
              <div className="flex items-center gap-3 border-t border-white/5 bg-white/2 px-5 py-3.5">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  width={36}
                  height={36}
                  className="size-9 rounded-lg border border-white/10 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-white/90">{profile.name}</p>
                  <p className="text-[10px] text-white/35 font-mono">{profile.location}</p>
                </div>
                <span className="ml-auto rounded-md bg-emerald-live/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-live">
                  AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="reveal mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ transitionDelay: "280ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 transition-all hover:border-line-hi hover:bg-surface hover:-translate-y-0.5"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.06), transparent 70%)" }}
              />
              <div className="relative font-mono text-2xl font-extrabold text-ink group-hover:text-accent md:text-3xl transition-colors">
                {s.live ? liveValues[s.live] : s.value}
                {s.plus && <span className="text-accent">+</span>}
              </div>
              <div className="relative mt-1.5 text-xs font-medium text-ink-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
