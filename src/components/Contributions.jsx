import { ArrowUpRight, GitFork, Star, Users } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import ContributionGrid from "./ContributionGrid.jsx";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

export default function Contributions() {
  const { publicRepos, stars, followers } = useGithub();

  const highlights = [
    { icon: GitFork, label: "Public Repos", value: publicRepos, color: "text-sky-400" },
    { icon: Star,    label: "Stars Earned", value: stars,       color: "text-amber-400" },
    { icon: Users,   label: "Followers",    value: followers,   color: "text-violet-400" },
  ];

  return (
    <Section
      id="contributions"
      kicker="Open Source Activity"
      heading="GitHub"
      heading2="Contributions"
      sub={`Daily commits and public work at github.com/${profile.github}.`}
    >
      <div className="reveal overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-muted text-accent">
              <GithubIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-ink">@{profile.github}</h3>
              <p className="text-xs text-ink-3">Contribution graph · last 12 months</p>
            </div>
          </div>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-subtle px-3.5 py-2 text-xs font-semibold text-ink-2 transition-all hover:border-line-hi hover:text-accent"
          >
            Full Profile
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Contribution heatmap */}
        <div className="px-6 py-6">
          <ContributionGrid />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {highlights.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-4 px-4">
              <Icon className={`size-4 ${color}`} />
              <span className={`font-mono text-lg font-extrabold ${color}`}>{value}</span>
              <span className="text-[11px] text-ink-3">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
