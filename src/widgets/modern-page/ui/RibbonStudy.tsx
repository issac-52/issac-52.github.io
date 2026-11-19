import { useEffect, useRef } from 'react';
import { Euler, Matrix4, Vector3 } from 'three';

// Each lamella follows a local frame on the same closed trefoil.
function makeLamellae() {
  const curve = (t: number) => new Vector3(
    (1 + .42 * Math.cos(3*t)) * Math.cos(2*t),
    (1 + .42 * Math.cos(3*t)) * Math.sin(2*t),
    .65 * Math.sin(3*t)
  );
  return Array.from({length: 148}, (_, i) => {
    const t = 2*Math.PI*i/148;
    const center = curve(t);
    const tangent = curve(t+.001).sub(curve(t-.001)).normalize();
    const outward = new Vector3(tangent.y,-tangent.x,0).normalize();
    const across = tangent.clone().cross(outward).normalize();
    const enamel = (i >= 18 && i <= 33) || (i >= 94 && i <= 105);
    const points = Array.from({length: 32}, (_, j) => {
      const angle = 2*Math.PI*j/32;
      return center.clone()
        .addScaledVector(outward, (.29+.05*Math.cos(t*3))*Math.cos(angle))
        .addScaledVector(across, .245*Math.sin(angle));
    });
    return {center, tangent, points, enamel, depth: 0};
  });
}

export function RibbonStudy() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const plates = makeLamellae();
    const projected = new Vector3();
    const matrix = new Matrix4();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let targetX=0, targetY=0, x=0, y=0, frame=0;
    function draw() {
      frame=0;
      if (!canvas || !ctx) return;
      const box=canvas.getBoundingClientRect();
      const dpr=Math.min(devicePixelRatio,2);
      const w=Math.round(box.width*dpr), h=Math.round(box.height*dpr);
      if (!w || !h) return;
      if (canvas.width !== w || canvas.height !== h) { canvas.width=w; canvas.height=h; }
      ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,w,h);
      const scale=Math.min(w,h)*.287;
      ctx.setTransform(scale,0,0,-scale,w*.5,h*.52);
      x+=(targetX-x)*.17; y+=(targetY-y)*.17;
      matrix.makeRotationFromEuler(new Euler(.46+y,.22+x,-.42));
      for (const plate of plates) plate.depth=projected.copy(plate.center).applyMatrix4(matrix).z;
      plates.sort((a,b)=>a.depth-b.depth);
      for (const plate of plates) {
        projected.copy(plate.center).applyMatrix4(matrix);
        const cx=projected.x, cy=projected.y;
        projected.copy(plate.tangent).applyMatrix4(matrix);
        const light=Math.abs(projected.z);
        const sheen=ctx.createLinearGradient(cx-.24,cy+.14,cx+.24,cy-.14);
        sheen.addColorStop(0,plate.enamel ? '#3b205d' : '#44414f');
        sheen.addColorStop(.26,plate.enamel ? '#c69def' : '#d0cbd4');
        sheen.addColorStop(.46,plate.enamel ? '#70489c' : '#777280');
        sheen.addColorStop(.74,plate.enamel ? '#402650' : '#393842');
        sheen.addColorStop(1,plate.enamel ? '#c39feb' : '#a5a2ae');
        ctx.beginPath();
        plate.points.forEach((point,j)=>{
          projected.copy(point).applyMatrix4(matrix);
          if (j===0) ctx.moveTo(projected.x,projected.y);
          else ctx.lineTo(projected.x,projected.y);
        });
        ctx.closePath();
        ctx.fillStyle=sheen; ctx.fill();
        ctx.lineWidth=.009;
        ctx.strokeStyle=plate.enamel ? 'rgba(226,194,255,.92)' : 'rgba(235,232,244,'+(.42+.52*light)+')';
        ctx.stroke();
      }
      if (Math.abs(targetX-x)+Math.abs(targetY-y)>.001) schedule();
    }
    function schedule() { if (!frame) frame=requestAnimationFrame(draw); }
    function move(e: PointerEvent) {
      if (!canvas || reduced.matches || e.pointerType!=='mouse') return;
      const box=canvas.getBoundingClientRect();
      targetX=((e.clientX-box.left)/box.width-.5)*1.05;
      targetY=((e.clientY-box.top)/box.height-.5)*.72;
      schedule();
    }
    function reset() { targetX=targetY=0; if(reduced.matches) x=y=0; schedule(); }
    const observer=new ResizeObserver(schedule);
    observer.observe(canvas);
    canvas.addEventListener('pointermove',move); canvas.addEventListener('pointerleave',reset);
    reduced.addEventListener('change',reset);
    schedule();
    return ()=>{ cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener('change',reset);
      canvas.removeEventListener('pointermove',move); canvas.removeEventListener('pointerleave',reset); };
  },[]);
  return <canvas ref={ref} className="metal-study ribbon-study" aria-hidden="true"/>;
}
