import { useState } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const channels = [
  {
    label: "Gmail",
    handle: profile.email,
    href: profile.links.email,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    handle: profile.linkedin,
    href: profile.links.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  { label: "GitHub", handle: `@${profile.github}`, href: profile.links.github, icon: GithubIcon, external: true },
  { label: "Phone", handle: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone, external: false },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    // Static site: hand the message to the visitor's mail client, no backend needed.
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const input =
    "w-full rounded-md border border-line bg-subtle px-3 py-2.5 text-sm text-ink placeholder:text-ink-3 transition-colors focus:border-line-hi focus:outline-none";

  return (
    <Section id="contact" kicker="Say hello" heading="Get In Touch" sub="Feel free to reach out through any of these platforms.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="reveal rounded-xl border border-line bg-surface p-5 md:p-6">
          <h3 className="text-base font-semibold">Let&rsquo;s Connect</h3>
          <p className="mt-1.5 text-sm text-ink-3">
            Open to full-time roles, internships and collaborations.
          </p>

          <ul className="mt-5 space-y-2">
            {channels.map(({ label, handle, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-md border border-line bg-subtle px-3.5 py-3 transition-colors hover:border-line-hi hover:bg-surface-hover"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="truncate font-mono text-[13px] text-ink-2 group-hover:text-ink">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-3.5 shrink-0 text-ink-3 transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal rounded-xl border border-line bg-surface p-5 md:p-6" style={{ transitionDelay: "80ms" }}>
          <h3 className="text-base font-semibold">Send me a message</h3>
          <p className="mt-1.5 text-sm text-ink-3">
            This opens your email app with everything filled in — no server in between.
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] text-ink-3 uppercase">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={update("name")}
                className={input}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] text-ink-3 uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className={input}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] text-ink-3 uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={update("message")}
                className={`${input} resize-none`}
                placeholder="Tell me what you're building…"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-page transition-transform hover:-translate-y-0.5"
            >
              <Send className="size-4" aria-hidden="true" />
              Send message
            </button>

            {sent && (
              <p role="status" className="font-mono text-[12px] text-accent">
                Mail client opened — thanks for reaching out.
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}
