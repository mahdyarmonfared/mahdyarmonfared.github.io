const t = (lang, b) => lang === "fa" ? b.fa : b.en;
const BRAND = { en: "Mahdyar Monfared", fa: "\u0645\u0647\u062F\u06CC\u0627\u0631 \u0645\u0646\u0641\u0631\u062F" };
const NAV = {
  home: { en: "Index", fa: "نمایه" },
  about: { en: "Dossier", fa: "پرونده" },
  skills: { en: "Arsenal", fa: "زرادخانه" },
  projects: { en: "Case Files", fa: "پرونده‌ها" },
  impact: { en: "Impact", fa: "تأثیر" },
  estimator: { en: "Estimator", fa: "برآورد" },
  testimonials: { en: "Witnesses", fa: "شاهدان" },
  experience: { en: "Timeline", fa: "گاه‌شمار" },
  contact: { en: "Wire", fa: "تماس" }
};
const SCENE_LABELS = [
  { en: "EVIDENCE ROOM", fa: "\u0627\u062A\u0627\u0642 \u0645\u062F\u0627\u0631\u06A9" },
  { en: "THE ARCHIVE", fa: "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC" },
  { en: "NIGHT DRIVE", fa: "\u0631\u0627\u0646\u0646\u062F\u06AF\u06CC \u0634\u0628\u0627\u0646\u0647" },
  { en: "THE LAST LIGHT", fa: "\u0622\u062E\u0631\u06CC\u0646 \u0646\u0648\u0631" }
];
const HERO = {
  kicker: {
    en: "FRONTEND DEVELOPER — WEB DESIGN — MASHHAD, IRAN",
    fa: "توسعه‌دهنده فرانت‌اند — طراحی سایت و رابط کاربری — مشهد، ایران"
  },
  line1: { en: "I BUILD", fa: "من می‌سازم" },
  line2: { en: "DARK", fa: "رابط‌هایی" },
  line3: { en: "INTERFACES", fa: "نوآر و فراتر از انتظار" },
  tail: {
    en: "…and distinctive web experiences that react when you touch them.",
    fa: "…و وب‌سایت‌های تعاملی و مدرنی که با هر لمس و نگاه کاربر، واکنشی زنده و هدفمند نشان می‌دهند."
  },
  cta: { en: "Open the files", fa: "بررسی پرونده‌ها و پروژه‌ها" },
  cta2: { en: "Talk to me", fa: "شروع گفتگو و همکاری" },
  scroll: { en: "scroll to descend", fa: "برای کاوش پرونده به پایین اسکرول کنید" }
};
const ABOUT = {
  title: { en: "PERSONNEL FILE", fa: "پروندهٔ شخصی" },
  code: "NO. 2009-MHD-∅",
  paragraphs: [
    {
      en: "Born in 2009. Operating from Mashhad, Iran. I design and build modern web interfaces the way some people write noir novels — sharp typography, tactile responsiveness, and an experience that commands attention.",
      fa: "متولد ۲۰۰۹ (۱۳۸۸)؛ مستقر در مشهد، ایران. وب‌سایت‌ها و رابط‌های کاربری را با روایتی نوآر و متمایز خلق می‌کنم: تایپوگرافی چشم‌نواز، واکنش‌های لمسی روان، و ساختاری که فراتر از قالب‌های کلیشه‌ای اثر می‌گذارد."
    },
    {
      en: "JavaScript and React are my daily drivers, fortified with Tailwind CSS, SCSS, Bootstrap, and thorough mastery of WordPress and its entire plugin ecosystem. I don't build pages that merely sit on the screen; I craft responsive digital surfaces designed to convert and engage.",
      fa: "تسلط بر JavaScript و React ابزارهای اصلی من هستند که با Tailwind CSS، SCSS، Bootstrap و احاطه کامل به وردپرس و اکوسیستم افزونه‌های آن پشتیبانی می‌شوند. وب‌سایت‌هایی می‌سازم که صرفاً بارگذاری نمی‌شوند، بلکه کاربر را جذب و درگیر خود می‌کنند."
    },
    {
      en: "Currently: shipping bespoke frontend solutions and web designs, while actively expanding into backend systems to bridge the gap into full-stack engineering. Available for ambitious freelance commissions and full-time roles.",
      fa: "در حال حاضر: طراحی و مهندسی وب‌سایت‌های سفارشی و رابط‌های کاربری مدرن، و در عین حال پیشروی پیوسته به سمت بک‌اند و معماری فول‌استک. آماده برای پروژه‌های فریلنسری خاص و موقعیت‌های همکاری تمام‌وقت."
    }
  ],
  facts: {
    born: { en: "Born", fa: "متولد" },
    base: { en: "Based in", fa: "موقعیت" },
    focus: { en: "Focus", fa: "تخصص محوری" },
    status: { en: "Status", fa: "وضعیت پذیرش" },
    statusOpen: { en: "OPEN — Freelance & Full-time", fa: "آماده همکاری — فریلنسری و تمام‌وقت" },
    focusVal: { en: "Web Design & Modern Frontend", fa: "طراحی سایت و توسعه فرانت‌اند مدرن" },
    baseVal: { en: "Mashhad, Iran", fa: "مشهد، ایران" },
    bornVal: { en: "2009 — Mashhad", fa: "۱۳۸۸ (2009) — مشهد" }
  }
};
const SKILLS_TITLE = { en: "THE ARSENAL", fa: "زرادخانه فنی" };
const SKILLS_NOTE = {
  en: "levels are honest, not decorative",
  fa: "درصدها ارزیابی واقعی مهارت‌ها هستند، نه اعداد تزئینی"
};
const SKILLS = [
  { name: "HTML5 & CSS3", level: 100, note: { en: "semantic structure & responsive layout", fa: "ساختار معنایی وب و طراحی کاملاً واکنش‌گرا" } },
  { name: "JavaScript (ES6+)", level: 100, note: { en: "core DOM, async logic & modern features", fa: "منطق جاوااسکریپت، تعاملات DOM و توابع ناهمگام" } },
  { name: "React", level: 100, note: { en: "component architecture, state & hooks", fa: "معماری کامپوننت، مدیریت State و هوک‌های مدرن" } },
  { name: "Tailwind CSS", level: 100, note: { en: "utility-first styling & custom design tokens", fa: "طراحی سریع و حرفه‌ای با توکن‌های اختصاصی" } },
  { name: "SCSS / Sass", level: 100, note: { en: "modular styling, mixins & BEM methodology", fa: "استایل‌نویسی ماژولار، متغیرها، میکسین‌ها و متدولوژی BEM" } },
  { name: "Bootstrap", level: 100, note: { en: "grid systems, flexbox & rapid prototyping", fa: "سیستم گرید واکنش‌گرا و توسعه سریع رابط کاربری" } },
  { name: "WordPress (Elementor, WooCommerce, RankMath)", level: 100, note: { en: "complete e-commerce, advanced page builder & SEO setup", fa: "راه‌اندازی کامل فروشگاه، المنتور پرو، سئو رنک‌مث و افزونه‌ها" } },
  { name: "AI & Prompt Engineering", level: 88, note: { en: "advanced workflows, LLMs & generative UI", fa: "تسلط بر مدل‌های هوش مصنوعی، پرامپت‌نویسی پیشرفته و ابزارهای AI" } },
  { name: "Back-End / Node.js", level: 10, note: { en: "foundation & active expansion into full-stack", fa: "در ابتدای مسیر یادگیری، ساخت سرور و ورود به دنیای فول‌استک" } }
];
const PROJECTS_TITLE = { en: "CASE FILES", fa: "\u067E\u0631\u0648\u0646\u062F\u0647\u200C\u0647\u0627" };
const PROJECTS_SUB = {
  en: "click a file to open the investigation",
  fa: "\u0631\u0648\u06CC \u0647\u0631 \u067E\u0631\u0648\u0646\u062F\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u062A\u0627 \u062A\u062D\u0642\u06CC\u0642 \u0628\u0627\u0632 \u0634\u0648\u062F"
};
const CASE_LABEL = { en: "CASE", fa: "\u067E\u0631\u0648\u0646\u062F\u0647" };
const OPEN_CASE = { en: "open case file", fa: "\u0628\u0627\u0632\u06A9\u0631\u062F\u0646 \u067E\u0631\u0648\u0646\u062F\u0647" };
const CLOSE_CASE = { en: "close file", fa: "\u0628\u0633\u062A\u0646 \u067E\u0631\u0648\u0646\u062F\u0647" };
const PROJECTS = [
  {
    id: "rockstar",
    name: { en: "Rockstar Games Clone", fa: "کلون وب‌سایت راک‌استار گیمز" },
    year: "2025",
    role: { en: "Frontend Developer & UI Architect", fa: "توسعه‌دهنده فرانت‌اند و معمار رابط کاربری" },
    status: "ACTIVE",
    tags: ["JavaScript", "HTML5/CSS3", "Mega Menu", "Audio FX", "Responsive"],
    summary: {
      en: "Cinematic, feature-complete recreation of the official Rockstar Games portal. Packed with video trailer showcases (GTA VI, RDR2, GTA Online), interactive mega menu, merchandise warehouse cart, deep search indexing, Vice City Neon theme toggle, and synchronized UI sound effects.",
      fa: "کلون سینمایی و تمام‌عیار وب‌سایت رسمی Rockstar Games؛ مجهز به پیش‌نمایش تریلر بازی‌ها (GTA VI، RDR2 و GTA Online)، مگا منوی پیشرفته، سبد خرید فروشگاه، موتور جستجوی هوشمند، حالت شبانه و تم نئون وایس‌سیتی و افکت‌های صوتی رابط کاربری."
    },
    clues: [
      { label: { en: "CLIENT / TYPE", fa: "نوع پروژه" }, value: { en: "Global Entertainment Platform Clone", fa: "کلون پورتال بین‌المللی گیمینگ" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "Vanilla JavaScript ES6+, HTML5, CSS3, Boxicons", fa: "جاوااسکریپت، HTML5، CSS3 و تعاملات DOM" } },
      { label: { en: "HIGHLIGHTS", fa: "ویژگی‌های شاخص" }, value: { en: "4K Trailers, Cart System, Audio FX, Theme Switcher", fa: "پخش تریلرها، سبد خرید، افکت صدا و تم اختصاصی" } },
      { label: { en: "RESPONSIVENESS", fa: "واکنش‌گرایی" }, value: { en: "100% Fluid on Mobile, Tablet & Desktop", fa: "سازگاری کامل با موبایل، تبلت و دسکتاپ" } }
    ],
    links: {
      live: "https://mahdyarmonfared.github.io/rockstar-games-clone/",
      github: "https://github.com/mahdyarmonfared/rockstar-games-clone"
    },
    accent: "ember"
  },
  {
    id: "niromotor",
    name: { en: "Niro Motor Industrial Clone", fa: "کلون پورتال صنعتی نیرو موتور" },
    year: "2025",
    role: { en: "Frontend & E-Commerce Developer", fa: "توسعه‌دهنده فرانت‌اند و رابط کاربری فروشگاهی" },
    status: "ACTIVE",
    tags: ["SCSS", "JavaScript", "IRANYekan", "Product Compare", "Dark Mode"],
    summary: {
      en: "Modern frontend engineering for the official portal of Niro Motor, Iran's largest motorcycle manufacturer. Features keyboard-driven quick search (Ctrl+K), multi-model technical comparison engine, live wishlist counter, instant Dark/Light mode switcher, categorized mega menu, and modular SCSS architecture.",
      fa: "توسعه فرانت‌اند پورتال رسمی گروه صنعتی نیرو موتور (بزرگترین تولیدکننده موتورسیکلت در ایران)؛ شامل جستجوی سریع با کلید میانبر Ctrl+K، سیستم مقایسه مشخصات فنی موتورسیکلت‌ها، لیست علاقه‌مندی‌ها با شمارنده زنده، تغییر تم تاریک/روشن، مگامنوی دسته‌بندی محصولات و استایل‌نویسی ماژولار SCSS."
    },
    clues: [
      { label: { en: "CLIENT / TYPE", fa: "نوع پروژه" }, value: { en: "Industrial Motorcycle Catalog & Portal", fa: "کاتالوگ و پورتال صنعت موتورسیکلت" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "SCSS, Vanilla JS, IRANYekan Font, Boxicons", fa: "SCSS پیشرفته، جاوااسکریپت، فونت ایران‌یکان" } },
      { label: { en: "KEY FEATURES", fa: "قابلیت‌های کلیدی" }, value: { en: "Ctrl+K Quick Search, Technical Spec Compare, Wishlist", fa: "جستجوی هوشمند، مقایسه فنی و لیست علاقه‌مندی" } },
      { label: { en: "THEME SYSTEM", fa: "سیستم تم" }, value: { en: "Seamless Dark / Light Mode with Local Storage", fa: "تغییر تم تاریک و روشن با ذخیره‌سازی وضعیت" } }
    ],
    links: {
      live: "https://mahdyarmonfared.github.io/niro-motor-clone",
      github: "https://github.com/mahdyarmonfared/niro-motor-clone"
    },
    accent: "blood"
  },
  {
    id: "boom",
    name: { en: "Boom Gaming Store", fa: "فروشگاه بازی و اشتراک دیجیتال بوم" },
    year: "2025",
    role: { en: "Sole Frontend Developer", fa: "طراح و توسعه‌دهنده فرانت‌اند" },
    status: "ACTIVE",
    tags: ["Vite", "Modern JS", "Gaming Store", "WebP Assets", "RTL"],
    summary: {
      en: "High-performance digital storefront and subscription platform for gamers. Built with component-based architecture, WebP image asset optimization pipeline, responsive genre/platform filtering, digital gift cards catalogue, and conversion-optimized dark gaming aesthetic.",
      fa: "طراحی و توسعه رابط کاربری سریع و مدرن فروشگاه بازی‌ها و اشتراک‌های دیجیتال (Boom Store)؛ مجهز به معماری کامپوننت‌محور، پایپ‌لاین فشرده‌سازی و بارگذاری سریع تصاویر WebP، فیلتر پیشرفته بر اساس دسته‌بندی و پلتفرم، ویترین گیفت‌کارت و طراحی دارک گیمینگ با تمرکز بر بالاترین نرخ تبدیل."
    },
    clues: [
      { label: { en: "CLIENT / TYPE", fa: "نوع پروژه" }, value: { en: "Gaming & Digital Subscription Store", fa: "فروشگاه تخصصی بازی و اشتراک‌های دیجیتال" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "Modern Frontend, WebP Optimization, Responsive CSS", fa: "فرانت‌اند مدرن، بهینه‌سازی WebP، استایل واکنش‌گرا" } },
      { label: { en: "KEY FOCUS", fa: "تمرکز فنی" }, value: { en: "Lightning-fast Page Loads, Seamless RTL Typography", fa: "سرعت بارگذاری فوق‌سریع و تایپوگرافی روان فارسی" } },
      { label: { en: "UI ARCHITECTURE", fa: "طراحی رابط" }, value: { en: "Cinematic Gaming Visuals & Product Filtering", fa: "کارت‌های گیمینگ سینمایی و فیلتر پیشرفته محصولات" } }
    ],
    links: {
      live: "https://mahdyarmonfared.github.io/boom",
      github: "https://github.com/mahdyarmonfared/boom"
    },
    accent: "ice"
  },
  {
    id: "upcoming",
    name: { en: "coming soon", fa: "به زودی" },
    year: "2026",
    role: { en: "Classified", fa: "طبقه‌بندی‌شده" },
    status: "SEALED",
    tags: ["coming soon"],
    tagMap: { en: "coming soon", fa: "به زودی" },
    summary: { en: "", fa: "" },
    clues: [],
    links: null,
    accent: "ember"
  }
];
const TIMELINE_TITLE = { en: "TIMELINE", fa: "\u06AF\u0627\u0647\u200C\u0634\u0645\u0627\u0631" };
const TIMELINE = [
  {
    period: { en: "2026 →", fa: "۲۰۲۶ ←" },
    title: { en: "Advancing to Back-End & Full-Stack", fa: "پیشروی به سمت بک‌اند و فول‌استک" },
    org: { en: "Architecture & Systems", fa: "توسعه زیرساخت و مهارت‌ها" },
    body: {
      en: "Expanding from frontend mastery into Node.js, databases, and backend workflows to engineer end-to-end full-stack web products.",
      fa: "گسترش تسلط فرانت‌اند به سمت Node.js، دیتابیس‌ها و جریان‌های بک‌اند با هدف مهندسی محصولات وب به صورت سرتاسری و فول‌استک."
    }
  },
  {
    period: "2025 — 2026",
    title: { en: "React, Modern Stack & WordPress", fa: "تسلط بر React، استک مدرن و وردپرس" },
    org: { en: "Frontend Engineering", fa: "مهندسی فرانت‌اند و طراحی وب" },
    body: {
      en: "Mastered React, JavaScript ES6+, Tailwind CSS, SCSS, and full WordPress ecosystems to build responsive, bespoke web applications.",
      fa: "تسلط عمیق بر React، جاوااسکریپت مدرن، Tailwind، SCSS و اکوسیستم کامل افزونه‌های وردپرس جهت خلق وب‌سایت‌های واکنش‌گرا و قدرتمند."
    }
  },
  {
    period: "2024 — 2025",
    title: { en: "First Code: HTML, CSS & Foundations", fa: "نخستین گام: الفبای وب با HTML و CSS" },
    org: { en: "Foundation & Responsive Web", fa: "پایه‌ریزی ساختار و ریسپانسیو" },
    body: {
      en: "The beginning of the journey. Mastered semantic HTML, CSS layouts, and Bootstrap to understand the anatomy of screens and user interfaces.",
      fa: "شروع مسیر کدنویسی؛ درک عمیق ساختار وب، تایپوگرافی، لی‌آوت‌های CSS و فریم‌ورک Bootstrap برای حیات‌بخشیدن به صفحات وب."
    }
  }
];
const CONTACT = {
  title: { en: "MAKE CONTACT", fa: "تماس بگیرید" },
  lead: {
    en: "Available for freelance commissions, full-time engineering roles, and bespoke web design projects.",
    fa: "آماده برای همکاری در پروژه‌های فریلنسری، موقعیت‌های تمام‌وقت و ایده‌های خلاقانه‌ای که نیازمند یک اجرای بی‌نقص وب هستند."
  },
  email: "mahdyar.monfared09@gmail.com",
  copy: { en: "copy to clipboard", fa: "کپی در حافظه" },
  copied: { en: "evidence secured", fa: "مدرک ذخیره شد" },
  send: { en: "send", fa: "ارسال" },
  form: {
    name: { en: "your name", fa: "نام شما" },
    msg: { en: "your message", fa: "پیام شما" },
    mailto: { en: "open in mail app", fa: "بازکردن در اپ ایمیل" }
  },
  thanks: { en: "transmission received", fa: "پیام دریافت شد" }
};
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mahdyarmonfared" },
  { label: "Telegram", href: "https://t.me/MahdyarMonfared" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mahdyarmonfared" }
];
const FOOTER = {
  big: { en: "END OF REEL", fa: "\u067E\u0627\u06CC\u0627\u0646 \u0646\u0648\u0627\u0631" },
  built: {
    en: "Built with React 19, Tailwind 4, GSAP, Lenis & Three.js \u2014 no template was harmed.",
    fa: "\u0633\u0627\u062E\u062A\u0647\u200C\u0634\u062F\u0647 \u0628\u0627 React 19\u060C Tailwind 4\u060C GSAP\u060C Lenis \u0648 Three.js \u2014 \u0628\u0647 \u0647\u06CC\u0686 \u0642\u0627\u0644\u0628\u06CC \u0622\u0633\u06CC\u0628 \u0646\u0631\u0633\u06CC\u062F."
  },
  tip: {
    en: "psst: the terminal knows secrets \u2014 try tilde (~)",
    fa: "\u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647: \u062A\u0631\u0645\u06CC\u0646\u0627\u0644 \u0631\u0627\u0632\u0647\u0627 \u0645\u06CC\u200C\u062F\u0627\u0646\u062F \u2014 \u06A9\u0644\u06CC\u062F ~ \u0631\u0627 \u0628\u0632\u0646"
  }
};
const TERM_BANNER = {
  en: "MONFARED OS v2.5 \u2014 restricted archive access granted. type `help`.",
  fa: "MONFARED OS \u0646\u0633\u062E\u0647\u0654 \u06F2\u066B\u06F5 \u2014 \u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u062D\u062F\u0648\u062F \u0628\u0647 \u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u062F\u0627\u062F\u0647 \u0634\u062F. \u062F\u0633\u062A\u0648\u0631 `help` \u0631\u0627 \u0628\u0632\u0646."
};
const NOT_FOUND = {
  kicker: {
    en: "EVIDENCE ARCHIVE // RECORD NOT FOUND",
    fa: "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u0627\u0633\u0646\u0627\u062F // \u0633\u0627\u0628\u0642\u0647\u200C\u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F"
  },
  title: {
    en: "CASE EXPUNGED",
    fa: "\u067E\u0631\u0648\u0646\u062F\u0647 \u0645\u0641\u0642\u0648\u062F \u0634\u062F\u0647"
  },
  code: "CASE #404-LOST",
  badge: {
    en: "EXPUNGED",
    fa: "\u0645\u0641\u0642\u0648\u062F"
  },
  summary: {
    en: "The archive is silent. The case file you are hunting for was either redacted by decree of the author, or never existed in this timeline.",
    fa: "\u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u062F\u0631 \u0633\u06A9\u0648\u062A \u0627\u0633\u062A. \u067E\u0631\u0648\u0646\u062F\u0647\u200C\u0627\u06CC \u06A9\u0647 \u062F\u0646\u0628\u0627\u0644 \u0622\u0646 \u0645\u06CC\u200C\u06AF\u0631\u062F\u06CC\u062F\u060C \u06CC\u0627 \u0628\u0627 \u062F\u0633\u062A\u0648\u0631 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0645\u0647\u0631\u0648\u0645\u0648\u0645 \u0634\u062F\u0647\u060C \u06CC\u0627 \u062F\u0631 \u0627\u06CC\u0646 \u062E\u0637 \u0632\u0645\u0627\u0646\u06CC \u0647\u0631\u06AF\u0632 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0634\u062A\u0647 \u0627\u0633\u062A."
  },
  clues: {
    url: { en: "PATH INTERROGATED", fa: "\u0622\u062F\u0631\u0633 \u0628\u0627\u0632\u062C\u0648\u06CC\u06CC\u200C\u0634\u062F\u0647" },
    status: { en: "INCIDENT STATUS", fa: "\u0648\u0636\u0639\u06CC\u062A \u062D\u0627\u062F\u062B\u0647" },
    statusVal: { en: "404_VOID // FILE_CORRUPTED", fa: "\u06F4\u06F0\u06F4_\u062E\u0644\u0623 // \u067E\u0631\u0648\u0646\u062F\u0647_\u0645\u0641\u0642\u0648\u062F" },
    time: { en: "LOGGED AT", fa: "\u0632\u0645\u0627\u0646 \u062B\u0628\u062A" }
  },
  actions: {
    back: { en: "Return to Crime Scene", fa: "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0635\u062D\u0646\u0647 \u067E\u0631\u0648\u0646\u062F\u0647" },
    terminal: { en: "Open Terminal", fa: "\u0628\u0627\u0632\u062C\u0648\u06CC\u06CC \u062F\u0631 \u062A\u0631\u0645\u06CC\u0646\u0627\u0644" },
    game: { en: "Play Ember Hunter", fa: "\u0634\u06A9\u0627\u0631 \u0630\u063A\u0627\u0644\u200C\u0647\u0627" }
  }
};
const AVAILABILITY = {
  status: { en: "AVAILABLE FOR WORK", fa: "آماده همکاری" },
  period: { en: "2026", fa: "۱۴۰۴ — ۱۴۰۵" },
  badge: { en: "FREELANCE & FULL-TIME", fa: "فریلنسری و تمام‌وقت" },
  detail: {
    en: "Open to bespoke web design, modern frontend development, and full-time engineering opportunities.",
    fa: "آماده پذیرش پروژه‌های طراحی سایت اختصاصی، توسعه فرانت‌اند و موقعیت‌های کاری تمام‌وقت."
  }
};

