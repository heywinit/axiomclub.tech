"use client";

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

type LeadershipMessage = {
  name: string;
  role: string;
  message: string;
  image?: string;
};

const leadershipMessages: LeadershipMessage[] = [
  {
    name: "Dr. John Doe",
    role: "Director",
    message:
      "At Axiom Club, we're not just building technology – we're shaping the future. Our students' innovative spirit and dedication to excellence continue to inspire me every day.",
  },
  {
    name: "Prof. Jane Smith",
    role: "Head of Computer Science",
    message:
      "The intersection of academia and practical development at Axiom Club creates an environment where theoretical knowledge transforms into real-world solutions.",
  },
  {
    name: "Dr. Robert Wilson",
    role: "Professor of Software Engineering",
    message:
      "Watching our students grow from learners to innovators is what makes Axiom Club special. Their passion for technology drives our success.",
  },
];

const MessageCard = memo(
  ({
    message,
    isActive,
  }: {
    message: LeadershipMessage;
    isActive: boolean;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : 50,
          scale: isActive ? 1 : 0.9,
        }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="bg-black/70 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-8 h-full">
          <div className="flex flex-col h-full justify-between">
            {/* Message */}
            <div className="flex-grow">
              <p className="text-gray-300 italic text-lg md:text-xl relative mb-8">
                <span className="absolute -left-4 top-0 text-4xl text-[var(--matrix-color-50)]">
                  &ldquo;
                </span>
                {message.message}
                <span className="absolute -right-4 bottom-0 text-4xl text-[var(--matrix-color-50)]">
                  &rdquo;
                </span>
              </p>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 border-t border-[var(--matrix-color-30)] pt-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[var(--matrix-color-20)] flex items-center justify-center text-[var(--matrix-color)] text-2xl">
                  {message.name[0]}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[var(--matrix-color)] opacity-20 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{message.name}</h3>
                <p className="text-[var(--matrix-color)]">{message.role}</p>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Auto-scroll messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % leadershipMessages.length);
    }, 6000); // Change message every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
                Leadership Insights
              </span>
            </h2>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[var(--matrix-color)] to-transparent" />
          </motion.div>

          {/* Messages Carousel */}
          <div className="relative h-[300px] mb-8">
            <AnimatePresence mode="wait">
              {leadershipMessages.map(
                (message, index) =>
                  index === activeIndex && (
                    <MessageCard
                      key={index}
                      message={message}
                      isActive={index === activeIndex}
                    />
                  )
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center justify-between w-[calc(100%+2rem)]">
              <button
                onClick={() =>
                  setActiveIndex(
                    (current) =>
                      (current - 1 + leadershipMessages.length) %
                      leadershipMessages.length
                  )
                }
                className="w-12 h-12 rounded-full bg-black/50 border border-[var(--matrix-color-30)] flex items-center justify-center text-[var(--matrix-color)] hover:bg-[var(--matrix-color-20)] transition-colors"
                aria-label="Previous message"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setActiveIndex(
                    (current) => (current + 1) % leadershipMessages.length
                  )
                }
                className="w-12 h-12 rounded-full bg-black/50 border border-[var(--matrix-color-30)] flex items-center justify-center text-[var(--matrix-color)] hover:bg-[var(--matrix-color-20)] transition-colors"
                aria-label="Next message"
              >
                →
              </button>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2">
            {leadershipMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[var(--matrix-color)] w-6"
                    : "bg-[var(--matrix-color-30)]"
                }`}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Leadership.displayName = "Leadership";

export default Leadership;
