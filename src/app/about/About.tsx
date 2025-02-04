"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Terminal,
  Code2,
  Cpu,
  Network,
  Braces,
  Users,
  LucideIcon,
} from "lucide-react";

// Dynamically import CRT component with no SSR
const CRT = dynamic(() => import("../../components/CRT"), { ssr: false });

const AboutSection = memo(
  ({
    title,
    content,
    icon: Icon,
    index,
  }: {
    title: string;
    content: string;
    icon: LucideIcon;
    index: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-30)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-30)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[var(--matrix-color-20)] rounded-lg">
              <Icon className="w-6 h-6 text-[var(--matrix-color)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--matrix-color)] mb-2">
                {title}
              </h3>
              <p className="text-gray-300">{content}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

AboutSection.displayName = "AboutSection";

const MatrixRain = memo(() => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const chars = "AXIOMCLUBTECH10".split("");

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "var(--matrix-color)";
      context.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvas]);

  return (
    <canvas
      ref={setCanvas}
      className="fixed inset-0 pointer-events-none opacity-20"
    />
  );
});

MatrixRain.displayName = "MatrixRain";

const About = memo(() => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const sections = [
    {
      title: "Our Mission",
      content:
        "To foster innovation and technical excellence at SVGU through collaborative projects, knowledge sharing, and hands-on experience in cutting-edge technologies.",
      icon: Terminal,
    },
    {
      title: "Technical Focus",
      content:
        "We specialize in full-stack development, systems architecture, machine learning, and cybersecurity, pushing the boundaries of what's possible.",
      icon: Code2,
    },
    {
      title: "Innovation Hub",
      content:
        "Our club serves as a catalyst for technological innovation, providing resources and mentorship to turn ideas into reality.",
      icon: Cpu,
    },
    {
      title: "Community",
      content:
        "We're building a vibrant community of tech enthusiasts, fostering collaboration and growth through workshops, hackathons, and project collaborations.",
      icon: Users,
    },
    {
      title: "Open Source",
      content:
        "We believe in the power of open source. Our projects contribute to the global developer community while providing hands-on experience.",
      icon: Braces,
    },
    {
      title: "Industry Connect",
      content:
        "Bridge the gap between academia and industry through partnerships, guest lectures, and real-world project opportunities.",
      icon: Network,
    },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      <MatrixRain />

      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="container mx-auto px-4 relative z-20">
          <CRT>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 p-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-24 h-24 mx-auto bg-[var(--matrix-color)] rounded-full flex items-center justify-center"
              >
                <Terminal className="w-12 h-12 text-black" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                  About Axiom Club
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Where innovation meets excellence at Sardar Vallabhbhai Global
                University
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex justify-center gap-2"
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--matrix-color)] animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </CRT>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <AboutSection key={section.title} {...section} index={index} />
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 p-8 bg-black/50 rounded-lg border border-[var(--matrix-color-30)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Projects", value: "10+" },
                { label: "Members", value: "20+" },
                { label: "Technologies", value: "15+" },
                { label: "Events", value: "5+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[var(--matrix-color)]">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
