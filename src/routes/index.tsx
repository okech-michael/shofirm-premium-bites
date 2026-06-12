import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, Truck, ShieldCheck, Factory, Sparkles, Heart, Quote } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShoFirm Foods — Premium Nigerian Swallow Flour Products" },
      { name: "description", content: "Premium swallow flours, garri, cassava, yam and plantain flour from ShoFirm Foods. Trusted by homes, retailers and distributors across Nigeria." },
      { property: "og:title", content: "ShoFirm Foods — Premium Nigerian Flour Products" },
      { property: "og:description", content: "Quality flour products trusted nationwide." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Story />
      <Categories />
      <WhyUs />
      <Featured />
      <Process />
      <Testimonials />
      <ContactCTA />
    </SiteShell>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroImg} alt="Premium Nigerian flour products" className="h-full w-full object-cover" width={1920} height={1280} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />

      <motion.div style={{ y: textY, opacity }} className="relative h-full container-pad flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md text-gold text-xs uppercase tracking-[0.2em] w-fit"
        >
          <Sparkles size={14} /> Premium Nigerian Food Manufacturer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-white font-display font-extrabold text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] max-w-5xl"
        >
          Premium Nigerian <span className="text-gold italic font-light">Swallow Flour</span> Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl text-balance"
        >
          Delivering quality flour products trusted by homes, retailers, wholesalers, and distributors across Nigeria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link to="/products" className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 group">
            View Products
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/contact" className="px-8 py-4 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white hover:text-navy transition-all backdrop-blur-md">
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-0 right-0 container-pad"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            {[
              { icon: Award, label: "100% Premium Quality" },
              { icon: Truck, label: "Nationwide Supply" },
              { icon: ShieldCheck, label: "Trusted Manufacturer" },
            ].map((f) => (
              <div key={f.label} className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy">
                  <f.icon size={18} />
                </div>
                <span className="text-sm font-semibold text-navy">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-gold text-xs uppercase tracking-[0.25em] font-semibold">
      <span className="h-px w-8 bg-gold" />
      {children}
    </div>
  );
}

