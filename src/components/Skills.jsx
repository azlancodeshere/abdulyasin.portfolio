import Section from "./Section.jsx";
import { SkillLogo } from "./SkillLogos.jsx";
import { profile, skillCount } from "../data/profile.js";

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="Technical Stack"
      heading="Engineering"
      heading2="Toolkit"
      sub="The tools behind my builds — languages, frameworks and services I reach for every day."
    >
      <div className="space-y-10 md:space-y-12">
        {profile.skills.map((group) => (
          <div key={group.group} className="reveal">
            <h3 className="text-base font-bold uppercase tracking-[0.12em] text-ink md:text-lg">
              {group.group}
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  title={`${item.name} — ${item.note}`}
                  className="group/tile flex flex-col items-center gap-2.5"
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl border border-line bg-surface/80 shadow-xs transition-all group-hover/tile:-translate-y-1 group-hover/tile:border-accent/40 group-hover/tile:bg-surface group-hover/tile:shadow-md md:size-[4.5rem]">
                    <SkillLogo name={item.name} className="size-7 md:size-8" />
                  </span>
                  <span className="text-center text-[11px] font-medium leading-tight text-ink-2 transition-colors group-hover/tile:text-ink">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface/40 px-5 py-3.5 backdrop-blur-sm">
        <span className="text-xs font-medium text-ink-2">
          Total verified technologies across front & back ends
        </span>
        <span className="font-mono text-xs font-bold text-accent">
          {skillCount} Technologies · {profile.skills.length} Categories
        </span>
      </div>
    </Section>
  );
}
