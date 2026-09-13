import { useState } from "react";
import { TESTIMONIALS, t } from "../content.js";
import { playClick } from "../lib/sound.js";
import { IconCheck, IconLock } from "../components/Icons.jsx";

export default function Testimonials({ lang }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 px-4 sm:px-10 border-t border-line/50">
      {/* Background noir mood */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-ember/5 via-transparent to-transparent opacity-30" />

      <div className="mx-auto max-w-[110rem]">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <div className="mono inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3.5 py-1 text-[10px] tracking-widest text-ember-hi uppercase mb-4">
            <span className="size-1.5 rounded-full bg-ember-hi anim-pulse-dot" />
            <span>{t(lang, { en: "SWORN DEPOSITIONS", fa: "شهادت‌نامه رسمی و استشهاد پرونده‌ها" })}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-bone pb-1 leading-[1.2]">
            {t(lang, TESTIMONIALS.title)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ash leading-relaxed">
            {t(lang, TESTIMONIALS.sub)}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.items.map((item, idx) => {
            const isFeatured = idx === activeIdx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setActiveIdx(idx);
                  playClick(450 + idx * 30);
                }}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 backdrop-blur-sm ${
                  isFeatured
                    ? "border-ember/70 bg-coal/90 shadow-[0_0_30px_rgba(232,163,61,0.12)] scale-[1.01]"
                    : "border-line bg-coal/60 hover:border-ember/40 hover:bg-coal/80"
                }`}
              >
                {/* Noir Evidence Tape / Stamp Header */}
                <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="mono text-[10px] text-ember-hi bg-ember/15 px-2.5 py-1 rounded-md border border-ember/30">
                      {item.caseId}
                    </span>
                    <span className="mono text-[10px] text-mute uppercase">
                      {t(lang, item.tag)}
                    </span>
                  </div>

                  {/* Golden Verified Badge */}
                  <div className="flex items-center gap-1.5">
                    <span className="mono text-[9px] uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <IconCheck className="size-2.5" />
                      <span>{t(lang, TESTIMONIALS.seal)}</span>
                    </span>
                  </div>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-ember text-sm mb-5" aria-label="5 out of 5 stars">
                  {"★".repeat(item.rating)}
                </div>

                {/* Quote Body */}
                <p className="font-serif text-base sm:text-lg text-bone leading-relaxed mb-8 italic">
                  «{t(lang, item.quote)}»
                </p>

                {/* Client Profile Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-line/40">
                  <div>
                    <div className="font-display font-bold text-bone text-base group-hover:text-ember-hi transition-colors">
                      {t(lang, item.name)}
                    </div>
                    <div className="text-xs text-ash mt-0.5">
                      {t(lang, item.role)}
                    </div>
                  </div>

                  <div className="mono text-[10px] text-mute">
                    {item.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Seal Banner */}
        <div className="mt-12 rounded-2xl border border-line bg-void/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <IconLock className="size-6 text-ember shrink-0" />
            <div>
              <div className="text-sm font-bold text-bone">
                {t(lang, {
                  en: "100% Client Discretion & Verified Testimonials",
                  fa: "تعهد کامل به رازداری تجاری و حفظ منافع پرونده‌ها"
                })}
              </div>
              <div className="text-xs text-ash mt-0.5">
                {t(lang, {
                  en: "All testimonials are sworn depositions from actual delivered productions.",
                  fa: "تمامی اظهارات فوق از تجارب عملی و محصولات نهایی منتشرشده استخراج شده‌اند."
                })}
              </div>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => playClick(600)}
            className="mono text-xs uppercase tracking-wider text-ember-hi hover:underline shrink-0"
          >
            {t(lang, { en: "Initiate your case →", fa: "شروع بازپرسی پرونده شما ←" })}
          </a>
        </div>
      </div>
    </section>
  );
}