function Story() {
  return (
    <section className="py-24 md:py-32 bg-warm">
      <div className="container-pad grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy text-balance leading-[1.05]">
            Crafting Nigeria's most trusted flour products.
          </h2>
          <div className="mt-5 gold-divider" />
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed">
            ShoFirm Foods Limited is a Nigerian food manufacturer dedicated to producing premium swallow flours, garri, baby foods and specialty grains. Every product is rooted in tradition, refined with modern processing, and trusted in kitchens nationwide.
          </p>
          <p className="mt-5 text-foreground/65 leading-relaxed">
            From sourcing to packaging, we hold every step to a standard worthy of your family's table.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { v: "12+", l: "Premium Products" },
              { v: "36", l: "States Served" },
              { v: "100%", l: "Quality Promise" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-extrabold text-3xl md:text-4xl text-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5]">
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              src={storyImg}
              alt="ShoFirm flour collection"
              className="absolute inset-0 h-full w-full object-cover rounded-3xl shadow-elevated"
              width={1280}
              height={1280}
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 hidden md:block glass-card rounded-2xl p-6 max-w-[260px]"
            >
              <div className="font-display font-extrabold text-2xl text-navy">Est. with care</div>
              <p className="mt-2 text-sm text-foreground/70">Every batch hand-checked before it leaves our facility.</p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-pad">
        <Reveal>
          <SectionLabel>Our Range</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy max-w-2xl text-balance leading-[1.05]">
              Premium products for every Nigerian table.
            </h2>
            <Link to="/products" className="btn-outline-navy px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 group">
              See all products <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-gold hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{p.category}</div>
                  <h3 className="mt-2 font-display font-extrabold text-xl text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                    View Product <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: Award, title: "Premium Quality", desc: "Hand-selected ingredients, milled to perfection." },
  { icon: ShieldCheck, title: "Food Safety", desc: "NAFDAC-aligned standards on every batch." },
  { icon: Truck, title: "Reliable Distribution", desc: "Nationwide delivery network you can trust." },
  { icon: Factory, title: "Modern Processing", desc: "State-of-the-art milling and packaging." },
  { icon: Sparkles, title: "Wholesale Supply", desc: "Volume orders for distributors & retailers." },
  { icon: Heart, title: "Customer First", desc: "Dedicated support and consistent delivery." },
];

function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, oklch(0.78 0.14 78 / 0.6), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.58 0.21 27 / 0.4), transparent 50%)` }} />
      <div className="container-pad relative">
        <Reveal>
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-balance max-w-3xl leading-[1.05]">
            The standards behind every bag we ship.
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-md hover:border-gold/50 hover:bg-white/10 transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy group-hover:scale-110 transition-transform">
                <r.icon size={22} />
              </div>
              <h3 className="mt-6 font-display font-extrabold text-xl">{r.title}</h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="py-24 md:py-32 bg-warm">
      <div className="container-pad">
        <Reveal>
          <SectionLabel>Featured</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy max-w-3xl text-balance leading-[1.05]">
            Bestsellers loved across Nigeria.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img src={p.image} alt={p.name} loading="lazy" width={800} height={1000} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-8">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{p.category}</div>
                <h3 className="mt-2 font-display font-extrabold text-3xl text-white">{p.name}</h3>
                <p className="mt-3 text-white/80 text-sm">{p.short}</p>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="mt-5 inline-flex items-center gap-2 text-sm text-gold font-semibold">
                  Discover <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { n: "01", t: "Raw Material Sourcing", d: "Hand-picked roots, grains and tubers from trusted Nigerian farms." },
  { n: "02", t: "Processing", d: "Modern milling that preserves flavor, nutrition and texture." },
  { n: "03", t: "Quality Assurance", d: "Every batch tested for purity, moisture and consistency." },
  { n: "04", t: "Packaging", d: "Hygienic, durable packaging that locks in freshness." },
  { n: "05", t: "Distribution", d: "Nationwide logistics to retailers, wholesalers and homes." },
];

function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container-pad">
        <Reveal>
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy max-w-3xl text-balance leading-[1.05]">
            From farm to family — every step matters.
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-elevated">
              <img src={factoryImg} alt="ShoFirm manufacturing facility" loading="lazy" width={1600} height={1024} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/30 to-transparent" />
            <div className="space-y-10">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy font-display font-extrabold text-sm shadow-gold">
                    {s.n}
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-navy">{s.t}</h3>
                  <p className="mt-2 text-foreground/70 leading-relaxed">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { n: "Adaeze O.", r: "Distributor, Aba", q: "ShoFirm has been consistent on quality and on delivery. Our customers ask for their garri by name." },
  { n: "Mr. Bola", r: "Retailer, Lagos", q: "The packaging, the texture, the consistency — everything feels premium. We restock weekly." },
  { n: "Mrs. Chinwe", r: "Mother of three", q: "Their plantain flour is my go-to. Smooth swallow, my family loves it." },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-warm">
      <div className="container-pad">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy max-w-3xl text-balance leading-[1.05]">
            Trusted by partners and families nationwide.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 hover:-translate-y-1 transition-transform"
            >
              <Quote className="text-gold" size={28} />
              <p className="mt-5 text-foreground/85 text-lg leading-relaxed">"{t.q}"</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-display font-extrabold text-navy">{t.n}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t.r}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 50% 0%, oklch(0.78 0.14 78 / 0.5), transparent 60%)` }} />
      <div className="container-pad relative text-center">
        <Reveal>
          <SectionLabel>
            <span className="text-gold">Get in touch</span>
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-7xl font-display font-extrabold text-white max-w-4xl mx-auto text-balance leading-[0.95]">
            Ready to order premium <span className="text-gold italic font-light">flour products?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-white/70 max-w-2xl mx-auto">
            Wholesale, retail or home use — our team is ready to fulfill orders of any size, anywhere in Nigeria.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 group">
              Contact Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white hover:text-navy transition-all">
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
