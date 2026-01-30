import { useEffect, useRef, useState } from 'react';
import { ArrowDown, MapPin, Briefcase } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { Highlight } from '@/components/ui/hero-highlight';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#0a0a0a]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2a2a2a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Glow Orbs */}
      <div
        className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff6b35]/10 blur-[150px] transition-all duration-1000 ${isLoaded ? 'opacity-60 scale-100' : 'opacity-0 scale-0'
          }`}
        style={{ animation: isLoaded ? 'float 10s ease-in-out infinite' : 'none' }}
      />
      <div
        className={`absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ff6b35]/5 blur-[120px] transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-0'
          }`}
        style={{ animation: isLoaded ? 'float 8s ease-in-out infinite 2s' : 'none' }}
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full section-padding h-screen flex items-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full max-w-7xl mx-auto">

          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Location Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <MapPin size={12} className="text-[#ff6b35]" />
              <span className="text-xs text-[#a0a0a0]">Maharashtra, India</span>
            </div>

            {/* Main Headline */}
            <div className="mb-1">
              <p
                className={`text-base md:text-lg text-[#a0a0a0] transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
              >
                Hi, I'm
              </p>
            </div>

            <div className="mb-3">
              <h1
                className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
              >
                Yash <Highlight className="text-white bg-gradient-to-r from-[#ff6b35] to-[#ff8c61]">Nimje</Highlight>
              </h1>
            </div>

            <div className="mb-4">
              <div
                className={`flex items-center gap-2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
              >
                <Briefcase size={18} className="text-[#ff6b35] flex-shrink-0" />
                <p className="text-base sm:text-lg md:text-xl text-white/90 font-light">
                  AI/ML | Software Developer | Backend
                </p>
              </div>
            </div>

            {/* Description */}
            <div
              className={`max-w-xl mb-5 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <p className="text-sm md:text-base text-[#a0a0a0] leading-relaxed">
                I build scalable backend systems and data-driven applications with a strong focus on
                machine learning and real-world problem solving. I work at the intersection of logic,
                data, and engineering to create reliable and impactful software.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-3 mb-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <button onClick={scrollToProjects} className="btn-primary text-sm px-6 py-3 flex items-center gap-2 group">
                View My Work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </button>
              <button onClick={scrollToContact} className="btn-outline text-sm px-6 py-3">
                Get In Touch
              </button>
            </div>

            {/* Stats Row - Compact */}
            <div
              className={`flex flex-wrap gap-6 pt-4 border-t border-white/10 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-white">10+</p>
                <p className="text-xs text-[#a0a0a0]">Projects</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-white">5+</p>
                <p className="text-xs text-[#a0a0a0]">Technologies</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-white">1+</p>
                <p className="text-xs text-[#a0a0a0]">Years of Experience</p>
              </div>
            </div>
          </div>



          {/* Right Side - Image */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="relative"
            >
              {/* Decorative Frame */}
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[#ff6b35]/30 rounded-xl" />
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-white/10 rounded-xl" />

              {/* Image Container - Fits viewport */}
              <div className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] md:w-[320px] md:h-[400px] lg:w-[350px] lg:h-[440px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-portrait.jpg"
                  alt="Yash Nimje"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div
                className={`absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 shadow-xl transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#ff6b35] text-lg">★</span>
                  </div>
                  <div>
                    <p className="text-xl font-serif font-bold text-white">1+</p>
                    <p className="text-[10px] text-[#a0a0a0]">Years Exp.</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -top-6 right-8 w-5 h-5 bg-[#ff6b35]/40 rounded-full transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                style={{ animation: isLoaded ? 'float 5s ease-in-out infinite' : 'none' }}
              />
              <div
                className={`absolute top-1/3 -right-3 w-2 h-2 bg-white/30 rounded-full transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                style={{ animation: isLoaded ? 'float 6s ease-in-out infinite 1s' : 'none' }}
              />
            </Tilt>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <span className="text-xs text-[#a0a0a0] uppercase tracking-widest">Scroll</span>
        <div className="animate-bounce-subtle">
          <ArrowDown size={20} className="text-[#ff6b35]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
