"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

interface ActivityCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const ActivityCard = ({
  title,
  description,
  icon,
  delay,
}: ActivityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="relative p-6 bg-black/50 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg overflow-hidden group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--matrix-color-10)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[var(--matrix-color-50)]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[var(--matrix-color-50)]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[var(--matrix-color-50)]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[var(--matrix-color-50)]" />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-[var(--matrix-color)] mb-2">
          {title}
        </h3>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* Hover effect line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-[var(--matrix-color)]"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const WhatWeDo = memo(() => {
  const activities = [
    {
      icon: "🚀",
      title: "Innovation Lab",
      description:
        "Explore cutting-edge technologies and bring your innovative ideas to life through hands-on experimentation and prototyping.",
    },
    {
      icon: "💻",
      title: "Code Crafting",
      description:
        "Master the art of programming with our intensive coding sessions, workshops, and collaborative development projects.",
    },
    {
      icon: "🎨",
      title: "Design Studio",
      description:
        "Create stunning user interfaces and experiences while learning the principles of modern design and user-centered development.",
    },
    {
      icon: "🤖",
      title: "AI & ML Research",
      description:
        "Dive into the world of artificial intelligence and machine learning through research projects and practical applications.",
    },
    {
      icon: "🔒",
      title: "Cybersecurity",
      description:
        "Learn about digital security, ethical hacking, and protecting systems through hands-on security challenges and workshops.",
    },
    {
      icon: "🌐",
      title: "Web3 Development",
      description:
        "Explore blockchain technology, smart contracts, and decentralized applications in our cutting-edge Web3 programs.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[var(--matrix-color-30)]" />
          ))}
        </div>
        <div className="grid grid-rows-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-b border-[var(--matrix-color-30)]" />
          ))}
        </div>
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
              What We Do
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            At Axiom Club, we&apos;re building the future of technology through
            diverse activities and hands-on learning experiences.
          </p>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
});

WhatWeDo.displayName = "WhatWeDo";

export default WhatWeDo;
