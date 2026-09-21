"use client";

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import { mapNodes, nowItems, projects, timeline, toolGroups } from "@/data/portfolio";
import { HeroPortrait, Lanyard, ResearchExplorer } from "@/components/InteractiveLab";

const progression = ["Software", "AI models", "Edge computing", "Computer architecture", "Silicon", "Biological intelligence"];

const terminalResponses: Record<string, string[]> = {
  help: ["AVAILABLE COMMANDS", "about  skills  research  projects", "hardware  ai  semiconductor  neuroscience", "future  contact  game  clear"],
  about: ["STEVEN / INFORMATICS STUDENT", "Building systems while learning how intelligence moves from algorithms into hardware."],
  skills: ["BUILDING WITH", "Python · PyTorch · TensorFlow · ONNX · OpenCV · Git", "HARDWARE", "FPGA · Digital Logic · Jetson Nano"],
  research: ["CURRENT RESEARCH INTERESTS", "01 Edge AI", "02 Efficient neural networks", "03 FPGA-based acceleration", "04 NPU architecture", "05 Neuromorphic computing", "06 Computational neuroscience"],
  projects: ["PROJECT INDEX", ...projects.map((project) => `${project.number} ${project.title} / ${project.status}`)],
  hardware: ["HARDWARE PATH", "Digital logic → FPGA → computer architecture → NPU → silicon"],
  ai: ["AI PATH", "Computer vision · efficient models · edge inference · agents"],
  semiconductor: ["SEMICONDUCTOR", "A long-term direction. Learning the fundamentals before making claims."],
  neuroscience: ["BIOLOGICAL INTELLIGENCE", "Exploring neural systems for principles that may inform better computational architectures."],
  future: ["VECTOR", "AI × Computer Architecture × Semiconductor × Neuroscience"],
  contact: ["CONTACT CHANNELS", "LinkedIn / Instagram", "Find Steven through the links below."],
  secret: ["THE SYSTEM IS NOT FINISHED.", "THAT IS THE POINT.", "Try: game"],
};

