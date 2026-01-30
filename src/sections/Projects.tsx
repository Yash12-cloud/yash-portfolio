import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  status: 'completed' | 'in-development' | 'coming-soon';
  progress?: number;
  tags: string[];
  description?: string;
  image?: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Coming Soon',
    status: 'coming-soon',
    tags: ['TBA'],
    image: '/project-placeholder.jpg',
  },
  {
    id: 2,
    title: 'Coming Soon',
    status: 'coming-soon',
    tags: ['TBA'],
    image: '/project-placeholder.jpg',
  },
  {
    id: 3,
    title: 'Coming Soon',
    status: 'coming-soon',
    tags: ['TBA'],
    image: '/project-placeholder.jpg',
  },
  {
    id: 4,
    title: 'Coming Soon',
    status: 'coming-soon',
    tags: ['TBA'],
    image: '/project-placeholder.jpg',
  },
];

const ITEMS_PER_PAGE = 3;

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const displayedProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Circular progress component
  const CircularProgress = ({ progress }: { progress: number }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#2a2a2a"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-12 md:py-16 bg-[#0a0a0a]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span
            className={`inline-block text-xs text-[#ff6b35] uppercase tracking-widest mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
          >
            Portfolio
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Featured <span className="text-[#ff6b35]">Projects</span>
          </h2>
          <p
            className={`text-sm text-[#a0a0a0] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            A selection of my recent work and experiments
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#ff6b35]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ff6b35]/10 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {project.status === 'coming-soon' ? (
                // Coming Soon Card
                <div className="relative h-48 md:h-56">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]">
                    <img
                      src={project.image || '/project-placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-40 grayscale"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-serif text-xl font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-[#a0a0a0]">{project.tags[0]}</span>
                  </div>
                </div>
              ) : (
                // Active Project Card
                <div className="p-5 h-48 md:h-56 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {project.progress !== undefined && (
                        <CircularProgress progress={project.progress} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-semibold text-white mb-2 truncate">
                        {project.title}
                      </h3>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 text-[10px] rounded-full border transition-transform duration-300 hover:scale-105 cursor-default ${tag === 'In Development'
                              ? 'bg-green-500/10 text-green-400 border-green-500/30'
                              : tag === 'AI'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : 'bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/30'
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#1a1a1a] text-white rounded-full border border-[#2a2a2a] hover:bg-[#ff6b35] hover:border-[#ff6b35] hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <ExternalLink size={12} />
                        Details
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#1a1a1a] text-white rounded-full border border-[#2a2a2a] hover:bg-[#333] hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={prevPage}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#ff6b35]/50 hover:bg-[#2a2a2a] hover:scale-110 active:scale-90 transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>

          {
            Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 active:scale-90 ${currentPage === index
                  ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                  : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0] hover:border-[#ff6b35]/50 hover:text-white'
                  }`}
              >
                {index + 1}
              </button>
            ))
          }

          <button
            onClick={nextPage}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#ff6b35]/50 hover:bg-[#2a2a2a] hover:scale-110 active:scale-90 transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="px-6 py-2.5 text-sm bg-[#1a1a1a] text-white rounded-full border border-[#2a2a2a] hover:border-[#ff6b35] hover:bg-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group">
            View All Projects
            <ExternalLink size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section >
  );
};

export default Projects;
