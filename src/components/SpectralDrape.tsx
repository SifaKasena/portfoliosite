import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * SpectralDrape
 * A glowing drape of dots folding in 3D. Raw WebGL (no dependencies) + Tailwind.
 *
 * A flat grid of dots is lifted into folds by a set of flowing "strands".
 * Each strand is a soft ridge that runs along the drape's length and sways
 * sideways; where strands overlap the grid folds. The whole sheet is then
 * rolled (in-plane), tilted (around X) and turned (around Y) in perspective.
 *
 * Props mirror the React Bits Pro API. Give the root a height with className.
 */

const MAX_STRANDS = 12;
const MAX_RIPPLES = 4;
const BASE_DOTS = 44000;

export interface SpectralDrapeProps {
  /** Two colours: the body of the drape, then the highlight reached along its crests. */
  colors?: string[];
  /** Colour behind the drape. Light backgrounds switch to ink dots. "transparent" shows the page. */
  backgroundColor?: string;
  /** Number of dots, 0.2 to 2.5. 1 draws about 44,000. */
  density?: number;
  /** Dot size relative to the grid spacing. */
  dotSize?: number;
  /** Number of flowing strands, 1 to 12. */
  strands?: number;
  /** How far the strands swing across the drape. */
  amplitude?: number;
  /** How many curves each strand makes along its length. */
  frequency?: number;
  /** Width of each strand. */
  thickness?: number;
  /** How high the strands lift the grid. */
  depth?: number;
  /** Dot edge softness, 0 (crisp) to 1 (soft glow). */
  softness?: number;
  /** Brightness of the dots. */
  intensity?: number;
  /** Shifts dots toward the highlight colour along the drape's length. */
  colorShift?: number;
  /** Rotation around the horizontal axis, degrees. */
  tilt?: number;
  /** Rotation around the vertical axis, degrees. */
  turn?: number;
  /** Rotation within the drape's own plane, degrees. */
  roll?: number;
  /** Scale of the drape. */
  zoom?: number;
  /** How fast the strands drift and reshape the folds. */
  flow?: number;
  /** Overall animation speed. 0 holds the current frame. */
  speed?: number;
  /** Pointer brushes dots aside and the view drifts toward it. */
  interactive?: boolean;
  /** Pointer push strength. 0 disables it. */
  brush?: number;
  /** Brush area, relative to the height. */
  brushRadius?: number;
  /** How far the drape turns toward the pointer. 0 keeps it still. */
  parallax?: number;
  /** Each click sends a ripple across the drape. */
  clickRipples?: boolean;
  /** Changes the arrangement of the strands. */
  seed?: number;
  /** Freezes the flow. Pointer and clicks still work. */
  paused?: boolean;
  /** Upper bound for the device pixel ratio. */
  dpr?: number;
  /** Classes for the root element. Give it a height. */
  className?: string;
  style?: CSSProperties;
  /** Content layered above the drape. */
  children?: ReactNode;
}

type DrapeSettings = Required<Omit<SpectralDrapeProps, "className" | "style" | "children">>;
type RGBA = [number, number, number, number];
type Ripple = { x: number; y: number; t0: number };

interface DrapeState {
  gl: WebGLRenderingContext | null;
  prog: WebGLProgram | null;
  buf: WebGLBuffer | null;
  aGrid: number;
  n: number;
  count: number;
  loc: Record<string, WebGLUniformLocation | null>;
  raf: number;
  visible: boolean;
  disposed: boolean;
  time: number;
  last: number;
  width: number;
  height: number;
  px: number; py: number; tpx: number; tpy: number;
  pHas: boolean;
  pPush: number;
  tvx: number; tvy: number; vx: number; vy: number;
  ripples: Ripple[];
  strandKey: string;
  strandData: Float32Array | null;
  reduced: boolean;
}

