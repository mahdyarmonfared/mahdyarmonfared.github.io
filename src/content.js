const t = (lang, b) => lang === "fa" ? b.fa : b.en;
const BRAND = { en: "Mahdyar Monfared", fa: "\u0645\u0647\u062F\u06CC\u0627\u0631 \u0645\u0646\u0641\u0631\u062F" };
const NAV = {
  home: { en: "Home", fa: "خانه" },
  about: { en: "About", fa: "درباره من" },
  skills: { en: "Skills", fa: "مهارت‌ها" },
  projects: { en: "Projects", fa: "نمونه‌کارها" },
  impact: { en: "Before / After", fa: "قبل و بعد" },
  estimator: { en: "Estimator", fa: "برآورد هزینه" },
  testimonials: { en: "Reviews", fa: "نظرات" },
  experience: { en: "Timeline", fa: "سوابق" },
  contact: { en: "Contact", fa: "تماس" }
};
const SCENE_LABELS = [
  { en: "EVIDENCE ROOM", fa: "اتاق مدارک" },
  { en: "THE ARCHIVE", fa: "بایگانی" },
  { en: "NIGHT DRIVE", fa: "رانندگی شبانه" },
  { en: "THE LAST LIGHT", fa: "آخرین نور" }
];
const HERO = {
  kicker: {
    en: "FRONTEND DEVELOPER & WEB DESIGNER — MASHHAD, IRAN",
    fa: "توسعه‌دهنده فرانت‌اند و طراح وب‌سایت — مشهد، ایران"
  },
  line1: { en: "I BUILD", fa: "من می‌سازم" },
  line2: { en: "DISTINCTIVE", fa: "رابط‌هایی" },
  line3: { en: "INTERFACES", fa: "مدرن و تعاملی" },
  tail: {
    en: "Specializing in React, high-performance web applications, and intuitive digital experiences that react when you touch them.",
    fa: "طراحی و مهندسی وب‌سایت‌های واکنش‌گرا و وب‌اپلیکیشن‌های سریع با React، استانداردهای روز و کارایی حداکثری."
  },
  cta: { en: "Explore Projects", fa: "مشاهده نمونه‌کارها" },
  cta2: { en: "Get in Touch", fa: "ارتباط و همکاری" },
  scroll: { en: "scroll to explore", fa: "برای کاوش بخش‌ها به پایین اسکرول کنید" }
};
const ABOUT = {
  title: { en: "ABOUT ME", fa: "درباره من" },
  code: "NO. 2009-MHD-∅",
  paragraphs: [
    {
      en: "Born in 2009. Operating from Mashhad, Iran. I design and build modern web interfaces the way some people write noir novels — sharp typography, tactile responsiveness, and an experience that commands attention.",
      fa: "متولد 2009؛ مستقر در مشهد، ایران. وب‌سایت‌ها و رابط‌های کاربری را با روایتی نوآر و متمایز خلق می‌کنم: تایپوگرافی چشم‌نواز، واکنش‌های لمسی روان، و ساختاری که فراتر از قالب‌های کلیشه‌ای اثر می‌گذارد."
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
    bornVal: { en: "2009 — Mashhad", fa: "2009 — مشهد" }
  }
};
const SKILLS_TITLE = { en: "TECHNICAL SKILLS", fa: "مهارت‌های فنی" };
const SKILLS_NOTE = {
  en: "core competencies & technical mastery levels",
  fa: "ارزیابی واقعی سطح تسلط و توانمندی‌های محوری"
};
const SKILLS = [
  { name: "Front-End Development", level: 100, note: { en: "responsive architecture, performance & modern UI", fa: "معماری واکنش‌گرا، پرفورمنس بالا و استانداردهای مدرن وب" } },
  { name: "React.js", level: 100, note: { en: "component architecture, state management & hooks", fa: "معماری کامپوننت، مدیریت استیت و هوک‌های مدرن" } },
  { name: "JavaScript", level: 100, note: { en: "modern ES6+, async logic, APIs & DOM mastery", fa: "جاوااسکریپت مدرن، منطق ناهمگام، API و تعاملات DOM" } },
  { name: "HTML", level: 100, note: { en: "semantic structure, accessible elements & SEO hygiene", fa: "ساختار معنایی، دسترسی‌پذیری و استانداردهای وب" } },
  { name: "Cascading Style Sheets (CSS)", level: 100, note: { en: "advanced layouts, flexbox, CSS grid & keyframe animations", fa: "لی‌آوت‌های پیشرفته، فلکس‌باکس، گرید و انیمیشن‌های CSS" } },
  { name: "Tailwind CSS", level: 100, note: { en: "utility-first styling, design token systems & responsive design", fa: "طراحی ماژولار با توکن‌های اختصاصی و ریسپانسیو روان" } },
  { name: "SASS", level: 100, note: { en: "modular styling, mixins, nesting & BEM methodology", fa: "استایل‌نویسی ساختاریافته، میکسین‌ها و متدولوژی BEM" } },
  { name: "Bootstrap (Framework)", level: 100, note: { en: "responsive grid systems, flexbox & rapid prototyping", fa: "سیستم گرید واکنش‌گرا و پیاده‌سازی سریع رابط کاربری" } },
  { name: "Git", level: 100, note: { en: "version control, branching strategies & clean commit hygiene", fa: "کنترل نسخه، استراتژی‌های برنچینگ و تاریخچه منظم" } },
  { name: "GitHub", level: 100, note: { en: "CI/CD actions, collaboration, PR reviews & open source", fa: "اکشن‌های CI/CD، مدیریت مخازن، پول‌ریکوئست و متن‌باز" } },
  { name: "Artificial Intelligence (AI)", level: 100, note: { en: "AI-assisted engineering, modern tooling & smart integrations", fa: "توسعه هوشمند با ابزارهای نوین AI و بهینه‌سازی کُد" } },
  { name: "WordPress", level: 100, note: { en: "complete e-commerce, Elementor, WooCommerce & RankMath", fa: "راه‌اندازی کامل فروشگاه، المنتور پرو، ووکامرس و سئو" } },
  { name: "AI & Prompt Engineering", level: 88, note: { en: "advanced LLM workflows, structured outputs & prompt design", fa: "پرامپت‌نویسی پیشرفته، خروجی‌های ساختاریافته و مدل‌های زبانی" } },
  { name: "Back-End / Node.js", level: 10, note: { en: "backend foundations, REST APIs & expansion to full-stack", fa: "آشنایی با مبانی سرور، Express، API و ورود به فول‌استک" } }
];
const PROJECTS_TITLE = { en: "PORTFOLIO & PROJECTS", fa: "نمونه‌کارها و پروژه‌ها" };
const PROJECTS_SUB = {
  en: "curated live web applications & open-source engineering",
  fa: "مجموعه وب‌سایت‌های فعال، پلتفرم‌ها و ابزارهای متن‌باز گیت‌هاب"
};
const PROJECTS_CATEGORIES = {
  all: { en: "All Projects", fa: "همه پروژه‌ها" },
  website: { en: "Live Websites & Web Apps", fa: "وب‌سایت‌ها و پلتفرم‌های زنده" },
  opensource: { en: "Open Source & GitHub Tools", fa: "ابزارهای متن‌باز و گیت‌هاب" }
};
const CASE_LABEL = { en: "CASE", fa: "پرونده" };
const OPEN_CASE = { en: "inspect project", fa: "مشاهده جزئیات" };
const CLOSE_CASE = { en: "close file", fa: "بستن پرونده" };
const PROJECTS = [
  {
    id: "rockstar",
    category: "website",
    name: { en: "Rockstar Games Clone", fa: "کلون وب‌سایت راک‌استار گیمز" },
    year: "2025",
    role: { en: "Frontend Developer & UI Architect", fa: "توسعه‌دهنده فرانت‌اند و معمار رابط کاربری" },
    status: "ACTIVE",
    tags: ["JavaScript ES6+", "HTML5/CSS3", "Mega Menu", "Audio FX", "Responsive"],
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
    category: "website",
    name: { en: "Niro Motor Industrial Clone", fa: "کلون پورتال صنعتی نیرو موتور" },
    year: "2025",
    role: { en: "Frontend & E-Commerce Developer", fa: "توسعه‌دهنده فرانت‌اند و رابط کاربری فروشگاهی" },
    status: "ACTIVE",
    tags: ["SCSS", "JavaScript", "Product Compare", "Quick Search", "Dark Mode"],
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
    category: "website",
    name: { en: "Boom Gaming Store", fa: "فروشگاه بازی و اشتراک دیجیتال بوم" },
    year: "2025",
    role: { en: "Sole Frontend Developer", fa: "طراح و توسعه‌دهنده فرانت‌اند" },
    status: "ACTIVE",
    tags: ["React 19", "Tailwind v4", "Instant Routing", "WebP Assets", "RTL"],
    summary: {
      en: "Modern, ultra-fast Iranian E-Commerce SPA built with React 19 and Tailwind CSS v4. Features component-based architecture, WebP image asset optimization pipeline, responsive genre/platform filtering, digital gift cards catalogue, and conversion-optimized dark gaming aesthetic.",
      fa: "طراحی و توسعه رابط کاربری سریع و مدرن فروشگاه بازی‌ها و اشتراک‌های دیجیتال (Boom Store) با React 19 و Tailwind CSS v4؛ مجهز به معماری کامپوننت‌محور، لودینگ سریع تصاویر WebP، فیلتر پیشرفته محصولات و استایل دارک گیمینگ."
    },
    clues: [
      { label: { en: "CLIENT / TYPE", fa: "نوع پروژه" }, value: { en: "Gaming & Digital Subscription Store", fa: "فروشگاه تخصصی بازی و اشتراک‌های دیجیتال" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "React 19, Tailwind CSS v4, Modern JS, WebP", fa: "ری‌اکت ۱۹، تیل‌ویند نسخه‌ ۴، وب‌پک و بهینه‌سازی WebP" } },
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
    id: "holguard",
    category: "opensource",
    name: { en: "Hol-Guard (AI Agent Antivirus)", fa: "سامانه امنیتی و آنتی‌ویروس عامل‌های هوش مصنوعی" },
    year: "2026",
    role: { en: "Open Source Creator & Maintainer", fa: "توسعه‌دهنده اصلی و طراح ابزار" },
    status: "ACTIVE",
    tags: ["AI Security", "Runtime Guard", "MCP Server", "Agent Safety"],
    summary: {
      en: "Open-source runtime antivirus and security guard for autonomous AI agents. Dynamically intercepts and blocks risky tools, unauthorized secret access, prompt injections, and malicious packages during runtime execution.",
      fa: "آنتی‌ویروس و گارد امنیتی زمان اجرای متن‌باز برای عامل‌های خودمختار AI؛ رهگیری و مسدودسازی آنی ابزارهای پرخطر، دسترسی غیرمجاز به کلیدهای محرمانه و حملات تزریق پرامپت (Prompt Injection) در حین اجرای مدل‌ها."
    },
    clues: [
      { label: { en: "TYPE", fa: "نوع پروژه" }, value: { en: "AI Systems Security & Agent Runtime Protection", fa: "امنیت سیستم‌های هوش مصنوعی و محافظت از عامل‌ها" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "Node.js, AST Validation, Tool Sandboxing", fa: "جاوااسکریپت، تحلیل نحوی AST و ایزولاسیون ابزارها" } },
      { label: { en: "PROTECTION", fa: "سطح محافظت" }, value: { en: "Prompt Injection & Secret Leak Prevention", fa: "جلوگیری از نشت متغیرهای محیطی و حملات تزریق پرامپت" } }
    ],
    links: {
      live: "https://hol.org/guard",
      github: "https://github.com/mahdyarmonfared/hol-guard"
    },
    accent: "ember"
  },
  {
    id: "quickshare",
    category: "opensource",
    name: { en: "QuickShare-QR", fa: "اشتراک‌گذاری سریع فایل در شبکه محلی با QR" },
    year: "2025",
    role: { en: "Creator & Systems Developer", fa: "توسعه‌دهنده ابزار" },
    status: "ACTIVE",
    tags: ["CLI Tool", "Node.js", "QR Code", "Local Wi-Fi", "Web UI"],
    summary: {
      en: "Instant, zero-config local Wi-Fi file sharing tool from terminal to mobile phone. Generates an interactive in-terminal QR code and serves a lightweight web interface for effortless local file transfers with zero internet or cloud dependencies.",
      fa: "ابزار سبک و سریع اشتراک‌گذاری فایل میان رایانه و گوشی در شبکه Wi-Fi محلی؛ تولید خودکار کد QR در محیط ترمینال و میزبانی وب‌سرور داخلی سبک، بدون نیاز به اینترنت و سرورهای واسط ابری."
    },
    clues: [
      { label: { en: "TYPE", fa: "نوع پروژه" }, value: { en: "Terminal CLI Utility & Local Network Sharing", fa: "ابزار خط فرمان ترمینال و شبکه محلی" } },
      { label: { en: "CORE STACK", fa: "استک فنی" }, value: { en: "Node.js, Terminal-QR Engine, HTTP Stream", fa: "Node.js، موتور گرافیکی QR در خط فرمان، استریم HTTP" } },
      { label: { en: "PRIVACY", fa: "حفظ حریم خصوصی" }, value: { en: "100% Local Peer-to-Peer without External Uplink", fa: "انتقال ۱۰۰٪ محلی بدون خروج حتی یک بایت داده به اینترنت" } }
    ],
    links: {
      live: null,
      github: "https://github.com/mahdyarmonfared/quickshare-qr"
    },
    accent: "ice"
  },
  {
    id: "cleandrop",
    category: "opensource",
    name: { en: "CleanDrop CLI", fa: "ابزار خودکارسازی پاکسازی و مرتب‌سازی فایل‌ها" },
    year: "2025",
    role: { en: "CLI Author & Architect", fa: "توسعه‌دهنده ابزار خط فرمان" },
    status: "ACTIVE",
    tags: ["CLI Tool", "Automation", "File System", "Dry-Run", "Undo Stack"],
    summary: {
      en: "Smart, safe, and lightning-fast downloads & desktop auto-organizer CLI. Features automated extension sorting, simulated dry-run previews, and instant multi-step undo history to ensure zero accidental file loss.",
      fa: "ابزار خط فرمان هوشمند برای مرتب‌سازی آنی پوشه دانلودها و دسکتاپ بر اساس نوع و فرمت فایل‌ها؛ مجهز به حالت شبیه‌سازی (Dry-run) و قابلیت بازگردانی تغییرات (Undo) جهت تضمین ۱۰۰٪ امنیت فایل‌های کاربر."
    },
    clues: [
      { label: { en: "TYPE", fa: "نوع پروژه" }, value: { en: "Operating System Automation CLI", fa: "اتوماسیون سیستم‌عامل و خط فرمان" } },
      { label: { en: "SAFETY", fa: "امنیت" }, value: { en: "Full Dry-Run Previews & Action Reversibility", fa: "پیش‌نمایش تغییرات و امکان بازگردانی کامل به حالت اولیه" } },
      { label: { en: "EFFICIENCY", fa: "سرعت" }, value: { en: "Batch sorts thousands of files in milliseconds", fa: "تفکیک و دسته‌بندی هزاران فایل در کسری از ثانیه" } }
    ],
    links: {
      live: null,
      github: "https://github.com/mahdyarmonfared/cleandrop"
    },
    accent: "blood"
  },
  {
    id: "secretscrub",
    category: "opensource",
    name: { en: "Secret-Scrub", fa: "اسکنر پیشرفته شناسایی کلیدهای محرمانه گیت" },
    year: "2026",
    role: { en: "DevSecOps & Tool Developer", fa: "توسعه‌دهنده ابزار امنیتی" },
    status: "ACTIVE",
    tags: ["Git Hook", "Security", "Shannon Entropy", "Credentials"],
    summary: {
      en: "Ultra-fast, zero-leak pre-commit secret scanner powered by Shannon entropy analysis and multi-provider credential pattern detection. Prevents AWS tokens, Stripe keys, and private credentials from ever entering git commits.",
      fa: "اسکنر سبک و فوق‌سریع Pre-commit بر پایه محاسبه آنتروپی شانون (Shannon Entropy) جهت جلوگیری از کامیت تصادفی کلیدهای خصوصی، توکن‌های دسترسی AWS، Stripe و رمزهای عبور در مخازن کد."
    },
    clues: [
      { label: { en: "TYPE", fa: "نوع پروژه" }, value: { en: "DevSecOps Pre-Commit Security Engine", fa: "موتور امنیت کد و پیش‌کامیت DevSecOps" } },
      { label: { en: "DETECTION", fa: "شناسایی" }, value: { en: "Shannon Entropy Analysis + Known Secret Regex", fa: "تحلیل ریاضی پراکندگی داده و الگوهای کلیدهای حساس" } },
      { label: { en: "LATENCY", fa: "تاخیر اجرا" }, value: { en: "Runs in less than 35ms per commit", fa: "اجرای نامحسوس در کمتر از ۳۵ میلی‌ثانیه" } }
    ],
    links: {
      live: null,
      github: "https://github.com/mahdyarmonfared/secret-scrub"
    },
    accent: "ember"
  },
  {
    id: "hashdup",
    category: "opensource",
    name: { en: "HashDup CLI", fa: "جستجوگر سریع فایل‌های تکراری با SHA-256" },
    year: "2025",
    role: { en: "Systems & CLI Engineer", fa: "توسعه‌دهنده ابزار خط فرمان" },
    status: "ACTIVE",
    tags: ["CLI Tool", "SHA-256", "Stream Hashing", "Zero-Byte"],
    summary: {
      en: "High-performance, memory-efficient duplicate and zero-byte file finder powered by chunked SHA-256 stream hashing. Rapidly scans deep directory trees without RAM spikes.",
      fa: "ابزار خط فرمان با کارایی بالا برای کشف فایل‌های تکراری و فایل‌های با حجم صفر در دایرکتوری‌های حجیم؛ با استفاده از هشینگ جریانی قطعه‌بندی‌شده SHA-256 بدون افزایش مصرف رم."
    },
    clues: [
      { label: { en: "TYPE", fa: "نوع پروژه" }, value: { en: "Disk Space Optimization & Duplicate Finder", fa: "بهینه‌سازی فضای دیسک و یافتن فایل‌های مشابه" } },
      { label: { en: "ALGORITHM", fa: "الگوریتم" }, value: { en: "Chunked Stream SHA-256 Verification", fa: "اعتبارسنجی قطعه‌به‌قطعه با رمزنگاری SHA-256" } },
      { label: { en: "SAFETY", fa: "امنیت" }, value: { en: "Non-destructive reporting with selective cleanup", fa: "گزارش‌دهی امن بدون حذف خودکار مگر با تایید کاربر" } }
    ],
    links: {
      live: null,
      github: "https://github.com/mahdyarmonfared/hashdup-cli"
    },
    accent: "ice"
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mahdyarmonfared" },
  { label: "Telegram", href: "https://t.me/MahdyarMonfared" }
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
    classification: { en: "OFFICIAL PERSONNEL RECORD // RESUME", fa: "پرونده رسمی رزومه و مهارت‌های فنی" },
    base: { en: "Mashhad, Iran", fa: "مشهد، ایران" },
    contact: {
      email: "mahdyar.monfared09@gmail.com",
      linkedin: "linkedin.com/in/mahdyarmonfared",
      github: "github.com/mahdyarmonfared",
      telegram: "@MahdyarMonfared"
    }
  },
  objective: {
    en: "Frontend Developer and Web Designer based in Mashhad, Iran. Specializing in responsive, high-performance web applications with React, JavaScript, Tailwind CSS, SASS, Bootstrap, Git/GitHub, and WordPress. Actively expanding into backend development with Node.js.",
    fa: "توسعه‌دهنده فرانت‌اند و طراح وب‌سایت مستقر در مشهد، ایران. متخصص در ساخت وب‌سایت‌های واکنش‌گرا و بهینه با React، جاوااسکریپت، Tailwind CSS، SASS، بوت‌استرپ، گیت و وردپرس، و در حال گسترش مهارت‌ها به سمت بک‌اند با Node.js."
  },
  sections: [
    {
      title: { en: "TECHNICAL SKILLS (100% MASTERY)", fa: "مهارت‌های فنی و تخصصی" },
      items: [
        { name: "Frontend Core", val: "Front-End Development, React.js, JavaScript, HTML, CSS" },
        { name: "CSS & Frameworks", val: "Tailwind CSS, SASS, Bootstrap (Framework), Responsive Grid" },
        { name: "Version Control & Collaboration", val: "Git, GitHub, CI/CD Workflows, Open Source Repositories" },
        { name: "CMS & Platforms", val: "WordPress (Elementor, WooCommerce, RankMath, Full Customization)" },
        { name: "Artificial Intelligence", val: "Artificial Intelligence (AI), Prompt Engineering (88%), Modern LLMs" },
        { name: "Backend & Systems", val: "Node.js (10% - foundations, REST APIs & expansion to full-stack)" }
      ]
    },
    {
      title: { en: "NOTABLE PROJECTS & OPEN SOURCE", fa: "پروژه‌ها و ابزارهای متن‌باز" },
      items: [
        {
          name: "Rockstar Games Official Web Experience & Clone (2025)",
          role: "Frontend Architect & Developer",
          desc: "Cinematic clone of Rockstar Games portal with 4K video modals, interactive mega menu, merchandise cart, Vice City Neon theme, and Web Audio SFX."
        },
        {
          name: "Niro Motor Industrial Catalog Clone (2025)",
          role: "Frontend & E-Commerce Developer",
          desc: "Modern motorcycle catalog architecture with Ctrl+K smart search, technical model comparison engine, live wishlist, and modular SCSS."
        },
        {
          name: "BOOM — Digital Gaming & Subscription Storefront (2025)",
          role: "Sole Frontend Developer",
          desc: "High-conversion digital gaming storefront with React 19, Tailwind CSS v4, WebP image pipeline, and instant routing."
        },
        {
          name: "Hol-Guard — Open-Source AI Agent Antivirus (2026)",
          role: "Open Source Creator & Maintainer",
          desc: "Runtime security guard for autonomous AI agents, blocking risky tools, unauthorized secret leaks, and prompt injections."
        }
      ]
    },
    {
      title: { en: "MILESTONES & TIMELINE", fa: "گاه‌شمار و مسیر پیشرفت" },
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
      title: { en: "WORK PRINCIPLES", fa: "اصول و استانداردهای کاری" },
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
      label: { en: "LCP Load Speed", fa: "سرعت لودینگ (LCP)" },
      before: "5.2s",
      after: "680ms",
      diff: "-87%"
    },
    {
      label: { en: "Google PageSpeed", fa: "امتیاز پیج‌اسپید" },
      before: "44 / 100",
      after: "99 / 100",
      diff: "+125%"
    },
    {
      label: { en: "Web Audio Engine", fa: "موتور صوتی وب" },
      before: "Silent",
      after: "Web Audio",
      diff: "60 FPS"
    },
    {
      label: { en: "Visual Theme", fa: "معماری تم بصری" },
      before: "Commercial",
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
  PROJECTS_CATEGORIES,
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

