import { BookOpen, Calendar, GraduationCap, MapPin } from "lucide-react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const coursework = [
  "Data Structures & Algorithms",
  "Database Management Systems (DBMS)",
  "Operating Systems",
  "Computer Networks",
  "Object Oriented Programming (OOP)",
];

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="Education & Background"
      heading="Academic Qualifications"
      sub="Computer science fundamentals and formal engineering coursework."
    >
      <div className="relative border-l-2 border-line/80 ml-3 pl-6 space-y-8 md:ml-4 md:pl-8">
        {profile.experience.map((item) => (
          <div key={item.org} className="reveal relative group">
            {/* Timeline icon bullet */}
            <span className="absolute -left-[35px] md:-left-[43px] top-1.5 flex size-7 items-center justify-center rounded-full border-2 border-accent bg-page text-accent shadow-sm">
              <GraduationCap className="size-3.5" aria-hidden="true" />
            </span>

            <div className="rounded-2xl border border-line bg-surface/90 p-6 shadow-md transition-all hover:border-line-hi hover:shadow-lg md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                    Bachelor of Technology
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-ink">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-ink-2">{item.org}</p>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-line bg-subtle px-3 py-1 font-mono text-xs text-ink-3">
                  <Calendar className="size-3 text-accent" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-ink-3">
                <MapPin className="size-3.5 text-accent" />
                <span>{item.place}</span>
              </div>

              {/* Coursework Pills */}
              <div className="mt-6 border-t border-line/60 pt-5">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-ink uppercase tracking-wider">
                  <BookOpen className="size-3.5 text-accent" />
                  Key Coursework
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-line bg-subtle px-2.5 py-1 text-xs text-ink-2"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary Milestones */}
              <div className="mt-5 border-t border-line/60 pt-4 text-xs text-ink-3 space-y-1.5">
                <p>• Senior Secondary (Class 12th) — Jharkhand Academic Council (JAC)</p>
                <p>• Secondary School (Class 10th) — Central Board of Secondary Education (CBSE)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

