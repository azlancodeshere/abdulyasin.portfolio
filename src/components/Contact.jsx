import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const contactLinks = [
  { label: "Email",    value: profile.email,                  href: profile.links.email,    icon: Mail,         canCopy: true },
  { label: "LinkedIn", value: "abdulyasin-devstack",          href: profile.links.linkedin, icon: LinkedinIcon, external: true },
  { label: "GitHub",   value: "azlancodeshere",               href: profile.links.github,   icon: GithubIcon,   external: true },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedKey, setCopied] = useState(null);
  const [sent, setSent]        = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sub  = encodeURIComponent(form.subject || `Portfolio Inquiry from ${form.name || "Visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n—\nSender: ${form.name}\nEmail: ${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${sub}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-md border border-line bg-subtle px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3 transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-accent/40";

  return (
    <Section
      id="contact"
      kicker="Get In Touch"
      heading="Let&rsquo;s"
      heading2="Connect"
      sub="Actively seeking full-time roles, internships, and collaborations."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

        {/* Left — info */}
        <div className="reveal space-y-4">
          {/* Status box */}
          <div className="rounded-md border border-emerald-live/25 bg-emerald-live/5 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-live mb-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-live" />
              </span>
              Available Now
            </div>
            <p className="text-sm font-semibold text-ink">Open to full-time, internships &amp; freelance</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-3">
              <MapPin className="size-3.5 text-accent shrink-0" />
              <span>{profile.location} · Remote OK · Open to relocation</span>
            </div>
          </div>

          {/* Contact links */}
          <div className="space-y-2">
            {contactLinks.map(({ label, value, href, icon: Icon, external, canCopy }) => (
              <div key={label} className="group flex items-center justify-between rounded-md border border-line bg-subtle p-3 transition-all hover:border-accent/35 hover:bg-surface">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex min-w-0 items-center gap-3"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-accent">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold text-ink-3 uppercase tracking-wider">{label}</span>
                    <span className="block truncate font-mono text-xs text-ink group-hover:text-accent transition-colors">{value}</span>
                  </div>
                </a>
                {canCopy && (
                  <button type="button" onClick={() => copy(value, label)} aria-label={`Copy ${label}`}
                    className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-3 transition-colors hover:border-accent/35 hover:text-accent">
                    {copiedKey === label ? <Check className="size-3.5 text-emerald-live" /> : <Copy className="size-3.5" />}
                  </button>
                )}
                {external && (
                  <a href={href} target="_blank" rel="noreferrer"
                    className="flex size-7 shrink-0 items-center justify-center text-ink-3 transition-colors hover:text-accent">
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <div className="rounded-md border border-line bg-subtle p-5 md:p-6">
            <h3 className="text-base font-bold text-ink mb-0.5">Send a Message</h3>
            <p className="text-xs text-ink-3">Opens your email client with everything pre-filled.</p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-ink-2">Your Name</label>
                  <input id="name" name="name" required value={form.name} onChange={update("name")} className={inputClass} placeholder="e.g. Alex Smith" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink-2">Your Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="alex@company.com" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-ink-2">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={update("subject")} className={inputClass} placeholder="Job Opportunity / Collaboration" />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-ink-2">Message</label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Tell me about the role or project..." />
              </div>

              <button type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-live/40 bg-emerald-live/10 py-2.5 text-sm font-bold text-emerald-live transition-all hover:bg-emerald-live/18">
                <Send className="size-4" />
                Send Message
              </button>

              {sent && (
                <div className="rounded-md border border-accent/25 bg-accent/8 p-3 text-center text-xs text-accent font-medium">
                  ✓ Mail client opened. Thanks for reaching out!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
