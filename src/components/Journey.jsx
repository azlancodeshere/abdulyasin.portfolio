import { Calendar, GitFork, GraduationCap, Rocket, Sparkles } from "lucide-react";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

const tagMeta = {
  Education:     { Icon: GraduationCap, color: "text-sky-400",    border: "border-sky-400/30",    bg: "bg-sky-400/8",    dot: "bg-sky-400" },
  "Open Source": { Icon: GitFork,       color: "text-violet-400", border: "border-violet-400/30", bg: "bg-violet-400/8", dot: "bg-violet-400" },
  Focus:         { Icon: Sparkles,      color: "text-emerald-400",border: "border-emerald-400/30",bg: "bg-emerald-400/8",dot: "bg-emerald-400" },
  Milestone:     { Icon: Rocket,        color: "text-amber-400",  border: "border-amber-400/30",  bg: "bg-amber-400/8",  dot: "bg-amber-400" },
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
      {/* GitHub-style timeline */}
      <div className="relative ml-3 pl-8 md:ml-4 md:pl-10">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-line" />

        <div className="space-y-4">
          {profile.journey.map((item, idx) => {
            const meta  = tagMeta[item.tag] || tagMeta["Milestone"];
            const { Icon } = meta;
            const title = item.tag === "Open Source" ? `${publicRepos}+ Public Repositories` : item.title;

            return (
              <div key={item.title} className="reveal relative group" style={{ transitionDelay: `${idx * 70}ms` }}>
                {/* Timeline node */}
                <span className={`absolute -left-[2.05rem] md:-left-[2.55rem] top-4 flex size-6 items-center justify-center rounded-full border ${meta.border} ${meta.bg} ${meta.color} transition-transform group-hover:scale-110`}>
                  <Icon className="size-3" />
                </span>

                {/* GitHub repo-card style box */}
                <div className="rounded-md border border-line bg-subtle p-4 md:p-5 transition-all hover:border-accent/35 hover:bg-surface">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border ${meta.border} ${meta.bg} px-2.5 py-0.5 text-[10px] font-bold ${meta.color} uppercase tracking-wider`}>
                      <span className={`size-1.5 rounded-full ${meta.dot}`} />
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[10px] text-ink-3">
                      <Calendar className="size-3 text-accent" />
                      {item.period}
                    </div>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-ink-2">{item.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
