import { useContributions } from "../hooks/useContributions.js";

/**
 * Native GitHub-style contribution calendar.
 *
 * Data comes from useContributions(): the bundled snapshot in
 * src/data/contributions.json ([date, level, count] per day, Sunday-first,
 * oldest first) on first paint, then the real-time /api/contributions
 * response once it resolves. Levels 1-4 use GitHub's own dark-theme greens.
 */
const LEVEL_BG = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Label the column where a new month starts (skip labels that would collide, like GitHub). */
function monthLabels(days) {
  const labels = [];
  let lastCol = -Infinity;
  let prevMonth = -1; // sentinel so the very first column gets its own month

  days.forEach(([date], i) => {
    const month = Number(date.slice(5, 7)) - 1;
    if (month === prevMonth) return;
    prevMonth = month;

    const col = Math.floor(i / 7);
    if (col - lastCol >= 3) {
      labels.push({ col, month });
      lastCol = col;
    }
  });

  return labels;
}

function tooltip([date, , count]) {
  const month = MONTHS_LONG[Number(date.slice(5, 7)) - 1];
  const day = Number(date.slice(8, 10));
  const year = date.slice(0, 4);
  if (count === 0) return `No contributions on ${month} ${day}, ${year}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${month} ${day}, ${year}`;
}

export default function ContributionGrid() {
  const { days, total, live, fetchedAt } = useContributions();
  const labels = monthLabels(days);
  const updated = fetchedAt ? new Date(fetchedAt).toLocaleString() : null;

  return (
    <div>
      <p className="mb-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs text-ink-3">
        <span
          className="inline-flex items-center gap-1.5"
          title={
            live
              ? `Real-time from GitHub — updated ${updated}`
              : "Showing the bundled snapshot; live data is unavailable right now"
          }
        >
          <span
            className={`size-1.5 rounded-full ${live ? "bg-emerald-live" : "bg-ink-3"}`}
            aria-hidden="true"
          />
          {live ? "Live from GitHub" : "Snapshot"}
        </span>
        <span>
          <span className="font-semibold text-ink-2">{total.toLocaleString()}</span>{" "}
          contributions in the last year
        </span>
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div className="flex gap-2">
            {/* Weekday labels */}
            <div className="flex flex-col gap-[3px] pt-[20px] text-[11px] leading-[10px] text-ink-3" aria-hidden="true">
              {WEEKDAYS.map((day, i) => (
                <span key={day} className={i % 2 === 0 ? "invisible" : ""}>
                  {day}
                </span>
              ))}
            </div>

            <div>
              {/* Month labels */}
              <div className="relative mb-[6px] h-[14px]">
                {labels.map(({ col, month }) => (
                  <span
                    key={`${month}-${col}`}
                    className="absolute top-0 text-xs text-ink-3"
                    style={{ left: `calc(${col} * 13px)` }}
                  >
                    {MONTHS[month]}
                  </span>
                ))}
              </div>

              {/* Calendar grid: one column per week, 7 rows Sunday-first */}
              <div
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                role="img"
                aria-label={`GitHub contribution chart: ${total} contributions in the last year`}
              >
                {days.map((day) => {
                  const level = day[1];
                  return (
                    <div
                      key={day[0]}
                      title={tooltip(day)}
                      className="size-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125"
                      style={{
                        backgroundColor: LEVEL_BG[level],
                        boxShadow:
                          level === 0 ? "inset 0 0 0 1px rgba(255,255,255,0.04)" : undefined,
                      }}
                    />
                  );
                })}
              </div>

              {/* Less / More legend */}
              <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-ink-3">
                <span className="mr-1">Less</span>
                {LEVEL_BG.map((color) => (
                  <span
                    key={color}
                    className="size-[10px] rounded-[2px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
