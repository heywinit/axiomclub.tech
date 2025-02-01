"use client";

import React, { memo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import useTypewriter from "@/hooks/useTypewriter";

// Dynamically import CRT component with no SSR
const CRT = dynamic(() => import("@/components/CRT"), { ssr: false });

// Memoize the terminal text
const terminalText = `[    0.000000] Axiom OS v1.0.0-tech (axiom@svgu) (gcc version 12.3.0) #1 SMP PREEMPT
[    0.052731] Command line: BOOT_IMAGE=/boot/axiom-os root=UUID=axiom-tech ro quiet splash
[    0.134912] Loading project database...
[    0.256731] Initializing project viewer...
[    0.398211] Starting project services:
[    0.412456] * Mounting project filesystem...            [OK]
[    0.534123] * Loading project metadata...              [OK]
[    0.645892] * Starting project compiler...             [OK]
[    0.789234] * Establishing GitHub connections...       [OK]
[    0.892456] * Activating project protocols...          [OK]

[    1.023891] Axiom Club Project Hub - Innovation Showcase
[    1.156234] Environment: Production
[    1.234567] Status: Active

[SYSTEM]: Welcome to Axiom Club Projects
[SYSTEM]: Project Categories:
         ├── Web Development
         ├── Mobile Apps
         ├── AI/ML Solutions
         ├── IoT Projects
         └── Open Source

[SYSTEM]: Project database loaded successfully.
[STATUS]: Ready to explore projects...`;

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  status: "Completed" | "In Progress" | "Planning";
  github?: string;
  demo?: string;
  delay: number;
}

const ProjectCard = memo(
  ({
    title,
    description,
    tech,
    status,
    github,
    demo,
    delay,
  }: ProjectCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02 }}
        className="relative p-6 bg-black/50 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg overflow-hidden group"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-color-10)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[var(--matrix-color-50)]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[var(--matrix-color-50)]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[var(--matrix-color-50)]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[var(--matrix-color-50)]" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-[var(--matrix-color)]">
              {title}
            </h3>
            <span
              className={`text-sm px-2 py-1 rounded ${
                status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : status === "In Progress"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-[var(--matrix-color-20)] text-[var(--matrix-color)]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm px-3 py-1 rounded border border-[var(--matrix-color-30)] text-[var(--matrix-color-50)] hover:bg-[var(--matrix-color-20)] transition-colors"
              >
                GitHub
              </motion.a>
            )}
            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm px-3 py-1 rounded bg-[var(--matrix-color)] text-black hover:bg-[var(--matrix-glow)] transition-colors"
              >
                Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover effect line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-[var(--matrix-color)]"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

const Projects = memo(() => {
  const { displayText, isFinished, skip } = useTypewriter({
    text: terminalText,
    speed: 15,
  });

  // Add keyboard listener for space key
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" && !isFinished) {
        skip();
      }
    },
    [isFinished, skip]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Sample projects data
  const projects = [
    {
      title: "Axiom Club Website",
      description:
        "The official website for Axiom Club featuring a unique retro-futuristic CRT interface built with Next.js and React.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "Completed" as const,
      github: "https://github.com/axiomclub/website",
      demo: "https://axiomclub.tech",
    },
    {
      title: "AI Study Assistant",
      description:
        "An AI-powered study assistant that helps students organize their learning materials and create personalized study plans.",
      tech: ["Python", "TensorFlow", "FastAPI", "React", "MongoDB"],
      status: "In Progress" as const,
      github: "https://github.com/axiomclub/study-assistant",
    },
    {
      title: "IoT Smart Campus",
      description:
        "A network of IoT devices to monitor and optimize energy usage, attendance, and resource management across the campus.",
      tech: ["Arduino", "ESP32", "MQTT", "Node.js", "InfluxDB"],
      status: "Planning" as const,
    },
    {
      title: "Blockchain Voting System",
      description:
        "A secure and transparent voting system for student elections using blockchain technology.",
      tech: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
      status: "In Progress" as const,
      github: "https://github.com/axiomclub/blockchain-voting",
    },
    {
      title: "AR Campus Navigator",
      description:
        "An augmented reality app to help students and visitors navigate the campus and discover points of interest.",
      tech: ["Unity", "ARCore", "C#", "Firebase"],
      status: "Planning" as const,
    },
    {
      title: "Code Review Bot",
      description:
        "A GitHub bot that automates code reviews and enforces coding standards for club projects.",
      tech: ["Python", "GitHub API", "Docker", "ML"],
      status: "Completed" as const,
      github: "https://github.com/axiomclub/review-bot",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-10 sm:py-20 will-change-transform">
      <div className="container mx-auto px-4 h-[calc(100vh-5rem)] sm:h-[calc(100vh-10rem)]">
        <CRT className="h-full sm:h-[85vh]">
          <motion.div
            initial="hidden"
            animate="visible"
            className="p-0 sm:p-8 h-full relative"
          >
            {/* Terminal Section */}
            <motion.div
              className="h-full w-full absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{
                opacity: isFinished ? 0 : 1,
                x: isFinished ? "-100%" : "0%",
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <div className="relative h-full">
                <div className="text-[var(--matrix-color)] font-mono text-sm overflow-hidden h-full">
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap break-words h-full max-w-full"
                  >
                    {displayText}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      _
                    </motion.span>
                  </motion.pre>
                </div>
                {!isFinished && (
                  <motion.div
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/90 px-4 py-2 rounded-lg border-2 border-[var(--matrix-color-50)] text-[var(--matrix-color)] text-base font-mono flex items-center gap-2 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <kbd className="px-2 py-0.5 text-sm bg-[var(--matrix-color-10)] border-2 border-[var(--matrix-color-50)] rounded shadow-[0_0_10px_var(--matrix-color-20)]">
                      space
                    </kbd>
                    <span>Press to skip</span>
                  </motion.div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
              </div>
            </motion.div>

            {/* Projects Grid Section */}
            <motion.div
              className="h-full overflow-y-auto"
              initial={{ opacity: 0, x: "100%" }}
              animate={{
                opacity: isFinished ? 1 : 0,
                x: isFinished ? "0%" : "100%",
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                      Our Projects
                    </span>
                  </h1>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Explore our innovative projects that push the boundaries of
                    technology. From web applications to IoT solutions, discover
                    what we&apos;re building at Axiom Club.
                  </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} delay={index * 0.1} />
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <motion.a
                    href="https://github.com/axiomclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-3 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    View All Projects on GitHub
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </CRT>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
