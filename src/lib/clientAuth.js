const CLIENTS_STORAGE_KEY = "monfared_portal_clients";
const SESSION_STORAGE_KEY = "monfared_portal_session";

const DEFAULT_DEMO_PROJECT = {
  id: "MNF-2026-088",
  title: {
    fa: "پلتفرم اختصاصی و وب‌سایت نوآر",
    en: "Bespoke Noir Web Platform"
  },
  category: "Creative Frontend & Interaction",
  status: "ACTIVE", // ACTIVE | REVIEW | COMPLETED
  progress: 72,
  startDate: "2026-08-15",
  deliveryDate: "2026-09-28",
  budget: "توافقی / Contract",
  phases: [
    {
      id: 1,
      title: { fa: "بررسی نیازمندی‌ها و تدوین سند پرونده", en: "Briefing & Case Discovery" },
      progress: 100,
      completed: true
    },
    {
      id: 2,
      title: { fa: "طراحی وایرفریم، معماری UI/UX و تایپوگرافی", en: "Architecture, UI/UX & Typography" },
      progress: 100,
      completed: true
    },
    {
      id: 3,
      title: { fa: "توسعه فرانت‌اند تعاملی و انیمیشن‌های نوآر", en: "Interactive Frontend & Noir Motion" },
      progress: 80,
      completed: false
    },
    {
      id: 4,
      title: { fa: "تست کیفی، بهینه‌سازی سرعت و تحویل نهایی", en: "QA Testing, Performance & Launch" },
      progress: 20,
      completed: false
    }
  ],
  logs: [
    {
      id: 1,
      date: "2026-09-08",
      text: {
        fa: "اتمام انیمیشن‌های روان GSAP و بهینه‌سازی ریسپانسیو برای تمامی نمایشگرها",
        en: "GSAP motion choreography and responsive optimization completed"
      }
    },
    {
      id: 2,
      date: "2026-09-01",
      text: {
        fa: "تأیید ساختار بصری نوآر، فونت‌های فارسی و رنگ‌بندی طلایی کهربایی",
        en: "Visual noir layout, Persian fonts & ember-hi accents approved"
      }
    }
  ],
  stagingUrl: "https://staging.monfared.dev/preview/demo-case",
  assets: [
    {
      id: "ast-1",
      title: "Figma UI/UX Design System v2.4",
      url: "https://figma.com/@monfared/design-system-v2",
      type: "FIGMA",
      status: "APPROVED",
      date: "2026-08-20"
    },
    {
      id: "ast-2",
      title: "Brand Assets & Noir Color Profiles (Google Drive)",
      url: "https://drive.google.com/drive/folders/noir-assets",
      type: "DOCS",
      status: "SYNCED",
      date: "2026-08-25"
    }
  ]
};

function getClients() {
  try {
    const raw = localStorage.getItem(CLIENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveClients(clients) {
  try {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
  } catch (e) {
    console.error("Failed to save clients", e);
  }
}

export function getCurrentClient() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    const clients = getClients();
    return clients.find((c) => c.id === session.id) || session;
  } catch {
    return null;
  }
}

export function registerClient({ fullName, email, password, telegram, company, initialProjectTitle }) {
  const cleanEmail = email.trim().toLowerCase();
  const clients = getClients();

  if (clients.some((c) => c.email.toLowerCase() === cleanEmail)) {
    throw new Error("این آدرس ایمیل قبلاً در سیستم پرونده‌ها ثبت شده است.");
  }

  const newProject = {
    ...DEFAULT_DEMO_PROJECT,
    id: `MNF-2026-${Math.floor(100 + Math.random() * 900)}`,
    title: {
      fa: initialProjectTitle?.trim() || "پروژه در حال بررسی کارفرما",
      en: initialProjectTitle?.trim() || "Client Commission Case"
    },
    progress: 25,
    phases: [
      {
        id: 1,
        title: { fa: "بررسی نیازمندی‌ها و تدوین سند پرونده", en: "Briefing & Case Discovery" },
        progress: 100,
        completed: true
      },
      {
        id: 2,
        title: { fa: "طراحی وایرفریم، معماری UI/UX و تایپوگرافی", en: "Architecture, UI/UX & Typography" },
        progress: 30,
        completed: false
      },
      {
        id: 3,
        title: { fa: "توسعه فرانت‌اند تعاملی و انیمیشن‌های نوآر", en: "Interactive Frontend & Noir Motion" },
        progress: 0,
        completed: false
      },
      {
        id: 4,
        title: { fa: "تست کیفی، بهینه‌سازی سرعت و تحویل نهایی", en: "QA Testing, Performance & Launch" },
        progress: 0,
        completed: false
      }
    ],
    logs: [
      {
        id: 1,
        date: new Date().toISOString().split("T")[0],
        text: {
          fa: "پرونده جدید توسط کارفرما ایجاد شد و در صف ارزیابی قرار گرفت.",
          en: "New commission case registered and queued for evaluation."
        }
      }
    ]
  };

  const newClient = {
    id: `client_${Date.now()}`,
    fullName: fullName.trim(),
    email: cleanEmail,
    password,
    telegram: telegram.trim().startsWith("@") ? telegram.trim() : `@${telegram.trim()}`,
    company: company?.trim() || "",
    createdAt: new Date().toISOString(),
    projects: [newProject]
  };

  clients.push(newClient);
  saveClients(clients);
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newClient));
  return newClient;
}

