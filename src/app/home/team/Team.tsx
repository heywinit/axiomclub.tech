"use client";

import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Terminal, Github, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Vinesh Rajpurohit",
    role: "Founder & Leader",
    image: "/team/vinesh.jpg",
    github: "https://github.com/heywinit",
    linkedin: "https://www.linkedin.com/in/vinesh-rajpurohit/",
  },
  {
    name: "Vaidehi Shah",
    role: "Frontend Lead",
    image: "/team/vaidehi.jpg",
    github: "https://github.com/VaidehiCodes",
    linkedin: "https://www.linkedin.com/in/vaidehi-shah21/",
  },
  {
    name: "Deepraj Bhati",
    role: "Backend Lead",
    image: "/team/deepraj.jpg",
    github: "https://github.com/byedeep",
    linkedin: "https://www.linkedin.com/in/deepraj-bhati-0210a4330/",
  },
];

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

const TeamMemberCard = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.2 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 backdrop-blur-sm ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[var(--matrix-color-50)]">
              <div className="absolute inset-0 bg-[var(--matrix-color-20)] animate-pulse" />
              {/* Add actual images later */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--matrix-color)] text-2xl">
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

            <div className="flex gap-3 text-[var(--matrix-color-90)]">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--matrix-color)] transition-colors"
                >
                  <Linkedin size={18} />
                </a>
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
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <motion.span
                className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent inline-flex items-center gap-2 justify-center"
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
                <Terminal className="w-8 h-8" />
                <CrypticText text="Core Team" />
              </motion.span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the dedicated individuals driving innovation and excellence
              at Axiom Club
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
