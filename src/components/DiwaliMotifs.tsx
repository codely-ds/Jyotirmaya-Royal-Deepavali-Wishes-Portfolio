import React from 'react';
import { MotifType } from '../data/diwaliData';

interface InteractiveDiyaProps {
  isLit: boolean;
  isCenterpiece?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flameColor?: 'gold' | 'sindoor' | 'peacock';
  className?: string;
}

export const InteractiveDiyaSvg: React.FC<InteractiveDiyaProps> = ({
  isLit,
  isCenterpiece = false,
  size = 'md',
  flameColor = 'gold',
  className = '',
}) => {
  const dimensions = {
    sm: 'w-14 h-16',
    md: 'w-20 h-24',
    lg: 'w-28 h-32',
    xl: 'w-36 h-40',
  }[size];

  const outerFlameColors = {
    gold: { start: '#FFF3B0', mid: '#FFB703', end: '#E63946' },
    sindoor: { start: '#FFE5D9', mid: '#FB8500', end: '#D90429' },
    peacock: { start: '#E0FBFC', mid: '#4CC9F0', end: '#FFB703' },
  }[flameColor];

  const uid = React.useId().replace(/:/g, '');

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Ambient Radial Halo when lit */}
      {isLit && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full pointer-events-none animate-halo"
          style={{
            background:
              flameColor === 'peacock'
                ? 'radial-gradient(circle, rgba(76,201,240,0.42) 0%, rgba(255,183,3,0.18) 45%, transparent 72%)'
                : 'radial-gradient(circle, rgba(255,183,3,0.52) 0%, rgba(230,57,70,0.22) 48%, transparent 74%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
      >
        <defs>
          <linearGradient id={`flameOuter-${uid}`} x1="60" y1="6" x2="60" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={outerFlameColors.start} />
            <stop offset="48%" stopColor={outerFlameColors.mid} />
            <stop offset="100%" stopColor={outerFlameColors.end} />
          </linearGradient>

          <linearGradient id={`flameInner-${uid}`} x1="60" y1="18" x2="60" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF3B0" />
            <stop offset="100%" stopColor="#FFB703" />
          </linearGradient>

          <linearGradient id={`bowlClay-${uid}`} x1="16" y1="64" x2="104" y2="112" gradientUnits="userSpaceOnUse">
            {isCenterpiece ? (
              <>
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#D97706" />
                <stop offset="75%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="45%" stopColor="#9A3412" />
                <stop offset="85%" stopColor="#5C1D0E" />
                <stop offset="100%" stopColor="#3B0F06" />
              </>
            )}
          </linearGradient>

          <linearGradient id={`zariRim-${uid}`} x1="15" y1="65" x2="105" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="30%" stopColor="#FFD166" />
            <stop offset="50%" stopColor="#FFF3B0" />
            <stop offset="70%" stopColor="#FFB703" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <radialGradient id={`oilPool-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLit ? '#FFB703' : '#451A03'} stopOpacity={isLit ? '0.85' : '0.9'} />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#270E04" />
          </radialGradient>
        </defs>

        {/* Unlit Invite Ring */}
        {!isLit && (
          <g className="opacity-70 group-hover:opacity-100 transition-opacity">
            <circle
              cx="60"
              cy="46"
              r="11"
              stroke="#FFB703"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="animate-spin"
              style={{ animationDuration: '9s' }}
            />
            <circle cx="60" cy="46" r="3" fill="#D8C3A5" />
          </g>
        )}

        {/* Lit Multi-Layered Flame */}
        {isLit && (
          <g className="animate-flame">
            {/* Soft Outer Glow Tear */}
            <path
              d="M60 4C60 4 37 31 37 46C37 58.5 47.3 66 60 66C72.7 66 83 58.5 83 46C83 31 60 4 60 4Z"
              fill={outerFlameColors.mid}
              fillOpacity="0.22"
            />
            {/* Primary Saffron-Gold Flame Body */}
            <path
              d="M60 9C60 9 42 32 42 46.5C42 56.8 50.1 64 60 64C69.9 64 78 56.8 78 46.5C78 32 60 9 60 9Z"
              fill={`url(#flameOuter-${uid})`}
            />
            {/* Inner White-Gold Core */}
            <path
              d="M60 22C60 22 49 38 49 48.5C49 55.2 53.9 60.5 60 60.5C66.1 60.5 71 55.2 71 48.5C71 38 60 22 60 22Z"
              fill={`url(#flameInner-${uid})`}
              className="animate-core"
            />
            {/* Hot Blue-Violet Wick Base */}
            <ellipse cx="60" cy="59" rx="5.5" ry="3" fill="#38BDF8" fillOpacity="0.55" />
            {/* Rising Golden Embers */}
            <circle cx="53" cy="14" r="1.4" fill="#FFF3B0" className="animate-ping" style={{ animationDuration: '2.2s' }} />
            <circle cx="67" cy="18" r="1.1" fill="#FFD166" className="animate-ping" style={{ animationDuration: '1.7s' }} />
            <circle cx="60" cy="5" r="1.3" fill="#FFFFFF" className="animate-pulse" />
          </g>
        )}

        {/* Cotton Wick (Baati) */}
        <path
          d="M58 67C58 62 59 56 60 54C61 56 62 62 62 67"
          stroke={isLit ? '#FFF3B0' : '#D8C3A5'}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Diya Top Oil Reservoir Ellipse */}
        <ellipse
          cx="60"
          cy="70"
          rx="42"
          ry="10"
          fill={`url(#oilPool-${uid})`}
          stroke={`url(#zariRim-${uid})`}
          strokeWidth="2.2"
        />

        {/* Sculpted Diya Vessel Body */}
        <path
          d="M16 70C18 95 36 108 60 108C84 108 102 95 104 70C92 77 77 80 60 80C43 80 28 77 16 70Z"
          fill={`url(#bowlClay-${uid})`}
          stroke={`url(#zariRim-${uid})`}
          strokeWidth="1.8"
        />

        {/* Pointed Ceremonial Spout Highlight */}
        <path
          d="M50 70L60 62L70 70"
          fill={isCenterpiece ? '#F59E0B' : '#C2410C'}
          stroke={`url(#zariRim-${uid})`}
          strokeWidth="1.5"
        />

        {/* Decorative Zari Scallops & Kumkum Bindis on Bowl */}
        <path
          d="M26 83C34 90 46 93 60 93C74 93 86 90 94 83"
          stroke="#FFD166"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.85"
        />
        <circle cx="60" cy="87" r="2.6" fill="#FFD166" />
        <circle cx="45" cy="85.5" r="2" fill="#E63946" stroke="#FFD166" strokeWidth="0.7" />
        <circle cx="75" cy="85.5" r="2" fill="#E63946" stroke="#FFD166" strokeWidth="0.7" />
        <circle cx="33" cy="81" r="1.5" fill="#FFD166" />
        <circle cx="87" cy="81" r="1.5" fill="#FFD166" />

        {/* Ornate Pedestal Foot */}
        <path
          d="M42 106L36 116H84L78 106"
          fill={`url(#bowlClay-${uid})`}
          stroke={`url(#zariRim-${uid})`}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {isCenterpiece && (
          <ellipse cx="60" cy="117" rx="28" ry="3.5" fill="#FFB703" fillOpacity="0.45" />
        )}
      </svg>
    </div>
  );
};

