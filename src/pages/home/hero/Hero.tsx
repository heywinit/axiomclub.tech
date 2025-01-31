import React from "react";
import CRT from "../../../components/CRT";

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <CRT>
          <div className="p-8">
            <h1 className="text-5xl font-bold text-[#00ff00] shadow-[0_0_5px_#00ff00,0_0_10px_#00ff00,0_0_20px_#00ff00] mb-6">
              Welcome to Axiom Club
            </h1>
            <p className="text-xl text-[#00ff00] mb-8">
              Discover the future of technology and innovation
            </p>
            <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#003b00] hover:text-[#00ff00] transition-colors">
              Get Started
            </button>
          </div>
        </CRT>
      </div>
    </section>
  );
};

export default Hero;
