export default function Section({ id, kicker, heading, heading2, sub, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-14 md:py-20">
      <div className="wrap">
        <header className="reveal">
          {kicker && (
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">{kicker}</p>
          )}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.35rem]">
            {heading}
            {heading2 && (
              <>
                <br />
                <span className="bg-gradient-to-r from-ink via-ink to-ink-2 bg-clip-text text-transparent">
                  {heading2}
                </span>
              </>
            )}
          </h2>
          {sub && <p className="mt-2 max-w-prose text-ink-3">{sub}</p>}
        </header>
        <div className="mt-9">{children}</div>
      </div>
    </section>
  );
}
