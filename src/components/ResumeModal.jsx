import { useEffect, useRef } from "react";
import { RESUME_DATA, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import {
  IconPrinter,
  IconClose,
  IconLocation,
  IconMail,
  IconTelegram
} from "./Icons.jsx";

export default function ResumeModal({ open, onClose, lang }) {
  const isFa = lang === "fa";
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    playBlip(920);
    window.print();
  };

  const { header, objective, sections } = RESUME_DATA;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/90 backdrop-blur-md transition-opacity"
        onClick={() => {
          playClick(450);
          onClose();
        }}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl border border-line bg-coal p-6 sm:p-10 shadow-2xl shadow-black/90 text-bone print:border-none print:shadow-none print:bg-white print:text-black print:p-0 print:max-h-none print:overflow-visible"
        data-lenis-prevent="true"
      >
        {/* Print & Close Toolbar (hidden in print) */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            <span className="mono text-xs text-mute uppercase tracking-widest">
              {t(lang, header.classification)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="mono text-xs flex items-center gap-1.5 rounded-full border border-ember/50 bg-ember/15 px-4 py-1.5 text-ember-hi hover:bg-ember/30 transition-colors cursor-pointer"
            >
              <IconPrinter className="size-3.5" />
              <span>{t(lang, { en: "Print / Save PDF", fa: "چاپ / ذخیره PDF" })}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(420);
                onClose();
              }}
              className="size-8 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <IconClose className="size-4" />
            </button>
          </div>
        </div>

        {/* Dossier Header */}
        <div className="border-b-2 border-line/80 pb-6 mb-8 print:border-black">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="mono text-xs text-ember-hi tracking-widest mb-1">
                {header.docId}
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-bone print:text-black">
                {t(lang, header.title)}
              </h1>
              <p className="mono text-xs sm:text-sm text-ash mt-1 print:text-gray-700">
                {t(lang, header.subtitle)}
              </p>
            </div>

            <div className="mono text-xs text-ash sm:text-end space-y-1.5 print:text-gray-700">
              <div className="flex items-center gap-1.5 sm:justify-end">
                <IconLocation className="size-3.5 text-ember" />
                <span>{t(lang, header.base)}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end">
                <IconMail className="size-3.5 text-ember" />
                <span>{header.contact.email}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end">
                <IconTelegram className="size-3.5 text-ember" />
                <span>Telegram: {header.contact.telegram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Objective / Overview */}
        <div className="mb-8 p-4 rounded-xl border border-line/60 bg-void/50 print:border-gray-300 print:bg-transparent">
          <div className="mono text-[10px] text-ember uppercase tracking-widest mb-1.5 print:text-black print:font-bold">
            {t(lang, { en: "DOSSIER BRIEF", fa: "خلاصه پرونده و هدف حرفه‌ای" })}
          </div>
          <p className="text-xs sm:text-sm text-ash leading-relaxed print:text-gray-800">
            {t(lang, objective)}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div key={i} className="border-b border-line/40 pb-6 print:border-gray-300">
              <h2 className="mono text-xs sm:text-sm text-ember-hi font-bold tracking-widest uppercase mb-4 print:text-black">
                // {t(lang, sec.title)}
              </h2>
              <div className="space-y-3">
                {sec.items.map((item, j) => (
                  <div key={j} className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="font-bold text-bone sm:w-56 shrink-0 print:text-black">
                      {item.name}
                    </span>
                    <span className="text-ash print:text-gray-700 flex-1 leading-relaxed">
                      {item.val || item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Official Noir Stamp Footer */}
        <div className="mt-8 pt-4 flex items-center justify-between text-[10px] mono text-mute print:text-gray-500">
          <div>OFFICIAL MONFARED DOSSIER · CONFIDENTIAL</div>
          <div>ISSUED: MASHHAD · 2026</div>
        </div>
      </div>
    </div>
  );
}

