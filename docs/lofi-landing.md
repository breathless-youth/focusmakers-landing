# 로파이 공부방 컨셉 검증 랜딩 (`/lofi`)

메인 랜딩과 별개로, 로파이 공부방 컨셉을 광고로 검증하려고 만든 정적 페이지다.
빌드 과정 없이 `public/lofi/` 에 그대로 두고, `next.config.ts` 의 rewrite 로
`https://focusmakers.app/lofi` 에서 열린다. (Next 앱 코드와는 섞이지 않는다)

- 실사 버전: `/lofi`
- 애니메이션 캐릭터 버전: `/lofi?style=anime`
- 신청 테이블: `supabase/migrations/0003_lofi_waitlist.sql` → `lofi_waitlist`

```
public/lofi/
├── index.html          # 페이지 구조·스타일·스크롤 연출·신청 폼
├── scenes.js           # 로파이 장면 3종 (비 오는 창가 / 새벽 카페 / 조용한 도서관) 직접 그린 SVG
├── sound.js            # 빗소리·카페·장작 + 로파이 음악 (파일 없으면 브라우저가 직접 연주)
├── config.js           # Supabase 키, 메타 픽셀 ID, 랜딩 버전
└── assets/             # (선택) 영상·음악·이미지 넣는 곳
```

## 페이지 흐름

1. **첫 화면(표지)**: `public/lofi/assets/scene-cover.mp4` (비 오는 밤 창가에서 공부하는 캐릭터, 8초 루프) + 제목 한 줄. 바꾸려면 같은 이름으로 파일만 교체. 화면을 한 번 누르면 빗소리와 음악이 흘러나와요.
2. **스크롤하면 장면이 바뀌어요**: 비 오는 창가 → 새벽 카페 → 조용한 도서관. 소리도 장면에 맞게 바뀌어요.
3. **노트북 안으로**: 장면이 노트북 화면 안으로 줄어들며 "노트북과 아이패드에 띄워두면 그곳이 공부방이 돼요".
4. **AI 타이머 (아이패드)**: 스크롤에 따라 앉음 → 휴대폰 감지 멈춤 → 자리 비움 → 다시 흐름.
5. **캠스터디 (노트북)**: 스크롤하면 캠이 1명에서 6명까지 하나씩 켜져요.
6. **조용한 응원**: 옆자리 사람의 쪽지가 날아와 펼쳐지고 → 오늘 받은 쪽지가 책상에 쌓여요.
7. **소리 믹서**: 창가·카페·도서관 + 캐릭터 방: 공간을 고르고 로파이·빗소리·카페·장작을 직접 섞어볼 수 있어요.
8. **마지막 신청칸**. 상단의 "얼리버드 신청" 버튼은 어디서든 신청 창을 열어요.

### 소리에 대해
브라우저는 사람이 페이지를 한 번도 누르지 않으면 소리 자동재생을 막아요(크롬·사파리 공통 정책). 그래서 첫 화면에 "화면을 누르면 빗소리와 음악이 흘러나와요"를 띄우고, **아무 곳이나 처음 누르는 순간** 소리가 서서히 커지게 했어요. 상단 버튼으로 끄면 그 뒤로는 다시 켜지지 않아요.

## 1. Supabase 준비 (5분)

1. Supabase에서 새 프로젝트 생성
2. SQL Editor → `supabase/migrations/0003_lofi_waitlist.sql` 붙여넣고 Run (메인 랜딩과 같은 프로젝트를 써도 된다)
3. Project Settings → API에서 `Project URL`과 `anon public` 키를 복사해 `config.js`에 넣기
   - `service_role` 키는 절대 넣지 마세요. 브라우저에 그대로 노출돼요.
   - anon 키로는 신청 **추가만** 되고, 목록 조회는 안 되게 막아뒀어요.

`config.js`가 비어 있으면 신청 버튼을 눌러도 저장되지 않고, 브라우저 콘솔에 경고만 떠요. (미리보기용)

## 2. 배포

