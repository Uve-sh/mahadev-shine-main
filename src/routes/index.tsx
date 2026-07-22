import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, MapPin, Mail, Clock, Star, ArrowRight,
  CheckCircle2, Sparkles, Hammer, Truck, Palette, Award, ShieldCheck,
  Send, Upload,
} from "lucide-react";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";

import heroImage from "@/assets/hero-aluminium.jpg";
import qrCode from "@/assets/qr-code.png";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchSiteSettings, fetchServices, fetchGalleryCategories, fetchGalleryItems,
  fetchReviews, SITE_QUERY_KEYS, type Service, type GalleryItem, type SiteSettings,
} from "@/lib/site-data";
import { Navbar } from "@/components/site/Navbar";
import { Logo } from "@/components/site/Logo";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahadev Aluminium Section & Door — Premium Aluminium Solutions in Botad" },
      { name: "description", content: "Luxury aluminium sections, sliding doors, windows, glass partitions, ACP work and custom fabrication by Mahadev Aluminium Section & Door, Botad, Gujarat." },
      { property: "og:title", content: "Mahadev Aluminium Section & Door" },
      { property: "og:description", content: "Premium aluminium sections, sliding doors and custom fabrication in Botad, Gujarat." },
    ],
  }),
  component: HomePage,
});

const whyIcons = [Sparkles, Hammer, ShieldCheck, Truck, Palette, Award];

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center mb-14">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-foreground)] bg-[var(--gold)]/10">
          <Sparkles className="h-3 w-3" />{eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--burgundy)] text-balance">{title}</h2>
      <div className="mx-auto my-5 h-px w-24 gold-rule" />
      {subtitle ? <p className="text-muted-foreground text-balance">{subtitle}</p> : null}
    </div>
  );
}

// Hardcoded fallback phone numbers (shown when Supabase settings are not configured)
const FALLBACK_PHONE_PRIMARY = "7405402423";
const FALLBACK_PHONE_SECONDARY = "8487828136";

