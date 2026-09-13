import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function useSmoothScroll() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 1024 || matchMedia("(pointer: coarse)").matches);

    if (reduced || isMobile) {
      ScrollTrigger.refresh();
      const onMobileClick = (e) => {
        const a = e.target.closest?.('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      };
      document.addEventListener("click", onMobileClick);
      return () => document.removeEventListener("click", onMobileClick);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 0
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1e3);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(500, 33);
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    window.__lockScroll = (locked) => {
      if (locked) lenis.stop();
      else lenis.start();
    };
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 80);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    ScrollTrigger.refresh();
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lockScroll;
      delete window.__lenis;
    };
  }, []);
}
export {
  ScrollTrigger,
  gsap,
  useSmoothScroll
};
