import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/lib/products";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Place an Order — ShoFirm Foods" },
      { name: "description", content: "Place a wholesale or retail order with ShoFirm Foods." },
      { property: "og:title", content: "Order from ShoFirm Foods" },
      { property: "og:description", content: "Order premium Nigerian flour products." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(products[0].slug);
  const [qty, setQty] = useState(1);

  return (
    <SiteShell>
      <section className="pt-36 pb-12 bg-warm">
        <div className="container-pad">
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold">Order</div>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-extrabold text-navy leading-[1.02]">
            Place an <span className="text-gold italic font-light">order.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Fill out the form and our team will reach out to confirm your order and arrange
            delivery.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-pad max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/order/success" });
            }}
            className="p-8 md:p-12 rounded-3xl bg-warm border border-border space-y-6"
          >
            <Block title="Customer Information">
              <Grid>
                <Input label="Full Name" required />
                <Input label="Email" type="email" required />
                <Input label="Phone" type="tel" required />
                <Input label="Company (optional)" />
              </Grid>
              <Input label="Delivery Address" required />
            </Block>

            <Block title="Product Selection">
              <Grid>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
                    Product *
                  </span>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} — {p.category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
                    Pack Size *
                  </span>
                  <select className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                    {["1 kg", "5 kg", "10 kg", "25 kg", "50 kg"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
                    Quantity *
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
                    Order Type *
                  </span>
                  <select className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                    <option>Retail</option>
                    <option>Wholesale</option>
                    <option>Distributor</option>
                  </select>
                </label>
              </Grid>
            </Block>

            <Block title="Special Requests">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
                  Notes (optional)
                </span>
                <textarea
                  rows={4}
                  className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Delivery instructions, branding requirements, etc."
                />
              </label>
            </Block>

            <button
              type="submit"
              className="btn-gold w-full py-4 rounded-full text-sm inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> Submit Order
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Our team will contact you within 24 hours to confirm and arrange payment & delivery.
            </p>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gold" />
        <h2 className="font-display font-extrabold text-navy text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
function Input({
  label,
  type = "text",
  required,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-navy/70 font-semibold">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        required={required}
        className="mt-2 w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
      />
    </label>
  );
}
