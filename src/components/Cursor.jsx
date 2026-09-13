import { useEffect, useRef } from "react";
import gsap from "gsap";
import { pointer } from "../lib/pointer.js";
import { useFinePointer, usePrefersReducedMotion } from "../hooks/usePointer.js";

function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const ring = useRef(null);
  const dot = useRef(null);
  const canvas = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!fine) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;

    const xR = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const yR = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    const xD = gsap.quickTo(d, "x", { duration: 0.09, ease: "power2" });
    const yD = gsap.quickTo(d, "y", { duration: 0.09, ease: "power2" });

    let raf = 0;
    const tick = () => {
      xR(pointer.x);
      yR(pointer.y);
      xD(pointer.x);
      yD(pointer.y);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let isForcedHidden = false;

    const hideCursor = () => {
      isForcedHidden = true;
      if (r) r.style.opacity = "0";
      if (d) d.style.opacity = "0";
      if (canvas.current) canvas.current.style.opacity = "0";
    };

    const showCursor = () => {
      isForcedHidden = false;
      if (r) r.style.opacity = "1";
      if (d) d.style.opacity = "1";
      if (canvas.current) canvas.current.style.opacity = "1";
    };

    window.addEventListener("hide-cursor", hideCursor);
    window.addEventListener("show-cursor", showCursor);

    const onOver = (e) => {
      if (isForcedHidden) return;
      const isTextInput = e.target.closest?.('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea');
      const isNative = e.target.closest?.('[data-native-cursor], iframe');
      if (isTextInput || isNative) {
        r.style.opacity = "0";
        d.style.opacity = "0";
        return;
      }

      r.style.opacity = "1";
      d.style.opacity = "1";

      const t = e.target.closest?.("[data-cursor], button, a, select, input[type='range']");
      if (!t) return;
      const kind = t.dataset?.cursor ?? "link";
      r.dataset.kind = kind;
      if (label.current) {
        label.current.textContent = t.dataset?.cursorLabel ?? "";
        r.appendChild(label.current);
      }
      r.style.setProperty("--ring-scale", kind === "view" ? "2.6" : "1.8");
    };

    const onOut = (e) => {
      if (isForcedHidden) return;
      const isTextInput = e.target.closest?.('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea');
      const isNative = e.target.closest?.('[data-native-cursor], iframe');
      if (isTextInput || isNative) {
        r.style.opacity = "1";
        d.style.opacity = "1";
      }
      r.dataset.kind = "";
      r.style.setProperty("--ring-scale", "1");
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;

    const onResize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const parts = [];
    const MAX = reduced ? 0 : 42;
    let trailRaf = 0;

    const spawn = () => {
      if (pointer.moved && parts.length < MAX && !document.hidden && !isForcedHidden) {
        const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 30);
        parts.push({
          x: pointer.x,
          y: pointer.y,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.25,
          life: 1,
          r: 0.8 + speed * 2.2 + Math.random()
        });
      }
    };

    const draw = () => {
      trailRaf = requestAnimationFrame(draw);
      spawn();
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;
        p.life -= 0.022;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(232 163 61 / ${p.life * 0.5})`;
        ctx.fill();
      }
    };
    trailRaf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(trailRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hide-cursor", hideCursor);
      window.removeEventListener("show-cursor", showCursor);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <>
      <canvas
        ref={canvas}
        className="pointer-events-none fixed inset-0 z-[9990]"
        aria-hidden="true"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9995] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: "difference" }}
        aria-hidden="true"
      >
        <div
          className="grid size-10 place-items-center rounded-full border border-bone/70 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: "scale(var(--ring-scale, 1))" }}
        >
          <span
            ref={label}
            className="mono select-none text-[8px] uppercase tracking-widest text-bone"
          />
        </div>
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
        style={{ boxShadow: "0 0 12px 2px rgb(232 163 61 / 0.6)" }}
        aria-hidden="true"
      />
    </>
  );
}

export default Cursor;
