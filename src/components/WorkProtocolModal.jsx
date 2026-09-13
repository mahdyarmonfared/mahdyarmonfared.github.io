import { useEffect, useRef } from "react";
import { WORK_PROTOCOL, BRAND, t } from "../content.js";
import { IconClose } from "./Icons.jsx";
import { playClick, playBlip } from "../lib/sound.js";

export function WorkProtocolModal({ lang, isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    playBlip(780);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lockScroll?.(true);

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.__lockScroll?.(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          playClick(400);
          onClose();
        }}
      />

      {/* Modal Window */}
      <div
        ref={modalRef}
        className="dotted-grid no-scrollbar relative max-h-[90svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-coal p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between gap-4 border-b border-line/60 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="mono rounded bg-ember/15 border border-ember/40 px-2 py-0.5 text-[9px] font-bold text-ember-hi">
              {t(lang, WORK_PROTOCOL.seal)}
            </span>
            <span className="mono text-[10px] uppercase tracking-widest text-mute">
              {WORK_PROTOCOL.code}
            </span>
          </div>
          <button
            onClick={() => {
              playClick(400);
              onClose();
            }}
            className="grid size-8 place-items-center rounded-full border border-line text-ash hover:border-ember hover:text-ember transition-colors"
            aria-label="Close"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        {/* Title & Introduction */}
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-bone mb-3">
            {t(lang, WORK_PROTOCOL.title)}
          </h2>
          <p className="text-xs sm:text-sm text-ash leading-relaxed max-w-2xl">
            {t(lang, WORK_PROTOCOL.lead)}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
          {WORK_PROTOCOL.pillars.map((p) => (
            <div
              key={p.num}
              className="rounded-xl border border-line/70 bg-void/50 p-5 flex flex-col justify-between gap-3 transition-colors hover:border-ember/50 hover:bg-void/70"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="mono text-xs font-black text-ember-hi">
                    // {p.num}
                  </span>
                  <span className="size-2 rounded-full bg-emerald-500/80 anim-pulse-dot" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-bone mb-2">
                  {t(lang, p.title)}
                </h3>
                <p className="text-xs text-ash leading-relaxed">
                  {t(lang, p.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Official Wax / Digital Seal Footer */}
        <div className="rounded-xl border border-ember/30 bg-ember/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border border-ember/50 bg-ember/15 flex items-center justify-center font-display font-black text-ember-hi">
              ✦
            </div>
            <div>
              <p className="mono text-xs font-bold text-bone uppercase">
                {t(lang, BRAND)} — QUALITY PLEDGE
              </p>
              <p className="mono text-[10px] text-mute">
                OFFICIAL RECORD · NO TEMPLATE CAN OVERRIDE CRAFTSMANSHIP
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick(500);
              window.open("https://t.me/MahdyarMonfared", "_blank", "noopener,noreferrer");
            }}
            className="mono shrink-0 rounded-lg border border-ember bg-ember/20 px-4 py-2 text-xs font-bold text-ember-hi hover:bg-ember/30 transition-all text-center"
          >
            {lang === "fa" ? "درخواست قرارداد و مشاوره ↗" : "Request SOW & Consultation ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkProtocolModal;
