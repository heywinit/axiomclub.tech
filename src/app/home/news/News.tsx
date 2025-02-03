"use client";

import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useTypewriter from "../../../hooks/useTypewriter";

interface NewsItem {
  date: string;
  title: string;
  content: string;
  tags: string[];
}

const newsItems: NewsItem[] = [
  {
    date: "2024-02-01",
    title: "Axiom Club Launches New AI Research Initiative",
    content:
      "Our team is excited to announce a new research initiative focused on developing cutting-edge AI solutions for real-world problems.",
    tags: ["AI", "Research", "Innovation"],
  },
  {
    date: "2024-01-28",
    title: "Successful Hackathon: Building the Future",
    content:
      "Over 50 participants joined our latest hackathon, creating innovative solutions for sustainable technology.",
    tags: ["Hackathon", "Community", "Tech"],
  },
  {
    date: "2024-01-15",
    title: "New Partnership with Tech Giants",
    content:
      "We're thrilled to announce our new partnerships with leading tech companies to provide better opportunities for our members.",
    tags: ["Partnership", "Growth", "Opportunity"],
  },
];

const TerminalPrompt = memo(() => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-sm text-[var(--matrix-color)] mb-4">
      <span className="opacity-50">axiom@news</span>:
      <span className="opacity-75">~</span>$ echo $TIME
      <br />
      <span className="opacity-75">{time}</span>
      <br />
      <span className="opacity-50">axiom@news</span>:
      <span className="opacity-75">~</span>$ cat latest_news.log
    </div>
  );
});

TerminalPrompt.displayName = "TerminalPrompt";

const NewsItem = memo(({ item, index }: { item: NewsItem; index: number }) => {
  const { displayText, isFinished } = useTypewriter({
    text: `[${item.date}] ${item.title}\n${item.content}`,
    speed: 20,
    delay: index * 1000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className="mb-6 font-mono"
    >
      <div className="text-[var(--matrix-color)] whitespace-pre-wrap">
        {displayText}
        {!isFinished && (
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
        )}
      </div>
      {isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-2"
        >
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded border border-[var(--matrix-color-30)]"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

NewsItem.displayName = "NewsItem";

const News = memo(() => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(32,224,128,.2)_50%,transparent_100%)] bg-[length:100%_3px] animate-matrix" />
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
              Latest Updates
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Stay updated with the latest news and developments from Axiom Club.
          </p>
        </motion.div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/90 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-[var(--matrix-color-10)] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[var(--matrix-color)] text-sm font-mono ml-2">
                axiom_news_terminal
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6">
              <TerminalPrompt />
              {newsItems.map((item, index) => (
                <NewsItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Want to stay in the loop? Subscribe to our newsletter!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-black/50 border border-[var(--matrix-color-30)] rounded-lg text-white focus:outline-none focus:border-[var(--matrix-color)] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

News.displayName = "News";

export default News;
