"use client";

import React, { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/contexts/NavbarContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { Theme } from "@/contexts/ThemeContext";

const THEMES: { name: Theme; color: string }[] = [
  { name: "amber", color: "#ffb000" },
  { name: "ruby", color: "#ff3366" },
  { name: "emerald", color: "#00ff9d" },
  { name: "sapphire", color: "#00a8ff" },
  { name: "violet", color: "#9d00ff" },
];

const LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "TEAM", href: "/team" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = memo(() => {
  const pathname = usePathname();
  const { isPowered, setIsPowered } = useNavbar();
  const { theme, setTheme } = useTheme();
  const [selectedChannel, setSelectedChannel] = useState(() => {
    return LINKS.findIndex((link) => link.href === pathname);
  });

  const handleChannelChange = useCallback((index: number) => {
    setSelectedChannel(index);
  }, []);

  if (!isPowered) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={() => setIsPowered(true)}
        className="fixed left-4 top-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border-2 border-[var(--matrix-color)] flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            opacity: [0.5, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-4 h-4 rounded-full bg-[var(--matrix-color)]"
        />
      </motion.button>
    );
  }

  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen z-50 p-4"
    >
      <motion.div
        className="h-full w-36 bg-black rounded-2xl border border-[var(--matrix-color-30)] shadow-lg flex flex-col items-center gap-4 p-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Brand Display */}
        <motion.div
          className="w-full bg-black rounded-lg border-2 border-[var(--matrix-color-30)] p-2 relative overflow-hidden"
          animate={{
            boxShadow: [
              "0 0 0px var(--matrix-color)",
              "0 0 10px var(--matrix-color)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.div
            className="font-mono text-center text-[var(--matrix-color)] text-sm relative z-10"
            animate={{
              opacity: [1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            AXIOM-RC v2.0
          </motion.div>
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
        </motion.div>

        {/* Channel Display */}
        <div className="w-full space-y-2">
          <div className="w-full bg-black rounded-lg border-2 border-[var(--matrix-color-30)] p-2 relative overflow-hidden">
            <div className="font-mono text-center text-[var(--matrix-color)] text-xs mb-1">
              CH-{(selectedChannel + 1).toString().padStart(2, "0")}
            </div>
            <motion.div
              className="text-[8px] font-mono text-center text-[var(--matrix-color-50)]"
              animate={{ opacity: [1, 0.8] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {LINKS[selectedChannel]?.label || "NO SIGNAL"}
            </motion.div>
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
          </div>
          {/* Signal Strength */}
          <div className="flex justify-between px-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-1 bg-[var(--matrix-color)] rounded-sm"
                animate={{
                  opacity: i <= selectedChannel ? [0.5, 1] : 0.3,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="w-full space-y-2">
          <div className="text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            CHANNEL SELECT
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {LINKS.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.button
                    onClick={() => handleChannelChange(index)}
                    className={`w-full rounded-lg border-2 relative ${
                      isActive
                        ? "bg-[var(--matrix-color-20)] border-[var(--matrix-color)]"
                        : "bg-black border-[var(--matrix-color-30)] hover:border-[var(--matrix-color)]"
                    } flex flex-col items-center justify-center py-2 gap-1`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`font-mono text-lg ${
                        isActive
                          ? "text-[var(--matrix-color)]"
                          : "text-[var(--matrix-color-50)]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-[8px] font-mono text-[var(--matrix-color-50)]">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-[var(--matrix-color)]"
                        animate={{ opacity: [1, 0.5] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Theme Controls */}
        <div className="w-full space-y-2">
          <div className="text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            COLOR ADJUST
          </div>
          <div className="grid grid-cols-3 gap-1">
            {THEMES.map((t) => (
              <motion.button
                key={t.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(t.name)}
                className={`aspect-square rounded-lg border-2 relative ${
                  theme === t.name
                    ? "border-[var(--matrix-color)] bg-[var(--matrix-color-20)]"
                    : "border-[var(--matrix-color-30)] bg-black"
                } flex items-center justify-center group`}
              >
                <div
                  className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: t.color }}
                />
                {theme === t.name && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-[var(--matrix-color)]"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Volume Controls */}
        <div className="w-full space-y-2">
          <div className="text-[var(--matrix-color)] text-[10px] font-mono text-center border-b-2 border-[var(--matrix-color-30)] pb-1">
            SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square rounded-lg bg-black border-2 border-[var(--matrix-color-30)] flex items-center justify-center group hover:border-[var(--matrix-color)]"
            >
              <span className="font-mono text-[10px] text-[var(--matrix-color-50)] group-hover:text-[var(--matrix-color)]">
                VOL +
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square rounded-lg bg-black border-2 border-[var(--matrix-color-30)] flex items-center justify-center group hover:border-[var(--matrix-color)]"
            >
              <span className="font-mono text-[10px] text-[var(--matrix-color-50)] group-hover:text-[var(--matrix-color)]">
                VOL -
              </span>
            </motion.button>
          </div>
        </div>

        {/* Power Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPowered(false)}
          className="mt-auto w-full aspect-[2/1] rounded-lg bg-black border-2 border-[var(--matrix-color)] flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <div className="w-6 h-6 rounded-full border-2 border-[var(--matrix-color)] flex items-center justify-center">
            <motion.div
              className="w-3 h-3 bg-[var(--matrix-color)] rounded-full"
              animate={{
                opacity: [1, 0.5],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] text-[var(--matrix-color)]">
              POWER
            </span>
            <span className="font-mono text-[8px] text-[var(--matrix-color-50)]">
              STANDBY
            </span>
          </div>
          {/* Power button glow */}
          <motion.div
            className="absolute inset-0 bg-[var(--matrix-color)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.button>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--matrix-color-30)] rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--matrix-color-30)] rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--matrix-color-30)] rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--matrix-color-30)] rounded-br" />
        </div>
      </motion.div>
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
