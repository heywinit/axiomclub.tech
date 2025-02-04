"use client";

import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Cpu,
  Shield,
  Palette,
  Megaphone,
  Rocket,
  Binary,
} from "lucide-react";

// Types for team members
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  links?: {
    github?: string;
    linkedin?: string;
    email?: string;
    portfolio?: string;
  };
  skills?: string[];
}

interface TeamSection {
  name: string;
  icon: React.ReactNode;
  members: TeamMember[];
}

// Mock data - Replace with real data
const LEADS: TeamMember[] = [
  {
    name: "John Doe",
    role: "Club Lead",
    image: "/team/lead1.jpg",
    bio: "Passionate about building innovative solutions and fostering a collaborative tech community.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "lead@axiomclub.tech",
    },
    skills: ["Full Stack", "System Design", "Team Leadership"],
  },
  {
    name: "Jane Smith",
    role: "Technical Lead",
    image: "/team/lead2.jpg",
    bio: "Experienced in architecting scalable systems and mentoring aspiring developers.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["Architecture", "Cloud Computing", "DevOps"],
  },
  {
    name: "Alex Johnson",
    role: "Innovation Lead",
    image: "/team/lead3.jpg",
    bio: "Driving innovation through emerging technologies and creative problem-solving.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["AI/ML", "Research", "Innovation Strategy"],
  },
];

const TEAM_SECTIONS: TeamSection[] = [
  {
    name: "Development",
    icon: <Code className="w-5 h-5" />,
    members: [
      {
        name: "Member 1",
        role: "Frontend Developer",
        image: "/team/dev1.jpg",
        bio: "Specializes in creating beautiful and responsive user interfaces.",
        skills: ["React", "TypeScript", "UI/UX"],
      },
      // Add more members
    ],
  },
  {
    name: "Systems",
    icon: <Cpu className="w-5 h-5" />,
    members: [
      {
        name: "Member 2",
        role: "Systems Engineer",
        image: "/team/sys1.jpg",
        bio: "Expert in designing and maintaining robust system architectures.",
        skills: ["Linux", "Docker", "AWS"],
      },
      // Add more members
    ],
  },
  {
    name: "Security",
    icon: <Shield className="w-5 h-5" />,
    members: [
      {
        name: "Member 3",
        role: "Security Researcher",
        image: "/team/sec1.jpg",
        bio: "Focused on identifying and mitigating security vulnerabilities.",
        skills: ["Pentesting", "Cryptography", "Network Security"],
      },
      // Add more members
    ],
  },
  {
    name: "Design",
    icon: <Palette className="w-5 h-5" />,
    members: [
      {
        name: "Member 4",
        role: "UI/UX Designer",
        image: "/team/des1.jpg",
        bio: "Creates intuitive and engaging user experiences.",
        skills: ["Figma", "User Research", "Motion Design"],
      },
      // Add more members
    ],
  },
  {
    name: "Content",
    icon: <Megaphone className="w-5 h-5" />,
    members: [
      {
        name: "Member 5",
        role: "Content Strategist",
        image: "/team/con1.jpg",
        bio: "Develops engaging technical content and documentation.",
        skills: ["Technical Writing", "Documentation", "SEO"],
      },
      // Add more members
    ],
  },
];

const TEAM_0X00: TeamMember[] = [
  {
    name: "Hacker 1",
    role: "Full Stack Developer",
    image: "/team/0x001.jpg",
    bio: "Competitive programmer and hackathon enthusiast.",
    skills: ["Competitive Programming", "Rapid Prototyping", "System Design"],
  },
  // Add more members
];

