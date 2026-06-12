import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products, productCategories } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — ShoFirm Foods" },
      { name: "description", content: "Browse our premium catalogue: garri, semo, yam flour, plantain flour, cassava flour, baby foods and more." },
      { property: "og:title", content: "Products — ShoFirm Foods" },
      { property: "og:description", content: "Premium Nigerian flour products catalogue." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<(typeof productCategories)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"name" | "category">("name");

  const filtered = useMemo(() => {
    return products
      .filter((p) => (cat === "All" ? true : p.category === cat))
      .filter((p) => (q ? p.name.toLowerCase().includes(q.toLowerCase()) : true))
      .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category)));
  }, [cat, q, sort]);

  return (
    <SiteShell>
      <section className="pt-36 pb-12 bg-warm">
        <div className="container-pad">
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Catalogue</div>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-extrabold text-navy text-balance leading-[1.02]">
            Our Premium <span className="text-gold italic font-light">Products</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Twelve premium products, milled and packaged with care, ready for homes, retailers, wholesalers and distributors.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-warm/90 backdrop-blur-xl border-y border-border">
        <div className="container-pad py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {productCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  cat === c ? "bg-navy text-white" : "bg-white text-navy border border-border hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                className="pl-9 pr-4 py-2 rounded-full bg-white border border-border text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all w-56"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "name" | "category")}
              className="px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-navy focus:outline-none focus:border-gold"
            >
              <option value="name">Sort: Name</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-pad">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-gold hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img src={p.image} alt={p.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
          )}
        </div>
      </section>
    </SiteShell>
  );
}
