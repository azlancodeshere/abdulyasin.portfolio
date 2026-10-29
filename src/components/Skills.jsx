import Section from "./Section.jsx";
import { SkillLogo } from "./SkillLogos.jsx";
import { profile, skillCount } from "../data/profile.js";

const groupColors = {
  Languages:        { dot: "bg-sky-400",    label: "text-sky-400",    border: "border-sky-400/20",    bg: "bg-sky-400/5" },
  Frontend:         { dot: "bg-violet-400", label: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-400/5" },
  Backend:          { dot: "bg-emerald-400",label: "text-emerald-400",border: "border-emerald-400/20",bg: "bg-emerald-400/5" },
  Database:         { dot: "bg-amber-400",  label: "text-amber-400",  border: "border-amber-400/20",  bg: "bg-amber-400/5" },
  Authentication:   { dot: "bg-rose-400",   label: "text-rose-400",   border: "border-rose-400/20",   bg: "bg-rose-400/5" },
  "Tools & DevOps": { dot: "bg-teal-400",   label: "text-teal-400",   border: "border-teal-400/20",   bg: "bg-teal-400/5" },
};

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="Technical Stack"
      heading="Engineering"
      heading2="Toolkit"
      sub="Languages, frameworks, and services I reach for every day."
    >
      <div className="space-y-10">
        {profile.skills.map((group) => {
          const c = groupColors[group.group] || groupColors["Tools & DevOps"];
          return (
            <div key={group.group} className="reveal">
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`size-2 rounded-full ${c.dot}`} />
                <h3 className={`text-xs font-bold uppercase tracking-[0.16em] ${c.label}`}>
                  {group.group}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-line to-transparent" />
                <span className="font-mono text-[11px] text-ink-3">{group.items.length} tools</span>
              </div>

              {/* Skill tiles */}
              <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    title={`${item.name} — ${item.note}`}
                    className="skill-tile group/tile flex flex-col items-center gap-2"
                  >
                    <span
                      className={`skill-icon-wrap flex size-14 items-center justify-center rounded-2xl border ${c.border} ${c.bg} transition-all group-hover/tile:-translate-y-1 group-hover/tile:shadow-lg md:size-16`}
                    >
                      <SkillLogo name={item.name} className="size-6 md:size-7" />
                    </span>
                    <span className="text-center text-[11px] font-medium leading-tight text-ink-3 transition-colors group-hover/tile:text-ink">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer count bar */}
      <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/40 px-5 py-4">
        <span className="text-xs text-ink-3">
          Verified across frontend, backend, database &amp; DevOps layers
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-bold text-accent">{skillCount} Technologies</span>
          <span className="h-4 w-px bg-line" />
          <span className="font-mono text-xs text-ink-3">{profile.skills.length} Categories</span>
        </div>
      </div>
    </Section>
  );
}
