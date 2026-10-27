import { Code, Layout, Server, Database, KeyRound, Wrench } from "lucide-react";
import Section from "./Section.jsx";
import { profile, skillCount } from "../data/profile.js";

const iconMap = {
  Languages: Code,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  Authentication: KeyRound,
  "Tools & DevOps": Wrench,
  Tools: Wrench,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="Technical Stack"
      heading="Skills & Technologies"
      sub="A comprehensive breakdown of the core tools, languages, and frameworks I use to engineer full-stack software."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => {
          const Icon = iconMap[group.group] || Code;
          return (
            <div
              key={group.group}
              className="reveal group flex flex-col justify-between rounded-xl border border-line bg-surface/80 p-5 transition-all hover:border-line-hi hover:bg-surface hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center gap-2.5 border-b border-line pb-3">
                  <span className="flex size-7 items-center justify-center rounded-md bg-accent-muted text-accent">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-sm font-bold text-ink">{group.group}</h3>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-subtle px-2.5 py-1 text-xs font-medium text-ink-2 shadow-2xs transition-colors hover:border-accent/40 hover:text-ink hover:bg-surface-hover"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-line/40 text-[11px] font-mono text-ink-3">
                {group.items.length} technologies
              </div>
            </div>
          );
        })}
      </div>

      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface/40 px-5 py-3.5 backdrop-blur-sm">
        <span className="text-xs font-medium text-ink-2">
          Total verified technologies across front & back ends
        </span>
        <span className="font-mono text-xs font-bold text-accent">
          {skillCount} Technologies · 6 Categories
        </span>
      </div>
    </Section>
  );
}

