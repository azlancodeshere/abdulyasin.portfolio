import { useEffect, useState } from "react";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { nav, profile } from "../data/profile.js";

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [active, setActive]             = useState("");
  const [mobileMenuOpen, setMobile]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids      = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const kd = (e) => { if (e.key === "Escape") setMobile(false); };
    const rz = () => { if (window.innerWidth >= 1024) setMobile(false); };
    window.addEventListener("keydown", kd);
    window.addEventListener("resize", rz);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("resize", rz); };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-line bg-subtle/95 shadow-md shadow-black/40 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="wrap flex h-14 items-center justify-between gap-4">

        {/* Logo — GitHub style: avatar + name */}
        <a href="#top" className="group flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="relative flex size-8 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs font-extrabold text-accent">
            {profile.initials}
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-live ring-2 ring-page" />
          </div>
          <span className="text-sm font-semibold text-ink">{profile.name}</span>
        </a>

        {/* Desktop nav — GitHub underline style */}
        <ul className="hidden items-center gap-0 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative flex items-center px-3.5 py-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Available pill */}
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-live/25 bg-emerald-live/8 px-2.5 py-1 text-[11px] font-semibold text-emerald-live lg:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-live" />
            </span>
            Available
          </span>

          {/* Resume — GitHub green button style */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-all hover:border-accent/40 hover:text-accent"
          >
            <FileText className="size-3.5" />
            Resume
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobile((o) => !o)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            className="flex size-9 items-center justify-center rounded-md border border-line bg-surface text-ink-2 transition-colors hover:text-ink lg:hidden"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-subtle px-4 pb-5 pt-2 lg:hidden">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobile(false)}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-accent/10 text-accent" : "text-ink-2 hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-40" />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 border-t border-line pt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-emerald-live font-medium">
              <span className="size-1.5 rounded-full bg-emerald-live" />
              Available for hire
            </span>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="text-accent hover:underline font-semibold">
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
