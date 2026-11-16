// Keep localhost reviews from creating real leads, emails or 404 records.
export function isLocalReviewHost(value: string | null | undefined): boolean {
  if (process.env.FIIXUP_LOCAL_REVIEW === 'true') return true;
  if (process.env.NODE_ENV === 'development') return true;
  if (!value) return false;
  try {
    const hostname = new URL(`http://${value}`).hostname.toLowerCase();
    return hostname === 'localhost' || hostname === '[::1]' || /^127\./.test(hostname) || hostname.endsWith('.localhost');
  } catch { return false; }
}
