"use client";

import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Quote } from "lucide-react";

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

const MessageCard = memo(
  ({
    message,
    author,
    role,
    delay,
  }: {
    message: string;
    author: string;
    role: string;
    delay: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--matrix-color-90)] to-[var(--matrix-glow-30)] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative p-6 bg-black/50 backdrop-blur-sm ring-1 ring-[var(--matrix-color-90)] rounded-lg hover:ring-[var(--matrix-color)] transition-all duration-300">
          <Quote className="text-[var(--matrix-color)] mb-4 w-8 h-8" />
          <p className="text-gray-300 mb-6 font-serif italic">{message}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--matrix-color-20)] flex items-center justify-center text-[var(--matrix-color)]">
              {author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[var(--matrix-color)]">
                {author}
              </div>
              <div className="text-sm text-[var(--matrix-color-90)]">
                {role}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

MessageCard.displayName = "MessageCard";

const Leadership = memo(() => {
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
                <CrypticText text="Leadership" />
              </motion.span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Insights from our visionary leaders shaping the future of
              technology
            </p>
          </motion.div>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MessageCard
              message="Our mission is to empower students with the skills and knowledge needed to thrive in the ever-evolving tech landscape. Through hands-on experience and collaborative projects, we're building the next generation of innovators."
              author="Dr. John Smith"
              role="Faculty Advisor"
              delay={0.1}
            />
            <MessageCard
              message="At Axiom Club, we believe in learning by doing. Our focus on practical experience and real-world projects helps students bridge the gap between academic knowledge and industry requirements."
              author="Prof. Jane Doe"
              role="Technical Mentor"
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

Leadership.displayName = "Leadership";

export default Leadership;
