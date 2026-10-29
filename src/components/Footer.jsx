import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { nav, profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-subtle/60 backdrop-blur-md">
      {/* CTA banner */}
      <div className="wrap pt-16 pb-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase opacity-70">
          {profile.openTo}
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          Let&rsquo;s{" "}
          <span className="bg-gradient-to-r from-accent via-sky-300 to-blue-400 bg-clip-text text-transparent">
            build
          </span>{" "}
          something
          <br className="hidden sm:block" />
          {" "}that works.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={profile.links.email}
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-extrabold text-page shadow-lg shadow-accent/25 transition-all hover:bg-sky-300 hover:shadow-accent/40 hover:-translate-y-0.5"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email Me
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-6 py-3.5 text-sm font-bold text-ink-2 transition-all hover:border-line-hi hover:text-ink hover:-translate-y-0.5"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="wrap pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs font-extrabold text-accent">
                {profile.initials}
              </span>
              <span className="text-sm font-bold text-ink">{profile.name}</span>
            </div>
            <p className="mt-1.5 text-[11px] text-ink-3">
              Built with React, Vite &amp; Tailwind CSS · Deployed on Vercel.
            </p>
          </div>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center gap-4 text-xs font-semibold text-ink-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons + scroll-to-top */}
          <div className="flex items-center gap-2">
            {[
              { href: profile.links.github, icon: GithubIcon, label: "GitHub" },
              { href: profile.links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              { href: profile.links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-3 transition-all hover:border-line-hi hover:text-accent hover:-translate-y-0.5"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-3 transition-all hover:border-accent/40 hover:text-accent hover:-translate-y-0.5"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-line/50 pt-6 text-center text-[11px] text-ink-3">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
