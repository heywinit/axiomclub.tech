"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CRT from "../../../components/CRT";
import useTypewriter from "../../../hooks/useTypewriter";

const Hero = () => {
  const terminalText = `> Starting Axiom environment...
> Loading tools...
> Ready

Welcome to Axiom Club
Tech innovation starts here

[SYSTEM]: Active
[USER]: What is Axiom?
[SYSTEM]: A community of developers,
engineers, and innovators at the
forefront of technology.

[USER]: Focus areas?
[SYSTEM]: Current initiatives:
- Full-Stack Development
- Systems Architecture
- Machine Learning
- Open Source
- Security Research

[STATUS]: Ready`;

  const { displayText, isFinished } = useTypewriter({
    text: terminalText,
    speed: 15,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1, // Delay children until typing starts
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
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
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 h-[calc(100vh-10rem)]">
        <CRT className="h-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 grid h-full grid-cols-1 md:grid-cols-2 gap-12 items-stretch"
          >
            <div className="hidden md:block h-full">
              <div className="relative h-full">
                <div className="text-[#ffb000] font-mono text-sm overflow-hidden h-full">
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap h-full"
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
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>

            <AnimatePresence>
              {isFinished && (
                <motion.div
                  variants={itemVariants}
                  className="text-white space-y-6 h-full flex flex-col justify-center"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-bold"
                  >
                    <motion.span
                      className="inline-block bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Welcome to the Future
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-300"
                  >
                    Join the elite community of innovators, developers, and
                    visionaries shaping the future of technology.
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      Join Axiom Club
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="px-6 py-3 border-2 border-amber-500 text-amber-500 font-semibold rounded-lg hover:bg-amber-500/10 transition-colors"
                    >
                      Learn More
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-4 text-sm text-gray-400"
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <span>1000+ Members</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <span>24/7 Active</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CRT>
      </div>
    </section>
  );
};

export default Hero;
