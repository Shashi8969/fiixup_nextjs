import { notFound } from "next/navigation";
import { getPreviewDraft } from "@/lib/preview-drafts";
import { PreviewBlogPostPage } from "@/components/preview/PreviewBlogPostPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = Promise<{ token: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { token } = await params;
  const draft = await getPreviewDraft(token);
  if (!draft) return { title: "Preview expired" };
  return { title: "Draft Preview — " + (draft.payload?.title ?? draft.public_path ?? "Fiixup"), robots: { index: false, follow: false } };
}

export default async function AdminPreviewPage({ params }: { params: Params }) {
  const { token } = await params;
  const draft = await getPreviewDraft(token);
  if (!draft) return notFound();
  if (draft.content_type === "post") return <PreviewBlogPostPage post={draft.payload} />;
  return <main className="min-h-screen bg-gray-50 p-8"><div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow"><p className="text-sm font-bold text-amber-600">DRAFT PREVIEW</p><h1 className="mt-2 text-2xl font-bold text-gray-900">Preview route is ready</h1><p className="mt-3 text-gray-600">This draft type is not wired to a frontend renderer yet: {draft.content_type}</p><pre className="mt-6 max-h-[500px] overflow-auto rounded-xl bg-gray-900 p-4 text-xs text-green-300">{JSON.stringify(draft.payload, null, 2)}</pre></div></main>;
}
