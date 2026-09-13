import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth.js";
import { usePrefersReducedMotion } from "../hooks/usePointer.js";

const NOIR_SYMBOLS = [
  "✦",
  "✧",
  "◆",
  "◇",
  "◈",
  "▲",
  "▼",
  "01",
  "88.4",
  "NOIR",
  "CASE",
  "///",
  "§",
  "⌖",
  "⌘",
  "ø",
  "λ",
  "µ",
  "※",
  "⎋"
];

function EmojiRain({ count = 40 }) {
  const layer = useRef(null);
  const [burst, setBurst] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const listen = () => setBurst((b) => b + 1);
    window.addEventListener("easter-egg", listen);
    return () => window.removeEventListener("easter-egg", listen);
  }, []);

  useEffect(() => {
    if (!burst || reduced) return;
    const el = layer.current;
    if (!el) return;
    el.replaceChildren();
    const items = [];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.textContent = NOIR_SYMBOLS[(Math.random() * NOIR_SYMBOLS.length) | 0];
      s.className = "mono font-bold text-ember select-none";
      s.style.cssText = `position:absolute;top:-10vh;left:${Math.random() * 100}vw;font-size:${
        12 + Math.random() * 16
      }px;opacity:${0.4 + Math.random() * 0.6};text-shadow:0 0 10px rgba(232,163,61,0.5);`;
      el.appendChild(s);
      items.push(s);
    }

    const tw = gsap.to(items, {
      y: () => window.innerHeight + 120,
      x: () => (Math.random() - 0.5) * 180,
      rotate: () => (Math.random() - 0.5) * 360,
      duration: () => 2.6 + Math.random() * 2.6,
      ease: "none",
      stagger: { each: 0.05, from: "random" },
      onComplete: () => el.replaceChildren()
    });

    return () => {
      tw.kill();
      el.replaceChildren();
    };
  }, [burst, count, reduced]);

  return (
    <div
      ref={layer}
      className="pointer-events-none fixed inset-0 z-[65]"
      aria-hidden="true"
      style={{ display: burst && !reduced ? "block" : "none" }}
    />
  );
}

export function armScrollEgg(threshold = 0.995) {
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (self.progress > threshold && !window.location.hash.includes("deep")) {
        history.replaceState(null, "", "#deep");
        window.dispatchEvent(new Event("easter-egg"));
        setTimeout(() => history.replaceState(null, "", location.pathname), 4000);
      }
    }
  });
}

export default EmojiRain;