const VERT = /* glsl */ `
precision highp float;

attribute vec2 aGrid;

uniform vec4  uStrand[${MAX_STRANDS}]; // x: center, y: phase A, z: phase B, w: amplitude scale
uniform float uStrands;
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uThick;
uniform float uDepth;
uniform vec3  uRot;        // roll, tilt, turn (radians)
uniform float uZoom;
uniform float uScale;      // plane unit -> ndc height
uniform float uAspect;
uniform vec2  uRes;        // drawing-buffer size in px
uniform float uN;          // dots per side
uniform float uDotSize;
uniform float uSoft;
uniform float uColorShift;
uniform vec3  uPointer;    // x, y (aspect space), brush strength 0..1
uniform float uBrushR;
uniform vec4  uRip[${MAX_RIPPLES}]; // x, y (aspect space), age (s, <0 = off), strength

varying float vCrest;
varying float vMix;
varying float vFade;
varying float vCov;

const float CAM = 3.2;

void main() {
  vec2 g = aGrid;

  // ---- strands -> folds ---------------------------------------------------
  float w = 0.025 + 0.13 * uThick;
  float keep = 1.0;
  float pull = 0.0;
  for (int i = 0; i < ${MAX_STRANDS}; i++) {
    if (float(i) >= uStrands) break;
    vec4 s = uStrand[i];
    float sp = 0.6 + 0.6 * fract(s.y * 3.17);
    float t = uTime * sp;
    float sway = sin(uFreq * (1.9 * g.y + s.y) + t * 0.55)
               + 0.45 * sin(uFreq * (3.7 * g.y + s.z) - t * 0.37);
    float cx = s.x + uAmp * 0.30 * s.w * sway;
    float d = g.x - cx;
    float pulse = 0.72 + 0.28 * sin(1.7 * g.y + s.z * 1.3 + t * 0.45);
    float h = exp(-(d * d) / (w * w)) * pulse;
    keep *= 1.0 - 0.96 * h;
    pull -= d * h;
  }
  float crest = 1.0 - keep;

  vec3 P = vec3(g, crest * uDepth * 0.6);
  P.x += pull * uDepth * 0.9;   // dots bunch toward the crest line

  // ---- orientation: roll (in-plane) -> tilt (X) -> turn (Y) -------------------
  float cr = cos(uRot.x), sr = sin(uRot.x);
  P.xy = vec2(cr * P.x - sr * P.y, sr * P.x + cr * P.y);
  float ct = cos(uRot.y), st = sin(uRot.y);
  P.yz = vec2(ct * P.y - st * P.z, st * P.y + ct * P.z);
  float cu = cos(uRot.z), su = sin(uRot.z);
  P.xz = vec2(cu * P.x + su * P.z, -su * P.x + cu * P.z);

  float persp = CAM / max(CAM - P.z, 0.35);
  float k = persp * uZoom * uScale;
  vec2 ndc = vec2(P.x / uAspect, P.y) * k;

  // ---- interaction (aspect space, height = 2) -----------------------------------
  vec2 a = vec2(ndc.x * uAspect, ndc.y);
  float glow = 0.0;

  vec2 off = a - uPointer.xy;
  float r2 = uBrushR * uBrushR * 4.0;
  float f = exp(-dot(off, off) / max(r2, 1e-5));
  a += normalize(off + 1e-4) * f * uPointer.z * 0.22 * uBrushR * 2.0;

  for (int j = 0; j < ${MAX_RIPPLES}; j++) {
    vec4 rp = uRip[j];
    if (rp.z < 0.0) continue;
    vec2 ro = a - rp.xy;
    float rd = length(ro);
    float front = rp.z * 1.1;
    float ring = exp(-pow((rd - front) / 0.16, 2.0));
    float fade = exp(-rp.z * 1.15) * rp.w;
    glow += ring * fade * 1.1 + fade * 0.35;
    a += normalize(ro + 1e-4) * ring * fade * 0.03;
  }
  ndc = vec2(a.x / uAspect, a.y);

  // ---- shading ------------------------------------------------------------------
  float edge = max(abs(g.x), abs(g.y));
  float edgeFade = 1.0 - smoothstep(0.78, 1.0, edge);
  float depthShade = clamp(0.55 + 0.9 * (persp - 0.85), 0.25, 1.3);

  float along = g.y * 0.5 + 0.5;
  vCrest = crest + glow;
  vMix = clamp(crest * 0.85 + uColorShift * (along * 1.1 - 0.15) + glow * 0.4, 0.0, 1.0);
  vFade = edgeFade * depthShade;

  float stepPx = (2.0 / uN) * k * (uRes.y * 0.5);
  float size = stepPx * uDotSize * 0.62 * (1.0 + 0.9 * uSoft);

  // Dots smaller than ~1.5px are drawn at 1.5px and dimmed by their real coverage,
  // which keeps dense grids from shimmering into moire.
  float px = max(size, 1.5);
  vCov = min(1.0, (size * size) / (px * px));

  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = px;
}
`;

