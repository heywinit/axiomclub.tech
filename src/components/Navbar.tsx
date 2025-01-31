"use client";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height (with some buffer)
      const heroHeight = window.innerHeight * 0.8;
      const currentScroll = window.scrollY;

      setVisible(currentScroll > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="crt bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-matrix-green font-bold text-xl neon-text">
                AXIOM
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-matrix-green hover:text-matrix-glow transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-matrix-green hover:text-matrix-glow transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-matrix-green hover:text-matrix-glow transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