export const MotifEmblemSvg: React.FC<{
  motif: MotifType;
  className?: string;
  color?: string;
}> = ({ motif, className = 'w-6 h-6', color = '#FFB703' }) => {
  switch (motif) {
    case 'lotus':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path
            d="M24 7C24 7 16 17 16 26C16 31.5 19.5 36 24 36C28.5 36 32 31.5 32 26C32 17 24 7 24 7Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.14"
          />
          <path
            d="M16 27C11 23 8 15 8 15C8 15 16 16 20 22"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M32 27C37 23 40 15 40 15C40 15 32 16 28 22"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19 35C12 35 6 31 5 26C10 26 14 28 17 32"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M29 35C36 35 42 31 43 26C38 26 34 28 31 32"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M16 40H32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2" fill={color} />
        </svg>
      );

    case 'kalash':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Coconut on top */}
          <path
            d="M24 6C20.5 9.5 20 14 24 16C28 14 27.5 9.5 24 6Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.16"
          />
          {/* Mango Leaves */}
          <path d="M21 15C16 12 11 14 10 18C14 19 18 17 21 16" stroke={color} strokeWidth="1.4" />
          <path d="M27 15C32 12 37 14 38 18C34 19 30 17 27 16" stroke={color} strokeWidth="1.4" />
          {/* Kalash Vessel */}
          <path
            d="M18 18H30L28 22C33 25 35 30 33 36C31.5 40 28 42 24 42C20 42 16.5 40 15 36C13 30 15 25 20 22L18 18Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.12"
          />
          {/* Swastika / Sacred Symbol Center */}
          <path d="M24 27V35M20 31H28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'peacock':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path
            d="M12 40C16 28 24 14 34 8"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M27 9C33 6 39 10 38 17C37 24 29 29 22 27C17 25 16 19 20 14C22 11 25 10 27 9Z"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
            fillOpacity="0.13"
          />
          <circle cx="29" cy="17" r="4.2" stroke={color} strokeWidth="1.4" />
          <circle cx="29" cy="17" r="1.8" fill={color} />
          <path d="M12 28C15 27 18 28 19 30" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M16 34C20 34 23 35 25 37" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case 'ganesha':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Crown / Mukut */}
          <path d="M18 14L24 6L30 14H18Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
          {/* Ears & Curve */}
          <path
            d="M17 17C11 16 9 21 11 26C12.5 29 16 29 18 27"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M31 17C37 16 39 21 37 26C35.5 29 32 29 30 27"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Forehead Tilak & Trunk */}
          <path
            d="M20 18C20 25 20 33 25 37C28 39 32 37 31 33C30.5 31 28 31 27.5 33"
            stroke={color}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path d="M21 20H27" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="24" cy="17" r="1.3" fill={color} />
        </svg>
      );

    case 'diya':
    default:
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path
            d="M24 7C24 7 18 15 18 20C18 23.3 20.7 26 24 26C27.3 26 30 23.3 30 20C30 15 24 7 24 7Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.2"
          />
          <path
            d="M8 29C10 37 16 41 24 41C32 41 38 37 40 29C34 31.5 29 32.5 24 32.5C19 32.5 14 31.5 8 29Z"
            stroke={color}
            strokeWidth="1.6"
            fill={color}
            fillOpacity="0.12"
          />
          <circle cx="24" cy="20" r="2" fill={color} />
        </svg>
      );
  }
};

