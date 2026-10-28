import { useEffect, useState } from "react";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { nav, profile } from "../data/profile.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-page/85 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="wrap flex h-16 items-center justify-between gap-4"
      >
        <a
          href="#top"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative flex size-9 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs font-bold text-accent shadow-inner transition-colors group-hover:border-accent/40">
            {profile.initials}
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-live ring-2 ring-page" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
            <span className="hidden text-[11px] font-medium text-ink-3 lg:block">
              Full Stack Developer
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur-md">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? "bg-accent text-page font-semibold shadow-sm"
                        : "text-ink-2 hover:bg-surface-hover hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-1 text-[11px] font-medium text-ink-2 lg:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-live" />
            </span>
            <span>Available for hire</span>
          </div>

          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-all hover:border-line-hi hover:bg-surface-hover hover:text-accent"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Résumé</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-line-hi hover:bg-surface-hover lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-b border-line bg-page/95 px-4 pt-2 pb-6 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col space-y-1">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent-muted text-accent font-semibold"
                        : "text-ink-2 hover:bg-surface hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
            <span className="flex items-center gap-1.5 text-ink-3">
              <span className="size-2 rounded-full bg-emerald-live" />
              Available for hire
            </span>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

