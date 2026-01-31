import { useEffect, useRef, useState } from 'react';
import { Download, Award, Users, FolderCheck } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'Projects Completed', icon: FolderCheck },
  { value: 5, suffix: '+', label: 'Core Technologies', icon: Users },
  { value: 1, suffix: '+', label: 'Years of Practical Experience', icon: Award },
];

const skills = [
  'Python',
  'C++',
  'Data Structures & Algorithms',
  'Problem Solving',
  'OOP Concepts',
  'Pandas & NumPy',
  'Data Cleaning & EDA',
  'Feature Engineering',
  'Matplotlib & Seaborn',
  'SQL',
  'Git & GitHub',
  'Jupyter Notebook',
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;

          // Animate counters
          stats.forEach((stat, index) => {
            const duration = 1500;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 bg-[#0a0a0a]"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-12'
              }`}
          >


            {/* Image Frame */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="relative max-w-sm mx-auto lg:mx-0"
            >
              {/* Decorative Frame */}
              <div className="absolute -top-2 -left-2 w-full h-full border-2 border-[#ff6b35]/30 rounded-xl" />
              <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-white/10 rounded-xl" />

              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-portrait.jpg"
                  alt="Yash Nimje"
                  className="w-full aspect-[3/4] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div
                className={`absolute -bottom-4 -right-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2.5 shadow-xl transition-all duration-700 delay-300 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#ff6b35]" />
                  </div>
                  <div>
                    <p className="text-lg font-serif font-bold text-white">1+</p>
                    <p className="text-[10px] text-[#a0a0a0]">Years Exp.</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Content Side */}
          <div>
            {/* Label */}
            <span
              className={`inline-block text-xs text-[#ff6b35] uppercase tracking-widest mb-2 transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              About Me
            </span>

            {/* Headline */}
            <h2
              className={`font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              Building Practical, <span className="text-[#ff6b35]">Data-Driven</span> Software
            </h2>

            {/* Description */}
            <div
              className={`mb-5 transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '400ms' }}
            >
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                I focus on building software that is structured, scalable, and grounded in real use cases.
                My work revolves around backend systems and machine learning, with an emphasis on clean
                design, performance, and long-term maintainability.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-3 mb-5 transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '500ms' }}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
                >
                  <stat.icon className="w-4 h-4 text-[#ff6b35] mx-auto mb-1" />
                  <p className="text-xl md:text-2xl font-serif font-bold text-white">
                    {counters[index]}
                    {stat.suffix}
                  </p>
                  <p className="text-[10px] text-[#a0a0a0]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div
              className={`mb-5 transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '600ms' }}
            >
              <h3 className="text-xs text-[#a0a0a0] uppercase tracking-widest mb-2">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`text-xs px-2 py-1 bg-white/5 text-[#a0a0a0] rounded border border-white/10 transition-all duration-500 ${isVisible
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-90'
                      }`}
                    style={{ transitionDelay: `${700 + index * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '800ms' }}
            >
              <button className="btn-primary flex items-center gap-2 group">
                <Download
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
