"use client";
import { useEffect, useRef } from "react";

/** A lightweight, projected point cloud; no WebGL or external assets. */
export function IntelligenceCore() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0, w = 0, h = 0, visible = true;
    let pointer = 0;
    const points = Array.from({ length: 2200 }, (_, i) => {
      const y = 1 - (i / 2199) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.39996323;
      return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
    });
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time: number) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        const angle = (reduced ? .4 : time * .00007) + pointer;
        const size = Math.min(w, h) * .35;
        const sorted = points.map(([x, y, z]) => {
          const rx = x * Math.cos(angle) - z * Math.sin(angle);
          const rz = x * Math.sin(angle) + z * Math.cos(angle);
          const wave = 1 + .07 * Math.sin(y * 9 + angle * 3);
          return [rx * wave, y, rz];
        }).sort((a, b) => a[2] - b[2]);
        for (const [x, y, z] of sorted) {
          const perspective = 3 / (3 - z * .4);
          const px = w / 2 + x * size * perspective;
          const py = h / 2 + y * size * perspective;
          ctx.fillStyle = `rgba(235,239,242,${.12 + (z + 1) * .36})`;
          ctx.beginPath(); ctx.arc(px, py, (.45 + (z + 1) * .55) * Math.max(.7,w/700), 0, Math.PI * 2); ctx.fill();
        }
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => { pointer = (event.clientX / innerWidth - .5) * .3; };
    const observer = new ResizeObserver(() => { resize(); if (reduced) draw(0); }); observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(canvas);
    resize(); draw(0); if (!matchMedia("(pointer: coarse)").matches) window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="intelligence-core" aria-label="A slowly rotating sphere of computational nodes" role="img" />;
}
