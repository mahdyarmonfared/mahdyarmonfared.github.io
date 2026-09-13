import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NAV, BRAND, AVAILABILITY, t } from "../content.js";
import {
  IconFolder,
  IconTerminal,
  IconFlask,
  IconRadio,
  IconDocument,
  IconCalculator,
  IconTelegram,
  IconCheck,
  IconClose
} from "./Icons.jsx";
import { playClick, playBlip } from "../lib/sound.js";

const SECTIONS = [
  { id: "home", num: "01", desc: { en: "Entrance & Noir Statement", fa: "ورودی و بیانیه طراحی تاریک" } },
  { id: "about", num: "02", desc: { en: "Detective Background & Origin", fa: "پرونده فردی و خاستگاه کارآگاه" } },
  { id: "skills", num: "03", desc: { en: "React, TypeScript & Motion", fa: "زرادخانه فنی و ابزارهای توسعه" } },
  { id: "projects", num: "04", desc: { en: "Interrogated Case Productions", fa: "پرونده‌های تحویل داده‌شده" } },
  { id: "impact", num: "05", desc: { en: "Before/After Redesign Curtain", fa: "پرده تعاملی قبل و بعد بازطراحی" } },
  { id: "estimator", num: "06", desc: { en: "Real-time Scope & Budget Matrix", fa: "برآورد هزینه و زمان‌بندی تحویل" } },
  { id: "testimonials", num: "07", desc: { en: "Verified Client Depositions", fa: "شهادت مستند کارفرمایان قبلی" } },
  { id: "experience", num: "08", desc: { en: "Career Chronology & Milestones", fa: "گاه‌شمار فعالیت‌های حرفه‌ای" } },
  { id: "contact", num: "09", desc: { en: "Encrypted Communication Wire", fa: "کانال ارتباط مستقیم و استعلام" } }
];