const TESTIMONIALS = {
  title: { en: "WITNESS TESTIMONIES", fa: "شهادت کارفرمایان و همکاران" },
  sub: {
    en: "sworn depositions and case reviews from past clients & collaborators",
    fa: "سوابق مستند، ارزیابی‌ها و اظهارات ثبت‌شده از کارفرمایان پروژه‌های پیشین"
  },
  seal: { en: "VERIFIED DOSSIER", fa: "پرونده تایید‌شده" },
  items: [
    {
      id: "witness-1",
      name: { en: "Alireza Kazemi", fa: "علیرضا کاظمی" },
      role: { en: "Founder & CEO, BOOM Store", fa: "هم‌بنیان‌گذار و مدیرعامل فروشگاه بوم" },
      caseId: "CASE #BOOM-2025",
      rating: 5,
      date: "2025-11",
      quote: {
        en: "Mahdyar has an obsessive eye for interface tactile weight. The RTL gift shop he engineered loads instantly, and the silky micro-interactions converted our first-time buyers into loyal regulars.",
        fa: "مهدیار وسواس فوق‌العاده‌ای روی وزن، سرعت و حس فیزیکی المان‌های رابط کاربری دارد. فروشگاه آنلاینی که مهندسی کرد در کسر ثانیه لود می‌شود و ریزتعامل‌های روان آن، رضایت کاربران ما را به حداکثر رساند."
      },
      tag: { en: "E-Commerce / RTL", fa: "فروشگاهی / RTL" }
    },
    {
      id: "witness-2",
      name: { en: "Sara Radmanesh", fa: "سارا رادمنش" },
      role: { en: "Product Lead, Business Club", fa: "مدیر محصول باشگاه کسب‌وکار و نوآوری" },
      caseId: "CASE #CLUB-2025",
      rating: 5,
      date: "2025-08",
      quote: {
        en: "It's rare to see a seventeen-year-old developer think so deeply about product architecture, state hygiene, and performance. His GSAP animations are mathematical poetry.",
        fa: "به‌ندرت می‌توان برنامه‌نویسی دید که با چنین سنی، این‌قدر عمیق و اصولی به معماری استیت، تایپ‌های دقیق و پرفورمنس فکر کند. ریتم و هارمونی انیمیشن‌های موشن او مثل یک شعر ریاضی بود."
      },
      tag: { en: "Web App / Platform", fa: "وب‌اپلیکیشن اختصاصی" }
    },
    {
      id: "witness-3",
      name: { en: "Behnam Farhadi", fa: "بهنام فرهادی" },
      role: { en: "Design Director, Diako Interactive", fa: "مدیر هنری استودیو دیاکو" },
      caseId: "CASE #EXP-2024",
      rating: 5,
      date: "2024-12",
      quote: {
        en: "Most engineers complain when designers ask for custom canvas effects or physics cursors. Mahdyar not only delivered what was in Figma — he made it bounce and breathe better than the prototype.",
        fa: "بسیاری از توسعه‌دهندگان در برابر افکت‌های تعاملی کانواس یا ریزه‌کاری‌های طراحی مقاومت می‌کنند؛ اما مهدیار طرح‌های فیگما را با سطحی بالاتر و حسی پویاتر از پروتوتایپ اولیه پیاده‌سازی کرد."
      },
      tag: { en: "Interaction Design", fa: "طراحی تعاملی" }
    },
    {
      id: "witness-4",
      name: { en: "Nima Sharifi", fa: "نیما شریفی" },
      role: { en: "Tech Lead, Incubator Labs", fa: "لید فنی آزمایشگاه‌های نوآوری" },
      caseId: "CASE #VOID-2026",
      rating: 5,
      date: "2026-02",
      quote: {
        en: "Rock-solid Next.js and Tailwind setup, 98+ Lighthouse scores across the board, and a noir visual identity that made our launch stand out on global tech feeds.",
        fa: "معماری فوق‌العاده پایدار Next.js و Tailwind، امتیاز لایت‌هاوس ۹۸+ و هویت بصری خاص نوآر باعث شد رونمایی محصول ما در فیدهای فناوری کاملاً شاخص و متمایز دیده شود."
      },
      tag: { en: "Design System & WebGL", fa: "دیزاین‌سیستم و WebGL" }
    }
  ]
};

