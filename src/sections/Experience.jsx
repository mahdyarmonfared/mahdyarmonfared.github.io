import { SectionShell } from "./About.jsx";
import { TIMELINE, TIMELINE_TITLE, SCENE_LABELS, t } from "../content.js";

export function Experience({ lang }) {
  const faNum = (s) =>
    lang === "fa" ? String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) : String(s);

  const formatPeriod = (period) => {
    if (typeof period === "object" && period !== null) {
      return t(lang, period);
    }
    return faNum(period);
  };

  return (
    <SectionShell id="experience" index="04" title={t(lang, TIMELINE_TITLE)} sub={t(lang, SCENE_LABELS[2])}>
      <div className="relative ps-6 sm:ps-14">
        {/* Timeline Line */}
        <div className="absolute bottom-0 start-2 top-0 w-px bg-gradient-to-b from-ember/70 via-line to-transparent sm:start-3" />

        <ol className="space-y-10 sm:space-y-14">
          {TIMELINE.map((item, i) => (
            <li key={i} className="relative" data-reveal="true" data-delay={i * 0.06}>
              {/* Timeline Dot */}
              <span className="absolute -start-6 top-1.5 sm:-start-14 flex items-center justify-center size-4 sm:size-6">
                <span
                  className={`block size-2.5 sm:size-3 rounded-full ${
                    i === 0 ? "bg-ember anim-pulse-dot" : "bg-mute"
                  }`}
                />
              </span>

              {/* Card */}
              <div className="group grid gap-2 rounded-xl border border-transparent p-2 sm:p-4 transition-colors hover:border-line hover:bg-coal/50 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <p className="mono pt-1 text-xs uppercase tracking-[0.2em] text-ember">
                  {formatPeriod(item.period)}
                </p>

                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                    {t(lang, item.title)}
                  </h3>
                  <p className="mono mt-1 text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
                    {t(lang, item.org)}
                  </p>
                  <p className="mt-2.5 sm:mt-3 max-w-2xl text-sm sm:text-base leading-7 sm:leading-8 text-ash">
                    {t(lang, item.body)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mono mt-12 sm:mt-14 ps-1 text-[10px] uppercase tracking-[0.3em] text-mute flex items-center gap-1">
          <span>{lang === "fa" ? "ادامه دارد…" : "to be continued…"}</span>
          <span className="anim-blink text-ember">▋</span>
        </p>
      </div>
    </SectionShell>
  );
}

export default Experience;
