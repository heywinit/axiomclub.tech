"use client";

import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircuitBoard,
  Cpu,
  Zap,
  Github,
  Linkedin,
  Globe,
  Twitter,
} from "lucide-react";
import type { TeamMember, TeamSection } from "@/types/team";
import Image from "next/image";

// Mock data - Replace with real data from your service
const TEAM_SECTIONS: TeamSection[] = [
  {
    id: "core",
    title: "Core Team",
    description: "The architects and visionaries driving Axiom Club forward",
    members: [
      {
        id: "1",
        name: "Sarah Chen",
        role: "Founder & Tech Lead",
        bio: "Quantum computing enthusiast and full-stack developer with a passion for building scalable systems.",
        skills: ["Quantum Computing", "System Architecture", "AI/ML", "React"],
        imageUrl: "/team/sarah.jpg",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        website: "https://example.com",
        achievements: ["Forbes 30 Under 30", "Tech Innovation Award 2023"],
        specialization: "Quantum Systems",
        joinedDate: "2022-01",
        status: "active",
      },
      // Add more team members...
    ],
  },
  {
    id: "advisors",
    title: "Technical Advisors",
    description: "Industry veterans guiding our technical direction",
    members: [
      // Add advisor members...
    ],
  },
];

const CircuitPath = memo(() => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <pattern
      id="circuit-pattern"
      x="0"
      y="0"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M 10 0 L 10 10 M 0 10 L 20 10"
        className="stroke-[var(--matrix-color-50)]"
        strokeWidth="0.5"
        fill="none"
      />
      <circle cx="10" cy="10" r="1" className="fill-[var(--matrix-color-50)]" />
    </pattern>
    <rect width="100" height="100" fill="url(#circuit-pattern)" />
  </svg>
));

CircuitPath.displayName = "CircuitPath";

const TeamMemberCard = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <CircuitPath />
          </div>
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[var(--matrix-color-20)]">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-[var(--matrix-color)]" />
                  </div>
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.8 : 0.4,
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--matrix-color)]">
                  {member.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--matrix-color-90)] mb-2">
                  <CircuitBoard className="w-3 h-3" />
                  {member.role}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-[var(--matrix-color-20)] text-[var(--matrix-color-90)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-300 font-serif mt-4 leading-relaxed">
              {member.bio}
            </p>

            <div className="flex items-center gap-4 mt-4">
              {member.github && (
                <motion.a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)]"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)]"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              )}
              {member.twitter && (
                <motion.a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)]"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              )}
              {member.website && (
                <motion.a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)]"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

TeamMemberCard.displayName = "TeamMemberCard";

const Team = memo(() => {
  const [activeSection, setActiveSection] = useState<string>(
    TEAM_SECTIONS[0].id
  );

  return (
    <section className="min-h-screen relative bg-black font-mono">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
        <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--matrix-color-20),transparent)]" />
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 relative"
          >
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 relative z-10">
                <motion.div
                  className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-3"
                  animate={{
                    textShadow: [
                      "0 0 20px var(--matrix-color-50)",
                      "0 0 10px var(--matrix-color-30)",
                      "0 0 20px var(--matrix-color-50)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Zap className="w-12 h-12" />
                  <span>The Innovators</span>
                </motion.div>
              </h1>
              <motion.div
                className="absolute -inset-4 bg-black/50 blur-xl -z-10"
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <p className="text-[var(--matrix-color-90)] max-w-2xl mx-auto">
              Meet the brilliant minds pushing the boundaries of technology and
              innovation at Axiom Club.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Sections Navigation */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-y border-[var(--matrix-color-30)] mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 py-4 overflow-x-auto">
              {TEAM_SECTIONS.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)] transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? "text-[var(--matrix-color)] font-bold"
                      : ""
                  }`}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {TEAM_SECTIONS.map(
              (section) =>
                section.id === activeSection && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-2xl font-bold text-[var(--matrix-color)] mb-2">
                        {section.title}
                      </h2>
                      <p className="text-[var(--matrix-color-90)]">
                        {section.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.members.map((member, index) => (
                        <TeamMemberCard
                          key={member.id}
                          member={member}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
