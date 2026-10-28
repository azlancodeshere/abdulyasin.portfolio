import { useEffect, useState } from "react";
import snapshot from "../data/contributions.json";

/**
 * Live GitHub contributions.
 *
 * Renders the bundled snapshot (src/data/contributions.json, refreshed by
 * `npm run sync`) on the first paint, then swaps in real-time data from
 * /api/contributions once it resolves. If that route is unavailable —
 * local static preview, or the function fails — the snapshot simply stays,
 * so the calendar is never empty.
 *
 * The request is shared across every component that asks for it (grid + hero
 * stat), and a failure clears it so the next mount retries.
 */
let liveRequest = null;

function loadLive() {
  if (!liveRequest) {
    liveRequest = fetch("/api/contributions", { headers: { Accept: "application/json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data.days) || !data.days.length) throw new Error("empty payload");
        return data;
      })
      .catch((err) => {
        liveRequest = null;
        throw err;
      });
  }
  return liveRequest;
}

export function useContributions() {
  const [live, setLive] = useState(null);

  useEffect(() => {
    let mounted = true;
    loadLive()
      .then((data) => mounted && setLive(data))
      .catch(() => {
        /* keep the snapshot */
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (live) {
    return { days: live.days, total: live.total, live: true, fetchedAt: live.fetchedAt };
  }

  return { days: snapshot.days, total: snapshot.total, live: false, fetchedAt: null };
}
