import { useState, useEffect, useRef } from "react";
import { DIRECTORS_CUT, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import { IconClose } from "./Icons.jsx";

const LS_PALETTE_KEY = "monfared_theme_palette";
const LS_TEMPO_KEY = "monfared_anim_tempo";

export function applyThemePalette(themeId) {
  const theme = DIRECTORS_CUT.themes.find((t) => t.id === themeId) || DIRECTORS_CUT.themes[0];
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--theme-ember", theme.ember);
    document.documentElement.style.setProperty("--theme-ember-hi", theme.hi);
    document.documentElement.style.setProperty("--theme-ember-deep", theme.deep);
  }
}

export function DirectorsCut({ lang }) {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("ember");
  const [activeTempo, setActiveTempo] = useState("std");
  const panelRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(LS_PALETTE_KEY);
    if (savedTheme) {
      setActiveTheme(savedTheme);
      applyThemePalette(savedTheme);
    }
    const savedTempo = localStorage.getItem(LS_TEMPO_KEY);
    if (savedTempo) {
      setActiveTempo(savedTempo);
      const tempoObj = DIRECTORS_CUT.tempos.find((x) => x.id === savedTempo);
      if (tempoObj) {
        document.documentElement.style.setProperty("--anim-tempo", String(tempoObj.val));
      }
    }
  }, []);

  const handleSelectTheme = (theme) => {
    playBlip(880);
    setActiveTheme(theme.id);
    applyThemePalette(theme.id);
    localStorage.setItem(LS_PALETTE_KEY, theme.id);
  };

  const handleSelectTempo = (tempo) => {
    playBlip(750);
    setActiveTempo(tempo.id);
    document.documentElement.style.setProperty("--anim-tempo", String(tempo.val));
    localStorage.setItem(LS_TEMPO_KEY, tempo.id);
  };

  return (
    <>
      {/* Floating Trigger Button in Corner */}
      <div className="fixed bottom-5 start-5 z-40 print:hidden">
        <button
          onClick={() => {
            playClick(500);
            setOpen(!open);
          }}
          className={`mono group flex items-center gap-2 rounded-full border px-3 sm:px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all shadow-xl shadow-black/60 cursor-pointer ${
            open
              ? "border-ember bg-ember text-void"
              : "border-line/80 bg-void/85 text-ash hover:border-ember hover:text-ember-hi hover:bg-coal"
          }`}
          aria-label="Director's Cut HUD"
        >
          <span className="size-2 rounded-full bg-ember anim-pulse-dot" />
          <span className="hidden sm:inline">{t(lang, DIRECTORS_CUT.title)}</span>
          <span className="sm:hidden">HUD</span>
        </button>
      </div>

      {/* Floating Control HUD Modal Card */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-16 start-5 z-50 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-line bg-coal/95 p-5 backdrop-blur-xl shadow-2xl shadow-black animate-fadeIn"
          data-lenis-prevent="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-line/60">
            <div>
              <p className="mono text-[10px] font-bold text-ember-hi uppercase">
                {t(lang, DIRECTORS_CUT.title)}
              </p>
              <p className="mono text-[8px] text-mute uppercase">
                {t(lang, DIRECTORS_CUT.sub)}
              </p>
            </div>
            <button
              onClick={() => {
                playClick(400);
                setOpen(false);
              }}
              className="text-mute hover:text-bone transition-colors"
            >
              <IconClose className="size-3.5" />
            </button>
          </div>

          {/* Color Themes */}
          <div className="mb-5">
            <label className="mono block text-[9px] uppercase tracking-wider text-mute mb-2">
              {lang === "fa" ? "پالت رنگی تعاملی (Accent Palette):" : "Color Accent Theme:"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DIRECTORS_CUT.themes.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-[10px] font-bold text-start transition-all cursor-pointer ${
                      isActive
                        ? "border-ember bg-ember/15 text-bone shadow-md"
                        : "border-line/60 bg-smoke/40 text-ash hover:border-line hover:text-bone"
                    }`}
                  >
                    <span
                      className="size-3 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: theme.ember }}
                    />
                    <span className="truncate">{t(lang, theme.name)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motion Tempo Speed */}
          <div className="mb-2">
            <label className="mono block text-[9px] uppercase tracking-wider text-mute mb-2">
              {lang === "fa" ? "سرعت و تمپوی ترنزیشن‌ها (Animation Tempo):" : "Animation Tempo Multiplier:"}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {DIRECTORS_CUT.tempos.map((tempo) => {
                const isActive = activeTempo === tempo.id;
                return (
                  <button
                    key={tempo.id}
                    onClick={() => handleSelectTempo(tempo)}
                    className={`mono py-1.5 px-2 rounded-lg border text-[9px] font-bold text-center transition-all cursor-pointer ${
                      isActive
                        ? "border-ember bg-ember/20 text-ember-hi"
                        : "border-line/60 bg-smoke/30 text-mute hover:text-ash"
                    }`}
                  >
                    {t(lang, tempo.label)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DirectorsCut;
