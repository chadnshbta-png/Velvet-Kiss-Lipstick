"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: string;
  delay?: number;
  stagger?: number;
  type?: "chars" | "words" | "lines";
  trigger?: string | Element | null;
  start?: string;
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.04,
  type = "words",
  trigger,
  start = "top 80%",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll(".split-unit");

    gsap.set(spans, { y: "110%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: trigger !== undefined
        ? {
            trigger: trigger ?? el,
            start,
            toggleActions: "play none none none",
          }
        : undefined,
      delay,
    });

    tl.to(spans, {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el || st.vars.trigger === trigger) {
          st.kill();
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component ref={containerRef} className={className} aria-label={text}>
      {type === "words"
        ? words.map((word, i) => (
            <span key={i} className="word-wrap" style={{ display: "inline-block", overflow: "hidden" }}>
              <span className="split-unit" style={{ display: "inline-block" }}>
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            </span>
          ))
        : text.split("").map((char, i) => (
            <span key={i} className="word-wrap" style={{ display: "inline-block", overflow: "hidden" }}>
              <span className="split-unit" style={{ display: "inline-block" }}>
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
    </Component>
  );
}
