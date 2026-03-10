import React, { useMemo } from 'react';

/**
 * PriceChart — full-width animated SVG price chart
 * Props:
 *   timeframe {string} — "1H" | "24H" | "30D"  (triggers re-generation)
 */
export default function PriceChart({ timeframe = '24H' }) {
  // Seed changes per timeframe so chart animates when switching
  const seed = timeframe === '1H' ? 1 : timeframe === '24H' ? 2 : 3;

  const points = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const noise =
        Math.sin(i * 0.4 + seed) * 30 +
        Math.sin(i * 0.9 + seed) * 15 +
        ((seed * 11 + i * 7) % 10);
      return { x: (i / 39) * 100, y: 50 + noise };
    });
  }, [seed]);

  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));

  const norm = points.map(p => ({
    x: p.x,
    y: 10 + ((p.y - minY) / (maxY - minY)) * 140,
  }));

  const path = norm
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)}%,${p.y.toFixed(1)}`)
    .join(' ');
  const fillPath = `${path} L100%,160 L0%,160 Z`;

  return (
    <svg
      viewBox="0 0 100 160"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '200px', display: 'block' }}
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#03A338" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#03A338" stopOpacity="0"   />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#chartGrad)" />
      <path
        d={path}
        fill="none"
        stroke="#03A338"
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
