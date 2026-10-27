import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { nav, profile } from "../data/profile.js";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line bg-subtle/80 backdrop-blur-md">
      <div className="wrap py-12">
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