const FRAG = /* glsl */ `
precision mediump float;

uniform vec3  uColA;
uniform vec3  uColB;
uniform float uSoftF;
uniform float uIntensity;
uniform float uInk;

varying float vCrest;
varying float vMix;
varying float vFade;
varying float vCov;

void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r = length(q);
  if (r > 1.0) discard;

  float rc = 1.0 / (1.0 + 0.9 * uSoftF);
  float hard = 1.0 - smoothstep(rc - 0.14, rc, r);
  float soft = exp(-r * r * 4.2);
  float a = mix(hard, soft, uSoftF);

  vec3 col = mix(uColA, uColB, vMix);
  float bright = (0.16 + 0.84 * vCrest) * uIntensity * vFade * vCov;

  if (uInk > 0.5) {
    gl_FragColor = vec4(col, clamp(a * bright, 0.0, 1.0));
  } else {
    gl_FragColor = vec4(col * (1.0 + 0.25 * vCrest), clamp(a * bright, 0.0, 1.0));
  }
}
`;

/* ------------------------------------------------------------------ helpers */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let colorCtx: CanvasRenderingContext2D | null = null;
/** Any CSS colour -> [r, g, b, a] in 0..1. */
function parseColor(input: string | undefined, fallback: RGBA = [0, 0, 0, 1]): RGBA {
  if (!input) return fallback;
  if (input === "transparent") return [0, 0, 0, 0];
  try {
    if (!colorCtx) colorCtx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!colorCtx) return fallback;
    colorCtx.clearRect(0, 0, 1, 1);
    colorCtx.fillStyle = "#000";
    colorCtx.fillStyle = input;
    colorCtx.fillRect(0, 0, 1, 1);
    const d = colorCtx.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255, d[3] / 255];
  } catch {
    return fallback;
  }
}

const luminance = ([r, g, b]: RGBA): number => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/** Strand centres/phases for a given count + seed. */
function buildStrands(count: number, seed: number): Float32Array {
  const rnd = mulberry32(seed * 7919 + 1013);
  const data = new Float32Array(MAX_STRANDS * 4);
  const n = Math.max(1, Math.min(MAX_STRANDS, Math.round(count)));
  for (let i = 0; i < MAX_STRANDS; i++) {
    const base = n === 1 ? 0 : -0.72 + (1.44 * i) / (n - 1);
    const jitter = n === 1 ? 0 : (rnd() - 0.5) * (1.44 / (n - 1)) * 0.5;
    data[i * 4 + 0] = base + jitter;
    data[i * 4 + 1] = rnd() * Math.PI * 2;
    data[i * 4 + 2] = rnd() * Math.PI * 2;
    data[i * 4 + 3] = 0.75 + rnd() * 0.5;
  }
  return data;
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("SpectralDrape: could not create shader");
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error("SpectralDrape shader error: " + log);
  }
  return sh;
}

