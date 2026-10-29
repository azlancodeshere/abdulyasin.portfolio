import { Calendar, GitFork, GraduationCap, Rocket, Sparkles } from "lucide-react";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const tagMeta = {
  Education:    { Icon: GraduationCap, color: "text-sky-400",    bg: "bg-sky-400/10",    border: "border-sky-400/25",    dot: "bg-sky-400" },
  "Open Source":{ Icon: GitFork,       color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/25", dot: "bg-violet-400" },
  Focus:        { Icon: Sparkles,      color: "text-emerald-400",bg: "bg-emerald-400/10",border: "border-emerald-400/25",dot: "bg-emerald-400" },
  Milestone:    { Icon: Rocket,        color: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/25",  dot: "bg-amber-400" },
};

export default function Journey() {
  const { publicRepos } = useGithub();

  return (
    <Section
      id="experience"
      kicker="My Path"
      heading="The"
      heading2="Journey"
      sub="From first full-stack apps to shipping production MERN products."
    >
      <div className="relative ml-3 pl-8 md:ml-5 md:pl-10">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-line to-transparent" />

        <div className="space-y-6">
          {profile.journey.map((item, idx) => {
            const meta = tagMeta[item.tag] || tagMeta["Milestone"];
            const { Icon } = meta;
            const title =
              item.tag === "Open Source" ? `${publicRepos}+ Public Repositories` : item.title;

            return (
              <div key={item.title} className="reveal relative group" style={{ transitionDelay: `${idx * 80}ms` }}>
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[2.1rem] md:-left-[2.6rem] top-5 flex size-7 items-center justify-center rounded-full border-2 ${meta.border} bg-page ${meta.color} shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md`}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>

                {/* Card */}
                <div className="rounded-2xl border border-line bg-surface/70 p-5 shadow-md transition-all hover:border-line-hi hover:bg-surface hover:shadow-xl md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    {/* Tag */}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full ${meta.bg} border ${meta.border} px-3 py-1 text-[11px] font-bold ${meta.color} uppercase tracking-wider`}
                    >
                      <span className={`size-1.5 rounded-full ${meta.dot}`} />
                      {item.tag}
                    </span>

                    {/* Period */}
                    <div className="flex items-center gap-1.5 rounded-full border border-line bg-subtle px-3 py-1 font-mono text-xs text-ink-3">
                      <Calendar className="size-3 text-accent" />
                      {item.period}
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-ink-2">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
