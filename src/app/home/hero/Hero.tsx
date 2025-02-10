"use client";

import React, { memo, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import useTypewriter from "../../../hooks/useTypewriter";
import Link from "next/link";

// Dynamically import CRT component with no SSR
const CRT = dynamic(() => import("../../../components/CRT"), { ssr: false });

// Memoize the terminal text to prevent unnecessary re-renders
const terminalText = `[    0.000000] Axiom OS v1.0.0-tech (axiom@svgu) (gcc version 12.3.0) #1 SMP PREEMPT
[    0.052731] Command line: BOOT_IMAGE=/boot/axiom-os root=UUID=axiom-tech ro quiet splash
[    0.134912] Loading essential drivers...
[    0.256731] Initializing Axiom development environment...
[    0.398211] Starting core services:
[    0.412456] * Mounting innovation filesystem...           [OK]
[    0.534123] * Loading creative modules...                 [OK]
[    0.645892] * Starting code compiler service...           [OK]
[    0.789234] * Establishing developer connections...       [OK]
[    0.892456] * Activating AI assistance protocols...       [OK]

[    1.023891] Axiom Club Tech Hub - Ready for innovation
[    1.156234] Environment: Production
[    1.234567] Status: Active

[SYSTEM]: Welcome to Axiom Club - Where Innovation Meets Excellence
[SYSTEM]: Capabilities loaded:
         ├── Full-Stack Development
         ├── Systems Architecture
         ├── Machine Learning
         ├── Open Source Projects
         └── Security Research

[SYSTEM]: All systems operational. Ready for creative development.
[STATUS]: Awaiting user input...`;

const Hero = memo(() => {
  const { displayText, isFinished, skip } = useTypewriter({
    text: terminalText,
    speed: 15,
  });

  // Add keyboard listener for space key using useCallback
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" && !isFinished) {
        skip();
        e.preventDefault(); // Prevent default space bar scrolling
      }
    },
    [skip, isFinished]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.2,
          type: "spring",
          stiffness: 400,
        },
      },
      tap: {
        scale: 0.95,
      },
    }),
    []
  );

  return (
    <section className="min-h-screen flex items-center justify-center py-4 sm:py-10 md:py-20 will-change-transform">
      <div className="container mx-auto px-2 sm:px-4 h-[calc(100vh-2rem)] sm:h-[calc(100vh-5rem)] md:h-[calc(100vh-10rem)]">
        <CRT className="h-full sm:h-[60vh]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-2 sm:p-4 md:p-8 h-full relative"
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
                <div className="text-[var(--matrix-color)] font-mono text-xs sm:text-sm overflow-hidden h-full">
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap break-words h-full max-w-full p-2 sm:p-4"
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
                  <motion.button
                    onClick={skip}
                    className="absolute bottom-12 sm:bottom-24 left-1/2 -translate-x-1/2 bg-black/90 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border-2 border-[var(--matrix-color-50)] text-[var(--matrix-color)] text-sm sm:text-base font-mono flex items-center gap-2 backdrop-blur-sm cursor-pointer hover:bg-black/70 active:scale-95 transition-all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <kbd className="px-1 sm:px-2 py-0.5 text-xs sm:text-sm bg-[var(--matrix-color-10)] border-2 border-[var(--matrix-color-50)] rounded shadow-[0_0_10px_var(--matrix-color-20)]">
                      space
                    </kbd>
                    <span>Press to skip</span>
                  </motion.button>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black to-transparent" />
              </div>
            </motion.div>

            {/* Main Content Section */}
            <motion.div
              className="text-white space-y-4 sm:space-y-6 h-full flex flex-col justify-center absolute inset-0"
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
              <div className="relative max-w-4xl mx-auto w-full bg-black/50 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6 sm:p-8 md:p-12">
                {/* Window Header */}
                <div className="absolute -top-3 left-0 right-0 flex justify-between items-center px-2 sm:px-4">
                  <div className="bg-black px-2 sm:px-4 py-1 rounded-full border border-[var(--matrix-color)] text-[var(--matrix-color)] text-[10px] sm:text-xs font-mono">
                    AXIOM_OS {">"}init_future.sh
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-2 sm:w-4 h-2 sm:h-4 border-l-2 border-t-2 border-[var(--matrix-color-50)] rounded-tl" />
                <div className="absolute top-0 right-0 w-2 sm:w-4 h-2 sm:h-4 border-r-2 border-t-2 border-[var(--matrix-color-50)] rounded-tr" />
                <div className="absolute bottom-0 left-0 w-2 sm:w-4 h-2 sm:h-4 border-l-2 border-b-2 border-[var(--matrix-color-50)] rounded-bl" />
                <div className="absolute bottom-0 right-0 w-2 sm:w-4 h-2 sm:h-4 border-r-2 border-b-2 border-[var(--matrix-color-50)] rounded-br" />

                {/* Content */}
                <motion.h1
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.5 }}
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative pb-1 mt-4"
                >
                  <div className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-2 sm:w-3 h-8 sm:h-12 bg-gradient-to-b from-[var(--matrix-color)] to-[var(--matrix-dark)] rounded-full" />
                  <motion.span
                    className="inline-block bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent pb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.7 }}
                  >
                    Design. Code. Create.
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.8 }}
                  className="text-sm sm:text-base md:text-lg text-gray-300 mt-6 border-l-2 border-[var(--matrix-color-30)] pl-2 sm:pl-4"
                >
                  Welcome to{" "}
                  <span className="text-[var(--matrix-color)]">Axiom Club</span>
                  , where innovation meets excellence. We&apos;re a community of
                  passionate tech enthusiasts at{" "}
                  <span className="text-[var(--matrix-color)]">
                    Sardar Vallabhbhai Global University
                  </span>
                  , pushing the boundaries of what&apos;s possible.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.9 }}
                  className="flex flex-row items-center gap-3 mt-6 sm:mt-8"
                >
                  <motion.a
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    href="https://discord.gg/YebuA3HmYn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors relative overflow-hidden group text-center"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Join us
                  </motion.a>
                  <Link href="/projects" passHref>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="px-6 py-2.5 border-2 border-[var(--matrix-color-30)] text-[var(--matrix-color-50)] font-semibold rounded-lg hover:bg-[var(--matrix-color-50)]/10 transition-colors"
                    >
                      Explore Projects
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 1 }}
                  className="flex flex-row items-center justify-start gap-4 text-sm text-gray-400 mt-6 pt-6 border-t border-[var(--matrix-color-30)]"
                >
                  {[
                    { text: "Active Projects: 5+", delay: 1.2 },
                    { text: "Members: 6+", delay: 1.3 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <div className="w-2 h-2 bg-[var(--matrix-color)] rounded-full animate-pulse" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </CRT>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