const ESTIMATOR = {
  title: { en: "CASE ESTIMATOR & PRE-INVOICE", fa: "برآورد هوشمند پرونده و پیش‌فاکتور" },
  sub: {
    en: "configure scope, animation depth, and deadlines to compute an instant project estimate",
    fa: "نوع پرونده، عمق انیمیشن‌ها و فوریت تحویل را انتخاب کنید تا بودجه و زمان تخمین زده شود"
  },
  codePrefix: "#EST-2026-",
  scopes: [
    {
      id: "landing",
      title: { en: "Creative Landing Page", fa: "صفحه فرود خلاقانه و تعاملی" },
      desc: { en: "Cinematic storytelling, custom hero, high conversion", fa: "روایت سینمایی برند، هدر اختصاصی و بالاترین نرخ تبدیل" },
      baseToman: 18000000,
      baseUsd: 450,
      days: 12
    },
    {
      id: "webapp",
      title: { en: "Interactive Web App / Dashboard", fa: "وب‌اپلیکیشن یا پلتفرم کاربری" },
      desc: { en: "State management, API integration, client portal", fa: "مدیریت استیت پیچیده، اتصال به API و پنل اختصاصی" },
      baseToman: 42000000,
      baseUsd: 1050,
      days: 24
    },
    {
      id: "experience",
      title: { en: "3D & WebGL Canvas Experience", fa: "تجربه سه‌بعدی و نوآر (WebGL/Three.js)" },
      desc: { en: "Particle physics, shaders, award-winning polish", fa: "فیزیک ذرات، سایه‌زن‌های ریاضی و استانداردهای Awwwards" },
      baseToman: 58000000,
      baseUsd: 1450,
      days: 30
    },
    {
      id: "brandweb",
      title: { en: "Full Identity & Web Ecosystem", fa: "هویت برند دیجیتال + وب‌سایت جامع" },
      desc: { en: "End-to-end design system, custom motion, multi-surface", fa: "طراحی سیستم بصری، موشن‌های اختصاصی و توسعه کامل" },
      baseToman: 75000000,
      baseUsd: 1850,
      days: 40
    }
  ],
  motionLevels: [
    {
      id: "minimal",
      title: { en: "Minimal & Slick", fa: "مینیمال و برق‌آسا" },
      multiplier: 1.0,
      daysAdd: 0,
      desc: { en: "Fast CSS micro-interactions & sleek page transitions", fa: "ترنزیشن‌های سبک CSS و فیدهای تمیز بدون بار اضافه" }
    },
    {
      id: "dynamic",
      title: { en: "Dynamic GSAP Choreography", fa: "انیمیشن‌های ریتمیک GSAP" },
      multiplier: 1.25,
      daysAdd: 4,
      desc: { en: "Magnetic cursor, smooth scroll triggers, physics easing", fa: "مگنت ماوس، اسکرول‌تریگرهای نرم و زمان‌بندی دقیق المان‌ها" }
    },
    {
      id: "cinematic",
      title: { en: "Cinematic Canvas / WebGL", fa: "سینمایی، ذرات و کانواس تعاملی" },
      multiplier: 1.55,
      daysAdd: 9,
      desc: { en: "Volumetric smoke, fluid ripples, reactive soundscapes", fa: "دود حجمی، افکت‌های سیال تعاملی و هماهنگی با فرکانس صدا" }
    }
  ],
  urgencies: [
    {
      id: "standard",
      title: { en: "Standard Pace", fa: "روند استاندارد (پیشنهادی)" },
      multiplier: 1.0,
      daysMultiplier: 1.0,
      desc: { en: "Deep research, detailed wireframes & thorough testing", fa: "تحقیق عمیق، وایرفریم اختصاصی و تست‌های جامع" }
    },
    {
      id: "expedited",
      title: { en: "Expedited Sprint", fa: "سریع (کاهش زمان ۳۰٪)" },
      multiplier: 1.25,
      daysMultiplier: 0.7,
      desc: { en: "Priority timeline, daily check-ins & rapid milestone reviews", fa: "اولویت بالا در صف بررسی و جلسات بازبینی روزانه" }
    },
    {
      id: "emergency",
      title: { en: "Midnight Emergency (<10 Days)", fa: "اورژانسی شبانه (کمتر از ۱۰ روز)" },
      multiplier: 1.6,
      daysMultiplier: 0.45,
      desc: { en: "Dedicated full-throttle sprint for urgent launches", fa: "تمرکز شبانه‌روزی اختصاصی برای ددلاین‌های فوری و نمایشگاه‌ها" }
    }
  ],
  addOns: [
    {
      id: "bilingual",
      title: { en: "Bilingual (Persian RTL & English LTR)", fa: "دو زبانه کامل (فارسی راست‌چین و انگلیسی چپ‌چین)" },
      percent: 0.15,
      daysAdd: 3
    },
    {
      id: "admin",
      title: { en: "Custom Client Portal & Content CMS", fa: "داشبورد اختصاصی کارفرما یا سیستم مدیریت محتوا" },
      percent: 0.25,
      daysAdd: 6
    },
    {
      id: "seo",
      title: { en: "100% Core Web Vitals & SEO Polish", fa: "تضمین ۱۰۰٪ سئو، سرعت بارگذاری و Core Web Vitals" },
      percent: 0.15,
      daysAdd: 2
    },
    {
      id: "sound",
      title: { en: "Web Audio Noir Sound Design", fa: "طراحی صدای تعاملی بدون فایل با Web Audio API" },
      percent: 0.10,
      daysAdd: 2
    }
  ],
  labels: {
    step1: { en: "01. SCOPE OF INVESTIGATION", fa: "۰۱. موضوع و نوع پرونده" },
    step2: { en: "02. MOTION & INTERACTION FIDELITY", fa: "۰۲. عمق انیمیشن و تعامل" },
    step3: { en: "03. TIMELINE & URGENCY", fa: "۰۳. زمان‌بندی و فوریت تحویل" },
    step4: { en: "04. SPECIAL PROTOCOLS (ADD-ONS)", fa: "۰۴. پروتکل‌های جانبی" },
    summaryTitle: { en: "PRE-INVOICE DOSSIER", fa: "پیش‌فاکتور پرونده" },
    estCost: { en: "ESTIMATED INVESTMENT", fa: "برآورد سرمایه‌گذاری" },
    estTime: { en: "ESTIMATED TIMELINE", fa: "مدت زمان تخمینی" },
    days: { en: "Working Days", fa: "روز کاری" },
    dossierCode: { en: "DOSSIER CODE", fa: "کد پرونده" },
    sendTelegram: { en: "Dispatch to Detective (Telegram)", fa: "ارسال به تلگرام مهدیار" },
    copyEstimate: { en: "Copy Pre-Invoice to Clipboard", fa: "کپی مشخصات پیش‌فاکتور" },
    submitPortal: { en: "Queue in Client Portal", fa: "ثبت مستقیم در پنل کارفرما" },
    copied: { en: "COPIED TO CLIPBOARD", fa: "در کلیپ‌بورد کپی شد" }
  }
};

