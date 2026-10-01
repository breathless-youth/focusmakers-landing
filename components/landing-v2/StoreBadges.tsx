import type { CtaLocation } from "@/lib/analytics";
import { StoreLink } from "./StoreLink";

/**
 * App Store · Google Play 배지 한 쌍 — 히어로와 다운로드 섹션이 같이 쓴다.
 * 기기를 가리지 않고 둘 다 보여주므로 기기 감지에 기대지 않는다.
 */

/** 로고 path 는 시안 값 그대로다. 시안의 24×24 틀 안에서는 두 로고가 차지하는
 *  면적이 달라 크기가 어긋나 보여서, viewBox 를 각 path 의 실제 경계로 잡고
 *  같은 높이로 그린다 */
const STORES = [
  {
    platform: "ios",
    viewBox: "4.69 3.5 13.98 17.17",
    logo: "M16.37 12.64c.02 2.6 2.28 3.46 2.3 3.47-.02.06-.36 1.23-1.19 2.44-.71 1.04-1.46 2.08-2.63 2.1-1.15.02-1.52-.68-2.83-.68-1.32 0-1.73.66-2.82.7-1.13.04-1.99-1.13-2.71-2.17-1.47-2.13-2.6-6.02-1.08-8.64.75-1.3 2.1-2.13 3.56-2.15 1.11-.02 2.16.75 2.83.75.68 0 1.95-.93 3.29-.79.56.02 2.13.23 3.14 1.7-.08.05-1.88 1.1-1.86 3.27zM14.2 6.26c.6-.73 1-1.74.89-2.76-.86.04-1.9.58-2.52 1.3-.55.64-1.04 1.68-.91 2.67.96.07 1.94-.49 2.54-1.21z",
    caption: "Download on the",
    name: "App Store",
  },
  {
    platform: "android",
    viewBox: "4 2.1 17.3 19.8",
    logo: "M4 3.5v17c0 .3.2.6.5.7l9.4-9.2L4.5 2.8c-.3.1-.5.4-.5.7zM15.3 10.7 6.6 2.1l10.5 6.1-1.8 2.5zM15.3 13.3l1.8 2.5L6.6 21.9l8.7-8.6zM18.3 9.3l2.4 1.4c.8.5.8 1.5 0 2l-2.4 1.4L16.2 12l2.1-2.7z",
    caption: "GET IT ON",
    name: "Google Play",
  },
] as const;

export function StoreBadges({ location }: { location: CtaLocation }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {STORES.map(({ platform, viewBox, logo, caption, name }) => (
        <StoreLink
          key={platform}
          platform={platform}
          location={location}
          ariaLabel={`${name}에서 다운로드`}
          className="inline-flex h-14 items-center gap-2.5 rounded-[14px] bg-[#101419] pr-5 pl-4 text-white transition-colors hover:bg-[#333D4B] active:scale-[.97]"
        >
          <svg
            viewBox={viewBox}
            fill="currentColor"
            aria-hidden="true"
            className="h-[22px] w-auto"
          >
            <path d={logo} />
          </svg>
          <span className="flex flex-col items-start leading-[1.1]">
            <span className="text-[11px] font-medium opacity-80">{caption}</span>
            <span className="text-[18px] font-semibold tracking-[-0.3px]">
              {name}
            </span>
          </span>
        </StoreLink>
      ))}
    </div>
  );
}
