import { LatheGeometry } from 'three/src/geometries/LatheGeometry.js';
import { Vector2 } from 'three/src/math/Vector2.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import { Matrix4 } from 'three/src/math/Matrix4.js';
import { Euler } from 'three/src/math/Euler.js';
import { useEffect, useRef } from 'react';




// Project the same lit geometry to a transparent canvas on devices without WebGL.
export function WaterDrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const profile = Array.from({length:49}, (_, i) => {
      const t = i / 48;
      return new Vector2(1.12 * Math.sin(Math.PI * t) ** .54 * (1-t) ** .72, 2*t-1);
    });
    const geometry = new LatheGeometry(profile, 80);
    geometry.computeBoundingSphere();
    const radius = geometry.boundingSphere!.radius;
    const points = geometry.getAttribute('position');
    const normals = geometry.getAttribute('normal');
    const indices = geometry.getIndex()!.array;
    const vertices = Array.from({ length: points.count }, () => new Vector3());
    const direction = new Vector3();
    const matrix = new Matrix4();
    const faces: { a: number; b: number; c: number; depth: number; tone: number }[] = [];
    for (let i = 0; i < indices.length; i += 3) {
      faces.push({ a: indices[i], b: indices[i+1], c: indices[i+2], depth: 0, tone: 0 });
    }
    let tiltX = 0, tiltY = 0, frame = 0;
    function paint() {
      frame = 0;
      if (!canvas || !ctx) return;
      const {width, height} = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width*dpr);
      canvas.height = Math.round(height*dpr);
      const scale = Math.min(width,height) * .47 / radius;
      ctx.setTransform(dpr*scale,0,0,-dpr*scale,canvas.width/2,canvas.height/2);
      matrix.makeRotationFromEuler(new Euler(.13+tiltY,-.25+tiltX,-.12));
      vertices.forEach((v,i) => v.fromBufferAttribute(points,i).applyMatrix4(matrix));
      for (const face of faces) {
        face.depth = vertices[face.a].z + vertices[face.b].z + vertices[face.c].z;
        direction.fromBufferAttribute(normals,face.a).applyMatrix4(matrix);
        const band = Math.cos(7.8*direction.y + 2.4*direction.x);
        face.tone = Math.round(39 + 146*(band*.5+.5) + 63*Math.pow(Math.max(0,direction.z),4));
      }
      faces.sort((a,b) => a.depth-b.depth);
      ctx.lineWidth = .65 / scale;
      for (const face of faces) {
        const a=vertices[face.a], b=vertices[face.b], c=vertices[face.c];
        if ((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x) <= 0) continue;
        const t=face.tone;
        ctx.fillStyle = ctx.strokeStyle = 'rgb('+t+','+Math.min(255,t+22)+','+Math.min(255,t+45)+')';
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.lineTo(c.x,c.y); ctx.closePath();
        ctx.fill(); ctx.stroke();
      }
    }
    function schedule() { if (!frame) frame=requestAnimationFrame(paint); }
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    function move(event: PointerEvent) {
      if (!canvas || motion.matches || event.pointerType !== 'mouse') return;
      const box=canvas.getBoundingClientRect();
      tiltX=((event.clientX-box.left)/box.width-.5)*.65;
      tiltY=((event.clientY-box.top)/box.height-.5)*.45;
      schedule();
    }
    function reset() { tiltX=tiltY=0; schedule(); }
    const observer=new ResizeObserver(schedule);
    observer.observe(canvas);
    canvas.addEventListener('pointermove',move);
    canvas.addEventListener('pointerleave',reset);
    schedule();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); geometry.dispose();
      canvas.removeEventListener('pointermove',move); canvas.removeEventListener('pointerleave',reset);
    };
  },[]);
  return <canvas className="metal-study" ref={ref} aria-hidden="true"/>;
}
