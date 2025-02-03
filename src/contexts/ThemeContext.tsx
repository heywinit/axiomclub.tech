"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "amber" | "ruby" | "emerald" | "sapphire" | "violet";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage, fallback to "amber"
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("axiom-theme");
      return (savedTheme as Theme) || "amber";
    }
    return "amber";
  });

  // Sync theme with localStorage
  useEffect(() => {
    localStorage.setItem("axiom-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
