import { useState, useId } from "react";
import { ESTIMATOR, t } from "../content.js";
import { playClick, playBlip } from "../lib/sound.js";
import {
  IconTelegram,
  IconFolder,
  IconDocument,
  IconCheck,
  IconBolt,
  IconClock
} from "../components/Icons.jsx";
import SiteAuditScanner from "../components/SiteAuditScanner.jsx";

export default function Estimator({ lang, onPortal, onOpenProtocol, onOpenBooking, onOpenSketchpad }) {
  const isFa = lang === "fa";
  const [scopeId, setScopeId] = useState("webapp");
  const [motionId, setMotionId] = useState("dynamic");
  const [urgencyId, setUrgencyId] = useState("standard");
  const [selectedAddons, setSelectedAddons] = useState(["bilingual", "seo"]);
  const [copied, setCopied] = useState(false);

  const seed = useId().replace(/\W/g, "").slice(0, 3).toUpperCase() || "7F9";
  const dossierCode = `${ESTIMATOR.codePrefix}${seed}`;

  // Find active selections
  const currentScope = ESTIMATOR.scopes.find((s) => s.id === scopeId) || ESTIMATOR.scopes[0];
  const currentMotion = ESTIMATOR.motionLevels.find((m) => m.id === motionId) || ESTIMATOR.motionLevels[0];
  const currentUrgency = ESTIMATOR.urgencies.find((u) => u.id === urgencyId) || ESTIMATOR.urgencies[0];

  // Calculate costs & days
  const baseToman = currentScope.baseToman;
  const baseUsd = currentScope.baseUsd;

  const motionMult = currentMotion.multiplier;
  const urgencyMult = currentUrgency.multiplier;

  const addonsPercent = selectedAddons.reduce((acc, aId) => {
    const item = ESTIMATOR.addOns.find((a) => a.id === aId);
    return acc + (item ? item.percent : 0);
  }, 0);

  const totalMultiplier = motionMult * urgencyMult * (1 + addonsPercent);
  const calculatedToman = Math.round((baseToman * totalMultiplier) / 1000000) * 1000000;
  const calculatedUsd = Math.round(baseUsd * totalMultiplier);

  const addonsDays = selectedAddons.reduce((acc, aId) => {
    const item = ESTIMATOR.addOns.find((a) => a.id === aId);
    return acc + (item ? item.daysAdd : 0);
  }, 0);

  const rawDays = (currentScope.days + currentMotion.daysAdd + addonsDays) * currentUrgency.daysMultiplier;
  const calculatedDays = Math.max(5, Math.round(rawDays));

  const formatCurrency = (amount) => {
    if (isFa) {
      return (amount / 1000000).toLocaleString("fa-IR") + " میلیون تومان";
    }
    return `$${amount.toLocaleString("en-US")} USD`;
  };

  const toggleAddon = (id) => {
    playClick(580);
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generatePreInvoiceText = () => {
    const priceStr = formatCurrency(isFa ? calculatedToman : calculatedUsd);
    const addonsList = selectedAddons
      .map((aId) => t(lang, ESTIMATOR.addOns.find((a) => a.id === aId)?.title || ""))
      .join(", ");

    if (isFa) {
      return `[پیش‌فاکتور پرونده مهدیار منفرد]
کد پرونده: ${dossierCode}
نوع پروژه: ${t(lang, currentScope.title)}
سطح انیمیشن و تعامل: ${t(lang, currentMotion.title)}
فوریت و زمان‌بندی: ${t(lang, currentUrgency.title)}
پروتکل‌های جانبی: ${addonsList || "بدون مورد اضافی"}
مدت زمان تحویل: حدود ${calculatedDays.toLocaleString("fa-IR")} روز کاری
برآورد سرمایه‌گذاری: ${priceStr}
تاریخ برآورد: ${new Date().toLocaleDateString("fa-IR")}`;
    }

    return `[MONFARED CASE PRE-INVOICE]
Dossier Ref: ${dossierCode}
Scope: ${t(lang, currentScope.title)}
Motion Fidelity: ${t(lang, currentMotion.title)}
Urgency: ${t(lang, currentUrgency.title)}
Add-ons: ${addonsList || "None"}
Estimated Timeline: ~${calculatedDays} working days
Estimated Investment: ${priceStr}
Timestamp: ${new Date().toISOString().split("T")[0]}`;
  };

  const handleCopy = () => {
    playBlip(900);
    navigator.clipboard.writeText(generatePreInvoiceText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleTelegramDispatch = () => {
    playBlip(950);
    const invoice = generatePreInvoiceText();
    const encoded = encodeURIComponent(invoice);
    window.open(`https://t.me/MahdyarMonfared?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handlePortalQueue = () => {
    playBlip(820);
    try {
      localStorage.setItem(
        "monfared_pending_estimate",
        JSON.stringify({
          dossierCode,
          title: t(lang, currentScope.title),
          budget: formatCurrency(isFa ? calculatedToman : calculatedUsd),
          days: calculatedDays,
          scope: currentScope.id,
          date: new Date().toISOString()
        })
      );
    } catch {
      // ignore
    }
    onPortal?.();
  };

  return (
    <section id="estimator" className="relative py-24 sm:py-32 px-4 sm:px-10 border-t border-line/50">
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-ember/5 via-transparent to-transparent opacity-40" />

      <div className="mx-auto max-w-[110rem]">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <div className="mono inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3.5 py-1 text-[10px] tracking-widest text-ember-hi uppercase mb-4">
            <span className="size-1.5 rounded-full bg-ember-hi anim-pulse-dot" />
            <span>{t(lang, { en: "ALGORITHMIC SCOPE MATRIX", fa: "ماتریس محاسباتی پرونده" })}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-bone pb-1 leading-[1.2]">
            {t(lang, ESTIMATOR.title)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ash leading-relaxed">
            {t(lang, ESTIMATOR.sub)}
          </p>
        </div>

        {/* Two-Column Grid: Left Configuration, Right Pre-Invoice Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Project Scope */}
            <div>
              <label className="mono block text-xs tracking-widest uppercase text-ember-hi mb-4">
                {t(lang, ESTIMATOR.labels.step1)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ESTIMATOR.scopes.map((s) => {
                  const selected = scopeId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        playClick(500);
                        setScopeId(s.id);
                      }}
                      className={`text-start p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        selected
                          ? "border-ember-hi bg-ember/15 text-bone shadow-[0_0_20px_rgba(255,217,160,0.15)] ring-1 ring-ember-hi/40"
                          : "border-line bg-coal/70 text-ash hover:border-ember/50 hover:bg-coal/90 hover:text-bone"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display text-base font-bold text-bone">
                          {t(lang, s.title)}
                        </span>
                        {selected && (
                          <span className="mono text-[10px] text-ember-hi bg-ember/25 px-2 py-0.5 rounded-full">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ash leading-relaxed mb-3">
                        {t(lang, s.desc)}
                      </p>
                      <div className="mono text-[11px] text-mute flex items-center justify-between">
                        <span>~{s.days} {t(lang, ESTIMATOR.labels.days)}</span>
                        <span className="text-ember font-bold">
                          {isFa ? `${(s.baseToman / 1000000).toLocaleString("fa-IR")} م ت` : `$${s.baseUsd}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Motion Fidelity */}
            <div>
              <label className="mono block text-xs tracking-widest uppercase text-ember-hi mb-4">
                {t(lang, ESTIMATOR.labels.step2)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ESTIMATOR.motionLevels.map((m) => {
                  const selected = motionId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        playClick(550);
                        setMotionId(m.id);
                      }}
                      className={`text-start p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selected
                          ? "border-ember bg-ember/15 text-bone shadow-[0_0_16px_rgba(232,163,61,0.2)]"
                          : "border-line bg-coal/70 text-ash hover:border-ember/40 hover:bg-coal/90"
                      }`}
                    >
                      <div className="font-display text-sm font-bold text-bone mb-1">
                        {t(lang, m.title)}
                      </div>
                      <p className="text-[11px] text-ash leading-relaxed mb-2">
                        {t(lang, m.desc)}
                      </p>
                      <div className="mono text-[10px] text-ember">
                        {m.multiplier === 1 ? "1.0x Base" : `+${Math.round((m.multiplier - 1) * 100)}% Depth`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div>
              <label className="mono block text-xs tracking-widest uppercase text-ember-hi mb-4">
                {t(lang, ESTIMATOR.labels.step3)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ESTIMATOR.urgencies.map((u) => {
                  const selected = urgencyId === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        playClick(600);
                        setUrgencyId(u.id);
                      }}
                      className={`text-start p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selected
                          ? "border-ember bg-ember/15 text-bone shadow-[0_0_16px_rgba(232,163,61,0.2)]"
                          : "border-line bg-coal/70 text-ash hover:border-ember/40 hover:bg-coal/90"
                      }`}
                    >
                      <div className="font-display text-sm font-bold text-bone mb-1">
                        {t(lang, u.title)}
                      </div>
                      <p className="text-[11px] text-ash leading-relaxed mb-2">
                        {t(lang, u.desc)}
                      </p>
                      <div className="mono text-[10px] text-ember-hi flex items-center gap-1">
                        {u.id === "emergency" ? (
                          <>
                            <IconBolt className="size-3 text-ember" />
                            <span>PRIORITY RUSH</span>
                          </>
                        ) : u.id === "expedited" ? (
                          <>
                            <IconClock className="size-3 text-ember" />
                            <span>RAPID SPRINT</span>
                          </>
                        ) : (
                          <>
                            <IconCheck className="size-3 text-ember" />
                            <span>BALANCED</span>
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Add-Ons Checkboxes */}
            <div>
              <label className="mono block text-xs tracking-widest uppercase text-ember-hi mb-4">
                {t(lang, ESTIMATOR.labels.step4)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR.addOns.map((a) => {
                  const active = selectedAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-start transition-all cursor-pointer ${
                        active
                          ? "border-ember/60 bg-ember/10 text-bone"
                          : "border-line bg-coal/50 text-ash hover:border-line hover:text-bone"
                      }`}
                    >
                      <div
                        className={`size-4 rounded flex items-center justify-center border text-[10px] transition-colors shrink-0 ${
                          active
                            ? "bg-ember border-ember text-void font-bold"
                            : "border-line bg-void text-transparent"
                        }`}
                      >
                        <IconCheck className="size-3" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-bone">{t(lang, a.title)}</div>
                      </div>
                      <span className="mono text-[10px] text-ember-hi shrink-0">
                        +{Math.round(a.percent * 100)}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dossier Receipt (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="relative rounded-2xl border border-line bg-coal/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden">
              <div className="pointer-events-none absolute -right-6 -bottom-6 font-display font-black text-8xl text-line/20 select-none">
                EST
              </div>

              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-line pb-5 mb-6">
                <div>
                  <div className="mono text-[10px] uppercase tracking-widest text-mute">
                    {t(lang, ESTIMATOR.labels.summaryTitle)}
                  </div>
                  <div className="mono text-sm font-bold text-ember-hi mt-0.5">
                    {dossierCode}
                  </div>
                </div>
                <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  {t(lang, { en: "OFFICIAL BRIEF", fa: "سند اولیه معتبر" })}
                </span>
              </div>

              {/* Chosen Spec Summary */}
              <div className="space-y-3.5 mb-8 text-xs">
                <div className="flex items-baseline justify-between border-b border-line/40 pb-2.5">
                  <span className="text-ash">{t(lang, { en: "Selected Scope", fa: "نوع پرونده" })}:</span>
                  <span className="font-bold text-bone">{t(lang, currentScope.title)}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-line/40 pb-2.5">
                  <span className="text-ash">{t(lang, { en: "Motion Fidelity", fa: "سطح انیمیشن" })}:</span>
                  <span className="font-bold text-bone">{t(lang, currentMotion.title)}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-line/40 pb-2.5">
                  <span className="text-ash">{t(lang, { en: "Delivery Urgency", fa: "فوریت تحویل" })}:</span>
                  <span className="font-bold text-bone">{t(lang, currentUrgency.title)}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-line/40 pb-2.5">
                  <span className="text-ash">{t(lang, { en: "Active Add-ons", fa: "پروتکل‌های جانبی" })}:</span>
                  <span className="font-bold text-ember-hi">
                    {selectedAddons.length} {t(lang, { en: "features", fa: "مورد فعال" })}
                  </span>
                </div>
              </div>

              {/* Computed Timeline & Investment Highlight */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="rounded-xl border border-line bg-void/70 p-4">
                  <div className="mono text-[10px] uppercase tracking-wider text-mute mb-1">
                    {t(lang, ESTIMATOR.labels.estTime)}
                  </div>
                  <div className="font-display text-2xl font-black text-bone">
                    ~{isFa ? calculatedDays.toLocaleString("fa-IR") : calculatedDays}{" "}
                    <span className="text-xs font-normal text-ash">{t(lang, ESTIMATOR.labels.days)}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-ember/40 bg-ember/10 p-4">
                  <div className="mono text-[10px] uppercase tracking-wider text-ember-hi mb-1">
                    {t(lang, ESTIMATOR.labels.estCost)}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-black text-ember-hi">
                    {formatCurrency(isFa ? calculatedToman : calculatedUsd)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Send to Telegram */}
                <button
                  type="button"
                  onClick={handleTelegramDispatch}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ember px-5 py-3.5 font-bold text-void transition-all hover:bg-ember-hi hover:scale-[1.02] cursor-pointer shadow-[0_0_20px_rgba(232,163,61,0.25)]"
                >
                  <IconTelegram className="size-4" />
                  <span>{t(lang, ESTIMATOR.labels.sendTelegram)}</span>
                </button>

                {/* Submit to Client Portal */}
                <button
                  type="button"
                  onClick={handlePortalQueue}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-ember-hi/40 bg-ember/10 px-5 py-3 font-semibold text-ember-hi transition-all hover:bg-ember/20 hover:border-ember-hi cursor-pointer"
                >
                  <IconFolder className="size-4" />
                  <span>{t(lang, ESTIMATOR.labels.submitPortal)}</span>
                </button>

                {/* Copy Pre-Invoice */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-coal px-4 py-2.5 text-xs text-ash transition-colors hover:text-bone hover:border-ash/50 cursor-pointer"
                >
                  <IconDocument className="size-4" />
                  <span>{copied ? t(lang, ESTIMATOR.labels.copied) : t(lang, ESTIMATOR.labels.copyEstimate)}</span>
                </button>

                {/* Book Consultation */}
                <button
                  type="button"
                  onClick={() => {
                    playBlip(750);
                    if (onOpenBooking) onOpenBooking();
                    else window.dispatchEvent(new Event("open-booking"));
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <span>📅</span>
                  <span>{lang === "fa" ? "رزرو جلسه هماهنگی آنلاین (۱۵ دقیقه)" : "Book 15-Min Wire Session"}</span>
                </button>

                {/* Auxiliary row: Protocol & Sketchpad */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playBlip(700);
                      if (onOpenProtocol) onOpenProtocol();
                      else window.dispatchEvent(new Event("open-protocol"));
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-smoke/60 px-2.5 py-2 text-[10px] text-ash hover:border-ember hover:text-ember-hi transition-colors cursor-pointer"
                  >
                    <span>✦</span>
                    <span className="truncate">{lang === "fa" ? "۴ ضمانت مهندسی" : "4 Guarantees"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playBlip(720);
                      if (onOpenSketchpad) onOpenSketchpad();
                      else window.dispatchEvent(new Event("open-sketchpad"));
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-smoke/60 px-2.5 py-2 text-[10px] text-ash hover:border-ember hover:text-ember-hi transition-colors cursor-pointer"
                  >
                    <span>✎</span>
                    <span className="truncate">{lang === "fa" ? "ترسیم ایده / وایرفریم" : "Napkin Sketch"}</span>
                  </button>
                </div>
              </div>

              {/* Footer reassurance */}
              <div className="mt-6 text-center text-[10px] text-mute mono">
                {t(lang, {
                  en: "Guaranteed pixel precision · Written NDA · Transparent milestones",
                  fa: "تضمین کیفیت پیکسل به پیکسل · قرارداد رسمی عدم افشا (NDA) · شفافیت فازها"
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Client Website Performance & Revenue Loss Audit Scanner */}
        <div className="mt-16 sm:mt-24">
          <SiteAuditScanner lang={lang} />
        </div>
      </div>
    </section>
  );
}

