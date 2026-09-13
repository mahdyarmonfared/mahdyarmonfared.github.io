import { Fragment, useEffect, useState } from "react";
import gsap from "gsap";
import { NAV, BRAND, SCENE_LABELS, t, STR } from "../content.js";
import { useLang } from "../context/LangContext.jsx";
import {
  isSoundEnabled,
  setSoundEnabled,
  playClick,
  hasAnySoundscapeActive
} from "../lib/sound.js";
import {
  IconRadio,
  IconSoundOn,
  IconSoundOff,
  IconFlask,
  IconFolder,
  IconTerminal,
  IconMenuGrid,
  IconDocument,
  IconGlobe,
  IconPlay,
  IconClose
} from "./Icons.jsx";
import EmojiRain from "../components/EmojiRain.jsx";

const SECTIONS = ["home", "about", "skills", "projects", "impact", "estimator", "testimonials", "experience", "contact"];

function Nav({
  onTerminal,
  onGame,
  onPortal,
  onLab,
  onResumeModal,
  onSoundscapeModal,
  onMegaMenu
}) {
  const { lang, toggle } = useLang();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(() => isSoundEnabled());
  const [hasAtmosphere, setHasAtmosphere] = useState(() => hasAnySoundscapeActive());

  useEffect(() => {
    const onSoundChange = (e) => setSound(e.detail);
    const onAtmosphereChange = (e) => setHasAtmosphere((e.detail.activeIds || []).length > 0);

    window.addEventListener("sound-toggle", onSoundChange);
    window.addEventListener("soundscape-update", onAtmosphereChange);

    return () => {
      window.removeEventListener("sound-toggle", onSoundChange);
      window.removeEventListener("soundscape-update", onAtmosphereChange);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleToggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
    if (next) playClick(550);
  };

  const handleToggleLang = () => {
    playClick(640);
    toggle();
  };

  return (
    <Fragment>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-md bg-void/80 border-b border-line/50">
        <div className="mx-auto flex max-w-[125rem] items-center justify-between gap-3 px-4 py-3 sm:px-8 xl:px-12 sm:py-4">
          {/* Brand */}
          <a
            href="#home"
            data-cursor="link"
            className="flex items-baseline gap-2 sm:gap-3 group shrink-0"
            onClick={() => playClick(500)}
          >
            <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-bone group-hover:text-ember-hi transition-colors">
              {t(lang, BRAND)}
            </span>
            <span className="mono hidden text-[9px] uppercase tracking-[0.25em] text-mute group-hover:text-ash md:inline transition-colors">
              portfolio.exe
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-line bg-coal/95 px-2 py-1 xl:flex shadow-lg shadow-black/40 shrink-0">
            {["about", "skills", "projects", "impact", "estimator", "testimonials", "experience", "contact"].map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                data-cursor="link"
                onClick={() => playClick(480 + i * 15)}
                className={`mono relative rounded-full px-2.5 2xl:px-3.5 py-1.5 text-[10px] 2xl:text-[11px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  active === id
                    ? "border border-ember-hi/80 bg-ember/20 text-ember-hi font-extrabold shadow-[0_0_14px_rgba(255,217,160,0.35)]"
                    : "border border-transparent text-ash hover:border-ember/40 hover:text-ember-hi hover:bg-ember/10"
                }`}
              >
                {active === id && (
                  <span className="size-1.5 rounded-full bg-ember-hi shadow-[0_0_6px_#ffd9a0] anim-pulse-dot shrink-0" />
                )}
                <span>{t(lang, NAV[id])}</span>
              </a>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Atmospheric Soundscape Radio Trigger */}
            <button
              onClick={() => {
                playClick(480);
                onSoundscapeModal?.();
              }}
              data-cursor="link"
              className={`mono rounded-full border px-2.5 py-1.5 text-[10px] tracking-wider transition-all duration-200 hidden md:flex items-center gap-1.5 cursor-pointer shrink-0 ${
                hasAtmosphere
                  ? "border-ember text-ember-hi bg-ember/20 shadow-[0_0_14px_rgba(232,163,61,0.35)]"
                  : "border-line text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10"
              }`}
              title={t(lang, { en: "Atmospheric Radio (88.4 MHz)", fa: "رادیو و صداهای محیطی پرونده" })}
              aria-label="Toggle atmospheric soundscapes"
            >
              <IconRadio className="size-3.5 text-ember-hi shrink-0" />
              <span className="hidden 2xl:inline font-bold">
                {t(lang, { en: "RADIO", fa: "رادیو" })}
              </span>
              {hasAtmosphere && (
                <span className="size-1.5 rounded-full bg-ember-hi anim-pulse-dot shrink-0" />
              )}
            </button>

            {/* UI SFX Mute Button */}
            <button
              onClick={handleToggleSound}
              data-cursor="link"
              className={`mono rounded-full border size-8 text-[10px] transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 ${
                sound
                  ? "border-line text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10"
                  : "border-red-500/40 text-red-400 bg-red-500/10"
              }`}
              title={sound ? t(lang, { en: "SFX: ON", fa: "افکت‌های صوتی کلیک: فعال" }) : t(lang, { en: "SFX: MUTED", fa: "افکت‌های صوتی کلیک: قطع" })}
              aria-label="Toggle UI Sound Effects"
            >
              {sound ? <IconSoundOn className="size-3.5" /> : <IconSoundOff className="size-3.5" />}
            </button>

            {/* Creative Code Lab Button */}
            <button
              onClick={() => {
                playClick(620);
                onLab?.();
              }}
              data-cursor="link"
              className="mono hidden lg:flex items-center gap-1.5 rounded-full border border-line bg-smoke/40 px-2.5 py-1.5 text-[11px] uppercase tracking-wider text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10 transition-all duration-200 cursor-pointer shrink-0"
              title={t(lang, { en: "Creative Code Lab", fa: "آزمایشگاه کدهای خلاقانه" })}
              aria-label="Creative Lab"
            >
              <IconFlask className="size-3.5 text-ember-hi shrink-0" />
              <span className="hidden 2xl:inline">{t(lang, { en: "Lab", fa: "آزمایشگاه" })}</span>
            </button>

            {/* Client Portal Button */}
            <button
              onClick={() => {
                playClick(600);
                onPortal?.();
              }}
              data-cursor="link"
              className="mono hidden sm:flex items-center gap-1.5 rounded-full border border-ember-hi/40 bg-ember/10 px-2.5 py-1.5 text-[11px] uppercase tracking-wider text-ember-hi transition-all duration-200 hover:bg-ember/25 hover:border-ember-hi hover:shadow-[0_0_12px_rgba(255,217,160,0.3)] cursor-pointer shrink-0"
              title={t(lang, { en: "Client Portal & Dashboard", fa: "پنل و داشبورد کارفرمایان" })}
              aria-label="Client Portal"
            >
              <IconFolder className="size-3.5 text-ember-hi shrink-0" />
              <span className="hidden xl:inline">{lang === "fa" ? "پنل کارفرما" : "Portal"}</span>
            </button>

            {/* Mega Menu / Explorer Button */}
            <button
              onClick={() => {
                playClick(500);
                onMegaMenu?.();
              }}
              data-cursor="link"
              className="mono hidden lg:flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 text-[11px] uppercase tracking-wider text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10 transition-all duration-200 cursor-pointer shrink-0"
              title={t(lang, { en: "Explore Sitemap (Mega Menu)", fa: "فهرست و نقشه جامع" })}
              aria-label="Mega Menu"
            >
              <IconMenuGrid className="size-3.5 shrink-0" />
              <span className="hidden 2xl:inline">{t(lang, { en: "Index", fa: "فهرست" })}</span>
            </button>

            {/* Terminal toggle */}
            <button
              onClick={() => {
                playClick(680);
                onTerminal();
              }}
              data-cursor="link"
              className="mono hidden md:flex rounded-full border border-line size-8 text-xs text-ash transition-all duration-200 hover:border-ember hover:text-ember-hi hover:bg-ember/10 items-center justify-center cursor-pointer shrink-0"
              aria-label="Terminal (~)"
              title="Terminal (~)"
            >
              <IconTerminal className="size-3.5" />
            </button>

            {/* Language toggle */}
            <button
              onClick={handleToggleLang}
              data-cursor="link"
              className="mono rounded-full border border-line px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ash transition-all duration-200 hover:border-ember hover:text-ember-hi hover:bg-ember/10 shrink-0 cursor-pointer"
              aria-label="Toggle language"
              title={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
            >
              {lang === "fa" ? "EN" : "فا"}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => {
                playClick(440);
                setOpen((v) => !v);
              }}
              data-cursor="link"
              className="grid size-8 place-items-center rounded-full border border-line text-bone transition-all duration-200 hover:border-ember hover:text-ember-hi hover:bg-ember/10 xl:hidden cursor-pointer shrink-0"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <IconClose className="size-3.5" /> : "≡"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      {open && (
        <MobileMenu
          active={active}
          lang={lang}
          sound={sound}
          hasAtmosphere={hasAtmosphere}
          onToggleSound={handleToggleSound}
          onToggleLang={handleToggleLang}
          onNavigate={() => setOpen(false)}
          onGame={onGame}
          onTerminal={onTerminal}
          onPortal={onPortal}
          onLab={onLab}
          onResumeModal={onResumeModal}
          onSoundscapeModal={onSoundscapeModal}
          onMegaMenu={onMegaMenu}
        />
      )}

      <EmojiRain />
    </Fragment>
  );
}

function MobileMenu({
  active,
  lang,
  sound,
  hasAtmosphere,
  onToggleSound,
  onToggleLang,
  onNavigate,
  onGame,
  onTerminal,
  onPortal,
  onLab,
  onResumeModal,
  onSoundscapeModal,
  onMegaMenu
}) {
  const ref = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onNavigate();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = ref.current;
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: -12, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-menu-item]"),
        { autoAlpha: 0, x: lang === "fa" ? -16 : 16 },
        { autoAlpha: 1, x: 0, duration: 0.35, delay: 0.05, stagger: 0.04, ease: "power3.out" }
      );
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lang, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-18 sm:p-6 xl:hidden"
      data-lenis-prevent="true"
    >
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-md transition-opacity"
        onClick={onNavigate}
        aria-hidden="true"
      />

      <nav
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-lg max-h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain no-scrollbar rounded-2xl border border-line bg-coal p-6 shadow-2xl shadow-black/80"
      >
        {/* Navigation links */}
        <div className="flex flex-col divide-y divide-line/60">
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              data-menu-item
              onClick={() => {
                playClick(500);
                onNavigate();
              }}
              className={`flex items-baseline justify-between py-3.5 font-display text-xl font-bold transition-colors ${
                active === id ? "text-ember-hi font-extrabold" : "text-bone hover:text-ember-hi"
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span className={`mono text-[10px] ${active === id ? "text-ember-hi font-bold" : "text-ember"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t(lang, NAV[id])}</span>
              </div>
              {active === id && (
                <span className="size-2 rounded-full bg-ember-hi shadow-[0_0_8px_rgba(255,217,160,0.85)]" />
              )}
            </a>
          ))}
        </div>

        {/* Quick action grid */}
        <div className="mt-5 space-y-2.5">
          {/* Client Portal Button */}
          <button
            onClick={() => {
              playClick(600);
              onNavigate();
              onPortal?.();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-ember-hi/60 bg-ember/15 py-3 text-center mono text-xs font-bold uppercase tracking-widest text-ember-hi transition-all hover:bg-ember/25 hover:border-ember-hi shadow-[0_0_14px_rgba(255,217,160,0.25)] cursor-pointer"
          >
            <IconFolder className="size-4 text-ember-hi" />
            <span>{lang === "fa" ? "ورود به پنل و داشبورد کارفرمایان" : "Client Portal & Dashboard"}</span>
          </button>

          {/* Radio / Soundscapes & Lab */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                playClick(520);
                onNavigate();
                onSoundscapeModal?.();
              }}
              className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-center mono text-xs cursor-pointer ${
                hasAtmosphere
                  ? "border-ember bg-ember/20 text-ember-hi"
                  : "border-line bg-smoke/60 text-bone hover:border-ember"
              }`}
            >
              <IconRadio className="size-3.5 text-ember-hi" />
              <span>{t(lang, { en: "Radio FX", fa: "رادیو نوآر" })}</span>
            </button>

            <button
              onClick={() => {
                playClick(620);
                onNavigate();
                onLab?.();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-smoke/60 py-2.5 text-center mono text-xs text-bone hover:border-ember cursor-pointer"
            >
              <IconFlask className="size-3.5 text-ember-hi" />
              <span>{t(lang, { en: "Creative Lab", fa: "آزمایشگاه کد" })}</span>
            </button>
          </div>

          {/* Resume & Mega Menu */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                playClick(640);
                onNavigate();
                onResumeModal?.();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-smoke/60 py-2.5 text-center mono text-xs text-bone hover:border-ember cursor-pointer"
            >
              <IconDocument className="size-3.5 text-ember-hi" />
              <span>{t(lang, { en: "Dossier CV", fa: "رزومه رسمی" })}</span>
            </button>

            <button
              onClick={() => {
                playClick(500);
                onNavigate();
                onMegaMenu?.();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-smoke/60 py-2.5 text-center mono text-xs text-bone hover:border-ember cursor-pointer"
            >
              <IconMenuGrid className="size-3.5" />
              <span>{t(lang, { en: "Sitemap", fa: "فهرست جامع" })}</span>
            </button>
          </div>
        </div>

        {/* Terminal and Mini-Game */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              playClick();
              onNavigate();
              onTerminal();
            }}
            className="mono rounded-full border border-line py-2.5 text-center text-[10px] uppercase tracking-widest text-ash transition-all hover:border-ember hover:text-ember-hi hover:bg-ember/10 flex items-center justify-center gap-1 cursor-pointer"
          >
            <IconTerminal className="size-3" />
            <span>~/terminal</span>
          </button>
          <button
            onClick={() => {
              playClick();
              onNavigate();
              onGame();
            }}
            className="mono rounded-full border border-ember/50 bg-ember/10 py-2.5 text-center text-[10px] uppercase tracking-widest text-ember-hi transition-all hover:bg-ember hover:text-void cursor-pointer"
          >
            <span className="inline-flex items-center justify-center gap-1.5">
              <IconPlay className="size-3 text-ember" />
              <span>{t(lang, { en: "ember hunter", fa: "شکارچی ذغال" })}</span>
            </span>
          </button>
        </div>

        {/* Secondary controls (SFX Mute + Language) */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={onToggleLang}
            className="mono flex-1 rounded-full border border-line/70 py-2.5 text-center text-[10px] uppercase tracking-widest text-ash transition-all hover:border-ember hover:text-ember-hi hover:bg-ember/10 cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <IconGlobe className="size-3.5" />
            <span>{lang === "fa" ? "English" : "فارسی"}</span>
          </button>
          <button
            onClick={onToggleSound}
            className={`mono flex-1 rounded-full border py-2.5 text-center text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              sound
                ? "border-ember/70 text-ember-hi bg-ember/10"
                : "border-line/70 text-mute hover:border-ember hover:text-ember-hi hover:bg-ember/10"
            }`}
          >
            {sound ? <IconSoundOn className="size-3.5" /> : <IconSoundOff className="size-3.5" />}
            <span>{sound ? t(lang, STR.soundOn) : t(lang, STR.soundOff)}</span>
          </button>
        </div>

        <p className="mono mt-5 text-center text-[9px] uppercase tracking-widest text-mute">
          {t(lang, SCENE_LABELS[0])} · {lang === "fa" ? "مشهد" : "MASHHAD"}
        </p>
      </nav>
    </div>
  );
}

export default Nav;
