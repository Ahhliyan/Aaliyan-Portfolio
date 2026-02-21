"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (logo) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = logo.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.4;
        const y = (e.clientY - (top + height / 2)) * 0.4;
        gsap.to(logo, { x, y, duration: 0.5, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(logo, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      };

      logo.addEventListener('mousemove', handleMouseMove);
      logo.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        logo.removeEventListener('mousemove', handleMouseMove);
        logo.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 z-50 w-full h-24 flex items-center justify-between px-8 lg:px-16 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] pointer-events-none">
      <div
        ref={logoRef}
        className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-white/20 text-white text-xl font-bold font-main tracking-widest cursor-pointer transition-colors duration-300 hover:border-white hover:bg-white/5 interactive"
      >
        MA
      </div>

      <div className="pointer-events-auto flex gap-8 text-white/70 font-medium text-xs lg:text-sm tracking-[0.2em] font-main uppercase">
        <span className="hover:text-white transition-colors cursor-pointer interactive">Work</span>
        <span className="hover:text-white transition-colors cursor-pointer interactive">Skills</span>
        <span className="hover:text-white transition-colors cursor-pointer interactive">Contact</span>
      </div>
    </nav>
  )
}

export default Navbar;