const LAB_DATA = {
  title: { en: "CREATIVE CODE LAB", fa: "آزمایشگاه کدهای خلاقانه" },
  sub: {
    en: "interactive physics canvases, shader simulations and mathematical motion",
    fa: "شبیه‌سازی فیزیک کانواس، سایه‌زن‌های محاسباتی و موشن‌های ریاضی در محیط نوآر"
  },
  experiments: [
    {
      id: "rain-glass",
      name: { en: "Rain on Noir Glass", fa: "باران روی شیشه تاریک" },
      badge: "Canvas 2D Physics",
      desc: {
        en: "Dynamic condensation drops sliding down with gravity, leaving trails and scattering on mouse proximity.",
        fa: "قطرات متراکم آب که تحت جاذبه به پایین سرازیر می‌شوند، رد به جا می‌گذارند و با تکان دادن ماوس پراکنده می‌شوند."
      },
      hint: { en: "Move cursor across the glass to displace raindrops", fa: "ماوس را روی شیشه حرکت دهید تا قطرات آب متلاشی شوند" }
    },
    {
      id: "gravity-nebula",
      name: { en: "Gravitational Ember Constellation", fa: "میدان ذرات مغناطیسی و کهربایی" },
      badge: "Particle Kinematics",
      desc: {
        en: "Interactive swarm of 220 glowing particles interconnected by distance-based proximity webs, reacting to cursor gravitational pull.",
        fa: "ازدحام ۲۲۰ ذره درخشان با تارهای عصبی بر اساس فاصله، که به گرانش ماوس با فیزیک الاستیک واکنش نشان می‌دهند."
      },
      hint: { en: "Hover to pull particles with gravitational spring damping", fa: "ماوس را بچرخانید تا ذرات با کشش گرانشی جذب شوند" }
    },
    {
      id: "elastic-type",
      name: { en: "Kinetic Jelly Typography", fa: "تایپوگرافی کشسان و واکنش‌گرا" },
      badge: "Matrix Displacement",
      desc: {
        en: "Vector glyphs sampled onto a soft elastic mesh that deforms under cursor velocity and snaps back with harmonic oscillation.",
        fa: "حروف وکتوری روی شبکه کشسان که بر اثر سرعت ماوس تاب برمی‌دارند و با نوسان هارمونیک به جای خود بازمی‌گردند."
      },
      hint: { en: "Slash mouse across the text to deform the letters", fa: "نشانگر ماوس را سریع از روی حروف عبور دهید" }
    },
    {
      id: "mercury-fluid",
      name: { en: "Liquid Mercury Viscous Ripple", fa: "سیال جیوه‌ای و موج‌های نوآر" },
      badge: "Metaball Viscosity",
      desc: {
        en: "Dense metallic fluid simulation producing reflective amber surface waves when clicked or dragged.",
        fa: "شبیه‌سازی فلز مذاب با کشش سطحی بالا که با کلیک و درگ، موج‌های غلیظ کهربایی بازتاب می‌دهد."
      },
      hint: { en: "Click or drag to create high-viscosity liquid ripples", fa: "کلیک و درگ کنید تا موج‌های جیوه‌ای تولید شوند" }
    }
  ]
};