export const RangoliMandalaSvg: React.FC<{ litCount: number; className?: string }> = ({
  litCount,
  className = '',
}) => {
  const ratio = Math.min(1, Math.max(0.15, litCount / 7));
  const petalAngles = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const innerAngles = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-1000 ${className}`}
      style={{ opacity: 0.16 + ratio * 0.28 }}
    >
      <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
        {/* Outer Rotating 16-Petal Lotus Ring */}
        <g className="animate-rangoli-cw" style={{ transformOrigin: '250px 250px' }}>
          <circle
            cx="250"
            cy="250"
            r="235"
            stroke="#FFB703"
            strokeWidth="1"
            strokeDasharray="6 6"
            strokeOpacity={0.4 + ratio * 0.5}
          />
          <circle cx="250" cy="250" r="222" stroke="#E63946" strokeWidth="0.8" strokeOpacity={0.35 + ratio * 0.5} />

          {petalAngles.map((angle) => (
            <g key={`outer-${angle}`} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M250 28C262 52 268 74 250 96C232 74 238 52 250 28Z"
                stroke="#FFB703"
                strokeWidth="1.2"
                fill={litCount >= 5 ? '#FFB703' : 'none'}
                fillOpacity={litCount >= 5 ? '0.12' : '0'}
              />
              <circle cx="250" cy="20" r="2.5" fill="#FFD166" />
            </g>
          ))}
        </g>

        {/* Counter-Rotating Geometric Chakra */}
        <g className="animate-rangoli-ccw" style={{ transformOrigin: '250px 250px' }}>
          <circle cx="250" cy="250" r="158" stroke="#118AB2" strokeWidth="1.2" strokeOpacity={0.35 + ratio * 0.55} />
          <circle
            cx="250"
            cy="250"
            r="145"
            stroke="#FFB703"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity={0.45 + ratio * 0.5}
          />
          {innerAngles.map((angle) => (
            <g key={`mid-${angle}`} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M250 95C268 122 268 148 250 175C232 148 232 122 250 95Z"
                stroke="#E63946"
                strokeWidth="1.3"
                fill={litCount >= 3 ? '#E63946' : 'none'}
                fillOpacity={litCount >= 3 ? '0.14' : '0'}
              />
              <circle cx="250" cy="112" r="3" fill="#FFB703" />
            </g>
          ))}
        </g>

        {/* Inner Sanctum Padma */}
        <g>
          <circle cx="250" cy="250" r="82" stroke="#FFB703" strokeWidth="1.5" strokeOpacity="0.65" />
          <circle
            cx="250"
            cy="250"
            r="52"
            fill="#FFB703"
            fillOpacity={0.05 + ratio * 0.12}
            stroke="#FFD166"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};

export const MarigoldToranHeader: React.FC = () => {
  const scallops = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full overflow-hidden pointer-events-none select-none opacity-90">
      <div className="max-w-[1440px] mx-auto flex justify-between items-start px-2">
        {scallops.map((idx) => (
          <svg
            key={idx}
            viewBox="0 0 180 62"
            fill="none"
            className="w-44 h-14 shrink-0 animate-toran"
            style={{ animationDelay: `${idx * 0.35}s` }}
          >
            {/* Top Zari Cord */}
            <line x1="0" y1="2" x2="180" y2="2" stroke="#FFB703" strokeWidth="2" strokeOpacity="0.6" />
            {/* Mango Leaves Row */}
            {[22, 56, 90, 124, 158].map((x) => (
              <path
                key={x}
                d={`M${x} 3 C${x - 6} 11, ${x - 5} 20, ${x} 27 C${x + 5} 20, ${x + 6} 11, ${x} 3 Z`}
                fill="#0F5132"
                stroke="#FFB703"
                strokeWidth="0.8"
              />
            ))}
            {/* Draped Marigold Garland Swag */}
            <path
              d="M6 6 Q90 52 174 6"
              stroke="#FB8500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="1 10"
            />
            <path
              d="M12 8 Q90 54 168 8"
              stroke="#FFB703"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1 12"
            />
            {/* Hanging Brass Temple Bell in Center of Scallop */}
            <line x1="90" y1="30" x2="90" y2="45" stroke="#FFD166" strokeWidth="1.2" />
            <path d="M85 52L87 45H93L95 52H85Z" fill="#FFB703" />
            <circle cx="90" cy="54" r="2" fill="#E63946" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export const ZariCornerFlourish: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br';
  color?: string;
  className?: string;
}> = ({ position, color = '#FFB703', className = 'w-7 h-7' }) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <svg viewBox="0 0 36 36" fill="none" className={`pointer-events-none select-none ${rotation} ${className}`}>
      <path d="M2 24V5C2 3.34315 3.34315 2 5 2H24" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 18V8C6 6.89543 6.89543 6 8 6H18" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="5.5" cy="5.5" r="2" fill={color} />
      <path d="M11 11C14 11 16 13 16 16C13 16 11 14 11 11Z" fill={color} fillOpacity="0.45" />
    </svg>
  );
};
