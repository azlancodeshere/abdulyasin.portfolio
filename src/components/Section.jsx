const sectionNumbers = {
  about:         "01",
  contributions: "02",
  projects:      "03",
  skills:        "04",
  experience:    "05",
  contact:       "06",
};

export default function Section({ id, kicker, heading, heading2, sub, children }) {
  const num = sectionNumbers[id] || "";
  return (
    <section id={id} className="scroll-mt-20 py-14 md:py-20">
      <div className="wrap">
        <header className="reveal">
          <div className="flex items-center gap-3 mb-3">
            {num && <span className="section-number">{num} //</span>}
            {kicker && (
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                {kicker}
              </p>
            )}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-[2rem]">
            {heading}{" "}
            {heading2 && (
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                {heading2}
              </span>
            )}
          </h2>

          {sub && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{sub}</p>
          )}

          {/* GitHub-style section underline */}
          <div className="mt-5 h-px w-full bg-line" />
        </header>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
