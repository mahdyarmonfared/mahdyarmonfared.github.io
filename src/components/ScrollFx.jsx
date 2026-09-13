import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth.js";

function ScrollFx({ onScene }) {
  const root = useRef(null);
  const glowRef = useRef(null);
  const sceneCb = useRef(onScene);
  sceneCb.current = onScene;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const layers = el.querySelectorAll("[data-scene]");
    const glow = glowRef.current;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const seg = p * 3;
        layers.forEach((l, i) => {
          const d = Math.abs(seg - i);
          const o = Math.max(0, 1 - d);
          l.style.opacity = String(o * o);
        });
        if (glow) {
          const x = 20 + p * 60;
          const y = 10 + p * 75;
          const alpha = 0.10 + p * 0.06;
          glow.style.background = `radial-gradient(40% 40% at ${x}% ${y}%, rgb(232 163 61 / ${alpha}), transparent 70%)`;
        }
        const active = Math.min(3, Math.round(seg));
        sceneCb.current?.(active);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      <div
        data-scene="true"
        className="absolute inset-0 transition-none"
        style={{
          background: "radial-gradient(120% 90% at 50% -10%, #141018 0%, #07070b 45%, #05050a 100%)"
        }}
      />
      <div
        data-scene="true"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(100% 80% at 18% 10%, #2a1c0d 0%, transparent 55%),radial-gradient(90% 70% at 85% 30%, #241708 0%, transparent 60%),linear-gradient(180deg, #0b0a0f 0%, #120d09 60%, #090810 100%)"
        }}
      />
      <div
        data-scene="true"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(90% 60% at 80% 85%, #0e1a26 0%, transparent 60%),radial-gradient(60% 45% at 12% 78%, #101623 0%, transparent 55%),linear-gradient(180deg, #07080f 0%, #0a1018 55%, #06070d 100%)"
        }}
      />
      <div
        data-scene="true"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "radial-gradient(130% 80% at 50% 115%, #3a1e08 0%, transparent 55%),radial-gradient(100% 70% at 50% 105%, #1d1206 0%, transparent 65%),linear-gradient(180deg, #05060c 0%, #0a0910 60%, #140d07 100%)"
        }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-40 will-change-[background]"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 10%, rgb(232 163 61 / 0.10), transparent 70%)"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(0 0 0 / 0.35) 0%, transparent 18%, transparent 82%, rgb(0 0 0 / 0.5) 100%)"
        }}
      />
    </div>
  );
}

export function useInViewOnce(cb) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cb();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cb]);
  return ref;
}

export function registerReveals(scope) {
  const root = scope ?? document;
  const elements = gsap.utils.toArray("[data-reveal]", root);

  // Set initial position for elements that haven't entered yet
  elements.forEach((el) => {
    if (!el._revealed) {
      const y = Number(el.dataset.y ?? 28);
      gsap.set(el, { autoAlpha: 0, y });
    }
  });

  return elements.map((el) => {
    // If element was already revealed in a previous language or render, keep it visible!
    if (el._revealed) {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return { kill: () => {} };
    }

    const delay = Number(el.dataset.delay ?? 0);
    const y = Number(el.dataset.y ?? 28);

    return ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        el._revealed = true;
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          clearProps: "transform"
        });
      }
    });
  });
}


export default ScrollFx;
