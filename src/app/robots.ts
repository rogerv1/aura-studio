import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(indexable && siteUrl && { sitemap: new URL("sitemap.xml", siteUrl).href }),
  };
}

