import { Project, FeaturedProject } from "@/types/project";

export const getAllProjects = (): Project[] => [
  {
    title: "Axiom Club Website",
    description:
      "The official website for Axiom Club featuring a unique retro-futuristic interface built with Next.js and React.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Completed",
    github: "https://github.com/axiom-svgu/axiomclub.tech",
    demo: "https://axiomclub.tech",
  },
  {
    title: "Waqt",
    description:
      "A smart task management app that prioritizes tasks based on deadlines and importance using AI.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "Supabase",
    ],
    status: "In Progress",
    github: "https://github.com/axiom-svgu/waqt",
  },
  {
    title: "PairUp",
    description:
      "A Tinder-style matchmaking app that helps university students find study/project partners based on subjects, skills, and availability.",
    tech: [
      "Next.js",
      "React",
      "Express",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Framer Motion",
      "WebSockets",
    ],
    status: "Planned",
    github: "https://github.com/axiomclub/pairup",
  },
  {
    title: "SchedulerSim",
    description:
      "A simulation tool for visualizing how different CPU scheduling algorithms work (e.g., Round Robin, Shortest Job First, Priority Scheduling).",
    tech: ["JavaScript", "React", "D3.js"],
    status: "Planned",
    github: "https://github.com/axiomclub/schedulersim",
  },
  {
    title: "DataCompViz",
    description:
      "A tool to visualize and compare different data compression algorithms (e.g., Huffman, LZW, Run-Length Encoding).",
    tech: ["JavaScript", "React", "D3.js"],
    status: "Planned",
    github: "https://github.com/axiomclub/datacompviz",
  },
  {
    title: "ZenOS",
    description:
      "A basic operating system built from scratch to learn how BIOS, bootloaders, and low-level system architecture work.",
    tech: ["C", "Assembly", "x86/x64 Assembly", "GCC", "QEMU", "Bochs"],
    status: "Planned",
    github: "https://github.com/axiomclub/zenos",
  },
  {
    title: "Rootus",
    description: "A one stop solution to your daily commute needs.",
    tech: ["React", "Express", "TypeScript", "MongoDB", "React Native"],
    status: "Planned",
    github: "https://github.com/axiomclub/rootus",
  },
];

export const getFeaturedProjects = (): FeaturedProject[] => [
  {
    title: "Project Matrix",
    description: "A revolutionary AI-powered code analysis tool",
    image: "/projects/matrix.jpg",
    link: "/projects/matrix",
  },
  {
    title: "Neural Net",
    description: "Deep learning framework for edge computing",
    image: "/projects/neural.jpg",
    link: "/projects/neural",
  },
  {
    title: "Quantum OS",
    description: "Next-gen operating system prototype",
    image: "/projects/quantum.jpg",
    link: "/projects/quantum",
  },
];
