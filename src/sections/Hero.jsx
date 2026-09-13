import { useEffect, useRef } from "react";
import { gsap } from "../lib/smooth.js";
import { Magnetic } from "../components/Effects.jsx";
import { HERO, BRAND, AVAILABILITY, SCENE_LABELS, t } from "../content.js";
import { playClick } from "../lib/sound.js";
import { IconCalculator, IconDocument, IconTerminal } from "../components/Icons.jsx";

const LINES = [HERO.line1, HERO.line2, HERO.line3];

function Hero({ lang, onTerminal, onResumeModal }) {
  const root = useRef(null);

  const mountedRef = useRef(false);

  // Parallax on scroll - only register once
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-inner", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true }
      });

      gsap.to(".bulbs-row", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Text entrance & language switch animation
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const lines = el.querySelectorAll(".hero-line");
    const kicker = el.querySelector(".hero-kicker");
    const tail = el.querySelector(".hero-tail");
    const ctas = el.querySelectorAll(".hero-cta");
    const isFa = lang === "fa";

    // Initial page load: dramatic smooth entrance without rotate clipping
    if (!mountedRef.current) {
      mountedRef.current = true;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          lines,
          { yPercent: 105, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
            stagger: 0.12,
            delay: 0.1,
            ease: "power3.out",
            clearProps: "transform"
          }
        );

        if (isFa) {
          gsap.fromTo(
            kicker,
            { autoAlpha: 0, y: -10 },
            { autoAlpha: 1, y: 0, duration: 1.0, delay: 0.15, ease: "power2.out", clearProps: "transform" }
          );
        } else {
          gsap.fromTo(
            kicker,
            { autoAlpha: 0, y: -10 },
            { autoAlpha: 1, y: 0, duration: 1.0, delay: 0.15, ease: "power2.out", clearProps: "transform" }
          );
        }

        gsap.fromTo(
          tail,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1.0, delay: 0.4, ease: "power3.out", clearProps: "transform" }
        );

        gsap.fromTo(
          ctas,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.55, stagger: 0.1, ease: "power3.out", clearProps: "transform" }
        );
      }, el);

      return () => ctx.revert();
    }

    // Subsequent renders (when user toggles language): silky smooth crossfade
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "transform" }
      );
      gsap.fromTo(
        [kicker, tail],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
    }, el);

    return () => ctx.revert();
  }, [lang]);


  return (
    <section ref={root} id="home" className="relative min-h-svh overflow-hidden">
      {/* Hanging Bulbs Row - responsive density */}
      <div className="bulbs-row pointer-events-none absolute inset-x-0 top-0 flex h-full justify-around px-4 sm:px-6 opacity-70">
        {[88, 150, 60, 190, 110, 70, 160].map((h, i) => (
          <div
            key={i}
            className={`anim-sway flex flex-col items-center ${
              i % 2 !== 0 && i !== 3 ? "hidden sm:flex" : "flex"
            }`}
            style={{ animationDelay: `${i * 0.7}s` }}
          >
            <div className="cord" style={{ height: h }} />
            <div className="bulb anim-flicker" style={{ animationDelay: `${i * 1.3 + 0.4}s` }} />
          </div>
        ))}
      </div>

      {/* Hero Inner Container */}
      <div className="hero-inner relative z-10 mx-auto flex min-h-svh max-w-[110rem] flex-col justify-center px-4 pt-28 pb-20 sm:px-10 sm:pt-36 lg:pt-40">
        {/* Live Availability Badge */}
        <div className="mt-2 mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-sm self-start">
          <span className="size-2 rounded-full bg-emerald-400 anim-pulse-dot" />
          <span>{t(lang, AVAILABILITY.status)}</span>
          <span className="text-emerald-500/60">·</span>
          <span className="mono text-[10px] text-emerald-300">{t(lang, AVAILABILITY.period)}</span>
        </div>

        {/* Kicker */}
        <p className="hero-kicker mono mb-5 text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-ember sm:text-xs">
          {t(lang, HERO.kicker)}
        </p>

        {/* Main Headline */}
        <h1 className={`font-display font-extrabold tracking-tight ${lang === "fa" ? "leading-[1.25] pb-3" : "leading-[0.98]"}`}>
          {LINES.map((l, i) => (
            <span key={i} className={`block overflow-hidden ${lang === "fa" ? "py-2 sm:py-2.5" : "py-0.5"}`}>
              <span
                className={
                  "hero-line block text-[clamp(1.9rem,10vw,7.5rem)] break-words " +
                  (i === 1 ? "text-ember glow-text" : "text-bone")
                }
              >
                {t(lang, l)}
              </span>
            </span>
          ))}
        </h1>

        {/* Tail subtext */}
        <p className="hero-tail mt-6 sm:mt-8 max-w-xl text-base leading-relaxed text-ash sm:text-2xl">
          {t(lang, HERO.tail)}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
          <Magnetic strength={0.4} className="w-full sm:w-auto">
            <a
              href="#projects"
              data-cursor="view"
              data-cursor-label="OPEN"
              onClick={() => playClick(600)}
              className="hero-cta inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-ember px-7 py-3.5 sm:px-8 sm:py-4 font-bold text-void transition-transform hover:scale-[1.03]"
            >
              <span>{t(lang, HERO.cta)}</span>
              <span aria-hidden="true" className={lang === "fa" ? "rotate-180" : ""}>
                →
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <a
              href="#estimator"
              onClick={() => playClick(620)}
              className="hero-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ember-hi/40 bg-ember/10 px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-ember-hi transition-all hover:bg-ember/25 hover:border-ember-hi"
            >
              <IconCalculator className="size-4" />
              <span>{t(lang, { en: "Estimate Project", fa: "برآورد هوشمند پرونده" })}</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                playClick(640);
                onResumeModal?.();
              }}
              data-cursor="link"
              className="hero-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 sm:px-7 sm:py-4 text-center text-ash transition-colors hover:border-ember hover:text-bone"
            >
              <IconDocument className="size-4" />
              <span>{t(lang, { en: "Dossier CV", fa: "رزومه رسمی" })}</span>
            </button>
          </Magnetic>

          <Magnetic strength={0.2} className="w-full sm:w-auto">
            <button
              onClick={() => {
                playClick(680);
                onTerminal();
              }}
              data-cursor="link"
              className="hero-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 sm:px-6 sm:py-4 text-center text-mute transition-colors hover:border-ash hover:text-ash"
            >
              <IconTerminal className="size-3.5" />
              <span>~/terminal</span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Scene info bar */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-10 mx-auto flex max-w-[110rem] items-end justify-between px-4 sm:px-10">
        <div className="mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
          <span className="text-ember">{BRAND.en.toUpperCase()} /</span>{" "}
          <span data-active-scene>{t(lang, SCENE_LABELS[0])}</span>
        </div>
        <div className="mono hidden items-center gap-2 text-[10px] uppercase tracking-widest text-mute sm:flex">
          {t(lang, HERO.scroll)}
          <span className="anim-blink text-ember">▋</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
