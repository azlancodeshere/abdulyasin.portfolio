import { Calendar, GitFork, GraduationCap, Rocket, Sparkles } from "lucide-react";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const tagIcon = {
  Education: GraduationCap,
  "Open Source": GitFork,
  Focus: Sparkles,
  Milestone: Rocket,
};

export default function Journey() {
  const { publicRepos } = useGithub();

  return (
    <Section
      id="experience"
      kicker="My Path"
      heading="The"
      heading2="Journey"
      sub="From first full-stack apps to shipping production MERN products — a path of building, learning and raising the bar."
    >
      <div className="relative border-l-2 border-line/80 ml-3 pl-6 space-y-8 md:ml-4 md:pl-8">
        {profile.journey.map((item) => {
          const Icon = tagIcon[item.tag] || Sparkles;
          const title = item.tag === "Open Source" ? `${publicRepos} Public Repositories` : item.title;
          return (
            <div key={item.title} className="reveal relative group">
              <span className="absolute -left-[35px] md:-left-[43px] top-1.5 flex size-7 items-center justify-center rounded-full border-2 border-accent bg-page text-accent shadow-sm transition-colors group-hover:bg-accent group-hover:text-page">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>

              <div className="rounded-2xl border border-line bg-surface/90 p-6 shadow-md transition-all hover:border-line-hi hover:shadow-lg md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                    {item.tag}
                  </span>

                  <div className="flex items-center gap-1.5 rounded-full border border-line bg-subtle px-3 py-1 font-mono text-xs text-ink-3">
                    <Calendar className="size-3 text-accent" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-bold text-ink group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-2">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
