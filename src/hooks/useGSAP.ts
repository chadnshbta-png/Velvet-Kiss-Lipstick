"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function useGSAPTimeline(
  callback: (gsap: typeof import("gsap").default, tl: gsap.core.Timeline) => void,
  deps: React.DependencyList = []
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tlRef.current = tl;
    callback(gsap, tl);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return tlRef;
}

export function useScrollAnimation(
  targetRef: React.RefObject<Element | null>,
  callback: (el: Element) => gsap.core.Tween | gsap.core.Timeline | ScrollTrigger,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const animation = callback(el);

    return () => {
      if (animation instanceof ScrollTrigger) {
        animation.kill();
      } else {
        (animation as gsap.core.Tween | gsap.core.Timeline).kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