const luciaAnswers: Record<string, string> = {
  "Who is Steven?": "Steven is an Informatics student who prefers building and testing systems to only reading about them.",
  "Show me his AI projects.": "Start with Retinal Edge AI, then look at the bio-inspired controller. They show two very different ways of asking what efficient intelligence can be.",
  "Why semiconductors?": "Because intelligence is not only software. Memory movement, compute, power, and architecture shape what models can become in the real world.",
  "What is he learning?": "Right now: NPU architectures, FPGA acceleration, edge optimization, IC design fundamentals, neuromorphic computing, neuroscience—and Mandarin.",
  "Show me the coolest project.": "The 8-bit FPGA CPU is the clearest look under the hood: instructions become control signals, registers, flags, and visible hardware behavior.",
  "Where is he heading?": "Toward research and engineering at the intersection of AI, computer architecture, semiconductors, and neuroscience.",
};

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let frame = 0; let width = 0; let height = 0; const pointer = { x: -999, y: -999 };
    const nodes = Array.from({ length: 34 }, (_, i) => ({ x: (i * 137.5) % 100 / 100, y: (i * 83.7) % 100 / 100, vx: ((i % 3) - 1) * .000025, vy: ((i % 5) - 2) * .000012 }));
    const resize = () => { const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height; const dpr = Math.min(devicePixelRatio, 1.5); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; };
    const draw = () => { ctx.clearRect(0, 0, width, height); nodes.forEach((node) => { node.x += node.vx; node.y += node.vy; if (node.x < 0 || node.x > 1) node.vx *= -1; if (node.y < 0 || node.y > 1) node.vy *= -1; const x = node.x * width; const y = node.y * height; const dx = pointer.x - x; const dy = pointer.y - y; const distance = Math.hypot(dx, dy); const pull = distance < 180 ? (180 - distance) / 180 : 0; const px = x - dx * pull * .018; const py = y - dy * pull * .018; ctx.beginPath(); ctx.arc(px, py, 1.4, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,.38)"; ctx.fill(); }); for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j]; const ax = a.x * width, ay = a.y * height, bx = b.x * width, by = b.y * height; const d = Math.hypot(ax - bx, ay - by); if (d < 135) { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.strokeStyle = `rgba(255,255,255,${.09 * (1 - d / 135)})`; ctx.stroke(); } } frame = requestAnimationFrame(draw); };
    resize(); draw(); addEventListener("resize", resize); canvas.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); canvas.removeEventListener("pointermove", move); };
  }, []);
  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); } }, { threshold: .12 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Terminal({ onGame }: { onGame: () => void }) {
  const [history, setHistory] = useState<{ input: string; output: string[] }[]>([{ input: "boot", output: ["STEVEN.OS v0.26", "Type ‘help’ to inspect the system."] }]);
  const [value, setValue] = useState(""); const inputRef = useRef<HTMLInputElement>(null); const screenRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const screen = screenRef.current; if (screen) screen.scrollTop = screen.scrollHeight; }, [history]);
  function run(raw: string) { const command = raw.trim().toLowerCase(); if (!command) return; if (command === "clear") setHistory([]); else if (command === "game") { setHistory((h) => [...h.slice(-29), { input: command, output: ["Opening TRAIN THE NPU…"] }]); onGame(); } else setHistory((h) => [...h.slice(-29), { input: command, output: terminalResponses[command] || [`COMMAND NOT FOUND: ${command}`, "Type ‘help’ or use the command buttons above."] }]); setValue(""); }
  function submit(event: FormEvent) { event.preventDefault(); run(value); }
  return <div className="terminal">
    <div className="terminal-bar"><span>STEVEN.OS</span><span>INTERACTIVE GUIDE</span></div>
    <div className="terminal-shortcuts"><p id="terminal-help">Choose a command below, or type one and press Enter.</p><div>{["about", "projects", "research", "skills", "help", "clear"].map(command => <button type="button" key={command} onClick={() => run(command)}>{command}</button>)}</div></div>
    <div className="terminal-screen" ref={screenRef} role="log" aria-live="polite" aria-label="Command responses" tabIndex={0}>{history.map((entry, index) => <div className="terminal-entry" key={`${entry.input}-${index}`}><p><b>steven@mind:~$</b> {entry.input}</p>{entry.output.map((line, i) => <p className="terminal-output" key={i}>{line || " "}</p>)}</div>)}</div>
    <form onSubmit={submit} className="terminal-form"><label htmlFor="terminal-input" aria-label="Command">&gt;</label><input id="terminal-input" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="Try help or projects…" aria-label="Enter a Steven OS command" aria-describedby="terminal-help" /><button type="submit" disabled={!value.trim()}>Run ↵</button></form>
  </div>;
}

function TrainNpu({ close }: { close: () => void }) {
  const tasks = [{ label: "UI LOGIC", unit: "CPU" }, { label: "PARALLEL PIXELS", unit: "GPU" }, { label: "MODEL INFERENCE", unit: "NPU" }];
  const [round, setRound] = useState(0); const [score, setScore] = useState(0); const [message, setMessage] = useState("Route each packet to the right compute unit.");
  function choose(unit: string) { if (round >= tasks.length) return; const correct = tasks[round].unit === unit; setScore((s) => s + (correct ? 1 : 0)); setMessage(correct ? "ROUTE ACCEPTED" : `MISROUTED / ${tasks[round].label} → ${tasks[round].unit}`); setRound((r) => r + 1); }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}><section className="game-modal" role="dialog" aria-modal="true" aria-labelledby="game-title"><button className="modal-close" onClick={close} aria-label="Close game">×</button><p className="eyebrow mono">EASTER EGG / SIM_01</p><h3 id="game-title">TRAIN THE NPU</h3>{round < tasks.length ? <><div className="packet"><span>DATA PACKET</span><strong>{tasks[round].label}</strong></div><div className="compute-units">{["CPU", "GPU", "NPU"].map((unit) => <button key={unit} onClick={() => choose(unit)}><span>{unit}</span><small>{unit === "CPU" ? "Sequential control" : unit === "GPU" ? "Parallel graphics" : "Neural inference"}</small></button>)}</div></> : <div className="game-result"><span>{score}/3</span><p>{score === 3 ? "ACCELERATOR TRAINED." : "ARCHITECTURE NEEDS ANOTHER PASS."}</p><button onClick={() => { setRound(0); setScore(0); setMessage("Route each packet to the right compute unit."); }}>RESTART</button></div>}<p className="game-message mono">{message}</p></section></div>;
}

