import { useEffect, useRef } from 'react';

type Point = [number, number, number];
const tau = Math.PI * 2;
function center(t: number): Point {
  const radius = 1 + 0.37 * Math.cos(3 * t);
  return [radius * Math.cos(2 * t), radius * Math.sin(2 * t), 0.6 * Math.sin(3 * t)];
}
function unit([x, y, z]: Point): Point {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}
function cross(a: Point, b: Point): Point {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
}
// A tubular trefoil. Dark grooves across its surface reveal the crossings.
const rings = Array.from({ length: 108 }, (_, i) => {
  const t = tau * i / 108;
  const p = center(t);
  const q = center(t + 0.001);
  const tangent = unit([q[0]-p[0], q[1]-p[1], q[2]-p[2]]);
  const u = unit(cross(tangent, [0, 0, 1]));
  const v = cross(tangent, u);
  return Array.from({ length: 18 }, (_, j): Point => {
    const a = tau * j / 18;
    return p.map((n, k) => n + 0.25 * (u[k] * Math.cos(a) + v[k] * Math.sin(a))) as Point;
  });
});
export function SignalSculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let yaw = 0, tilt = 0, frame = 0;
    function draw() {
      if (!el || !ctx) return;
      const w = el.clientWidth, h = el.clientHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(w / 3.65, h / 2.95);
      const points = rings.map(ring => ring.map(([x,y,z]): Point => {
        const b = 0.34 + yaw, a = 0.66 + tilt;
        const dx = x*Math.cos(b)-y*Math.sin(b), dy = x*Math.sin(b)+y*Math.cos(b);
        return [dx, dy*Math.cos(a)-z*Math.sin(a), dy*Math.sin(a)+z*Math.cos(a)];
      }));
      const faces = points.flatMap((ring, i) => ring.map((p,j) => {
        const next = points[(i+1)%points.length], k = (j+1)%ring.length;
        const q = next[j], s = ring[k];
        const n = unit(cross([q[0]-p[0],q[1]-p[1],q[2]-p[2]], [s[0]-p[0],s[1]-p[1],s[2]-p[2]]));
        return { corners: [p,q,next[k],s], depth: (p[2]+next[k][2])/2, light: Math.abs(n[0]*0.34-n[1]*0.72+n[2]*0.58), i };
      })).sort((a,b) => a.depth-b.depth);
      for (const {corners, light, i} of faces) {
        ctx.beginPath();
        corners.forEach(([x,y], k) => {
          const px = w/2+x*scale, py = h/2+y*scale;
          if (k === 0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        });
        ctx.closePath();
        const tone = 21 + 38 * light + 10 * light ** 12 - (i % 3 === 0 ? 9 : 0);
        ctx.fillStyle = ctx.strokeStyle = 'hsl(233 88% '+tone+'%)';
        ctx.lineWidth = 0.8; ctx.stroke(); ctx.fill();
      }
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
    function reset() { yaw = tilt = 0; schedule(); }
    function move(e: PointerEvent) {
      if (!el || reduced.matches || e.pointerType === 'touch') return;
      const box = el.getBoundingClientRect();
      yaw = ((e.clientX-box.left)/box.width-0.5)*0.55;
      tilt = ((e.clientY-box.top)/box.height-0.5)*0.35;
      schedule();
    }
    const observer = new ResizeObserver(schedule); observer.observe(el);
    el.addEventListener('pointermove',move); el.addEventListener('pointerleave',reset);
    reduced.addEventListener('change', reset);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); reduced.removeEventListener('change',reset);
      el.removeEventListener('pointermove',move); el.removeEventListener('pointerleave',reset);
    };
  }, []);
  return <canvas className="io-sculpture" ref={canvas} aria-hidden="true" />;
}
