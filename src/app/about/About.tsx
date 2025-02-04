"use client";

import React, { memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Code2,
  Cpu,
  Network,
  Braces,
  Users,
  LucideIcon,
} from "lucide-react";
import { eventService } from "@/services/eventService";

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
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
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

  // Fetch data from service
  const projects = eventService.getActiveProjects();
  const techStack = eventService.getTechStack();
  const activities = eventService.getRecentActivities();
  const events = eventService.getUpcomingEvents();
  const stats = eventService.getClubStats();
  const socialLinks = eventService.getSocialLinks();

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
    <section className="min-h-screen relative overflow-hidden bg-black">
      <MatrixRain />

      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale }}
        className="relative min-h-[600px] flex items-center justify-center py-12"
      >
        {/* Simplified Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-[var(--matrix-color)] opacity-30 animate-[spin_40s_linear_infinite]" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              <div className="bg-black rounded-lg border border-[var(--matrix-color)] p-6 font-mono">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="text-[var(--matrix-color)] text-xl font-bold tracking-wider">
                      AXIOM CLUB
                    </div>
                    <div className="h-0.5 w-full bg-[var(--matrix-color)] mt-1" />
                  </div>
                  <div className="text-[var(--matrix-color)] text-sm">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  {/* Left Column - Key Metrics and Activity */}
                  <div className="col-span-8 grid grid-rows-[auto_1fr] gap-4">
                    {/* Top Row - Current Projects and Tech Stack */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Active Projects */}
                      <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                        <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                          <Code2 className="w-4 h-4" />
                          Projects
                        </div>
                        <div className="space-y-4">
                          {projects.map((project) => (
                            <div key={project.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-[var(--matrix-color)]">
                                  {project.name}
                                </span>
                                <span className="text-[var(--matrix-color-90)]">
                                  {project.tech}
                                </span>
                              </div>
                              <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[var(--matrix-color)] rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                        <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                          <Braces className="w-4 h-4" />
                          Tech Stack
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {techStack.map((stack) => (
                            <div key={stack.category} className="space-y-1">
                              <div className="text-[var(--matrix-color-90)] text-xs">
                                {stack.category}
                              </div>
                              <div className="space-y-0.5">
                                {stack.techs.map((tech) => (
                                  <div
                                    key={tech}
                                    className="text-xs text-[var(--matrix-color)]"
                                  >
                                    {tech}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                      <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Recent Activities
                      </div>
                      <div className="space-y-3 overflow-auto max-h-[300px]">
                        {activities.map((activity) => (
                          <div
                            key={activity.date}
                            className="flex items-start gap-3 text-xs border-l-2 border-[var(--matrix-color)] pl-3"
                          >
                            <div className="text-[var(--matrix-color-90)]">
                              {activity.date}
                            </div>
                            <div>
                              <div className="text-[var(--matrix-color)] font-medium">
                                {activity.event}
                              </div>
                              <div className="text-[var(--matrix-color-90)]">
                                {activity.details}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-4 space-y-4">
                    {/* Stats */}
                    <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                      <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Stats
                      </div>
                      <div className="space-y-3">
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex justify-between items-center"
                          >
                            <span className="text-[var(--matrix-color-90)] text-xs">
                              {stat.label}
                            </span>
                            <span className="text-[var(--matrix-color)] text-lg font-bold">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                      <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Upcoming
                      </div>
                      <div className="space-y-3">
                        {events.map((event) => (
                          <div
                            key={event.date}
                            className="flex items-start gap-2 text-xs"
                          >
                            <div className="text-[var(--matrix-color)] font-medium min-w-[60px]">
                              {event.date}
                            </div>
                            <div>
                              <div className="text-[var(--matrix-color-90)]">
                                {event.event}
                              </div>
                              <div className="text-[var(--matrix-color-90)] opacity-60">
                                {event.type}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-lg border border-[var(--matrix-color)] p-4">
                      <div className="text-[var(--matrix-color)] text-sm font-bold mb-4 flex items-center gap-2">
                        <Network className="w-4 h-4" />
                        Connect
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="text-[var(--matrix-color-90)] text-xs">
                          Join our Discord community for discussions, events,
                          and collaboration
                        </div>
                        <a
                          href={`https://${socialLinks.discord}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[var(--matrix-color)] hover:opacity-80"
                        >
                          {socialLinks.discord}
                        </a>
                        <div className="text-[var(--matrix-color-90)] text-xs">
                          Follow our GitHub for project updates
                        </div>
                        <a
                          href={`https://${socialLinks.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[var(--matrix-color)] hover:opacity-80"
                        >
                          {socialLinks.github}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
        </div>
      </div>

      {/* History & Timeline Section */}
      <div className="container mx-auto px-4 py-20 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From humble beginnings to technological excellence
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[var(--matrix-color-30)]" />
            {[
              {
                year: "2023",
                title: "Club Foundation",
                description:
                  "Axiom Club was established with a vision to revolutionize tech education.",
              },
              {
                year: "2023",
                title: "First Hackathon",
                description:
                  "Successfully organized our first internal hackathon with 50+ participants.",
              },
              {
                year: "2024",
                title: "Project Milestones",
                description:
                  "Launched multiple successful projects and established industry partnerships.",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <div className="text-[var(--matrix-color)] font-mono text-xl mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--matrix-color)] rounded-full border-4 border-black" />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements & Impact Section */}
      <div className="container mx-auto px-4 py-20 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Achievements & Impact
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "50+",
                label: "Active Members",
                description: "Passionate developers and innovators",
              },
              {
                number: "10+",
                label: "Projects Completed",
                description: "From web apps to AI solutions",
              },
              {
                number: "5+",
                label: "Industry Partners",
                description: "Collaborating for innovation",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300 text-center">
                  <div className="text-4xl font-bold text-[var(--matrix-color)] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-300">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-4 py-20 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Pushing boundaries and embracing new technologies",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description: "Working together to achieve greater results",
              },
              {
                icon: "🎯",
                title: "Excellence",
                description:
                  "Striving for the highest quality in everything we do",
              },
              {
                icon: "🌱",
                title: "Growth",
                description: "Continuous learning and personal development",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6 hover:border-[var(--matrix-color)] transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="container mx-auto px-4 py-20 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color)] rounded-lg p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                  Join Axiom Club
                </span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Ready to be part of something extraordinary? Join our community
                of innovators and shape the future of technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Learn",
                  description:
                    "Access workshops, tutorials, and hands-on projects",
                },
                {
                  title: "Build",
                  description: "Work on real projects with cutting-edge tech",
                },
                {
                  title: "Connect",
                  description: "Network with industry professionals and peers",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Apply Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="container mx-auto px-4 py-20 border-t border-[var(--matrix-color-30)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Resources
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Documentation",
                description:
                  "Access our comprehensive guides and documentation",
                link: "#",
              },
              {
                title: "GitHub Repository",
                description:
                  "Explore our open-source projects and contributions",
                link: "#",
              },
              {
                title: "Learning Path",
                description: "Follow our curated learning paths and tutorials",
                link: "#",
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-black/40 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6 hover:border-[var(--matrix-color)] transition-colors h-full">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--matrix-color)] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <div className="text-[var(--matrix-color)] font-mono text-sm">
                    {">"} Learn more
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
