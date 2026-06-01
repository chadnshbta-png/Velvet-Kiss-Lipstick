"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.1);
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const onMouseEnterLink = () => {
      gsap.to(ring, { width: 56, height: 56, opacity: 0.6, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { width: 32, height: 32, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--color-gold)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--color-gold)",
          opacity: 0.5,
        }}
      />
    </>
  );
}
