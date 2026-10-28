import { ArrowUpRight, GitCommit, GitFork, GitPullRequest } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";
import ContributionGrid from "./ContributionGrid.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

export default function Contributions() {
  return (
    <Section
      id="contributions"
      kicker="Open Source & Activity"
      heading="GitHub"
      heading2="Contributions"
      sub={`Continuous code activity and public repositories maintained at github.com/${profile.github}.`}
    >
      <div className="reveal overflow-hidden rounded-2xl border border-line bg-surface/90 p-6 shadow-md md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
              <GithubIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-ink">@{profile.github}</h3>
              <p className="text-xs text-ink-3">Public contributions & commits</p>
            </div>
          </div>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-subtle px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-line-hi hover:bg-surface-hover hover:text-accent"
          >
            <span>View Full GitHub Profile</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* GitHub Graph */}
        <div className="mt-6 py-2">
          <ContributionGrid />
        </div>

        {/* Highlights footer */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line/60 pt-5 sm:grid-cols-3 text-xs">
          <div className="flex items-center gap-2 text-ink-2">
            <GitCommit className="size-4 text-accent" />
            <span>Regular Commits to Main</span>
          </div>
          <div className="flex items-center gap-2 text-ink-2">
            <GitPullRequest className="size-4 text-accent" />
            <span>Production Vercel Deploys</span>
          </div>
          <div className="flex items-center gap-2 text-ink-2">
            <GitFork className="size-4 text-accent" />
            <span>24+ Public Repositories</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