const RESUME_DATA = {
  header: {
    title: { en: "MAHDYAR MONFARED", fa: "مهدیار منفرد" },
    subtitle: { en: "FRONTEND DEVELOPER & WEB DESIGNER", fa: "توسعه‌دهنده فرانت‌اند و طراح وب‌سایت" },
    docId: "DOSSIER #2009-MHD-CV",
    classification: { en: "OFFICIAL PERSONNEL RECORD // CONFIDENTIAL", fa: "پرونده رسمی اسناد هویتی و فنی" },
    base: { en: "Mashhad, Iran", fa: "مشهد، ایران" },
    contact: {
      email: "mahdyar.monfared09@gmail.com",
      telegram: "@MahdyarMonfared",
      github: "github.com/mahdyarmonfared"
    }
  },
  objective: {
    en: "Frontend Developer and Web Designer based in Mashhad, Iran. Passionate about building responsive, high-performance web experiences with React, JavaScript, Tailwind CSS, SCSS, and WordPress. Actively expanding into backend development to deliver comprehensive full-stack solutions.",
    fa: "توسعه‌دهنده فرانت‌اند و طراح وب‌سایت مستقر در مشهد، ایران. متخصص در ساخت وب‌سایت‌های واکنش‌گرا و بهینه با React، جاوااسکریپت، Tailwind CSS، SCSS و وردپرس. با اشتیاق در حال گسترش مهارت‌ها به سمت بک‌اند جهت ارائه راهکارهای جامع و فول‌استک."
  },
  sections: [
    {
      title: { en: "TECHNICAL ARSENAL", fa: "زرادخانه فنی و مهارت‌ها" },
      items: [
        { name: "Frontend Core (100%)", val: "React, JavaScript (ES6+), HTML5, CSS3, Responsive Architecture" },
        { name: "Styling & Frameworks (100%)", val: "Tailwind CSS, SCSS / Sass, Bootstrap, Flexbox & Grid Systems" },
        { name: "CMS & Platforms (100%)", val: "WordPress (Elementor, WooCommerce, RankMath, Theme Customization)" },
        { name: "AI & Modern Workflows", val: "Advanced Prompt Engineering, LLMs Integration, Generative UI Tools" },
        { name: "Backend & Systems", val: "Node.js (In early development & foundation 10%), Git, REST APIs, NPM" }
      ]
    },
    {
      title: { en: "NOTABLE CASE FILES (PROJECTS)", fa: "پرونده‌های شاخص (پروژه‌ها)" },
      items: [
        {
          name: "Rockstar Games Official Web Experience & Interactive Clone (2025)",
          role: "Frontend Architect & Developer",
          desc: "Engineered a high-fidelity cinematic clone of the official Rockstar Games portal with 4K video modals, interactive mega menu, merchandise cart, Vice City Neon theme, and Web Audio SFX."
        },
        {
          name: "Niro Motor — Industrial Motorcycle Portal Clone (2025)",
          role: "Frontend & E-Commerce Developer",
          desc: "Developed modern catalog architecture for Iran's largest motorcycle manufacturer with Ctrl+K smart search, technical model comparison engine, live wishlist, dark mode, and modular SCSS."
        },
        {
          name: "BOOM — Digital Gaming & Subscription Storefront (2025)",
          role: "Sole Frontend Developer",
          desc: "Designed and engineered a high-conversion digital gaming storefront with WebP asset optimization, responsive category filtering, and Persian RTL typography."
        }
      ]
    },
    {
      title: { en: "MILESTONES & EXPERIENCE", fa: "گاه‌شمار و سوابق تجربی" },
      items: [
        {
          name: "Advancing to Full-Stack & Systems (2026 →)",
          role: "Developer",
          desc: "Stepping into Node.js and backend engineering while delivering custom web design projects and high-performance frontend interfaces."
        },
        {
          name: "React, Modern Stack & WordPress Mastery (2025 — 2026)",
          role: "Frontend Engineer",
          desc: "Deep dive into React component lifecycles, JavaScript ES6+, Tailwind CSS, SCSS architecture, and comprehensive WordPress solutions."
        },
        {
          name: "Web Foundations & Structural Coding (2024 — 2025)",
          role: "Junior Web Developer",
          desc: "Mastered semantic HTML, advanced CSS, Bootstrap grids, and responsive layouts across varied screen dimensions."
        }
      ]
    },
    {
      title: { en: "WORK DOCTRINE & PRINCIPLES", fa: "دکترین کاری و اصول مهندسی" },
      items: [
        { name: "Speed & Impact", val: "Sub-second loading, clean rendering, and memorable interaction design." },
        { name: "Responsive Precision", val: "Pixel-perfect layouts across mobile, tablet, and ultra-wide displays." },
        { name: "Maintainable Architecture", val: "Modular component composition, DRY styling, and well-structured markup." }
      ]
    }
  ]
};

