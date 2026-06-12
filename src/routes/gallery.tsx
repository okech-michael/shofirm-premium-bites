import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/lib/products";
import storyImg from "@/assets/story.jpg";
import factoryImg from "@/assets/factory.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ShoFirm Foods" },
      { name: "description", content: "Explore ShoFirm Foods: products, facility and food photography." },
      { property: "og:title", content: "Gallery — ShoFirm Foods" },
      { property: "og:description", content: "Premium food and facility photography." },
    ],
  }),
  component: GalleryPage,
});

const extras = [storyImg, factoryImg, heroImg];

function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);
  const items = [...products.map((p) => ({ src: p.image, alt: p.name })), ...extras.map((src, i) => ({ src, alt: `Scene ${i + 1}` }))];

  return (
    <SiteShell>
      <section className="pt-36 pb-12 bg-warm">
        <div className="container-pad">
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Gallery</div>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-extrabold text-navy leading-[1.02]">
            Captured with <span className="text-gold italic font-light">care.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">A look inside our products, our process and the people who make ShoFirm what it is.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-pad">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {items.map((it, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(it.src)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="block w-full break-inside-avoid rounded-2xl overflow-hidden group cursor-zoom-in"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl grid place-items-center p-6"
          >
            <button className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-gold hover:text-navy transition-colors" onClick={() => setActive(null)}>
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={active}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}
