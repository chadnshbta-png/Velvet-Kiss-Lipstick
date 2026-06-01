"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_LINKS = [
  { label: "Story", href: "#about" },
  { label: "Rituals", href: "#services" },
  { label: "Collection", href: "#products" },
  { label: "Film", href: "#video" },
  { label: "Voices", href: "#testimonials" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
    );

    ScrollTrigger.create({
      start: "top -100",
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(10, 6, 8, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottomColor: "rgba(201, 169, 110, 0.15)",
          duration: 0.4,
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          duration: 0.4,
        });
      },
    });
  }, []);

  const toggleMenu = () => {
    const menu = menuRef.current;
    if (!menu) return;

    if (!menuOpen) {
      setMenuOpen(true);
      gsap.fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 0.6, ease: "power4.out" }
      );
      gsap.fromTo(
        menu.querySelectorAll("li"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => setMenuOpen(false),
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between border-b border-transparent"
        style={{ opacity: 0 }}
      >
        <div ref={logoRef} className="flex items-center gap-3">
          <span
            className="text-2xl tracking-[0.3em] uppercase font-display"
            style={{ color: "var(--color-gold)", letterSpacing: "0.35em" }}
          >
            Velvet Kiss
          </span>
        </div>

        <ul
          ref={linksRef}
          className="hidden md:flex items-center gap-10 list-none"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs tracking-[0.25em] uppercase font-accent transition-colors duration-300"
                style={{ color: "var(--color-champagne)", fontWeight: 300 }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { color: "var(--color-gold)", duration: 0.3 })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, { color: "var(--color-champagne)", duration: 0.3 })
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="hidden md:flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-accent px-6 py-3 border relative overflow-hidden group"
          style={{
            borderColor: "var(--color-gold)",
            color: "var(--color-gold)",
            fontWeight: 300,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            gsap.to(btn, { backgroundColor: "var(--color-gold)", color: "var(--color-black)", duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            gsap.to(btn, { backgroundColor: "transparent", color: "var(--color-gold)", duration: 0.3 });
          }}
        >
          Shop Now
        </button>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-current" style={{ color: "var(--color-gold)" }} />
          <span className="block w-4 h-px bg-current ml-auto" style={{ color: "var(--color-gold)" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "var(--color-black)",
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          display: menuOpen ? "flex" : "none",
        }}
      >
        <ul className="list-none flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-4xl font-display italic"
                style={{ color: "var(--color-champagne)" }}
                onClick={toggleMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