const STR = {
  langToggle: { en: "فا", fa: "EN" },
  themeToggle: { en: "☾", fa: "☾" },
  backToTop: { en: "back to the surface", fa: "بازگشت به سطح" },
  openGame: { en: "play the mini-game", fa: "مینی‌گیم را بازی کن" },
  close: { en: "close", fa: "بستن" },
  lightMode: { en: "LIGHT", fa: "روشن" },
  darkMode: { en: "DARK", fa: "تاریک" },
  easterEggFound: { en: "evidence uncovered", fa: "یک راز فاش شد" },
  soundOn: { en: "SFX: ON", fa: "صدا: روشن" },
  soundOff: { en: "SFX: OFF", fa: "صدا: خاموش" },
  quickCmds: { en: "QUICK COMMANDS", fa: "دستورات سریع" }
};

const BEFORE_AFTER = {
  title: { en: "THE REDESIGN IMPACT", fa: "تأثیر بازطراحی و مهندسی فرانت" },
  projectCase: { en: "CASE: ROCKSTAR GAMES WEB EXPERIENCE", fa: "پرونده عینی: پورتال راک‌استار گیمز" },
  sub: {
    en: "drag the slider to witness the difference between the legacy heavy portal and Mahdyar's bespoke Vice City Neon Dark Mode architecture",
    fa: "اسلایدر را بکشید تا تفاوت نسخه سنگین و رسمی راک‌استار را با بازطراحی اختصاصی، پرسرعت و مجهز به تم نئون وایس‌سیتی مهدیار ببینید"
  },
  beforeBadge: { en: "OFFICIAL STOCK PORTAL", fa: "پورتال رسمی راک‌استار (سنگین)" },
  afterBadge: { en: "MAHDYAR CRAFTED (VICE CITY NEON)", fa: "بازطراحی مهدیار (وایس‌سیتی نئون)" },
  beforeFeatures: [
    { en: "Bloated 15MB+ autoplay background video loads", fa: "حجم سنگین بالای ۱۵ مگابایت با لود خودکار ویدیوها" },
    { en: "Sluggish 5.2s LCP with render-blocking scripts", fa: "لود کند ۵.۲ ثانیه‌ای و مسدودکننده رندر اولیه" },
    { en: "No Vice City Neon aesthetic or custom themes", fa: "فقدان تم اختصاصی نئون وایس‌سیتی و دارک‌مود" },
    { en: "Static store catalog without interactive Web Audio", fa: "کاتالوگ ایستا و بدون افکت‌های صوتی تعاملی" }
  ],
  afterFeatures: [
    { en: "Bespoke Vice City Neon Cyberpunk Dark Mode", fa: "تم سایبرپانک نئون وایس‌سیتی با پالت اختصاصی" },
    { en: "Sub-second initial paint (680ms LCP)", fa: "لودینگ فوق‌سریع زیر ۶۸۰ میلی‌ثانیه" },
    { en: "4K Video trailer modals for GTA VI & RDR2", fa: "مدال پیش‌نمایش تریلرهای 4K بازی‌های GTA VI و RDR2" },
    { en: "Synchronized Web Audio SFX & interactive cart", fa: "افکت‌های صوتی وب‌آدیو و سبد خرید تعاملی انبار" }
  ],
  metrics: [
    {
      label: { en: "Largest Contentful Paint (LCP)", fa: "زمان لود محتوای اصلی (LCP)" },
      before: "5.2s",
      after: "680ms",
      diff: "-87%"
    },
    {
      label: { en: "Google PageSpeed Score", fa: "امتیاز عملکرد پیج‌اسپید" },
      before: "44 / 100",
      after: "99 / 100",
      diff: "+125%"
    },
    {
      label: { en: "Audio & Interaction Engine", fa: "موتور صدا و تعاملات صوتی" },
      before: "Silent / None",
      after: "Web Audio SFX",
      diff: "60 FPS"
    },
    {
      label: { en: "Theme Architecture", fa: "سیستم تم و هویت بصری" },
      before: "Fixed Commercial",
      after: "Vice City Neon",
      diff: "DYNAMIC"
    }
  ],
  quote: {
    en: "In world-class gaming platforms like Rockstar Games, bespoke frontend architecture and synchronized Web Audio turn a standard web page into a cinematic interactive adventure.",
    fa: "در پورتال‌های تراز اول گیمینگ مانند راک‌استار گیمز، معماری اختصاصی فرانت‌اند و افکت‌های صوتی وب‌آدیو، یک لندینگ‌پیج معمولی را به یک تجربه سینمایی و به‌یادماندنی تبدیل می‌کند."
  }
};

