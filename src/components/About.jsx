import { ArrowUpRight, Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile, skillCount } from "../data/profile.js";

const channels = [
  { label: "Gmail", handle: profile.email, href: profile.links.email, icon: Mail },
  { label: "LinkedIn", handle: profile.linkedin, href: profile.links.linkedin, icon: LinkedinIcon },
  { label: "GitHub", handle: `@${profile.github}`, href: profile.links.github, icon: GithubIcon },
];

export default function About() {
  return (
    <Section id="about" kicker="$whoami" heading={profile.name} sub={profile.roleLine}>
      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <div className="reveal">
          <p className="text-[15px] leading-relaxed text-ink-2">{profile.summary}</p>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            <strong className="font-semibold text-ink">24 public repositories.</strong>{" "}
            <strong className="font-semibold text-ink">6 apps live on Vercel.</strong> When I&rsquo;m not
            shipping, I&rsquo;m deep in backend APIs, auth flows and database design.
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">Open to work:</span> {profile.openTo}{" "}
            <a href="#contact" className="text-accent hover:underline">
              Let&rsquo;s talk.
            </a>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-page transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-4" aria-hidden="true" />
              Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm text-ink-2 transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-ink"
            >
              Open to Work
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm text-ink-2 transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-ink"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <ul className="space-y-2">
              {channels.map(({ label, handle, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    <Icon className="size-4 text-accent" aria-hidden="true" />
                    <span className="font-mono">{handle}</span>
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="reveal" style={{ transitionDelay: "100ms" }}>
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
            <dl className="divide-y divide-line border-t border-line">
              {[
                ["Stack", profile.skills.map((g) => g.group).join(", ")],
                ["Core", `${skillCount} technologies`],
                ["Based in", profile.location],
                ["Focus", "Backend APIs & full-stack apps"],
              ].map(([term, value]) => (
                <div key={term} className="flex gap-3 px-4 py-3">
                  <dt className="w-20 shrink-0 font-mono text-[11px] text-ink-3 uppercase">{term}</dt>
                  <dd className="text-[13px] leading-snug text-ink-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
