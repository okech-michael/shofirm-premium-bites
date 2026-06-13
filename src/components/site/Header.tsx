import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/order", label: "Order" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm/90 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(11,35,65,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-pad flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center font-display font-black text-navy text-lg shadow-gold">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`font-display font-extrabold text-base tracking-tight ${scrolled ? "text-navy" : "text-white"}`}
            >
              ShoFirm
            </span>
            <span
              className={`text-[10px] tracking-[0.2em] uppercase ${scrolled ? "text-muted-foreground" : "text-white/70"}`}
            >
              Foods Limited
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                scrolled ? "text-navy hover:text-gold" : "text-white/90 hover:text-gold"
              }`}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/order" className="ml-3 btn-gold px-5 py-2.5 rounded-full text-sm">
            Order Now
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-md ${scrolled ? "text-navy" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-warm border-t border-border"
          >
            <nav className="container-pad py-6 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-navy font-medium hover:bg-muted rounded-md"
                  activeProps={{ className: "text-gold bg-muted" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/order"
                onClick={() => setOpen(false)}
                className="mt-3 btn-gold px-5 py-3 rounded-full text-center text-sm"
              >
                Order Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
