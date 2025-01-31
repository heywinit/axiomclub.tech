import React from "react";
import "../../../styles/theme.css";

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="crt">
          <div className="p-8">
            <h1 className="text-5xl font-bold neon-text mb-6">
              Welcome to Axiom Club
            </h1>
            <p className="text-xl text-matrix-green mb-8">
              Discover the future of technology and innovation
            </p>
            <button className="bg-matrix-green text-black px-8 py-3 rounded-full font-semibold hover:bg-matrix-dark hover:text-matrix-green transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
