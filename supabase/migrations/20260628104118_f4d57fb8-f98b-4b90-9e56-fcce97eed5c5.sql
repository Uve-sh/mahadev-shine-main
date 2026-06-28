REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(coalesce(name, ''))) BETWEEN 2 AND 100
  AND length(trim(coalesce(phone_number, ''))) BETWEEN 7 AND 20
  AND length(coalesce(product_required, '')) <= 120
  AND length(coalesce(measurements, '')) <= 500
  AND length(coalesce(address, '')) <= 500
  AND length(coalesce(message, '')) <= 2000
  AND length(coalesce(image_url, '')) <= 500
  AND source IN ('website', 'quote-form', 'contact-form', 'whatsapp')
);

DROP POLICY IF EXISTS "Anyone can create site visits" ON public.site_visits;
CREATE POLICY "Anyone can create site visits"
ON public.site_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(coalesce(session_key, ''))) BETWEEN 8 AND 120
  AND length(trim(coalesce(page_path, ''))) BETWEEN 1 AND 255
  AND coalesce(referrer, '') !~ '[\u0000-\u001F]'
  AND coalesce(user_agent, '') !~ '[\u0000-\u001F]'
  AND length(coalesce(referrer, '')) <= 1000
  AND length(coalesce(user_agent, '')) <= 1000
);