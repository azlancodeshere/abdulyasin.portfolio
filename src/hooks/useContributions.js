import { useEffect, useState } from "react";
import snapshot from "../data/contributions.json";

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
