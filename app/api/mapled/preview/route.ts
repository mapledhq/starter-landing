import { createPreviewHandler } from "@mapled/next/server";
import { apiUrl } from "@/lib/mapled";

// The Preview button in Mapled opens this path: drafts, uncached, until you exit.
export const GET = createPreviewHandler({ apiUrl });