const WORK_PROTOCOL = {
  title: { en: "STATEMENT OF WORK & GUARANTEES", fa: "مرام‌نامه کاری و گارانتی تحویل" },
  code: "PROTOCOL #ENG-2026",
  seal: { en: "OFFICIAL GUARANTEE", fa: "تضمین رسمی مهندسی" },
  lead: {
    en: "Professional software development isn't just about code; it's about mutual trust, complete transparency, and guaranteed engineering standards.",
    fa: "توسعه حرفه‌ای وب صرفاً نوشتن کد نیست؛ تعهد به شفافیت کامل، امانت‌داری و تضمین بالاترین استاندارد مهندسی است."
  },
  pillars: [
    {
      num: "01",
      title: { en: "100% Full Source Code Ownership", fa: "مالکیت ۱۰۰٪ کامل سورس‌کد و دپلویمنت" },
      desc: {
        en: "You own every single line of code. Delivered cleanly via GitHub repo with modular components, zero obfuscation, and full deployment documentation.",
        fa: "تمام فایل‌ها و کدهای نوشته‌شده متعلق به شماست. پروژه بدون هیچ‌گونه قفل یا وابستگی پنهان، با ریپوی تمیز گیت‌هاب و راهنمای استقرار تحویل داده می‌شود."
      }
    },
    {
      num: "02",
      title: { en: "30-Day Free Warranty & Bug-Fixing", fa: "۳۰ روز گارانتی و رفع باگ رایگان" },
      desc: {
        en: "Post-launch peace of mind. Any edge-case bug, layout defect, or styling anomaly discovered within 30 days of release will be resolved rapidly at zero extra cost.",
        fa: "آرامش خاطر پس از تحویل نهایی؛ هرگونه باگ احتمالی یا ناهماهنگی در مرورگرها تا ۳۰ روز پس از لانچ، به صورت کاملاً رایگان و فوری برطرف خواهد شد."
      }
    },
    {
      num: "03",
      title: { en: "Milestone-Based Escrow Structure", fa: "تسویه‌حساب امن و مبتنی بر مایل‌استون" },
      desc: {
        en: "Payments are aligned with tangible deliverables: 30% project kickoff, 40% interactive frontend approval on staging, and 30% upon final production deployment.",
        fa: "پرداخت‌ها کاملاً مرحله‌ای و شفاف است: ۳۰٪ پیش‌پرداخت آغاز کار، ۴۰٪ پس از تایید فرانت‌اند و لینک پیش‌نمایش، و ۳۰٪ باقیمانده پس از تحویل نهایی و استقرار."
      }
    },
    {
      num: "04",
      title: { en: "Speed & Responsiveness Standard", fa: "استاندارد سرعت و واکنش‌گرایی در تمام صفحات" },
      desc: {
        en: "Guaranteed Core Web Vitals performance: sub-second initial paint, silky 60fps animations, full RTL compatibility, and pixel-perfect rendering across mobile, tablet, and desktop.",
        fa: "تضمین سرعت و استانداردهای گوگل (Core Web Vitals)؛ لود زیر یک ثانیه، انیمیشن‌های روان ۶۰ فریم، پشتیبانی کامل راست‌چین و نمایش بی‌نقص در تمامی موبایل‌ها و تبلت‌ها."
      }
    }
  ]
};

