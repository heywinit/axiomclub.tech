import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Axiom Club
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover the future of technology and innovation
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
