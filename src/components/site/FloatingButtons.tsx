import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/lib/site-data";

export function FloatingButtons({ settings }: { settings: SiteSettings | null }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = settings?.phone_primary;
  const wa = (settings?.whatsapp_number || settings?.phone_primary || "").replace(/[^\d+]/g, "");

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-card text-[var(--burgundy)]"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
      {phone ? (
        <a
          href={`tel:${phone}`}
          aria-label="Call now"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full burgundy-gradient text-white shadow-luxe"
        >
          <Phone className="h-5 w-5" />
        </a>
      ) : null}
      {wa ? (
        <a
          href={`https://wa.me/${wa.replace(/^\+/, "")}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="WhatsApp"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      ) : null}
    </div>
  );
}
