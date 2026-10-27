import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import { profile, stats } from "../data/profile.js";

const socials = [
  { label: "Email", href: profile.links.email, icon: Mail, handle: profile.email },
  { label: "GitHub", href: profile.links.github, icon: GithubIcon, handle: `@${profile.github}` },
  { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedinIcon, handle: profile.linkedin },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-6 md:pt-16">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[420px]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="reveal flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={`${profile.name} portrait`}
            width={72}
            height={72}
            className="size-14 rounded-xl border border-line object-cover md:size-16"
          />
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
              {profile.role}
            </p>
            <p className="mt-1 text-sm text-ink-3">{profile.location}</p>
          </div>
        </div>

        <div className="reveal mt-7" style={{ transitionDelay: "80ms" }}>
          <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-tight md:text-6xl">
            Hey, I&rsquo;m <span className="font-serif font-normal italic">{profile.firstName}.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{profile.hero}</p>
        </div>

        <div
          className="reveal mt-6 flex flex-wrap items-center gap-2.5"
          style={{ transitionDelay: "160ms" }}
        >
          {socials.map(({ label, href, icon: Icon, handle }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[13px] text-ink-2 transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-ink"
            >
              <Icon className="size-3.5 text-accent" aria-hidden="true" />
              <span className="font-mono">{handle}</span>
              <ArrowUpRight
                className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-page transition-transform hover:-translate-y-0.5"
          >
            Download Résumé
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <dl
          className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4"
          style={{ transitionDelay: "240ms" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-4 md:px-5 md:py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-mono text-2xl text-ink md:text-[1.75rem]">{s.value}</span>
                <span className="mt-1 block text-[13px] leading-snug text-ink-3">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
