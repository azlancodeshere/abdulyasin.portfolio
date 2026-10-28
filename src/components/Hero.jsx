import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { useContributions } from "../hooks/useContributions.js";
import { profile, stats } from "../data/profile.js";

const socials = [
  { label: "GitHub", href: profile.links.github, icon: GithubIcon, handle: "azlancodeshere" },
  { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedinIcon, handle: "abdulyasin-devstack" },
  { label: "Email", href: profile.links.email, icon: Mail, handle: profile.email },
];

const coreTech = ["React.js", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"];

export default function Hero() {
  // Keeps the contributions stat in step with the live calendar below.
  const { total: contributions } = useContributions();

  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background ambient lighting */}
      <div className="radial-glow pointer-events-none absolute inset-x-0 top-0 h-[500px]" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Left Column: Introductions & CTAs */}
          <div>
            {/* Status Pill */}
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs text-ink-2 shadow-sm backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-live" />
              </span>
              <span className="font-medium text-ink-2">Available for Full-time Roles & Internships</span>
            </div>

            {/* Main Headline */}
            <div className="reveal mt-5">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl md:leading-[1.12]">
                Hi, I&rsquo;m <span className="text-accent">{profile.name}</span>.
                <br />
                <span className="bg-gradient-to-r from-ink via-ink to-ink-2 bg-clip-text text-transparent">
                  Full Stack Developer.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
                I engineer clean, end-to-end web applications with robust backend APIs, secure authentication, and responsive modern user interfaces.
              </p>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="reveal mt-6 flex flex-wrap items-center gap-2" style={{ transitionDelay: "100ms" }}>
              <span className="text-xs font-semibold tracking-wider text-ink-3 uppercase">Stack:</span>
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-subtle px-2.5 py-1 font-mono text-xs font-medium text-ink-2 shadow-xs transition-colors hover:border-accent/40 hover:text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ transitionDelay: "180ms" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-page shadow-md shadow-accent/20 transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-line-hi hover:bg-surface-hover hover:-translate-y-0.5"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-4 py-3 text-sm font-medium text-ink-2 transition-all hover:border-line-hi hover:bg-surface-hover hover:text-ink"
              >
                <Download className="size-4" aria-hidden="true" />
                <span>CV</span>
              </a>
            </div>

            {/* Quick Social Links */}
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6"
              style={{ transitionDelay: "240ms" }}
            >
              {socials.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/50 px-3 py-1.5 text-xs text-ink-3 transition-colors hover:border-line-hi hover:bg-surface hover:text-ink"
                >
                  <Icon className="size-3.5 text-accent" aria-hidden="true" />
                  <span className="font-mono">{handle}</span>
                  <ArrowUpRight
                    className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Profile Card with Visual Aesthetics */}
          <div className="reveal flex justify-center lg:justify-end" style={{ transitionDelay: "120ms" }}>
            <div className="relative w-full max-w-sm rounded-2xl border border-line bg-surface/90 p-5 shadow-2xl backdrop-blur-md">
              {/* Subtle top badge */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-xs font-semibold text-ink">Abdul Yasin</span>
                </div>
                <span className="rounded bg-subtle px-2 py-0.5 font-mono text-[11px] text-accent">
                  Full Stack
                </span>
              </div>

              {/* Avatar + Quick Info */}
              <div className="mt-5 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} portrait`}
                    width={80}
                    height={80}
                    className="size-20 rounded-xl border border-line object-cover shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-live ring-4 ring-surface text-[10px] text-white">
                    ✓
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{profile.name}</h3>
                  <p className="text-xs text-accent font-medium">B.Tech Computer Science</p>
                  <p className="mt-1 text-xs text-ink-3">{profile.location}</p>
                </div>
              </div>

              {/* Bio summary */}
              <p className="mt-4 rounded-lg border border-line bg-subtle p-3 text-xs leading-relaxed text-ink-2">
                Specializing in React, Next.js, Node.js, Express, and MongoDB. Passionate about performant backend architecture and polished interfaces.
              </p>

              {/* Quick Spec Highlights */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-line bg-subtle/70 p-2.5">
                  <span className="block text-[11px] text-ink-3">Live Projects</span>
                  <span className="font-mono text-sm font-bold text-ink">
                    {profile.liveApps} Apps Shipped
                  </span>
                </div>
                <div className="rounded-lg border border-line bg-subtle/70 p-2.5">
                  <span className="block text-[11px] text-ink-3">Lighthouse Score</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">100 / 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div
          className="reveal mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mt-18"
          style={{ transitionDelay: "260ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-xl border border-line bg-surface/80 p-4 transition-all hover:border-line-hi hover:bg-surface hover:-translate-y-0.5"
            >
              <div className="font-mono text-2xl font-extrabold text-ink group-hover:text-accent md:text-3xl">
                {s.live === "contributions" ? contributions : s.value}
                {s.plus && <span className="text-accent">+</span>}
              </div>
              <div className="mt-1 text-xs font-medium text-ink-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

