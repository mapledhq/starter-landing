import { assetUrl, createClient } from "@mapled/next";
import type { MapledSchema } from "@/mapled-types";

const key = process.env.MAPLED_KEY;
if (!key) {
  throw new Error(
    "MAPLED_KEY is not set. Copy .env.example to .env.local and paste the delivery key from Mapled: project settings → Integrations → Your site.",
  );
}

/** The delivery key: published content only, safe on the server and in the browser. */
export const deliveryKey: string = key;

/** Unset in your site: the client reads https://api.mapled.io. */
export const apiUrl = process.env.MAPLED_API_URL || undefined;

/** One client for the whole site, typed by mapled-types.ts. */
export const mapled = createClient<MapledSchema>({ key: deliveryKey, apiUrl });

/** An image field's value is an asset id: this is its URL, resized on Mapled's side. */
export function imageUrl(id: string, width: number): string {
  return assetUrl(id, { width, apiUrl });
}
