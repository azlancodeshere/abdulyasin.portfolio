export default function Section({ id, kicker, heading, sub, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-14 md:py-20">
      <div className="wrap">
        <header className="reveal">
          {kicker && (
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">{kicker}</p>
          )}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.35rem]">{heading}</h2>
          {sub && <p className="mt-2 max-w-prose text-ink-3">{sub}</p>}
        </header>
        <div className="mt-9">{children}</div>
      </div>
    </section>
  );
}