function Hero({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.phone_primary || FALLBACK_PHONE_PRIMARY;
  const phoneClean = phone.replace(/[^\d]/g, "");
  const wa = settings?.whatsapp_number 
    ? (settings.whatsapp_number.replace(/[^\d]/g, "").length === 10 ? `91${settings.whatsapp_number.replace(/[^\d]/g, "")}` : settings.whatsapp_number.replace(/[^\d]/g, ""))
    : (phoneClean.length === 10 ? `91${phoneClean}` : phoneClean);
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 lg:pt-28">
      <div className="absolute inset-0 -z-10">
        <img src={heroImage} alt="" className="h-full w-full object-cover" width={1792} height={1152} />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--burgundy)]/85 via-[var(--burgundy)]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12 items-center gap-10 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Premium Aluminium Showroom · Botad
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-balance">
            {settings?.hero_heading ?? "Crafted Aluminium. Timeless Elegance."}
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 text-balance">
            {settings?.hero_subheading ?? settings?.business_description ?? "Bespoke sliding doors, windows, glass partitions and ACP work — installed with precision by Mahadev Aluminium Section & Door."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {phone ? (
              <a href={`tel:${phoneClean}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--burgundy)] shadow-luxe hover:bg-white/90">
                <Phone className="h-4 w-4" />Call Now
              </a>
            ) : null}
            {wa ? (
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-luxe">
                <MessageCircle className="h-4 w-4" />WhatsApp
              </a>
            ) : null}
            <a href="#quote" className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--gold)]/20 px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--gold)]/30">
              Get Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} transition={{ duration: 0.9, delay: 0.2 }} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-[0.62] rounded-3xl glass-card p-6 flex flex-col items-center justify-between text-center bg-gradient-to-b from-white/90 to-white/70">
              <div className="w-full flex items-start justify-between text-[var(--burgundy)]">
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">NFC · Tap</div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">मा·MA</div>
              </div>
              <Logo settings={settings} className="h-24 w-24" />
              <div>
                <div className="font-display text-2xl text-[var(--burgundy)]">{settings?.business_name ?? "Mahadev"}</div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold-foreground)] mt-1">Aluminium Section & Door</div>
              </div>
              <img src={qrCode} alt="Scan to Connect - Mahadev Aluminium" className="h-24 w-24 rounded-lg border border-[var(--gold)]/40 p-1 bg-white" loading="eager" />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--burgundy)]/70">Scan to Connect</div>
            </motion.div>
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[var(--gold)]/20 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About({ settings }: { settings: SiteSettings | null }) {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About Us" title="A legacy of precision in every frame" subtitle={settings?.about_content ?? "Mahadev Aluminium Section & Door is a trusted name in Botad, delivering premium aluminium solutions with uncompromising quality and craftsmanship."} />
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: Award, k: "Experience", v: `${settings?.years_experience ?? 10}+ Years`, d: "Of trusted craftsmanship across homes, shops and offices." },
          { icon: ShieldCheck, k: "Quality Promise", v: "Premium Grade", d: "Only verified aluminium sections, hardware and toughened glass." },
          { icon: Sparkles, k: "Why Mahadev", v: "Showroom Finish", d: "Tailored design, on-time delivery and immaculate installation." },
        ].map(({ icon: Icon, k, v, d }) => (
          <motion.div key={k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            className="rounded-3xl glass-card p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl gold-gradient text-[var(--burgundy)]"><Icon className="h-5 w-5" /></div>
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
            <div className="font-display text-2xl text-[var(--burgundy)] mt-1">{v}</div>
            <p className="text-sm text-muted-foreground mt-2">{d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function WhyChooseUs({ settings }: { settings: SiteSettings | null }) {
  const items = Array.isArray(settings?.why_choose_us) ? (settings!.why_choose_us as Array<{ title: string; description: string }>) : [
    { title: "High Quality Materials", description: "Premium aluminium sections and hardware sourced from trusted brands." },
    { title: "Expert Installation", description: "Skilled fitters with years of on-site precision experience." },
    { title: "Affordable Pricing", description: "Transparent quotations with the best value in Botad." },
    { title: "On-Time Delivery", description: "Project timelines we commit to and proudly meet." },
    { title: "Custom Design", description: "Made-to-measure solutions tailored to your space." },
    { title: "Professional Service", description: "Courteous, responsive support from quote to handover." },
  ];
  return (
    <Section className="marble-bg">
      <SectionHeading eyebrow="Why Choose Us" title="Built on trust, finished with luxury" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.05 }}
              className="group relative rounded-3xl border border-border bg-card p-6 hover:shadow-luxe transition">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl burgundy-gradient text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl text-[var(--burgundy)]">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <div className="absolute inset-x-6 bottom-3 h-px gold-rule opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <Section id="services">
      <SectionHeading eyebrow="Our Services" title="Premium aluminium, beautifully engineered" subtitle="From sliding doors to ACP cladding — a complete catalogue of bespoke aluminium solutions." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.a key={s.id} href="#quote" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.03 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 hover:shadow-luxe transition">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gold-gradient text-[var(--burgundy)] font-display text-xl">
                {s.title.slice(0, 1)}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-[var(--burgundy)] transition" />
            </div>
            <h3 className="mt-5 font-display text-xl text-[var(--burgundy)]">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.short_description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--burgundy)]">
              Learn More <ArrowRight className="h-3 w-3" />
            </span>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--gold)]/15 blur-3xl group-hover:bg-[var(--gold)]/25 transition" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

// Static gallery data using local product images
const STATIC_GALLERY_CATS = [
  { id: "door", name: "એલ્યુમિનિયમ દરવાજા", slug: "door" },
  { id: "sliding", name: "ડુમલ સ્લાઇડિંગ વિન્ડો", slug: "sliding" },
  { id: "glass", name: "ગ્લાસ એલિવેશન", slug: "glass" },
  { id: "partition", name: "પાર્ટિશનો", slug: "partition" },
  { id: "zgrill", name: "Z-ગ્રીલ વિન્ડો", slug: "zgrill" },
  { id: "sunmica", name: "ડોર કેટેલોગ", slug: "sunmica" },
];

const STATIC_GALLERY_ITEMS = [
  // Door
  { id: "d1", category_id: "door", image_url: "/gallery/door-2x1.jpg",  title: "એલ્યુમિનિયમનો દરવાજો - ૨×૧",  caption: "શ્રેષ્ઠ 2-સેક્શન એલ્યુમિનિયમ દરવાજો. ઘર અને ઓફિસ માટે ઉત્તમ." },
  { id: "d2", category_id: "door", image_url: "/gallery/door-3x1.jpg",  title: "એલ્યુમિનિયમનો દરવાજો - ૩×૧",  caption: "મજબૂત 3-ટ્રેક એલ્યુમિનિયમ દરવાજો, પહોળા ઓપનિંગ માટે." },
  // Dumal Sliding
  { id: "s1", category_id: "sliding", image_url: "/gallery/sliding-60mm.jpg",   title: "60mm ડુમલ સ્લાઇડિંગ વિન્ડો",         caption: "પ્રીમિયમ 60mm ડુમલ સેક્શન સ્લાઇડિંગ વિન્ડો, પાવડર-કોટેડ ફિનિશ સાથે." },
  { id: "s2", category_id: "sliding", image_url: "/gallery/sliding-60mm-2.jpg", title: "60mm સ્લાઇડિંગ વિન્ડો - વ્યૂ 2",        caption: "સ્મૂથ ગ્લાઇડિંગ 60mm એલ્યુમિનિયમ સ્લાઇડિંગ વિન્ડો, બાલ્કની અને લિવિંગ રૂમ માટે યોગ્ય." },
  { id: "s3", category_id: "sliding", image_url: "/gallery/sliding-60mm-3.jpg", title: "60mm સ્લાઇડિંગ વિન્ડો - વ્યૂ 3",        caption: "મજબૂત કાચ અને એલ્યુમિનિયમ ટ્રેક સાથે ઉચ્ચ-ગુણવત્તાવાળી 60mm સેક્શન વિન્ડો." },
  { id: "s4", category_id: "sliding", image_url: "/gallery/sliding-1.jpg",       title: "ડુમલ સ્લાઇડિંગ વિન્ડો ઇન્સ્ટોલેશન", caption: "અમારી નિષ્ણાત ટીમ દ્વારા ડુમલ સ્લાઇડિંગ વિન્ડોનું સ્થળ પર સ્થાપન." },
  { id: "s5", category_id: "sliding", image_url: "/gallery/sliding-2.jpg",       title: "ડુમલ વિન્ડો - સાઇટ વ્યૂ",         caption: "ઉત્તમ વેન્ટિલેશન અને કુદરતી પ્રકાશ પ્રદાન કરતી ડુમલ સ્લાઇડિંગ વિન્ડો સ્થાપિત." },
  { id: "s6", category_id: "sliding", image_url: "/gallery/sliding-3.jpg",       title: "ડુમલ સ્લાઇડિંગ વિન્ડો વિગતવાર",      caption: "ચોકસાઈથી બનાવેલા એલ્યુમિનિયમ ટ્રેક અને હેન્ડલની ક્લોઝ-અપ." },
  // Glass Elevation
  { id: "g1", category_id: "glass", image_url: "/gallery/glass-elevation-1.jpg", title: "ગ્લાસ એલિવેશન - પૂર્ણ દૃશ્ય",   caption: "આધુનિક દેખાવ માટે સ્ટ્રક્ચરલ એલ્યુમિનિયમ ફ્રેમિંગ સાથે પૂર્ણ-ઊંચાઈવાળા કાચની ઊંચાઈ." },
  { id: "g2", category_id: "glass", image_url: "/gallery/glass-elevation-2.jpg", title: "કાચની ઊંચાઈ - બાજુનો દૃશ્ય",   caption: "સીમલેસ ગ્લાસ એલિવેશન વર્ક એક આકર્ષક, સમકાલીન દેખાવ પૂરો પાડે છે." },
  { id: "g3", category_id: "glass", image_url: "/gallery/glass-elevation-3.jpg", title: "કાચની ઊંચાઈ - વિગત",      caption: "મહત્તમ ટકાઉપણું માટે એલ્યુમિનિયમ સેક્શન સાથે મજબૂત કાચની પેનલો." },
  // Partition
  { id: "p1", category_id: "partition", image_url: "/gallery/partition-1.jpg", title: "ઓફિસ ગ્લાસ પાર્ટિશન",         caption: "આધુનિક ઓફિસો અને વાણિજ્યક જગ્યાઓ માટે ભવ્ય એલ્યુમિનિયમ-ફ્રેમવાળા કાચના પાર્ટિશન." },
  { id: "p2", category_id: "partition", image_url: "/gallery/partition-2.jpg", title: "પાર્ટિશન - ફ્રોસ્ટેડ ગ્લાસ",      caption: "હિમાચ્છાદિત કાચના પાર્ટિશનો ખુલ્લા વાતાવરણને જાળવી રાખીને ગોપનીયતા પ્રદાન કરે છે." },
  { id: "p3", category_id: "partition", image_url: "/gallery/partition-3.jpg", title: "પૂર્ણ-ઊંચાઈ કાચનું પાર્ટિશન",    caption: "સ્વચ્છ, વ્યાવસાયિક પૂર્ણાહુતિ સાથે ફ્લોર-ટુ-સીલિંગ એલ્યુમિનિયમ ગ્લાસ પાર્ટિશન." },
  // Z-Grill
  { id: "z1", category_id: "zgrill", image_url: "/gallery/zgrill-1.jpg", title: "Z-ગ્રીલ વિન્ડો - સ્ટાઇલ ૧",  caption: "સુરક્ષા અને વેન્ટિલેશન પૂરી પાડતી ક્લાસિક Z-ગ્રીલ એલ્યુમિનિયમ વિન્ડો." },
  { id: "z2", category_id: "zgrill", image_url: "/gallery/zgrill-2.jpg", title: "Z-ગ્રીલ વિન્ડો - સ્ટાઇલ ૨",  caption: "કાટ-પ્રૂફ એલ્યુમિનિયમ વિભાગો સાથે પાવડર-કોટેડ Z-ગ્રીલ વિન્ડો." },
  { id: "z3", category_id: "zgrill", image_url: "/gallery/zgrill-3.jpg", title: "Z-ગ્રીલ વિન્ડો - સ્ટાઇલ ૩",  caption: "શ્રેષ્ઠ ફિનિશ સાથે રહેણાંક બારીઓ માટે આધુનિક Z-ગ્રીલ ડિઝાઇન." },
  { id: "z4", category_id: "zgrill", image_url: "/gallery/zgrill-4.jpg", title: "Z-ગ્રીલ વિન્ડો - સ્ટાઇલ ૪",  caption: "મહત્તમ સુરક્ષા અને સૌંદર્યલક્ષી આકર્ષણ માટે પહોળી Z-ગ્રીલ વિન્ડો ઇન્સ્ટોલેશન." },
  // Door Catalogue (Gurukrupa Sunmica)
  { id: "sm01", category_id: "sunmica", image_url: "/gallery/Collection of Products/001.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧",  caption: "ઉચ્ચ ગુણવત્તાવાળા સનમાઈકા સાથે સુંદર દરવાજાની ડિઝાઇન." },
  { id: "sm02", category_id: "sunmica", image_url: "/gallery/Collection of Products/002.png", title: "દરવાજાની ડિઝાઇન - પેજ ૨",  caption: "આધુનિક ઘરો માટે ભવ્ય સનમાઈકા પેટર્ન." },
  { id: "sm03", category_id: "sunmica", image_url: "/gallery/Collection of Products/003.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩",  caption: "વિવિધ પ્રકારની દરવાજાની ફિનિશ અને ટેક્સચર." },
  { id: "sm04", category_id: "sunmica", image_url: "/gallery/Collection of Products/004.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૪",  caption: "દરેક શૈલી માટે સમકાલીન સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm05", category_id: "sunmica", image_url: "/gallery/Collection of Products/005.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૫",  caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm06", category_id: "sunmica", image_url: "/gallery/Collection of Products/006.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૬",  caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm07", category_id: "sunmica", image_url: "/gallery/Collection of Products/007.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૭",  caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm08", category_id: "sunmica", image_url: "/gallery/Collection of Products/008.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૮",  caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm09", category_id: "sunmica", image_url: "/gallery/Collection of Products/009.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૯",  caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm10", category_id: "sunmica", image_url: "/gallery/Collection of Products/010.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૦", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm11", category_id: "sunmica", image_url: "/gallery/Collection of Products/011.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૧", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm12", category_id: "sunmica", image_url: "/gallery/Collection of Products/012.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૨", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm13", category_id: "sunmica", image_url: "/gallery/Collection of Products/013.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૩", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm14", category_id: "sunmica", image_url: "/gallery/Collection of Products/014.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૪", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm15", category_id: "sunmica", image_url: "/gallery/Collection of Products/015.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૫", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm16", category_id: "sunmica", image_url: "/gallery/Collection of Products/016.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૬", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm17", category_id: "sunmica", image_url: "/gallery/Collection of Products/017.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૭", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm18", category_id: "sunmica", image_url: "/gallery/Collection of Products/018.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૮", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm19", category_id: "sunmica", image_url: "/gallery/Collection of Products/019.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૧૯", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm20", category_id: "sunmica", image_url: "/gallery/Collection of Products/020.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૦", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm21", category_id: "sunmica", image_url: "/gallery/Collection of Products/021.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૧", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm22", category_id: "sunmica", image_url: "/gallery/Collection of Products/022.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૨", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm23", category_id: "sunmica", image_url: "/gallery/Collection of Products/023.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૩", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm24", category_id: "sunmica", image_url: "/gallery/Collection of Products/024.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૪", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm25", category_id: "sunmica", image_url: "/gallery/Collection of Products/025.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૫", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm26", category_id: "sunmica", image_url: "/gallery/Collection of Products/026.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૬", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm27", category_id: "sunmica", image_url: "/gallery/Collection of Products/027.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૭", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm28", category_id: "sunmica", image_url: "/gallery/Collection of Products/028.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૮", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm29", category_id: "sunmica", image_url: "/gallery/Collection of Products/029.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૨૯", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm30", category_id: "sunmica", image_url: "/gallery/Collection of Products/030.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩૦", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm31", category_id: "sunmica", image_url: "/gallery/Collection of Products/031.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩૧", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm32", category_id: "sunmica", image_url: "/gallery/Collection of Products/032.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩૨", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm33", category_id: "sunmica", image_url: "/gallery/Collection of Products/033.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩૩", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm34", category_id: "sunmica", image_url: "/gallery/Collection of Products/034.jpg", title: "દરવાજાની ડિઝાઇન - પેજ ૩૪", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm35", category_id: "sunmica", image_url: "/gallery/Collection of Products/035.png", title: "દરવાજાની ડિઝાઇન - પેજ ૩૫", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm36", category_id: "sunmica", image_url: "/gallery/Collection of Products/036.png", title: "દરવાજાની ડિઝાઇન - પેજ ૩૬", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm37", category_id: "sunmica", image_url: "/gallery/Collection of Products/037.png", title: "દરવાજાની ડિઝાઇન - પેજ ૩૭", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm38", category_id: "sunmica", image_url: "/gallery/Collection of Products/038.png", title: "દરવાજાની ડિઝાઇન - પેજ ૩૮", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm39", category_id: "sunmica", image_url: "/gallery/Collection of Products/039.png", title: "દરવાજાની ડિઝાઇન - પેજ ૩૯", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm40", category_id: "sunmica", image_url: "/gallery/Collection of Products/040.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૦", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm41", category_id: "sunmica", image_url: "/gallery/Collection of Products/041.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૧", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm42", category_id: "sunmica", image_url: "/gallery/Collection of Products/042.jpeg", title: "દરવાજાની ડિઝાઇન - પેજ ૪૨", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm43", category_id: "sunmica", image_url: "/gallery/Collection of Products/043.jpeg", title: "દરવાજાની ડિઝાઇન - પેજ ૪૩", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm44", category_id: "sunmica", image_url: "/gallery/Collection of Products/044.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૪", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm45", category_id: "sunmica", image_url: "/gallery/Collection of Products/045.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૫", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm46", category_id: "sunmica", image_url: "/gallery/Collection of Products/046.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૬", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm47", category_id: "sunmica", image_url: "/gallery/Collection of Products/047.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૭", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
  { id: "sm48", category_id: "sunmica", image_url: "/gallery/Collection of Products/048.png", title: "દરવાજાની ડિઝાઇન - પેજ ૪૮", caption: "આધુનિક સનમાઈકા દરવાજાની ડિઝાઇન." },
];

type StaticGalleryItem = typeof STATIC_GALLERY_ITEMS[number];

function Gallery({ items, categories }: { items: GalleryItem[]; categories: { id: string; name: string; slug: string }[] }) {
  // Use static local gallery; fall back to Supabase data if it contains items
  const useStatic = items.length === 0;
  const galleryItems = useStatic ? STATIC_GALLERY_ITEMS : items;
  const galleryCats = useStatic ? STATIC_GALLERY_CATS : categories;

  const [active, setActive] = useState<string>("all");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  const filtered = useMemo(() => {
    if (active === "all") return galleryItems;
    if (useStatic) return (galleryItems as StaticGalleryItem[]).filter((i) => i.category_id === active);
    return (galleryItems as GalleryItem[]).filter((i) => i.category_id && categories.find((c) => c.id === i.category_id)?.slug === active);
  }, [galleryItems, galleryCats, active, useStatic]);

  const openLightbox = (src: string, title: string) => { setLightboxSrc(src); setLightboxTitle(title); };

  return (
    <Section id="gallery" className="marble-bg">
      <SectionHeading eyebrow="Gallery" title="Recent installations & finishes" subtitle="Explore our premium aluminium work — doors, windows, glass elevations and partitions." />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <FilterChip label="All" active={active === "all"} onClick={() => setActive("all")} />
        {galleryCats.map((c) => (
          <FilterChip key={c.id} label={c.name} active={active === c.slug} onClick={() => setActive(c.slug)} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(filtered as Array<StaticGalleryItem | GalleryItem>).map((it) => {
          const src = useStatic ? (it as StaticGalleryItem).image_url : (it as GalleryItem).image_url;
          const title = it.title;
          const caption = useStatic ? (it as StaticGalleryItem).caption : (it as GalleryItem).caption;
          return (
            <motion.button
              key={it.id}
              onClick={() => openLightbox(src, title)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-luxe text-left"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={src} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="font-display text-base text-[var(--burgundy)]">{title}</div>
                {caption ? <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{caption}</p> : null}
              </div>
            </motion.button>
          );
        })}
      </div>
      {lightboxSrc ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxSrc} alt={lightboxTitle} className="max-h-[82vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl" />
            <div className="mt-3 text-center text-white/80 text-sm font-display">{lightboxTitle}</div>
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute -top-4 -right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition"
              aria-label="Close"
            >✕</button>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${active ? "burgundy-gradient text-white shadow-luxe" : "border border-border bg-card hover:border-[var(--gold)]"}`}>
      {label}
    </button>
  );
}

function Process({ settings }: { settings: SiteSettings | null }) {
  const raw = settings?.process_steps;
  const steps = (Array.isArray(raw) && (raw as Array<{ step: string; description: string }>).length > 0)
    ? (raw as Array<{ step: string; description: string }>)
    : [
        { step: "Contact Us", description: "Reach out via call, WhatsApp or the quote form." },
        { step: "Site Visit", description: "Our team visits your site to understand the requirement." },
        { step: "Measurement", description: "Precise measurements taken on-site." },
        { step: "Quotation", description: "Transparent estimate tailored to your project." },
        { step: "Fabrication", description: "Crafted in our workshop with premium materials." },
        { step: "Installation", description: "Clean, careful installation by expert fitters." },
        { step: "Final Inspection", description: "Quality check and handover with your approval." },
      ];
  return (
    <Section id="process">
      <SectionHeading eyebrow="Our Process" title="From first call to final inspection" />
      <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {steps.map((s, i) => (
          <motion.li key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.04 }}
            className="relative rounded-2xl glass-card p-5 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full burgundy-gradient text-white font-display">{i + 1}</div>
            <h4 className="mt-3 font-display text-base text-[var(--burgundy)]">{s.step}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

function Reviews({ reviews }: { reviews: { id: string; customer_name: string; rating: number; review_text: string; location: string | null }[] }) {
  if (reviews.length === 0) return null;
  return (
    <Section className="marble-bg">
      <SectionHeading eyebrow="Customer Reviews" title="Loved by homeowners & businesses" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-3xl border border-border bg-card p-6 shadow-luxe">
            <div className="flex gap-0.5 text-[var(--gold)]">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <p className="mt-3 text-sm text-foreground/85 leading-relaxed">"{r.review_text}"</p>
            <div className="mt-4 pt-4 border-t border-border/60">
              <div className="font-display text-[var(--burgundy)]">{r.customer_name}</div>
              {r.location ? <div className="text-xs text-muted-foreground">{r.location}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.phone_primary || FALLBACK_PHONE_PRIMARY;
  const phone2 = settings?.phone_secondary || FALLBACK_PHONE_SECONDARY;
  const phoneClean = phone.replace(/[^\d]/g, "");
  const wa = settings?.whatsapp_number 
    ? (settings.whatsapp_number.replace(/[^\d]/g, "").length === 10 ? `91${settings.whatsapp_number.replace(/[^\d]/g, "")}` : settings.whatsapp_number.replace(/[^\d]/g, ""))
    : (phoneClean.length === 10 ? `91${phoneClean}` : phoneClean);
  const hours = Array.isArray(settings?.working_hours) ? (settings!.working_hours as Array<{ day: string; hours: string }>) : [];
  const mapsUrl = settings?.google_maps_url;
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Visit our showroom or reach out" subtitle={settings?.address_line ?? undefined} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          <ContactRow icon={Phone} label="Phone" value={[phone, phone2].filter(Boolean).join(" · ") || "—"} href={phone ? `tel:${phoneClean}` : undefined} className="notranslate" />
          <ContactRow icon={MessageCircle} label="WhatsApp" value={settings?.whatsapp_number ?? phone ?? "—"} href={wa ? `https://wa.me/${wa}` : undefined} className="notranslate" />
          <ContactRow icon={Mail} label="Email" value={settings?.email ?? "—"} href={settings?.email ? `mailto:${settings.email}` : undefined} />
          <ContactRow icon={MapPin} label="Address" value={settings?.address_line ?? "—"} href={mapsUrl ?? undefined} />
          {hours.length > 0 ? (
            <div className="rounded-2xl glass-card p-5">
              <div className="flex items-center gap-2 text-[var(--burgundy)]"><Clock className="h-4 w-4" /><span className="font-display">Working Hours</span></div>
              <ul className="mt-3 grid gap-1.5 text-sm">
                {hours.map((h, i) => (
                  <li key={i} className="flex justify-between border-b border-border/40 py-1 last:border-none">
                    <span className="text-muted-foreground">{h.day}</span><span className="font-medium">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-3xl border border-border shadow-luxe min-h-[360px]">
          {mapsUrl ? (
            <iframe title="Google Maps" src={mapsUrl.includes("output=embed") ? mapsUrl : `https://www.google.com/maps?q=${encodeURIComponent(settings?.address_line ?? "Botad Gujarat")}&output=embed`}
              className="h-full w-full min-h-[360px]" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground p-8">Map link not set</div>
          )}
        </div>
      </div>
    </Section>
  );
}

function ContactRow({ icon: Icon, label, value, href, className }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; className?: string }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl glass-card p-5">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl burgundy-gradient text-white"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
        <div className={cn("mt-1 font-medium text-foreground", className)}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" className={className}>{inner}</a> : inner;
}

function QuoteForm({ settings }: { settings: SiteSettings | null }) {
  const [form, setForm] = useState({
    name: "", phone_number: "", product_required: "", measurements: "", address: "", message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const waRaw = settings?.whatsapp_number || settings?.phone_primary || "";
  const waClean = waRaw.replace(/[^\d]/g, "");
  const wa = waClean.length === 10 ? `91${waClean}` : waClean;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!form.name.trim() || !form.phone_number.trim()) {
        throw new Error("Please share your name and phone number.");
      }
      let image_url: string | null = null;
      if (file) {
        const path = `inquiries/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("mahadev-uploads").upload(path, file, { upsert: false });
        if (upErr) throw upErr;
        image_url = path;
      }
      const { error } = await supabase.from("inquiries").insert({
        name: form.name.trim(),
        phone_number: form.phone_number.trim(),
        product_required: form.product_required || null,
        measurements: form.measurements || null,
        address: form.address || null,
        message: form.message || null,
        image_url,
        source: "quote_form",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Thank you! We'll get in touch shortly.");
      setForm({ name: "", phone_number: "", product_required: "", measurements: "", address: "", message: "" });
      setFile(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const waText = encodeURIComponent(
    `Hello Mahadev Aluminium, I'd like a quote.\nName: ${form.name}\nPhone: ${form.phone_number}\nProduct: ${form.product_required}\nMeasurements: ${form.measurements}\nAddress: ${form.address}\nMessage: ${form.message}`,
  );

  return (
    <Section id="quote">
      <SectionHeading eyebrow="Get Quote" title="Tell us about your project" subtitle="Share a few details and we'll prepare a tailored quotation." />
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="mx-auto max-w-3xl rounded-3xl glass-card p-6 sm:p-8 grid gap-4 sm:grid-cols-2">
        <Field label="Your Name *"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
        <Field label="Phone Number *"><Input inputMode="tel" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} required /></Field>
        <Field label="Product Required"><Input value={form.product_required} onChange={(e) => setForm({ ...form, product_required: e.target.value })} placeholder="e.g. Sliding Door" /></Field>
        <Field label="Measurements"><Input value={form.measurements} onChange={(e) => setForm({ ...form, measurements: e.target.value })} placeholder="e.g. 7ft x 4ft" /></Field>
        <Field className="sm:col-span-2" label="Address"><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
        <Field className="sm:col-span-2" label="Message"><Textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
        <Field className="sm:col-span-2" label="Reference Image (optional)">
          <label className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-background/60 px-4 py-3 cursor-pointer hover:border-[var(--gold)]">
            <Upload className="h-4 w-4 text-[var(--burgundy)]" />
            <span className="text-sm text-muted-foreground">{file ? file.name : "Click to upload an image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
        </Field>
        <div className="sm:col-span-2 flex flex-wrap gap-3 justify-end">
          {wa ? (
            <a href={`https://wa.me/${wa}?text=${waText}`} target="_blank" rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" />Send on WhatsApp
            </a>
          ) : null}
          <Button type="submit" disabled={mutation.isPending} className="rounded-full burgundy-gradient text-white px-6">
            {mutation.isPending ? "Sending…" : (<><Send className="h-4 w-4 mr-2" />Submit Request</>)}
          </Button>
        </div>
      </form>
    </Section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Footer({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="relative mt-10 border-t border-border bg-[var(--burgundy)] text-white/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo settings={settings} className="h-12 w-12" />
            <div>
              <div className="font-display text-lg">{settings?.business_name ?? "Mahadev Aluminium"}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{settings?.tagline ?? "Section & Door"}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">{settings?.business_description ?? ""}</p>
        </div>
        <div>
          <h5 className="font-display text-[var(--gold)] mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            {["Home","About","Services","Gallery","Contact","Get Quote"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase().replace(" ","-").replace("get-quote","quote")}`} className="hover:text-[var(--gold)]">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-display text-[var(--gold)] mb-3">Contact</h5>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-[var(--gold)] notranslate" href={`tel:${(settings?.phone_primary || FALLBACK_PHONE_PRIMARY).replace(/[^\d]/g, "")}`}>{settings?.phone_primary || FALLBACK_PHONE_PRIMARY}</a></li>
            <li><a className="hover:text-[var(--gold)] notranslate" href={`tel:${(settings?.phone_secondary || FALLBACK_PHONE_SECONDARY).replace(/[^\d]/g, "")}`}>{settings?.phone_secondary || FALLBACK_PHONE_SECONDARY}</a></li>
            {settings?.email && <li><a className="hover:text-[var(--gold)]" href={`mailto:${settings.email}`}>{settings.email}</a></li>}
            {settings?.address_line && <li className="text-white/70">{settings.address_line}</li>}
          </ul>
        </div>
        <div>
          <h5 className="font-display text-[var(--gold)] mb-3">Visit</h5>
          {settings?.google_maps_url ? (
            <a href={settings.google_maps_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/10">
              <MapPin className="h-4 w-4" />Get Directions
            </a>
          ) : null}
          <div className="mt-6 text-[11px] text-white/50">
            <a href="/login" className="hover:text-[var(--gold)]">Admin Login</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} {settings?.business_name ?? "Mahadev Aluminium Section & Door"}. All rights reserved.</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--gold)]" />Crafted with precision in Botad, Gujarat</div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const settingsQ = useQuery({ queryKey: SITE_QUERY_KEYS.settings, queryFn: fetchSiteSettings });
  const servicesQ = useQuery({ queryKey: SITE_QUERY_KEYS.services, queryFn: fetchServices });
  const catsQ = useQuery({ queryKey: SITE_QUERY_KEYS.galleryCategories, queryFn: fetchGalleryCategories });
  const itemsQ = useQuery({ queryKey: SITE_QUERY_KEYS.galleryItems, queryFn: fetchGalleryItems });
  const reviewsQ = useQuery({ queryKey: SITE_QUERY_KEYS.reviews, queryFn: fetchReviews });

  useEffect(() => {
    // Anonymous visit ping
    const key = sessionStorage.getItem("ma_sk") ?? crypto.randomUUID();
    sessionStorage.setItem("ma_sk", key);
    supabase.from("site_visits").insert({
      page_path: window.location.pathname,
      session_key: key,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent.slice(0, 200),
    }).then(() => {});
  }, []);

  const settings = useMemo(() => {
    const raw = settingsQ.data || {};
    return {
      ...raw,
      phone_primary: "74054 02423",
      phone_secondary: "84878 28136",
      whatsapp_number: "74054 02423",
    } as SiteSettings;
  }, [settingsQ.data]);
  const activeServices = (servicesQ.data ?? []).filter((s) => s.is_active);
  const activeCats = (catsQ.data ?? []).filter((c) => c.is_active);
  const activeItems = (itemsQ.data ?? []).filter((i) => i.is_active);
  const visibleReviews = (reviewsQ.data ?? []).filter((r) => r.is_visible);

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-center" />
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <WhyChooseUs settings={settings} />
        <ServicesGrid services={activeServices} />
        <Gallery items={activeItems} categories={activeCats} />
        <Process settings={settings} />
        <Reviews reviews={visibleReviews} />
        <Contact settings={settings} />
        <QuoteForm settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingButtons settings={settings} />
    </div>
  );
}
