import { useEffect, useRef, useState } from "react";
import { LAB_DATA, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import { useLang } from "../context/LangContext.jsx";
import { IconFolder, IconClose, IconRadio, IconMenuGrid } from "../components/Icons.jsx";

export default function Lab({ onGoHome, onPortal, onMegaMenu, onSoundscapeModal }) {
  const { lang, toggle } = useLang();
  const isFa = lang === "fa";

  const [activeExpId, setActiveExpId] = useState("rain-glass");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Canvas ref
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  const activeExp = LAB_DATA.experiments.find((e) => e.id === activeExpId) || LAB_DATA.experiments[0];

  // Source code templates for each experiment to inspect
  const codeSnippets = {
    "rain-glass": `// Rain on Noir Glass - 2D Condensation Physics
class RainDrop {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = 1.2 + Math.random() * 3.5;
    this.vy = 0.5 + Math.random() * 2.5;
    this.alpha = 0.3 + Math.random() * 0.6;
    this.trail = [];
  }
  update(w, h, mx, my) {
    this.trail.push({ x: this.x, y: this.y, r: this.r * 0.5, alpha: this.alpha * 0.6 });
    if (this.trail.length > 8) this.trail.shift();

    this.y += this.vy;
    // Mouse repulsion
    const dx = this.x - mx;
    const dy = this.y - my;
    const dist = Math.hypot(dx, dy);
    if (dist < 90) {
      const force = (90 - dist) / 90;
      this.x += (dx / dist) * force * 7;
      this.y += (dy / dist) * force * 5;
    }
    if (this.y > h) {
      this.y = -10;
      this.x = Math.random() * w;
      this.trail = [];
    }
  }
}`,
    "gravity-nebula": `// Gravitational Ember Constellation
class EmberParticle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = 1 + Math.random() * 2.2;
  }
  update(w, h, mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 260 && dist > 10) {
      const force = (260 - dist) / 260;
      this.vx += (dx / dist) * force * 0.12;
      this.vy += (dy / dist) * force * 0.12;
    }
    this.vx *= 0.98; // Friction damping
    this.vy *= 0.98;
    this.x += this.vx;
    this.y += this.vy;
  }
}`,
    "elastic-type": `// Kinetic Elastic Glyph Mesh
function createGlyphPoints(text, cx, cy) {
  // Samples points on font glyph contours
  // Each point has origin (ox, oy), current (x, y), velocity (vx, vy)
  // Hooke's Law Spring: F = -k * displacement - damping * velocity
  const k = 0.08;
  const damping = 0.88;
  points.forEach(p => {
    const dx = mx - p.x;
    const dy = my - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 70) {
      p.vx -= (dx / dist) * 12;
      p.vy -= (dy / dist) * 12;
    }
    p.vx += (p.ox - p.x) * k;
    p.vy += (p.oy - p.y) * k;
    p.vx *= damping;
    p.vy *= damping;
    p.x += p.vx;
    p.y += p.vy;
  });
}`,
    "mercury-fluid": `// Viscous Liquid Mercury Simulation
class MercuryRipple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.maxRadius = 140;
    this.strength = 1.0;
  }
  update() {
    this.radius += 2.8;
    this.strength = Math.max(0, 1 - this.radius / this.maxRadius);
  }
  draw(ctx) {
    const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.6, this.x, this.y, this.radius);
    grad.addColorStop(0, \`rgba(232, 163, 61, 0)\`);
    grad.addColorStop(0.5, \`rgba(255, 217, 160, \${this.strength * 0.35})\`);
    grad.addColorStop(1, \`rgba(232, 163, 61, 0)\`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}`
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    let mouse = { x: -999, y: -999, isDown: false };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
    };

    const handleMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      mouse.isDown = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // ============================================
    // EXPERIMENT 1: RAIN ON NOIR GLASS
    // ============================================
    const drops = [];
    if (activeExpId === "rain-glass") {
      const count = Math.min(140, Math.floor(width / 10));
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.2 + Math.random() * 3.5,
          vy: 0.8 + Math.random() * 2.8,
          alpha: 0.3 + Math.random() * 0.5,
          trail: []
        });
      }
    }

    // ============================================
    // EXPERIMENT 2: GRAVITY NEBULA
    // ============================================
    const particles = [];
    if (activeExpId === "gravity-nebula") {
      const count = Math.min(180, Math.floor(width / 7));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          r: 1 + Math.random() * 2.4,
          glow: Math.random() > 0.85
        });
      }
    }

    // ============================================
    // EXPERIMENT 3: KINETIC ELASTIC TYPOGRAPHY
    // ============================================
    const glyphPoints = [];
    if (activeExpId === "elastic-type") {
      const text = "MONFARED";
      const fontSize = Math.min(120, Math.floor(width / 7));
      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d");
      offCtx.fillStyle = "#fff";
      offCtx.font = `900 ${fontSize}px sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const step = Math.max(5, Math.floor(fontSize / 15));
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (imgData[idx] > 128) {
            glyphPoints.push({
              ox: x,
              oy: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              r: 1.5 + Math.random() * 1.5
            });
          }
        }
      }
    }

    // ============================================
    // EXPERIMENT 4: LIQUID MERCURY FLUID
    // ============================================
    const ripples = [];
    let mercuryTimer = 0;

    // ANIMATION LOOP
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (activeExpId === "rain-glass") {
        // Dark translucent window background
        ctx.fillStyle = "rgba(6, 6, 10, 0.25)";
        ctx.fillRect(0, 0, width, height);

        drops.forEach((d) => {
          // Trail
          d.trail.push({ x: d.x, y: d.y, r: d.r * 0.45, alpha: d.alpha * 0.5 });
          if (d.trail.length > 7) d.trail.shift();

          d.trail.forEach((tPt) => {
            ctx.beginPath();
            ctx.arc(tPt.x, tPt.y, tPt.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 215, 235, ${tPt.alpha})`;
            ctx.fill();
          });

          // Move
          d.y += d.vy;

          // Mouse proximity displacement
          if (mouse.x > 0) {
            const dx = d.x - mouse.x;
            const dy = d.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 100) {
              const force = (100 - dist) / 100;
              d.x += (dx / (dist || 1)) * force * 8;
              d.y += (dy / (dist || 1)) * force * 5;
            }
          }

          if (d.y > height + 20) {
            d.y = -10;
            d.x = Math.random() * width;
            d.trail = [];
          }

          // Main drop with specular highlight
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 240, 255, ${d.alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha + 0.3})`;
          ctx.fill();
        });
      } else if (activeExpId === "gravity-nebula") {
        // Nebula background
        ctx.fillStyle = "rgba(6, 6, 10, 0.3)";
        ctx.fillRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Mouse gravity pull
          if (mouse.x > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 280 && dist > 12) {
              const force = (280 - dist) / 280;
              p.vx += (dx / dist) * force * 0.16;
              p.vy += (dy / dist) * force * 0.16;
            }
          }

          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.glow ? "rgba(255, 217, 160, 0.9)" : "rgba(232, 163, 61, 0.6)";
          ctx.fill();

          // Connect lines to nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 75) {
              const alpha = (1 - dist / 75) * 0.25;
              ctx.strokeStyle = `rgba(232, 163, 61, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      } else if (activeExpId === "elastic-type") {
        ctx.fillStyle = "rgba(6, 6, 10, 0.35)";
        ctx.fillRect(0, 0, width, height);

        const k = 0.08;
        const damping = 0.88;

        glyphPoints.forEach((p) => {
          if (mouse.x > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 75) {
              const force = (75 - dist) / 75;
              p.vx -= (dx / (dist || 1)) * force * 14;
              p.vy -= (dy / (dist || 1)) * force * 14;
            }
          }

          // Spring back to origin
          p.vx += (p.ox - p.x) * k;
          p.vy += (p.oy - p.y) * k;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;

          const speed = Math.hypot(p.vx, p.vy);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = speed > 1 ? "rgba(255, 217, 160, 0.95)" : "rgba(232, 163, 61, 0.75)";
          ctx.fill();
        });
      } else if (activeExpId === "mercury-fluid") {
        ctx.fillStyle = "rgba(6, 6, 10, 0.25)";
        ctx.fillRect(0, 0, width, height);

        mercuryTimer++;
        if (mouse.isDown || (mercuryTimer % 45 === 0 && mouse.x > 0)) {
          ripples.push({
            x: mouse.x > 0 ? mouse.x : width / 2 + Math.sin(mercuryTimer * 0.05) * 200,
            y: mouse.y > 0 ? mouse.y : height / 2 + Math.cos(mercuryTimer * 0.05) * 120,
            radius: 5,
            maxRadius: 150,
            strength: 1.0
          });
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 2.5;
          r.strength = Math.max(0, 1 - r.radius / r.maxRadius);

          if (r.strength <= 0) {
            ripples.splice(i, 1);
            continue;
          }

          const grad = ctx.createRadialGradient(r.x, r.y, r.radius * 0.6, r.x, r.y, r.radius);
          grad.addColorStop(0, "rgba(232, 163, 61, 0)");
          grad.addColorStop(0.5, `rgba(255, 217, 160, ${r.strength * 0.4})`);
          grad.addColorStop(1, "rgba(232, 163, 61, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeExpId]);

  const handleCopyCode = () => {
    playBlip(920);
    navigator.clipboard.writeText(codeSnippets[activeExpId] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="min-h-svh w-full max-w-full overflow-x-hidden bg-void text-bone relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line/60 bg-void/80 backdrop-blur-md px-4 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playClick(450);
              onGoHome?.();
            }}
            className="mono text-xs flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer"
          >
            <span>←</span>
            <span>{t(lang, { en: "Return to Index", fa: "بازگشت به نمایه" })}</span>
          </button>
          <span className="mono text-xs text-mute hidden sm:inline">/</span>
          <span className="mono text-xs text-ember-hi font-bold hidden sm:inline">
            NOIR_LAB_v2.5
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Radio Trigger */}
          <button
            type="button"
            onClick={() => {
              playClick(480);
              onSoundscapeModal?.();
            }}
            className="mono text-xs flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ash hover:text-ember-hi hover:border-ember transition-colors cursor-pointer"
            title={isFa ? "رادیو و صداهای اتمسفریک" : "Atmospheric Radio"}
          >
            <IconRadio className="size-3.5 text-ember-hi" />
            <span className="hidden sm:inline">{isFa ? "رادیو" : "Radio"}</span>
          </button>

          {/* MegaMenu Index */}
          <button
            type="button"
            onClick={() => {
              playClick(500);
              onMegaMenu?.();
            }}
            className="mono text-xs flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer"
            title={isFa ? "نقشه جامع سایت و پرونده‌ها" : "Sitemap & Mega Menu"}
          >
            <IconMenuGrid className="size-3.5" />
            <span className="hidden sm:inline">{isFa ? "فهرست" : "Index"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick(500);
              onPortal?.();
            }}
            className="mono text-xs flex items-center gap-1.5 rounded-full border border-ember-hi/40 bg-ember/10 px-3.5 py-1.5 text-ember-hi hover:bg-ember/20 transition-colors cursor-pointer"
          >
            <IconFolder className="size-3.5" />
            <span className="hidden sm:inline">{t(lang, { en: "Client Portal", fa: "پنل کارفرما" })}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick(600);
              toggle();
            }}
            className="mono text-xs rounded-full border border-line px-3 py-1.5 text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer"
          >
            {isFa ? "EN" : "فا"}
          </button>
        </div>
      </header>

      {/* Main Lab Area */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Left / Top Controls Sidebar */}
        <aside className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-line/60 bg-coal/70 p-6 sm:p-8 flex flex-col justify-between shrink-0">
          <div>
            <div className="mono text-[10px] uppercase tracking-widest text-ember mb-2">
              {t(lang, { en: "EXPERIMENTAL PLAYGROUND", fa: "زمین‌بازی تعاملی کدهای نوآر" })}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-bone mb-3">
              {t(lang, LAB_DATA.title)}
            </h1>
            <p className="text-xs text-ash leading-relaxed mb-6">
              {t(lang, LAB_DATA.sub)}
            </p>

            {/* Experiment Tabs */}
            <div className="space-y-2.5">
              {LAB_DATA.experiments.map((exp) => {
                const active = exp.id === activeExpId;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => {
                      playClick(550);
                      setActiveExpId(exp.id);
                    }}
                    className={`w-full text-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? "border-ember-hi bg-ember/15 text-bone shadow-[0_0_16px_rgba(255,217,160,0.2)]"
                        : "border-line bg-coal/50 text-ash hover:border-ember/40 hover:text-bone"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-sm font-bold text-bone">
                        {t(lang, exp.name)}
                      </span>
                      <span className="mono text-[9px] px-2 py-0.5 rounded-full border border-line text-mute">
                        {exp.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-ash line-clamp-2 leading-relaxed">
                      {t(lang, exp.desc)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Inspector Toggle Button */}
          <div className="pt-6 border-t border-line/50 mt-6">
            <button
              type="button"
              onClick={() => {
                playBlip(750);
                setShowCode(!showCode);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-ember/50 bg-ember/10 px-4 py-3 text-xs font-bold text-ember-hi hover:bg-ember/25 transition-colors cursor-pointer"
            >
              <span>{showCode ? "✕" : "⟨ / ⟩"}</span>
              <span>
                {showCode
                  ? t(lang, { en: "Close Source Inspector", fa: "بستن بازرس کد" })
                  : t(lang, { en: "Inspect Physics Source Code", fa: "مشاهده کد منبع و فرمول‌ها" })}
              </span>
            </button>
          </div>
        </aside>

        {/* Right / Center Canvas Viewport */}
        <section className="flex-1 relative flex flex-col min-h-[500px] bg-void">
          {/* Top Interactive Prompt Badge */}
          <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
            <div className="mono text-[11px] text-ember-hi bg-coal/85 border border-line px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
              <span>✦ {t(lang, activeExp.hint)}</span>
            </div>
            <div className="mono text-[10px] text-mute uppercase hidden sm:inline">
              CANVAS 60FPS · PURE MATH
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div className="flex-1 w-full h-full min-h-[500px] relative overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />
          </div>

          {/* Source Code Modal / Drawer */}
          {showCode && (
            <div className="absolute inset-0 z-30 bg-coal/95 backdrop-blur-md p-6 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-line">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-ember-hi" />
                  <span className="mono text-xs font-bold text-bone">
                    {t(lang, activeExp.name)} — Source Inspection
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="mono text-xs rounded-lg border border-ember/50 bg-ember/15 px-3 py-1 text-ember-hi hover:bg-ember/30 transition-colors cursor-pointer"
                  >
                    {copied ? t(lang, { en: "Copied!", fa: "کپی شد!" }) : t(lang, { en: "Copy Code", fa: "کپی کد" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCode(false)}
                    className="size-7 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone cursor-pointer"
                  >
                    <IconClose className="size-3.5" />
                  </button>
                </div>
              </div>

              <pre className="flex-1 overflow-auto mono text-xs text-amber-200/90 bg-void/80 p-4 rounded-xl border border-line/60 leading-relaxed no-scrollbar">
                <code>{codeSnippets[activeExpId]}</code>
              </pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

