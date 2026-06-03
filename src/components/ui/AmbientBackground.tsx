"use client";

/**
 * AmbientBackground
 *
 * Fixed, fullscreen luxury atmosphere layer.
 * Five large, radial-gradient "light pools" float at different
 * speeds using independent GSAP sine-wave tweens. No CSS blur —
 * the radial-gradient falloff creates softness with zero GPU cost.
 *
 * Depth logic:
 *   Blob 1 — upper-left  — slow dark burgundy warm glow
 *   Blob 2 — upper-right — cool deep plum
 *   Blob 3 — lower-left  — warm rose ambient
 *   Blob 4 — mid-right   — deep plum accent
 *   Blob 5 — lower-right — subtle nude warmth
 *
 * Opacity values are intentionally low (6–11%).
 * Together they produce a rich, layered atmosphere without competing
 * with foreground content.
 */

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

interface Blob {
  left:      string;
  top:       string;
  width:     string;
  height:    string;
  color:     string;   /* center stop of radial-gradient */
  driftX:    number;   /* px to drift horizontally (yoyo) */
  driftY:    number;   /* px to drift vertically (yoyo) */
  durX:      number;   /* seconds for one half-cycle on X */
  durY:      number;   /* seconds for one half-cycle on Y */
  delay:     number;   /* initial delay to phase-offset blobs */
}

const BLOBS: Blob[] = [
  /* 1 — upper-left soft velvet rose glow */
  {
    left: "-14%", top: "-22%",
    width: "70vw", height: "65vw",
    color: "rgba(155, 30, 50, 0.07)",
    driftX: 52, driftY: 38, durX: 27, durY: 22, delay: 0,
  },
  /* 2 — upper-right warm champagne warmth */
  {
    left: "62%", top: "-18%",
    width: "64vw", height: "58vw",
    color: "rgba(200, 168, 152, 0.06)",
    driftX: -46, driftY: 54, durX: 35, durY: 29, delay: 9,
  },
  /* 3 — lower-left ambient blush — largest, most diffuse */
  {
    left: "8%", top: "58%",
    width: "80vw", height: "62vw",
    color: "rgba(180, 96, 110, 0.05)",
    driftX: 34, driftY: -42, durX: 44, durY: 37, delay: 18,
  },
  /* 4 — mid-right deep rose accent */
  {
    left: "68%", top: "28%",
    width: "52vw", height: "48vw",
    color: "rgba(155, 30, 50, 0.06)",
    driftX: -38, driftY: 44, durX: 23, durY: 20, delay: 5,
  },
  /* 5 — lower-right nude warmth */
  {
    left: "55%", top: "65%",
    width: "46vw", height: "44vw",
    color: "rgba(210, 180, 165, 0.05)",
    driftX: 42, driftY: -28, durX: 31, durY: 26, delay: 13,
  },
];

export default function AmbientBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const b = BLOBS[i];

        /* Horizontal drift — independent sine wave */
        gsap.to(el, {
          x: b.driftX,
          duration: b.durX,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: b.delay,
        });

        /* Vertical drift — different period creates non-repeating orbit */
        gsap.to(el, {
          y: b.driftY,
          duration: b.durY,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: b.delay + 1.5,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.width,
            height: b.height,
            background: `radial-gradient(ellipse at center, ${b.color} 0%, transparent 65%)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
