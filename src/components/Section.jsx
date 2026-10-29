const sectionNumbers = {
  about: "01",
  contributions: "02",
  projects: "03",
  skills: "04",
  experience: "05",
  contact: "06",
};

export default function Section({ id, kicker, heading, heading2, sub, children }) {
  const num = sectionNumbers[id] || "";
  return (
    <section id={id} className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <header className="reveal">
          <div className="flex items-center gap-4 mb-4">
            {num && (
              <span className="section-number">{num} //</span>
            )}
            {kicker && (
              <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">{kicker}</p>
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-[2.5rem] leading-[1.1]">
            {heading}{" "}
            {heading2 && (
              <span className="bg-gradient-to-r from-accent via-sky-300 to-accent-2 bg-clip-text text-transparent">
                {heading2}
              </span>
            )}
          </h2>
          {sub && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-3">{sub}</p>}
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
