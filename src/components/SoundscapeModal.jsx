import { useState, useEffect } from "react";
import {
  isSoundscapeActive,
  toggleSoundscape,
  stopAllSoundscapes,
  getMasterAtmosphereVolume,
  setMasterAtmosphereVolume,
  getTrackVolume,
  setTrackVolume,
  SOUNDSCAPE_PRESETS,
  applySoundscapePreset,
  playClick,
  playBlip
} from "../lib/sound.js";
import {
  IconRain,
  IconBell,
  IconVinyl,
  IconWind,
  IconBolt,
  IconFlame,
  IconClock,
  IconCoffee,
  IconSparkles,
  IconPlay,
  IconPause,
  IconRadio,
  IconClose
} from "./Icons.jsx";
import { t } from "../content.js";

const SOUNDSCAPES = [
  {
    id: "rain",
    title: { en: "Midnight Rain on Glass", fa: "باران نیمه‌شب روی شیشه" },
    desc: {
      en: "Continuous soft rainfall filtered through cold glass with sporadic water droplet taps.",
      fa: "بارش ممتد باران نوآر پشت شیشه سرد با ضربه‌های ملایم و تصادفی قطرات آب."
    },
    Icon: IconRain
  },
  {
    id: "cathedral",
    title: { en: "Cathedral Bells & Sub-Drone", fa: "ناقوس و طنین کلیسای تاریک" },
    desc: {
      en: "Deep 55Hz sub-bass atmospheric drone with haunting periodic bronze bell tolling.",
      fa: "پهپاد صوتی عمیق با فرکانس ۵۵ هرتز به همراه طنین ناقوس برنزی در تاریکی."
    },
    Icon: IconBell
  },
  {
    id: "vinyl",
    title: { en: "Vinyl Crackle & Tape Hiss", fa: "خش نوار کاست و گرامافون" },
    desc: {
      en: "Warm analog magnetic tape noise with authentic dust pops and needle stylus crackle.",
      fa: "نویز گرم نوار کاست آنالوگ با تق‌تق‌های سوزن گرامافون و خش نوستالژیک نوآر."
    },
    Icon: IconVinyl
  },
  {
    id: "wind",
    title: { en: "Nocturnal Wind & Mist", fa: "زوزه باد شبانه و مه سرد" },
    desc: {
      en: "Sweeping resonant wind gusts whistling through empty dark city corridors.",
      fa: "وزش موج‌دار باد سرد نیمه‌شب که در کوچه‌های تاریک شهر زوزه می‌کشد."
    },
    Icon: IconWind
  },
  {
    id: "thunder",
    title: { en: "Distant Thunder & Storm", fa: "تندر و توفان دوردست" },
    desc: {
      en: "Rolling low-frequency thunder crashes with deep rumbling sub-bass pressure waves.",
      fa: "غرش‌های سهمگین تندر در دوردست با طنین امواج ساب‌بیس و ارتعاش بم توفان."
    },
    Icon: IconBolt
  },
  {
    id: "fireplace",
    title: { en: "Warm Fireplace & Ember", fa: "شومینه و ترق‌ترق چوب" },
    desc: {
      en: "Soothing warmth of a burning hearth with organic wood pops, snaps and crackles.",
      fa: "گرمای مطبوع آتش هیزمی با جرقه‌های تصادفی، ترق‌ترق چوب و آرامش دلنشین شبانه."
    },
    Icon: IconFlame
  },
  {
    id: "clock",
    title: { en: "Bureau Pendulum Clock", fa: "تیک‌تاک ساعت دیواری کارآگاه" },
    desc: {
      en: "Steady rhythmic wooden tick-tock pacing of a mechanical pendulum in a quiet study.",
      fa: "ریتم منظم و دقیق تیک‌تاک ساعت مکانیکی پاندولی با طنین آکوستیک اتاق کارآگاه."
    },
    Icon: IconClock
  },
  {
    id: "cafe",
    title: { en: "Noir Rain Cafe & Murmur", fa: "کافه بارانی و همهمه نوآر" },
    desc: {
      en: "Muffled cozy room atmosphere with ambient murmur, distant rain and porcelain clinks.",
      fa: "همهمه گرم و ملایم کافه نوآر در شب بارانی به همراه طنین محو فنجان‌های قهوه."
    },
    Icon: IconCoffee
  }
];

