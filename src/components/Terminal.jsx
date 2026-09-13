import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/smooth.js";
import {
  PROJECTS,
  SKILLS,
  CONTACT,
  SOCIALS,
  TERM_BANNER,
  BRAND,
  CASE_LABEL,
  t
} from "../content.js";
import { playClick, playGlitch, playBlip, toggleRainAmbience, isRainActive } from "../lib/sound.js";
import { IconClose } from "./Icons.jsx";

const QUICK_COMMANDS = ["help", "portal", "lab", "radio", "impact", "book", "guarantee", "sketch", "estimator", "resume", "witnesses", "projects", "skills", "game", "clear", "exit"];

function Terminal({
  open,
  onClose,
  lang,
  onGo,
  onGame,
  onLang,
  on404,
  onPortal,
  onLab,
  onResumeModal,
  onSoundscapeModal,
  onOpenProtocol,
  onOpenBooking,
  onOpenSketchpad
}) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const boxRef = useRef(null);
  const bootRef = useRef(false);
  const fa = lang === "fa";

  const push = useCallback((kind, text) => {
    setLines((l) => [...l, { kind, text }]);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lockScroll?.(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = boxRef.current;
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 24, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    }

    if (!bootRef.current) {
      bootRef.current = true;
      setLines([]);
      push("out", "MONFARED OS v2.5 — mounting /evidence …");
      const timers = [
        setTimeout(() => push("out", `[ ok ] filesystem · [ ok ] neon · [ ok ] memories (${PROJECTS.length} case files)`), 420),
        setTimeout(() => push("err", TERM_BANNER[lang]), 840),
        setTimeout(() => inputRef.current?.focus(), 900)
      ];
      return () => {
        timers.forEach(clearTimeout);
        document.body.style.overflow = prev;
        window.__lockScroll?.(false);
      };
    }

    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.__lockScroll?.(false);
    };
  }, [open, lang, push]);

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: 9e9 });
  }, [lines, open]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    push("in", raw);
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    playClick(620);

    switch (name) {
      case "help":
        push(
          "out",
          fa
            ? "دستورها: help · book · guarantee · sketch · impact · portal · lab · estimator · resume · witnesses · projects · open <n> · about · skills · rain · contact · socials · lang · game · 404 · clear · exit"
            : "commands: help · book · guarantee · sketch · impact · portal · lab · estimator · resume · witnesses · projects · open <n> · about · skills · rain · contact · socials · lang · game · 404 · clear · exit"
        );
        break;
      case "book":
      case "consult":
      case "meeting":
        push("out", fa ? "گشودن پنجره تنظیم جلسه مشاوره آنلاین ۱۵ دقیقه‌ای…" : "opening 15-min consultation wire booking modal…");
        playBlip(800);
        if (onOpenBooking) onOpenBooking();
        else window.dispatchEvent(new Event("open-booking"));
        onClose();
        break;
      case "guarantee":
      case "protocol":
      case "sow":
      case "warranty":
        push("out", fa ? "گشودن مرام‌نامه مهندسی و ۴ گارانتی رسمی کیفیت…" : "displaying Statement of Work & 4 Engineering Guarantees…");
        playBlip(750);
        if (onOpenProtocol) onOpenProtocol();
        else window.dispatchEvent(new Event("open-protocol"));
        onClose();
        break;
      case "sketch":
      case "draw":
      case "canvas":
      case "wireframe":
        push("out", fa ? "اجرای تخته ترسیم ایده و وایرفریم وکتور…" : "launching Interactive Napkin Idea Sketchpad…");
        playBlip(780);
        if (onOpenSketchpad) onOpenSketchpad();
        else window.dispatchEvent(new Event("open-sketchpad"));
        onClose();
        break;
      case "impact":
      case "beforeafter":
      case "curtain":
      case "benchmark":
        push("out", fa ? "انتقال به بخش اسلایدر پرده قبل و بعد بازطراحی…" : "navigating to Before/After Redesign Curtain…");
        onGo?.("impact");
        onClose();
        break;
      case "portal":
      case "client":
      case "dashboard":
        push("out", fa ? "انتقال به پرتال و داشبورد کارفرمایان…" : "opening Client Portal & Dashboard…");
        playBlip(780);
        onPortal?.();
        onClose();
        break;
      case "lab":
      case "physics":
        push("out", fa ? "انتقال به آزمایشگاه کدهای تجربی و نوآر…" : "opening Creative Code Lab…");
        playBlip(750);
        onLab?.();
        onClose();
        break;
      case "estimator":
      case "calc":
      case "quote":
        push("out", fa ? "انتقال به بخش برآورد هوشمند پرونده…" : "navigating to Case Estimator…");
        onGo?.("estimator");
        onClose();
        break;
      case "resume":
      case "cv":
        push("out", fa ? "گشودن پرونده اسناد هویتی و رزومه رسمی…" : "opening classified Personnel Dossier & CV…");
        playBlip(840);
        onResumeModal?.();
        onClose();
        break;
      case "witness":
      case "witnesses":
      case "testimonials":
        push("out", fa ? "انتقال به شهادت‌نامه شاهدان پرونده…" : "navigating to Witness Testimonies…");
        onGo?.("testimonials");
        onClose();
        break;
      case "radio":
      case "soundscape":
        push("out", fa ? "[RADIO] در حال تنظیم گیرنده رادیو نوآر 88.4 MHz…" : "[RADIO] tuning noir radio 88.4 MHz…");
        onSoundscapeModal?.();
        onClose();
        break;
      case "rain": {
        const active = toggleRainAmbience();
        push(
          "out",
          active
            ? fa
              ? "[RADIO] صدای باران محیطی فعال شد."
              : "[RADIO] ambient rain soundscape active."
            : fa
            ? "[MUTED] صدای باران متوقف شد."
            : "[MUTED] ambient rain soundscape stopped."
        );
        break;
      }
      case "about":
        push(
          "out",
          t(lang, {
            en: "Mahdyar Monfared — Frontend Developer & Web Designer, Mashhad. Builds distinctive websites and modern responsive interfaces.",
            fa: "مهدیار منفرد — توسعه‌دهنده فرانت‌اند و طراح وب، مشهد. وب‌سایت‌های سفارشی و رابط‌های کاربری مدرن و واکنش‌گرا می‌سازد."
          })
        );
        break;
      case "skills":
        SKILLS.forEach((s) =>
          push("out", `  ${s.name.padEnd(18)} ${"█".repeat(Math.round(s.level / 6))}${"░".repeat(16 - Math.round(s.level / 6))} ${s.level}`)
        );
        break;
      case "projects":
        PROJECTS.forEach((p, i) =>
          push("out", `  [${i + 1}] ${t(lang, p.name)} (${p.year}) — ${p.status}${p.status === "SEALED" ? (fa ? " · دسترسی رد شد" : " · access denied") : ""}`)
        );
        break;
      case "open": {
        const n = Number(args[0]);
        const p = PROJECTS[n - 1];
        if (!p || Number.isNaN(n)) {
          playGlitch();
          push("err", fa ? "پرونده‌ای با این شماره نیست." : "no such case file.");
        } else if (p.status === "SEALED") {
          playGlitch();
          push("err", fa ? "[RESTRICTED] این پرونده مهرشده است. رمز کونامی را بزن." : "[RESTRICTED] sealed evidence. try the konami sequence.");
        } else {
          push("out", fa ? `بازشدن ${t(lang, p.name)}…` : `opening ${t(lang, p.name)}…`);
          onGo?.("projects");
          window.dispatchEvent(new CustomEvent("open-case", { detail: p.id }));
          onClose();
        }
        break;
      }
      case "contact":
        push("out", `EMAIL: ${CONTACT.email}`);
        break;
      case "socials":
        SOCIALS.forEach((s) => push("out", `  ${s.label.padEnd(10)} ${s.href}`));
        break;
      case "lang":
        push("out", fa ? "سوئیچ به انگلیسی…" : "switching to farsi…");
        onLang?.();
        break;
      case "game":
        push("out", fa ? "راه‌انداختن EMBER HUNTER…" : "launching EMBER HUNTER…");
        onGame?.();
        onClose();
        break;
      case "404":
        push("err", fa ? "انتقال به پرونده مفقود ۴۰۴…" : "navigating to 404 void archive…");
        playGlitch();
        on404?.();
        onClose();
        break;
      case "easter":
      case "konami":
        playBlip(920);
        window.dispatchEvent(new Event("easter-egg"));
        push("out", fa ? "[DOSSIER] بارش نمادهای نوآر آغاز شد." : "[DOSSIER] noir symbols descending.");
        break;
      case "theme":
        push("out", fa ? "تم سایت در تاریکی مطلق قفل شده. نور را خودت بساز." : "theme locked in absolute dark. bring your own light.");
        break;
      case "whoami":
        push("out", fa ? "یک مهمان کنجکاو در پروندهٔ کسی." : "a curious visitor inside someone's case file.");
        break;
      case "date":
        push("out", new Date().toLocaleString(lang === "fa" ? "fa-IR" : "en-GB"));
        break;
      case "sudo":
        push("err", fa ? "تو فقط یک بازدیدکنندهٔ ۱۷-ساله‌ای (مثل خودم)." : "you are just a curious visitor — like the author. nice try.");
        break;
      case "rm":
        push("err", fa ? "منکران آرشيو را پاک نمی‌کند." : "this archive does not delete. it remembers.");
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "close":
        onClose();
        break;
      default:
        playGlitch();
        push("err", (fa ? "دستور ناشناخته: " : "unknown command: ") + name + " — `help`");
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHist((h) => [...h, input]);
      setInput("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = hIdx < 0 ? hist.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(hist[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx < 0 ? -1 : Math.min(hist.length - 1, hIdx + 1);
      setHIdx(i);
      setInput(i < 0 ? "" : hist[i]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-end justify-center p-3 sm:items-center sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="terminal"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <button
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="close"
      />

      <div
        ref={boxRef}
        dir="ltr"
        className="relative flex max-h-[82svh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-line/80 bg-[#0a0a0e] shadow-[0_30px_90px_-20px_rgb(232,163,61,0.15)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-3 border-b border-line/70 bg-smoke/80 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-blood/80" />
            <span className="size-2.5 rounded-full bg-ember/80" />
            <span className="size-2.5 rounded-full bg-emerald-600/80" />
          </div>

          <span className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-mute truncate">
            mahdyar@mashhad:~/evidence — {t(lang, CASE_LABEL)}.exe
          </span>

          <button
            onClick={onClose}
            className="mono ms-auto text-xs text-mute hover:text-bone transition-colors"
            aria-label="close"
          >
            <IconClose className="size-3.5" />
          </button>
        </div>

        {/* Terminal Output Body */}
        <div
          ref={bodyRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 overflow-y-auto overscroll-contain no-scrollbar px-4 py-3 text-[12px] sm:text-[13px] leading-6"
        >
          {lines.map((l, i) => (
            <p
              key={i}
              className={l.kind === "err" ? "text-blood" : l.kind === "in" ? "text-bone" : "text-ash"}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {l.kind === "in" && <span className="text-ember">➔ </span>}
              {l.text}
            </p>
          ))}

          {/* Input Row */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-ember">➔</span>
            <span className="mono text-[10px] text-mute shrink-0">
              {BRAND.en.toLowerCase()}@teh:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal input"
              className="mono flex-1 bg-transparent text-sm sm:text-[13px] text-bone caret-ember outline-none"
            />
          </div>
        </div>

        {/* Quick Command Chips for mobile/touch */}
        <div className="border-t border-line/60 bg-smoke/40 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          <span className="mono text-[8px] uppercase tracking-widest text-mute shrink-0">
            CMD:
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => run(cmd)}
              className="mono shrink-0 rounded border border-line px-2 py-0.5 text-[9px] text-ash hover:border-ember hover:text-ember transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Terminal;
