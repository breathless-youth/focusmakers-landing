import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.siteUrl, lastModified: new Date() },
    { url: `${SITE.siteUrl}/privacy`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/terms`, lastModified: new Date() },
    { url: `${SITE.siteUrl}/support`, lastModified: new Date() },
  ];
}