export default function SoundscapeModal({ open, onClose, lang }) {
  const isFa = lang === "fa";
  const [activeIds, setActiveIds] = useState([]);
  const [volume, setVolume] = useState(() => getMasterAtmosphereVolume());
  const [trackVols, setTrackVols] = useState(() => {
    const map = {};
    SOUNDSCAPES.forEach((s) => {
      map[s.id] = getTrackVolume(s.id);
    });
    return map;
  });

  useEffect(() => {
    const handleUpdate = (e) => {
      setActiveIds(e.detail.activeIds || []);
      setVolume(e.detail.volume ?? getMasterAtmosphereVolume());
      setTrackVols(() => {
        const map = {};
        SOUNDSCAPES.forEach((s) => {
          map[s.id] = getTrackVolume(s.id);
        });
        return map;
      });
    };
    window.addEventListener("soundscape-update", handleUpdate);
    return () => window.removeEventListener("soundscape-update", handleUpdate);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleToggleTrack = (id) => {
    playClick(520);
    toggleSoundscape(id);
  };

  const handleMasterVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMasterAtmosphereVolume(v);
  };

  const handleTrackVolumeChange = (id, e) => {
    const v = parseFloat(e.target.value);
    setTrackVols((prev) => ({ ...prev, [id]: v }));
    setTrackVolume(id, v);
  };

  const handleApplyPreset = (presetId) => {
    playClick(580);
    applySoundscapePreset(presetId);
  };

  const handleStopAll = () => {
    playBlip(700);
    stopAllSoundscapes();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={isFa ? "rtl" : "ltr"}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/90 backdrop-blur-md transition-opacity"
        onClick={() => {
          playClick(450);
          onClose();
        }}
      />

      {/* Modal Card */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain no-scrollbar rounded-2xl border border-line bg-coal p-5 sm:p-8 shadow-2xl shadow-black/90 text-bone"
        data-lenis-prevent="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-ember/15 border border-ember/30 text-ember-hi shrink-0">
              <IconRadio className="size-5" />
            </div>
            <div>
              <div className="mono text-[10px] uppercase tracking-widest text-ember-hi">
                {t(lang, { en: "NOIR BROADCAST // 88.4 MHz", fa: "فرکانس‌های رادیویی و اتمسفر پرونده" })}
              </div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-bone mt-0.5">
                {t(lang, { en: "Atmospheric Soundscape Generator", fa: "شبیه‌ساز صداهای محیطی و نوآر" })}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick(420);
              onClose();
            }}
            className="size-8 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone hover:border-ember transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        {/* Master Volume Control */}
        <div className="rounded-xl border border-line/60 bg-void/60 p-4 mb-5 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="mono text-ash font-bold">
              {t(lang, { en: "Master Atmosphere Volume:", fa: "میزان صدای خروجی کلی اتمسفر:" })}
            </span>
            <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
              <span className="mono text-[10px] text-mute">0%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={volume}
                onChange={handleMasterVolumeChange}
                className="w-full accent-ember cursor-pointer h-1.5 bg-smoke rounded-lg appearance-none"
              />
              <span className="mono text-xs text-ember-hi w-8 text-end font-bold">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Curated Mixes / Presets */}
        <div className="mb-5 p-4 rounded-xl border border-line/60 bg-void/40">
          <div className="flex items-center gap-2 mb-3">
            <IconSparkles className="size-3.5 text-ember-hi" />
            <span className="mono text-[10px] uppercase tracking-widest text-ember-hi font-bold">
              {t(lang, { en: "CURATED PRESETS // 1-CLICK AMBIENCE", fa: "ترکیب‌های پیشنهادی و اتمسفرهای برگزیده" })}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SOUNDSCAPE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className="p-2.5 rounded-lg border border-line/70 bg-smoke/40 text-start hover:border-ember hover:bg-ember/15 transition-all group cursor-pointer"
              >
                <div className="font-display text-xs font-bold text-bone group-hover:text-ember-hi truncate">
                  {t(lang, preset.title)}
                </div>
                <div className="text-[10px] text-ash/70 line-clamp-1 mt-0.5">
                  {t(lang, preset.desc)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List (8 Procedural Soundscapes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {SOUNDSCAPES.map((trk) => {
            const isPlaying = activeIds.includes(trk.id);
            const { Icon } = trk;
            const trackVol = trackVols[trk.id] ?? 0.75;
            return (
              <div
                key={trk.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isPlaying
                    ? "border-ember bg-ember/15 text-bone shadow-[0_0_20px_rgba(232,163,61,0.15)] ring-1 ring-ember/40"
                    : "border-line bg-coal/70 text-ash hover:border-line/90 hover:bg-coal/90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border ${isPlaying ? "border-ember text-ember-hi bg-ember/20" : "border-line text-ash bg-smoke/40"}`}>
                        <Icon className="size-4" />
                      </div>
                      <span className="font-display text-sm font-bold text-bone">
                        {t(lang, trk.title)}
                      </span>
                    </div>

                    {/* Animated Equalizer Waveform */}
                    {isPlaying && (
                      <div className="flex items-end gap-0.5 h-3.5 shrink-0" aria-hidden="true">
                        <span className="w-1 bg-ember-hi rounded-full animate-[sway_0.6s_ease-in-out_infinite] h-3" />
                        <span className="w-1 bg-ember-hi rounded-full animate-[sway_0.8s_ease-in-out_infinite] h-2" />
                        <span className="w-1 bg-ember-hi rounded-full animate-[sway_0.5s_ease-in-out_infinite] h-3.5" />
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-ash/80 leading-relaxed mb-3">
                    {t(lang, trk.desc)}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {/* Play / Pause Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleTrack(trk.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg mono text-xs font-semibold transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-ember text-void hover:bg-ember-hi"
                        : "border border-line bg-smoke/60 text-ash hover:border-ember hover:text-ember-hi"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <IconPause className="size-3" />
                        <span>{t(lang, { en: "Pause Atmosphere", fa: "توقف اتمسفر" })}</span>
                      </>
                    ) : (
                      <>
                        <IconPlay className="size-3" />
                        <span>{t(lang, { en: "Play Atmosphere", fa: "پخش اتمسفر" })}</span>
                      </>
                    )}
                  </button>

                  {/* Individual Track Volume Slider */}
                  <div className="pt-2 border-t border-line/40 flex items-center justify-between gap-2 text-[10px]">
                    <span className="mono text-mute">{t(lang, { en: "Vol:", fa: "صدا:" })}</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={trackVol}
                      onChange={(e) => handleTrackVolumeChange(trk.id, e)}
                      className="w-full accent-ember cursor-pointer h-1 bg-smoke rounded-lg appearance-none"
                    />
                    <span className="mono text-ember-hi w-7 text-end font-bold">
                      {Math.round(trackVol * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-line/60 text-xs">
          <div className="mono text-[11px] text-mute">
            {activeIds.length > 0 ? (
              <span className="text-ember-hi font-bold">
                ● {activeIds.length} {t(lang, { en: "Atmosphere(s) Active", fa: "اتمسفر فعال در حال پخش" })}
              </span>
            ) : (
              <span>{t(lang, { en: "Broadcast Silent", fa: "رادیو در وضعیت سکوت" })}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {activeIds.length > 0 && (
              <button
                type="button"
                onClick={handleStopAll}
                className="mono text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                [{t(lang, { en: "Silence All", fa: "قطع تمام صداها" })}]
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClick(440);
                onClose();
              }}
              className="mono text-xs px-4 py-2 rounded-lg bg-ember/20 border border-ember/40 text-ember-hi hover:bg-ember/30 transition-all cursor-pointer font-bold"
            >
              {t(lang, { en: "Done", fa: "بستن پرونده" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
