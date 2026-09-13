import { useEffect, useRef, useState } from "react";
import { LangProvider, useLang } from "./context/LangContext.jsx";
import { initPointer } from "./lib/pointer.js";
import { useSmoothScroll, gsap, ScrollTrigger } from "./lib/smooth.js";
import { registerReveals } from "./components/ScrollFx.jsx";
import { SCENE_LABELS, STR, t } from "./content.js";
import SmokeCanvas from "./components/SmokeCanvas.jsx";
import Cursor from "./components/Cursor.jsx";
import ScrollFx from "./components/ScrollFx.jsx";
import Terminal from "./components/Terminal.jsx";
import Game from "./components/Game.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./sections/Hero.jsx";
import { About } from "./sections/About.jsx";
import { Skills } from "./sections/Skills.jsx";
import { Projects } from "./sections/Projects.jsx";
import Estimator from "./sections/Estimator.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import { Experience } from "./sections/Experience.jsx";
import { Contact } from "./sections/Contact.jsx";
import { Footer } from "./sections/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
import ClientPortal from "./pages/ClientPortal.jsx";
import Lab from "./pages/Lab.jsx";
import ResumeModal from "./components/ResumeModal.jsx";
import SoundscapeModal from "./components/SoundscapeModal.jsx";
import MegaMenu from "./components/MegaMenu.jsx";
import BeforeAfter from "./sections/BeforeAfter.jsx";
import WorkProtocolModal from "./components/WorkProtocolModal.jsx";
import BookingModal from "./components/BookingModal.jsx";
import IdeaSketchpad from "./components/IdeaSketchpad.jsx";
import DirectorsCut from "./components/DirectorsCut.jsx";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

