import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type GalleryCategory = Database["public"]["Tables"]["gallery_categories"]["Row"];
export type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

export type WhyChooseUsItem = { title: string; description: string };
export type ProcessStep = { step: string; description: string };
export type WorkingHour = { day: string; hours: string };

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchGalleryCategories(): Promise<GalleryCategory[]> {
  const { data, error } = await supabase
    .from("gallery_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export const SITE_QUERY_KEYS = {
  settings: ["site_settings"] as const,
  services: ["services"] as const,
  galleryCategories: ["gallery_categories"] as const,
  galleryItems: ["gallery_items"] as const,
  reviews: ["reviews"] as const,
  projects: ["projects"] as const,
  inquiries: ["inquiries"] as const,
};
