import { useEffect, useState } from "react";
import snapshot from "../data/github.json";

let liveRequest = null;

function loadLive() {
  if (!liveRequest) {
    liveRequest = fetch("/api/github", { headers: { Accept: "application/json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data.repos) || !data.repos.length) throw new Error("empty payload");
        return data;
      })
      .catch((err) => {
        liveRequest = null;
        throw err;
      });
  }
  return liveRequest;
}

export function useGithub() {
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

  const data = live || snapshot;
  return {
    live: Boolean(live),
    fetchedAt: data.fetchedAt || null,
    publicRepos: data.public_repos,
    followers: data.followers,
    stars: data.stars,
    liveApps: data.liveApps,
    repos: data.repos,
  };
}

export function repoByName(repos) {
  return new Map(repos.map((r) => [r.name, r]));
}
