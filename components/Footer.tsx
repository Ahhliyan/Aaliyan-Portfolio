"use client";
import React, { useEffect, useRef } from 'react'
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!footerRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { y: 150, opacity: 0, scale: 0.8 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 95%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={footerRef} className='relative min-h-[70vh] flex flex-col items-center justify-between pt-32 pb-10 overflow-hidden bg-black border-t border-white/5 rounded-t-[3rem] -mt-10 z-20'>

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

            <div className='flex flex-col items-center justify-center w-full gap-12 text-white relative z-10 flex-1 mt-10'>
                <h1 ref={textRef} className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-main font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase text-center leading-[0.85] px-4 interactive">
                    Let's Work <br /> Together
                </h1>

                <div className="flex gap-8 text-3xl mt-16 pb-10">
                    <a
                        href="https://www.linkedin.com/in/muhammad-aaliyan-13b0882a2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 hover:scale-110 transition-all duration-300 interactive group"
                    >
                        <FaLinkedinIn size={24} className="group-hover:scale-110 transition-transform" />
                    </a>

                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=81.aaliyan@gmail.com"
                        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 hover:scale-110 transition-all duration-300 interactive group"
                    >
                        <MdEmail size={26} className="group-hover:scale-110 transition-transform" />
                    </a>

                    <a
                        href="https://wa.me/923365389322"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 hover:scale-110 transition-all duration-300 interactive group"
                    >
                        <FaWhatsapp size={26} className="group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 lg:px-16 mt-auto pt-10 border-t border-white/5 text-white/40 text-xs tracking-widest uppercase font-medium relative z-10">
                <p className="order-2 md:order-1 mt-6 md:mt-0">© {new Date().getFullYear()} MUHAMMAD AALIYAN</p>
                <div className="w-12 h-12 flex flex-col items-center justify-center rounded-full border border-white/10 text-white/80 text-[10px] font-bold tracking-widest hover:border-white/50 hover:text-white transition-all duration-300 interactive order-1 md:order-2 bg-white/5 mb-6 md:mb-0">
                    <span className="leading-none mt-1">MA</span>
                </div>
                <p className="order-3 mt-6 md:mt-0">BUILT SLOW. BUILT SOLID.</p>
            </div>
        </div>
    )
}

export default Footer;