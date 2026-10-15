import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Sections } from "@/components/sections";
import { mapled } from "@/lib/mapled";

type Props = { params: Promise<{ slug: string }> };

// Pages that exist at build time are made then; a page published later gets
// its address on the first visit, without a deploy.
export async function generateStaticParams() {
  const { records } = await mapled.getRecords("pages", { fields: ["slug"] });
  return records.filter((page) => page.data.slug !== "home").map((page) => ({ slug: page.data.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await mapled.getRecordBySlug("pages", (await params).slug, { fields: ["title", "description"] });
  return page ? { title: page.data.title, description: page.data.description ?? undefined } : {};
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") permanentRedirect("/");
  const page = await mapled.getRecordBySlug("pages", slug);
  if (!page) notFound();
  return <Sections sections={page.data.sections ?? []} />;
}
