"use client";
import React, { useEffect, useRef } from 'react'
import FlowingMenu from './FlowingMenu';
import LogoLoop from './LogoLoop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiShadcnui } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const ProjectsShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const skillsHeaderRef = useRef<HTMLHeadingElement>(null);

    const demoItems = [
        { link: 'https://github.com/AaliyanUstad/coutrix-master', text: 'Coutrix', image: '/coutrix.png' },
        { link: 'https://github.com/AaliyanUstad/mars-chocolate', text: 'Mars Chocolate', image: 'choco.png' },
        { link: 'https://drive.google.com/file/d/1A8PE8eP3pJJA0OFa6iGOV3ORMdPF0xZX/view?usp=drive_link', text: 'Ai Website Builder', image: 'aiweb.png' },
    ];

    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <SiMongodb />, title: "Mongodb", href: "https://www.mongodb.com/docs/" },
        { node: <SiShadcnui />, title: "Shadcnui", href: "https://ui.shadcn.com/docs" },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(headerRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1, x: 0, duration: 1,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    }
                }
            );

            gsap.fromTo(skillsHeaderRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: {
                        trigger: skillsHeaderRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="px-6 sm:px-12 lg:px-20 py-24 min-h-screen">
            <div ref={containerRef} className='h-full bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-14 lg:p-20 backdrop-blur-xl shadow-2xl overflow-hidden relative'>
                {/* Decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none"></div>

                <h1 ref={headerRef} className='font-main font-bold mb-12 text-4xl md:text-5xl lg:text-6xl text-white tracking-tight relative z-10'>
                    SELECTED <span className="text-white/40 italic">WORK.</span>
                </h1>

                <div className='h-[60vh] md:h-[70vh] relative z-10 interactive' style={{ position: 'relative' }}>
                    <FlowingMenu items={demoItems}
                        speed={15}
                        textColor="#ffffff"
                        bgColor="#111111"
                        marqueeBgColor="#ffffff"
                        marqueeTextColor="#000000"
                        borderColor="rgba(255, 255, 255, 0.1)"
                    />
                </div>

                <div className="mt-32 relative z-10">
                    <h1 ref={skillsHeaderRef} className='font-main font-bold mb-16 text-3xl md:text-5xl lg:text-5xl text-center text-white/90 tracking-widest uppercase'>
                        Core Stack
                    </h1>
                    <div className="relative overflow-hidden interactive" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                        <LogoLoop
                            logos={techLogos}
                            speed={120}
                            direction="left"
                            logoHeight={60}
                            gap={80}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsShowcase;