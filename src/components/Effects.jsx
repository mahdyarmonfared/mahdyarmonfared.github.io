import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "../lib/smooth.js";
import { usePrefersReducedMotion } from "../hooks/usePointer.js";

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>*#@%$&+=";
const FARSI = "ابتثجچحخدذرژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹◆";

export function Scramble({ text, lang, className = "", duration = 1.0, autoStart = true }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const charset = lang === "fa" ? FARSI : LATIN;
    el.textContent = text;
    if (reduced) return;

    let tween = null;
    const run = () => {
      const chars = text.split("");
      const len = chars.length;
      const state = { i: 0 };
      tween?.kill();

      // Initial scramble
      el.textContent = chars
        .map((c) => (c === " " ? " " : charset[(Math.random() * charset.length) | 0]))
        .join("");

      tween = gsap.to(state, {
        i: len,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const done = Math.floor(state.i);
          el.textContent = chars
            .map((c, idx) => {
              if (idx < done || c === " ") return c;
              return charset[(Math.random() * charset.length) | 0];
            })
            .join("");
        },
        onComplete: () => {
          el.textContent = text;
        }
      });
    };

    // If autoStart is requested or element is inside a modal / fixed container, run directly
    let timer = null;
    if (autoStart || el.closest("[role='dialog']") || el.closest(".fixed")) {
      timer = setTimeout(run, 90);
      return () => {
        clearTimeout(timer);
        tween?.kill();
      };
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: run
    });

    return () => {
      st.kill();
      tween?.kill();
    };
  }, [text, lang, duration, reduced, autoStart]);

  return <span ref={ref} className={`inline-block ${className}`} aria-label={text} />;
}

export function SplitWords({ text, className = "", wordClass = "", delay = 0, y = "100%" }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const words = el.querySelectorAll(".sp-word-inner");

    // Hide words upfront to prevent flash of unstyled content
    gsap.set(words, { yPercent: Number.parseFloat(y) || 100, autoAlpha: 0 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(words, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.04,
          delay,
          ease: "power3.out",
          clearProps: "transform"
        })
    });
    return () => st.kill();
  }, [text, delay, y, reduced]);

  return (
    <span ref={ref} className={className} aria-label={text}>

      {text.split(" ").map((w, i) => (
        <span key={i} className={`sp-word inline-block overflow-hidden ${wordClass}`}>
          <span className="sp-word-inner inline-block will-change-transform">{w}</span>
          {" "}
        </span>
      ))}
    </span>
  );
}

export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "elastic.out(1, 0.4)" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, reduced]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

export function Tilt({ children, className = "", max = 7, glare = true }) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * max * 2);
      ry(px * max * 2);
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(60% 60% at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgb(232 163 61 / 0.12), transparent 70%)`;
      }
    };

    const onLeave = () => {
      rx(0);
      ry(0);
      if (glareRef.current) glareRef.current.style.background = "transparent";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, glare, reduced]);

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        className={`relative [transform-style:preserve-3d] ${className}`}
        style={{ willChange: "transform" }}
      >
        {children}
        {glare && <div ref={glareRef} className="pointer-events-none absolute inset-0" />}
      </div>
    </div>
  );
}