function Lucia() {
  const [open, setOpen] = useState(false); const [answer, setAnswer] = useState("Hello. I’m Lucia. I can show you around Steven’s work.");
  return <aside className={`lucia ${open ? "open" : ""}`} aria-label="Lucia site guide"><button className="lucia-core" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open Lucia guide"><span /><i /></button>{open && <div className="lucia-panel"><div className="lucia-head"><span className="mono">LUCIA / LOCAL GUIDE</span><button onClick={() => setOpen(false)} aria-label="Close Lucia">×</button></div><p aria-live="polite">{answer}</p><div className="lucia-prompts">{Object.keys(luciaAnswers).map((prompt) => <button key={prompt} onClick={() => setAnswer(luciaAnswers[prompt])}>{prompt}</button>)}</div></div>}</aside>;
}

function LocalTime() { const [time, setTime] = useState(""); useEffect(() => { const update = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date())); update(); const id = setInterval(update, 1000); return () => clearInterval(id); }, []); return <span suppressHydrationWarning>LOCAL TIME: {time || "--:--:--"}</span>; }

export default function Home() {
  const [booted, setBooted] = useState(false); const [gameOpen, setGameOpen] = useState(false); const [projectOpen, setProjectOpen] = useState<number | null>(null);
  useEffect(() => { const id = setTimeout(() => setBooted(true), 900); return () => clearTimeout(id); }, []);
  return <>
    <div className={`boot ${booted ? "done" : ""}`} aria-hidden={booted}><div><span className="mono">BOOTING STEVEN.OS</span><i><b /></i><em className="mono">100%</em></div></div>
    <main>
      <header className="site-header"><a className="wordmark" href="#top" aria-label="Steven, home">S.</a><nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#map">Map</a><a href="#about">About</a><a href="#contact">Contact</a></nav><span className="status">SYSTEM / LEARNING</span></header>
      <section className="hero" id="top">
        <div className="hero-kicker mono"><span className="live-dot" /> AN INDEPENDENT EXPLORATION OF INTELLIGENCE</div>
        <div className="hero-copy"><p className="hero-overline">Steven / Informatics student</p><h1>Software.<br /><span>Silicon.</span><br /><em>Something more.</em></h1><p className="hero-thesis">Building intelligence from the ground up.</p><a className="hero-action" href="#work">Explore my experiments <span>↗</span></a></div>
        <div className="hero-portrait-stage"><HeroPortrait /></div>
        <div className="hero-bottom"><p>AI & machine learning<br />Hardware & architecture<br />Biological intelligence</p><span className="mono">A WORK IN PROGRESS.<br />BY DESIGN.</span><a className="scroll-cue mono" href="#manifesto">ENTER THE SYSTEM <span>↓</span></a></div>
      </section>

      <section className="manifesto" id="manifesto"><Reveal><p className="section-index mono">01 / DIRECTION</p><h2>I don&apos;t only want to <em>use</em> intelligence.<br />I want to understand how to <em>build</em> it.</h2></Reveal><div className="progression">{progression.map((item, index) => <Reveal className="progression-reveal" key={item}><div className="progression-row"><span className="mono">0{index + 1}</span><strong>{item}</strong>{index < progression.length - 1 && <span className="arrow" aria-hidden="true">↓</span>}</div></Reveal>)}</div></section>

      <section className="about section-shell" id="about"><div><p className="section-index mono">02 / ABOUT</p><Lanyard /></div><div className="about-copy"><h2>Curiosity, made physical.</h2><p>I&apos;m Steven, an Informatics student fascinated by what happens when artificial intelligence leaves the cloud and moves closer to hardware.</p><p>My work and experiments span computer vision, edge AI, FPGA systems, digital architecture, and—more recently—the hardware foundations of intelligent computing.</p><p>My long-term curiosity goes deeper: understanding intelligence across artificial and biological systems.</p></div></section>

      <section className="os-section section-shell"><div><p className="section-index mono">03 / INTERFACE</p><h2>STEVEN.OS</h2><p className="os-note">A small, local window into the questions, systems, and directions currently running.</p></div><Terminal onGame={() => setGameOpen(true)} /></section>

      <section className="projects" id="work"><div className="section-heading"><p className="section-index mono">04 / SELECTED EXPERIMENTS</p><h2>SELECTED<br />WORK.</h2><p>Completed builds and ongoing experiments. Select a project to explore its technical details.</p></div><div className="project-list">{projects.map((project, index) => <article className={`project ${projectOpen === index ? "open" : ""}`} key={project.number}><button className="project-main" onClick={() => setProjectOpen(projectOpen === index ? null : index)} aria-expanded={projectOpen === index}><span className="project-number mono">{project.number}</span><div><span className="project-category mono">{project.category}</span><h3>{project.title}</h3></div><span className="project-status mono">{project.status}<i>↗</i></span></button>{projectOpen === index && <div className="project-detail"><div><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><dl><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>TECHNICAL NOTES</dt><dd>{project.notes}</dd></div></dl></div>}</article>)}</div></section>

      <section className="map-section" id="map"><div className="section-heading compact"><p className="section-index mono">05 / RESEARCH DIRECTIONS</p><h2>One curiosity.<br />Three frontiers.</h2><p>Explore the connections between learning systems, physical computation, and the biology of intelligence.</p></div><ResearchExplorer /></section>

      <section className="now section-shell"><div><p className="section-index mono">06 / LIVE STATE</p><h2>NOW</h2><p>Currently exploring. Maintained as a single, editable system state.</p></div><ol>{nowItems.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span><strong>{item}</strong><i>→</i></li>)}</ol></section>

      <section className="log section-shell"><div><p className="section-index mono">07 / TRAJECTORY</p><h2>ENGINEERING<br />LOG</h2><p>Past → present → future. A direction of travel, not a list of claims.</p></div><div className="timeline">{timeline.map(([year, item, state], index) => <div className={`timeline-row timeline-${state}`} key={`${year}-${item}`}><span className="mono">{year}</span><strong>{item}</strong><i className="mono">{state === "completed" ? "COMPLETED" : state === "past" ? "PAST" : state === "present" ? "NOW" : "VECTOR"}</i></div>)}</div></section>

      <section className="skills"><div className="section-heading compact"><p className="section-index mono">08 / TOOLS & DOMAINS</p><h2>NO PERCENTAGES.<br />ONLY PRACTICE.</h2></div><div className="skill-groups">{toolGroups.map((group) => <div key={group.title}><h3 className="mono">{group.title}</h3>{group.items.map((item) => <span key={item}>{item}</span>)}</div>)}</div></section>

      <section className="human" id="portrait"><div className="human-image"><img src="/steven-suit-cutout.png" alt="Portrait of Steven wearing a black suit" width="1152" height="1368" loading="lazy" decoding="async" /><span className="mono">STEVEN / STILL EXPLORING</span></div><div className="human-copy"><span className="portrait-eyebrow mono">THE HUMAN BEHIND THE SYSTEM</span><p>Behind the architectures,<br />models and experiments,<br />there&apos;s still a student learning how intelligence works.</p><span className="portrait-signature">Steven.</span></div></section>

      <section className="future"><span className="future-label mono">09 / LONG-TERM VECTOR</span><h2>FUTURE</h2><div className="future-chain"><span>AI</span><i>↓</i><span>ARCHITECTURE</span><i>↓</i><span>SILICON</span><i>↓</i><span>INTELLIGENCE</span></div><p>My goal is not simply to follow where computing is going.<br /><strong>I want to help build what comes next.</strong></p></section>

      <section className="contact" id="contact"><p className="section-index mono">10 / CONTACT</p><h2>LET&apos;S BUILD<br />SOMETHING<br /><em>INTERESTING.</em></h2><div className="contact-links"><a href="https://www.linkedin.com/in/steven-nataniel-kasim-7b9272330" target="_blank" rel="noreferrer">LinkedIn <span>CONNECT ↗</span></a><a href="https://www.instagram.com/steven__.n" target="_blank" rel="noreferrer">Instagram <span>FOLLOW ↗</span></a></div></section>

      <footer><div><b>STEVEN</b><span>INFORMATICS × AI × SILICON</span></div><div className="mono"><span>SYSTEM STATUS: LEARNING</span><LocalTime /><span>BUILD: 2026</span></div><p>Designed as an evolving system.</p><button className="chip-secret" onClick={() => setGameOpen(true)} aria-label="Open hidden Train the NPU game">▦</button></footer>
    </main>
    <Lucia />{gameOpen && <TrainNpu close={() => setGameOpen(false)} />}
  </>;
}
