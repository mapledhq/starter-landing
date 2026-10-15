import { createReleaseHandler } from "@mapled/next/server";
import { apiUrl, deliveryKey } from "@/lib/mapled";

// Open tabs ask this route which release the site serves (<MapledLive /> in the layout).
export const GET = createReleaseHandler({ key: deliveryKey, apiUrl });
