import { useState, useEffect } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const useTypewriter = ({ text, speed = 50, delay = 0 }: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (delay) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    } else {
      setIsTyping(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isTyping]);

  return {
    displayText,
    isFinished: currentIndex === text.length,
  };
};

export default useTypewriter;