const MemberCard = memo(
  ({ member, isLead = false }: { member: TeamMember; isLead?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative group ${isLead ? "col-span-1" : ""}`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-4 bg-black/50 ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-[var(--matrix-color-50)]">
              <div className="absolute inset-0 bg-[var(--matrix-color-20)] animate-pulse" />
              {/* Add actual images later */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--matrix-color)]">
                {member.name.charAt(0)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--matrix-color)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--matrix-color-90)] mt-1">
                {member.role}
              </p>
            </div>

            <p className="text-gray-300 text-sm">{member.bio}</p>

            {member.skills && (
              <div className="flex flex-wrap gap-2 justify-center">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {member.links && (
              <div className="flex gap-3 text-[var(--matrix-color-90)]">
                {member.links.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--matrix-color)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--matrix-color)] transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.links.email && (
                  <a
                    href={`mailto:${member.links.email}`}
                    className="hover:text-[var(--matrix-color)] transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                )}
                {member.links.portfolio && (
                  <a
                    href={member.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--matrix-color)] transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

MemberCard.displayName = "MemberCard";

const TeamSection = memo(({ section }: { section: TeamSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
            {section.icon}
          </span>
          <h2 className="text-xl font-bold text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
            {section.name} Team
          </h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--matrix-color)] transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {section.members.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

TeamSection.displayName = "TeamSection";

const MatrixOverlay = memo(() => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--matrix-glow-30),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,var(--matrix-color-20),transparent)]" />
  </div>
));

MatrixOverlay.displayName = "MatrixOverlay";

const CrypticText = memo(({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  return (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-block relative cursor-pointer"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative"
          animate={
            isHovered
              ? {
                  y: [0, -2, 0],
                }
              : {}
          }
          transition={{
            duration: 0.2,
            delay: index * 0.02,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          {isHovered && (
            <motion.span
              className="absolute top-0 left-0 text-[var(--matrix-glow)]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {characters[Math.floor(Math.random() * characters.length)]}
            </motion.span>
          )}
          <motion.span
            animate={
              isHovered
                ? {
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.2,
              delay: index * 0.02,
              repeat: Infinity,
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
});

CrypticText.displayName = "CrypticText";

const Team = memo(() => {
  return (
    <section className="min-h-screen py-10 sm:py-20 relative bg-black font-mono">
      <MatrixOverlay />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 relative z-10 text-center">
                <motion.div
                  className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-3 justify-center"
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
                  <span className="opacity-70">[</span>
                  <CrypticText text="The" />
                  <Terminal className="w-8 h-8" />
                  <CrypticText text="Team" />
                  <span className="opacity-70">]</span>
                  <motion.span
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="text-[var(--matrix-color)] opacity-50"
                  >
                    _
                  </motion.span>
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
            <div className="flex items-center justify-center gap-2 text-[var(--matrix-color-90)] mt-4">
              <Terminal className="w-4 h-4" />
              <motion.div
                className="font-mono"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="text-[var(--matrix-color)]">root@axiom</span>
                <span>:</span>
                <span className="opacity-75">~</span>
                <span>$</span>
              </motion.div>
              <motion.span
                className="font-mono"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  overflow: "hidden",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                cat team_manifest.md
              </motion.span>
              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="font-mono text-[var(--matrix-color)]"
              >
                ▊
              </motion.span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-6">
              Meet the minds behind Axiom Club - a collective of innovators,
              developers, and tech enthusiasts.
            </p>
          </motion.div>

          {/* Club Leads */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Rocket className="w-6 h-6" />
              Club Leads
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEADS.map((lead, index) => (
                <MemberCard key={index} member={lead} isLead />
              ))}
            </div>
          </div>

          {/* Team Sections */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Cpu className="w-6 h-6" />
              Specialized Teams
            </motion.h2>
            {TEAM_SECTIONS.map((section, index) => (
              <TeamSection key={index} section={section} />
            ))}
          </div>

          {/* Team 0x00 */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--matrix-color)] mb-8 flex items-center gap-2"
            >
              <Binary className="w-6 h-6" />
              Team 0x00 - Elite Squad
            </motion.h2>
            <div className="p-6 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg">
              <p className="text-gray-300 mb-6">
                Our competitive team that represents Axiom Club in hackathons
                and coding competitions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM_0X00.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
