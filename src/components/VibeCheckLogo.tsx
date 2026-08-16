import React, { useState } from 'react';

interface VibeCheckLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'icon' | 'horizontal' | 'circle';
  className?: string;
  subtextColor?: 'white' | 'black' | 'slate' | 'amber';
  invert?: boolean;
}

export const VibeCheckLogo: React.FC<VibeCheckLogoProps> = ({
  variant = 'full',
  className = 'h-10',
  subtextColor = 'white',
}) => {
  const [imgError, setImgError] = useState(false);

  const subtitleColor = 
    subtextColor === 'white' ? '#FFFFFF' :
    subtextColor === 'black' ? '#0F172A' :
    subtextColor === 'amber' ? '#FBBF24' :
    '#CBD5E1';

  // Circular Seal Badge (Using uploaded /logo.png inside circular container with dark theme border)
  if (variant === 'circle') {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-slate-950 border border-slate-700/80 shadow-xl shadow-black/60 p-2 relative group select-none ring-2 ring-rose-500/20 hover:ring-rose-500/40 transition-all aspect-square overflow-hidden ${className}`}>
        {!imgError ? (
          <img 
            src="/logo.png" 
            alt="Vibe Check Smash Burgers" 
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-full">
            <circle cx="150" cy="150" r="142" stroke="#FF2600" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.35" />
            <circle cx="150" cy="150" r="132" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
            <g transform="translate(25, 45)">
              <path d="M 6 10 L 25 10 L 37 72 L 49 10 L 68 10 L 47 88 L 25 88 Z" fill="#FF2600" />
              <circle cx="86" cy="19" r="10" fill="#FF2600" />
              <rect x="76" y="36" width="20" height="52" rx="4" fill="#FF2600" />
              <path d="M 105 10 L 148 10 C 165 10 173 19 173 36 C 173 45 167 51 159 54 C 170 58 176 66 176 77 C 176 88 165 88 148 88 L 105 88 Z M 122 28 C 132 22 145 25 151 31 C 145 35 132 37 122 33 Z M 122 60 C 132 65 145 69 153 65 C 147 74 134 76 122 69 Z" fill="#FF2600" fillRule="evenodd" />
              <path d="M 186 10 L 236 10 L 236 30 L 209 30 L 209 39 L 230 39 L 230 58 L 209 58 L 209 68 L 238 68 L 238 88 L 186 88 Z" fill="#FF2600" />
            </g>
            <g transform="translate(25, 138)">
              <path d="M 10 40 C 10 16 19 5 36 5 C 50 5 55 11 57 16 L 43 24 C 42 20 39 18 35 18 C 28 18 23 25 23 40 C 23 55 28 62 35 62 C 39 62 42 60 43 56 L 57 64 C 55 70 49 75 36 75 C 19 75 10 64 10 40 Z" fill="#FF2600" />
              <path d="M 64 5 L 81 5 L 81 31 L 102 31 L 102 5 L 119 5 L 119 75 L 102 75 L 102 48 L 81 48 L 81 75 L 64 75 Z" fill="#FF2600" />
              <path d="M 127 5 L 169 5 L 169 22 L 146 22 L 146 31 L 165 31 L 165 46 L 146 46 L 146 58 L 171 58 L 171 75 L 127 75 Z" fill="#FF2600" />
              <path d="M 179 40 C 179 16 188 5 205 5 C 219 5 224 11 226 16 L 212 24 C 211 20 208 18 204 18 C 197 18 192 25 192 40 C 192 55 197 62 204 62 C 208 62 211 60 212 56 L 226 64 C 224 70 218 75 205 75 C 188 75 179 64 179 40 Z" fill="#FF2600" />
              <path d="M 234 5 L 251 5 L 251 35 L 272 5 L 291 5 L 266 39 L 293 75 L 272 75 L 253 46 L 251 50 L 251 75 L 234 75 Z" fill="#FF2600" />
            </g>
            <text x="150" y="244" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="15" fontWeight="900" letterSpacing="5" fill="#FFFFFF">SMASH BURGERS</text>
          </svg>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-slate-950 border border-slate-700/80 p-1 shadow-lg aspect-square overflow-hidden ${className}`}>
        <img 
          src="/logo.png" 
          alt="Vibe Check" 
          onError={() => setImgError(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-2.5 bg-slate-950/90 border border-slate-700/80 p-1.5 px-3 rounded-full shadow-xl backdrop-blur-md">
        <img src="/logo.png" alt="Vibe Check" className="h-7 w-auto object-contain" />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <img 
          src="/logo.png" 
          alt="Vibe Check Smash Burgers" 
          onError={() => setImgError(true)}
          className="h-full w-auto object-contain max-h-full"
        />
      </div>
    );
  }

  // Default 'full' stacked layout using uploaded /logo.png
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {!imgError ? (
        <img 
          src="/logo.png" 
          alt="Vibe Check Smash Burgers" 
          onError={() => setImgError(true)}
          className="w-full h-full object-contain drop-shadow-md"
        />
      ) : (
        <svg viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-full">
          <g transform="translate(18, 10)">
            <path d="M 8 10 L 27 10 L 39 74 L 51 10 L 70 10 L 49 92 L 27 92 Z" fill="#FF2600" />
            <circle cx="88" cy="20" r="11" fill="#FF2600" />
            <rect x="78" y="38" width="20" height="54" rx="5" fill="#FF2600" />
            <path d="M 108 10 L 152 10 C 170 10 178 20 178 38 C 178 47 172 53 164 56 C 175 60 181 69 181 81 C 181 92 170 92 152 92 L 108 92 Z M 126 28 C 136 21 150 24 156 31 C 150 35 136 37 126 33 Z M 126 62 C 136 67 150 71 158 67 C 152 76 138 78 126 71 Z" fill="#FF2600" fillRule="evenodd" />
            <path d="M 192 10 L 244 10 L 244 32 L 216 32 L 216 41 L 238 41 L 238 61 L 216 61 L 216 72 L 246 72 L 246 92 L 192 92 Z" fill="#FF2600" />
          </g>
          <g transform="translate(20, 105)">
            <path d="M 10 44 C 10 18 20 6 38 6 C 52 6 58 12 60 18 L 45 26 C 44 22 41 20 37 20 C 29 20 24 27 24 44 C 24 60 29 67 37 67 C 41 67 44 65 45 61 L 60 69 C 58 75 52 81 38 81 C 20 81 10 69 10 44 Z" fill="#FF2600" />
            <path d="M 68 6 L 86 6 L 86 34 L 108 34 L 108 6 L 126 6 L 126 81 L 108 81 L 108 52 L 86 52 L 86 81 L 68 81 Z" fill="#FF2600" />
            <path d="M 134 6 L 178 6 L 178 24 L 154 24 L 154 34 L 174 34 L 174 50 L 154 50 L 154 62 L 180 62 L 180 81 L 134 81 Z" fill="#FF2600" />
            <path d="M 188 44 C 188 18 198 6 216 6 C 230 6 236 12 238 18 L 223 26 C 222 22 219 20 215 20 C 207 20 202 27 202 44 C 202 60 207 67 215 67 C 219 67 222 65 223 61 L 238 69 C 236 75 230 81 216 81 C 198 81 188 69 188 44 Z" fill="#FF2600" />
            <path d="M 246 6 L 264 6 L 264 38 L 286 6 L 306 6 L 280 42 L 308 81 L 286 81 L 266 50 L 264 54 L 264 81 L 246 81 Z" fill="#FF2600" />
          </g>
          <text x="160" y="228" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="19" fontWeight="900" letterSpacing="5.5" fill={subtitleColor}>SMASH BURGERS</text>
        </svg>
      )}
    </div>
  );
};
