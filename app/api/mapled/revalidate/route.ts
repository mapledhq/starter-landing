import { createRevalidateHandler } from "@mapled/next/server";

// Mapled calls this on every publish; the secret is MAPLED_WEBHOOK_SECRET,
// read when a ping arrives. Without it the route answers 503.
export const POST = createRevalidateHandler();
