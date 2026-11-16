-- Reviewed against Fiixup's live schema on 22 October 2026.
-- NOT APPLIED. Deploy the patched public website FIRST, then run this transaction.
-- The old website reads preview_drafts with its anon client; revoking access
-- before deployment would break that old preview implementation.
-- The patched public site uses a server-only service-role token lookup.
-- The revised CMS uses authenticated RLS for editing/publishing drafts.
-- Preserve authenticated privileges and its existing admin-only ALL policy.
-- No preview rows are modified/deleted.

BEGIN;

-- Fail safely if the expected existing admin policy is absent. Do not replace
-- it with a permissive authenticated policy; review the actual policy first.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'preview_drafts'
      AND cmd = 'ALL' AND 'authenticated' = ANY(roles)
      AND qual LIKE '%auth.uid()%'
      AND qual NOT LIKE '%user_metadata%'
  ) THEN
    RAISE EXCEPTION 'Review the existing admin-only preview_drafts RLS policy before applying this patch';
  END IF;
END $$;

DROP POLICY IF EXISTS preview_drafts_anon_read_unexpired ON public.preview_drafts;
REVOKE ALL PRIVILEGES ON TABLE public.preview_drafts FROM anon;

-- Preserve the existing view definitions and public route shapes while making
-- underlying table RLS apply to the caller, including draft-post restrictions.
ALTER VIEW public.cms_public_route_registry SET (security_invoker = true);
ALTER VIEW public.cms_public_link_options SET (security_invoker = true);
ALTER VIEW public.cms_smart_navigation_suggestions SET (security_invoker = true);
ALTER VIEW public.cms_smart_nearby_area_suggestions SET (security_invoker = true);
ALTER VIEW public.cms_smart_related_service_suggestions SET (security_invoker = true);

COMMIT;

-- Post-deployment verification (metadata only; no customer/draft payloads):
-- SELECT has_table_privilege('anon', 'public.preview_drafts', 'SELECT'); -- false
-- Authenticated table access remains; verify its RLS restricts access to the
-- existing authorised CMS account, including SELECT/INSERT/UPDATE/DELETE.
-- SELECT relname, reloptions FROM pg_class WHERE relname IN
-- ('cms_public_route_registry','cms_public_link_options','cms_smart_navigation_suggestions',
--  'cms_smart_nearby_area_suggestions','cms_smart_related_service_suggestions');
-- Verify public navigation, a known unexpired preview, and expired/invalid-token
-- 404s through the application. Re-run Supabase security advisors.
-- The three RLS-with-no-policy INFO findings are default-deny tables; do not
-- add permissive policies to silence them.