export default function MegaMenu({
  open,
  onClose,
  lang,
  onPortal,
  onLab,
  onResumeModal,
  onSoundscapeModal,
  onTerminal,
  onGame,
  onNavigateHome,
  onOpenProtocol,
  onOpenBooking,
  onOpenSketchpad
}) {
  const isFa = lang === "fa";
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = overlayRef.current;
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleNavClick = (id) => {
    playClick(500);
    onClose();
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => {
        if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80 });
        else target.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      onNavigateHome?.(id);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={isFa ? "rtl" : "ltr"}
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 pt-16 sm:p-6 sm:pt-20 overflow-y-auto overscroll-contain no-scrollbar"
      data-lenis-prevent="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/90 backdrop-blur-xl transition-opacity"
        onClick={() => {
          playClick(420);
          onClose();
        }}
      />

      {/* Main Container */}
      <div
        ref={overlayRef}
        dir={isFa ? "rtl" : "ltr"}
        className="relative z-10 w-full max-w-6xl rounded-2xl border border-line/80 bg-coal/95 p-6 sm:p-10 shadow-2xl shadow-black/95 text-bone backdrop-blur-2xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-line pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="mono text-[10px] uppercase tracking-widest text-ember-hi">
                {t(lang, { en: "ARCHIVE SITEMAP // MEGA MENU", fa: "نقشه جامع پایگاه اسناد و دسترسی سریع" })}
              </span>
              <span className="size-1.5 rounded-full bg-ember-hi anim-pulse-dot" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-bone">
              {t(lang, BRAND)}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Availability pill */}
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 anim-pulse-dot" />
              <span>{t(lang, AVAILABILITY.status)}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                playClick(420);
                onClose();
              }}
              className="size-9 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer"
              aria-label="Close mega menu"
            >
              <IconClose className="size-4" />
            </button>
          </div>
        </div>

        {/* Mega Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Core Sections (7 Cols) */}
          <div className="lg:col-span-7">
            <h3 className="mono text-[10px] uppercase tracking-widest text-ember-hi mb-4">
              // {t(lang, { en: "CORE INVESTIGATION DOSSIERS", fa: "بخش‌های اصلی پرونده" })}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className="p-3.5 rounded-xl border border-line/70 bg-void/50 text-start hover:border-ember/70 hover:bg-ember/10 transition-all group cursor-pointer"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-display text-sm sm:text-base font-bold text-bone group-hover:text-ember-hi transition-colors">
                      {t(lang, NAV[sec.id])}
                    </span>
                    <span className="mono text-[10px] text-ember/70 group-hover:text-ember-hi">
                      {sec.num}
                    </span>
                  </div>
                  <p className="text-[11px] text-ash/80 group-hover:text-ash line-clamp-1">
                    {t(lang, sec.desc)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Operational Systems & Tools (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="mono text-[10px] uppercase tracking-widest text-ember-hi mb-4">
                // {t(lang, { en: "OPERATIONAL UNITS & SUITE", fa: "واحدهای عملیاتی و ابزارها" })}
              </h3>

              <div className="space-y-2.5">
                {/* Lab Button */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(750);
                    onClose();
                    onLab?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      <IconFlask className="size-4" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Creative Code Lab", fa: "آزمایشگاه کدهای خلاقانه" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Canvas physics, shaders & typography", fa: "فیزیک کانواس، سایه‌زن‌ها و تایپوگرافی" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">/lab</span>
                </button>

                {/* Portal Button */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(800);
                    onClose();
                    onPortal?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      <IconFolder className="size-4" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Client Portal & Staging", fa: "پنل و داشبورد کارفرمایان" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Milestone gauges, staging & asset vault", fa: "درصد پیشرفت، استیجینگ و تحویل فایل" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">/portal</span>
                </button>

                {/* Soundscape Modal Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playClick(500);
                    onClose();
                    onSoundscapeModal?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      <IconRadio className="size-4" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Noir Soundscape Radio", fa: "رادیو و صداهای محیطی نوآر" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Rain, cathedral bells, vinyl & wind", fa: "باران، ناقوس کلیسا، کاست و باد" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">88.4 MHz</span>
                </button>

                {/* Resume Modal Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playClick(550);
                    onClose();
                    onResumeModal?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      <IconDocument className="size-4" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Dossier CV & Print PDF", fa: "رزومه رسمی و نسخه چاپی" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Classified personnel record", fa: "اسناد هویتی و سوابق تاییدشده" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">PDF</span>
                </button>

                {/* Terminal Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playClick(600);
                    onClose();
                    onTerminal?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      <IconTerminal className="size-4" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Interactive Terminal", fa: "ترمینال تعاملی خط فرمان" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "CLI controls, secret files & diagnostics", fa: "دستورات CLI، پرونده‌های محرمانه و عیب‌یابی" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">~/sh</span>
                </button>

                {/* 15-Minute Wire Session Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(800);
                    onClose();
                    onOpenBooking?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-emerald-500/40 bg-emerald-500/20 text-emerald-300">
                      📅
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-emerald-300">
                        {t(lang, { en: "15-Min Wire Session", fa: "رزرو جلسه آنلاین (۱۵ دقیقه)" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Calendar booking, topic selection & meet link", fa: "هماهنگی تاریخ، انتخاب سرفصل و لینک جلسه" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-emerald-400">FREE</span>
                </button>

                {/* SOW & 4 Guarantees Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(750);
                    onClose();
                    onOpenProtocol?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      ✦
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Engineering Guarantees", fa: "مرام‌نامه و ۴ گارانتی رسمی" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "100% ownership, 30d warranty, milestone escrow", fa: "مالکیت کد، ۳۰ روز گارانتی رایگان و فازبندی" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">SOW</span>
                </button>

                {/* Napkin Wireframe Sketchpad */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(780);
                    onClose();
                    onOpenSketchpad?.();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-line/70 bg-void/60 hover:border-ember/60 hover:bg-ember/10 transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-line bg-smoke/60 text-ash group-hover:text-ember-hi group-hover:border-ember">
                      ✎
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-bone group-hover:text-ember-hi">
                        {t(lang, { en: "Napkin Idea Sketchpad", fa: "تخته ترسیم ایده و وایرفریم" })}
                      </div>
                      <div className="text-[11px] text-ash">
                        {t(lang, { en: "Draw layout napkin sketch and export PNG", fa: "ترسیم آزادانه ساختار بصری و ذخیره تصویر" })}
                      </div>
                    </div>
                  </div>
                  <span className="mono text-[10px] text-mute group-hover:text-ember-hi">DRAW</span>
                </button>
              </div>
            </div>

            {/* Quick Wire / Contact Strip */}
            <div className="p-4 rounded-xl border border-line/50 bg-void/40 flex items-center justify-between text-xs">
              <span className="text-ash">{t(lang, { en: "Direct Wire:", fa: "ارتباط مستقیم تلگرام:" })}</span>
              <a
                href="https://t.me/MahdyarMonfared"
                target="_blank"
                rel="noreferrer"
                className="mono font-bold text-ember-hi hover:underline flex items-center gap-1"
              >
                <IconTelegram className="size-3.5" />
                <span>@MahdyarMonfared</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
