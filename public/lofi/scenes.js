// 포커스메이커스 로파이 장면 3종 (직접 그린 SVG)
// FMScene("window" | "cafe" | "library") → <svg> 문자열
(() => {
  let uid = 0;
  const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
  const W = 1600, H = 900;
  const WX = 440, WY = 80, WW = 720, WH = 500;       // 창문 유리 영역
  const f = n => Math.round(n * 10) / 10;

  function rain(r, n, op, id) {
    let s = `<g clip-path="url(#win${id})">`;
    for (let i = 0; i < n; i++) {
      const x = WX + r() * WW, len = 28 + r() * 46, dur = (.55 + r() * .6).toFixed(2), del = (-r() * 2).toFixed(2), w = (1 + r() * 1.2).toFixed(1);
      s += `<line class="fm-rain" x1="${f(x)}" y1="${WY - 80}" x2="${f(x - len * .12)}" y2="${f(WY - 80 + len)}" stroke="rgba(205,222,240,${(op * (.5 + r() * .5)).toFixed(2)})" stroke-width="${w}" stroke-linecap="round" style="animation-duration:${dur}s;animation-delay:${del}s"/>`;
    }
    return s + `</g>`;
  }
  function glassDrops(r, n, id) {
    let s = `<g clip-path="url(#win${id})">`;
    for (let i = 0; i < n; i++) {
      const x = WX + 20 + r() * (WW - 40), y = WY + 20 + r() * (WH - 60), rad = 1.6 + r() * 3.4;
      const slide = r() < .35;
      s += `<g${slide ? ` class="fm-slide" style="animation-duration:${(7 + r() * 8).toFixed(1)}s;animation-delay:${(-r() * 10).toFixed(1)}s"` : ""}><circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="rgba(225,235,245,.28)"/><circle cx="${f(x - rad * .3)}" cy="${f(y - rad * .35)}" r="${f(rad * .35)}" fill="rgba(255,255,255,.5)"/></g>`;
    }
    return s + `</g>`;
  }
  function frame(c, hi) {
    return `<g>
      <rect x="${WX - 18}" y="${WY - 18}" width="${WW + 36}" height="${WH + 36}" fill="none" stroke="${c}" stroke-width="36" rx="4"/>
      <rect x="${WX - 2}" y="${WY - 2}" width="${WW + 4}" height="${WH + 4}" fill="none" stroke="${hi}" stroke-width="2"/>
      <rect x="${WX + WW / 2 - 7}" y="${WY}" width="14" height="${WH}" fill="${c}"/>
      <rect x="${WX}" y="${WY + WH * .48 - 6}" width="${WW}" height="12" fill="${c}"/>
      <rect x="${WX - 50}" y="${WY + WH + 16}" width="${WW + 100}" height="20" rx="3" fill="${c}"/>
      <rect x="${WX - 50}" y="${WY + WH + 16}" width="${WW + 100}" height="3" fill="${hi}"/>
    </g>`;
  }
  function desk(top, c1, c2, edge, id) {
    return `<defs><linearGradient id="desk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect x="0" y="${top}" width="${W}" height="${H - top}" fill="url(#desk${id})"/>
      <rect x="0" y="${top}" width="${W}" height="5" fill="${edge}"/>`;
  }
  function tablet(x, y, label) {
    return `<g>
      <path d="M${x + 95} ${y + 150} l-22 52 h18 l18 -40 l18 40 h18 l-22 -52z" fill="#232326"/>
      <rect x="${x}" y="${y}" width="250" height="162" rx="14" fill="#1a1a1c"/>
      <rect x="${x + 8}" y="${y + 8}" width="234" height="146" rx="8" fill="#0d141d"/>
      <rect x="${x + 8}" y="${y + 8}" width="234" height="146" rx="8" fill="url(#tabGlow)"/>
      <circle cx="${x + 92}" cy="${y + 50}" r="4" fill="#3DDC84" class="fm-blink"/>
      <text x="${x + 102}" y="${y + 55}" font-family="Pretendard Variable, Pretendard, sans-serif" font-size="13" fill="rgba(255,255,255,.75)">${label}</text>
      <text x="${x + 125}" y="${y + 108}" text-anchor="middle" font-family="Pretendard Variable, Pretendard, sans-serif" font-weight="300" font-size="46" letter-spacing="-2" fill="#fff">01:24</text>
    </g>`;
  }
  function steam(x, y, sc = 1) {
    let s = `<g transform="translate(${x} ${y}) scale(${sc})">`;
    [[-14, 0], [0, .9], [14, 1.8]].forEach(([dx, d]) => {
      s += `<path class="fm-steam" style="animation-delay:-${d}s" d="M${dx} 0 c-10 -18 10 -26 0 -46 c-8 -16 8 -24 2 -40" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4" stroke-linecap="round"/>`;
    });
    return s + `</g>`;
  }
  function vignette(id) {
    return `<defs><radialGradient id="vig${id}" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#vig${id})" pointer-events="none"/>`;
  }
  function glow(cx, cy, rad, color, op, id, cls = "fm-breathe") {
    const gid = `g${id}_${Math.round(cx)}_${Math.round(cy)}`;
    return `<defs><radialGradient id="${gid}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset=".45" stop-color="${color}" stop-opacity="${op * .35}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle class="${cls}" cx="${cx}" cy="${cy}" r="${rad}" fill="url(#${gid})"/>`;
  }
  function commonDefs(id) {
    return `<defs>
      <clipPath id="win${id}"><rect x="${WX}" y="${WY}" width="${WW}" height="${WH}"/></clipPath>
      <linearGradient id="tabGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a3a52" stop-opacity=".9"/><stop offset="1" stop-color="#0d141d" stop-opacity="0"/></linearGradient>
    </defs>`;
  }

  /* ───────── 비 오는 창가 ───────── */
  function windowScene(id) {
    const r = rng(7);
    let s = commonDefs(id) + `<defs>
      <linearGradient id="wall${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#162131"/><stop offset="1" stop-color="#0b1119"/></linearGradient>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22334f"/><stop offset=".7" stop-color="#141e30"/><stop offset="1" stop-color="#2a2a3a"/></linearGradient>
      <linearGradient id="cone${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5B860" stop-opacity=".35"/><stop offset="1" stop-color="#F5B860" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#wall${id})"/>
    <g clip-path="url(#win${id})">
      <rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" fill="url(#sky${id})"/>
      ${glow(1035, 175, 120, "#f3e3c0", .35, id, "")}
      <circle cx="1035" cy="175" r="34" fill="#efe0bf" opacity=".85"/>
      <g class="fm-cloud"><ellipse cx="980" cy="200" rx="120" ry="26" fill="#2b3a55" opacity=".85"/><ellipse cx="640" cy="150" rx="160" ry="30" fill="#273550" opacity=".7"/></g>`;
    // 건물과 창문 불빛
    let x = WX - 10;
    while (x < WX + WW) {
      const bw = 50 + r() * 80, bh = 120 + r() * 230, by = WY + WH - bh, shade = ["#0c1320", "#101827", "#0e1522", "#131c2c"][Math.floor(r() * 4)];
      s += `<rect x="${f(x)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" fill="${shade}"/>`;
      for (let wy = by + 14; wy < WY + WH - 20; wy += 22) for (let wx = x + 8; wx < x + bw - 12; wx += 16) {
        const v = r();
        if (v < .26) s += `<rect${v < .05 ? ' class="fm-flick"' : ""} style="animation-delay:-${(r() * 8).toFixed(1)}s" x="${f(wx)}" y="${f(wy)}" width="7" height="9" fill="${v < .13 ? "#F5B860" : "#f6d7a6"}" opacity="${(.45 + r() * .5).toFixed(2)}"/>`;
      }
      x += bw + 4;
    }
    s += `</g>` + rain(r, 80, .55, id) + glassDrops(r, 22, id) + frame("#1d2634", "#2c3747");
    // 창틀 위 화분
    s += `<g><path d="M470 ${WY + WH + 16} l8 -46 h56 l8 46z" fill="#b5653f"/><rect x="474" y="${WY + WH - 34}" width="64" height="8" rx="2" fill="#c97a4f"/>
      <g class="fm-sway" fill="#3f6b4a"><ellipse cx="490" cy="${WY + WH - 70}" rx="12" ry="34" transform="rotate(-24 490 ${WY + WH - 70})"/><ellipse cx="514" cy="${WY + WH - 82}" rx="12" ry="40" fill="#4c7d57"/><ellipse cx="538" cy="${WY + WH - 66}" rx="11" ry="32" transform="rotate(26 538 ${WY + WH - 66})"/></g></g>`;
    // 책상
    s += desk(700, "#2c2119", "#140f0b", "#3d2e22", id);
    // 스탠드
    s += `<polygon points="330,505 120,700 600,700" fill="url(#cone${id})" class="fm-breathe"/>
      <ellipse cx="230" cy="702" rx="72" ry="13" fill="#1a1a1c"/>
      <polyline points="230,700 196,575 300,478" fill="none" stroke="#2c2c30" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M268 452 l92 -14 l26 62 l-104 20z" fill="#c8873f"/><path d="M282 520 l104 -20" stroke="#ffd79a" stroke-width="5"/>`;
    s += glow(335, 520, 420, "#F5B860", .32, id);
    // 책 더미, 노트, 연필
    s += `<g><rect x="80" y="660" width="150" height="20" rx="3" fill="#5a2f3a"/><rect x="92" y="640" width="132" height="20" rx="3" fill="#2f4a3a"/><rect x="72" y="622" width="140" height="18" rx="3" fill="#7a5a2e"/></g>
      <path d="M620 770 l280 -22 l28 78 l-290 26z" fill="#efe6d6" opacity=".92"/><path d="M766 760 l12 78" stroke="#cdbfa8" stroke-width="2"/>
      <path d="M650 790 l100 -8 M654 806 l100 -8 M796 778 l90 -7 M800 794 l90 -7" stroke="#b8ad9c" stroke-width="2"/>
      <path d="M940 790 l120 -40" stroke="#FFD25E" stroke-width="9" stroke-linecap="round"/><path d="M940 790 l-12 4" stroke="#333" stroke-width="6" stroke-linecap="round"/>`;
    s += tablet(905, 545, "비 오는 창가");
    // 머그
    s += `<g><path d="M1328 655 h14 a20 20 0 0 1 0 40 h-14" fill="none" stroke="#e8d2b0" stroke-width="9"/><path d="M1262 640 h72 v52 a22 22 0 0 1 -22 22 h-28 a22 22 0 0 1 -22 -22z" fill="#e8d2b0"/><ellipse cx="1298" cy="641" rx="36" ry="7" fill="#4a2e1c"/></g>` + steam(1298, 625);
    s += vignette(id);
    return s;
  }

  /* ───────── 새벽 카페 ───────── */
  function cafeScene(id) {
    const r = rng(13);
    let s = commonDefs(id) + `<defs>
      <linearGradient id="wall${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e1f16"/><stop offset="1" stop-color="#170f0a"/></linearGradient>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1426"/><stop offset="1" stop-color="#2a1a22"/></linearGradient>
      <linearGradient id="cone${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC979" stop-opacity=".32"/><stop offset="1" stop-color="#FFC979" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#wall${id})"/>
    <rect x="0" y="560" width="${W}" height="140" fill="#24180f"/>
    <g clip-path="url(#win${id})"><rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" fill="url(#sky${id})"/>
      <rect x="${WX}" y="${WY + 330}" width="${WW}" height="170" fill="#140d12"/>`;
    const cols = ["#F5B860", "#FF8FA3", "#7FD1C7", "#FFC979", "#F5B860"];
    for (let i = 0; i < 26; i++) {
      const cx = WX + r() * WW, cy = WY + 120 + r() * 330, rad = 18 + r() * 46, c = cols[Math.floor(r() * cols.length)];
      s += `<g class="fm-bokeh" style="animation-delay:-${(r() * 5).toFixed(1)}s">${glow(f(cx), f(cy), f(rad), c, .55 + r() * .3, id + "b" + i, "")}</g>`;
    }
    s += `<g class="fm-neon"><rect x="930" y="150" width="150" height="56" rx="28" fill="none" stroke="#FF8FA3" stroke-width="5"/><text x="1005" y="187" text-anchor="middle" font-family="Pretendard Variable, Pretendard, sans-serif" font-weight="700" font-size="26" fill="#FFB3C1">새벽 2시</text></g>
      ${glow(1005, 178, 140, "#FF8FA3", .25, id + "n", "fm-neon")}
    </g>` + rain(r, 40, .3, id) + glassDrops(r, 14, id) + frame("#4a3424", "#6b4a32");
    // 펜던트 조명
    [[250, 230], [1350, 210]].forEach(([x, len], i) => {
      s += `<g class="fm-swing" style="animation-delay:-${i * 2}s"><line x1="${x}" y1="0" x2="${x}" y2="${len}" stroke="#111" stroke-width="3"/>
        <path d="M${x - 70} ${len + 50} a70 56 0 0 1 140 0z" fill="#2f5d4a"/><ellipse cx="${x}" cy="${len + 52}" rx="22" ry="9" fill="#FFE2A8"/></g>
        <polygon points="${x - 60},${len + 55} ${x - 260},700 ${x + 260},700 ${x + 60},${len + 55}" fill="url(#cone${id})" class="fm-breathe"/>`;
      s += glow(x, len + 60, 300, "#FFC979", .35, id + "p" + i);
    });
    s += desk(700, "#6a4830", "#2c1d12", "#8a6142", id);
    // 크루아상 접시, 커피잔, 다육이
    s += `<ellipse cx="520" cy="742" rx="120" ry="26" fill="#efe8dc"/><ellipse cx="520" cy="738" rx="96" ry="18" fill="#f7f2ea"/>
      <path d="M450 736 q70 -64 140 0 q-20 -10 -40 -6 q-30 -26 -60 0 q-20 -4 -40 6z" fill="#d39a4f"/><path d="M490 718 q30 -22 60 0" stroke="#b47a3e" stroke-width="4" fill="none"/>
      <ellipse cx="1290" cy="735" rx="92" ry="20" fill="#efe8dc"/><path d="M1240 668 h100 l-10 58 a20 20 0 0 1 -20 16 h-40 a20 20 0 0 1 -20 -16z" fill="#f7f2ea"/>
      <path d="M1338 682 h12 a16 16 0 0 1 0 32 h-16" fill="none" stroke="#f7f2ea" stroke-width="8"/><ellipse cx="1290" cy="669" rx="50" ry="9" fill="#8a5a36"/>
      <path d="M1278 667 q12 -8 24 0 q-12 6 -24 0z" fill="#efd9bf"/>` + steam(1290, 650) +
      `<g><rect x="1440" y="650" width="70" height="52" rx="8" fill="#c7b9a6"/><g fill="#6f9a6a"><ellipse cx="1462" cy="640" rx="14" ry="22" transform="rotate(-20 1462 640)"/><ellipse cx="1476" cy="632" rx="14" ry="26"/><ellipse cx="1492" cy="642" rx="13" ry="22" transform="rotate(22 1492 642)"/></g></g>`;
    s += tablet(905, 545, "새벽 카페");
    s += vignette(id);
    return s;
  }

  /* ───────── 조용한 도서관 ───────── */
  function libraryScene(id) {
    const r = rng(29);
    let s = commonDefs(id) + `<defs>
      <linearGradient id="wall${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18221c"/><stop offset="1" stop-color="#0d130f"/></linearGradient>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2546"/><stop offset=".8" stop-color="#3b3f63"/><stop offset="1" stop-color="#55506e"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#wall${id})"/>
    <g clip-path="url(#win${id})"><rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" fill="url(#sky${id})"/>`;
    for (let i = 0; i < 40; i++) s += `<circle class="fm-twinkle" style="animation-delay:-${(r() * 4).toFixed(1)}s" cx="${f(WX + r() * WW)}" cy="${f(WY + r() * 260)}" r="${f(.8 + r() * 1.6)}" fill="#fff" opacity=".8"/>`;
    for (let i = 0; i < 18; i++) { const cx = WX + i * 44 + r() * 20, cy = WY + WH - 40 - r() * 90; s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(40 + r() * 40)}" fill="${r() < .5 ? "#111b17" : "#15211b"}"/>`; }
    s += `<rect x="${WX}" y="${WY + WH - 40}" width="${WW}" height="40" fill="#0f1713"/></g>` + frame("#2c2a20", "#3e3a2c");
    // 책장
    const pal = ["#6b3a2e", "#2f4a3a", "#7a5a2e", "#3b3f5c", "#8a6a4a", "#5a2f3a", "#4a5a3a", "#a07b4f", "#2e3a4a"];
    [[0, 395], [1205, 1600]].forEach(([x0, x1]) => {
      s += `<rect x="${x0}" y="0" width="${x1 - x0}" height="700" fill="#101611"/>`;
      for (let y = 130; y <= 690; y += 140) {
        let x = x0 + 14;
        while (x < x1 - 30) {
          const bw = 14 + r() * 18, bh = 76 + r() * 40;
          if (r() < .06) { x += 20; continue; }
          const lean = r() < .07 ? `transform="rotate(${r() < .5 ? -8 : 8} ${f(x + bw / 2)} ${y})"` : "";
          s += `<rect x="${f(x)}" y="${f(y - bh)}" width="${f(bw)}" height="${f(bh)}" rx="2" fill="${pal[Math.floor(r() * pal.length)]}" ${lean}/>`;
          if (r() < .4) s += `<rect x="${f(x)}" y="${f(y - bh + 12)}" width="${f(bw)}" height="3" fill="rgba(255,220,160,.35)"/>`;
          x += bw + 1.5;
        }
        s += `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="12" fill="#3a2a1c"/>`;
      }
    });
    s += desk(700, "#33261a", "#120d08", "#4a3726", id);
    // 은행원 램프
    s += `<rect x="280" y="690" width="120" height="14" rx="4" fill="#a8843f"/><rect x="334" y="600" width="12" height="92" fill="#a8843f"/>
      <path d="M250 610 h180 a90 40 0 0 0 -180 0z" fill="#1f6b4a"/><rect x="250" y="604" width="180" height="10" rx="3" fill="#2a8a60"/>
      <ellipse cx="340" cy="614" rx="80" ry="7" fill="#FFE2A8" opacity=".9"/>`;
    s += glow(340, 640, 420, "#FFD58A", .34, id);
    // 펼친 책, 찻잔
    s += `<path d="M600 760 q150 -30 160 10 l10 70 q-150 -30 -180 0z" fill="#efe6d6"/><path d="M760 770 q20 -40 190 -16 l-10 66 q-150 -20 -170 20z" fill="#f4ecdf"/>
      <path d="M626 784 l120 -14 M630 800 l120 -14 M790 778 l120 6 M788 794 l120 6" stroke="#c5b9a6" stroke-width="2"/>
      <ellipse cx="1300" cy="738" rx="70" ry="15" fill="#d9d2c4"/><path d="M1255 690 h90 v30 a28 28 0 0 1 -28 24 h-34 a28 28 0 0 1 -28 -24z" fill="#e9e2d4"/><ellipse cx="1300" cy="691" rx="45" ry="7" fill="#b3843c"/>` + steam(1300, 676, .8);
    // 떠다니는 먼지
    for (let i = 0; i < 34; i++) s += `<circle class="fm-dust" style="animation-duration:${(10 + r() * 14).toFixed(1)}s;animation-delay:-${(r() * 20).toFixed(1)}s" cx="${f(160 + r() * 520)}" cy="${f(380 + r() * 300)}" r="${f(1 + r() * 2.2)}" fill="rgba(255,236,200,.7)"/>`;
    s += tablet(905, 545, "조용한 도서관");
    s += vignette(id);
    return s;
  }

  /* ───────── 캐릭터 방 (애니메이션 버전) ─────────
     직접 만든 캐릭터: 연필 꽂은 똥머리, 민트 후드티, 무선 이어폰.
     뒤에서 바라본 구도 — 비 오는 창 앞에서 노트북으로 공부하며 음악에 맞춰 고개를 까딱여요. */
  function roomScene(id) {
    const r = rng(23);
    let s = commonDefs(id) + `<defs>
      <linearGradient id="rwall${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#211c36"/><stop offset="1" stop-color="#120f20"/></linearGradient>
      <linearGradient id="rsky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2a55"/><stop offset=".65" stop-color="#3b3160"/><stop offset="1" stop-color="#6b4a6e"/></linearGradient>
      <linearGradient id="rdesk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3f33"/><stop offset="1" stop-color="#3a281f"/></linearGradient>
      <linearGradient id="rhood${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f7d74"/><stop offset=".55" stop-color="#6fa597"/><stop offset="1" stop-color="#8cc2b1"/></linearGradient>
      <linearGradient id="rhair${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2238"/><stop offset="1" stop-color="#3d2f4d"/></linearGradient>
      <linearGradient id="rcone${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC37A" stop-opacity=".28"/><stop offset="1" stop-color="#FFC37A" stop-opacity=".02"/></linearGradient>
      <radialGradient id="rscreen${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9fd0ff" stop-opacity=".55"/><stop offset="1" stop-color="#9fd0ff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#rwall${id})"/>
    <g clip-path="url(#win${id})">
      <rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" fill="url(#rsky${id})"/>
      <g class="fm-cloud"><ellipse cx="620" cy="170" rx="150" ry="24" fill="#3a3966" opacity=".8"/><ellipse cx="1040" cy="130" rx="120" ry="20" fill="#353462" opacity=".7"/></g>`;
    // 멀리 보이는 동네 지붕들과 불 켜진 창
    let x = WX - 10;
    while (x < WX + WW) {
      const bw = 60 + r() * 90, bh = 90 + r() * 170, by = WY + WH - bh, shade = ["#1d1a33", "#221d3a", "#1a1730"][Math.floor(r() * 3)];
      s += `<rect x="${f(x)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" fill="${shade}"/>`;
      if (r() < .5) s += `<path d="M${f(x - 6)} ${f(by)} L${f(x + bw / 2)} ${f(by - 26 - r() * 20)} L${f(x + bw + 6)} ${f(by)}z" fill="${shade}"/>`;
      for (let wy = by + 18; wy < WY + WH - 20; wy += 28) for (let wx = x + 10; wx < x + bw - 16; wx += 22) {
        const v = r();
        if (v < .3) s += `<rect${v < .06 ? ' class="fm-flick"' : ""} style="animation-delay:-${(r() * 8).toFixed(1)}s" x="${f(wx)}" y="${f(wy)}" width="9" height="11" rx="1.5" fill="${v < .15 ? "#FFC37A" : "#ffe1b0"}" opacity="${(.5 + r() * .45).toFixed(2)}"/>`;
      }
      x += bw + 6;
    }
    s += `</g>` + rain(r, 70, .5, id) + glassDrops(r, 18, id) + frame("#2c2540", "#3d3456");
    // 창 위 전구 줄
    s += `<path d="M${WX - 40} ${WY - 30} Q${WX + WW / 2} ${WY + 40} ${WX + WW + 40} ${WY - 30}" fill="none" stroke="#3a3350" stroke-width="3"/>`;
    for (let i = 1; i < 12; i++) {
      const t = i / 12, bx = (1 - t) * (1 - t) * (WX - 40) + 2 * (1 - t) * t * (WX + WW / 2) + t * t * (WX + WW + 40), byy = (1 - t) * (1 - t) * (WY - 30) + 2 * (1 - t) * t * (WY + 40) + t * t * (WY - 30);
      const c = ["#FFC37A", "#ff9e9e", "#a8e6cf", "#ffe1b0"][i % 4];
      s += `<circle class="fm-twinkle" style="animation-delay:-${(i * .7).toFixed(1)}s" cx="${f(bx)}" cy="${f(byy + 12)}" r="16" fill="${c}" opacity=".18"/><circle cx="${f(bx)}" cy="${f(byy + 12)}" r="6.5" fill="${c}"/>`;
    }
    // 창틀 위 선인장·작은 화분
    s += `<g><rect x="1060" y="${WY + WH - 6}" width="54" height="22" rx="4" fill="#d98b6a"/><g class="fm-sway"><rect x="1074" y="${WY + WH - 58}" width="26" height="56" rx="13" fill="#6fae8a"/><rect x="1060" y="${WY + WH - 40}" width="16" height="26" rx="8" fill="#6fae8a"/></g></g>`;
    // 책상 (멀리 있는 윗면) + 바닥 그늘
    s += `<rect x="0" y="640" width="${W}" height="70" fill="url(#rdesk${id})"/><rect x="0" y="640" width="${W}" height="4" fill="#7a5848"/><rect x="0" y="710" width="${W}" height="${H - 710}" fill="#0f0c18"/>`;
    // 책 더미
    s += `<g><rect x="250" y="608" width="150" height="18" rx="3" fill="#c46b6b"/><rect x="262" y="590" width="128" height="18" rx="3" fill="#6b8fc4"/><rect x="246" y="574" width="140" height="16" rx="3" fill="#e6c27a"/><rect x="250" y="626" width="160" height="16" rx="3" fill="#8a6bb8"/></g>`;
    // 노트북 (화면이 캐릭터 쪽을 향함 — 우리는 화면을 비스듬히 봐요)
    s += `<ellipse cx="610" cy="600" rx="230" ry="120" fill="url(#rscreen${id})" class="fm-breathe"/>
      <path d="M500 520 L700 512 L706 628 L494 634z" fill="#1c1a24"/><path d="M508 528 L692 521 L697 620 L503 626z" fill="#21345a"/>
      <text x="600" y="584" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="300" fill="#e8f2ff" opacity=".9" transform="rotate(-1.5 600 584)">01:24</text>
      <path d="M484 636 L716 630 L736 646 L470 652z" fill="#2c2a36"/>`;
    // 스탠드 + 머그
    s += `<polygon points="1240,505 1080,640 1400,640" fill="url(#rcone${id})" class="fm-breathe"/>
      <ellipse cx="1300" cy="642" rx="58" ry="10" fill="#26222f"/><polyline points="1300,640 1272,540 1240,470" fill="none" stroke="#3a3446" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1196 452 l78 -6 l18 54 l-92 10z" fill="#e6a35c"/><path d="M1208 512 l90 -10" stroke="#ffe1a8" stroke-width="5"/>`;
    s += glow(1250, 500, 360, "#FFC37A", .3, id);
    s += `<g><path d="M1146 600 h12 a16 16 0 0 1 0 32 h-12" fill="none" stroke="#f2d5d5" stroke-width="8"/><path d="M1092 588 h58 v42 a18 18 0 0 1 -18 18 h-22 a18 18 0 0 1 -18 -18z" fill="#f2d5d5"/><ellipse cx="1121" cy="589" rx="29" ry="6" fill="#5a3a2a"/></g>` + steam(1121, 572, .8);
    // ── 캐릭터 (뒷모습) ──
    s += `<g class="fm-breath">
      <!-- 왼팔(책상에 올린 팔꿈치) -->
      <ellipse cx="652" cy="676" rx="54" ry="30" fill="#4f7d74"/>
      <!-- 오른팔(필기하는 손) -->
      <g class="fm-write"><ellipse cx="952" cy="672" rx="56" ry="30" fill="#7fb5a5"/><ellipse cx="992" cy="650" rx="20" ry="14" fill="#efc2a4"/><path d="M988 652 l26 -30" stroke="#FFD25E" stroke-width="7" stroke-linecap="round"/></g>
      <!-- 몸통(후드티) -->
      <path d="M690 548 C 700 520, 900 520, 910 548 C 960 580, 975 640, 985 900 L 615 900 C 625 640, 640 580, 690 548 Z" fill="url(#rhood${id})"/>
      <path d="M760 600 C 780 640, 790 700, 788 760" stroke="#5d8f83" stroke-width="5" fill="none" opacity=".6"/>
      <!-- 후드 -->
      <path d="M712 540 C 730 500, 870 500, 888 540 C 880 580, 720 580, 712 540 Z" fill="#5d8f83"/>
      <path d="M730 545 C 760 568, 840 568, 870 545" stroke="#4a766c" stroke-width="5" fill="none"/>
      <!-- 머리: 음악에 맞춰 까딱 -->
      <g class="fm-bob">
        <rect x="782" y="488" width="36" height="34" rx="12" fill="#e2b090"/>
        <circle cx="737" cy="452" r="12" fill="#efc2a4"/><circle cx="863" cy="452" r="12" fill="#efc2a4"/>
        <circle cx="733" cy="456" r="6" fill="#ffffff"/><circle cx="867" cy="456" r="6" fill="#ffffff"/>
        <path d="M740 440 C 738 380, 862 380, 860 440 C 862 470, 852 492, 800 494 C 748 492, 738 470, 740 440 Z" fill="url(#rhair${id})"/>
        <path d="M748 470 C 770 488, 830 488, 852 470" stroke="#4b3a5e" stroke-width="4" fill="none" opacity=".7"/>
        <circle cx="800" cy="372" r="32" fill="url(#rhair${id})"/>
        <path d="M776 366 C 790 352, 812 352, 824 368" stroke="#4b3a5e" stroke-width="4" fill="none" opacity=".7"/>
        <g class="fm-pencil"><path d="M752 352 L 856 388" stroke="#FFD25E" stroke-width="9" stroke-linecap="round"/><path d="M856 388 l14 5" stroke="#f0a0a0" stroke-width="9" stroke-linecap="round"/><path d="M752 352 l-8 -3" stroke="#3a3446" stroke-width="5" stroke-linecap="round"/></g>
        <path d="M748 412 C 760 392, 790 386, 812 392" stroke="#FFC37A" stroke-width="3" fill="none" opacity=".35"/>
      </g>
      <!-- 화면 빛이 어깨에 비친 가장자리 -->
      <path d="M690 548 C 668 566, 650 590, 640 620" stroke="#9fd0ff" stroke-width="4" fill="none" opacity=".35"/>
      <path d="M910 548 C 940 566, 960 600, 968 640" stroke="#FFC37A" stroke-width="4" fill="none" opacity=".4"/>
    </g>`;
    // 의자 등받이 (가장 앞)
    s += `<path d="M690 740 C 690 712, 910 712, 910 740 L 918 900 L 682 900 Z" fill="#2f2440"/><path d="M700 742 C 720 726, 880 726, 900 742" stroke="#43365a" stroke-width="5" fill="none"/>`;
    s += vignette(id);
    return s;
  }

  const builders = { window: windowScene, cafe: cafeScene, library: libraryScene, room: roomScene };
  window.FMScene = kind => {
    const id = ++uid;
    return `<svg class="fm-scene-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${builders[kind](id)}</svg>`;
  };
})();
