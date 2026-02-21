"use client"
import React, { useEffect, useState, useRef } from 'react'
import Particles from './Particles'
import Image from 'next/image'
import heroImg from '../public/hero.jpg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const roles = [
    'Backend Developer',
    'Frontend Developer',
    'Full-Stack Developer'
]

const Hero = () => {
    const [text, setText] = useState('')
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [cursor, setCursor] = useState(true)

    const heroRef = useRef<HTMLDivElement>(null)
    const textWrapperRef = useRef<HTMLDivElement>(null)
    const imageWrapperRef = useRef<HTMLDivElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const blink = setInterval(() => setCursor(prev => !prev), 500)
        return () => clearInterval(blink)
    }, [])

    useEffect(() => {
        const current = roles[index]
        if (!deleting && subIndex < current.length) {
            const timeout = setTimeout(() => {
                setText(current.slice(0, subIndex + 1))
                setSubIndex(subIndex + 1)
            }, 100)
            return () => clearTimeout(timeout)
        } else if (deleting && subIndex > 0) {
            const timeout = setTimeout(() => {
                setText(current.slice(0, subIndex - 1))
                setSubIndex(subIndex - 1)
            }, 60)
            return () => clearTimeout(timeout)
        } else if (!deleting && subIndex === current.length) {
            const timeout = setTimeout(() => setDeleting(true), 1200)
            return () => clearTimeout(timeout)
        } else if (deleting && subIndex === 0) {
            setDeleting(false)
            setIndex((index + 1) % roles.length)
        }
    }, [subIndex, index, deleting])

    // Entrance and Scroll Animations
    useEffect(() => {
        if (!heroRef.current) return

        const ctx = gsap.context(() => {
            // Entrance
            gsap.fromTo(
                textWrapperRef.current?.children ? Array.from(textWrapperRef.current.children) : [],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.4 }
            );

            gsap.fromTo(
                imageWrapperRef.current,
                { scale: 0.8, opacity: 0, rotationY: 20 },
                { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: "power3.out", delay: 0.6 }
            );

            // Scroll parallax
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            })

            timeline.to(textWrapperRef.current, {
                y: -100,
                opacity: 0,
                ease: "none"
            }, 0)

            timeline.to(imageWrapperRef.current, {
                y: -60,
                opacity: 0.2,
                ease: "none"
            }, 0)

            timeline.to(particlesRef.current, {
                y: 50,
                ease: "none"
            }, 0)
        }, heroRef);

        return () => ctx.revert();
    }, [])

    // 3D Image Tilt Effect
    useEffect(() => {
        const container = imageContainerRef.current;
        const imgWrapper = imageWrapperRef.current;
        if (!container || !imgWrapper) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) / (width / 2);
            const y = (e.clientY - (top + height / 2)) / (height / 2);

            gsap.to(imgWrapper, {
                rotationY: x * 15,
                rotationX: -y * 15,
                duration: 0.6,
                ease: "power2.out",
                transformPerspective: 1000
            });
        };

        const handleMouseLeave = () => {
            gsap.to(imgWrapper, {
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={heroRef} className="relative w-full min-h-screen pt-24 overflow-hidden flex items-center justify-center">

            <div ref={particlesRef} className="absolute inset-0 z-0 opacity-40">
                <Particles
                    particleColors={["#ffffff", "#aaaaaa"]}
                    particleCount={150}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={80}
                    moveParticlesOnHover
                    alphaParticles={true}
                    disableRotation={false}
                    pixelRatio={2}
                />
            </div>

            <div className="z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 gap-16 relative">

                {/* Text Content */}
                <div ref={textWrapperRef} className="flex-1 flex flex-col items-start gap-6 w-full relative z-20">
                    <p className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md interactive">
                        Welcome to my Portfolio
                    </p>

                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-main font-bold leading-[1.05] tracking-tight">
                        Hey, I am <br />
                        <span className="text-gradient interactive relative z-10">Muhammad Aaliyan.</span>
                    </h1>

                    <h2 className="text-gray-300 text-2xl md:text-3xl lg:text-4xl font-main font-medium leading-[1.3] mt-2 h-[80px] md:h-auto overflow-hidden">
                        I'm a {' '}
                        <span className="text-white font-semibold block sm:inline-block">
                            {text}
                            <span className="text-white/50 relative -top-1 ml-[2px]">{cursor ? '|' : ' '}</span>
                        </span>
                    </h2>

                    <p className='text-white/50 text-base lg:text-lg font-medium max-w-lg leading-relaxed mt-2'>
                        From solid backends to smooth frontends, I turn complex ideas into living digital experiences. Built with passion and precision.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-5">
                        <button className="px-8 py-3.5 bg-white text-black rounded-full font-semibold text-sm tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] interactive">
                            Explore Work
                        </button>
                        <button className="px-8 py-3.5 bg-transparent border border-white/20 text-white rounded-full font-semibold text-sm tracking-wider hover:bg-white/5 transition-colors interactive">
                            Contact Me
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div
                    ref={imageContainerRef}
                    className="flex-1 flex justify-center lg:justify-end items-center relative z-20 w-full"
                >
                    <div
                        ref={imageWrapperRef}
                        className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] relative rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.06)] border border-white/10 interactive group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent z-10 rounded-full mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0"></div>
                        <Image
                            src={heroImg}
                            alt="Muhammad Aaliyan"
                            className="object-cover w-full h-full grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            priority
                            sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 450px"
                        />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-[0.4em] text-white uppercase font-medium">Scroll</span>
                <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
                    <div className="w-full h-1/2 bg-white absolute top-0 -translate-y-full animate-scroll-down"></div>
                </div>
            </div>
        </div>
    )
}

export default Hero