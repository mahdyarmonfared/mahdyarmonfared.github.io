import { useState, useEffect, useRef } from "react";
import { BOOKING_DATA, BRAND, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import { IconClose } from "./Icons.jsx";

export function BookingModal({ lang, isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState(BOOKING_DATA.topics[0].id);
  const [selectedDay, setSelectedDay] = useState(0); // index 0 to 6
  const [selectedTime, setSelectedTime] = useState("16:30");
  const [platform, setPlatform] = useState("meet");
  const [clientContact, setClientContact] = useState("");
  const [clientName, setClientName] = useState("");
  const [booked, setBooked] = useState(false);
  const modalRef = useRef(null);

  // Generate next 7 upcoming days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dayNameEn = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const dayNameFa = d.toLocaleDateString("fa-IR", { weekday: "long", month: "long", day: "numeric" });
    const isoDate = d.toISOString().split("T")[0];
    return { isoDate, en: dayNameEn, fa: dayNameFa, dateObj: d };
  });

  const timeSlots = ["10:30", "14:00", "16:30", "18:45", "21:00"];

  useEffect(() => {
    if (!isOpen) return;
    playBlip(750);
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

  if (!isOpen) return null;

  const currentTopic = BOOKING_DATA.topics.find((t) => t.id === topic);
  const chosenDay = days[selectedDay];

  const handleConfirm = (e) => {
    e?.preventDefault();
    playBlip(950);
    setBooked(true);

    const platformName = platform === "meet" ? "Google Meet" : "Telegram Call";
    const topicTitle = t(lang, currentTopic);
    const dayStr = t(lang, chosenDay);

    const summary = `[CONSULTATION APPOINTMENT]
Client: ${clientName || "Prospective Client"}
Contact: ${clientContact || "N/A"}
Topic: ${topicTitle}
Date & Time: ${dayStr} @ ${selectedTime} (IRST)
Platform: ${platformName}

سلام مهدیار، مایل به تنظیم این جلسه آنلاین در تاریخ ذکر شده هستم.`;

    const encoded = encodeURIComponent(summary);
    window.open(`https://t.me/MahdyarMonfared?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadICS = () => {
    playClick(500);
    const d = chosenDay.dateObj;
    const [hours, mins] = selectedTime.split(":").map(Number);
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, mins);
    const end = new Date(start.getTime() + 15 * 60000); // 15 mins

    const pad = (n) => String(n).padStart(2, "0");
    const formatICSDate = (dt) =>
      `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mahdyar Monfared//Consultation Call//EN
BEGIN:VEVENT
UID:${Date.now()}@monfared.dev
DTSTAMP:${formatICSDate(new Date())}Z
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:15-min Web Consultation w/ ${t(lang, BRAND)}
DESCRIPTION:${t(lang, currentTopic)} via ${platform === "meet" ? "Google Meet" : "Telegram"}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consultation-${chosenDay.isoDate}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

      <div
        ref={modalRef}
        className="dotted-grid no-scrollbar relative max-h-[90svh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-coal p-6 sm:p-10 shadow-2xl shadow-black text-bone"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 anim-pulse-dot" />
            <span className="mono text-[10px] uppercase tracking-widest text-mute">
              15-MIN WIRE SESSION
            </span>
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

        {!booked ? (
          <form onSubmit={handleConfirm} className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {t(lang, BOOKING_DATA.title)}
              </h2>
              <p className="text-xs sm:text-sm text-ash leading-relaxed">
                {t(lang, BOOKING_DATA.sub)}
              </p>
            </div>

            {/* 1. Topic Selection */}
            <div>
              <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-2.5">
                {lang === "fa" ? "۱. موضوع گفتگو:" : "1. Select Discussion Topic:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BOOKING_DATA.topics.map((tp) => {
                  const isSel = topic === tp.id;
                  return (
                    <button
                      type="button"
                      key={tp.id}
                      onClick={() => {
                        playBlip(700);
                        setTopic(tp.id);
                      }}
                      className={`text-start p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSel
                          ? "border-ember bg-ember/15 text-ember-hi shadow-md"
                          : "border-line/60 bg-void/50 text-ash hover:border-line hover:text-bone"
                      }`}
                    >
                      {t(lang, tp)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date Selection */}
            <div>
              <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-2.5">
                {lang === "fa" ? "۲. انتخاب روز:" : "2. Choose Available Day:"}
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {days.map((d, i) => {
                  const isSel = selectedDay === i;
                  return (
                    <button
                      type="button"
                      key={d.isoDate}
                      onClick={() => {
                        playBlip(750);
                        setSelectedDay(i);
                      }}
                      className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSel
                          ? "border-ember bg-ember/20 text-ember-hi shadow-md"
                          : "border-line/60 bg-void/50 text-ash hover:border-line hover:text-bone"
                      }`}
                    >
                      {t(lang, d)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Time Slots */}
            <div>
              <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-2.5">
                {lang === "fa" ? "۳. انتخاب ساعت (به وقت ایران):" : "3. Choose Time Slot (IRST):"}
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((ts) => {
                  const isSel = selectedTime === ts;
                  return (
                    <button
                      type="button"
                      key={ts}
                      onClick={() => {
                        playBlip(800);
                        setSelectedTime(ts);
                      }}
                      className={`mono px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSel
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-md"
                          : "border-line/60 bg-void/50 text-ash hover:border-line hover:text-bone"
                      }`}
                    >
                      {ts}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Platform Selection */}
            <div>
              <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-2.5">
                {lang === "fa" ? "۴. بستر ارتباطی:" : "4. Preferred Platform:"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BOOKING_DATA.platforms.map((pl) => {
                  const isSel = platform === pl.id;
                  return (
                    <button
                      type="button"
                      key={pl.id}
                      onClick={() => {
                        playBlip(820);
                        setPlatform(pl.id);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        isSel
                          ? "border-ember bg-ember/20 text-ember-hi"
                          : "border-line/60 bg-void/50 text-ash hover:border-line hover:text-bone"
                      }`}
                    >
                      {t(lang, pl)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-1.5">
                  {lang === "fa" ? "نام یا عنوان برند:" : "Your Name / Company:"}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={lang === "fa" ? "مثال: علی رضایی" : "e.g. Alex Miller"}
                  className="w-full rounded-xl border border-line/80 bg-void/80 px-3.5 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                />
              </div>
              <div>
                <label className="mono block text-[10px] uppercase tracking-wider text-mute mb-1.5">
                  {lang === "fa" ? "آیدی تلگرام یا ایمیل:" : "Telegram Handle or Email:"}
                </label>
                <input
                  type="text"
                  required
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                  placeholder={lang === "fa" ? "@username یا ایمیل" : "@handle or email"}
                  className="w-full rounded-xl border border-line/80 bg-void/80 px-3.5 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mono w-full rounded-xl border border-ember bg-ember/25 py-3.5 text-xs font-bold text-ember-hi hover:bg-ember/35 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-ember/15"
            >
              <span>
                {lang === "fa" ? "تأیید رزرو و ارسال هماهنگی در تلگرام ↗" : "Confirm Booking & Dispatch to Telegram ↗"}
              </span>
            </button>
          </form>
        ) : (
          /* Booked Success State */
          <div className="py-8 text-center space-y-5 animate-fadeIn">
            <div className="size-16 rounded-full border border-emerald-500/50 bg-emerald-500/15 text-emerald-400 text-2xl flex items-center justify-center mx-auto">
              ✓
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-bone">
                {lang === "fa" ? "جلسه با موفقیت رزرو شد!" : "Appointment Scheduled!"}
              </h3>
              <p className="mono text-xs text-ash mt-1">
                {t(lang, chosenDay)} @ {selectedTime} (IRST)
              </p>
              <p className="text-xs text-mute mt-2">
                {lang === "fa"
                  ? "مشخصات به تلگرام ارسال شد. می‌توانید رویداد را به تقویم خود نیز بیفزایید:"
                  : "Dispatched to Telegram. You can also add this event to your calendar:"}
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadICS}
                className="mono rounded-xl border border-line bg-smoke/80 px-4 py-2.5 text-xs text-bone hover:border-ember transition-colors cursor-pointer"
              >
                📅 {lang === "fa" ? "دانلود فایل تقویم (.ics)" : "Download .ICS Event"}
              </button>
              <button
                onClick={onClose}
                className="mono rounded-xl border border-ember bg-ember/20 px-5 py-2.5 text-xs font-bold text-ember-hi hover:bg-ember/30 transition-colors cursor-pointer"
              >
                {lang === "fa" ? "بستن پنجره" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
