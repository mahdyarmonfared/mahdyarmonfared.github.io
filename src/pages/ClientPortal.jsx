import { useState, useEffect } from "react";
import {
  getCurrentClient,
  registerClient,
  loginClient,
  demoLogin,
  logoutClient,
  addClientProject,
  addProjectAsset
} from "../lib/clientAuth.js";
import { playClick, playBlip, playGlitch } from "../lib/sound.js";
import { useLang } from "../context/LangContext.jsx";
import { t } from "../content.js";
import {
  IconGlobe,
  IconAlert,
  IconBolt,
  IconDocument,
  IconClose,
  IconTelegram,
  IconDesktop,
  IconTablet,
  IconMobile,
  IconLock,
  IconCheck,
  IconExternalLink,
  IconRadio,
  IconMenuGrid
} from "../components/Icons.jsx";
import CustomSelect from "../components/CustomSelect.jsx";

export default function ClientPortal({ onGoHome, onMegaMenu, onSoundscapeModal }) {
  const { lang, toggle } = useLang();
  const fa = lang === "fa";

  const [client, setClient] = useState(() => getCurrentClient());
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'
  const [error, setError] = useState("");
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regTelegram, setRegTelegram] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regProjectTitle, setRegProjectTitle] = useState("");

  // New Project Form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("وب‌سایت تعاملی و نوآر");
  const [newBudget, setNewBudget] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Staging viewport state ('desktop' | 'tablet' | 'mobile')
  const [stagingViewport, setStagingViewport] = useState("desktop");

  // Asset dropzone state
  const [assetTitle, setAssetTitle] = useState("");
  const [assetUrl, setAssetUrl] = useState("");
  const [assetType, setAssetType] = useState("FIGMA");
  const [assetSuccess, setAssetSuccess] = useState("");

  // Pending estimate from Estimator
  const [pendingEstimate, setPendingEstimate] = useState(() => {
    try {
      const raw = localStorage.getItem("monfared_pending_estimate");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error(fa ? "لطفاً ایمیل و کلمه عبور را وارد نمایید." : "Please enter email and password.");
      }
      playClick(600);
      const user = loginClient({ email: loginEmail, password: loginPassword });
      setClient(user);
      setActiveProjectIdx(0);
    } catch (err) {
      playGlitch();
      setError(err.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!regFullName || !regEmail || !regPassword || !regTelegram) {
        throw new Error(
          fa
            ? "لطفاً تمامی فیلدهای ستاره‌دار (نام، ایمیل، کلمه عبور و تلگرام) را پر کنید."
            : "Please fill all required fields (Name, Email, Password, Telegram)."
        );
      }
      playClick(620);
      const user = registerClient({
        fullName: regFullName,
        email: regEmail,
        password: regPassword,
        telegram: regTelegram,
        company: regCompany,
        initialProjectTitle: regProjectTitle
      });
      setClient(user);
      setActiveProjectIdx(0);
    } catch (err) {
      playGlitch();
      setError(err.message);
    }
  };

  const handleDemoLogin = () => {
    playBlip(750);
    const demoUser = demoLogin();
    setClient(demoUser);
    setActiveProjectIdx(0);
  };

  const handleLogout = () => {
    playClick(450);
    logoutClient();
    setClient(null);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    try {
      if (!newTitle.trim()) {
        throw new Error(fa ? "عنوان پروژه نمی‌تواند خالی باشد." : "Project title is required.");
      }
      playBlip(800);
      const updated = addClientProject({
        title: newTitle.trim(),
        category: newCategory,
        budget: newBudget.trim(),
        deadline: newDeadline.trim(),
        description: newDesc.trim()
      });
      setClient({ ...updated });
      setActiveProjectIdx(0);
      setShowNewProjectModal(false);
      setNewTitle("");
      setNewBudget("");
      setNewDeadline("");
      setNewDesc("");
    } catch (err) {
      playGlitch();
      alert(err.message);
    }
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!activeProject) return;
    try {
      if (!assetTitle.trim() || !assetUrl.trim()) {
        throw new Error(fa ? "لطفاً عنوان و آدرس لینک فایل را وارد نمایید." : "Title and URL are required.");
      }
      playBlip(780);
      const updated = addProjectAsset(activeProject.id, {
        title: assetTitle.trim(),
        url: assetUrl.trim(),
        type: assetType
      });
      setClient({ ...updated });
      setAssetTitle("");
      setAssetUrl("");
      setAssetSuccess(fa ? "سند با موفقیت به پرونده پیوست شد." : "Asset attached to dossier successfully.");
      setTimeout(() => setAssetSuccess(""), 3000);
    } catch (err) {
      playGlitch();
      alert(err.message);
    }
  };

  const handleImportPendingEstimate = () => {
    if (!pendingEstimate) return;
    playBlip(850);
    setNewTitle(pendingEstimate.title);
    setNewBudget(pendingEstimate.budget);
    setNewDeadline(`${pendingEstimate.days} روز کاری`);
    setNewDesc(`کد پیش‌فاکتور: ${pendingEstimate.dossierCode}`);
    setShowNewProjectModal(true);
    localStorage.removeItem("monfared_pending_estimate");
    setPendingEstimate(null);
  };

  const activeProject = client?.projects?.[activeProjectIdx] || client?.projects?.[0];

  const assetTypeOptions = [
    {
      value: "FIGMA",
      label: fa ? "FIGMA (طراحی رابط کاربری و دیزاین)" : "FIGMA (UI/UX Design System)",
      icon: <span className="mono font-extrabold text-[10px] text-ember-hi bg-ember/20 px-1 py-0.5 rounded border border-ember/30">FIG</span>
    },
    {
      value: "DOCS",
      label: fa ? "GOOGLE DRIVE / DOCS (اسناد و محتوا)" : "GOOGLE DRIVE / DOCS (Brief & Docs)",
      icon: <IconDocument className="size-3.5 text-blue-400" />
    },
    {
      value: "GITHUB",
      label: fa ? "GITHUB (کد و ریپازیتوری)" : "GITHUB (Repository & Code)",
      icon: <span className="mono font-extrabold text-[10px] text-purple-400 bg-purple-500/20 px-1 py-0.5 rounded border border-purple-500/30">GIT</span>
    },
    {
      value: "API",
      label: fa ? "API / SWAGGER (مستندات سرور)" : "API / SWAGGER (Backend Specs)",
      icon: <IconBolt className="size-3.5 text-amber-400" />
    }
  ];

  const categoryOptions = [
    { value: "وب‌سایت تعاملی و نوآر", label: fa ? "وب‌سایت تعاملی و نوآر" : "Interactive & Noir Website" },
    { value: "وب‌اپلیکیشن React / Next.js", label: fa ? "وب‌اپلیکیشن React / Next.js" : "React / Next.js Web App" },
    { value: "طراحی UI/UX و سیستم دیزاین", label: fa ? "طراحی UI/UX و سیستم دیزاین" : "UI/UX & Design System" },
    { value: "ریدیزاین و ارتقای پرفورمنس", label: fa ? "ریدیزاین و ارتقای پرفورمنس" : "Redesign & Performance Boost" }
  ];

  return (
    <div
      dir={fa ? "rtl" : "ltr"}
      className="grain vignette relative min-h-svh w-full bg-void text-bone py-6 px-4 sm:px-8 lg:px-12 flex flex-col justify-between"
    >
      {/* Top Header */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5 mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              playClick(500);
              onGoHome();
            }}
            data-cursor="link"
            className="mono flex items-center gap-2 rounded-full border border-line bg-coal/80 px-4 py-2 text-xs uppercase tracking-widest text-ash transition-all hover:border-ember hover:text-ember-hi hover:bg-ember/10"
          >
            <span>{fa ? "← بازگشت به پورتفولیو" : "← Return to Site"}</span>
          </button>

          <div className="hidden sm:block h-4 w-px bg-line" />

          <div className="flex items-baseline gap-2">
            <span className="size-2 rounded-full bg-ember anim-pulse-dot" />
            <span className="mono text-xs uppercase tracking-[0.2em] text-mute">
              {fa ? "سامانه نظارت کارفرما // DOSSIER" : "CLIENT PORTAL // DOSSIER"}
            </span>
          </div>
        </div>

        {/* Right utility controls */}
        <div className="flex items-center gap-2.5">
          {client && (
            <div className="hidden md:flex items-center gap-2 rounded-full border border-ember-hi/30 bg-ember/10 px-3.5 py-1.5 text-xs text-ember-hi">
              <span className="mono text-[10px] text-mute">{fa ? "کارفرما:" : "Client:"}</span>
              <span className="font-bold">{client.fullName}</span>
              <span className="mono text-[10px] text-mute">({client.telegram})</span>
            </div>
          )}

          {client && (
            <button
              onClick={handleLogout}
              data-cursor="link"
              className="mono rounded-full border border-line px-3.5 py-1.5 text-xs uppercase tracking-widest text-ash hover:border-blood hover:text-blood transition-colors"
            >
              {fa ? "خروج" : "Sign Out"}
            </button>
          )}

          {/* Radio Soundscape */}
          <button
            onClick={() => {
              playClick(480);
              onSoundscapeModal?.();
            }}
            data-cursor="link"
            className="mono inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10 transition-colors cursor-pointer"
            title={fa ? "رادیو و صداهای اتمسفریک" : "Atmospheric Radio"}
          >
            <IconRadio className="size-3.5 text-ember-hi" />
            <span className="hidden sm:inline">{fa ? "رادیو" : "Radio"}</span>
          </button>

          {/* MegaMenu Index */}
          <button
            onClick={() => {
              playClick(500);
              onMegaMenu?.();
            }}
            data-cursor="link"
            className="mono inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ash hover:border-ember hover:text-ember-hi hover:bg-ember/10 transition-colors cursor-pointer"
            title={fa ? "نقشه جامع پرونده‌ها و منو" : "Sitemap & Mega Menu"}
          >
            <IconMenuGrid className="size-3.5" />
            <span className="hidden sm:inline">{fa ? "فهرست" : "Index"}</span>
          </button>

          <button
            onClick={() => {
              playClick(640);
              toggle();
            }}
            data-cursor="link"
            className="mono inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-ash hover:border-ember hover:text-ember-hi transition-colors"
          >
            <IconGlobe className="size-3.5" />
            <span>{fa ? "English" : "فارسی"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto">
        {!client ? (
          /* ================= AUTHENTICATION VIEW ================= */
          <div className="max-w-xl mx-auto my-6 sm:my-10">
            {/* Header Title */}
            <div className="text-center mb-8">
              <span className="mono inline-block rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ember-hi mb-3">
                {fa ? "دسترسی محرمانه پرونده‌ها" : "CONFIDENTIAL CASE ACCESS"}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-bone">
                {fa ? "پنل و داشبورد کارفرمایان" : "Client Portal & Dashboard"}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-ash leading-6 max-w-md mx-auto">
                {fa
                  ? "برای ثبت پروژه تازه، رهگیری لحظه‌ای درصد پیشرفت و بررسی فازهای طراحی و کدنویسی، وارد حساب خود شوید."
                  : "Sign in to track real-time project milestones, view development progress, and commission new creative projects."}
              </p>
            </div>

            {/* Auth Box */}
            <div className="dotted-grid relative rounded-2xl border border-line bg-coal/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              {/* Tab Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-void border border-line/80 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    playClick(500);
                    setAuthMode("login");
                    setError("");
                  }}
                  className={`mono py-2.5 text-xs uppercase tracking-widest rounded-lg transition-all ${
                    authMode === "login"
                      ? "bg-ember-hi text-void font-extrabold shadow-md"
                      : "text-ash hover:text-bone"
                  }`}
                >
                  {fa ? "ورود به حساب" : "Sign In"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick(520);
                    setAuthMode("register");
                    setError("");
                  }}
                  className={`mono py-2.5 text-xs uppercase tracking-widest rounded-lg transition-all ${
                    authMode === "register"
                      ? "bg-ember-hi text-void font-extrabold shadow-md"
                      : "text-ash hover:text-bone"
                  }`}
                >
                  {fa ? "ثبت‌نام کارفرما" : "Register Client"}
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-blood/50 bg-blood/10 p-3 text-xs text-blood flex items-center gap-2">
                  <IconAlert className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                      {fa ? "آدرس ایمیل" : "Email Address"} *
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="client@company.com"
                      className="w-full rounded-lg border border-line bg-void/80 px-4 py-3 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                      {fa ? "کلمه عبور" : "Password"} *
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-line bg-void/80 px-4 py-3 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-lg bg-ember py-3.5 font-display text-sm font-bold text-void uppercase tracking-widest transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(232,163,61,0.3)]"
                  >
                    {fa ? "ورود به داشبورد پرونده" : "Enter Dashboard"}
                  </button>
                </form>
              ) : (
                /* Registration Form */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                        {fa ? "نام و نام خانوادگی" : "Full Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder={fa ? "مثال: علی رضایی" : "e.g. Alex Morgan"}
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                        {fa ? "آیدی تلگرام" : "Telegram Username"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={regTelegram}
                        onChange={(e) => setRegTelegram(e.target.value)}
                        placeholder="@username"
                        dir="ltr"
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                      {fa ? "آدرس ایمیل" : "Email Address"} *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                        {fa ? "کلمه عبور" : "Password"} *
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                        {fa ? "نام شرکت / برند (اختیاری)" : "Company / Brand"}
                      </label>
                      <input
                        type="text"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder={fa ? "مثال: استودیو مدار" : "e.g. Acme Corp"}
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1.5">
                      {fa ? "عنوان اولین پروژه مدنظر (اختیاری)" : "Initial Project Goal"}
                    </label>
                    <input
                      type="text"
                      value={regProjectTitle}
                      onChange={(e) => setRegProjectTitle(e.target.value)}
                      placeholder={fa ? "مثال: وب‌سایت شخصی نوآر یا فروشگاه RTL" : "e.g. Portfolio or Web Application"}
                      className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-lg bg-ember py-3.5 font-display text-sm font-bold text-void uppercase tracking-widest transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(232,163,61,0.3)]"
                  >
                    {fa ? "ثبت‌نام و افتتاح پرونده" : "Register & Open File"}
                  </button>
                </form>
              )}

              {/* Quick Demo Access Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-line" />
                </div>
                <span className="relative bg-coal px-3 mono text-[10px] uppercase tracking-widest text-mute">
                  {fa ? "یا تست سریع بدون ثبت‌نام" : "OR INSTANT PREVIEW"}
                </span>
              </div>

              {/* Instant Demo Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-ember-hi/40 bg-ember/5 py-3 text-xs uppercase tracking-widest text-ember-hi transition-all hover:bg-ember/15 hover:border-ember-hi"
              >
                <IconBolt className="size-4 text-ember" />
                <span>{fa ? "ورود آزمایشی سریع (دمو پرونده ۷۲٪)" : "Launch Sample Demo Client (72% Progress)"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= CLIENT DASHBOARD VIEW ================= */
          <div className="space-y-8">
            {/* Pending Estimate Alert Banner if navigated from Estimator */}
            {pendingEstimate && (
              <div className="rounded-2xl border border-ember bg-ember/15 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(232,163,61,0.2)]">
                <div className="flex items-center gap-3">
                  <IconDocument className="size-6 text-ember shrink-0" />
                  <div>
                    <div className="mono text-xs font-bold text-ember-hi">
                      {fa
                        ? `پیش‌فاکتور محاسبه‌شده (${pendingEstimate.dossierCode}) آماده ثبت است!`
                        : `Calculated Estimate (${pendingEstimate.dossierCode}) ready to register!`}
                    </div>
                    <div className="text-xs text-ash mt-0.5">
                      {pendingEstimate.title} — {pendingEstimate.budget} ({pendingEstimate.days} {fa ? "روز کاری" : "days"})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleImportPendingEstimate}
                    className="mono text-xs rounded-full bg-ember px-4 py-2 font-bold text-void hover:bg-ember-hi transition-all cursor-pointer"
                  >
                    {fa ? "ایجاد این پرونده ←" : "Open This Case →"}
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("monfared_pending_estimate");
                      setPendingEstimate(null);
                    }}
                    className="mono text-xs rounded-full border border-line p-2 text-mute hover:text-ash cursor-pointer flex items-center justify-center"
                  >
                    <IconClose className="size-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Top Bar: Welcome and Project Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-line bg-coal/80 p-5 sm:p-7 backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="mono text-[10px] uppercase tracking-[0.25em] text-ember-hi">
                    {fa ? "داشبورد فعال کارفرما" : "ACTIVE CLIENT DOSSIER"}
                  </span>
                  <span className="size-1.5 rounded-full bg-emerald-400 anim-pulse-dot" />
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-bone">
                  {fa ? `خوش آمدید، ${client.fullName}` : `Welcome, ${client.fullName}`}
                </h1>
                <p className="mono mt-1 text-xs text-mute">
                  {fa ? "شناسه تلگرام:" : "Telegram:"} <span className="text-ash">{client.telegram}</span>
                  {client.company && ` · ${client.company}`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="mono rounded-full bg-ember px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-void transition-transform hover:scale-105 shadow-[0_0_16px_rgba(232,163,61,0.35)]"
                >
                  + {fa ? "سفارش پروژه جدید" : "New Commission"}
                </button>

                <a
                  href={`https://t.me/${client.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mono inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-xs text-ash hover:border-ember hover:text-ember-hi transition-colors"
                >
                  <IconTelegram className="size-3.5" />
                  <span>{fa ? "پیام به مهدیار" : "Direct Telegram"}</span>
                </a>
              </div>
            </div>

            {/* Project Selector Tabs if client has multiple projects */}
            {client.projects && client.projects.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="mono text-[10px] uppercase tracking-widest text-mute shrink-0">
                  {fa ? "پرونده‌ها:" : "Cases:"}
                </span>
                {client.projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      playClick(500);
                      setActiveProjectIdx(idx);
                    }}
                    className={`mono shrink-0 rounded-full px-4 py-1.5 text-xs transition-all ${
                      activeProjectIdx === idx
                        ? "border border-ember-hi/80 bg-ember/20 text-ember-hi font-bold shadow-[0_0_12px_rgba(255,217,160,0.3)]"
                        : "border border-line bg-smoke/40 text-ash hover:border-line/90"
                    }`}
                  >
                    #{p.id} — {t(lang, p.title)} ({p.progress}%)
                  </button>
                ))}
              </div>
            )}

            {/* Project Progress Showcase Hero */}
            {activeProject && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gauge & Progress Percentage Card (1 Col) */}
                <div className="rounded-2xl border border-line bg-coal p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="mono text-[10px] uppercase tracking-[0.25em] text-mute">
                        {fa ? "درصد پیشرفت پرونده" : "PROJECT COMPLETION"}
                      </span>
                      <span className="mono rounded-full border border-emerald-500/40 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-emerald-400">
                        {activeProject.status}
                      </span>
                    </div>

                    {/* Circular visual progress meter */}
                    <div className="my-6 flex flex-col items-center justify-center text-center">
                      <div className="relative size-44 grid place-items-center">
                        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                          {/* Track */}
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#15151e"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          {/* Progress Arc */}
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#ffd9a0"
                            strokeWidth="8"
                            strokeDasharray={264}
                            strokeDashoffset={264 - (264 * activeProject.progress) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-5xl font-extrabold text-ember-hi tracking-tight">
                            {activeProject.progress}%
                          </span>
                          <span className="mono text-[10px] uppercase tracking-widest text-mute mt-0.5">
                            {fa ? "تکمیل شده" : "COMPLETED"}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-ash max-w-xs">
                        {activeProject.progress >= 100
                          ? (fa ? "پرونده تکمیل و تحویل داده شد." : "Project successfully delivered.")
                          : (fa
                              ? "پروژه طبق برنامه زمان‌بندی با کیفیت بالا در حال توسعه است."
                              : "Development progressing smoothly towards target deadline.")}
                      </p>
                    </div>
                  </div>

                  {/* Meta Information list */}
                  <div className="border-t border-line/60 pt-4 space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="mono text-mute">{fa ? "کد رهگیری پرونده:" : "Case ID:"}</span>
                      <span className="mono font-bold text-bone">#{activeProject.id}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="mono text-mute">{fa ? "تاریخ آغاز:" : "Started:"}</span>
                      <span className="mono text-ash">{activeProject.startDate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="mono text-mute">{fa ? "تحویل تخمینی:" : "Delivery Target:"}</span>
                      <span className="mono font-bold text-ember-hi">{activeProject.deliveryDate}</span>
                    </div>
                  </div>
                </div>

                {/* Phases Breakdown & Log (2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Phases Checklist */}
                  <div className="rounded-2xl border border-line bg-coal p-6 sm:p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-bold text-bone">
                        {t(lang, activeProject.title)}
                      </h2>
                      <span className="mono text-[10px] rounded border border-line bg-smoke px-2.5 py-1 text-mute">
                        {activeProject.category}
                      </span>
                    </div>

                    <h3 className="mono text-[10px] uppercase tracking-[0.25em] text-mute mb-4">
                      {fa ? "فازهای ۴ گانه اجرای پرونده" : "CASE MILESTONES & PHASES"}
                    </h3>

                    <div className="space-y-4">
                      {activeProject.phases.map((phase) => (
                        <div
                          key={phase.id}
                          className="rounded-xl border border-line/70 bg-void/50 p-4 transition-all hover:border-line"
                        >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`grid size-6 place-items-center rounded-full text-xs font-bold ${
                                  phase.completed
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : phase.progress > 0
                                    ? "bg-ember/20 text-ember-hi border border-ember-hi/40"
                                    : "bg-smoke text-mute border border-line"
                                }`}
                              >
                                {phase.completed ? <IconCheck className="size-3 text-emerald-400" /> : phase.id}
                              </span>
                              <span className="font-display text-sm sm:text-base font-bold text-bone">
                                {t(lang, phase.title)}
                              </span>
                            </div>

                            <span
                              className={`mono text-xs font-bold ${
                                phase.completed
                                  ? "text-emerald-400"
                                  : phase.progress > 0
                                  ? "text-ember-hi"
                                  : "text-mute"
                              }`}
                            >
                              {phase.progress}%
                            </span>
                          </div>

                          {/* Phase Progress Bar */}
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-smoke">
                            <div
                              className={`h-full transition-all duration-700 ${
                                phase.completed
                                  ? "bg-emerald-400"
                                  : phase.progress > 0
                                  ? "bg-gradient-to-r from-ember to-ember-hi"
                                  : "bg-transparent"
                              }`}
                              style={{ width: `${phase.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity and Update Log */}
                  <div className="rounded-2xl border border-line bg-coal p-6 sm:p-8 shadow-xl">
                    <h3 className="mono text-[10px] uppercase tracking-[0.25em] text-mute mb-4">
                      {fa ? "وقایع‌نگاری و گزارشات کارآگاه" : "INVESTIGATION LOG & UPDATES"}
                    </h3>

                    <div className="space-y-3">
                      {activeProject.logs?.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-start gap-3 rounded-lg border border-line/40 bg-smoke/30 p-3.5"
                        >
                          <span className="mono text-[10px] rounded bg-smoke px-2 py-0.5 text-ember-hi shrink-0">
                            {log.date}
                          </span>
                          <p className="text-xs sm:text-sm text-ash leading-6">
                            {t(lang, log.text)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= LIVE STAGING & VIEWPORT PREVIEW ================= */}
              <div className="rounded-2xl border border-line bg-coal p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="mono text-[10px] uppercase tracking-widest text-ember-hi">
                        {fa ? "محیط زنده استیجینگ" : "LIVE STAGING DEPLOYMENT"}
                      </span>
                      <span className="size-1.5 rounded-full bg-emerald-400 anim-pulse-dot" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-bone">
                      {fa ? "پیش‌نمایش تعاملی نسخه در حال توسعه" : "Interactive Staging Build Preview"}
                    </h3>
                  </div>

                  {/* Viewport Switcher Buttons */}
                  <div className="flex items-center gap-1 rounded-full border border-line bg-smoke/70 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        playClick(500);
                        setStagingViewport("desktop");
                      }}
                      className={`mono text-[11px] inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        stagingViewport === "desktop"
                          ? "bg-ember text-void font-bold"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      <IconDesktop className="size-3.5" />
                      <span>{fa ? "دسکتاپ" : "Desktop"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playClick(550);
                        setStagingViewport("tablet");
                      }}
                      className={`mono text-[11px] inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        stagingViewport === "tablet"
                          ? "bg-ember text-void font-bold"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      <IconTablet className="size-3.5" />
                      <span>{fa ? "تبلت" : "Tablet"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playClick(600);
                        setStagingViewport("mobile");
                      }}
                      className={`mono text-[11px] inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        stagingViewport === "mobile"
                          ? "bg-ember text-void font-bold"
                          : "text-ash hover:text-bone"
                      }`}
                    >
                      <IconMobile className="size-3.5" />
                      <span>{fa ? "موبایل" : "Mobile"}</span>
                    </button>
                  </div>
                </div>

                {/* Staging Browser Frame */}
                <div className="rounded-xl border border-line/80 bg-void overflow-hidden shadow-2xl">
                  {/* Browser Window Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-smoke/80 border-b border-line/60">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-red-500/80" />
                      <span className="size-2.5 rounded-full bg-amber-500/80" />
                      <span className="size-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="mono text-[10px] text-ash/80 bg-void/80 px-4 py-1 rounded-md border border-line/40 max-w-sm truncate flex-1 mx-4 text-center inline-flex items-center justify-center gap-1.5">
                      <IconLock className="size-3 text-ember shrink-0" />
                      <span className="truncate">{activeProject.stagingUrl || `https://staging.monfared.dev/case/${activeProject.id}`}</span>
                    </div>

                    <span className="mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      LIVE 200 OK
                    </span>
                  </div>

                  {/* Responsive Viewport Mock Display */}
                  <div className="p-4 sm:p-8 flex justify-center bg-radial-gradient from-smoke/20 to-void min-h-[380px] overflow-x-auto">
                    <div
                      className={`transition-all duration-300 rounded-lg border border-line/60 bg-coal/90 p-6 flex flex-col justify-between ${
                        stagingViewport === "mobile"
                          ? "w-[360px]"
                          : stagingViewport === "tablet"
                          ? "w-[680px]"
                          : "w-full max-w-4xl"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-line/40 pb-3 mb-5">
                          <div>
                            <div className="mono text-[9px] text-ember uppercase tracking-widest">
                              STAGE_03 // CLIENT_RELEASE_CANDIDATE
                            </div>
                            <h4 className="font-display text-lg sm:text-xl font-extrabold text-bone mt-1">
                              {t(lang, activeProject.title)}
                            </h4>
                          </div>
                          <span className="mono text-xs font-bold text-ember-hi bg-ember/20 px-3 py-1 rounded-full border border-ember-hi/40">
                            {activeProject.progress}% DEPLOYED
                          </span>
                        </div>

                        {/* Interactive Prototype Preview Area */}
                        <div className="rounded-lg border border-line/50 bg-void/70 p-5 space-y-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-ash">{fa ? "معماری محصول:" : "Architecture:"}</span>
                            <span className="mono text-bone">React 19 · Vite · Tailwind v4 · GSAP</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-ash">{fa ? "امتیاز لایت‌هاوس تست‌شده:" : "Lighthouse Performance:"}</span>
                            <span className="mono text-emerald-400 font-bold">99 / 100 (Clean Vitals)</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-ash">{fa ? "وضعیت سازگاری:" : "Compatibility:"}</span>
                            <span className="mono text-ember-hi">Responsive 320px - 4K · Persian RTL</span>
                          </div>

                          <div className="mt-4 pt-4 border-t border-line/40 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => playBlip(880)}
                              className="mono text-xs inline-flex items-center gap-1.5 rounded-lg bg-ember px-4 py-2 text-void font-bold hover:bg-ember-hi transition-colors cursor-pointer"
                            >
                              <IconBolt className="size-3.5" />
                              <span>{fa ? "تست تعاملی موشن" : "Test Interaction"}</span>
                            </button>
                            <span className="mono text-[10px] text-mute">
                              {fa ? "کلیک کنید تا بازخورد صوتی و انیمیشن را تست کنید" : "Click to test synthesized audio feedback"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-line/40 flex items-center justify-between mono text-[10px] text-mute">
                        <span>STAGING ENVIRONMENT v2.4</span>
                        <span>CONFIDENTIAL CLIENT PREVIEW</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ASSET & FIGMA DROPZONE ================= */}
              <div className="rounded-2xl border border-line bg-coal p-6 sm:p-8 shadow-xl">
                <div className="border-b border-line pb-4 mb-6">
                  <span className="mono text-[10px] uppercase tracking-widest text-ember-hi">
                    {fa ? "صندوق تحویل فایل‌ها و اسناد" : "ASSET & FIGMA VAULT"}
                  </span>
                  <h3 className="font-display text-xl font-bold text-bone mt-1">
                    {fa ? "تحویل مستندات، لینک‌های فیگما و فایل‌های ضمیمه" : "Submit Project Assets & Brief Links"}
                  </h3>
                  <p className="text-xs text-ash mt-1">
                    {fa
                      ? "می‌توانید لینک‌های فیگما، گوگل درایو، ریپازیتوری یا توضیحات تکمیلی خود را مستقیماً به پرونده متصل کنید."
                      : "Attach Figma files, Google Drive assets, GitHub repos, or documentation to this dossier."}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Upload Form (5 cols) */}
                  <form onSubmit={handleAddAsset} className="lg:col-span-5 space-y-4">
                    {assetSuccess && (
                      <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-3 text-xs text-emerald-400 flex items-center gap-2">
                        <IconCheck className="size-3.5 shrink-0" />
                        <span>{assetSuccess}</span>
                      </div>
                    )}

                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                        {fa ? "عنوان مدرک / فایل" : "Asset Title"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={assetTitle}
                        onChange={(e) => setAssetTitle(e.target.value)}
                        placeholder={fa ? "مثال: دیزاین سیستم فیگما نسخه نهایی" : "e.g. Figma Design System v3"}
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-xs text-bone placeholder:text-mute focus:border-ember focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                        {fa ? "آدرس لینک مستقیم (URL)" : "Direct URL Link"} *
                      </label>
                      <input
                        type="url"
                        required
                        value={assetUrl}
                        onChange={(e) => setAssetUrl(e.target.value)}
                        placeholder="https://figma.com/... or https://drive.google.com/..."
                        dir="ltr"
                        className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-xs text-bone placeholder:text-mute focus:border-ember focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                        {fa ? "نوع مدرک" : "Asset Type"}
                      </label>
                      <CustomSelect
                        value={assetType}
                        onChange={setAssetType}
                        options={assetTypeOptions}
                        dir={fa ? "rtl" : "ltr"}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 rounded-lg bg-ember py-3 font-display text-xs font-bold text-void uppercase tracking-wider hover:bg-ember-hi transition-colors cursor-pointer"
                    >
                      + {fa ? "پیوست مدرک به پرونده" : "Attach Asset to Dossier"}
                    </button>
                  </form>

                  {/* Right: Attached Assets List (7 cols) */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="mono text-[10px] text-mute uppercase tracking-wider mb-2">
                      {fa ? "مدارک پیوست‌شده به این پرونده:" : "ATTACHED DOSSIER ASSETS:"}
                    </div>

                    {activeProject.assets && activeProject.assets.length > 0 ? (
                      activeProject.assets.map((ast) => (
                        <div
                          key={ast.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-line/60 bg-void/60 hover:border-ember/40 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="mono text-[9px] px-2 py-0.5 rounded bg-smoke text-ember-hi border border-line">
                                {ast.type}
                              </span>
                              <span className="font-display text-sm font-bold text-bone">
                                {ast.title}
                              </span>
                            </div>
                            <div className="mono text-[10px] text-mute flex items-center gap-2">
                              <span>{ast.date}</span>
                              <span>·</span>
                              <span className="text-emerald-400">{ast.status}</span>
                            </div>
                          </div>

                          <a
                            href={ast.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mono text-xs inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-ash hover:border-ember hover:text-ember-hi transition-colors shrink-0"
                          >
                            <IconExternalLink className="size-3.5" />
                            <span>{fa ? "مشاهده لینک" : "Open Link"}</span>
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-line p-8 text-center text-xs text-mute">
                        {fa
                          ? "هنوز فایلی برای این پرونده بارگذاری نشده است. از فرم روبرو اولین سند را ثبت کنید."
                          : "No assets attached to this case yet. Use the form to submit files."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </main>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-void/85 backdrop-blur-md"
            onClick={() => setShowNewProjectModal(false)}
          />

          <div className="relative z-10 w-full max-w-xl rounded-2xl border border-line bg-coal p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-line pb-3">
              <div>
                <span className="mono text-[9px] uppercase tracking-widest text-ember-hi">
                  {fa ? "افتتاح پرونده جدید" : "NEW CASE COMMISSION"}
                </span>
                <h3 className="font-display text-xl font-bold text-bone mt-1">
                  {fa ? "سفارش پروژه جدید" : "Commission New Project"}
                </h3>
              </div>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="grid size-8 place-items-center rounded-full border border-line text-ash hover:text-bone hover:border-ember transition-colors"
              >
                <IconClose className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                  {fa ? "عنوان یا موضوع پروژه" : "Project Title"} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={fa ? "مثال: وب‌سایت استودیو معماری یا فروشگاه تعاملی" : "e.g. Architecture Studio Website"}
                  className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-mute focus:border-ember focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                    {fa ? "دسته‌بندی" : "Category"}
                  </label>
                  <CustomSelect
                    value={newCategory}
                    onChange={setNewCategory}
                    options={categoryOptions}
                    dir={fa ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                    {fa ? "زمان تحویل مدنظر" : "Target Deadline"}
                  </label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    placeholder={fa ? "مثال: ۳ هفته / مهر ۱۴۰۵" : "e.g. 3 Weeks"}
                    className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-xs text-bone placeholder:text-mute focus:border-ember focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mono block text-[10px] uppercase tracking-widest text-mute mb-1">
                  {fa ? "توضیحات و نیازمندی‌های پرونده" : "Case Description"}
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={fa ? "توضیحی کوتاه درباره خواسته‌ها، امکانات و سبک بصری..." : "Brief summary of expectations and requirements..."}
                  className="w-full rounded-lg border border-line bg-void/80 px-3.5 py-2.5 text-xs text-bone placeholder:text-mute focus:border-ember focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="mono rounded-full border border-line px-4 py-2 text-xs text-ash hover:text-bone"
                >
                  {fa ? "انصراف" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="mono rounded-full bg-ember px-6 py-2 text-xs font-bold text-void uppercase tracking-widest hover:bg-ember-hi transition-colors"
                >
                  {fa ? "ثبت نهایی و ایجاد پرونده" : "Create Case"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-20 mt-10 pt-5 border-t border-line/40 flex flex-wrap items-center justify-between gap-3 text-[10px] mono text-mute">
        <span>© {new Date().getFullYear()} MAHDYAR MONFARED — CLIENT PORTAL</span>
        <span>SECURITY LEVEL // 0042-RESTRICTED</span>
      </footer>
    </div>
  );
}

