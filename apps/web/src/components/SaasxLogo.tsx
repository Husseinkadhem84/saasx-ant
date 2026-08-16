import React from 'react';

interface SaasxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  glow?: boolean;
}

export const SaasxLogo: React.FC<SaasxLogoProps> = ({
  size = 'md',
  showText = true,
  glow = true
}) => {
  const dimensions = {
    sm: { box: 'w-7 h-7', svg: 28, text: 'text-lg' },
    md: { box: 'w-9 h-9', svg: 36, text: 'text-xl' },
    lg: { box: 'w-12 h-12', svg: 48, text: 'text-2xl' },
    xl: { box: 'w-16 h-16', svg: 64, text: 'text-3xl' }
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Visual Logo Icon based on uploaded SAASX graphic */}
      <div 
        className={`relative ${dimensions.box} bg-black rounded-xl p-1.5 flex items-center justify-center border border-slate-700/80 transition-transform hover:scale-105 ${
          glow ? 'shadow-[0_0_20px_rgba(56,189,248,0.35)]' : ''
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Slanted Wing */}
          <path
            d="M 15 20 L 70 20 L 55 50 L 0 50 Z"
            fill="currentColor"
          />
          {/* Bottom Slanted Wing */}
          <path
            d="M 45 50 L 100 50 L 85 80 L 30 80 Z"
            fill="currentColor"
          />
          {/* Geometric Inner Cutout X */}
          <path
            d="M 28 30 L 48 50 L 28 70 L 40 70 L 55 55 L 70 70 L 82 70 L 62 50 L 82 30 L 70 30 L 55 45 L 40 30 Z"
            fill="#0F172A"
          />
          <path
            d="M 35 32 L 50 47 L 65 32 L 75 32 L 57 50 L 75 68 L 65 68 L 50 53 L 35 68 L 25 68 L 43 50 L 25 32 Z"
            fill="#38BDF8"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black ${dimensions.text} tracking-tight text-white font-mono`}>
              SAAS<span className="text-[#38BDF8]">X</span>
            </span>
            <span className="bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              AI Core
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-400 tracking-wider -mt-1">
            سـاكس لأتمتة الأنظمة
          </span>
        </div>
      )}
    </div>
  );
};
