"use client";

import React, { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Terminal, Github, Linkedin } from "lucide-react";
import { teamService } from "@/services/teamService";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
}

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
  const teamMembers = teamService.getTeam();

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[var(--matrix-color)] mb-4">
            Our Team
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the minds behind the matrix
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-6 bg-black/50 backdrop-blur-sm ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-[var(--matrix-color)] mb-2">
                  {member.name}
                </h3>
                <p className="text-[var(--matrix-color-90)] mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-3">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-full bg-[var(--matrix-color-20)] text-[var(--matrix-color)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  {member.links?.github && (
                    <a
                      href={member.links?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--matrix-color)] hover:text-[var(--matrix-glow)]"
                    >
                      GitHub
                    </a>
                  )}
                  {member.links?.linkedin && (
                    <a
                      href={member.links?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--matrix-color)] hover:text-[var(--matrix-glow)]"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.links?.portfolio && (
                    <a
                      href={member.links?.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--matrix-color)] hover:text-[var(--matrix-glow)]"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
