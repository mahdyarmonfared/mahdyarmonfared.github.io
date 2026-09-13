import { useState, useRef, useEffect, useCallback } from "react";
import { SectionShell } from "./About.jsx";
import { BEFORE_AFTER, t } from "../content.js";
import { playBlip } from "../lib/sound.js";

export function BeforeAfter({ lang }) {
  const [sliderPos, setSliderPos] = useState(50); // physical percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    // Allow slider to go completely from 0% to 100%
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  }, []);

  const onPointerDown = (e) => {
    setIsDragging(true);
    playBlip(750);
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    if (clientX != null) handleMove(clientX);
  };

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      if (clientX != null) handleMove(clientX);
    };

    const onPointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        playBlip(820);
      }
    };

    if (isDragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("touchmove", onPointerMove);
      window.addEventListener("touchend", onPointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [isDragging, handleMove]);

  return (
    <SectionShell
      id="impact"
      index="04"
      title={t(lang, BEFORE_AFTER.title)}
      sub={lang === "fa" ? "بنچمارک و تفاوت مهندسی" : "ENGINEERING BENCHMARK"}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 -mt-6 sm:-mt-8 mb-6 sm:mb-8">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-mute">
          {t(lang, BEFORE_AFTER.sub)}
        </p>
        <span className="mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-ember/40 bg-ember/10 text-ember-hi font-bold">
          {t(lang, BEFORE_AFTER.projectCase)}
        </span>
      </div>

      {/* Main Interactive Curtain Stage */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onTouchStart={onPointerDown}
        className="relative h-[420px] sm:h-[480px] md:h-[540px] w-full overflow-hidden rounded-2xl border border-line bg-coal select-none cursor-ew-resize shadow-2xl shadow-black/80"
        data-reveal="true"
      >
        {/* Layer 1: Left / Before Side (Official Heavy Stock Rockstar Portal) */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-10 bg-gradient-to-br from-[#18181f] via-[#121217] to-[#0c0c10] text-zinc-300">
          <div className="flex items-center justify-between gap-2">
            <span className="mono rounded-full border border-red-500/40 bg-red-500/15 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-red-400">
              ✕ {t(lang, BEFORE_AFTER.beforeBadge)}
            </span>
            <span className="mono text-[9px] sm:text-[10px] font-bold text-zinc-400 truncate">
              44/100 PageSpeed · 5.2s LCP · 15.4MB
            </span>
          </div>

          <div className="my-auto max-w-md space-y-3 sm:space-y-4">
            <div className="inline-block rounded-xl border border-red-500/30 bg-coal/90 p-4 sm:p-5 text-xs text-zinc-200 leading-relaxed shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-red-500" />
                <p className="font-bold text-red-400 text-xs sm:text-sm">
                  {lang === "fa" ? "سایت رسمی راک‌استار (نارسایی‌های پرفورمنس):" : "Official Rockstar Portal (Bottlenecks):"}
                </p>
              </div>
              <ul className="space-y-1.5 text-[11px] list-disc list-inside text-zinc-400">
                {BEFORE_AFTER.beforeFeatures.map((f, i) => (
                  <li key={i}>{t(lang, f)}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mono text-[9px] rounded bg-smoke border border-line px-2 py-0.5 text-zinc-500">
                NO_NEON_THEME
              </span>
              <span className="mono text-[9px] rounded bg-smoke border border-line px-2 py-0.5 text-zinc-500">
                AUTOPLAY_VIDEO_LOAD
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-zinc-500 mono">
            <span className="text-red-400">[THEME: STOCK_COMMERCIAL]</span>
            <span>CLS: 0.22 (UNSTABLE)</span>
          </div>
        </div>

        {/* Layer 2: Right / After Side (Mahdyar Bespoke Vice City Neon Dark Mode) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-10 bg-gradient-to-br from-[#0c0514] via-[#070914] to-[#04040a] transition-none text-bone"
          style={{
            clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="mono rounded-full border border-pink-500/50 bg-pink-500/20 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-pink-300 shadow-[0_0_12px_rgba(255,42,133,0.35)]">
              ✓ {t(lang, BEFORE_AFTER.afterBadge)}
            </span>
            <span className="mono text-[9px] sm:text-[10px] text-cyan-300 font-bold truncate">
              99/100 PageSpeed · 680ms LCP · Web Audio SFX
            </span>
          </div>

          <div className="my-auto max-w-md space-y-3 sm:space-y-4">
            <div className="inline-block rounded-xl border border-pink-500/40 bg-coal/95 p-4 sm:p-5 text-xs text-bone leading-relaxed shadow-2xl shadow-pink-500/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-cyan-400 anim-pulse-dot" />
                <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300 text-xs sm:text-sm">
                  {lang === "fa" ? "بازطراحی مهدیار منفرد (تم نئون وایس‌سیتی):" : "Mahdyar Crafted (Vice City Neon Experience):"}
                </p>
              </div>
              <ul className="space-y-1.5 text-[11px] list-disc list-inside text-ash">
                {BEFORE_AFTER.afterFeatures.map((f, i) => (
                  <li key={i} className="text-bone/95">{t(lang, f)}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-smoke border border-pink-500/30 text-[10px] mono text-pink-300">
                <span>🎬</span>
                <span>GTA VI 4K Trailer</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-smoke border border-cyan-500/30 text-[10px] mono text-cyan-300">
                <span>🔊</span>
                <span>Web Audio SFX</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-smoke border border-line text-[10px] mono text-emerald-400">
                <span>🛒</span>
                <span>Warehouse Cart</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-ash mono">
            <span className="text-cyan-400 font-bold">[THEME: VICE_CITY_NEON_60FPS]</span>
            <span className="text-emerald-400 font-bold">CLS: 0.00 (ROCK_SOLID)</span>
          </div>
        </div>

        {/* Divider Bar & Grab Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
          style={{
            left: `${sliderPos}%`,
            transform: "translateX(-50%)"
          }}
        >
          <div className="h-full w-0.5 bg-gradient-to-b from-pink-400 via-ember-hi to-cyan-400 shadow-[0_0_15px_rgba(255,42,133,0.8)]" />
          <div className="absolute size-9 rounded-full border-2 border-pink-400 bg-void shadow-xl shadow-black flex items-center justify-center text-pink-300 font-bold text-xs pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
            ⇄
          </div>
        </div>
      </div>

      {/* Benchmarks & Live Metrics Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" data-reveal="true">
        {BEFORE_AFTER.metrics.map((m, i) => (
          <div
            key={i}
            className="rounded-xl border border-line bg-coal/80 p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between gap-2.5 sm:gap-3.5 transition-colors hover:border-ember/50 shadow-lg shadow-black/40"
          >
            {/* Top row: Label & Diff Badge */}
            <div className="flex items-center justify-between gap-2 min-w-0">
              <span className="mono text-[10px] sm:text-[11px] uppercase tracking-wider text-mute truncate whitespace-nowrap">
                {t(lang, m.label)}
              </span>
              <span className="mono shrink-0 rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-300">
                {m.diff}
              </span>
            </div>

            {/* Bottom row: Before -> After */}
            <div className="flex items-baseline justify-between gap-2 min-w-0 pt-2 border-t border-line/40">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[10px] mono text-mute/80 uppercase">{lang === "fa" ? "سابق:" : "was:"}</span>
                <span className="line-through text-xs sm:text-sm text-mute mono truncate max-w-[100px] sm:max-w-none">
                  {m.before}
                </span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0 shrink-0">
                <span className="text-emerald-400 text-xs font-bold">→</span>
                <span className="font-display text-lg sm:text-xl lg:text-2xl font-black text-bone tracking-tight">
                  {m.after}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Banner */}
      <div
        className="mt-6 rounded-xl border border-line/60 bg-smoke/40 p-4 sm:p-6 flex items-center gap-3 text-xs sm:text-sm text-ash leading-relaxed italic"
        data-reveal="true"
      >
        <span className="text-ember text-lg not-italic font-bold">❝</span>
        <span>{t(lang, BEFORE_AFTER.quote)}</span>
      </div>
    </SectionShell>
  );
}

export default BeforeAfter;
