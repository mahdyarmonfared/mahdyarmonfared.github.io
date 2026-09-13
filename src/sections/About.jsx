import { useRef } from "react";
import { ABOUT, SCENE_LABELS, BRAND, t } from "../content.js";
import { SplitWords } from "../components/Effects.jsx";

export function SectionShell({ id, index, title, sub, children }) {
  const root = useRef(null);
  return (
    <section
      ref={root}
      id={id}
      className="relative mx-auto max-w-[110rem] scroll-mt-24 px-4 py-20 sm:px-10 sm:py-36"
    >
      <header className="mb-10 sm:mb-20" data-reveal="true">
        <p className="mono mb-2.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-mute">
          {index} — <span data-scene-chip={id}>{sub}</span>
        </p>
        <div className="flex items-end justify-between gap-4 sm:gap-6 overflow-visible pb-1 sm:pb-2">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight pb-1 leading-[1.15]">
            {title}
          </h2>
          <div className="hairline mb-3 hidden flex-1 sm:block" />
          <span className="mono mb-3 hidden text-ember sm:block" aria-hidden="true">
            ◉
          </span>
        </div>
      </header>
      {children}
    </section>
  );
}

export function About({ lang }) {
  const facts = [
    { k: ABOUT.facts.born, v: ABOUT.facts.bornVal },
    { k: ABOUT.facts.base, v: ABOUT.facts.baseVal },
    { k: ABOUT.facts.focus, v: ABOUT.facts.focusVal },
    { k: ABOUT.facts.status, v: ABOUT.facts.statusOpen, live: true }
  ];

  return (
    <SectionShell id="about" index="01" title={t(lang, ABOUT.title)} sub={t(lang, SCENE_LABELS[1])}>
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Main Dossier Card */}
        <div
          data-reveal="true"
          className="dotted-grid relative rounded-xl border border-line bg-coal p-5 sm:p-10 lg:p-12 shadow-xl shadow-black/40"
        >
          {/* Stamp */}
          <div className="stamp absolute end-4 sm:end-6 top-4 sm:top-6 rounded px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold opacity-80 z-10">
            {lang === "fa" ? "محرمانه" : "CONFIDENTIAL"}
          </div>

          {/* Profile Header */}
          <div className="mb-6 sm:mb-8 flex items-center gap-4 sm:gap-5">
            <div className="relative size-20 sm:size-24 shrink-0 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember via-ember-deep to-void" />
              <div className="absolute inset-[3px] grid place-items-center overflow-hidden rounded-full bg-void">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-ember">
                  {lang === "fa" ? "م.م" : "MM"}
                </span>
              </div>
              <span className="absolute -end-0.5 -top-0.5 size-3.5 sm:size-4 rounded-full border-2 border-coal bg-ember anim-pulse-dot" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute truncate">
                SUBJECT / {ABOUT.code}
              </p>
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold truncate">
                {t(lang, BRAND)}
              </p>
              <p className="text-xs sm:text-sm text-ash truncate">
                {t(lang, { en: "frontend developer · web designer", fa: "توسعه‌دهنده فرانت‌اند · طراح سایت" })}
              </p>
            </div>
          </div>

          {/* Narrative paragraphs */}
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-7 sm:leading-8 text-ash">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} data-reveal="true" data-delay={i * 0.12}>
                {t(lang, p)}
              </p>
            ))}
          </div>

          {/* Note redacted */}
          <p className="mt-6 select-none flex items-center gap-1.5 flex-wrap" aria-hidden="true">
            <span className="mono text-[10px] sm:text-xs text-mute">NOTE:</span>
            <span className="rounded-sm bg-line px-8 sm:px-12 py-0.5 text-line text-[10px]">
              redacted
            </span>
            <span className="mono text-[10px] sm:text-xs text-mute">
              {lang === "fa" ? "… یا شاید هنوز نه." : "… or maybe not yet."}
            </span>
          </p>
        </div>

        {/* Sidebar facts & Doctrine */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {facts.map((f, i) => (
            <div
              key={i}
              data-reveal="true"
              data-delay={i * 0.08}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 rounded-xl border border-line bg-coal/50 px-5 py-4 transition-colors hover:border-ember/60"
            >
              <span className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute">
                {t(lang, f.k)}
              </span>
              <span
                className={`text-start sm:text-end font-display text-sm sm:text-base font-bold ${
                  f.live ? "text-ember" : "text-bone"
                }`}
              >
                {f.live && (
                  <span className="me-2 inline-block size-2 rounded-full bg-ember anim-pulse-dot align-middle" />
                )}
                {t(lang, f.v)}
              </span>
            </div>
          ))}

          {/* Working Doctrine card */}
          <div
            data-reveal="true"
            data-y={50}
            className="relative overflow-hidden rounded-xl border border-ember/30 bg-ember/5 p-5 sm:p-6"
          >
            <p className="font-display text-xl sm:text-2xl font-extrabold leading-snug">
              {t(lang, {
                en: '"Make it load in 800ms — then make it unforgettable."',
                fa: "«۸۰۰ میلی‌ثانیه لود شود — بعد فراموش‌نشدنی باشد.»"
              })}
            </p>
            <p className="mono mt-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
              — {lang === "fa" ? "دکترین کاری" : "working doctrine"}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default About;