function PortfolioApp() {
  const { lang, toggle } = useLang();
  useSmoothScroll();

  const [term, setTerm] = useState(false);
  const [game, setGame] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [soundscapeOpen, setSoundscapeOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sketchpadOpen, setSketchpadOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "/";
    const p = window.location.pathname;
    if (p === "/portal" || p === "/dashboard" || p === "/client") return "/portal";
    if (p === "/lab" || p === "/laboratory") return "/lab";
    return p === "/" || p === "" ? "/" : "404";
  });

  const konamiIdx = useRef(0);
  const toastRef = useRef(null);
  const bar = useRef(null);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p === "/portal" || p === "/dashboard" || p === "/client") {
        setRoute("/portal");
      } else if (p === "/lab" || p === "/laboratory") {
        setRoute("/lab");
      } else {
        setRoute(p === "/" || p === "" ? "/" : "404");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === "/") {
      window.history.pushState(null, "", "/");
      setRoute("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (path === "/portal" || path === "portal") {
      window.history.pushState(null, "", "/portal");
      setRoute("/portal");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (path === "/lab" || path === "lab") {
      window.history.pushState(null, "", "/lab");
      setRoute("/lab");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.pushState(null, "", path);
      setRoute("404");
    }
  };

  useEffect(() => {
    initPointer();
  }, []);

  useEffect(() => {
    if (route !== "/") return;
    const tls = registerReveals();
    ScrollTrigger.refresh();
    const id1 = setTimeout(() => ScrollTrigger.refresh(), 50);
    const id2 = setTimeout(() => ScrollTrigger.refresh(), 300);

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        window.__lenis?.resize();
        ScrollTrigger.refresh();
      }, 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      tls.forEach((t2) => t2.kill());
    };
  }, [lang, route]);

  // Konami & Terminal key listener
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (!typing && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        setTerm((v) => !v);
      }
      const want = KONAMI[konamiIdx.current];
      if (e.key === want) {
        konamiIdx.current++;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          window.dispatchEvent(new Event("easter-egg"));
          toastRef.current?.show(t(lang, STR.easterEggFound));
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang]);

  useEffect(() => {
    const openGame = () => setGame(true);
    const openProtocol = () => setProtocolOpen(true);
    const openBooking = () => setBookingOpen(true);
    const openSketchpad = () => setSketchpadOpen(true);

    window.addEventListener("open-game", openGame);
    window.addEventListener("open-protocol", openProtocol);
    window.addEventListener("open-booking", openBooking);
    window.addEventListener("open-sketchpad", openSketchpad);

    return () => {
      window.removeEventListener("open-game", openGame);
      window.removeEventListener("open-protocol", openProtocol);
      window.removeEventListener("open-booking", openBooking);
      window.removeEventListener("open-sketchpad", openSketchpad);
    };
  }, []);

  useEffect(() => {
    if (route !== "/") return;
    const els = document.querySelectorAll("[data-active-scene]");
    els.forEach((el) => (el.textContent = t(lang, SCENE_LABELS[scene])));
  }, [scene, lang, route]);

  // Scroll Progress Bar
  useEffect(() => {
    if (route !== "/") return;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      }
    });
    return () => st.kill();
  }, [route]);

  const goTo = (id) => {
    if (route !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If on 404 route, render dedicated NotFound page
  if (route === "404") {
    return (
      <div className="min-h-svh bg-void text-bone">
        <Cursor />
        <NotFound
          onGoHome={() => navigate("/")}
          onOpenTerminal={() => setTerm(true)}
          onOpenGame={() => setGame(true)}
        />
        <Terminal
          open={term}
          onClose={() => setTerm(false)}
          lang={lang}
          onGo={goTo}
          onGame={() => setGame(true)}
          onLang={toggle}
          on404={() => navigate("/404")}
          onPortal={() => navigate("/portal")}
          onLab={() => navigate("/lab")}
          onResumeModal={() => setResumeOpen(true)}
        />
        <Game open={game} onClose={() => setGame(false)} lang={lang} />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} lang={lang} />
      </div>
    );
  }

  // If on Client Portal route, render ClientPortal page
  if (route === "/portal") {
    return (
      <div className="min-h-svh bg-void text-bone">
        <Cursor />
        <ClientPortal
          onGoHome={() => navigate("/")}
          onMegaMenu={() => setMegaMenuOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
        />
        <Terminal
          open={term}
          onClose={() => setTerm(false)}
          lang={lang}
          onGo={goTo}
          onGame={() => setGame(true)}
          onLang={toggle}
          on404={() => navigate("/404")}
          onPortal={() => navigate("/portal")}
          onLab={() => navigate("/lab")}
          onResumeModal={() => setResumeOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
          onOpenProtocol={() => setProtocolOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenSketchpad={() => setSketchpadOpen(true)}
        />
        <Game open={game} onClose={() => setGame(false)} lang={lang} />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} lang={lang} />
        <SoundscapeModal open={soundscapeOpen} onClose={() => setSoundscapeOpen(false)} lang={lang} />
        <MegaMenu
          open={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
          lang={lang}
          onPortal={() => navigate("/portal")}
          onLab={() => navigate("/lab")}
          onResumeModal={() => setResumeOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
          onTerminal={() => setTerm(true)}
          onGame={() => setGame(true)}
          onNavigateHome={goTo}
          onOpenProtocol={() => setProtocolOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenSketchpad={() => setSketchpadOpen(true)}
        />
        <WorkProtocolModal
          isOpen={protocolOpen}
          onClose={() => setProtocolOpen(false)}
          lang={lang}
        />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          lang={lang}
        />
        <IdeaSketchpad
          isOpen={sketchpadOpen}
          onClose={() => setSketchpadOpen(false)}
          lang={lang}
        />
        <DirectorsCut lang={lang} />
      </div>
    );
  }

  // If on Creative Code Lab route, render Lab page
  if (route === "/lab") {
    return (
      <div className="min-h-svh bg-void text-bone">
        <Cursor />
        <Lab
          onGoHome={() => navigate("/")}
          onPortal={() => navigate("/portal")}
          onMegaMenu={() => setMegaMenuOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
        />
        <Terminal
          open={term}
          onClose={() => setTerm(false)}
          lang={lang}
          onGo={goTo}
          onGame={() => setGame(true)}
          onLang={toggle}
          on404={() => navigate("/404")}
          onPortal={() => navigate("/portal")}
          onLab={() => navigate("/lab")}
          onResumeModal={() => setResumeOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
          onOpenProtocol={() => setProtocolOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenSketchpad={() => setSketchpadOpen(true)}
        />
        <Game open={game} onClose={() => setGame(false)} lang={lang} />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} lang={lang} />
        <SoundscapeModal open={soundscapeOpen} onClose={() => setSoundscapeOpen(false)} lang={lang} />
        <MegaMenu
          open={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
          lang={lang}
          onPortal={() => navigate("/portal")}
          onLab={() => navigate("/lab")}
          onResumeModal={() => setResumeOpen(true)}
          onSoundscapeModal={() => setSoundscapeOpen(true)}
          onTerminal={() => setTerm(true)}
          onGame={() => setGame(true)}
          onNavigateHome={goTo}
          onOpenProtocol={() => setProtocolOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenSketchpad={() => setSketchpadOpen(true)}
        />
        <WorkProtocolModal
          isOpen={protocolOpen}
          onClose={() => setProtocolOpen(false)}
          lang={lang}
        />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          lang={lang}
        />
        <IdeaSketchpad
          isOpen={sketchpadOpen}
          onClose={() => setSketchpadOpen(false)}
          lang={lang}
        />
        <DirectorsCut lang={lang} />
      </div>
    );
  }

  return (
    <div className="grain vignette relative min-h-svh w-full overflow-x-hidden">
      <ScrollFx onScene={setScene} />
      <SmokeCanvas />
      <Cursor />

      {/* Progress bar - dynamically adapts origin for LTR vs RTL */}
      <div
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[60] h-[2px] scale-x-0 bg-gradient-to-r from-ember-deep via-ember to-ember-hi ${
          lang === "fa" ? "origin-right" : "origin-left"
        }`}
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      <Nav
        onTerminal={() => setTerm(true)}
        onGame={() => setGame(true)}
        onPortal={() => navigate("/portal")}
        onLab={() => navigate("/lab")}
        onResumeModal={() => setResumeOpen(true)}
        onSoundscapeModal={() => setSoundscapeOpen(true)}
        onMegaMenu={() => setMegaMenuOpen(true)}
      />

      <main>
        <Hero
          lang={lang}
          onTerminal={() => setTerm(true)}
          onResumeModal={() => setResumeOpen(true)}
        />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <BeforeAfter lang={lang} />
        <Estimator
          lang={lang}
          onPortal={() => navigate("/portal")}
          onOpenProtocol={() => setProtocolOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenSketchpad={() => setSketchpadOpen(true)}
        />
        <Testimonials lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} onTop={toTop} onGame={() => setGame(true)} />

      <Terminal
        open={term}
        onClose={() => setTerm(false)}
        lang={lang}
        onGo={goTo}
        onGame={() => setGame(true)}
        onLang={toggle}
        on404={() => navigate("/404")}
        onPortal={() => navigate("/portal")}
        onLab={() => navigate("/lab")}
        onResumeModal={() => setResumeOpen(true)}
        onSoundscapeModal={() => setSoundscapeOpen(true)}
        onOpenProtocol={() => setProtocolOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenSketchpad={() => setSketchpadOpen(true)}
      />

      <Game open={game} onClose={() => setGame(false)} lang={lang} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} lang={lang} />
      <SoundscapeModal open={soundscapeOpen} onClose={() => setSoundscapeOpen(false)} lang={lang} />
      <MegaMenu
        open={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        lang={lang}
        onPortal={() => navigate("/portal")}
        onLab={() => navigate("/lab")}
        onResumeModal={() => setResumeOpen(true)}
        onSoundscapeModal={() => setSoundscapeOpen(true)}
        onTerminal={() => setTerm(true)}
        onGame={() => setGame(true)}
        onNavigateHome={goTo}
        onOpenProtocol={() => setProtocolOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenSketchpad={() => setSketchpadOpen(true)}
      />
      <WorkProtocolModal
        isOpen={protocolOpen}
        onClose={() => setProtocolOpen(false)}
        lang={lang}
      />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        lang={lang}
      />
      <IdeaSketchpad
        isOpen={sketchpadOpen}
        onClose={() => setSketchpadOpen(false)}
        lang={lang}
      />
      <DirectorsCut lang={lang} />
      <Toast onReady={(api) => (toastRef.current = api)} lang={lang} />
    </div>
  );
}

function Toast({ onReady, lang }) {
  const el = useRef(null);

  useEffect(() => {
    onReady({
      show: (msg) => {
        const n = el.current;
        if (!n) return;
        n.textContent = msg;
        gsap.killTweensOf(n);
        gsap.fromTo(n, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
        gsap.to(n, { autoAlpha: 0, y: 14, duration: 0.5, delay: 2.4, ease: "power2.in" });
      }
    });

    const handler = () => {
      const n = el.current;
      if (!n) return;
      n.textContent = t(lang, STR.easterEggFound);
      gsap.killTweensOf(n);
      gsap.fromTo(n, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
      gsap.to(n, { autoAlpha: 0, y: 14, duration: 0.5, delay: 2.4, ease: "power2.in" });
    };

    window.addEventListener("easter-egg", handler);
    return () => window.removeEventListener("easter-egg", handler);
  }, [onReady, lang]);

  return (
    <div
      ref={el}
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="mono fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-ember/40 bg-coal/95 px-6 py-3 text-xs tracking-widest text-ember opacity-0 shadow-[0_0_40px_rgb(232,163,61,0.18)] backdrop-blur pointer-events-none"
      role="status"
      aria-live="polite"
    />
  );
}

export default function App() {
  return (
    <LangProvider>
      <PortfolioApp />
    </LangProvider>
  );
}
