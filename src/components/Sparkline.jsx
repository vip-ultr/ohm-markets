import React from 'react';

/**
 * Sparkline — small inline SVG trend chart
 * Props:
 *   pos  {boolean} — true = uptrend (green), false = downtrend (red)
 *   seed {number}  — deterministic variation per token
 */
export default function Sparkline({ pos = true, seed = 0 }) {
  const points = Array.from({ length: 12 }, (_, i) => {
    const base = 20 + Math.sin((i + seed) * 1.3) * 8 + ((seed * 7 + i * 3) % 6);
    return pos
      ? Math.max(4,  30 - base * 0.5 + i * 0.8)
      : Math.min(28, base * 0.7      + i * 0.2);
  });

  const xs    = points.map((_, i) => (i / 11) * 80);
  const path  = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${xs[i].toFixed(1)},${y.toFixed(1)}`).join(' ');
  const fill  = `${path} L80,32 L0,32 Z`;
  const color = pos ? '#03A338' : '#e84040';
  const gradId = `sg_${seed}_${pos ? 1 : 0}`;

  return (
    <svg
      viewBox="0 0 80 32"
      preserveAspectRatio="none"
      style={{ width: 80, height: 32, display: 'block' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
