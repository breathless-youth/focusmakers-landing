// 포커스메이커스 사운드: 빗소리·카페 소음·장작 + 로파이 음악
// assets/lofi.mp3 가 있으면 그 파일을, 없으면 브라우저에서 로파이 코드를 직접 연주해요.
(() => {
  const presets = {
    final:   { rain: 0,  cafe: 0,  fire: 0,  page: 0,  music: .8 },   // 마지막(새벽 옥상·캐릭터): 로파이만
    cover:   { rain: 0,  cafe: 0,  fire: 0,  page: 0,  music: .8 },   // 첫 화면(캐릭터): 로파이만
    window:  { rain: 70, cafe: 0,  fire: 12, page: 0,  music: .55 },
    cafe:    { rain: 0,  cafe: 75, fire: 0,  page: 0,  music: .6 },   // 카페: 빗소리 없이 웅성거림 + 로파이
    library: { rain: 0,  cafe: 0,  fire: 0,  page: 70, music: .3 },   // 도서관: 조용한 공기 + 책장 넘기는 소리만
    room:    { rain: 0,  cafe: 0,  fire: 0,  page: 0,  music: .8 },   // 캐릭터 방: 로파이만
  };
  const level = { rain: .85, cafe: 1.3, fire: 1.1, page: 1.2 };
  const CH = ["rain", "cafe", "fire", "page"];
  const mix = { ...presets.cover };
  let A = null, on = false, musicLevel = presets.cover.music;
  const listeners = new Set();
  const emit = () => listeners.forEach(fn => fn(on));

  function noise(ac, sec, brown) {
    const len = Math.floor(ac.sampleRate * sec), buf = ac.createBuffer(2, len, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch); let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,last=0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        if (brown) { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; continue; }
        b0=.99886*b0+w*.0555179; b1=.99332*b1+w*.0750759; b2=.969*b2+w*.153852; b3=.8665*b3+w*.3104856; b4=.55*b4+w*.5329522; b5=-.7616*b5-w*.016898;
        d[i] = (b0+b1+b2+b3+b4+b5+b6+w*.5362)*.11; b6 = w*.115926;
      }
    }
    return buf;
  }

  /* ───────── 카페 웅성거림 합성 ─────────
     목소리 하나 = 톱니파(성대) + 숨소리 → 모음 포먼트 필터 3개 → 음절 단위 크기 변화.
     8명을 좌우로 흩어 놓고, 멀리서 들리도록 고음을 깎고 방 울림을 더해요.
     말 내용은 알아들을 수 없고 "카페의 웅성거림"으로만 들려요. */
  const VOWELS = [[730, 1090, 2440], [530, 1840, 2480], [270, 2290, 3010], [570, 840, 2410], [300, 870, 2240], [500, 1500, 2500], [660, 1700, 2400]];
  function impulse(ac, sec, decay) {
    const len = Math.floor(ac.sampleRate * sec), buf = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  }
  function buildCafe(ac, out) {
    // 방 울림
    const room = ac.createConvolver(); room.buffer = impulse(ac, 1.8, 2.6);
    const wet = ac.createGain(); wet.gain.value = .55; room.connect(wet).connect(out);
    // 멀리서 들리는 느낌
    const far = ac.createBiquadFilter(); far.type = "lowpass"; far.frequency.value = 3400; far.Q.value = .4;
    const low = ac.createBiquadFilter(); low.type = "highpass"; low.frequency.value = 220;
    const presence = ac.createBiquadFilter(); presence.type = "peaking"; presence.frequency.value = 1500; presence.Q.value = .8; presence.gain.value = 7;
    const babble = ac.createGain(); babble.gain.value = 1.1;
    babble.connect(presence);
    presence.connect(low).connect(far); far.connect(out); far.connect(room);
    // 공간 소음(에어컨 같은 아주 낮은 바닥 소리) — 목소리를 가리지 않게 작게
    const tone = ac.createBufferSource(); tone.buffer = noise(ac, 6, true); tone.loop = true;
    const tlp = ac.createBiquadFilter(); tlp.type = "lowpass"; tlp.frequency.value = 300;
    const tg = ac.createGain(); tg.gain.value = .06; tone.connect(tlp).connect(tg).connect(out); tone.start();

    const breath = noise(ac, 2);
    const voices = [];
    for (let i = 0; i < 8; i++) {
      const female = Math.random() < .5, f0 = female ? 175 + Math.random() * 60 : 100 + Math.random() * 40;
      const osc = ac.createOscillator(); osc.type = "sawtooth"; osc.frequency.value = f0;
      const vib = ac.createOscillator(); vib.frequency.value = 4.5 + Math.random() * 1.5; const vg = ac.createGain(); vg.gain.value = f0 * .015; vib.connect(vg).connect(osc.frequency); vib.start();
      const src = ac.createGain(); src.gain.value = .5; osc.connect(src);
      const nb = ac.createBufferSource(); nb.buffer = breath; nb.loop = true; const ng = ac.createGain(); ng.gain.value = .25; nb.connect(ng).connect(src); nb.start(0, Math.random() * 1.5);
      const env = ac.createGain(); env.gain.value = 0;
      const bps = [[8, 1], [10, .8], [12, .45]].map(([q, amp], k) => {
        const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = VOWELS[0][k] * (female ? 1.15 : 1); bp.Q.value = q;
        const fg = ac.createGain(); fg.gain.value = amp; src.connect(bp).connect(fg).connect(env); return bp;
      });
      const vol = ac.createGain(); vol.gain.value = (.35 + Math.random() * .45) * (i < 3 ? 1 : .7); // 가까운 테이블 2~3명, 나머지는 멀리
      let node = env.connect(vol);
      if (ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.value = Math.random() * 1.6 - .8; node = vol.connect(p); }
      node.connect(babble);
      osc.start();
      voices.push({ osc, env, bps, f0, female, next: ac.currentTime + Math.random() * 3, left: 0 });
    }
    function schedule() {
      if (ac.state !== "running" || mix.cafe <= 0) { voices.forEach(v => { v.next = Math.max(v.next, ac.currentTime); }); return; }
      const until = ac.currentTime + .5;
      for (const v of voices) {
        while (v.next < until) {
          const t = Math.max(v.next, ac.currentTime);
          if (v.left <= 0) { // 말 사이 쉬는 시간
            v.env.gain.setTargetAtTime(0, t, .06);
            v.left = 4 + Math.floor(Math.random() * 16);
            v.base = v.f0 * (.92 + Math.random() * .2);
            v.next = t + .4 + Math.random() * (Math.random() < .25 ? 4 : 1.6);
            continue;
          }
          const d = .11 + Math.random() * .17, V = VOWELS[Math.floor(Math.random() * VOWELS.length)], a = .25 + Math.random() * .75;
          v.bps.forEach((bp, k) => bp.frequency.setTargetAtTime(V[k] * (v.female ? 1.15 : 1) * (.92 + Math.random() * .16), t, .025));
          v.osc.frequency.setTargetAtTime(v.base * (.9 + Math.random() * .22) * (v.left === 1 ? .85 : 1), t, .05); // 문장 끝은 살짝 내려가게
          v.env.gain.setTargetAtTime(a, t, .02);
          v.env.gain.setTargetAtTime(a * .12, t + d * .62, .025); // 자음처럼 잠깐 줄어드는 순간
          v.left--; v.next = t + d;
        }
      }
    }
    setInterval(schedule, 150);

    // 잔·스푼·접시 소리
    function clink(t, f, vol, dur) {
      [[1, 1], [2.76, .45], [5.4, .2]].forEach(([m, a]) => {
        const o = ac.createOscillator(), e = ac.createGain(); o.frequency.value = f * m;
        e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(vol * a, t + .003); e.gain.exponentialRampToValueAtTime(.0001, t + dur / m);
        o.connect(e).connect(out); e.connect(room); o.start(t); o.stop(t + dur + .05);
      });
    }
    (function dishes() {
      if (ac.state === "running" && mix.cafe > 5) {
        const t = ac.currentTime + .02, r = Math.random();
        if (r < .45) clink(t, 1900 + Math.random() * 1400, .05, .5);                       // 잔 내려놓는 소리
        else if (r < .75) { for (let k = 0; k < 4 + Math.random() * 5; k++) clink(t + k * (.09 + Math.random() * .05), 3200 + Math.random() * 600, .018, .12); } // 스푼으로 젓는 소리
        else { clink(t, 1500 + Math.random() * 500, .04, .35); clink(t + .07, 2100 + Math.random() * 500, .03, .3); } // 접시 부딪힘
      }
      setTimeout(dishes, 900 + Math.random() * 2600);
    })();
    // 가끔 들리는 에스프레소 머신 스팀
    const hissBuf = noise(ac, 3);
    (function steam() {
      if (ac.state === "running" && mix.cafe > 20 && Math.random() < .5) {
        const s = ac.createBufferSource(); s.buffer = hissBuf; const hp = ac.createBiquadFilter(); hp.type = "bandpass"; hp.frequency.value = 5200; hp.Q.value = .7;
        const e = ac.createGain(), t = ac.currentTime, dur = 1.5 + Math.random() * 1.2;
        e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(.05, t + .25); e.gain.setValueAtTime(.05, t + dur - .3); e.gain.exponentialRampToValueAtTime(.0001, t + dur);
        s.connect(hp).connect(e); e.connect(out); e.connect(room); s.start(t); s.stop(t + dur + .05);
      }
      setTimeout(steam, 14000 + Math.random() * 16000);
    })();
  }
  /* 실제 녹음 파일 재생기
     - 오디오 요소를 처음부터 Web Audio 그래프에 연결해서, 볼륨이 항상 믹서를 따라가요
     - 여러 주소를 순서대로 시도하고, 다 실패하면 onFail(합성 소리 유지)
     - 아이폰은 '탭한 순간'에만 재생을 허락하므로 소리를 켤 때 media 목록 전체에 play()를 걸어요 */
  const media = [];
  function filePlayer(ac, dest, urls, { volume = 1, onReady, onFail } = {}) {
    const el = new Audio(); el.loop = true; el.preload = "auto"; el.crossOrigin = "anonymous";
    const g = ac.createGain(); g.gain.value = 0; g.connect(dest);
    ac.createMediaElementSource(el).connect(g);
    let i = 0, ready = false;
    const next = () => {
      if (i >= urls.length) { el.removeAttribute("src"); const k = media.indexOf(el); if (k >= 0) media.splice(k, 1); onFail && onFail(); return; }
      el.src = urls[i++]; el.load();
    };
    el.addEventListener("error", () => { if (!ready) next(); });
    el.addEventListener("canplay", () => {
      if (ready) return; ready = true;
      g.gain.setTargetAtTime(volume, ac.currentTime, .4);
      onReady && onReady(el);
      if (on) el.play().catch(() => {});
    });
    media.push(el);
    next();
    return el;
  }
  const PAGE_URLS = () => {
    const cfg = (window.FM_CONFIG && window.FM_CONFIG.PAGE_AUDIO) || "";
    return ["/lofi/assets/page.mp3", cfg].filter(Boolean);
  };
  const CAFE_URLS = () => {
    const cfg = (window.FM_CONFIG && window.FM_CONFIG.CAFE_AUDIO) || "";
    return ["/lofi/assets/cafe.mp3", cfg].filter(Boolean);
  };

  function setup() {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    const ch = {};
    // 빗소리
    { const s = ac.createBufferSource(); s.buffer = noise(ac, 4); s.loop = true;
      const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 140;
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1500;
      const g = ac.createGain(); g.gain.value = 0; s.connect(hp).connect(lp).connect(g).connect(master); s.start(); ch.rain = g;
      const db = noise(ac, .05);
      (function drip() {
        if (ac.state === "running" && mix.rain > 0) {
          const x = ac.createBufferSource(); x.buffer = db; const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1800 + Math.random() * 3200; bp.Q.value = 8;
          const e = ac.createGain(), t = ac.currentTime; e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(.2 * Math.random() * (mix.rain / 100) + .0002, t + .005); e.gain.exponentialRampToValueAtTime(.0001, t + .06);
          x.connect(bp).connect(e).connect(master); x.start(t); x.stop(t + .08);
        }
        setTimeout(drip, 50 + Math.random() * 220);
      })(); }
    // 카페: 여러 사람이 멀리서 이야기하는 소리 + 공간 울림 + 잔·스푼 소리
    { const g = ac.createGain(); g.gain.value = 0; g.connect(master); ch.cafe = g;
      const synthBus = ac.createGain(); synthBus.connect(g); ch.cafeSynth = synthBus;
      buildCafe(ac, synthBus);
      // 실제 카페 녹음이 준비되면 합성 웅성거림은 끄고(잔·스푼 소리도 녹음에 들어 있음) 녹음으로 교체
      filePlayer(ac, g, CAFE_URLS(), { volume: .85, onReady: () => synthBus.gain.setTargetAtTime(0, ac.currentTime, .4) }); }
    // 장작
    { const s = ac.createBufferSource(); s.buffer = noise(ac, 5, true); s.loop = true;
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 400;
      const g = ac.createGain(); g.gain.value = 0; s.connect(lp).connect(g).connect(master); s.start(); ch.fire = g;
      const cb = noise(ac, .02);
      (function crack() {
        if (ac.state === "running" && mix.fire > 0) {
          const x = ac.createBufferSource(); x.buffer = cb; const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 900 + Math.random() * 2500;
          const e = ac.createGain(), t = ac.currentTime; e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(.45 * Math.random() * mix.fire / 100 + .0002, t + .002); e.gain.exponentialRampToValueAtTime(.0001, t + .03 + Math.random() * .05);
          x.connect(hp).connect(e).connect(g); x.start(t); x.stop(t + .1);
        }
        setTimeout(crack, 30 + Math.random() * (Math.random() < .2 ? 600 : 140));
      })(); }
    // 책장 넘기는 소리: 실제 녹음(Mixkit "Single book paging")을 4~11초마다 한 번씩, 좌우 위치를 조금씩 바꿔 재생
    //   + 아주 낮은 실내 공기음(도서관의 정적)
    { const g = ac.createGain(); g.gain.value = 0; g.connect(master); ch.page = g;
      const air = ac.createBufferSource(); air.buffer = noise(ac, 5, true); air.loop = true;
      const alp = ac.createBiquadFilter(); alp.type = "lowpass"; alp.frequency.value = 500;
      const ag = ac.createGain(); ag.gain.value = .12; air.connect(alp).connect(ag).connect(g); air.start();
      let buf = null;
      (async () => {
        for (const u of PAGE_URLS()) {
          try { const r = await fetch(u); if (!r.ok) continue; buf = await ac.decodeAudioData(await r.arrayBuffer()); break; } catch (_) {}
        }
      })();
      const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 120; hp.connect(g);
      let timer = null;
      const turn = () => {
        clearTimeout(timer);
        if (buf && on && ac.state === "running" && mix.page > 0) {
          const s = ac.createBufferSource(); s.buffer = buf; s.playbackRate.value = .94 + Math.random() * .12;
          const p = ac.createStereoPanner ? ac.createStereoPanner() : null; const v = ac.createGain(); v.gain.value = .6 + Math.random() * .4;
          if (p) { p.pan.value = (Math.random() - .5) * .8; s.connect(v).connect(p).connect(hp); } else s.connect(v).connect(hp);
          // 녹음 안에 두 번 넘기는 소리가 있어서, 절반은 한 장만(앞부분만) 재생
          s.start(ac.currentTime, .15, Math.random() < .5 ? 1.1 : undefined);
        }
        timer = setTimeout(turn, 4000 + Math.random() * 7000);
      };
      turn();
      // 도서관으로 넘어오면 첫 장은 곧바로 들리게
      ch.pageSoon = () => { clearTimeout(timer); timer = setTimeout(turn, 900); };
    }

    // 음악 버스
    const music = ac.createGain(); music.gain.value = 0; music.connect(master);
    A = { ac, master, ch, music, file: null, synth: null };
    tryFile();
  }

  /* 로파이 파일 → 없으면 합성 */
  /* 배경음: assets/lofi.mp3 (Suno "실유의 리듬", 72bpm 로파이) → 못 불러오면 브라우저 합성 음악
     - 파일이 늦게 준비되면 일단 합성 음악으로 시작했다가, 준비되는 순간 파일로 자연스럽게 넘어가요 */
  function tryFile() {
    let fileReady = false, failed = false;
    filePlayer(A.ac, A.music, ["/lofi/assets/lofi.mp3"], {
      volume: .8,
      onReady: () => { fileReady = true; stopSynth(); },
      onFail: () => { failed = true; if (!A.synth) startSynth(); },
    });
    setTimeout(() => { if (!fileReady && !failed && !A.synth) startSynth(); }, 4000);
  }
  function stopSynth() {
    if (!A.synth) return;
    clearInterval(A.synth); A.synth = null;
    try { A.vin && A.vin.stop(A.ac.currentTime + 1.5); } catch (_) {}
    const g = A.synthOut && A.synthOut.gain, t = A.ac.currentTime;
    if (g) { g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0, t + 1.5); }
  }

  function startSynth() {
    const ac = A.ac, out = ac.createGain(); out.gain.value = .55; A.synthOut = out;
    const warm = ac.createBiquadFilter(); warm.type = "lowpass"; warm.frequency.value = 1900; warm.Q.value = .3;
    // 살짝 늘어지는 테이프 느낌
    const wob = ac.createDelay(); wob.delayTime.value = .012;
    const wl = ac.createOscillator(); wl.frequency.value = .4; const wg = ac.createGain(); wg.gain.value = .0018; wl.connect(wg).connect(wob.delayTime); wl.start();
    out.connect(warm).connect(wob).connect(A.music);
    // 바이닐 잡음
    const vin = ac.createBufferSource(); vin.buffer = noise(ac, 3); vin.loop = true; const vhp = ac.createBiquadFilter(); vhp.type = "highpass"; vhp.frequency.value = 3000; const vg = ac.createGain(); vg.gain.value = .025; vin.connect(vhp).connect(vg).connect(A.music); vin.start(); A.vin = vin;
    const pop = noise(ac, .01);

    const bpm = 72, beat = 60 / bpm, bar = beat * 4;
    const m = n => 440 * Math.pow(2, (n - 69) / 12);
    // Fmaj9 – Em7 – Dm9 – Cmaj7
    const chords = [[53, 57, 60, 64, 67], [52, 55, 59, 62, 66], [50, 53, 57, 60, 64], [48, 52, 55, 59, 62]];
    const bass = [41, 40, 38, 36];
    const snareBuf = noise(ac, .25);

    function epiano(t, note, dur, vel) {
      const f = m(note);
      [[1, "sine", 1], [2.003, "sine", .18], [4.01, "triangle", .05]].forEach(([mul, type, amp]) => {
        const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f * mul; o.detune.value = (Math.random() - .5) * 8;
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vel * amp, t + .012); g.gain.exponentialRampToValueAtTime(vel * amp * .35, t + .5); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
        o.connect(g).connect(out); o.start(t); o.stop(t + dur + .05);
      });
    }
    function bassNote(t, note, dur) {
      const o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 300; o.type = "triangle"; o.frequency.value = m(note);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.22, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(lp).connect(g).connect(out); o.start(t); o.stop(t + dur + .05);
    }
    function kick(t) {
      const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + .12);
      g.gain.setValueAtTime(.32, t); g.gain.exponentialRampToValueAtTime(.0001, t + .32); o.connect(g).connect(out); o.start(t); o.stop(t + .35);
    }
    function snare(t, v = .09) {
      const s = ac.createBufferSource(); s.buffer = snareBuf; const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = .7;
      const g = ac.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .18); s.connect(bp).connect(g).connect(out); s.start(t); s.stop(t + .25);
    }
    function hat(t, v) {
      const s = ac.createBufferSource(); s.buffer = snareBuf; const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 7000;
      const g = ac.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .05); s.connect(hp).connect(g).connect(out); s.start(t); s.stop(t + .08);
    }
    let next = ac.currentTime + .2, step = 0;
    const swing = beat * .16;
    function schedule() {
      while (next < ac.currentTime + .6) {
        const barIdx = Math.floor(step / 8) % 4, eighth = step % 8, t = next + (eighth % 2 ? swing : 0);
        if (eighth === 0) {
          chords[barIdx].forEach((n, i) => epiano(t + i * .035, n, bar * .95, .06));
          bassNote(t, bass[barIdx], beat * 1.6);
        }
        if (eighth === 5) bassNote(t, bass[barIdx] + 7, beat * .9);
        if (eighth === 6 && barIdx % 2) epiano(t, chords[barIdx][4] + 12, beat * 1.5, .035);
        if (eighth === 0 || eighth === 3 && step % 16 > 8) kick(t);
        if (eighth === 4) snare(t);
        hat(t, eighth % 2 ? .012 : .02);
        if (Math.random() < .08) { const s = ac.createBufferSource(); s.buffer = pop; const g = ac.createGain(); g.gain.value = .05; s.connect(g).connect(A.music); s.start(t); }
        next += beat / 2; step++;
      }
    }
    A.synth = setInterval(() => { if (ac.state === "running") schedule(); else next = ac.currentTime + .2; }, 120);
  }

  function apply(ramp = .6) {
    if (!A) return;
    const t = A.ac.currentTime;
    for (const k of CH) { const g = A.ch[k].gain; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime((mix[k] / 100) * level[k], t + ramp); }
    const mg = A.music.gain; mg.cancelScheduledValues(t); mg.setValueAtTime(mg.value, t); mg.linearRampToValueAtTime(musicLevel, t + ramp * 1.5);
  }

  window.FMSound = {
    get on() { return on; },
    mix,
    async set(next) {
      // 아이폰 무음 스위치가 켜져 있어도 소리가 나도록 (iOS 17+)
      try { if (next && navigator.audioSession) navigator.audioSession.type = "playback"; } catch (_) {}
      if (!A) setup();
      if (next && A.ac.state !== "running") {
        try { await Promise.race([A.ac.resume(), new Promise(r => setTimeout(r, 800))]); } catch (_) {}
        // 브라우저가 아직 허락하지 않았으면(스크롤 터치 등) 켜진 척하지 않아요
        if (A.ac.state !== "running") { on = false; emit(); return false; }
      }
      on = !!next;
      const t = A.ac.currentTime;
      A.master.gain.cancelScheduledValues(t); A.master.gain.setValueAtTime(A.master.gain.value, t);
      A.master.gain.linearRampToValueAtTime(on ? .9 : 0, t + (on ? 2.4 : .5));
      media.forEach(f => { if (on) { if (f.getAttribute("src")) f.play().catch(() => {}); } else setTimeout(() => !on && f.pause(), 600); });
      apply(.01);
      emit();
      return on;
    },
    get presets() { return presets; },
    _ctx() { return A; },
    scene(kind, ramp = 1.6) {
      const was = mix.page; Object.assign(mix, presets[kind]); musicLevel = presets[kind].music; apply(ramp);
      if (A && mix.page > 0 && !was) A.ch.pageSoon();
    },
    channel(k, v) { if (k === "music") musicLevel = v / 100; else mix[k] = v; apply(.3); },
    get music() { return Math.round(musicLevel * 100); },
    onChange(fn) { listeners.add(fn); },
  };
})();
