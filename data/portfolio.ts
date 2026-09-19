export const projects = [
  {
    number: "01", title: "RETINAL EDGE AI", category: "Computer Vision / Medical AI / Edge Computing", year: "2026", status: "EXPLORING",
    description: "Deep-learning based retinal image analysis with efficient models, explored for deployment on resource-constrained edge hardware.",
    tags: ["EfficientNet", "MobileNet", "PyTorch", "ONNX", "Jetson Nano"],
    notes: "Focus: model efficiency, deployment constraints, and a credible path from research code to edge inference.",
  },
  {
    number: "02", title: "8-BIT FPGA CPU", category: "Digital Architecture / FPGA", year: "2026", status: "BUILDING",
    description: "A custom Harvard architecture 8-bit CPU implemented on FPGA with an ALU, control unit, registers, instruction memory, flags, and display interfaces.",
    tags: ["Verilog / VHDL", "FPGA", "Computer Architecture", "Digital Logic", "Xilinx"],
    notes: "Architecture: separate instruction and data paths, a compact instruction set, and visible hardware state for testing.",
  },
  {
    number: "03", title: "BIO-INSPIRED NEURAL CONTROLLER", category: "Neuromorphic Computing / AI Research", year: "2026", status: "EXPERIMENT",
    description: "Exploration of simplified neural pathways inspired by Drosophila navigation circuits and their application to control environments such as CartPole.",
    tags: ["Neural Networks", "Reinforcement Learning", "Bio-inspired Computing", "Neuroscience"],
    notes: "Question: can a compact, biologically informed controller produce useful behavior without hiding complexity behind scale?",
  },
  {
    number: "04", title: "NPU EXPLORATION", category: "AI Hardware / Semiconductor", year: "NEXT", status: "RESEARCHING",
    description: "Architectural studies toward understanding how neural-network accelerators can be prototyped on FPGA and eventually translated toward custom silicon.",
    tags: ["NPU", "MAC Arrays", "Dataflow", "FPGA → ASIC"],
    notes: "Direction: learn the tradeoffs among memory movement, parallelism, precision, power, and programmable control.",
  },
];

export const nowItems = ["NPU architectures", "FPGA acceleration", "Edge AI optimization", "IC design fundamentals", "Neuromorphic computing", "Computational neuroscience", "Mandarin"];

export const timeline = [
  ["2025", "Started deeper exploration into AI", "past"], ["2026", "Edge AI experiments", "present"],
  ["2026", "Medical computer vision research", "present"], ["2026", "FPGA computer architecture", "present"],
  ["2026", "Bio-inspired computing exploration", "present"], ["NEXT", "NPU architecture", "next"], ["FUTURE", "AI silicon research", "future"],
] as const;

export const toolGroups = [
  { title: "BUILDING WITH", items: ["Python", "PyTorch", "TensorFlow", "ONNX", "OpenCV", "NumPy", "Git"] },
  { title: "HARDWARE", items: ["FPGA", "Digital Logic", "Jetson Nano", "Embedded Systems"] },
  { title: "EXPLORING", items: ["IC Design", "NPU Architecture", "Neuromorphic Computing", "VLSI", "Computational Neuroscience"] },
];

export const mapNodes = [
  { label: "Artificial Intelligence", x: 22, y: 28, detail: "Models, learning systems, and agents." },
  { label: "Machine Learning", x: 8, y: 14, detail: "Learning patterns from data." },
  { label: "Computer Vision", x: 8, y: 40, detail: "Turning pixels into useful signals." },
  { label: "Edge AI", x: 27, y: 8, detail: "Inference near the source, under constraints." },
  { label: "AI Agents", x: 30, y: 48, detail: "Systems that reason and take action." },
  { label: "Intelligence", x: 50, y: 50, detail: "The central question: how is useful intelligence built?", center: true },
  { label: "Hardware", x: 78, y: 28, detail: "Where algorithms become physical systems." },
  { label: "Digital Logic", x: 92, y: 14, detail: "The gates beneath computation." },
  { label: "FPGA", x: 92, y: 40, detail: "A reconfigurable laboratory for architecture." },
  { label: "Computer Architecture", x: 72, y: 8, detail: "Data paths, control, memory, and tradeoffs." },
  { label: "NPU", x: 72, y: 49, detail: "Specialized compute for neural workloads." },
  { label: "Semiconductor", x: 91, y: 64, detail: "The material foundation of intelligent machines." },
  { label: "Biological Intelligence", x: 50, y: 82, detail: "Learning from living neural systems." },
  { label: "Neural Systems", x: 31, y: 92, detail: "How networks of cells create behavior." },
  { label: "Bio-inspired Computing", x: 50, y: 96, detail: "Borrowing principles, not merely shapes." },
  { label: "Computational Neuroscience", x: 72, y: 92, detail: "Using computation to understand brains." },
];
