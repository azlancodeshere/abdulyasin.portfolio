import { ArrowUpRight, GitFork, Star, Users } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import ContributionGrid from "./ContributionGrid.jsx";
import Section from "./Section.jsx";
import { useGithub } from "../hooks/useGithub.js";
import { profile } from "../data/profile.js";

export default function Contributions() {
  const { publicRepos, stars, followers } = useGithub();

  const highlights = [
    { icon: GitFork, label: "Public Repos", value: publicRepos, color: "text-sky-400"    },
    { icon: Star,    label: "Stars Earned", value: stars,       color: "text-amber-400"  },
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
      {/* GitHub-style activity card */}
      <div className="reveal overflow-hidden rounded-md border border-line bg-subtle shadow-md">

        {/* Card header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink-2">
              <GithubIcon className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">@{profile.github}</h3>
              <p className="text-[11px] text-ink-3">Contribution graph · last 12 months</p>
            </div>
          </div>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:border-accent/35 hover:text-accent"
          >
            Full Profile <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Contribution heatmap */}
        <div className="px-5 py-5">
          <ContributionGrid />
        </div>

        {/* Stats — GitHub counter row */}
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {highlights.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-4">
              <Icon className={`size-4 ${color}`} />
              <span className={`font-mono text-xl font-extrabold ${color}`}>{value}</span>
              <span className="text-[11px] text-ink-3">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
