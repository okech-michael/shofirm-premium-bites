import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import storyImg from "@/assets/story.jpg";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ShoFirm Foods Limited" },
      { name: "description", content: "Learn about ShoFirm Foods Limited — a premium Nigerian food manufacturer committed to quality, safety and authentic flavor." },
      { property: "og:title", content: "About ShoFirm Foods" },
      { property: "og:description", content: "Our story, mission, vision and standards." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { y: "Origin", t: "Rooted in Nigerian tradition.", d: "ShoFirm Foods began with a simple commitment — bring premium-quality swallow flour products to Nigerian homes." },
  { y: "Growth", t: "Modern processing meets heritage.", d: "We invested in modern milling and packaging to scale quality without compromise." },
  { y: "Today", t: "Trusted nationwide.", d: "We supply retailers, wholesalers and distributors across all 36 states of Nigeria." },
  { y: "Tomorrow", t: "Beyond borders.", d: "We're building on our reputation to bring premium Nigerian food to global tables." },
];

const values = [
  { t: "Quality", d: "Uncompromising standards from raw material to finished pack." },
  { t: "Integrity", d: "Honest sourcing, transparent processing, fair partnerships." },
  { t: "Care", d: "We treat every family table as if it were our own." },
  { t: "Innovation", d: "We blend tradition with modern food science." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="pt-36 pb-20 bg-warm">
        <div className="container-pad grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">About Us</div>
            <h1 className="mt-5 text-5xl md:text-7xl font-display font-extrabold text-navy text-balance leading-[1.02]">
              Premium Nigerian food, <span className="text-gold italic font-light">made with care.</span>
            </h1>
            <p className="mt-8 text-lg text-foreground/75 leading-relaxed">
              ShoFirm Foods Limited is a Nigerian food manufacturer focused on premium swallow flours, garri, baby foods and specialty grains. Our promise is consistent quality, every batch, every time.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
            <img src={storyImg} alt="ShoFirm products" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-pad grid md:grid-cols-2 gap-12">
          <div className="rounded-3xl bg-warm p-10">
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Mission</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-extrabold text-navy">Premium quality, accessible to every Nigerian home.</h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">To produce and distribute the finest food products — preserving tradition, exceeding safety standards, and earning trust at every table we serve.</p>
          </div>
          <div className="rounded-3xl bg-navy text-white p-10">
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Vision</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-extrabold">A globally recognized Nigerian food brand.</h2>
            <p className="mt-5 text-white/75 leading-relaxed">To become the most trusted name in premium Nigerian food — at home and across the world.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-warm">
        <div className="container-pad">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy max-w-2xl">Our journey.</h2>
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:-translate-x-px" />
            <div className="space-y-12">
              {timeline.map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className={`${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                    <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">{m.y}</div>
                    <h3 className="mt-2 font-display font-extrabold text-2xl text-navy">{m.t}</h3>
                    <p className="mt-3 text-foreground/70">{m.d}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy font-display font-extrabold text-xs md:-translate-x-1/2 shadow-gold">
                    {i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-pad">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy max-w-2xl">Our values.</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.t} className="p-8 rounded-3xl bg-warm border border-border hover:border-gold hover:-translate-y-1 transition-all">
                <div className="font-display font-extrabold text-3xl text-gold">{v.t}</div>
                <p className="mt-4 text-foreground/70 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-warm">
        <div className="container-pad grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
            <img src={factoryImg} alt="Manufacturing facility" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Standards</div>
            <h2 className="mt-5 text-4xl md:text-5xl font-display font-extrabold text-navy leading-[1.05]">Manufacturing held to the highest standards.</h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">Our facility operates under strict hygiene, traceability and quality-control protocols. Every batch is tested for moisture, purity and consistency before it reaches your shelf.</p>
            <ul className="mt-6 space-y-3 text-foreground/80">
              {["NAFDAC-aligned safety standards", "Modern milling and packaging lines", "Traceable raw material sourcing", "Trained quality control team"].map((b) => (
                <li key={b} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-gold" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