const AUDIT_SCANNER = {
  title: { en: "WEBSITE SPEED & REVENUE AUDIT", fa: "آنالیزور سرعت و تخمین افت فروش سایت" },
  sub: {
    en: "Simulate how your current website speed impacts visitor retention and conversions",
    fa: "محاسبه و شبیه‌سازی تاخیر سایت فعلی و اثر آن روی ریزش مشتریان"
  },
  placeholder: { en: "e.g. yourbusiness.com", fa: "مثال: yoursite.com یا yourbrand.ir" },
  cta: { en: "INITIATE SCAN", fa: "آغاز اسکن و آنالیز" },
  scanning: { en: "SCANNING RADAR FREQUENCIES…", fa: "در حال پایش راداری و اسکن سرور…" }
};

const BOOKING_DATA = {
  title: { en: "SCHEDULE A 15-MIN WIRE CALL", fa: "رزرو جلسه آنلاین و گفتگوی ۱۵ دقیقه‌ای" },
  sub: {
    en: "Select a convenient time for a concise video or audio chat to discuss your web vision.",
    fa: "برای بررسی ایده، جزئیات طراحی یا برآورد فرانت‌اند پروژه، زمان دلخواه خود را رزرو کنید."
  },
  topics: [
    { id: "new-site", en: "New Custom Website Design", fa: "طراحی و توسعه وب‌سایت اختصاصی جدید" },
    { id: "frontend", en: "Creative Frontend & Interactions", fa: "پیاده‌سازی فرانت‌اند و انیمیشن‌های تعاملی" },
    { id: "audit", en: "Speed Audit & Performance Revamp", fa: "بهینه‌سازی سرعت و بازطراحی سایت فعلی" },
    { id: "hire", en: "Full-Time / Contract Collaboration", fa: "همکاری شغلی، پروژه‌ای یا تمام‌وقت" }
  ],
  platforms: [
    { id: "meet", en: "Google Meet", fa: "گوگل میت (Google Meet)" },
    { id: "telegram", en: "Telegram Voice / Video", fa: "تماس تلگرام (Telegram)" }
  ]
};

const DIRECTORS_CUT = {
  title: { en: "DIRECTOR'S HUD", fa: "پنل معمار و کارگردان" },
  sub: { en: "REAL-TIME PALETTE & MOTION ENGINE", fa: "کنترلر زنده پالت رنگی و سرعت انیمیشن" },
  themes: [
    { id: "ember", name: { en: "Noir Ember (Default)", fa: "کهربایی نوآر (پیش‌فرض)" }, ember: "#e8a33d", hi: "#ffd9a0", deep: "#7c4f16", dot: "bg-[#e8a33d]" },
    { id: "neon", name: { en: "Miami Vice (Neon)", fa: "میامی نئون (وایس‌سیتی)" }, ember: "#ff2a85", hi: "#00f0ff", deep: "#a00055", dot: "bg-[#ff2a85]" },
    { id: "matrix", name: { en: "Emerald Matrix", fa: "ماتریکس زمردی" }, ember: "#10b981", hi: "#6ee7b7", deep: "#047857", dot: "bg-[#10b981]" },
    { id: "blood", name: { en: "Crimson Blood", fa: "یاقوتی و زرشکی" }, ember: "#ef4444", hi: "#fca5a5", deep: "#991b1b", dot: "bg-[#ef4444]" }
  ],
  tempos: [
    { id: "cine", val: 0.6, label: { en: "Cinematic 0.6x", fa: "سینمایی ۰.۶x" } },
    { id: "std", val: 1.0, label: { en: "Standard 1.0x", fa: "استاندارد ۱.۰x" } },
    { id: "turbo", val: 1.6, label: { en: "Turbo 1.6x", fa: "توربو ۱.۶x" } }
  ]
};

const SKETCHPAD_DATA = {
  title: { en: "IDEA NAPKIN // WIREFRAME SKETCHPAD", fa: "بوم ایده‌پردازی و وایرفریم سریع" },
  sub: {
    en: "Draw your layout idea, scribble wireframes, and attach the sketch to your project inquiry.",
    fa: "ایده، ساختار صفحات یا شماتیک ذهنی‌تان را ترسیم کنید و مستقیم به استعلام قیمت ضمیمه نمایید."
  },
  colors: [
    { id: "ember", val: "#e8a33d", label: "Ember" },
    { id: "white", val: "#ffffff", label: "Chalk" },
    { id: "cyan", val: "#38bdf8", label: "Cyan" },
    { id: "pink", val: "#f43f5e", label: "Pink" }
  ],
  tools: {
    pen: { en: "Pen", fa: "قلم" },
    eraser: { en: "Eraser", fa: "پاک‌کن" },
    clear: { en: "Clear All", fa: "پاک‌سازی بوم" },
    undo: { en: "Undo", fa: "بازگشت (Undo)" },
    save: { en: "Save & Attach to Inquiry", fa: "ذخیره و ضمیمه به استعلام" }
  }
};
export {
  ABOUT,
  AUDIT_SCANNER,
  AVAILABILITY,
  BEFORE_AFTER,
  BOOKING_DATA,
  BRAND,
  CASE_LABEL,
  CLOSE_CASE,
  CONTACT,
  DIRECTORS_CUT,
  ESTIMATOR,
  FOOTER,
  HERO,
  LAB_DATA,
  NAV,
  NOT_FOUND,
  OPEN_CASE,
  PROJECTS,
  PROJECTS_SUB,
  PROJECTS_TITLE,
  RESUME_DATA,
  SCENE_LABELS,
  SKETCHPAD_DATA,
  SKILLS,
  SKILLS_NOTE,
  SKILLS_TITLE,
  SOCIALS,
  STR,
  TERM_BANNER,
  TESTIMONIALS,
  TIMELINE,
  TIMELINE_TITLE,
  WORK_PROTOCOL,
  t
};

