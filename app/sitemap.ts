import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * lastModified 를 넣지 않는다 — 빌드할 때마다 new Date() 가 갱신돼 내용이 그대로인
 * 페이지까지 "방금 바뀜"으로 보고하게 된다. 믿을 수 없는 lastmod 는 검색엔진이
 * 신호 자체를 무시하는 쪽으로 이어져, 아예 없는 편이 낫다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.siteUrl },
    { url: `${SITE.siteUrl}/privacy` },
    { url: `${SITE.siteUrl}/terms` },
    { url: `${SITE.siteUrl}/support` },
  ];
}