/* ---------------------------------------------------------------- component */

export const SpectralDrape = ({
  colors = ["#6A4BFF", "#E4DBFF"],
  backgroundColor = "#0a0a0a",
  density = 1,
  dotSize = 1,
  strands = 8,
  amplitude = 1,
  frequency = 1,
  thickness = 0.7,
  depth = 1,
  softness = 0.6,
  intensity = 1,
  colorShift = 0.3,
  tilt = -40,
  turn = -45,
  roll = 110,
  zoom = 1,
  flow = 1,
  speed = 1,
  interactive = true,
  brush = 1,
  brushRadius = 0.2,
  parallax = 1,
  clickRipples = true,
  seed = 0,
  paused = false,
  dpr = 2,
  className = "",
  style,
  children,
}: SpectralDrapeProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<DrapeSettings>({} as DrapeSettings);
  const apiRef = useRef<{ rebuild: (d: number) => void }>({ rebuild: () => {} });

  // Latest props are read by the render loop; no re-init needed when they change.
  propsRef.current = {
    density, colors, backgroundColor, dotSize, strands, amplitude, frequency, thickness, depth,
    softness, intensity, colorShift, tilt, turn, roll, zoom, flow, speed, interactive,
    brush, brushRadius, parallax, clickRipples, seed, paused, dpr,
  };

  // Density only changes the geometry.
  useEffect(() => {
    apiRef.current.rebuild(density);
  }, [density]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const state: DrapeState = {
      gl: null,
      prog: null,
      buf: null,
      aGrid: -1,
      n: 0,
      count: 0,
      loc: {},
      raf: 0,
      visible: true,
      disposed: false,
      time: 0,
      last: 0,
      width: 1,
      height: 1,
      // pointer
      px: 0, py: 0, tpx: 0, tpy: 0, pHas: false, pPush: 0, tvx: 0, tvy: 0, vx: 0, vy: 0,
      ripples: [],
      strandKey: "",
      strandData: null,
      reduced: false,
    };

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onMq = () => { state.reduced = !!mq?.matches; };
    onMq();
    mq?.addEventListener?.("change", onMq);

    /* ---- GL setup ---- */
    const setup = (): boolean => {
      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      });
      if (!gl) return false;
      state.gl = gl;

      const prog = gl.createProgram();
      if (!prog) throw new Error("SpectralDrape: could not create program");
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error("SpectralDrape link error: " + gl.getProgramInfoLog(prog));
      }
      state.prog = prog;
      gl.useProgram(prog);

      const names = [
        "uStrand", "uStrands", "uTime", "uAmp", "uFreq", "uThick", "uDepth", "uRot", "uZoom",
        "uScale", "uAspect", "uRes", "uN", "uDotSize", "uSoft", "uColorShift", "uPointer",
        "uBrushR", "uRip", "uColA", "uColB", "uIntensity", "uInk", "uSoftF",
      ];
      names.forEach((nm) => { state.loc[nm] = gl.getUniformLocation(prog, nm); });
      state.aGrid = gl.getAttribLocation(prog, "aGrid");

      state.buf = gl.createBuffer();
      gl.enable(gl.BLEND);
      buildGrid(propsRef.current.density);
      return true;
    };

    const buildGrid = (d: number) => {
      const gl = state.gl;
      if (!gl) return;
      const dens = Math.min(2.5, Math.max(0.2, Number.isFinite(d) ? d : 1));
      const n = Math.max(8, Math.round(Math.sqrt(BASE_DOTS * dens)));
      const data = new Float32Array(n * n * 2);
      let o = 0;
      for (let j = 0; j < n; j++) {
        const y = (j / (n - 1)) * 2 - 1;
        for (let i = 0; i < n; i++) {
          data[o++] = (i / (n - 1)) * 2 - 1;
          data[o++] = y;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, state.buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(state.aGrid);
      gl.vertexAttribPointer(state.aGrid, 2, gl.FLOAT, false, 0, 0);
      state.n = n;
      state.count = n * n;
    };
    apiRef.current.rebuild = buildGrid;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const ratio = Math.min(propsRef.current.dpr || 1, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(rect.width * ratio));
      const h = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      state.width = w;
      state.height = h;
    };

    /* ---- pointer ---- */
    const toAspect = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = 1 - ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2;
      return { nx, ny, ax: nx * (rect.width / Math.max(rect.height, 1)), ay: ny };
    };
    const onMove = (e: PointerEvent) => {
      const p = toAspect(e);
      if (!state.pHas) { state.px = p.ax; state.py = p.ay; }
      state.tpx = p.ax;
      state.tpy = p.ay;
      state.tvx = p.nx;
      state.tvy = p.ny;
      state.pHas = true;
    };
    const onLeave = () => { state.pHas = false; };
    const onDown = (e: PointerEvent) => {
      if (!propsRef.current.clickRipples) return;
      const p = toAspect(e);
      state.ripples.push({ x: p.ax, y: p.ay, t0: performance.now() / 1000 });
      if (state.ripples.length > MAX_RIPPLES) state.ripples.shift();
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    /* ---- frame ---- */
    const frame = (nowMs: number) => {
      state.raf = 0;
      if (state.disposed) return;
      const gl = state.gl;
      if (!gl || gl.isContextLost()) return;

      const p = propsRef.current;
      const now = nowMs / 1000;
      const dt = Math.min(0.1, state.last ? now - state.last : 0.016);
      state.last = now;

      resize();
      const W = state.width, H = state.height;
      const aspect = W / H;

      if (!p.paused && !state.reduced) state.time += dt * 0.5 * (p.speed ?? 1) * (p.flow ?? 1);

      // colours
      const bg = parseColor(p.backgroundColor, [0.04, 0.04, 0.04, 1]);
      const c = Array.isArray(p.colors) && p.colors.length ? p.colors : ["#6A4BFF", "#E4DBFF"];
      const ca = parseColor(c[0], [0.42, 0.29, 1, 1]);
      const cb = parseColor(c[1] ?? c[0], [0.89, 0.86, 1, 1]);
      const transparent = bg[3] < 0.5;
      const ink = !transparent && luminance(bg) > 0.5;

      gl.viewport(0, 0, W, H);
      if (transparent) gl.clearColor(0, 0, 0, 0);
      else gl.clearColor(bg[0], bg[1], bg[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (ink || transparent) gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      else gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);

      // strands
      const n = Math.max(1, Math.min(MAX_STRANDS, Math.round(p.strands ?? 8)));
      const key = n + "|" + (p.seed ?? 0);
      let strandData = state.strandData;
      if (key !== state.strandKey || !strandData) {
        state.strandKey = key;
        strandData = buildStrands(n, p.seed ?? 0);
        state.strandData = strandData;
      }

      // pointer easing: position, push strength, parallax
      const active = p.interactive && state.pHas;
      const ease = 1 - Math.pow(0.0001, dt);
      const lpx = state.px, lpy = state.py;
      state.px += (state.tpx - state.px) * Math.min(1, ease * 3);
      state.py += (state.tpy - state.py) * Math.min(1, ease * 3);
      const speedNow = active ? Math.hypot(state.px - lpx, state.py - lpy) / Math.max(dt, 1e-3) : 0;
      const pushTarget = active ? Math.min(1, speedNow * 0.35) : 0;
      state.pPush += (pushTarget - state.pPush) * (pushTarget > state.pPush ? 0.35 : 0.06);
      const vx = active ? state.tvx : 0, vy = active ? state.tvy : 0;
      state.vx += (vx - state.vx) * Math.min(1, ease * 1.2);
      state.vy += (vy - state.vy) * Math.min(1, ease * 1.2);

      const rad = Math.PI / 180;
      const par = p.interactive ? (p.parallax ?? 1) : 0;
      const rollR = (p.roll ?? 0) * rad;
      const tiltR = ((p.tilt ?? 0) - state.vy * 9 * par) * rad;
      const turnR = ((p.turn ?? 0) + state.vx * 12 * par) * rad;

      const L = state.loc;
      gl.uniform4fv(L.uStrand, strandData);
      gl.uniform1f(L.uStrands, n);
      gl.uniform1f(L.uTime, state.time);
      gl.uniform1f(L.uAmp, p.amplitude ?? 1);
      gl.uniform1f(L.uFreq, p.frequency ?? 1);
      gl.uniform1f(L.uThick, p.thickness ?? 0.7);
      gl.uniform1f(L.uDepth, p.depth ?? 1);
      gl.uniform3f(L.uRot, rollR, tiltR, turnR);
      gl.uniform1f(L.uZoom, p.zoom ?? 1);
      gl.uniform1f(L.uScale, Math.hypot(aspect, 1) * 0.95);
      gl.uniform1f(L.uAspect, aspect);
      gl.uniform2f(L.uRes, W, H);
      gl.uniform1f(L.uN, state.n);
      gl.uniform1f(L.uDotSize, p.dotSize ?? 1);
      const soft = Math.min(1, Math.max(0, p.softness ?? 0.6));
      gl.uniform1f(L.uSoft, soft);
      gl.uniform1f(L.uSoftF, soft);
      gl.uniform1f(L.uColorShift, p.colorShift ?? 0.3);
      gl.uniform3f(L.uPointer, state.px, state.py, active ? state.pPush * (p.brush ?? 1) : 0);
      gl.uniform1f(L.uBrushR, p.brushRadius ?? 0.2);
      gl.uniform3f(L.uColA, ca[0], ca[1], ca[2]);
      gl.uniform3f(L.uColB, cb[0], cb[1], cb[2]);
      gl.uniform1f(L.uIntensity, p.intensity ?? 1);
      gl.uniform1f(L.uInk, ink ? 1 : 0);

      // ripples (real time so clicks still work while the flow is paused)
      const rip = new Float32Array(MAX_RIPPLES * 4);
      const t = performance.now() / 1000;
      state.ripples = state.ripples.filter((r) => t - r.t0 < 4);
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const r = state.ripples[i];
        rip[i * 4 + 0] = r ? r.x : 0;
        rip[i * 4 + 1] = r ? r.y : 0;
        rip[i * 4 + 2] = r ? t - r.t0 : -1;
        rip[i * 4 + 3] = r ? 1 : 0;
      }
      gl.uniform4fv(L.uRip, rip);

      gl.drawArrays(gl.POINTS, 0, state.count);
      schedule();
    };

    const schedule = () => {
      if (!state.raf && !state.disposed && state.visible) state.raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        if (state.visible) { state.last = 0; schedule(); }
      },
      { threshold: 0 }
    );
    io.observe(root);

    const ro = new ResizeObserver(() => schedule());
    ro.observe(root);

    const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(state.raf); state.raf = 0; };
    const onRestored = () => { if (setup()) schedule(); };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    try {
      if (setup()) schedule();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    return () => {
      state.disposed = true;
      cancelAnimationFrame(state.raf);
      io.disconnect();
      ro.disconnect();
      mq?.removeEventListener?.("change", onMq);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      const gl = state.gl;
      if (gl) {
        if (state.buf) gl.deleteBuffer(state.buf);
        if (state.prog) gl.deleteProgram(state.prog);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      apiRef.current.rebuild = () => {};
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative isolate w-full overflow-hidden ${className}`}
      style={{ backgroundColor, position: "relative", width: "100%", height: "100%", overflow: "hidden", touchAction: "none", ...style }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full" />
      {children ? <div className="relative z-10 size-full">{children}</div> : null}
    </div>
  );
}
