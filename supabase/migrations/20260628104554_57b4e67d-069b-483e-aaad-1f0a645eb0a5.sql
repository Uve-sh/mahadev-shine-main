CREATE POLICY "Public can upload inquiry images"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'mahadev-uploads'
  AND (storage.foldername(name))[1] = 'inquiries'
);

CREATE POLICY "Admins can read uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'mahadev-uploads'
  AND private.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can manage uploads"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'mahadev-uploads'
  AND private.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'mahadev-uploads'
  AND private.has_role(auth.uid(), 'admin')
);