import { Linkedin, Github, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yash-nimje-838934342', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Yash12-cloud', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/yashnimje__?igsh=eWFncWdsdzB0Yzdv', label: 'Instagram' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full py-8 bg-[#0a0a0a] border-t border-[#2a2a2a]">
      <div className="section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="font-serif text-xl font-bold"
          >
            <span className="text-white">Yash</span>
            <span className="text-[#ff6b35]"> Nimje</span>
          </a>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-[#a0a0a0] hover:text-[#ff6b35] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center text-[#666] hover:text-[#ff6b35] hover:scale-110 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center">
          <p className="text-sm text-[#666] flex items-center justify-center gap-1">
            © {currentYear} Yash Nimje. Made with{' '}
            <Heart size={14} className="text-[#ff6b35] fill-[#ff6b35]" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
