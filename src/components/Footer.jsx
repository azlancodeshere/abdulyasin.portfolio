import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-3">
            Built with React · Vite · Tailwind CSS — deployed on Vercel
          </p>
        </div>

        <div className="flex items-center gap-4">
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
              className="text-ink-3 transition-colors hover:text-accent"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
          <span className="font-mono text-[11px] text-ink-3">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
