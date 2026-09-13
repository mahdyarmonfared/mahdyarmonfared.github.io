import { useEffect, useRef } from "react";
import { pointer } from "../lib/pointer.js";
import { usePrefersReducedMotion } from "../hooks/usePointer.js";
const VERT = (
  /* glsl */
  `
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`
);
const FRAG = (
  /* glsl */
  `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;     // 0..1
  uniform float uHover;    // 0..1 mouse proximity energy
  uniform float uScroll;   // page scroll 0..1
  uniform float uAspect;

  // --- simplex noise (standard compact implementation) ---
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.6;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);

    float t = uTime * 0.12;

    // mouse swirl: smoke bends toward / away from cursor
    vec2 m = (uMouse - 0.5) * vec2(uAspect, 1.0);
    vec2 toM = p - m;
    float dM = length(toM);
    float swirl = uHover * 0.35 * exp(-dM * 2.2);
    p += vec2(-toM.y, toM.x) * swirl;

    // domain warping \u2014 ink-in-water smoke
    float q = fbm(p * 1.6 + vec2(t * 0.7, -t * 0.4));
    float r = fbm(p * 2.4 + vec2(-t * 0.5, t * 0.8) + q * 1.2);

    // rising columns: scroll pulls the smoke downward, time pushes it up
    float rise = fbm(vec2(p.x * 2.2, p.y * 1.4 - uTime * (0.06 + uScroll * 0.10)));

    float smoke = fbm(p * 2.0 + r * 1.5 + rise * 0.9);
    smoke = smoothstep(-0.25, 0.9, smoke);

    // vertical falloff: thicker at bottom horizon, thin at top
    float fall = smoothstep(1.1, -0.4, uv.y * 1.2 - 0.1);
    smoke *= mix(0.35, 1.0, fall);

    // palette: ember-gold rim inside dense smoke, cold dark outside
    vec3 base = vec3(0.021, 0.024, 0.039);
    vec3 ember = vec3(0.91, 0.64, 0.24);
    vec3 coal = vec3(0.10, 0.085, 0.075);

    vec3 col = base;
    col = mix(col, coal, smoke * 0.9);
    // gold veins where noise gradient is strong
    float vein = smoothstep(0.55, 0.95, smoke) * (1.0 - smoothstep(0.9, 1.15, smoke));
    col += ember * vein * (0.10 + 0.22 * sin(r * 6.28 + uTime * 0.4));
    // mouse glow halo
    col += ember * 0.10 * uHover * exp(-dM * 3.0);

    // vignette
    float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(uAspect, 1.0)) * 1.2);
    col *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`
);
function SmokeCanvas() {
  const mount = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const el = mount.current;
    if (!el) return;
    // --- raw WebGL, fullscreen quad (no three.js) ---
    const cv = document.createElement("canvas");
    cv.style.cssText = "width:100%;height:100%;display:block";
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
    if (!gl) return; // css gradient fallback stays behind us
    el.appendChild(cv);
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const U = {
      time: gl.getUniformLocation(prog, "uTime"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      hover: gl.getUniformLocation(prog, "uHover"),
      scroll: gl.getUniformLocation(prog, "uScroll"),
      aspect: gl.getUniformLocation(prog, "uAspect")
    };
    // render the blurry smoke at reduced internal resolution — visually identical, far cheaper
    const RENDER_SCALE = 0.6;
    let uTime = 0, uHover = 0, uScroll = 0;
    const mx = { v: 0.5 }, my = { v: 0.5 };
    const size = () => {
      cv.width = Math.min(1080, Math.max(2, Math.round(el.clientWidth * RENDER_SCALE)));
      cv.height = Math.min(720, Math.max(2, Math.round(el.clientHeight * RENDER_SCALE)));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform1f(U.aspect, el.clientWidth / Math.max(1, el.clientHeight));
    };
    size();
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let curScrollY = window.scrollY;
    const onScroll = () => { curScrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1e3;
      if (dt < 0.028) return; // ~35fps is plenty for smoke
      last = now;
      if (document.hidden) return;
      const nx = pointer.x / window.innerWidth;
      const ny = 1 - pointer.y / window.innerHeight;
      mx.v += (nx - mx.v) * 0.05;
      my.v += (ny - my.v) * 0.05;
      const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 24);
      uHover += (0.25 + speed * 0.75 - uHover) * 0.06;
      uTime += dt;
      const sy = curScrollY / maxScroll;
      uScroll += (sy - uScroll) * 0.08;
      gl.uniform1f(U.time, uTime);
      gl.uniform2f(U.mouse, mx.v, my.v);
      gl.uniform1f(U.hover, uHover);
      gl.uniform1f(U.scroll, uScroll);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(loop);
    const onResize = () => {
      if (el.clientWidth) size();
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      cv.remove();
    };
  }, [reduced]);

  return (
    <div
      ref={mount}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(120% 100% at 50% 0%, #10101a 0%, #07070b 60%)"
      }}
      aria-hidden="true"
    />
  );
}

export default SmokeCanvas;
