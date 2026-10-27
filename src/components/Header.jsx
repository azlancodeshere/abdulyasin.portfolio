import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { nav, profile } from "../data/profile.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-page/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Sections"
        className="wrap flex h-16 items-center justify-between gap-6"
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md border border-line bg-surface font-mono text-[11px] text-accent transition-colors group-hover:border-line-hi">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-medium text-ink-2 transition-colors group-hover:text-ink sm:block">
            {profile.name}
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-md px-3 py-1.5 font-mono text-[13px] transition-colors ${
                      isActive
                        ? "bg-accent-muted text-ink"
                        : "text-ink-3 hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-line-hi hover:bg-surface-hover"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
