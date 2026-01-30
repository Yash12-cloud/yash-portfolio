import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: 'Senior UI/UX Designer',
    company: 'Google',
    period: '2021 - Present',
    description: 'Leading design initiatives for core products, mentoring junior designers, and establishing comprehensive design systems that scale across teams.',
    type: 'work',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Apple',
    period: '2018 - 2021',
    description: 'Crafted intuitive interfaces for iOS applications, collaborated with engineering teams on implementation, and contributed to the Apple Design Awards.',
    type: 'work',
  },
  {
    id: 3,
    title: 'Graphic Designer',
    company: 'Nike',
    period: '2016 - 2018',
    description: 'Created visual assets for marketing campaigns, developed brand guidelines, and designed print materials for global product launches.',
    type: 'work',
  },
  {
    id: 4,
    title: "Bachelor's in Design",
    company: 'Stanford University',
    period: '2012 - 2016',
    description: 'Major in Visual Communication with focus on digital media and interactive design. Graduated with honors and Dean\'s List recognition.',
    type: 'education',
  },
];

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5))
        );
        setLineProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 bg-[#0a0a0a]"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

      <div className="section-padding">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-center mx-auto">
          <span className="inline-block text-xs text-[#ff6b35] uppercase tracking-widest mb-2">
            My Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Experience & <span className="text-[#ff6b35]">Education</span>
          </h2>
          <p className="text-base text-[#a0a0a0]">
            The path that shaped my expertise and passion for creating exceptional digital experiences.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2a2a2a]">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#ff6b35] to-[#ff6b35]/30 transition-all duration-300"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-10">
            {experiences.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`relative flex items-start md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${isVisible
                      ? 'bg-[#ff6b35] border-[#ff6b35] scale-100'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] scale-75'
                      }`}
                    style={{
                      transform: `translateX(-50%) ${isVisible ? 'scale(1)' : 'scale(0.75)'}`,
                      boxShadow: isVisible ? '0 0 20px rgba(255, 107, 53, 0.5)' : 'none',
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                      } transition-all duration-700 ${isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${isLeft ? '-translate-x-12' : 'translate-x-12'}`
                      }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="group relative bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ff6b35]/30 transition-all duration-300 card-hover">
                      {/* Icon */}
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${item.type === 'work'
                          ? 'bg-[#ff6b35]/10 text-[#ff6b35]'
                          : 'bg-blue-500/10 text-blue-400'
                          }`}
                      >
                        {item.type === 'work' ? (
                          <Briefcase size={18} />
                        ) : (
                          <GraduationCap size={18} />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-semibold text-white mb-1 group-hover:text-[#ff6b35] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <p className="text-[#a0a0a0] mb-3">{item.company}</p>

                      {/* Period */}
                      <div className="flex items-center gap-2 text-sm text-[#666] mb-4">
                        <Calendar size={14} />
                        <span>{item.period}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#a0a0a0] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-xl bg-[#ff6b35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
