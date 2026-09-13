import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/smooth.js";
import { SectionShell } from "./About.jsx";
import { Tilt, Magnetic, Scramble } from "../components/Effects.jsx";
import {
  PROJECTS,
  PROJECTS_TITLE,
  PROJECTS_SUB,
  SCENE_LABELS,
  CASE_LABEL,
  OPEN_CASE,
  CLOSE_CASE,
  STR,
  t
} from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import { IconClose } from "../components/Icons.jsx";

const ACCENTS = {
  ember: { text: "text-ember", border: "hover:border-ember/70", bg: "bg-ember/10", dot: "bg-ember" },
  ice: { text: "text-ice", border: "hover:border-ice/70", bg: "bg-ice/10", dot: "bg-ice" },
  blood: { text: "text-blood", border: "hover:border-blood/70", bg: "bg-blood/10", dot: "bg-blood" }
};

const STATUS_BADGE = {
  ACTIVE: { en: "border-emerald-500/40 text-emerald-400", fa: "border-emerald-500/40 text-emerald-400" },
  CLOSED: { en: "border-line text-mute", fa: "border-line text-mute" },
  SEALED: { en: "border-blood/50 text-blood", fa: "border-blood/50 text-blood" }
};

export function Projects({ lang }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onOpenCase = (e) => {
      const p = PROJECTS.find((x) => x.id === e.detail);
      if (p) {
        playBlip(720);
        setOpen(p);
      }
    };
    window.addEventListener("open-case", onOpenCase);
    return () => window.removeEventListener("open-case", onOpenCase);
  }, []);

  const handleOpen = (p) => {
    playBlip(680);
    setOpen(p);
  };

  const handleClose = () => {
    playClick(500);
    setOpen(null);
  };

  return (
    <SectionShell id="projects" index="03" title={t(lang, PROJECTS_TITLE)} sub={t(lang, SCENE_LABELS[2])}>
      <p className="mono -mt-6 sm:-mt-8 mb-8 sm:mb-12 text-[10px] uppercase tracking-[0.25em] text-mute">
        {t(lang, PROJECTS_SUB)}
      </p>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Tilt key={p.id} max={5} className="h-full">
            <button
              onClick={() => handleOpen(p)}
              data-cursor="view"
              data-cursor-label={lang === "fa" ? "بازکن" : "OPEN"}
              data-reveal="true"
              data-delay={(i % 2) * 0.1}
              data-y={48}
              className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-coal p-6 sm:p-8 text-start transition-colors duration-500 ${ACCENTS[p.accent].border}`}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
                <span className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute">
                  {t(lang, CASE_LABEL)} №{String(i + 1).padStart(2, "0")} / {p.year}
                </span>
                <span
                  className={`mono rounded-full border px-2.5 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] uppercase tracking-widest ${STATUS_BADGE[p.status][lang]}`}
                >
                  {p.status}
                </span>
              </div>

              <h3
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-1 ${ACCENTS[p.accent].text}`}
              >
                {t(lang, p.name)}
              </h3>

              {p.summary && t(lang, p.summary) ? (
                <p className="mt-3 line-clamp-3 max-w-md text-xs sm:text-sm leading-6 sm:leading-7 text-ash">
                  {t(lang, p.summary)}
                </p>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-1.5 sm:gap-2 pt-6 sm:pt-8">
                {(p.tagMap ? [t(lang, p.tagMap)] : p.tags).map((tg) => (
                  <span
                    key={tg}
                    className={`mono rounded px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] tracking-wider ${ACCENTS[p.accent].bg} ${ACCENTS[p.accent].text}/90`}
                  >
                    {tg}
                  </span>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-mute transition-colors group-hover:text-bone">
                <div className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${ACCENTS[p.accent].dot} anim-pulse-dot`} />
                  {t(lang, OPEN_CASE)}
                </div>
                {p.links?.live && (
                  <span className="mono rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                    {lang === "fa" ? "دموی زنده ↗" : "LIVE DEMO ↗"}
                  </span>
                )}
              </div>
            </button>
          </Tilt>
        ))}
      </div>

      {open && <CaseFile project={open} lang={lang} onClose={handleClose} />}
    </SectionShell>
  );
}

function CaseFile({ project, lang, onClose }) {
  const card = useRef(null);
  const stageRef = useRef(null);
  const a = ACCENTS[project.accent];
  const [deviceMode, setDeviceMode] = useState("desktop"); // "desktop" | "tablet" | "mobile"
  const [showLiveFrame, setShowLiveFrame] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stageWidth, setStageWidth] = useState(780);

  const isUpcoming = project.id === "upcoming";

  useEffect(() => {
    if (!stageRef.current) return;
    const updateWidth = () => {
      if (stageRef.current) {
        const w = stageRef.current.clientWidth;
        if (w > 0) setStageWidth(w);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(stageRef.current);
    window.addEventListener("resize", updateWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [showLiveFrame]);

  useEffect(() => {
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lockScroll?.(true);

    const el = card.current;
    let cleanupCardListeners = null;
    if (el) {
      const stopBubble = (e) => e.stopPropagation();
      el.addEventListener("wheel", stopBubble, { passive: true });
      el.addEventListener("touchmove", stopBubble, { passive: true });
      cleanupCardListeners = () => {
        el.removeEventListener("wheel", stopBubble);
        el.removeEventListener("touchmove", stopBubble);
      };

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", clearProps: "transform" }
      );
      gsap.fromTo(
        el.querySelectorAll("[data-row]"),
        { autoAlpha: 0, x: lang === "fa" ? -20 : 20 },
        { autoAlpha: 1, x: 0, duration: 0.5, delay: 0.18, stagger: 0.07, ease: "power3.out" }
      );
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cleanupCardListeners?.();
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.__lockScroll?.(false);
      window.dispatchEvent(new CustomEvent("show-cursor"));
    };
  }, [onClose, lang, isFullscreen]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(lang, CASE_LABEL)} ${t(lang, project.name)}`}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onWheel={(e) => {
        e.stopPropagation();
        if (card.current && !card.current.contains(e.target)) {
          card.current.scrollTop += e.deltaY;
        }
      }}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-void/85 backdrop-blur-md"
        onClick={onClose}
        aria-label={t(lang, STR.close)}
        data-cursor="close"
      />

      {/* Modal Dialog Card */}
      <div
        ref={card}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="dotted-grid no-scrollbar relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-xl border border-line bg-coal p-6 sm:p-10 lg:p-12 shadow-[0_40px_120px_-20px_rgb(0,0,0,0.95)]"
      >
        {/* Top bar with quick close button for mobile */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="border border-line bg-smoke px-3 py-1">
            <span className="mono text-[9px] uppercase tracking-[0.25em] text-mute">
              evidence / 00{PROJECTS.indexOf(project) + 1}
            </span>
          </div>

          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full border border-line text-ash hover:border-ember hover:text-ember transition-colors"
            aria-label={t(lang, STR.close)}
          >
            <IconClose className="size-4" />
          </button>
        </div>

        {/* Status Stamp */}
        <div className={`stamp inline-block rounded px-3 py-0.5 text-[10px] font-black ${a.text}`}>
          {lang === "fa"
            ? project.status === "SEALED"
              ? "مهرشده"
              : project.status === "ACTIVE"
              ? "باز"
              : "بسته"
            : project.status}
        </div>

        <p className="mono mt-3 mb-1 text-[10px] uppercase tracking-[0.3em] text-mute">
          {t(lang, CASE_LABEL)} №{String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
        </p>

        <Scramble
          text={t(lang, project.name)}
          lang={lang}
          className={`block font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${a.text}`}
        />

        <p className="mono mt-2 text-xs uppercase tracking-widest text-mute">
          {t(lang, project.role)} — {project.year}
        </p>

        <div className="my-6 h-px bg-gradient-to-r from-line via-transparent to-transparent" />

        {project.summary && t(lang, project.summary) ? (
          <p data-row="true" className="text-sm sm:text-base leading-7 sm:leading-8 text-ash">
            {t(lang, project.summary)}
          </p>
        ) : null}

        {isUpcoming ? (
          <div data-row="true" className="mt-8 rounded-2xl border border-ember/30 bg-smoke/60 p-6 sm:p-10 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-ember/50 bg-ember/15 text-ember-hi text-xl">
              🔒
            </div>
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">
              // CLASSIFIED PROJECT FILE
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-bone mt-2">
              {lang === "fa" ? "پرونده محرمانه — در حال توسعه" : "SEALED CASE — UNDER ACTIVE DEVELOPMENT"}
            </h4>
            <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-ash leading-relaxed">
              {lang === "fa"
                ? "این پروژه در حال حاضر در دست طراحی، مهندسی و کدنویسی است و پس از استقرار نهایی به نمایش گذاشته خواهد شد."
                : "This project is actively being crafted. Architectural specs, live preview, and source code will be declassified upon release."}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-void px-4 py-1.5 mono text-[10px] text-mute">
              <span className="size-1.5 rounded-full bg-ember anim-pulse-dot" />
              <span>STATUS: IN_DEVELOPMENT // TARGET: 2026</span>
            </div>
          </div>
        ) : (
          <>
            {/* Live Interactive Device Frame Simulator */}
            {project.links?.live && (
              <div
                ref={stageRef}
                data-row="true"
                data-native-cursor="true"
                onPointerEnter={() => window.dispatchEvent(new CustomEvent("hide-cursor"))}
                onPointerLeave={() => window.dispatchEvent(new CustomEvent("show-cursor"))}
                className="mt-8 rounded-2xl border border-line/80 bg-void/80 p-3 sm:p-5 no-scrollbar select-none"
                style={{ cursor: "default" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-line/50">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 anim-pulse-dot" />
                    <span className="mono text-xs font-bold text-bone">
                      {lang === "fa" ? "پیش‌نمایش زنده در قاب دستگاه" : "LIVE DEVICE SIMULATOR"}
                    </span>
                    <span className="mono text-[9px] rounded bg-smoke border border-line px-2 py-0.5 text-mute">
                      {deviceMode === "desktop" ? "1920 × 1080 (FHD)" : deviceMode === "tablet" ? "1024 × 768" : "390 × 844"}
                    </span>
                  </div>

                  {/* Device Mode Switcher Buttons */}
                  <div className="flex items-center gap-1.5 p-1 rounded-lg border border-line bg-smoke">
                    <button
                      type="button"
                      onClick={() => {
                        playBlip(750);
                        setDeviceMode("desktop");
                        setShowLiveFrame(true);
                      }}
                      className={`mono px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                        deviceMode === "desktop" && showLiveFrame
                          ? "bg-ember text-void"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      Desktop (1080p)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playBlip(800);
                        setDeviceMode("tablet");
                        setShowLiveFrame(true);
                      }}
                      className={`mono px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                        deviceMode === "tablet" && showLiveFrame
                          ? "bg-ember text-void"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      Tablet
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playBlip(850);
                        setDeviceMode("mobile");
                        setShowLiveFrame(true);
                      }}
                      className={`mono px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                        deviceMode === "mobile" && showLiveFrame
                          ? "bg-ember text-void"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Simulated Device Screen Container */}
                {showLiveFrame ? (() => {
                  const targetW = deviceMode === "desktop" ? 1920 : deviceMode === "tablet" ? 1024 : 390;
                  const targetH = deviceMode === "desktop" ? 1080 : deviceMode === "tablet" ? 768 : 844;
                  const maxDisplayW = deviceMode === "desktop"
                    ? Math.min(stageWidth || 800, 840)
                    : deviceMode === "tablet"
                    ? Math.min(stageWidth || 800, 680)
                    : Math.min(stageWidth || 800, 380);
                  const scale = Math.min(1, maxDisplayW / targetW);
                  const scaledW = Math.round(targetW * scale);
                  const scaledH = Math.round(targetH * scale);

                  return (
                    <div className="flex justify-center items-center py-2 overflow-hidden no-scrollbar">
                      <div
                        className="flex flex-col rounded-xl border border-line bg-smoke/95 shadow-2xl overflow-hidden mx-auto transition-all duration-300"
                        style={{ width: `${scaledW}px`, maxWidth: "100%" }}
                      >
                        {/* Browser Chrome Header - Normal block flow, sits ABOVE the viewport */}
                        <div className="h-8 bg-smoke px-3 flex items-center justify-between border-b border-line shrink-0 select-none">
                          {/* Left: Window Dots */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="size-2.5 rounded-full bg-red-500/80" />
                            <span className="size-2.5 rounded-full bg-amber-500/80" />
                            <span className="size-2.5 rounded-full bg-emerald-500/80" />
                          </div>

                          {/* Center: Secure URL Badge */}
                          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-void/80 border border-line/60 text-[10px] mono text-ash max-w-[55%] truncate">
                            <span className="text-emerald-400 text-[9px]">🔒</span>
                            <span className="truncate">{project.links.live}</span>
                          </div>

                          {/* Right: Fullscreen FHD and External Tab Links */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setIsFullscreen(true)}
                              className="px-2 py-0.5 rounded border border-line bg-void text-[10px] mono text-ash hover:border-ember hover:text-ember-hi transition-colors flex items-center gap-1 cursor-pointer"
                              title={lang === "fa" ? "مشاهده تمام‌صفحه با کیفیت کامل ۱۰۸۰p" : "Fullscreen Native 1080p"}
                            >
                              <span>⛶</span>
                              <span className="hidden sm:inline">{lang === "fa" ? "تمام‌صفحه" : "Full HD"}</span>
                            </button>

                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded border border-line bg-void text-[10px] mono text-ash hover:border-ember hover:text-ember-hi transition-colors flex items-center gap-1"
                              title={lang === "fa" ? "باز کردن در تب جدید" : "Open in new tab"}
                            >
                              <span>↗</span>
                            </a>
                          </div>
                        </div>

                        {/* Viewport container with exact pixel dimensions */}
                        <div
                          className="relative overflow-hidden bg-black mx-auto select-none"
                          style={{
                            width: `${scaledW}px`,
                            height: `${scaledH}px`,
                          }}
                        >
                          <div
                            style={{
                              width: `${targetW}px`,
                              height: `${targetH}px`,
                              transform: `scale(${scale})`,
                              transformOrigin: "top left",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              overflow: "hidden",
                            }}
                          >
                            <iframe
                              src={project.links.live}
                              title={t(lang, project.name)}
                              scrolling="no"
                              style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                background: "#06060a"
                              }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="py-6 text-center">
                    <button
                      onClick={() => {
                        playBlip(750);
                        setShowLiveFrame(true);
                      }}
                      className="mono rounded-lg border border-ember/60 bg-ember/15 px-5 py-2.5 text-xs font-bold text-ember-hi hover:bg-ember/25 transition-all cursor-pointer"
                    >
                      {lang === "fa" ? "بارگذاری فریم پیش‌نمایش تعاملی داخل سایت ⚡" : "Load Interactive Device Frame ⚡"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Clues list */}
            {project.clues && project.clues.length > 0 && (
              <dl className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {project.clues.map((c, i) => (
                  <div
                    key={i}
                    data-row="true"
                    className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-1.5 sm:gap-4 rounded-lg border border-line/60 bg-void/40 p-3 sm:p-4"
                  >
                    <dt className="mono self-center text-[10px] uppercase tracking-[0.2em] text-mute">
                      {t(lang, c.label)}
                    </dt>
                    <dd className={`font-display text-sm sm:text-base font-bold ${a.text}`}>
                      {t(lang, c.value)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        )}

        {/* Live Project & Source Links */}
        {project.links && (project.links.live || project.links.github) && (
          <div data-row="true" className="mt-6 flex flex-wrap items-center gap-3 pt-1">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-2 rounded-lg border border-emerald-500/60 bg-emerald-500/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-300 transition-all hover:bg-emerald-500/25 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <span>{lang === "fa" ? "مشاهده در تب جداگانه ↗" : "Launch External Tab ↗"}</span>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="mono inline-flex items-center gap-2 rounded-lg border border-line bg-smoke/80 px-4 py-2.5 text-xs uppercase tracking-wider text-ash transition-all hover:border-ember/60 hover:text-bone hover:bg-smoke"
              >
                <span>{lang === "fa" ? "مخزن گیت‌هاب (Source) ↗" : "GitHub Repository ↗"}</span>
              </a>
            )}
          </div>
        )}

        {/* Bottom tags & close */}
        <div data-row="true" className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(project.tagMap ? [t(lang, project.tagMap)] : project.tags).map((tg) => (
              <span
                key={tg}
                className={`mono rounded px-2.5 py-1 text-[10px] ${a.bg} ${a.text}/90`}
              >
                {tg}
              </span>
            ))}
          </div>

          <Magnetic strength={0.35}>
            <button
              onClick={onClose}
              data-cursor="close"
              className="mono inline-flex items-center gap-2 rounded-full border border-line px-6 py-2.5 sm:py-3 text-xs uppercase tracking-widest text-ash transition-colors hover:border-ember hover:text-ember"
            >
              <span>{t(lang, CLOSE_CASE)}</span>
              <IconClose className="size-3.5" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Fullscreen HD Mode Overlay Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-void/95 backdrop-blur-xl p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          data-native-cursor="true"
          onPointerEnter={() => window.dispatchEvent(new CustomEvent("hide-cursor"))}
          onPointerLeave={() => window.dispatchEvent(new CustomEvent("show-cursor"))}
        >
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2 bg-coal border border-line rounded-t-xl shrink-0 select-none">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex gap-1.5 shrink-0">
                <span className="size-2.5 rounded-full bg-red-500" />
                <span className="size-2.5 rounded-full bg-amber-500" />
                <span className="size-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="mono text-xs font-bold text-bone truncate">
                {t(lang, project.name)}
              </span>
              <span className="mono text-[10px] rounded bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-emerald-300 shrink-0 hidden sm:inline">
                1080p FHD Native
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="mono px-3 py-1 text-xs rounded border border-line bg-smoke text-ash hover:border-ember hover:text-ember-hi transition-colors flex items-center gap-1"
              >
                <span>↗</span>
                <span className="hidden sm:inline">{lang === "fa" ? "تب جدید" : "New Tab"}</span>
              </a>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="mono px-3 py-1 text-xs rounded border border-line bg-smoke text-bone hover:border-red-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>✕</span>
                <span className="hidden sm:inline">{lang === "fa" ? "خروج (Esc)" : "Exit (Esc)"}</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Iframe Viewport */}
          <div className="flex-1 w-full relative bg-black border-x border-b border-line rounded-b-xl overflow-hidden">
            <iframe
              src={project.links.live}
              title={t(lang, project.name)}
              className="w-full h-full border-none"
              loading="eager"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