메인 랜딩과 같은 Vercel 프로젝트로 나간다. PR 을 올리면 프리뷰 주소의 `/lofi` 에서
바로 확인할 수 있고, `main` 에 머지되면 `https://focusmakers.app/lofi` 로 열린다.

- 방문자 수: Vercel Analytics 또는 메타 광고관리자의 랜딩 페이지 조회. **전환율 = 신청 수 ÷ 방문 수**

## 3. 실사 영상

장면 세 개는 Mixkit 무료 영상을 써요 (Mixkit Stock Video Free License: 상업 이용 가능, 출처 표기 불필요).

| 장면 | 영상 | 
|---|---|
| 비 오는 창가 | [Window on a rainy day](https://mixkit.co/free-stock-video/window-on-a-rainy-day-2846/) |
| 새벽 카페 | [Woman drinking coffee in a cafe](https://mixkit.co/free-stock-video/woman-drinking-coffee-in-a-cafe-223/) |
| 조용한 도서관 | [Thousands of books in a dark library archive](https://mixkit.co/free-stock-video/thousands-of-books-in-a-dark-library-archive-48574/) |

**지금은 Mixkit 서버에서 바로 불러오게 해뒀어요** (`config.js`의 `SCENE_VIDEOS`). 미리보기·내부 확인에는 이대로 충분하지만, **광고 돌리기 전에는 파일을 내려받아 `public/lofi/assets/`에 넣는 걸 권장해요.** 외부 서버가 느리거나 막히면 첫 화면이 일러스트로 바뀌어 보이고, 측정에 영향을 줘요.

1. 위 링크에서 각각 **HD 720p**로 다운로드 (데스크톱 품질을 원하면 창가·카페는 Full HD도 있어요)
2. 이름을 바꿔서 넣기: `public/lofi/assets/scene-window.mp4`, `public/lofi/assets/scene-cafe.mp4`, `public/lofi/assets/scene-library.mp4`
3. 용량 줄이기 (선택, 1개당 3~5MB 목표):
   ```bash
   ffmpeg -i 원본.mp4 -t 12 -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 28 -an -movflags +faststart assets/scene-window.mp4
   ```

`public/lofi/assets/`에 파일이 있으면 그걸 먼저 쓰고, 없으면 Mixkit 서버, 그것도 안 되면 직접 그린 일러스트로 넘어가요. 영상이 어두운 정도는 `index.html`의 `.v-window > video` 같은 `filter` 값으로 조절해요.

다른 영상으로 바꾸고 싶으면 `config.js`의 `SCENE_VIDEOS`에서 주소만 바꾸면 돼요. 고를 때 기준: **움직임이 느리고, 화면 아래쪽이 어두운** 영상이어야 제목이 잘 읽혀요.

### 그 밖에 넣으면 좋은 파일

| 파일 | 넣으면 | 권장 |
|---|---|---|
| `public/lofi/assets/lofi.mp3` | **들어 있음** — Suno "실유의 리듬"(72bpm 로파이, 3분). 페이지 전체 배경음이고 장면마다 크기만 달라져요. 없거나 못 불러오면 브라우저 합성 음악으로 대신 | 1~3분 루프, 128kbps, 상업 이용 가능한 음원 (Suno는 유료 플랜에서 만든 곡만) |
| `public/lofi/assets/cafe.mp3` | 카페 녹음을 이 파일로 바꿔요. 지금은 Mixkit의 [Restaurant crowd talking ambience](https://mixkit.co/free-sound-effects/restaurant/)를 서버에서 바로 불러와요 (`config.js`의 `CAFE_AUDIO`). 광고 전엔 내려받아 넣는 걸 권장 | 1~3분 루프 |
| `public/lofi/assets/page.mp3` | 도서관 장면의 책장 넘기는 소리. 지금은 Mixkit의 [Single book paging](https://mixkit.co/free-sound-effects/page/)을 서버에서 바로 불러와요 (`config.js`의 `PAGE_AUDIO`) | 2~3초 단발 녹음 |
| `public/lofi/assets/og.jpg` | 카톡·인스타 링크 미리보기 이미지 | 1200×630 (첫 화면 캡처 추천) |

로파이 음원은 Uppbeat(무료 플랜은 크레딧 표기 필요), Pixabay Music 등 라이선스가 명확한 곳에서 받으세요. 유튜브 로파이 채널 음원은 쓰면 안 돼요.

## 실사 vs 애니메이션 버전

같은 페이지를 두 가지 느낌으로 열 수 있어요.

- 실사(기본): `https://focusmakers.app/lofi`
- 애니메이션 캐릭터: `https://focusmakers.app/lofi?style=anime` — 실사 영상 대신 직접 그린 장면을 쓰고, 첫 화면은 비 오는 창 앞에서 공부하는 캐릭터(연필 꽂은 똥머리, 민트 후드티)가 음악에 맞춰 고개를 까딱여요.

광고 세트를 두 개 만들어 링크만 다르게 걸면, 신청 데이터의 `variant`가 `lofi-v1:final` / `lofi-v1-anime:final`로 나뉘어 어느 쪽 반응이 좋은지 비교할 수 있어요. 기본값을 바꾸려면 `config.js`의 `SCENE_STYLE`을 `"anime"`로.

## 4. 메타 광고 연결

1. `config.js`의 `META_PIXEL_ID`에 픽셀 ID 입력 → 재배포
2. 페이지가 보내는 이벤트
   - `PageView`: 방문
   - `Lead`: 신청 완료 (이미 신청한 연락처는 제외)
   - `SoundOn`: 처음 소리가 켜졌을 때 (커스텀)
   - `SceneSelect`: 장면이 바뀌었을 때 — 스크롤(`story`)인지 직접 고른 건지(`mixer`) 구분 (커스텀)
   - `FeatureView`: 조용한 응원(`cheer`) 섹션을 처음 봤을 때 (커스텀) — 어떤 기능까지 스크롤했는지 비교용
   - `OpenSignup`: 상단 신청 버튼으로 신청 창을 열었을 때 (커스텀)
   - 신청 데이터의 `variant`에는 `lofi-v1:modal` / `lofi-v1:final`처럼 어느 신청칸에서 신청했는지가 붙어요.
3. 광고 링크에 UTM을 붙이면 신청 데이터에 같이 저장돼요. 소재별 비교는 `utm_content`로 하세요.

```
https://focusmakers.app/lofi?utm_source=meta&utm_medium=paid&utm_campaign=lofi_test&utm_content=rain_window_v1
```

## 5. 결과 보는 법

- 방문 수: Vercel Analytics (또는 메타 광고관리자 랜딩페이지 조회)
- 신청 수: Supabase Table Editor → `lofi_waitlist`
- 소재별·소리 켬 여부별 집계 쿼리는 `0003_lofi_waitlist.sql` 맨 아래에 있어요.

A/B 테스트를 하려면 문구를 바꾼 버전을 만들고 `config.js`의 `LANDING_VARIANT`를 `lofi-v2`처럼 바꿔서 배포하면 돼요.

## 6. 손볼 수 있는 곳

- 첫 화면 제목: `index.html`의 `.hero-copy h1` ("여기서 같이 공부해요")
- 화면별 자동 소리: `autoScene()` — 스토리는 장면대로, AI 타이머는 도서관, 캠스터디는 카페, 마지막은 창가 소리. 믹서 구간은 직접 고른 소리를 유지
- 장면별 문구: `.step` 3개와 `#deviceCopy`
- 스크롤 구간 길이: `.story`(640vh), `.timer`(440vh), `.cams`(340vh) — 숫자가 클수록 천천히 넘어가요
- 장면이 바뀌는 지점: `storyFrame()`의 `p < .14 / .33 / .52 / .71`
- 공간별 소리·음악 크기: `sound.js`의 `presets`
- 색: `:root`의 `--lamp`(유일한 강조색)
- 신청칸 문구: `<template id="signupTpl">` 한 곳만 고치면 모든 신청칸에 반영돼요
- 개인정보 안내 문구: 신청칸의 `consent-detail` — 실제 운영 정책에 맞게 꼭 확인하세요.
