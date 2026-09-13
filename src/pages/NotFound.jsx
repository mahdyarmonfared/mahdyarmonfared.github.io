import { useEffect, useState } from "react";
import { NOT_FOUND, BRAND, t } from "../content.js";
import { useLang } from "../context/LangContext.jsx";
import { Scramble } from "../components/Effects.jsx";
import { playGlitch, playClick } from "../lib/sound.js";
import SmokeCanvas from "../components/SmokeCanvas.jsx";

export default function NotFound({ onGoHome, onOpenTerminal, onOpenGame }) {
  const { lang, toggle } = useLang();
  const [currentPath, setCurrentPath] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname || "/404");
    setTime(
      new Date().toLocaleTimeString(lang === "fa" ? "fa-IR" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    );
    playGlitch();
  }, [lang]);

  const handleAction = (callback) => {
    playClick();
    callback?.();
  };

  return (
    <div className="grain vignette relative min-h-svh w-full overflow-hidden bg-void text-bone flex flex-col justify-between p-5 sm:p-10">
      <SmokeCanvas />

      {/* Top bar */}
      <header className="relative z-20 mx-auto flex w-full max-w-[110rem] items-center justify-between gap-4">
        <button
          onClick={() => handleAction(onGoHome)}
          className="flex items-baseline gap-2 text-start transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <span className="font-display text-lg font-extrabold tracking-tight">
            {t(lang, BRAND)}
          </span>
          <span className="mono hidden text-[9px] uppercase tracking-[0.3em] text-mute sm:inline">
            evidence.exe
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction(toggle)}
            className="mono rounded-full border border-line px-4 py-1.5 text-[11px] uppercase tracking-widest text-ash transition-colors hover:border-ember hover:text-ember"
          >
            {lang === "fa" ? "EN" : "فا"}
          </button>
        </div>
      </header>

      {/* Center 404 Case File */}
      <main className="relative z-10 mx-auto my-auto w-full max-w-2xl py-12">
        <div className="dotted-grid relative rounded-xl border border-line/80 bg-coal/90 p-7 sm:p-12 shadow-[0_30px_90px_-20px_rgb(0,0,0,0.9)] backdrop-blur-md">
          {/* Swinging Detective Lightbulb */}
          <div className="pointer-events-none absolute -top-12 start-10 flex flex-col items-center">
            <div className="cord h-10" />
            <div className="bulb anim-flicker" />
          </div>

          {/* Stamp */}
          <div className="stamp absolute end-6 top-6 rounded px-3 py-1 text-[11px] font-black text-blood border-blood">
            {t(lang, NOT_FOUND.badge)}
          </div>

          {/* Code */}
          <p className="mono mb-2 text-[10px] uppercase tracking-[0.35em] text-mute">
            {NOT_FOUND.code}
          </p>

          {/* Big Glitch 404 */}
          <div className="flex items-baseline gap-4">
            <h1 className="font-display text-7xl font-black tracking-tighter text-ember sm:text-8xl glow-text">
              404
            </h1>
            <span className="mono text-xs text-blood tracking-widest anim-blink">
              [CRITICAL]
            </span>
          </div>

          {/* Subtitle */}
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            <Scramble text={t(lang, NOT_FOUND.title)} lang={lang} />
          </h2>

          <div className="my-6 h-px bg-gradient-to-r from-line via-ember/30 to-transparent" />

          {/* Narrative */}
          <p className="text-base leading-8 text-ash sm:text-lg sm:leading-9">
            {t(lang, NOT_FOUND.summary)}
          </p>

          {/* Clues Interrogation */}
          <dl className="mt-7 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 rounded-lg border border-line/60 bg-void/50 p-3.5 text-xs">
              <dt className="mono self-center uppercase tracking-widest text-mute">
                {t(lang, NOT_FOUND.clues.url)}
              </dt>
              <dd className="mono font-bold text-ash break-all">
                {currentPath}
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 rounded-lg border border-line/60 bg-void/50 p-3.5 text-xs">
              <dt className="mono self-center uppercase tracking-widest text-mute">
                {t(lang, NOT_FOUND.clues.status)}
              </dt>
              <dd className="mono font-bold text-blood">
                {t(lang, NOT_FOUND.clues.statusVal)}
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 rounded-lg border border-line/60 bg-void/50 p-3.5 text-xs">
              <dt className="mono self-center uppercase tracking-widest text-mute">
                {t(lang, NOT_FOUND.clues.time)}
              </dt>
              <dd className="mono font-bold text-ember">
                {time}
              </dd>
            </div>
          </dl>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleAction(onGoHome)}
              className="mono flex-1 min-w-[140px] rounded-full bg-ember px-6 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-void transition-transform hover:scale-[1.03]"
            >
              {t(lang, NOT_FOUND.actions.back)}
            </button>

            <button
              onClick={() => handleAction(onOpenTerminal)}
              className="mono rounded-full border border-line px-5 py-3.5 text-xs uppercase tracking-widest text-ash transition-colors hover:border-ember hover:text-ember"
            >
              ~/terminal
            </button>

            <button
              onClick={() => handleAction(onOpenGame)}
              className="mono rounded-full border border-ember/40 px-5 py-3.5 text-xs uppercase tracking-widest text-ember transition-colors hover:bg-ember hover:text-void"
            >
              ▶ {t(lang, NOT_FOUND.actions.game)}
            </button>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="relative z-20 mx-auto flex w-full max-w-[110rem] items-center justify-between text-[10px] uppercase tracking-widest text-mute">
        <span>© {new Date().getFullYear()} {BRAND.en}</span>
        <span>404 // VOID ARCHIVE</span>
      </footer>
    </div>
  );
}

