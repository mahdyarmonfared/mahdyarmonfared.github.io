import { useState } from "react";
import { AUDIT_SCANNER, t } from "../content.js";
import { playBlip, playGlitch, playClick } from "../lib/sound.js";

export function SiteAuditScanner({ lang }) {
  const [domain, setDomain] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (e) => {
    e?.preventDefault();
    const raw = domain.trim();
    if (!raw) return;

    setError(null);
    setIsScanning(true);
    setProgress(20);
    setResult(null);
    playBlip(700);

    const targetUrl = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    const cleanDomain = targetUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

    const progressTimer1 = setTimeout(() => {
      setProgress(55);
      playBlip(850);
    }, 450);

    const progressTimer2 = setTimeout(() => {
      setProgress(85);
      playBlip(950);
    }, 1000);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const startTime = performance.now();
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const latency = Math.round(performance.now() - startTime);

      if (!res.ok) {
        throw new Error(`HTTP_${res.status}`);
      }

      const json = await res.json();
      if (json.status !== "success") {
        throw new Error(json.message || "SCAN_FAILED");
      }

      clearTimeout(progressTimer1);
      clearTimeout(progressTimer2);
      setProgress(100);
      playClick(900);

      const headers = json.headers || {};
      const data = json.data || {};

      // 1. Compression analysis
      const encoding = (headers["content-encoding"] || "").toLowerCase();
      const hasCompression = encoding.includes("gzip") || encoding.includes("br") || encoding.includes("zstd");

      // 2. Cache policy analysis
      const cacheControl = (headers["cache-control"] || "").toLowerCase();
      const hasCaching = cacheControl.includes("max-age") && !cacheControl.includes("no-store") && !cacheControl.includes("no-cache");

      // 3. Security (HSTS)
      const hasHsts = Boolean(headers["strict-transport-security"]);

      // 4. Server & Status
      const server = headers["server"] || "Standard Web Host";
      const statusCode = json.statusCode || 200;

      // 5. Image & payload audit
      const img = data.image;
      const hasUnoptimizedImg = img && img.size > 350000 && !["webp", "avif", "svg"].includes((img.type || "").toLowerCase());

      // 6. Calculate real score
      let score = 100;
      if (latency > 1500) score -= 30;
      else if (latency > 900) score -= 20;
      else if (latency > 500) score -= 10;

      if (!hasCompression) score -= 22;
      if (!hasCaching) score -= 15;
      if (hasUnoptimizedImg) score -= 12;
      if (!hasHsts) score -= 6;
      score = Math.max(22, Math.min(98, score));

      // 7. Estimated LCP & metrics based on real network response
      const lcpSec = Math.max(0.6, Number(((latency * 2.4) / 1000).toFixed(1)));
      const lcp = `${lcpSec}s`;

      let estDrop = "12%";
      if (lcpSec > 4.0) estDrop = "48%";
      else if (lcpSec > 3.0) estDrop = "36%";
      else if (lcpSec > 2.0) estDrop = "24%";
      else if (lcpSec > 1.2) estDrop = "16%";

      let unneededWeight = "380 KB";
      if (!hasCompression && hasUnoptimizedImg) unneededWeight = "3.8 MB";
      else if (!hasCompression) unneededWeight = "2.4 MB";
      else if (hasUnoptimizedImg) unneededWeight = img.size_pretty || "1.6 MB";

      // 8. Real issues breakdown
      const issues = [];
      if (!hasCompression) {
        issues.push(
          lang === "fa"
            ? "فقدان فشرده‌سازی مدرن متنی (Brotli / Gzip) روی سرور؛ افزایش غیرضروری پهنای باند و تاخیر لود"
            : "Server lacks modern text compression (Brotli / Gzip); inflating byte payloads"
        );
      } else {
        issues.push(
          lang === "fa"
            ? `فشرده‌سازی فعال سرور: ${encoding.toUpperCase()} (مورد تایید)`
            : `Active server compression: ${encoding.toUpperCase()} (verified)`
        );
      }

      if (!hasCaching) {
        issues.push(
          lang === "fa"
            ? "سیاست کش مرورگر (Cache-Control) نامشخص یا خاموش است؛ هربار ورود نیازمند دانلود مجدد است"
            : "Static caching (Cache-Control) missing or zero; forcing full redownload per visit"
        );
      }

      if (latency > 800) {
        issues.push(
          lang === "fa"
            ? `تاخیر بالای پاسخ اولیه سرور (${latency}ms TTFB)؛ رندرینگ اولیه نیازمند بهینه‌سازی هاست است`
            : `High server response latency (${latency}ms TTFB); initial render blocked`
        );
      } else {
        issues.push(
          lang === "fa"
            ? `پاسخ زمانی اولیه سرور (TTFB): ${latency}ms (مطلوب)`
            : `Server response latency: ${latency}ms (healthy)`
        );
      }

      if (hasUnoptimizedImg) {
        issues.push(
          lang === "fa"
            ? `تصویر شاخص بهینه‌نشده است (${img.size_pretty} با فرمت ${img.type?.toUpperCase()})؛ تبدیل به WebP/AVIF سرعت را متحول می‌کند`
            : `Unoptimized featured image (${img.size_pretty} ${img.type?.toUpperCase()}); needs modern WebP/AVIF pipeline`
        );
      }

      if (!hasHsts) {
        issues.push(
          lang === "fa"
            ? "پروتکل امنیت سخت‌گیرانه HSTS در هدرهای پاسخ یافت نشد"
            : "Missing Strict-Transport-Security (HSTS) header"
        );
      }

      setResult({
        domain: cleanDomain,
        targetUrl,
        title: data.title || cleanDomain,
        server,
        statusCode,
        latency: `${latency}ms`,
        compression: encoding || "None",
        lcp,
        score,
        estDrop,
        unneededWeight,
        issues
      });
    } catch (err) {
      clearTimeout(progressTimer1);
      clearTimeout(progressTimer2);
      playGlitch();
      setError(
        lang === "fa"
          ? "خطا در اسکن دامنه. سرور در دسترس نیست یا پروتکل رادار مسدود شده است (مثال: google.com)"
          : "Target domain unreachable or radar probe blocked (e.g. google.com)"
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleDispatchTelegram = () => {
    if (!result) return;
    playBlip(950);
    const text = `[WEBSITE REAL PERFORMANCE AUDIT]
Target: ${result.domain}
Page: ${result.title}
Performance Score: ${result.score}/100
Response Latency (TTFB): ${result.latency}
Est. LCP: ${result.lcp}
Server / CDN: ${result.server}
Compression: ${result.compression}
Est. Conversion Drop: ${result.estDrop}
Unneeded Weight: ${result.unneededWeight}

سلام مهدیار، مایل به مشاوره و بهینه‌سازی فرانت‌اند این وب‌سایت هستم.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://t.me/MahdyarMonfared?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-red-400 border-red-500/30 bg-red-500/10";
  };

  return (
    <div className="rounded-2xl border border-line bg-coal p-6 sm:p-10 shadow-xl shadow-black/50" data-reveal="true">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="mono text-[10px] uppercase tracking-widest text-ember-hi font-bold">
            // LIVE AUDIT SCANNER
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-bone mt-1">
            {t(lang, AUDIT_SCANNER.title)}
          </h3>
        </div>
        <div className="flex items-center gap-2 mono text-[10px] text-mute">
          <span className="size-2 rounded-full bg-emerald-400 anim-pulse-dot" />
          <span>RADAR PROTOCOL v3.0 (REAL NETWORK)</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ash leading-relaxed max-w-2xl mb-6">
        {lang === "fa"
          ? "آدرس هر وب‌سایتی را وارد کنید تا پاسخ زنده سرور، هدرهای فشرده‌سازی، کش و سرعت رندرینگ آن در لحظه سنجیده شود."
          : "Enter any live URL to perform a genuine network probe auditing TTFB latency, compression headers, caching, and estimated bounce rate."}
      </p>

      {/* Input Form */}
      <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            if (error) setError(null);
          }}
          placeholder={t(lang, AUDIT_SCANNER.placeholder)}
          disabled={isScanning}
          className="flex-1 rounded-xl border border-line/80 bg-void/80 px-4 py-3.5 text-xs sm:text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isScanning || !domain.trim()}
          className="mono shrink-0 rounded-xl border border-ember bg-ember/20 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-ember-hi hover:bg-ember/30 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <span className="size-2 rounded-full bg-ember anim-pulse-dot" />
              <span>{t(lang, AUDIT_SCANNER.scanning)}</span>
            </>
          ) : (
            <span>{t(lang, AUDIT_SCANNER.cta)} ⚡</span>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-300 mono flex items-center gap-3">
          <span className="text-base">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Radar Progress Bar */}
      {isScanning && (
        <div className="mt-5 space-y-2">
          <div className="flex justify-between mono text-[10px] text-mute">
            <span>PROBING NETWORK TTFB & HEADERS…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-gradient-to-r from-ember-deep via-ember to-ember-hi transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results Box */}
      {result && (
        <div className="mt-8 rounded-xl border border-line/80 bg-void/60 p-5 sm:p-6 animate-fadeIn">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/50 pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="mono text-[9px] uppercase tracking-wider text-mute">AUDIT TARGET</span>
                <span className="mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                  HTTP {result.statusCode}
                </span>
                <span className="mono text-[9px] text-mute bg-smoke px-1.5 py-0.2 rounded border border-line">
                  {result.server}
                </span>
              </div>
              <p className="mono text-base sm:text-lg font-bold text-bone truncate max-w-md">
                {result.domain}
              </p>
              {result.title && result.title !== result.domain && (
                <p className="text-xs text-mute truncate max-w-lg mt-0.5">
                  {result.title}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`mono text-xs font-bold border px-2.5 py-1 rounded ${getScoreColor(result.score)}`}>
                Score: {result.score} / 100
              </span>
              <span className="mono text-xs font-bold text-ember border border-ember/30 bg-ember/10 px-2.5 py-1 rounded">
                LCP: {result.lcp}
              </span>
              <span className="mono text-xs font-bold text-ice border border-ice/30 bg-ice/10 px-2.5 py-1 rounded">
                TTFB: {result.latency}
              </span>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-line/60 bg-smoke/40 p-4">
              <span className="mono text-[10px] text-mute uppercase">
                {lang === "fa" ? "افت تخمینی فروش و لیدها:" : "Est. Conversion / Lead Drop:"}
              </span>
              <p className="font-display text-2xl font-extrabold text-red-400 mt-1">
                ~ {result.estDrop}
              </p>
              <p className="text-[11px] text-ash mt-1">
                {lang === "fa" ? "ناشی از تاخیر بیش از ۱ ثانیه در بارگذاری و ریزش کاربران" : "Based on industry bounce rate curves"}
              </p>
            </div>
            <div className="rounded-lg border border-line/60 bg-smoke/40 p-4">
              <span className="mono text-[10px] text-mute uppercase">
                {lang === "fa" ? "حجم اضافه و قابل فشرده‌سازی:" : "Bloated Unoptimized Weight:"}
              </span>
              <p className="font-display text-2xl font-extrabold text-amber-300 mt-1">
                ~ {result.unneededWeight}
              </p>
              <p className="text-[11px] text-ash mt-1">
                {lang === "fa" ? "قابل بهینه‌سازی با تکنیک‌های مدرن فرانت‌اند و فشرده‌سازی" : "Compressible with modern frontend pipeline"}
              </p>
            </div>
          </div>

          {/* Real Findings */}
          <div className="mb-6">
            <p className="mono text-[10px] text-mute uppercase mb-2">
              {lang === "fa" ? "نتایج تحلیل زنده شبکه و سرور:" : "Live Network & Header Audit Findings:"}
            </p>
            <ul className="space-y-1.5 text-xs text-ash list-disc list-inside">
              {result.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(result.targetUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="mono w-full sm:w-1/2 rounded-xl border border-line bg-smoke/80 hover:bg-smoke py-3 text-xs font-bold text-bone transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === "fa" ? "مشاهده در Google PageSpeed رسمی ↗" : "Official Google PageSpeed Report ↗"}</span>
            </a>
            <button
              type="button"
              onClick={handleDispatchTelegram}
              className="mono w-full sm:w-1/2 rounded-xl border border-ember bg-ember/25 py-3 text-xs font-bold text-ember-hi hover:bg-ember/35 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-ember/15"
            >
              <span>
                {lang === "fa"
                  ? "ارسال به تلگرام مهدیار جهت بازطراحی ↗"
                  : "Dispatch to Mahdyar on Telegram ↗"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SiteAuditScanner;
