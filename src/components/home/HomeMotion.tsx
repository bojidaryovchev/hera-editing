"use client";

import { useEffect } from "react";
import { HOME } from "@/content/home";
import { VIDEO_PLAYER } from "@/content/work";

/*
 * Motion for the homepage (direction A, decision 7): the scroll drives the hero's playhead through one edit, the
 * process clips slide under a playhead, the final edit renders and plays. The markup is server-rendered and complete;
 * this component only adds behaviour. GSAP loads after the page is interactive. Without motion (reduced motion, or
 * if GSAP fails to load) the page shows the finished edit and videos play only on request.
 */

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerT = typeof import("gsap/ScrollTrigger").ScrollTrigger;

const REEL = 12;
const FPS = 24;
const STAGES = HOME.hero.stages;
const E = HOME.hero.editor;
const BOUNDS = [0, 0.16, 0.34, 0.5, 0.68, 0.84];

const pad2 = (n: number) => String(n).padStart(2, "0");
const timecode = (sec: number) => `00:00:${pad2(Math.floor(sec))}:${pad2(Math.floor((sec % 1) * FPS))}`;
function one<T extends Element = HTMLElement>(root: ParentNode, sel: string): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`HomeMotion: missing ${sel}`);
  return el;
}
const all = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Stage texts and marks for the inspector (wide) and the stage label and note (narrow). */
function stageView(main: HTMLElement) {
  const lis = all(main, ".insp li");
  const progs = all(main, "[data-mlist] li");
  const set = (sel: string, text: string) => all(main, sel).forEach((el) => (el.textContent = text));
  return (st: number, finished: boolean) => {
    const stage = STAGES[st];
    if (!stage) return;
    lis.forEach((li, i) => {
      li.classList.toggle("on", i === st && !finished);
      li.classList.toggle("done", i < st || finished);
    });
    progs.forEach((p, i) => {
      p.classList.toggle("on", i === st && !finished);
      p.classList.toggle("done", i < st || finished);
    });
    set("[data-stagename], [data-mstage]", stage.name);
    set("[data-mstep], [data-istep]", `0${st + 1} / 06`);
    set("[data-mnote], [data-inote]", stage.note);
  };
}
function setStatus(main: HTMLElement, state: "working" | "approved" | "published") {
  const chip = one(main, "[data-chip]");
  const status = one(main, "[data-statustext]");
  chip.className = state === "working" ? "chip" : state === "approved" ? "chip ok" : "chip pub";
  chip.textContent = state === "working" ? E.chipPending : state === "approved" ? E.chipApproved : E.chipPublished;
  status.textContent =
    state === "working" ? E.statusWorking : state === "approved" ? E.statusApproved : "Instagram · TikTok · Facebook";
}

/** One video with its play/pause button. A pause the visitor chose is respected until the clip leaves the screen. */
type Player = { item: HTMLElement; video: HTMLVideoElement; btn: HTMLButtonElement; name: string; userPaused: boolean };
function makePlayer(item: HTMLElement, btnSel: string, name: string): Player {
  return {
    item,
    video: one<HTMLVideoElement>(item, "video"),
    btn: one<HTMLButtonElement>(item, btnSel),
    name,
    userPaused: false,
  };
}
function setButton(p: Player, playing: boolean) {
  p.btn.dataset.playing = String(playing);
  p.btn.setAttribute("aria-label", `${playing ? VIDEO_PLAYER.pause : VIDEO_PLAYER.play}: ${p.name}`);
}
function play(p: Player) {
  if (!p.video.getAttribute("src") && p.video.dataset.src) p.video.src = p.video.dataset.src;
  const r = p.video.play();
  if (r) r.catch(() => setButton(p, false));
  p.item.classList.add("playing");
  setButton(p, true);
}
function stop(p: Player) {
  p.video.pause();
  p.item.classList.remove("playing");
  setButton(p, false);
}
const isPlaying = (p: Player) => p.item.classList.contains("playing");

