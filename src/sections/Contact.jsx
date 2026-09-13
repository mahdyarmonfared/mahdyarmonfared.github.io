import { useRef, useState } from "react";
import { SectionShell } from "./About.jsx";
import { Magnetic } from "../components/Effects.jsx";
import { CONTACT, SOCIALS, SCENE_LABELS, t, STR } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";

export function Contact({ lang }) {
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const name = useRef(null);
  const msg = useRef(null);

  const copyEmail = async () => {
    playClick(640);
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      playBlip(880);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    playClick(500);
    const n = name.current?.value.trim() || "";
    const m = msg.current?.value.trim() || "";

    if (!m) {
      setStatusMsg(lang === "fa" ? "لطفاً متن پیام را وارد کنید." : "Please enter a message.");
      setTimeout(() => setStatusMsg(""), 3000);
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry — ${n || "Visitor"}`);
    const body = encodeURIComponent(m);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatusMsg(t(lang, CONTACT.thanks));
    setTimeout(() => setStatusMsg(""), 4000);
  };

  return (
    <SectionShell id="contact" index="05" title={t(lang, CONTACT.title)} sub={t(lang, SCENE_LABELS[3])}>
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Left Column: Email & Contact Form */}
        <div>
          <p className="mb-8 sm:mb-10 max-w-lg text-base sm:text-xl leading-8 sm:leading-9 text-ash">
            {t(lang, CONTACT.lead)}
          </p>

          <Magnetic strength={0.15}>
            <button
              onClick={copyEmail}
              data-cursor="view"
              data-cursor-label={copied ? "✓" : "COPY"}
              className="group block text-start"
            >
              <span className="latin block break-all font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-bone transition-colors group-hover:text-ember">
                {CONTACT.email}
              </span>
              <span className="mono mt-2 block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute">
                {copied ? t(lang, CONTACT.copied) : t(lang, CONTACT.copy)}
              </span>
            </button>
          </Magnetic>

          {/* Direct 15-Min Wire Session CTA */}
          <div className="mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => {
                playBlip(800);
                window.dispatchEvent(new Event("open-booking"));
              }}
              className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-5 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <span className="size-2 rounded-full bg-emerald-400 anim-pulse-dot" />
              <span>{lang === "fa" ? "رزرو جلسه هماهنگی آنلاین (۱۵ دقیقه رایگان) ↗" : "Book 15-Min Free Wire Session ↗"}</span>
            </button>
          </div>

          <form onSubmit={submit} className="mt-8 sm:mt-10 space-y-3.5 sm:space-y-4">
            <input
              ref={name}
              placeholder={t(lang, CONTACT.form.name)}
              className="w-full rounded-xl border border-line bg-coal/60 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-bone outline-none transition-colors placeholder:text-mute focus:border-ember"
            />
            <textarea
              ref={msg}
              rows={4}
              placeholder={t(lang, CONTACT.form.msg)}
              className="w-full resize-none rounded-xl border border-line bg-coal/60 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-bone outline-none transition-colors placeholder:text-mute focus:border-ember"
            />

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                data-cursor="link"
                className="mono rounded-full bg-bone px-7 py-3 sm:px-8 sm:py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-void transition-all hover:bg-ember hover:scale-[1.02]"
              >
                {t(lang, CONTACT.form.mailto)} →
              </button>

              {statusMsg && (
                <span className="mono text-xs text-ember anim-blink">
                  {statusMsg}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Social Links & Response Time */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {SOCIALS.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              data-reveal="true"
              data-delay={i * 0.08}
              onClick={() => playClick(550)}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-coal/60 px-5 sm:px-7 py-5 sm:py-6 transition-colors hover:border-ember/60"
            >
              <span className="latin font-display text-lg sm:text-xl font-bold truncate">
                {s.label}
              </span>
              <span className="mono text-xs text-mute transition-all group-hover:-translate-y-0.5 group-hover:text-ember truncate max-w-[160px] sm:max-w-none">
                {s.href.replace("https://", "")} ↗
              </span>
            </a>
          ))}

          {/* Response Time Box */}
          <div
            data-reveal="true"
            className="relative overflow-hidden rounded-xl border border-ember/25 bg-gradient-to-b from-ember/10 to-transparent p-5 sm:p-7"
          >
            <p className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute">
              RESPONSE TIME
            </p>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-ember">
              {lang === "fa" ? "کمتر از ۲۴ ساعت" : "under 24h"}
            </p>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-ash">
              {t(lang, {
                en: "Usually faster. Night owls reply at 2 a.m. — check timestamps.",
                fa: "معمولاً زودتر. جغدهای شب ساعت ۲ جواب می‌دهند — به timestampها دقت کنید."
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Mini-Game trigger bar */}
      <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line bg-coal/40 p-4 sm:px-6 sm:py-4">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-mute">
          {t(lang, STR.openGame)} —{" "}
          <span className="text-ember">
            {lang === "fa" ? "شکارچی ذغال" : "EMBER HUNTER"}
          </span>
        </p>

        <button
          onClick={() => {
            playBlip(750);
            window.dispatchEvent(new CustomEvent("open-game"));
          }}
          data-cursor="link"
          className="mono self-start sm:self-auto rounded-full border border-ember/50 px-5 py-2 text-[10px] uppercase tracking-widest text-ember transition-colors hover:bg-ember hover:text-void"
        >
          ▶ {t(lang, { en: "launch", fa: "اجرا" })}
        </button>
      </div>
    </SectionShell>
  );
}

export default Contact;
