import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

export default function Contributions() {
  return (
    <Section
      id="contributions"
      kicker="Activity"
      heading="GitHub Contributions"
      sub="Everything above lives in the same place — github.com/azlancodeshere."
    >
      <div className="reveal overflow-hidden rounded-xl border border-line bg-surface p-4 md:p-5">
        <img
          src={`https://ghchart.rshah.org/${profile.github}`}
          alt={`GitHub contribution chart for ${profile.github}`}
          loading="lazy"
          className="w-full"
        />
        <p className="mt-3 font-mono text-[11px] text-ink-3">
          Commits to main, last 12 months ·{" "}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            view profile
          </a>
        </p>
      </div>
    </Section>
  );
}
