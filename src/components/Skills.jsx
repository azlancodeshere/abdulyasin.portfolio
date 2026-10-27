import Section from "./Section.jsx";
import { profile, skillCount } from "../data/profile.js";

export default function Skills() {
  return (
    <Section
      id="stack"
      kicker="Toolbox"
      heading="Technical Skills"
      sub="The tools behind my builds — pulled straight from my resume."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div
            key={group.group}
            className="reveal rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-hi"
          >
            <h3 className="font-mono text-[13px] text-accent">{`<${group.group}/>`}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-line bg-subtle px-2 py-1 text-[13px] text-ink-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="reveal mt-5 font-mono text-[12px] text-ink-3">
        {skillCount} technologies · {profile.skills.length} categories
      </p>
    </Section>
  );
}
