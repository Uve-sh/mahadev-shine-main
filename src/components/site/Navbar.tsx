import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import type { SiteSettings } from "@/lib/site-data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ settings }: { settings: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(90,22,27,0.18)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <Logo settings={settings} className="h-10 w-10 lg:h-12 lg:w-12" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-base lg:text-lg text-[var(--burgundy)]">
              {settings?.business_name ?? "Mahadev Aluminium"}
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-foreground)]/70">
              {settings?.tagline ?? "Section & Door"}
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-[var(--burgundy)] transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 origin-left bg-[var(--gold)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageSwitcher />
          {settings?.phone_primary ? (
            <a
              href={`tel:${settings.phone_primary}`}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 px-3 py-2 text-xs font-medium text-[var(--burgundy)] hover:bg-[var(--gold)]/10 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {settings.phone_primary}
            </a>
          ) : null}
          <a
            href="#quote"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white burgundy-gradient shadow-luxe hover:opacity-95 transition"
          >
            Get Quote
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden mx-4 mb-3 rounded-2xl glass-card p-4"
          >
            <nav className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[var(--gold)]/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white burgundy-gradient"
              >
                Get Quote
              </a>
              <Link
                to="/login"
                className="mt-1 text-center text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                Admin
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
