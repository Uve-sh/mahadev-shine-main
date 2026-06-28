CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.inquiry_status AS ENUM ('pending', 'contacted', 'completed', 'spam');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  owner_name text,
  owner_photo_url text,
  logo_url text,
  logo_mark_url text,
  business_description text,
  tagline text,
  phone_primary text,
  phone_secondary text,
  whatsapp_number text,
  email text,
  address_line text,
  city text,
  district text,
  state text,
  postal_code text,
  google_maps_url text,
  working_hours jsonb NOT NULL DEFAULT '[]'::jsonb,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  google_business_profile_url text,
  gst_number text,
  years_experience integer,
  cities_served text[] NOT NULL DEFAULT '{}'::text[],
  hero_heading text,
  hero_subheading text,
  hero_image_url text,
  hero_card_image_url text,
  hero_qr_image_url text,
  hero_cta_primary_label text,
  hero_cta_primary_url text,
  hero_cta_secondary_label text,
  hero_cta_secondary_url text,
  hero_cta_tertiary_label text,
  hero_cta_tertiary_url text,
  about_content text,
  why_choose_us jsonb NOT NULL DEFAULT '[]'::jsonb,
  process_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  homepage_banner_images jsonb NOT NULL DEFAULT '[]'::jsonb,
  primary_color text NOT NULL DEFAULT '#5A161B',
  secondary_color text NOT NULL DEFAULT '#C9A34E',
  background_color text NOT NULL DEFAULT '#F8F6F2',
  text_color text NOT NULL DEFAULT '#2B2B2B',
  heading_font text NOT NULL DEFAULT 'Cinzel',
  body_font text NOT NULL DEFAULT 'Manrope',
  footer_content jsonb NOT NULL DEFAULT '{}'::jsonb,
  default_language text NOT NULL DEFAULT 'en',
  enabled_languages jsonb NOT NULL DEFAULT '["en","gu"]'::jsonb,
  translation_enabled boolean NOT NULL DEFAULT true,
  language_switcher_position text NOT NULL DEFAULT 'nav-right',
  seo_defaults jsonb NOT NULL DEFAULT '{}'::jsonb,
  favicon_url text,
  og_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT ON public.site_settings TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  description text,
  icon_name text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.services TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.gallery_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_categories TO anon;
GRANT SELECT ON public.gallery_categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_categories TO authenticated;
GRANT ALL ON public.gallery_categories TO service_role;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active gallery categories"
ON public.gallery_categories
FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage gallery categories"
ON public.gallery_categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_gallery_categories_updated_at
BEFORE UPDATE ON public.gallery_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  caption text,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT ON public.gallery_items TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active gallery items"
ON public.gallery_items
FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage gallery items"
ON public.gallery_items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_gallery_items_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5,
  review_text text NOT NULL,
  customer_image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5)
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT ON public.reviews TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (is_visible = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text,
  location text,
  description text,
  image_url text,
  completed_on date,
  sort_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.projects TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone_number text NOT NULL,
  product_required text,
  measurements text,
  address text,
  image_url text,
  message text,
  status public.inquiry_status NOT NULL DEFAULT 'pending',
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon;
GRANT INSERT ON public.inquiries TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
CREATE POLICY "Admins can view inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key text NOT NULL,
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.site_visits TO anon;
GRANT INSERT ON public.site_visits TO authenticated;
GRANT SELECT ON public.site_visits TO authenticated;
GRANT ALL ON public.site_visits TO service_role;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create site visits"
ON public.site_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
CREATE POLICY "Admins can view site visits"
ON public.site_visits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX services_sort_order_idx ON public.services(sort_order);
CREATE INDEX gallery_categories_sort_order_idx ON public.gallery_categories(sort_order);
CREATE INDEX gallery_items_category_id_idx ON public.gallery_items(category_id);
CREATE INDEX gallery_items_sort_order_idx ON public.gallery_items(sort_order);
CREATE INDEX reviews_sort_order_idx ON public.reviews(sort_order);
CREATE INDEX projects_sort_order_idx ON public.projects(sort_order);
CREATE INDEX inquiries_status_idx ON public.inquiries(status);
CREATE INDEX inquiries_created_at_idx ON public.inquiries(created_at DESC);
CREATE INDEX site_visits_created_at_idx ON public.site_visits(created_at DESC);
CREATE INDEX site_visits_session_key_idx ON public.site_visits(session_key);