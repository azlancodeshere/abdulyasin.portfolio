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
      sub="Languages, frameworks, and services I reach for every day."
    >
      <div className="space-y-8">
        {profile.skills.map((group) => (
          <div key={group.group} className="reveal">
            {/* Group header — GitHub section separator */}
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-2">
                {group.group}
              </h3>
              <div className="flex-1 h-px bg-line" />
              <span className="font-mono text-[10px] text-ink-3">{group.items.length}</span>
            </div>

            {/* Skill tiles — GitHub box style */}
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  title={`${item.name} — ${item.note}`}
                  className="skill-tile group/tile flex flex-col items-center gap-2"
                >
                  <span className="skill-icon-wrap flex size-14 items-center justify-center rounded-md border border-line bg-subtle transition-all group-hover/tile:-translate-y-0.5 group-hover/tile:border-accent/35 group-hover/tile:bg-surface md:size-16">
                    <SkillLogo name={item.name} className="size-6 md:size-7" />
                  </span>
                  <span className="text-center text-[11px] font-medium leading-tight text-ink-3 group-hover/tile:text-ink-2 transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer count — GitHub counter style */}
      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-subtle px-4 py-3">
        <span className="text-xs text-ink-3">Verified technologies across frontend, backend &amp; DevOps</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-accent">{skillCount} Technologies</span>
          <span className="h-3.5 w-px bg-line" />
          <span className="font-mono text-xs text-ink-3">{profile.skills.length} Categories</span>
        </div>
      </div>
    </Section>
  );
}
