import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: profile.links.email,
    icon: Mail,
    canCopy: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
    canCopy: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abdulyasin-devstack",
    href: profile.links.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/azlancodeshere",
    href: profile.links.github,
    icon: GithubIcon,
    external: true,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedKey, setCopiedKey] = useState(null);
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      form.subject || `Portfolio Inquiry from ${form.name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n—\nSender: ${form.name}\nEmail: ${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-lg border border-line bg-subtle px-3.5 py-2.5 text-[16px] text-ink placeholder:text-ink-3 transition-all focus:border-accent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <Section
      id="contact"
      kicker="Get In Touch"
      heading="Let&rsquo;s"
      heading2="Connect"
      sub="I am actively looking for full-time opportunities, internships, and freelance projects. Let's discuss how I can contribute to your team."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
        <div className="reveal space-y-6">
          <div className="rounded-2xl border border-line bg-surface/90 p-6 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-live">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-live opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-live" />
              </span>
              <span>Available for Immediate Opportunities</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-ink">Have a project or role in mind?</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-3">
              I reply quickly to messages. Feel free to copy my email directly or reach out via LinkedIn.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-ink-2">
              <MapPin className="size-3.5 text-accent" />
              <span>{profile.location} (Open to Remote & Relocation)</span>
            </div>
          </div>

          <div className="space-y-3">
            {contactLinks.map(({ label, value, href, icon: Icon, external, canCopy }) => (
              <div
                key={label}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface p-3.5 transition-all hover:border-line-hi hover:bg-surface/90"
              >
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex min-w-0 items-center gap-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-ink-3 uppercase">{label}</span>
                    <span className="block truncate font-mono text-xs text-ink group-hover:text-accent transition-colors">
                      {value}
                    </span>
                  </div>
                </a>

                {canCopy && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(value, label)}
                    aria-label={`Copy ${label}`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-ink-3 transition-colors hover:border-line-hi hover:bg-surface hover:text-ink"
                  >
                    {copiedKey === label ? (
                      <Check className="size-3.5 text-emerald-live" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                )}

                {external && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-8 shrink-0 items-center justify-center text-ink-3 transition-colors hover:text-accent"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <div className="rounded-2xl border border-line bg-surface/90 p-6 shadow-md backdrop-blur-md md:p-8">
            <h3 className="text-lg font-bold text-ink">Send a Direct Message</h3>
            <p className="mt-1 text-xs text-ink-3">
              Fill out this form to launch your email client with all details prepared.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-ink-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    className={inputClass}
                    placeholder="e.g. Alex Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className={inputClass}
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-ink-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  className={inputClass}
                  placeholder="e.g. Job Opportunity / Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-ink-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={update("message")}
                  className={`${inputClass} resize-none`}
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-page shadow-md shadow-accent/20 transition-all hover:bg-sky-400 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Send className="size-4" aria-hidden="true" />
                <span>Send Message</span>
              </button>

              {sent && (
                <div className="rounded-lg border border-accent/30 bg-accent-muted p-3 text-xs text-accent">
                  Your mail client has been opened. Thank you for getting in touch!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

