"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";

export function RobotCompanion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const move = (event: globalThis.PointerEvent) => {
      const node = ref.current; if (!node) return;
      const box = node.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - box.left - box.width / 2) / (innerWidth / 2)));
      const y = Math.max(-1, Math.min(1, (event.clientY - box.top - box.height / 2) / (innerHeight / 2)));
      node.style.setProperty("--look-x", `${x * 15}deg`);
      node.style.setProperty("--look-y", `${-y * 10}deg`);
    };
    window.addEventListener("pointermove", move, { passive:true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className="robot-companion" ref={ref}><div className="robot-orbit"/><img src="/robot-companion.png" alt="Lucia, a white ceramic robot with a black visor" width="1024" height="1024" fetchPriority="high"/><div className="robot-caption"><span>● LUCIA / ONLINE</span><small>Curious about what you’re building.</small></div></div>;
}

export function Lanyard() {
  const card = useRef<HTMLButtonElement>(null);
  const motion = useRef({x:0,y:0,vx:0,vy:0,drag:false,px:0,py:0});
  useEffect(() => {
    let frame = 0; const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const m = motion.current;
      if (!m.drag) { m.vx = (m.vx - m.x * .035) * .91; m.vy = (m.vy - m.y * .035) * .91; m.x += m.vx; m.y += m.vy; }
      if (card.current) {card.current.style.transform = `translate(${m.x}px,${m.y}px) rotate(${m.x * .07}deg)`; card.current.parentElement?.style.setProperty("--swing",`${m.x * .04}deg`);}
      frame = requestAnimationFrame(tick);
    };
    if (!reduced) tick(); return () => cancelAnimationFrame(frame);
  }, []);
  const down = (e:PointerEvent<HTMLButtonElement>) => { e.currentTarget.setPointerCapture(e.pointerId); Object.assign(motion.current,{drag:true,px:e.clientX,py:e.clientY}); };
  const move = (e:PointerEvent<HTMLButtonElement>) => { const m=motion.current;if(!m.drag)return;m.x=Math.max(-100,Math.min(100,m.x+e.clientX-m.px));m.y=Math.max(-45,Math.min(95,m.y+e.clientY-m.py));m.px=e.clientX;m.py=e.clientY; };
  const release = () => {motion.current.drag=false;};
  return <div className="lanyard-scene"><div className="lanyard-anchor"/><div className="lanyard-ribbon"><span>STEVEN • SOFTWARE TO SILICON •</span></div><button ref={card} className="identity-badge" onPointerDown={down} onPointerMove={move} onPointerUp={release} onPointerCancel={release} onKeyDown={(e)=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();motion.current.vx=e.key==="ArrowLeft"?-12:12;}}} aria-label="Steven identity card. Drag to swing, or use left and right arrow keys."><div className="badge-clip"/><div className="badge-top"><span>INDEPENDENT<br/>EXPLORER</span><b>↗</b></div><div className="badge-monogram">S<span>_</span></div><h3>STEVEN</h3><p>Informatics student<br/>AI · Architecture · Silicon</p><div className="badge-bottom"><span>ALWAYS LEARNING</span><span>2026</span></div><div className="badge-barcode"/></button><p className="lanyard-hint">DRAG TO EXPLORE ↔</p></div>;
}

const domains = [
  {name:"Artificial intelligence",sub:"01 / SOFTWARE",title:"From pixels to understanding.",description:"Exploring how models learn, see, and act—and how to make that intelligence useful beyond the cloud.",items:["Machine learning","Computer vision","Edge AI","AI agents"],path:"DATA → LEARNING → INFERENCE"},
  {name:"Hardware & silicon",sub:"02 / ARCHITECTURE",title:"Give intelligence a physical form.",description:"Following the computation down to logic, memory, data paths, and the silicon that makes it possible.",items:["Digital logic","FPGA","Computer architecture","NPU","Semiconductor"],path:"LOGIC → ARCHITECTURE → SILICON"},
  {name:"Biological intelligence",sub:"03 / NEURAL SYSTEMS",title:"Learn from the original architecture.",description:"Looking at neural systems and biological behavior for ideas that can shape more efficient intelligent machines.",items:["Neural systems","Bio-inspired computing","Computational neuroscience"],path:"NEURONS → CIRCUITS → BEHAVIOR"},
];
export function ResearchExplorer() {
 const [active,setActive]=useState(0);const item=domains[active];
 return <div className="research-explorer"><div className="research-select" role="tablist" aria-label="Research domains">{domains.map((d,i)=><button key={d.name} id={`domain-${i}`} role="tab" aria-selected={active===i} aria-controls="domain-panel" onClick={()=>setActive(i)} onKeyDown={(e)=>{if(e.key==="ArrowDown"||e.key==="ArrowRight"||e.key==="ArrowUp"||e.key==="ArrowLeft"){e.preventDefault();const n=(active+((e.key==="ArrowDown"||e.key==="ArrowRight")?1:2))%3;setActive(n);document.getElementById(`domain-${n}`)?.focus();}}} tabIndex={active===i?0:-1}><small>{d.sub}</small><span>{d.name}</span><b>↗</b></button>)}</div><div className="research-panel" role="tabpanel" id="domain-panel" aria-labelledby={`domain-${active}`}><span className="research-watermark" aria-hidden="true">0{active+1}</span><p className="mono">CONNECTED BY CURIOSITY</p><h3>{item.title}</h3><p>{item.description}</p><div className="research-topics">{item.items.map(x=><span key={x}>{x}</span>)}</div><div className="research-path mono">{item.path}</div></div></div>;
}
