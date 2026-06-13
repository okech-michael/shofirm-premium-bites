import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ShoFirm Foods" },
      {
        name: "description",
        content: "Reach ShoFirm Foods by phone, WhatsApp, email or visit us in Lagos, Nigeria.",
      },
      { property: "og:title", content: "Contact ShoFirm Foods" },
      { property: "og:description", content: "Get in touch with our team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="pt-36 pb-12 bg-warm">
        <div className="container-pad">
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Contact</div>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-extrabold text-navy leading-[1.02]">
            Let's <span className="text-gold italic font-light">talk.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Wholesale enquiries, retail partnerships, or just a quick question — our team is ready
            to help.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-pad grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, t: "Phone", v: "+234 09032223878", href: "tel:+23409032223878" },
              {
                icon: MessageCircle,
                t: "WhatsApp",
                v: "Chat with us instantly",
                href: "https://wa.me/23409032223878?text=Hello%20ShoFirm%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.",
              },
              {
                icon: Mail,
                t: "Email",
                v: "shofirmfoods@gmail.com",
                href: "mailto:shofirmfoods@gmail.com",
              },
              { icon: MapPin, t: "Address", v: "Lagos, Nigeria" },
            ].map((c) => {
              const Inner = (
                <div className="p-6 rounded-2xl bg-warm border border-border hover:border-gold transition-all flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy shrink-0">
                    <c.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                      {c.t}
                    </div>
                    <div className="mt-1 font-display font-extrabold text-navy">{c.v}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.t} href={c.href} className="block">
                  {Inner}
                </a>
              ) : (
                <div key={c.t}>{Inner}</div>
              );
            })}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-border">
              <iframe
                title="ShoFirm Foods location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.30%2C6.40%2C3.50%2C6.55&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-navy text-white space-y-5"
          >
            <h2 className="font-display font-extrabold text-2xl">Send us a message</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name" type="text" required />
              <Field label="Email" type="email" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Phone" type="tel" />
              <Field label="Company" type="text" />
            </div>
            <Field label="Subject" type="text" />
            <Field label="Message" textarea />
            <button
              type="submit"
              className="btn-gold px-8 py-4 rounded-full text-sm inline-flex items-center gap-2"
            >
              {sent ? (
                "Message sent ✓"
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  type,
  textarea,
  required,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-white/60 font-semibold">
        {label}
        {required && " *"}
      </span>
      <div className="mt-2">
        {textarea ? (
          <textarea rows={5} required={required} className={base} />
        ) : (
          <input type={type ?? "text"} required={required} className={base} />
        )}
      </div>
    </label>
  );
}
