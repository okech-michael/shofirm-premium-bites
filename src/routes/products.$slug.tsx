import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ShoFirm Foods` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — ShoFirm Foods` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-pad pt-40 pb-24 text-center">
        <h1 className="text-3xl font-display font-extrabold text-navy">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block btn-gold px-6 py-3 rounded-full text-sm">Back to products</Link>
      </div>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell>
      <div className="container-pad pt-40 pb-24 text-center">
        <h1 className="text-2xl font-display font-extrabold">Something went wrong.</h1>
      </div>
    </SiteShell>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  return (
    <SiteShell>
      <section className="pt-32 pb-20 bg-warm">
        <div className="container-pad">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-navy/70 hover:text-gold transition-colors mb-8">
            <ArrowLeft size={16} /> All products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated group">
                <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[product.image, product.image, product.image, product.image].map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border hover:border-gold cursor-pointer">
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">{product.category}</div>
              <h1 className="mt-4 text-5xl md:text-6xl font-display font-extrabold text-navy leading-[1.02]">{product.name}</h1>
              <div className="mt-5 gold-divider" />
              <p className="mt-8 text-lg text-foreground/75 leading-relaxed">{product.description}</p>

              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] text-navy font-semibold">Key Benefits</h3>
                <ul className="mt-4 space-y-3">
                  {product.benefits.map((b: string) => (
                    <li key={b} className="flex items-center gap-3 text-foreground/80">
                      <span className="h-6 w-6 rounded-full bg-gold/15 text-gold grid place-items-center"><Check size={14} /></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-navy text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Available in</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"].map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm">{s}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/order" className="btn-gold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
                    Place an Order <ArrowRight size={16} />
                  </Link>
                  <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-sm font-semibold border border-white/30 hover:bg-white hover:text-navy transition-all inline-flex items-center gap-2">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container-pad">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-navy">You may also like</h2>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-gold transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">{p.category}</div>
                    <h3 className="mt-2 font-display font-extrabold text-lg text-navy">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
