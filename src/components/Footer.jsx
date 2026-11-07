import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { nav, profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      {/* CTA block */}
      <div className="wrap pt-14 pb-10 text-center">
        <p className="font-mono text-[10px] tracking-[0.28em] text-accent uppercase opacity-70 mb-4">
          {profile.openTo}
        </p>
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Let&rsquo;s{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            build
          </span>{" "}
          something that works.
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={profile.links.email}
            className="inline-flex items-center gap-2 rounded-md border border-emerald-live/40 bg-emerald-live/10 px-5 py-2.5 text-sm font-bold text-emerald-live transition-all hover:bg-emerald-live/18"
          >
            <Mail className="size-4" />
            Email Me
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink-2 transition-all hover:border-accent/35 hover:text-ink"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="wrap border-t border-line pb-8 pt-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs font-extrabold text-accent">
                {profile.initials}
              </span>
              <span className="text-sm font-bold text-ink">{profile.name}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-3">
              Built with React, Vite &amp; Tailwind CSS · Deployed on Vercel.
            </p>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap gap-4 text-xs font-medium text-ink-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-accent transition-colors">{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-1.5">
            {[
              { href: profile.links.github,   icon: GithubIcon,   label: "GitHub" },
              { href: profile.links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              { href: profile.links.email,    icon: Mail,         label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer" aria-label={label}
                className="flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink-3 transition-all hover:border-accent/35 hover:text-accent">
                <Icon className="size-3.5" />
              </a>
            ))}
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink-3 transition-all hover:border-accent/35 hover:text-accent ml-1">
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-5 text-center text-[11px] text-ink-3">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
