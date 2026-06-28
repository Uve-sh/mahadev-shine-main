import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/site/Logo";
import {
  fetchSiteSettings, fetchServices, fetchGalleryItems, fetchReviews, SITE_QUERY_KEYS,
  type Inquiry,
} from "@/lib/site-data";
import { LogOut, Mail, Phone, Image as ImageIcon, MessageSquare, Users, Eye, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Mahadev Aluminium" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: settings } = useQuery({ queryKey: SITE_QUERY_KEYS.settings, queryFn: fetchSiteSettings });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/login" });
  }, [loading, user, isAdmin, navigate]);

  const inquiriesQ = useQuery({
    queryKey: SITE_QUERY_KEYS.inquiries,
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Inquiry[];
    },
    enabled: isAdmin,
  });
  const servicesQ = useQuery({ queryKey: SITE_QUERY_KEYS.services, queryFn: fetchServices, enabled: isAdmin });
  const galleryQ = useQuery({ queryKey: SITE_QUERY_KEYS.galleryItems, queryFn: fetchGalleryItems, enabled: isAdmin });
  const reviewsQ = useQuery({ queryKey: SITE_QUERY_KEYS.reviews, queryFn: fetchReviews, enabled: isAdmin });

  const visitsQ = useQuery({
    queryKey: ["site_visits_count"],
    queryFn: async () => {
      const { count } = await supabase.from("site_visits").select("id", { count: "exact", head: true });
      return count ?? 0;
    },
    enabled: isAdmin,
  });

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Checking access…</div>;
  }

  const stats = [
    { label: "Visitors", value: visitsQ.data ?? "—", icon: Eye },
    { label: "Gallery", value: galleryQ.data?.length ?? "—", icon: ImageIcon },
    { label: "Services", value: servicesQ.data?.length ?? "—", icon: Users },
    { label: "Inquiries", value: inquiriesQ.data?.length ?? "—", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <Logo settings={settings ?? null} className="h-10 w-10" />
            <div>
              <div className="font-display text-base text-[var(--burgundy)]">{settings?.business_name ?? "Mahadev Aluminium"}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Admin Dashboard</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-[var(--burgundy)]">View site</Link>
            <Button variant="outline" size="sm" onClick={() => signOut().then(() => navigate({ to: "/login" }))}>
              <LogOut className="h-4 w-4 mr-1.5" />Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
                <Icon className="h-4 w-4 text-[var(--burgundy)]" />
              </div>
              <div className="mt-3 font-display text-3xl text-[var(--burgundy)]">{value}</div>
            </div>
          ))}
        </section>

        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="hero">Homepage</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="mt-6">
            <InquiriesPanel inquiries={inquiriesQ.data ?? []} onChange={() => qc.invalidateQueries({ queryKey: SITE_QUERY_KEYS.inquiries })} />
          </TabsContent>
          <TabsContent value="business" className="mt-6">
            <SettingsForm group="business" />
          </TabsContent>
          <TabsContent value="hero" className="mt-6">
            <SettingsForm group="hero" />
          </TabsContent>
          <TabsContent value="services" className="mt-6">
            <CrudList kind="services" />
          </TabsContent>
          <TabsContent value="gallery" className="mt-6">
            <CrudList kind="gallery" />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <CrudList kind="reviews" />
          </TabsContent>
          <TabsContent value="appearance" className="mt-6">
            <SettingsForm group="appearance" />
          </TabsContent>
          <TabsContent value="seo" className="mt-6">
            <SettingsForm group="seo" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function InquiriesPanel({ inquiries, onChange }: { inquiries: Inquiry[]; onChange: () => void }) {
  const [q, setQ] = useState("");
  const filtered = inquiries.filter((i) =>
    [i.name, i.phone_number, i.product_required, i.message, i.address].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase()),
  );
  const updateStatus = async (id: string, status: "pending" | "contacted" | "completed") => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); onChange(); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); onChange(); }
  };
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Input placeholder="Search inquiries…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Badge variant="outline">{filtered.length}</Badge>
      </div>
      <div className="divide-y divide-border">
        {filtered.length === 0 ? <div className="p-10 text-center text-sm text-muted-foreground">No inquiries yet.</div> : null}
        {filtered.map((i) => (
          <div key={i.id} className="p-4 grid gap-3 sm:grid-cols-[1fr_auto] items-start">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-[var(--burgundy)]">{i.name}</span>
                <Badge variant={i.status === "completed" ? "default" : i.status === "contacted" ? "secondary" : "outline"}>{i.status}</Badge>
                <span className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</span>
              </div>
              <div className="mt-1 text-sm flex flex-wrap gap-4 text-muted-foreground">
                <a className="inline-flex items-center gap-1 hover:text-[var(--burgundy)]" href={`tel:${i.phone_number}`}><Phone className="h-3.5 w-3.5" />{i.phone_number}</a>
                {i.product_required ? <span>Product: <b className="text-foreground">{i.product_required}</b></span> : null}
                {i.measurements ? <span>Size: {i.measurements}</span> : null}
              </div>
              {i.message ? <p className="mt-2 text-sm">{i.message}</p> : null}
              {i.address ? <p className="mt-1 text-xs text-muted-foreground">{i.address}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => updateStatus(i.id, "pending")}>Pending</Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus(i.id, "contacted")}>Contacted</Button>
              <Button size="sm" onClick={() => updateStatus(i.id, "completed")}>Completed</Button>
              <Button size="sm" variant="ghost" onClick={() => del(i.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Generic settings form -----------------------------------------------

const FIELD_GROUPS: Record<string, { label: string; key: string; type?: "text" | "textarea" | "color" | "number" }[]> = {
  business: [
    { label: "Business Name", key: "business_name" },
    { label: "Tagline", key: "tagline" },
    { label: "Owner Name", key: "owner_name" },
    { label: "Owner Photo URL", key: "owner_photo_url" },
    { label: "Phone (primary)", key: "phone_primary" },
    { label: "Phone (secondary)", key: "phone_secondary" },
    { label: "WhatsApp Number", key: "whatsapp_number" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address_line", type: "textarea" },
    { label: "City", key: "city" },
    { label: "District", key: "district" },
    { label: "State", key: "state" },
    { label: "Postal Code", key: "postal_code" },
    { label: "Google Maps URL", key: "google_maps_url" },
    { label: "Google Business Profile URL", key: "google_business_profile_url" },
    { label: "GST Number", key: "gst_number" },
    { label: "Years of Experience", key: "years_experience", type: "number" },
    { label: "Business Description", key: "business_description", type: "textarea" },
    { label: "About Content", key: "about_content", type: "textarea" },
  ],
  hero: [
    { label: "Hero Heading", key: "hero_heading" },
    { label: "Hero Subheading", key: "hero_subheading", type: "textarea" },
    { label: "Hero Image URL", key: "hero_image_url" },
    { label: "Hero QR Image URL", key: "hero_qr_image_url" },
    { label: "Primary CTA Label", key: "hero_cta_primary_label" },
    { label: "Primary CTA URL", key: "hero_cta_primary_url" },
    { label: "Secondary CTA Label", key: "hero_cta_secondary_label" },
    { label: "Secondary CTA URL", key: "hero_cta_secondary_url" },
    { label: "Tertiary CTA Label", key: "hero_cta_tertiary_label" },
    { label: "Tertiary CTA URL", key: "hero_cta_tertiary_url" },
  ],
  appearance: [
    { label: "Logo URL", key: "logo_url" },
    { label: "Logo Mark URL", key: "logo_mark_url" },
    { label: "Favicon URL", key: "favicon_url" },
    { label: "Primary Color (hex)", key: "primary_color", type: "color" },
    { label: "Secondary Color (hex)", key: "secondary_color", type: "color" },
    { label: "Background Color (hex)", key: "background_color", type: "color" },
    { label: "Text Color (hex)", key: "text_color", type: "color" },
    { label: "Heading Font", key: "heading_font" },
    { label: "Body Font", key: "body_font" },
  ],
  seo: [
    { label: "Open Graph Image URL", key: "og_image_url" },
  ],
};

function SettingsForm({ group }: { group: keyof typeof FIELD_GROUPS }) {
  const qc = useQueryClient();
  const { data: settings } = useQuery({ queryKey: SITE_QUERY_KEYS.settings, queryFn: fetchSiteSettings });
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!settings) return;
    const next: Record<string, string> = {};
    for (const f of FIELD_GROUPS[group]) {
      const v = (settings as unknown as Record<string, unknown>)[f.key];
      next[f.key] = v == null ? "" : String(v);
    }
    setForm(next);
  }, [settings, group]);

  const save = async () => {
    if (!settings) return;
    const payload: Record<string, unknown> = {};
    for (const f of FIELD_GROUPS[group]) {
      const v = form[f.key];
      payload[f.key] = f.type === "number" ? (v ? Number(v) : null) : (v === "" ? null : v);
    }
    const { error } = await supabase.from("site_settings").update(payload as never).eq("id", settings.id);
    if (error) toast.error(error.message); else { toast.success("Saved"); qc.invalidateQueries({ queryKey: SITE_QUERY_KEYS.settings }); }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 grid gap-4 sm:grid-cols-2">
      {FIELD_GROUPS[group].map((f) => (
        <div key={f.key} className={`grid gap-1.5 ${f.type === "textarea" ? "sm:col-span-2" : ""}`}>
          <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</Label>
          {f.type === "textarea" ? (
            <Textarea rows={3} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          ) : f.type === "color" ? (
            <div className="flex items-center gap-2">
              <Input type="color" value={form[f.key] || "#000000"} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="h-10 w-16 p-1" />
              <Input value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            </div>
          ) : (
            <Input type={f.type === "number" ? "number" : "text"} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      <div className="sm:col-span-2 flex justify-end">
        <Button onClick={save} className="rounded-full burgundy-gradient text-white">Save changes</Button>
      </div>
    </div>
  );
}

// ---- Generic CRUD list for services / gallery / reviews ------------------

type Kind = "services" | "gallery" | "reviews";

const KIND_CONFIG: Record<Kind, {
  table: "services" | "gallery_items" | "reviews";
  fields: { key: string; label: string; type?: "text" | "textarea" | "number" }[];
  required: string[];
}> = {
  services: {
    table: "services",
    fields: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "icon_name", label: "Icon name (lucide)" },
      { key: "short_description", label: "Short description", type: "textarea" },
      { key: "description", label: "Long description", type: "textarea" },
      { key: "image_url", label: "Image URL" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
    required: ["title", "slug", "icon_name", "short_description"],
  },
  gallery: {
    table: "gallery_items",
    fields: [
      { key: "title", label: "Title" },
      { key: "caption", label: "Caption", type: "textarea" },
      { key: "image_url", label: "Image URL" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
    required: ["title", "image_url"],
  },
  reviews: {
    table: "reviews",
    fields: [
      { key: "customer_name", label: "Customer Name" },
      { key: "location", label: "Location" },
      { key: "rating", label: "Rating (1–5)", type: "number" },
      { key: "review_text", label: "Review", type: "textarea" },
      { key: "customer_image_url", label: "Customer Image URL" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
    required: ["customer_name", "review_text"],
  },
};

function CrudList({ kind }: { kind: Kind }) {
  const cfg = KIND_CONFIG[kind];
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", kind],
    queryFn: async () => {
      const { data, error } = await supabase.from(cfg.table).select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Record<string, unknown>[];
    },
  });
  const [draft, setDraft] = useState<Record<string, string>>({});

  const add = useMutation({
    mutationFn: async () => {
      for (const r of cfg.required) {
        if (!draft[r]) throw new Error(`${r} is required`);
      }
      const payload: Record<string, unknown> = {};
      for (const f of cfg.fields) {
        const v = draft[f.key];
        if (v == null || v === "") continue;
        payload[f.key] = f.type === "number" ? Number(v) : v;
      }
      const { error } = await supabase.from(cfg.table).insert(payload as never);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Added"); setDraft({}); qc.invalidateQueries({ queryKey: ["admin", kind] }); qc.invalidateQueries({ queryKey: [cfg.table] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(cfg.table).delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin", kind] }); qc.invalidateQueries({ queryKey: [cfg.table] }); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {(data ?? []).length === 0 ? <div className="p-10 text-center text-sm text-muted-foreground">No items yet.</div> : null}
        {(data ?? []).map((row) => (
          <div key={row.id as string} className="p-4 flex items-start gap-3">
            {("image_url" in row) && row.image_url ? (
              <img src={row.image_url as string} alt="" className="h-14 w-14 rounded-lg object-cover" />
            ) : (
              <div className="h-14 w-14 rounded-lg bg-muted" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-display text-[var(--burgundy)] truncate">{(row.title || row.customer_name) as string}</div>
              <div className="text-xs text-muted-foreground truncate">{(row.short_description || row.caption || row.review_text) as string}</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => del(row.id as string)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 grid gap-3 h-fit">
        <h4 className="font-display text-[var(--burgundy)]">Add new</h4>
        {cfg.fields.map((f) => (
          <div key={f.key} className="grid gap-1.5">
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea rows={3} value={draft[f.key] ?? ""} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
            ) : (
              <Input type={f.type === "number" ? "number" : "text"} value={draft[f.key] ?? ""} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
        <Button onClick={() => add.mutate()} disabled={add.isPending} className="rounded-full burgundy-gradient text-white">
          {add.isPending ? "Saving…" : "Add"}
        </Button>
      </div>
    </div>
  );
}
