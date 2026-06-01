"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register at module-level so any component that imports this gets plugins ready
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.defaults({ toggleActions: "play none none reverse" });
}

export function registerGSAP() {
  // No-op — registration already done at module level above
}

export { gsap, ScrollTrigger };
