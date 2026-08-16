import React from 'react';
import { 
  EdgeLabelRenderer, 
  getBezierPath, 
  EdgeProps,
  Position 
} from '@xyflow/react';
import { Zap } from 'lucide-react';

export const ElectricEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Right,
  targetPosition = Position.Left,
  label,
  style = {},
  selected
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Glowing Arrow Marker for Edge Direction */}
          <marker
            id={`electric-arrow-${id}`}
            viewBox="0 0 12 12"
            refX="8"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path
              d="M 1 2 L 11 6 L 1 10 L 4 6 Z"
              fill={selected ? '#A855F7' : '#38BDF8'}
            />
          </marker>

          {/* Electric Spark Filter */}
          <filter id={`electric-glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 1. Outer Heavy Cable Casing (Dark Wire Base) */}
      <path
        id={`${id}-casing`}
        d={edgePath}
        fill="none"
        stroke="#020617"
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* 2. Copper/Metallic Wire Insulation */}
      <path
        id={`${id}-wire`}
        d={edgePath}
        fill="none"
        stroke="#1E293B"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* 3. Electric Glowing Wire Core with Animated Directional Flow */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={selected ? '#A855F7' : '#38BDF8'}
        strokeWidth={selected ? 3 : 2.5}
        strokeDasharray="10 8"
        markerEnd={`url(#electric-arrow-${id})`}
        style={{
          filter: `drop-shadow(0 0 8px ${selected ? 'rgba(168,85,247,0.9)' : 'rgba(56,189,248,0.9)'})`,
          animation: 'electricDash 1.2s linear infinite',
          ...style,
        }}
      />

      {/* 4. Electric Energy Charges Traveling Along Path (Source -> Target Direction) */}
      {/* Charge Particle 1: Bright White Spark */}
      <circle r="3.5" fill="#FFFFFF" style={{ filter: `url(#electric-glow-${id})` }}>
        <animateMotion
          path={edgePath}
          dur="2s"
          repeatCount="indefinite"
          rotate="auto"
        />
      </circle>

      {/* Charge Particle 2: Cyan Voltage Pulse */}
      <circle r="2.5" fill="#38BDF8" style={{ filter: `url(#electric-glow-${id})` }}>
        <animateMotion
          path={edgePath}
          dur="2s"
          begin="0.66s"
          repeatCount="indefinite"
          rotate="auto"
        />
      </circle>

      {/* Charge Particle 3: Purple Energy Surge */}
      <circle r="2.5" fill="#C084FC" style={{ filter: `url(#electric-glow-${id})` }}>
        <animateMotion
          path={edgePath}
          dur="2s"
          begin="1.33s"
          repeatCount="indefinite"
          rotate="auto"
        />
      </circle>

      {/* 5. Electric Voltage / Direction Label Tag */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/95 border border-[#38BDF8]/50 text-[11px] font-bold text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)] backdrop-blur-md hover:border-sky-400 hover:text-white transition group cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce fill-amber-400 shrink-0" />
            <span className="font-sans text-slate-100 text-[11px] font-semibold tracking-wide dir-rtl">{label as string}</span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
