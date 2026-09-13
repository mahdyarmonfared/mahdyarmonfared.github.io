import { useEffect, useState } from "react";
function usePointer() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pos;
}
function useFinePointer() {
  const check = () =>
    typeof matchMedia !== "undefined" &&
    matchMedia("(pointer: fine)").matches &&
    typeof window !== "undefined" &&
    window.innerWidth >= 1024;

  const [fine, setFine] = useState(check);

  useEffect(() => {
    const mq = matchMedia("(pointer: fine)");
    const update = () => {
      const isFine = check();
      setFine(isFine);
      document.documentElement.classList.toggle("fine-pointer", isFine);
    };

    mq.addEventListener?.("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    document.documentElement.classList.toggle("fine-pointer", check());

    return () => {
      mq.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return fine;
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const cb = (e) => setReduced(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return reduced;
}
export {
  useFinePointer,
  usePointer,
  usePrefersReducedMotion
};
