import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections";
import { mapled } from "@/lib/mapled";

/** The home page is the page with the slug "home". */
const HOME = "home";

export async function generateMetadata(): Promise<Metadata> {
  const page = await mapled.getRecordBySlug("pages", HOME, { fields: ["description"] });
  return page?.data.description ? { description: page.data.description } : {};
}

export default async function Home() {
  const page = await mapled.getRecordBySlug("pages", HOME);
  if (!page) notFound();
  return <Sections sections={page.data.sections ?? []} />;
}
