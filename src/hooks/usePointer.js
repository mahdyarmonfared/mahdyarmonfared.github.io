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
  const [fine, setFine] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches
  );
  useEffect(() => {
    const mq = matchMedia("(pointer: fine)");
    const cb = (e) => setFine(e.matches);
    mq.addEventListener("change", cb);
    document.documentElement.classList.toggle("fine-pointer", fine);
    return () => mq.removeEventListener("change", cb);
  }, [fine]);
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
