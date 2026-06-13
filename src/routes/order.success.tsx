import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/order/success")({
  head: () => ({
    meta: [
      { title: "Order Received — ShoFirm Foods" },
      { name: "description", content: "Thank you — your order has been received." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <SiteShell>
      <section className="min-h-[90vh] grid place-items-center py-32 bg-warm">
        <div className="container-pad max-w-xl text-center">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center text-navy shadow-gold"
          >
            <Check size={48} strokeWidth={3} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-4xl md:text-6xl font-display font-extrabold text-navy text-balance leading-[1.02]"
          >
            Order received.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-foreground/70"
          >
            Thank you for choosing ShoFirm Foods. Our team will reach out within 24 hours to confirm
            your order, payment and delivery details.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <Link to="/" className="btn-gold px-6 py-3 rounded-full text-sm">
              Back to home
            </Link>
            <Link to="/products" className="btn-outline-navy px-6 py-3 rounded-full text-sm">
              Browse products
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
