import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { nav, profile } from "../data/profile.js";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-subtle/80 backdrop-blur-md">
      {/* Big closing statement */}
      <div className="wrap pt-16 pb-12 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
          {profile.openTo}
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          Let&rsquo;s{" "}
          <span className="bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
            build
          </span>{" "}
          something
          <br className="hidden sm:block" /> that works.
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-sm text-ink-3">
          I build fast, accessible web apps with React, Next.js and Node.js — open to teams that
          value product quality and thoughtful engineering.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={profile.links.email}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-page shadow-md shadow-accent/20 transition-all hover:bg-sky-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Mail className="size-4" aria-hidden="true" />
            <span>Email me</span>
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-line-hi hover:bg-surface-hover hover:-translate-y-0.5"
          >
            <LinkedinIcon className="size-4" />
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-all hover:border-line-hi hover:bg-surface-hover hover:-translate-y-0.5"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="wrap pb-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: Branding & Status */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs font-bold text-accent">
                {profile.initials}
              </span>
              <span className="text-sm font-bold text-ink">{profile.name}</span>
            </div>
            <p className="mt-2 text-xs text-ink-3">
              Full Stack Developer · Built with React, Vite & Tailwind CSS. Deployed on Vercel.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <ul className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Socials & Back to Top */}
          <div className="flex items-center gap-3">
            {[
              { href: profile.links.email, icon: Mail, label: "Email" },
              { href: profile.links.github, icon: GithubIcon, label: "GitHub" },
              { href: profile.links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-ink-3 transition-colors hover:border-line-hi hover:text-accent"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-ink-3 transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-accent"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-line/60 pt-6 text-center text-[11px] text-ink-3">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

