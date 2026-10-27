import { GraduationCap, MapPin } from "lucide-react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="Background"
      heading="Experience"
      sub="Where I'm learning and building."
    >
      <ol className="space-y-4">
        {profile.experience.map((item) => (
          <li
            key={item.org}
            className="reveal group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-hi md:p-6"
          >
            <div className="flex flex-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-subtle text-accent transition-colors group-hover:border-line-hi">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{item.role}</h3>
                    <p className="mt-0.5 text-sm text-ink-2">{item.org}</p>
                  </div>
                  <span className="font-mono text-xs whitespace-nowrap text-ink-3">{item.period}</span>
                </div>

                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-3">
                  <MapPin className="size-3" aria-hidden="true" />
                  {item.place}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
