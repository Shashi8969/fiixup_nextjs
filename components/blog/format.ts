// Category values are admin-entered free text ("how-to" alongside "Car Tips") —
// title-case for display only. Shared by the card and the filter pills so
// labels always match; the stored value in Supabase is never touched.
export function formatCategoryLabel(category: string) {
  return category.replace(/\b\w/g, (c) => c.toUpperCase());
}