/** Format tiles: buttons always; hover where there is a mouse; in motion mode on touch, the most visible tile. */
function setupFormats(main: HTMLElement, auto: boolean): () => void {
  const players = all(main, "[data-bin]").map((item) => makePlayer(item, "[data-vbtn]", item.dataset.name ?? ""));
  const solo = (p: Player) => players.forEach((o) => o !== p && isPlaying(o) && stop(o));
  const offs: Array<() => void> = [];
  const on = (el: EventTarget, ev: string, fn: EventListener) => {
    el.addEventListener(ev, fn);
    offs.push(() => el.removeEventListener(ev, fn));
  };
  players.forEach((p) =>
    on(p.btn, "click", () => {
      if (isPlaying(p)) {
        stop(p);
        p.userPaused = true;
      } else {
        solo(p);
        p.userPaused = false;
        play(p);
      }
    }),
  );
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  let io: IntersectionObserver | null = null;
  if (auto && canHover) {
    players.forEach((p) => {
      on(p.item, "mouseenter", () => {
        solo(p);
        play(p);
      });
      on(p.item, "mouseleave", () => isPlaying(p) && stop(p));
    });
  } else if (auto && !saveData && "IntersectionObserver" in window) {
    const ratios = new Map<HTMLElement, number>();
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target as HTMLElement, e.intersectionRatio));
        let best: Player | null = null;
        let top = 0.6;
        players.forEach((p) => {
          const r = ratios.get(p.item) ?? 0;
          if (r === 0) p.userPaused = false;
          if (r > top && !p.userPaused) {
            top = r;
            best = p;
          }
        });
        const chosen = best as Player | null;
        players.forEach((p) => p !== chosen && isPlaying(p) && !p.userPaused && stop(p));
        if (chosen && !isPlaying(chosen)) {
          solo(chosen);
          play(chosen);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.6, 0.75, 0.9, 1] },
    );
    players.forEach((p) => io?.observe(p.item));
  }
  return () => {
    offs.forEach((f) => f());
    io?.disconnect();
    players.forEach((p) => p.video.pause());
  };
}

/** The final preview's play/pause, shared by both modes; none when the preview is the designed frame. */
function previewPlayer(main: HTMLElement) {
  const pv = one(main, "[data-pv]");
  return { pv, player: pv.querySelector("video") ? makePlayer(pv, "[data-pvbtn]", HOME.final.caption) : null };
}

/** Reduced motion or no GSAP: the finished edit, nothing autoplays. */
function setupStatic(main: HTMLElement): () => void {
  document.documentElement.classList.remove("motion");
  stageView(main)(5, true);
  setStatus(main, "published");
  all(document, "[data-tc]").forEach((el) => (el.textContent = timecode(REEL)));
  const { player } = previewPlayer(main);
  const toggle = () => player && (isPlaying(player) ? stop(player) : play(player));
  player?.btn.addEventListener("click", toggle);
  const offFormats = setupFormats(main, false);
  return () => {
    player?.btn.removeEventListener("click", toggle);
    player?.video.pause();
    offFormats();
  };
}

