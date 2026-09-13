import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "../lib/smooth.js";
import { SectionShell } from "./About.jsx";
import { SKILLS, SKILLS_NOTE, SKILLS_TITLE, SCENE_LABELS, t } from "../content.js";

export function Skills({ lang }) {
  const grid = useRef(null);

  const faNum = (s) =>
    lang === "fa" ? String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) : String(s);

  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const bars = el.querySelectorAll("[data-bar]");
    const nums = el.querySelectorAll("[data-num]");

    if (hasAnimated.current) {
      // Already animated, just update numbers to current language digits instantly
      nums.forEach((n) => {
        const target = Number(n.dataset.num ?? 0);
        n.textContent = faNum(target);
      });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        bars.forEach((b, i) => {
          const w = b.dataset.bar ?? "0";
          gsap.fromTo(b, { width: "0%" }, { width: `${w}%`, duration: 1.2, delay: i * 0.06, ease: "power3.out" });
        });
        nums.forEach((n, i) => {
          const target = Number(n.dataset.num ?? 0);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.3,
            delay: i * 0.06,
            ease: "power3.out",
            onUpdate: () => {
              n.textContent = faNum(Math.round(state.v));
            }
          });
        });
      }
    });

    return () => st.kill();
  }, [lang]);


  return (
    <SectionShell id="skills" index="02" title={t(lang, SKILLS_TITLE)} sub={t(lang, SCENE_LABELS[1])}>
      <p className="mono -mt-6 sm:-mt-8 mb-8 sm:mb-12 text-[10px] uppercase tracking-[0.25em] text-mute">
        {t(lang, SKILLS_NOTE)} <span className="text-ember">///</span>
      </p>

      <div ref={grid} className="grid gap-x-8 sm:gap-x-14 gap-y-7 sm:gap-y-9 md:grid-cols-2">
        {SKILLS.map((s, i) => (
          <div key={s.name} data-reveal="true" data-delay={(i % 2) * 0.08} className="group">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="latin font-display text-base sm:text-lg font-bold tracking-wide text-bone group-hover:text-ember transition-colors">
                {s.name}
              </span>
              <span className="mono text-xs text-mute">
                <span data-num={s.level}>{faNum(s.level)}</span>
                <span className="text-line mx-0.5">/</span>
                {faNum("100")}
              </span>
            </div>

            <div className="relative h-[6px] overflow-hidden rounded-full bg-smoke">
              <div
                data-bar={s.level}
                className="absolute inset-y-0 start-0 w-0 rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-hi"
                style={{ boxShadow: "0 0 14px rgb(232 163 61 / 0.55)" }}
              />
            </div>

            <p className="mono mt-2 text-[10px] uppercase tracking-widest text-mute">
              {t(lang, s.note)}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export default Skills;
