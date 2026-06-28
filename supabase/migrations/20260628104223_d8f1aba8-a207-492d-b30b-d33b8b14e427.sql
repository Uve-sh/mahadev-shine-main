CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO postgres, service_role, authenticated, anon;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, private
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO service_role;

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active gallery categories" ON public.gallery_categories;
CREATE POLICY "Public can view active gallery categories"
ON public.gallery_categories
FOR SELECT
TO anon, authenticated
USING (is_active = true OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage gallery categories" ON public.gallery_categories;
CREATE POLICY "Admins can manage gallery categories"
ON public.gallery_categories
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view active gallery items" ON public.gallery_items;
CREATE POLICY "Public can view active gallery items"
ON public.gallery_items
FOR SELECT
TO anon, authenticated
USING (is_active = true OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage gallery items" ON public.gallery_items;
CREATE POLICY "Admins can manage gallery items"
ON public.gallery_items
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view visible reviews" ON public.reviews;
CREATE POLICY "Public can view visible reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (is_visible = true OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (is_published = true OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
CREATE POLICY "Admins can view inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view site visits" ON public.site_visits;
CREATE POLICY "Admins can view site visits"
ON public.site_visits
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);