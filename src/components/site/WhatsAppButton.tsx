import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/2348000000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </motion.a>
  );
}
