"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    github: "https://github.com/alexmatrix",
    linkedin: "https://linkedin.com/in/alexmatrix",
  },
  {
    name: "Vaidehi Shah",
    role: "Frontend Lead",
    image: "/team/vaidehi.jpg",
    github: "https://github.com/squantum",
    linkedin: "https://linkedin.com/in/squantum",
  },
  {
    name: "Deepraj Bhati",
    role: "Backend Lead",
    image: "/team/deepraj.jpg",
    github: "https://github.com/mikecyber",
    linkedin: "https://linkedin.com/in/mikecyber",
  },
];

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-[#ff0000] opacity-50 blur-[0.5px]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-[#00ff00] opacity-50 blur-[0.5px]"
        style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)" }}
      >
        {text}
      </span>
    </div>
  );
};

const TeamMemberCard = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-sm border border-[var(--matrix-color-30)] p-6">
          {/* Glitch Effect Background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-color-10)] to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-[url('/glitch-pattern.png')] opacity-10 mix-blend-overlay" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Profile Image */}
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="w-full h-full rounded-full bg-[var(--matrix-color-20)] flex items-center justify-center text-[var(--matrix-color)] text-4xl">
                {member.name[0]}
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[var(--matrix-color)] opacity-50 animate-pulse" />
            </div>

            {/* Name with Glitch Effect */}
            <h3 className="text-2xl font-bold text-center mb-2">
              <GlitchText text={member.name} />
            </h3>

            {/* Role */}
            <p className="text-[var(--matrix-color)] text-center mb-4">
              {member.role}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--matrix-color)] hover:text-[var(--matrix-glow)] transition-colors"
                >
                  GitHub
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--matrix-color)] hover:text-[var(--matrix-glow)] transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[var(--matrix-color-50)]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[var(--matrix-color-50)]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[var(--matrix-color-50)]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[var(--matrix-color-50)]" />
        </div>
      </motion.div>
    );
  }
);

TeamMemberCard.displayName = "TeamMemberCard";

const Team = memo(() => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
              Meet The Team
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our team of passionate developers and researchers pushing the
            boundaries of technology.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Join the Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Want to join our team of innovators?
          </p>
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
            Join The Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

Team.displayName = "Team";

export default Team;