function setupMotion(gsap: Gsap, ScrollTrigger: ScrollTriggerT, main: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const hero = one(main, "[data-hero]");
  const stage = one(main, "[data-stage-el]");
  const viewer = one(main, "[data-viewer]");
  const mon = one(main, ".mon");
  const card = one(main, "[data-card]");
  // The footage, or (in production until the agency's own exists) the designed frame in its place.
  const video = main.querySelector<HTMLVideoElement>("video[data-scrub]");
  const picture = video ?? one(main, ".mon__scene");
  const side = one(main, "[data-side]");
  const paneFmt = one(main, "[data-pane='fmt']");
  const panePub = one(main, "[data-pane='pub']");
  const mStage = one(main, ".m-stage");
  const mNote = one(main, "[data-mnote]");
  const mList = one(main, "[data-mlist]");
  const hdr = document.querySelector<HTMLElement>(".hdr");
  const headerBottom = () => hdr?.getBoundingClientRect().bottom ?? 0;
  const tlEl = one(main, ".tl");
  const pinwrap = one(main, "[data-pinwrap]");
  const fmt = one(main, "[data-format]");
  const exp = one(main, "[data-exp]");
  const segs = all(main, "[data-seg]");
  const cuts = all(main, "[data-cut]");
  const tcEls = all(document, "[data-tc]");
  const showStage = stageView(main);
  const offs: Array<() => void> = [];
  const on = (el: EventTarget, ev: string, fn: EventListener) => {
    el.addEventListener(ev, fn);
    offs.push(() => el.removeEventListener(ev, fn));
  };

  // The scrub needs the whole clip; fetch it now that motion runs.
  if (video) video.preload = "auto";

  // Grade: a canvas copy of the frame with the finished grade, revealed by the before/after wipe. The designed
  // frame needs no canvas: its graded copy is in the markup.
  const gradeCv = main.querySelector<HTMLCanvasElement>("canvas[data-grade]");
  const gctx = gradeCv?.getContext("2d") ?? null;
  const drawGrade = () => {
    if (!video || !gradeCv || !gctx || video.readyState < 2) return;
    const w = gradeCv.clientWidth;
    const h = gradeCv.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (gradeCv.width !== Math.round(w * dpr) || gradeCv.height !== Math.round(h * dpr)) {
      gradeCv.width = Math.round(w * dpr);
      gradeCv.height = Math.round(h * dpr);
    }
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const sc = Math.max(gradeCv.width / vw, gradeCv.height / vh);
    gctx.filter = "saturate(1.12) contrast(1.06) brightness(1.03)";
    gctx.drawImage(video, (gradeCv.width - vw * sc) / 2, (gradeCv.height - vh * sc) / 2, vw * sc, vh * sc);
  };
  if (video) {
    on(video, "seeked", drawGrade);
    on(video, "loadeddata", drawGrade);
  }

  // Wide 9:16 stage: the text and the vertical frame form one pair, centred in the monitor column (decision 8).
  const pairLayout = () => {
    const cs = getComputedStyle(stage);
    const cellW = parseFloat(cs.gridTemplateColumns.split(" ")[0] ?? "0");
    const cellH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const w9 = (cellH * 9) / 16;
    const gap = Math.max(32, Math.min(64, cellW * 0.05));
    const textW = Math.max(220, Math.min(cellW > 1400 ? 480 : 400, cellW - w9 - gap - 48));
    const left0 = Math.max(16, (cellW - textW - gap - w9) / 2);
    const sr = stage.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    return {
      shift: left0 + textW + gap + w9 / 2 - cellW / 2,
      left: sr.left - hr.left + parseFloat(cs.paddingLeft) + left0,
      top: sr.top - hr.top + parseFloat(cs.paddingTop) + cellH / 2,
      width: textW,
    };
  };
  const placeSide = () => {
    if (window.innerWidth < 900) return;
    const L = pairLayout();
    side.style.left = `${L.left}px`;
    side.style.top = `${L.top}px`;
    side.style.width = `${L.width}px`;
  };
  // Narrow screens: how wide the vertical frame may grow once the label, note and timeline have their room.
  const phoneW = () => {
    const pcs = getComputedStyle(pinwrap);
    const cs = getComputedStyle(stage);
    const gap = parseFloat(cs.rowGap) || 12;
    const innerW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const avail =
      pinwrap.clientHeight -
      parseFloat(pcs.paddingTop) -
      parseFloat(pcs.paddingBottom) -
      tlEl.offsetHeight -
      parseFloat(cs.paddingTop) -
      parseFloat(cs.paddingBottom) -
      mStage.offsetHeight -
      mNote.offsetHeight -
      gap * 2 -
      8;
    return Math.max(160, Math.min(innerW, (avail * 9) / 16));
  };
  placeSide();
  on(window, "resize", placeSide);
  const onRefreshInit = () => gsap.set(viewer, { clearProps: "aspectRatio,width,x" });
  const onRefresh = () => {
    placeSide();
    drawGrade();
  };
  ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
  ScrollTrigger.addEventListener("refresh", onRefresh);
  offs.push(() => {
    ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
  });

  let vTarget = 0;
  let vPending = false;
  const scrubTo = (sec: number) => {
    vTarget = sec;
    if (vPending) return;
    vPending = true;
    requestAnimationFrame(() => {
      vPending = false;
      if (video && video.readyState >= 1 && Math.abs(video.currentTime - vTarget) > 0.02) video.currentTime = vTarget;
    });
  };
  let lastKey = "";
  const setStage = (p: number) => {
    let st = 0;
    BOUNDS.forEach((b, i) => {
      if (p >= b) st = i;
    });
    const fin = p > 0.97;
    const key = `${st}${fin ? "f" : ""}`;
    if (key === lastKey) return;
    lastKey = key;
    showStage(st, fin);
  };

  let mm: ReturnType<Gsap["matchMedia"]> | undefined;
  const ctx = gsap.context(() => {
    mm = gsap.matchMedia();
    const m = mm;
    m.add({ desk: "(min-width: 900px)", phone: "(max-width: 899px)" }, (c) => {
      const desk = Boolean(c.conditions?.desk);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: desk ? hero : pinwrap,
          // Narrow screens pin the edit block just under the fixed header, so no empty band is reserved above it.
          start: desk ? "top top" : () => `top top+=${headerBottom()}`,
          end: `+=${desk ? 320 : 260}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            scrubTo(Math.min(REEL - 0.05, p * REEL));
            const tc = timecode(p * REEL);
            tcEls.forEach((el) => (el.textContent = tc));
            setStage(p);
            fmt.textContent = p > 0.72 ? E.tall : E.wide;
            exp.style.setProperty("--exp", String(gsap.utils.clamp(0, 1, (p - 0.84) / 0.12)));
            const sg = Math.min(5, Math.floor(p * 6));
            segs.forEach((s, i) => s.classList.toggle("on", i === sg));
            setStatus(main, p < 0.84 ? "working" : p < 0.93 ? "approved" : "published");
          },
        },
      });
      tl.to("[data-ph]", { left: "100%", duration: 1 }, 0);
      if (desk) tl.to(card, { autoAlpha: 0, y: -24, duration: 0.07 }, 0.02);
      // Cut: the raw block splits into six clips, blade by blade.
      tl.to("[data-raw]", { autoAlpha: 0, duration: 0.03 }, 0.2);
      cuts.forEach((c2, i) => tl.to(c2, { opacity: 1, scaleY: 1, duration: 0.02 }, 0.17 + i * 0.025));
      segs.forEach((s, i) => tl.to(s, { opacity: 1, duration: 0.02 }, 0.18 + i * 0.025));
      // Grade: a wipe reveals the graded image, then the whole frame is graded.
      tl.set("[data-split]", { opacity: 1 }, 0.355)
        .to(".mon__grade", { clipPath: "inset(0 0% 0 0)", duration: 0.12 }, 0.36)
        .to("[data-split]", { left: "100%", duration: 0.12 }, 0.36)
        .set("[data-split]", { opacity: 0 }, 0.48)
        .fromTo(
          picture,
          { filter: "saturate(0.32) contrast(0.86) brightness(0.96)" },
          { filter: "saturate(1.12) contrast(1.06) brightness(1.03)", duration: 0.01, immediateRender: false },
          0.48,
        )
        .set(".mon__grade", { autoAlpha: 0 }, 0.49);
      // Subtitles: the headline is burned into the video.
      tl.to("[data-title='1']", { opacity: 1, duration: 0.02 }, 0.52)
        .to("[data-sub='1']", { opacity: 1, duration: 0.02 }, 0.53)
        .to("[data-sub='1']", { opacity: 0, duration: 0.02 }, 0.6)
        .to("[data-title='2']", { opacity: 1, duration: 0.02 }, 0.6)
        .to("[data-sub='2']", { opacity: 1, duration: 0.02 }, 0.61)
        .to("[data-sub='2']", { opacity: 0, duration: 0.02 }, 0.68);
      // Reframe to 9:16 with safe-area guides; on wide screens the frame slides into its pair with the text.
      tl.to(".safe", { opacity: 1, duration: 0.03 }, 0.66)
        .to(
          viewer,
          desk
            ? { aspectRatio: "9 / 16", x: () => pairLayout().shift, duration: 0.12, ease: "power2.inOut" }
            : { aspectRatio: "9 / 16", width: phoneW, duration: 0.12, ease: "power2.inOut" },
          0.7,
        )
        .to(mon, { borderRadius: 26, duration: 0.12 }, 0.7)
        .to(
          mList,
          desk ? { duration: 0.12 } : { height: 0, marginTop: 0, autoAlpha: 0, duration: 0.12, ease: "power2.inOut" },
          0.7,
        )
        .to(".safe", { opacity: 0, duration: 0.03 }, 0.86);
      if (desk) {
        tl.fromTo(paneFmt, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.04 }, 0.76)
          .to(paneFmt, { autoAlpha: 0, x: -12, duration: 0.025 }, 0.855)
          .fromTo(panePub, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.04 }, 0.875);
      }
      return () => gsap.set([viewer, mon, picture, card, paneFmt, panePub, mList], { clearProps: "all" });
    });

    // Problem: words take colour as the visitor reads.
    gsap.to(".problem__h .w", {
      color: "#101315",
      stagger: 0.12,
      ease: "none",
      scrollTrigger: { trigger: ".problem__h", start: "top 80%", end: "bottom 45%", scrub: true },
    });

    // Problem: a playhead sweeps the twelve weeks and the planned posts appear behind it, one a week.
    const rClips = all(main, "[data-rclip]");
    const rt = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: "[data-problem]", start: "top 70%", end: "bottom 75%", scrub: 0.4 },
    });
    rt.to("[data-rph]", { left: "100%", duration: 1 }, 0);
    rClips.forEach((c2, i) =>
      rt.to(c2, { opacity: 1, scaleY: 1, duration: 0.05, ease: "power2.out" }, (i + 0.5) / 12 - 0.03),
    );

    // Process (wide): a playhead travels from the start of the first clip to the end of the last. Like an editor
    // timeline, the view follows once the playhead reaches the middle, so the story starts at clip 1 and ends at clip 6.
    const clips = all(main, ".pclip");
    const thumb = (c2: HTMLElement) => one(c2, ".pclip__thumb i");
    m.add("(min-width: 900px)", () => {
      const track = one(main, "[data-track]");
      const vp = track.parentElement ?? main;
      const ph = one(main, ".proc__ph");
      const geo = { p0: 0, p1: 0, max: 0, mid: 0 };
      const measure = () => {
        const first = clips[0];
        const last = clips[clips.length - 1];
        if (!first || !last) return;
        geo.p0 = first.offsetLeft;
        geo.p1 = last.offsetLeft + last.offsetWidth;
        geo.max = Math.max(0, geo.p1 + parseFloat(getComputedStyle(track).paddingRight) - vp.clientWidth);
        geo.mid = vp.clientWidth / 2;
      };
      const state = { p: 0 };
      const apply = () => {
        const P = geo.p0 + (geo.p1 - geo.p0) * state.p;
        const shift = gsap.utils.clamp(0, geo.max, P - geo.mid);
        gsap.set(track, { x: -shift });
        ph.style.left = `${P - shift}px`;
        clips.forEach((c2) => {
          const l = c2.offsetLeft;
          const r = l + c2.offsetWidth;
          c2.classList.toggle("on", P >= l && P <= r);
          thumb(c2).style.width = `${gsap.utils.clamp(0, 1, (P - l) / (r - l)) * 100}%`;
        });
      };
      measure();
      apply();
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: {
          trigger: "[data-proc]",
          start: "top top",
          end: () => {
            measure();
            return `+=${geo.p1 - geo.p0}`;
          },
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onRefresh: apply,
        },
      });
      return () => {
        gsap.set(track, { clearProps: "x" });
        ph.style.left = "";
      };
    });
    m.add("(max-width: 899px)", () => {
      clips.forEach((c2) =>
        ScrollTrigger.create({
          trigger: c2,
          start: "top 70%",
          end: "bottom 45%",
          toggleClass: "on",
          onUpdate: (self) => (thumb(c2).style.width = `${self.progress * 100}%`),
        }),
      );
    });

    // Packages: clips drop into each sequence.
    all(main, "[data-seq]").forEach((seq) =>
      gsap.from(seq.children, {
        scaleX: 0,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: seq, start: "top 85%", toggleActions: "play none none reverse" },
      }),
    );

    // Final: the edit renders as the section arrives, then plays (with its own pause button).
    const { pv, player } = previewPlayer(main);
    const pct = one(main, "[data-pct]");
    const state = one(main, "[data-pvstate]");
    pct.textContent = "0%";
    state.textContent = HOME.final.exporting;
    const done = (yes: boolean) => {
      if (yes === pv.classList.contains("done")) return;
      pv.classList.toggle("done", yes);
      state.textContent = yes ? HOME.final.done : HOME.final.exporting;
      if (!player) return;
      if (yes && !player.userPaused) play(player);
      if (!yes) {
        stop(player);
        player.userPaused = false;
      }
    };
    if (player)
      on(player.btn, "click", () => {
        if (isPlaying(player)) {
          stop(player);
          player.userPaused = true;
        } else {
          player.userPaused = false;
          play(player);
        }
      });
    gsap.to([pv, "[data-render]"], {
      "--r": "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#oferta",
        start: "top 75%",
        end: "top 15%",
        scrub: true,
        onUpdate: (self) => {
          pct.textContent = `${Math.round(self.progress * 100)}%`;
          done(self.progress > 0.995);
        },
      },
    });
  }, main);

  const offFormats = setupFormats(main, true);
  const refresh = () => ScrollTrigger.refresh();
  if (video) on(video, "loadedmetadata", refresh);
  on(window, "load", refresh);
  void document.fonts?.ready.then(refresh);

  return () => {
    offs.forEach((f) => f());
    offFormats();
    mm?.revert();
    ctx.revert();
    video?.pause();
  };
}

export function HomeMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('[data-page="home"]');
    if (!main) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    if (reduce || !root.classList.contains("motion")) {
      cleanup = setupStatic(main);
      return () => cleanup?.();
    }
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([g, st]) => {
        if (!cancelled) cleanup = setupMotion(g.gsap, st.ScrollTrigger, main);
      })
      .catch(() => {
        if (!cancelled) cleanup = setupStatic(main);
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return null;
}