export function loginClient({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();
  const clients = getClients();
  const found = clients.find((c) => c.email.toLowerCase() === cleanEmail && c.password === password);

  if (!found) {
    throw new Error("ایمیل یا کلمه عبور وارد شده نادرست است.");
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(found));
  return found;
}

export function demoLogin() {
  const clients = getClients();
  let demo = clients.find((c) => c.email === "demo@monfared.dev");

  if (!demo) {
    demo = {
      id: "demo_client_001",
      fullName: "کارفرمای نمونه (دمو)",
      email: "demo@monfared.dev",
      password: "demo",
      telegram: "@MahdyarClient",
      company: "استودیو نوآر",
      createdAt: "2026-08-10T12:00:00Z",
      projects: [DEFAULT_DEMO_PROJECT]
    };
    clients.push(demo);
    saveClients(clients);
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demo));
  return demo;
}

export function logoutClient() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function addClientProject({ title, category, budget, deadline, description }) {
  const current = getCurrentClient();
  if (!current) throw new Error("ابتدا وارد حساب کاربری خود شوید.");

  const newProject = {
    id: `MNF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    title: { fa: title, en: title },
    category: category || "Bespoke Web Application",
    status: "ACTIVE",
    progress: 10,
    startDate: new Date().toISOString().split("T")[0],
    deliveryDate: deadline || "توافقی",
    budget: budget || "توافقی",
    description,
    phases: [
      {
        id: 1,
        title: { fa: "بررسی نیازمندی‌ها و توافق روی الزامات", en: "Scope & Requirement Analysis" },
        progress: 50,
        completed: false
      },
      {
        id: 2,
        title: { fa: "طراحی ساختار، وایرفریم و جریان کاربر", en: "Wireframing & User Journey" },
        progress: 0,
        completed: false
      },
      {
        id: 3,
        title: { fa: "پیاده‌سازی کد، افکت‌ها و انیمیشن‌ها", en: "Code Engineering & Noir UI" },
        progress: 0,
        completed: false
      },
      {
        id: 4,
        title: { fa: "تست، اصلاحات و انتشار رسمی", en: "Testing, Revisions & Delivery" },
        progress: 0,
        completed: false
      }
    ],
    logs: [
      {
        id: 1,
        date: new Date().toISOString().split("T")[0],
        text: {
          fa: "درخواست ثبت پروژه جدید با موفقیت ارسال شد و کارآگاه بررسی اولیه را آغاز کرد.",
          en: "New project brief submitted successfully and queued for review."
        }
      }
    ]
  };

  const clients = getClients();
  const idx = clients.findIndex((c) => c.id === current.id);
  if (idx !== -1) {
    clients[idx].projects = [newProject, ...(clients[idx].projects || [])];
    saveClients(clients);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(clients[idx]));
    return clients[idx];
  }

  return current;
}

export function addProjectAsset(projectId, { title, url, type = "LINK" }) {
  const current = getCurrentClient();
  if (!current) throw new Error("ابتدا وارد حساب کاربری خود شوید.");

  const clients = getClients();
  const clientIdx = clients.findIndex((c) => c.id === current.id);
  if (clientIdx === -1) return current;

  const projectIdx = clients[clientIdx].projects?.findIndex((p) => p.id === projectId);
  if (projectIdx === -1 || projectIdx === undefined) return current;

  const newAsset = {
    id: `ast-${Date.now()}`,
    title: title.trim(),
    url: url.trim(),
    type: type.toUpperCase(),
    status: "PENDING_REVIEW",
    date: new Date().toISOString().split("T")[0]
  };

  const project = clients[clientIdx].projects[projectIdx];
  project.assets = [newAsset, ...(project.assets || [])];

  // Add notification log
  project.logs = [
    {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      text: {
        fa: `سند جدید «${newAsset.title}» توسط کارفرما بارگذاری شد.`,
        en: `New asset "${newAsset.title}" uploaded by client.`
      }
    },
    ...(project.logs || [])
  ];

  saveClients(clients);
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(clients[clientIdx]));
  return clients[clientIdx];
}


