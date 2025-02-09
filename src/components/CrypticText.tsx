"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";

interface CrypticTextProps {
  text: string;
}

const CrypticText = memo(({ text }: CrypticTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  return (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-block relative cursor-pointer font-bold text-[var(--matrix-color)]"
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
          <motion.span>{char}</motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
});

CrypticText.displayName = "CrypticText";

export default CrypticText;
