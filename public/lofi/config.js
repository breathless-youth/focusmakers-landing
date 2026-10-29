// 포커스메이커스 사전신청 랜딩 설정
// 배포 전에 아래 값만 채우면 됩니다.

window.FM_CONFIG = {
  // Supabase 프로젝트 설정 → API 에서 복사
  SUPABASE_URL: "",        // 예: "https://abcdefgh.supabase.co"
  SUPABASE_ANON_KEY: "",   // anon public 키 (service_role 키는 절대 넣지 마세요)

  // 메타 픽셀 ID. 비워두면 픽셀을 불러오지 않습니다.
  META_PIXEL_ID: "",

  // 어떤 컨셉/버전의 랜딩인지 구분하는 값 (A/B 테스트 시 바꿔서 배포)
  LANDING_VARIANT: "lofi-v1",

  // 장면 스타일: "real"(실사 영상) | "anime"(직접 그린 캐릭터 애니메이션)
  // 광고 링크에 ?style=anime 를 붙이면 이 값과 상관없이 애니메이션 버전이 열려요.
  // 신청 데이터의 variant 에는 "lofi-v1-anime:final" 처럼 -anime 가 붙어서 두 버전을 나눠 볼 수 있어요.
  SCENE_STYLE: "real",

  // 카페 장면의 실제 웅성거림 녹음 (Mixkit "Restaurant crowd talking ambience", 2분, 무료 상업 이용 가능)
  // assets/cafe.mp3 가 있으면 그 파일을 먼저 쓰고, 둘 다 안 되면 브라우저가 합성한 웅성거림으로 대신해요.
  CAFE_AUDIO: "https://assets.mixkit.co/active_storage/sfx/444/444-preview.mp3",

  // 도서관 장면의 책장 넘기는 소리 (Mixkit "Single book paging", 무료 상업 이용 가능)
  // assets/page.mp3 가 있으면 그 파일을 먼저 써요.
  PAGE_AUDIO: "https://assets.mixkit.co/active_storage/sfx/1101/1101-preview.mp3",

  // 장면별 실사 영상 (Mixkit 무료 라이선스: 상업 이용 가능, 출처 표기 불필요)
  // assets/scene-window.mp4 처럼 같은 이름의 파일을 넣으면 그 파일을 먼저 써요.
  // 광고 집행 전에는 README 안내대로 파일을 내려받아 assets/ 에 넣는 걸 권장해요.
  SCENE_VIDEOS: {
    cover: {    // 첫 화면(표지) — 비 오는 밤, 창가에서 공부하는 캐릭터 (직접 만든 영상, 레포에 포함)
      hd: "/lofi/assets/scene-cover.mp4",
      sd: "/lofi/assets/scene-cover.mp4",
      poster: "/lofi/assets/scene-cover.jpg",
    },
    window: {   // 비 오는 창가 — 빗방울 맺힌 유리 너머 주황 불빛
      hd: "https://assets.mixkit.co/videos/2846/2846-1080.mp4",
      sd: "https://assets.mixkit.co/videos/2846/2846-720.mp4",
      poster: "https://assets.mixkit.co/videos/2846/2846-thumb-720-0.jpg",
      page: "https://mixkit.co/free-stock-video/window-on-a-rainy-day-2846/",
    },
    cafe: {     // 새벽 카페 — 펜던트 조명 아래 책 읽는 카페
      hd: "https://assets.mixkit.co/videos/223/223-1080.mp4",
      sd: "https://assets.mixkit.co/videos/223/223-720.mp4",
      poster: "https://assets.mixkit.co/videos/223/223-thumb-720-0.jpg",
      page: "https://mixkit.co/free-stock-video/woman-drinking-coffee-in-a-cafe-223/",
    },
    library: {  // 조용한 도서관 — 어두운 서가
      hd: "https://assets.mixkit.co/videos/48574/48574-720.mp4",
      sd: "https://assets.mixkit.co/videos/48574/48574-720.mp4",
      poster: "https://assets.mixkit.co/videos/48574/48574-thumb-720-0.jpg",
      page: "https://mixkit.co/free-stock-video/thousands-of-books-in-a-dark-library-archive-48574/",
    },
  },
};
