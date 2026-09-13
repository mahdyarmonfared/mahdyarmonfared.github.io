import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth.js";
import { FOOTER, BRAND, STR, SOCIALS, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";

export function Footer({ lang, onTop, onGame }) {
  const marquee = useRef(null);
  const root = useRef(null);
  const [year] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-big",
        { yPercent: 30, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom bottom", scrub: 0.6 }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = marquee.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom bottom",
      onUpdate: (self) => {
        const w = el.scrollWidth / 2;
        el.style.transform = `translateX(${-self.progress * w}px)`;
      }
    });
    return () => st.kill();
  }, []);

  const items = ["REACT", "JAVASCRIPT", "TAILWIND", "SCSS", "BOOTSTRAP", "WORDPRESS", "NODE", "MASHHAD", "RTL"];

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-void/60 pt-10 sm:pt-14">
      {/* Marquee ticker */}
      <div className="mb-10 sm:mb-14 overflow-hidden py-3" dir="ltr" aria-hidden="true">
        <div ref={marquee} className="flex w-max items-center gap-8 sm:gap-10 will-change-transform">
          {[...items, ...items].map((s, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-10">
              <span className={`mono text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] ${
                i % 3 === 0 ? "text-ember" : "text-mute"
              }`}>
                {s}
              </span>
              <span className="text-line">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-4 sm:px-10">
        {/* Giant footer title with clamp */}
        <div className="overflow-hidden">
          <h2
            className="footer-big font-display text-[15vw] sm:text-[18vw] font-black leading-[0.85] tracking-tighter text-transparent select-none"
            style={{ WebkitTextStroke: "1px #2c2c38" }}
            data-cursor="link"
          >
            {t(lang, FOOTER.big)}
          </h2>
        </div>

        {/* Footer info & links */}
        <div className="mt-8 flex flex-col justify-between gap-8 sm:gap-10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-sm">
            <p className="font-display text-lg sm:text-xl font-bold">{t(lang, BRAND)}</p>
            <p className="mt-2 text-xs sm:text-sm leading-6 sm:leading-7 text-mute">
              {t(lang, FOOTER.built)}
            </p>
            <button
              onClick={() => {
                playBlip(780);
                onGame();
              }}
              data-cursor="link"
              className="mono mt-4 sm:mt-5 text-[10px] uppercase tracking-[0.2em] text-ember underline-offset-4 hover:underline"
            >
              ▶ {t(lang, STR.openGame)}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                onClick={() => playClick(540)}
                className="latin group flex items-center justify-between gap-4 py-1.5 text-xs sm:text-sm text-ash transition-colors hover:text-ember"
              >
                <span>{s.label}</span>
                <span className="mono text-[9px] opacity-40 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}

            <button
              onClick={() => {
                playClick(650);
                onTop();
              }}
              data-cursor="link"
              className="mono col-span-2 mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-mute transition-colors hover:text-ember"
            >
              ↑ {t(lang, STR.backToTop)}
            </button>
          </div>

          <div className="mono flex flex-col gap-1.5 sm:gap-2 text-start lg:text-end text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
            <span>© {year} {BRAND.en}</span>
            <span>{t(lang, { en: "made in the dark", fa: "ساخته‌شده در تاریکی" })}</span>
            <span className="text-ember/70">{t(lang, FOOTER.tip)}</span>
          </div>
        </div>
      </div>

      {/* Hanging Detective Bulb at bottom */}
      <div className="pointer-events-none relative grid h-24 sm:h-32 place-items-center" aria-hidden="true">
        <div className="flex flex-col items-center">
          <div className="cord h-8 sm:h-10" />
          <div className="bulb anim-flicker" style={{ width: 8, height: 8 }} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
