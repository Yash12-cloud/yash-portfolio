import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const techStack = [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const TechStack = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Clone items for infinite scroll effect
        const items = track.querySelectorAll('.tech-item');
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // GSAP infinite scroll animation - very slow
        const totalWidth = track.scrollWidth / 2;

        const scrollTween = gsap.to(track, {
            x: -totalWidth,
            duration: 65,
            ease: 'none',
            repeat: -1,
        });

        // Floating animation for each item
        const allItems = track.querySelectorAll('.tech-item');
        allItems.forEach((item, index) => {
            gsap.to(item, {
                y: -8,
                duration: 2 + (index % 3) * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.15,
            });
        });

        // Pause on hover
        track.addEventListener('mouseenter', () => {
            gsap.to(scrollTween, { timeScale: 0.3, duration: 0.5 });
        });
        track.addEventListener('mouseleave', () => {
            gsap.to(scrollTween, { timeScale: 1, duration: 0.5 });
        });

        return () => {
            gsap.killTweensOf(track);
            allItems.forEach((item) => gsap.killTweensOf(item));
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-10 md:py-14 bg-[#0a0a0a] overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

            {/* Section Header */}
            <div className="section-padding mb-8">
                <div className="text-center">
                    <span className="inline-block text-xs text-[#ff6b35] uppercase tracking-widest mb-2">
                        Tech Stack
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                        Technologies I <span className="text-[#ff6b35]">Work</span> With
                    </h2>
                </div>
            </div>

            {/* Scrolling Tech Items */}
            <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                {/* Track */}
                <div
                    ref={trackRef}
                    className="flex gap-10 w-max cursor-pointer py-4"
                >
                    {techStack.map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            className="tech-item w-16 h-16 md:w-20 md:h-20 p-3 bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#2a2a2a] rounded-2xl hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                            title={tech.name}
                        >
                            <img
                                src={tech.logo}
                                alt={tech.name}
                                className="w-full h-full object-contain filter drop-shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
