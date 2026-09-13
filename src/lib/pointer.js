const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  vx: 0,
  vy: 0,
  down: false,
  moved: false
};
let lastX = pointer.x;
let lastY = pointer.y;
function initPointer() {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.vx = e.clientX - lastX;
      pointer.vy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.moved = true;
    },
    { passive: true }
  );
  window.addEventListener("pointerdown", () => pointer.down = true, { passive: true });
  window.addEventListener("pointerup", () => pointer.down = false, { passive: true });
}
export {
  initPointer,
  pointer
};
