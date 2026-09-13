import { useState, useRef, useEffect } from "react";
import { SKETCHPAD_DATA, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import { IconClose } from "./Icons.jsx";

export function IdeaSketchpad({ lang, isOpen, onClose, onSaveSketch }) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(SKETCHPAD_DATA.colors[0].val);
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    playBlip(780);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lockScroll?.(true);

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.__lockScroll?.(false);
    };
  }, [isOpen, onClose]);

  // Canvas setup
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial background
    ctx.fillStyle = "#09090f";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Save blank state to history
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, [isOpen]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = isEraser ? lineWidth * 4 : lineWidth;
    ctx.strokeStyle = isEraser ? "#09090f" : color;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e?.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);

    // Push new snapshot to history
    setHistory((prev) => [...prev.slice(-15), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    playBlip(700);
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const prevState = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(prevState, 0, 0);
  };

  const handleClear = () => {
    playClick(400);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#09090f";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleSave = () => {
    playBlip(950);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");

    // Save to localStorage for estimator attachment
    try {
      localStorage.setItem("monfared_sketch_attachment", dataUrl);
    } catch {
      // ignore quota
    }

    onSaveSketch?.(dataUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    // Also prompt download
    const link = document.createElement("a");
    link.download = `wireframe-sketch-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
    >
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-md"
        onClick={() => {
          playClick(400);
          onClose();
        }}
      />

      <div className="dotted-grid no-scrollbar relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-coal p-5 sm:p-8 shadow-2xl shadow-black text-bone">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-bone">
              {t(lang, SKETCHPAD_DATA.title)}
            </h2>
            <p className="text-xs text-ash mt-0.5">
              {t(lang, SKETCHPAD_DATA.sub)}
            </p>
          </div>
          <button
            onClick={() => {
              playClick(400);
              onClose();
            }}
            className="grid size-8 place-items-center rounded-full border border-line text-ash hover:border-ember hover:text-ember transition-colors"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl border border-line/70 bg-void/60 mb-4">
          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="mono text-[10px] text-mute uppercase">{t(lang, SKETCHPAD_DATA.tools.pen)}:</span>
            {SKETCHPAD_DATA.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playClick(700);
                  setColor(c.val);
                  setIsEraser(false);
                }}
                className={`size-6 rounded-full border transition-all cursor-pointer ${
                  color === c.val && !isEraser ? "scale-110 border-white shadow-md" : "border-line/60 opacity-80"
                }`}
                style={{ backgroundColor: c.val }}
                title={c.label}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                playClick(600);
                setIsEraser(!isEraser);
              }}
              className={`mono px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                isEraser
                  ? "border-ember bg-ember text-void"
                  : "border-line/60 bg-smoke/60 text-ash hover:text-bone"
              }`}
            >
              {t(lang, SKETCHPAD_DATA.tools.eraser)}
            </button>
          </div>

          {/* Stroke Width */}
          <div className="flex items-center gap-1.5 mono text-[10px]">
            <span className="text-mute uppercase">{lang === "fa" ? "ضخامت:" : "Stroke:"}</span>
            {[2, 4, 7].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  playClick(750);
                  setLineWidth(w);
                }}
                className={`px-2 py-0.5 rounded border ${
                  lineWidth === w ? "border-ember text-ember-hi bg-ember/15" : "border-line/40 text-mute"
                }`}
              >
                {w}px
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="mono px-2.5 py-1 rounded border border-line/60 bg-smoke/40 text-ash text-[10px] hover:text-bone disabled:opacity-40 cursor-pointer"
            >
              {t(lang, SKETCHPAD_DATA.tools.undo)}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="mono px-2.5 py-1 rounded border border-line/60 bg-smoke/40 text-ash text-[10px] hover:text-red-400 cursor-pointer"
            >
              {t(lang, SKETCHPAD_DATA.tools.clear)}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="mono px-3.5 py-1.5 rounded-lg border border-ember bg-ember/25 text-ember-hi font-bold text-xs hover:bg-ember/35 transition-all cursor-pointer shadow-md"
            >
              {savedSuccess ? "✓ " + (lang === "fa" ? "ذخیره شد!" : "Saved!") : t(lang, SKETCHPAD_DATA.tools.save)}
            </button>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="relative rounded-xl border-2 border-line/80 overflow-hidden bg-[#09090f] shadow-inner shadow-black">
          <canvas
            ref={canvasRef}
            className="w-full h-[420px] sm:h-[480px] cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="pointer-events-none absolute bottom-3 end-3 mono text-[9px] text-mute/50 uppercase tracking-widest">
            SKETCH AREA · 100% VECTOR PRECISION
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaSketchpad;
