"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, ease: 'none' });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
        };

        window.addEventListener('mousemove', moveCursor);

        const handleHover = () => {
            gsap.to(cursor, { scale: 0.5, duration: 0.3 });
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                duration: 0.3
            });
        };

        const handleHoverOut = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(0px)',
                duration: 0.3
            });
        };

        const setupInteractivity = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .interactive, .cursor-pointer');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHover);
                el.addEventListener('mouseleave', handleHoverOut);
            });
        }

        // Slight delay to ensure DOM is ready and setup mutation observer for dynamic elements
        const timeout = setTimeout(setupInteractivity, 500);

        const observer = new MutationObserver(() => {
            setupInteractivity();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clearTimeout(timeout);
            observer.disconnect();
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .interactive, .cursor-pointer');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleHoverOut);
            });
        };
    }, []);

    // Use a subtle mix-blend mode for the dot and a smooth border for the follower
    return (
        <div className="hidden lg:block">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998] transition-colors"
            />
        </div>
    );
};

export default CustomCursor;
