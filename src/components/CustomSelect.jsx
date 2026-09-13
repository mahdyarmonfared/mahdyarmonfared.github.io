import { useState, useRef, useEffect } from "react";
import { playClick } from "../lib/sound.js";
import { IconCheck } from "./Icons.jsx";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  className = "",
  dir
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("pointerdown", handleOutsideClick);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (val) => {
    playClick(560);
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} dir={dir}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          playClick(500);
          setOpen((v) => !v);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs text-bone transition-all duration-200 cursor-pointer ${
          open
            ? "border-ember bg-coal shadow-[0_0_12px_rgba(232,163,61,0.25)] ring-1 ring-ember/40"
            : "border-line bg-void/80 hover:border-ember/50 hover:bg-coal/80"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedOption?.icon && (
            <span className="text-ember shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        {/* Chevron Indicator */}
        <svg
          className={`size-3.5 text-ash transition-transform duration-200 shrink-0 ${open ? "rotate-180 text-ember-hi" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Floating Dropdown List */}
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto overscroll-contain no-scrollbar rounded-xl border border-line/90 bg-coal/98 p-1.5 shadow-2xl shadow-black/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs transition-all text-start cursor-pointer ${
                  isSelected
                    ? "bg-ember/20 text-ember-hi font-semibold border border-ember/40"
                    : "text-ash hover:text-bone hover:bg-void/80 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon && (
                    <span className={isSelected ? "text-ember-hi" : "text-ash"}>
                      {opt.icon}
                    </span>
                  )}
                  <span className="truncate">{opt.label}</span>
                </div>

                {isSelected && (
                  <IconCheck className="size-3.5 text-ember-hi shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

