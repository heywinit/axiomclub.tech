import React from "react";

interface CRTProps {
  children: React.ReactNode;
  className?: string;
}

const CRT: React.FC<CRTProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative p-8 rounded-3xl bg-gradient-to-b from-[#2c2c2c] to-[#0f0f0f] shadow-[inset_0_0_0_8px_#1a1a1a,inset_0_0_0_10px_#000000,0_5px_15px_rgba(0,0,0,0.5)] transform perspective-[1000px] rotate-x-2 ${className}`}
    >
      <div className="relative p-8 bg-black rounded-[20px] border-3 border-[#003b00] shadow-[inset_0_0_20px_#003b00,0_0_20px_#00ff00] animate-[flicker_0.15s_infinite] perspective-[1000px] preserve-3d">
        <div className="relative overflow-hidden rounded-[15px] scale-98">
          <div className="relative z-10">{children}</div>
          {/* CRT overlay effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.2)_100%)] pointer-events-none z-20" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none animate-[screenWarp_8s_infinite] rounded-[15px]" />
          <div className="absolute inset-0 bg-[rgba(18,16,16,0.1)] opacity-0 pointer-events-none animate-[flicker_0.15s_infinite] rounded-[15px]" />
        </div>
      </div>
      {/* Power button and LED */}
      <div className="absolute bottom-4 right-8 w-4 h-4 bg-[#333] rounded-full border-2 border-[#222] shadow-md" />
      <div className="absolute bottom-4 right-14 w-2 h-2 bg-[#00ff00] rounded-full animate-[ledPulse_2s_infinite]" />
    </div>
  );
};

export default CRT;
