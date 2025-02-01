"use client";

import React, { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = memo(() => {
  const pathname = usePathname();
  const [isPowered, setIsPowered] = useState(true);
  const [knobRotations, setKnobRotations] = useState({
    contrast: 0,
    brightness: 0,
    volume: 0,
  });
  const [displayOpacity, setDisplayOpacity] = useState(1);
  const [displayBrightness, setDisplayBrightness] = useState(1);

  const createKnobSound = useCallback((frequency: number) => {
    type WebkitWindow = Window & {
      webkitAudioContext: typeof AudioContext;
    };

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as WebkitWindow).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

    setTimeout(() => audioContext.close(), 200);
  }, []);

  const togglePower = useCallback(() => {
    createKnobSound(isPowered ? 100 : 400);
    setIsPowered((prev) => !prev);
  }, [createKnobSound, isPowered]);

  const rotateKnob = useCallback(
    (knob: keyof typeof knobRotations) => {
      setKnobRotations((prev) => {
        const newRotation = prev[knob] + 45;

        // Update display properties based on knob type
        switch (knob) {
          case "contrast":
            setDisplayOpacity(Math.max(0.3, 1 - (newRotation % 360) / 360));
            createKnobSound(200);
            break;
          case "brightness":
            setDisplayBrightness(Math.max(0.5, 1 - (newRotation % 360) / 360));
            createKnobSound(300);
            break;
          case "volume":
            createKnobSound(400 + (newRotation % 360));
            break;
        }

        return { ...prev, [knob]: newRotation };
      });
    },
    [createKnobSound]
  );

  const channels = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PROJECTS", href: "/projects" },
    { label: "TEAM", href: "/team" },
    { label: "CONTACT", href: "/contact" },
  ];

  if (!isPowered) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={togglePower}
        className="fixed left-4 top-4 w-8 h-8 rounded-full bg-[var(--matrix-color)] cursor-pointer z-50 shadow-[0_0_15px_var(--matrix-color)]"
        whileHover={{ scale: 1.2 }}
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
          className="w-full h-full rounded-full bg-[var(--matrix-color)] opacity-50"
        />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          filter: `brightness(${displayBrightness})`,
          opacity: displayOpacity,
        }}
        className="fixed left-0 top-0 h-screen w-32 bg-gradient-to-b from-[#1a1a1a] to-[#000000] shadow-[5px_0_25px_rgba(0,0,0,0.7)] z-50 p-4"
      >
        <div className="relative h-full flex flex-col gap-6 items-center rounded-xl bg-black/50 border border-[var(--matrix-color-30)] p-4">
          {/* Matrix Display */}
          <motion.div
            className="flex items-center justify-center p-2 font-mono text-4xl tracking-wider text-center text-green-500"
            animate={{
              opacity: [1, 0.5],
              filter: ["brightness(1)", "brightness(1.2)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {"{x}"}
          </motion.div>

          {/* Control Knobs */}
          <div className="flex flex-col gap-8 items-center">
            {Object.entries(knobRotations).map(([knob, rotation]) => (
              <div key={knob} className="flex flex-col items-center gap-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: rotation }}
                  onClick={() => rotateKnob(knob as keyof typeof knobRotations)}
                  className="w-10 h-10 bg-[#333] rounded-full border-2 border-[#222] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer transform origin-center hover:shadow-[0_0_10px_var(--matrix-color-30)]"
                >
                  <div className="w-1 h-5 bg-[#666] mx-auto mt-2" />
                </motion.div>
                <span className="text-[var(--matrix-color-50)] text-[10px] uppercase font-mono">
                  {knob}
                </span>
              </div>
            ))}
          </div>

          {/* Channel Buttons */}
          <div className="flex flex-col gap-2 w-full">
            {channels.map((channel, index) => {
              const isActive = pathname === channel.href;
              return (
                <Link key={channel.href} href={channel.href}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#1a1a1a" : "#262626",
                        boxShadow: isActive
                          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 0 10px var(--matrix-color-30)"
                          : "inset 0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      className="w-full h-8 rounded border-2 border-[var(--matrix-color-30)] flex items-center justify-between px-2 group"
                    >
                      <span className="w-2 h-2">
                        {isActive && (
                          <motion.div
                            layoutId="channelIndicator"
                            className="w-full h-full rounded-full bg-[var(--matrix-color)]"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--matrix-color-50)]">
                        CH{index + 1}
                      </span>
                    </motion.div>
                  </motion.button>
                </Link>
              );
            })}
          </div>

          {/* Power Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePower}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-auto flex flex-col items-center gap-2"
          >
            <motion.div className="w-6 h-6 rounded-full border-2 border-[var(--matrix-color)] flex items-center justify-center cursor-pointer">
              <motion.div
                animate={{
                  opacity: [0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-2 h-2 rounded-full bg-[var(--matrix-color)]"
              />
            </motion.div>
            <span className="text-[var(--matrix-color-50)] text-[10px] uppercase font-mono">
              Power
            </span>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px]" />

            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[var(--matrix-color-30)] rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--matrix-color-30)] rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--matrix-color-30)] rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[var(--matrix-color-30)] rounded-br-lg" />
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
