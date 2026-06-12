import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="container-pad py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gold to-[oklch(0.72_0.14_70)] grid place-items-center font-display font-black text-navy text-lg">
              S
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-base">ShoFirm</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/70">Foods Limited</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/70 leading-relaxed">
            Manufacturing and distributing premium Nigerian swallow flour products to homes, retailers, wholesalers, and distributors across the nation.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-white/15 grid place-items-center hover:bg-gold hover:text-navy hover:border-gold transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold mb-5">Products</h4>
          <ul className="space-y-3 text-sm text-white/80">
            {["Semo", "Garri", "Yam Flour", "Plantain Flour", "Cassava Flour", "Baby Foods"].map((p) => (
              <li key={p}><Link to="/products" className="hover:text-gold transition-colors">{p}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold mb-5">Company</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/order" className="hover:text-gold transition-colors">Place an Order</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.18em] text-gold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin size={16} className="text-gold shrink-0 mt-0.5" /> Lagos, Nigeria</li>
            <li className="flex gap-3"><Phone size={16} className="text-gold shrink-0 mt-0.5" /> +234 800 000 0000</li>
            <li className="flex gap-3"><Mail size={16} className="text-gold shrink-0 mt-0.5" /> hello@shofirmfoods.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pad py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} ShoFirm Foods Limited. All rights reserved.</p>
          <p>Premium Nigerian food manufacturer.</p>
        </div>
      </div>
    </footer>
  );
}
