import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/smooth.js";
import { t } from "../content.js";
import { playClick, playGlitch, playBlip } from "../lib/sound.js";
import { IconClock, IconClose, IconPlay } from "./Icons.jsx";

const DUR = 30;

function Game({ open, onClose, lang }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DUR);
  const [state, setState] = useState("idle");
  const [best, setBest] = useState(() => Number(localStorage.getItem("ember-best") ?? 0));
  const scoreRef = useRef(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open) {
      window.__lockScroll?.(true);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        window.__lockScroll?.(false);
      };
    }
  }, [open]);

  const start = useCallback(() => {
    playBlip(600);
    scoreRef.current = 0;
    setScore(0);
    setTime(DUR);
    setState("playing");
    const el = boxRef.current;
    if (el) gsap.fromTo(el, { scale: 0.96, autoAlpha: 0.6 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (!open || state !== "playing") return;
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = () => cv.width;
    const H = () => cv.height;

    const size = () => {
      const r = cv.getBoundingClientRect();
      cv.width = r.width;
      cv.height = r.height;
    };
    size();
    window.addEventListener("resize", size);

    const embers = [];
    const basket = { x: W() / 2, y: H() - 46, w: Math.min(86, Math.max(64, W() * 0.22)) };

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      basket.x = e.clientX - r.left;
    };

    const onTouch = (e) => {
      if (!e.touches[0]) return;
      const r = cv.getBoundingClientRect();
      basket.x = e.touches[0].clientX - r.left;
    };

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("touchmove", onTouch, { passive: true });

    let tLeft = DUR;
    let spawnAcc = 0;
    let raf = 0;
    let last = performance.now();
    let floaters = [];

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      tLeft -= dt;
      setTime(Math.max(0, Math.ceil(tLeft)));

      if (tLeft <= 0) {
        cancelAnimationFrame(raf);
        setState("over");
        const s = scoreRef.current;
        setBest((b) => {
          const nb = Math.max(b, s);
          localStorage.setItem("ember-best", String(nb));
          if (s > b && s > 0) playBlip(1000);
          return nb;
        });
        return;
      }

      spawnAcc += dt;
      const rate = 0.16 - Math.min(0.09, (DUR - tLeft) * 0.003);
      while (spawnAcc > rate) {
        spawnAcc = 0;
        const roll = Math.random();
        embers.push({
          x: Math.random() * (W() - 40) + 20,
          y: -14,
          vy: 130 + Math.random() * 190 + (DUR - tLeft) * 4,
          vx: (Math.random() - 0.5) * 60,
          r: 7 + Math.random() * 6,
          kind: roll < 0.74 ? "ember" : roll < 0.9 ? "ice" : "bomb"
        });
      }

      ctx.clearRect(0, 0, W(), H());
      const bx = basket.x;
      const by = basket.y;

      ctx.save();
      const grad = ctx.createLinearGradient(bx, by - 10, bx, by + 14);
      grad.addColorStop(0, "#ffd9a0");
      grad.addColorStop(1, "#7c4f16");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(bx - basket.w / 2, by, basket.w, 16, 8);
      ctx.fill();
      ctx.shadowColor = "rgba(232,163,61,0.6)";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.y += e.vy * dt;
        e.x += e.vx * dt;

        if (e.y > H() + 20) {
          embers.splice(i, 1);
          continue;
        }

        if (e.y > by - 10 && e.y < by + 16 && Math.abs(e.x - bx) < basket.w / 2 + e.r) {
          embers.splice(i, 1);
          if (e.kind === "ember") {
            playClick(800, 0.04);
            scoreRef.current += 10;
            floaters.push({ x: e.x, y: e.y, text: "+10", life: 1, color: "#e8a33d" });
          } else if (e.kind === "ice") {
            playGlitch();
            scoreRef.current = Math.max(0, scoreRef.current - 5);
            tLeft -= 2;
            floaters.push({ x: e.x, y: e.y, text: "-2s", life: 1, color: "#7fa6c9" });
          } else {
            playGlitch();
            scoreRef.current = Math.max(0, scoreRef.current - 15);
            floaters.push({ x: e.x, y: e.y, text: "BOMB!", life: 1, color: "#b03a3a" });
          }
          setScore(scoreRef.current);
          continue;
        }

        ctx.save();
        if (e.kind === "ember") {
          ctx.fillStyle = "#e8a33d";
          ctx.shadowColor = "#e8a33d";
          ctx.shadowBlur = 16;
        } else if (e.kind === "ice") {
          ctx.fillStyle = "#7fa6c9";
          ctx.shadowColor = "#7fa6c9";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "#b03a3a";
          ctx.shadowColor = "#b03a3a";
          ctx.shadowBlur = 14;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      floaters = floaters.filter((f) => (f.life -= dt * 1.6) > 0);
      for (const f of floaters) {
        ctx.save();
        ctx.globalAlpha = f.life;
        ctx.fillStyle = f.color;
        ctx.font = '700 16px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText(f.text, f.x, f.y - (1 - f.life) * 34);
        ctx.restore();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("touchmove", onTouch);
    };
  }, [open, state]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="ember hunter"
    >
      <button
        className="absolute inset-0 bg-void/90 backdrop-blur-md"
        onClick={onClose}
        aria-label="close"
      />

      <div
        ref={boxRef}
        dir="ltr"
        className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-[#0a0a0e] shadow-2xl"
      >
        {/* Responsive Header */}
        <div className="flex items-center justify-between border-b border-line/70 bg-smoke/60 px-4 sm:px-5 py-2.5 sm:py-3 gap-2">
          <p className="mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ember truncate">
            EMBER HUNTER
          </p>

          <div className="mono flex items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] text-ash">
            <span className="inline-flex items-center gap-1">
              <IconClock className="size-3 text-ember" />
              <b className={time <= 5 ? "text-blood" : ""}>{time}s</b>
            </span>
            <span>
              ✦ <b className="text-ember">{score}</b>
            </span>
            <span className="hidden sm:inline">
              ★ <b>{best}</b>
            </span>
          </div>

          <button
            onClick={onClose}
            className="mono text-xs text-mute hover:text-bone p-1 transition-colors"
            aria-label="close"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        {/* Canvas area */}
        <div className="relative h-[55vh] max-h-[500px] bg-[radial-gradient(120%_100%_at_50%_0%,#12121a_0%,#08080c_70%)]">
          <canvas ref={canvasRef} className="absolute inset-0 size-full touch-none" />

          {state !== "playing" && (
            <div className="absolute inset-0 grid place-items-center p-4">
              <div className="text-center max-w-sm">
                <p className="font-display text-3xl sm:text-5xl font-extrabold text-bone">
                  {state === "over"
                    ? t(lang, { en: "CASE CLOSED", fa: "پرونده بسته شد" })
                    : t(lang, { en: "CATCH THE EMBERS", fa: "ذغال‌ها را بگیر" })}
                </p>

                {state === "over" && (
                  <p className="mono mt-3 text-sm text-ember">
                    {score}{" "}
                    {score >= best && score > 0
                      ? t(lang, { en: "— NEW RECORD!", fa: "— رکورد تازه!" })
                      : ""}
                  </p>
                )}

                <div className="mono mt-4 text-[10px] sm:text-[11px] uppercase tracking-widest text-mute flex items-center justify-center gap-4">
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-ember" /> +10</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-ice" /> −2s</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-blood" /> −15</span>
                </div>

                <button
                  onClick={start}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ember px-8 py-3 sm:px-9 sm:py-3.5 font-bold text-void text-xs uppercase tracking-widest transition-transform hover:scale-105"
                >
                  {state !== "over" && <IconPlay className="size-3" />}
                  <span>{state === "over" ? t(lang, { en: "AGAIN", fa: "دوباره" }) : t(lang, { en: "START", fa: "شروع" })}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
