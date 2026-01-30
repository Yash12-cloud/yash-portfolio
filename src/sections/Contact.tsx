import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Web3Forms submission
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7ad8948d-00bd-4985-89bc-89f03a2916ca',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }

    } catch (error) {
      setIsSubmitting(false);
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again or contact me directly via email.');
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'yashnimje2005@gmail.com', href: 'mailto:yashnimje2005@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 7498882769', href: 'tel:+917498882769' },
    { icon: MapPin, label: 'Location', value: 'Maharashtra, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yash-nimje-838934342', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Yash12-cloud', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/yashnimje__?igsh=eWFncWdsdzB0Yzdv', label: 'Instagram' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 bg-[#0a0a0a]"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6b35]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span
            className={`inline-block text-xs text-[#ff6b35] uppercase tracking-widest mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Get In Touch
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Let's <span className="text-[#ff6b35]">Work</span> Together
          </h2>
          <p
            className={`text-base text-[#a0a0a0] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div
              className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
            >
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 group"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center group-hover:bg-[#ff6b35]/10 group-hover:border-[#ff6b35]/30 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666] mb-1">{item.label}</p>
                    <p className="text-white group-hover:text-[#ff6b35] transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div
              className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
            >
              <p className="text-sm text-[#666] mb-4">Follow Me</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-11 h-11 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-[#a0a0a0] hover:bg-[#ff6b35]/10 hover:border-[#ff6b35]/30 hover:text-[#ff6b35] hover:scale-110 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    style={{ transitionDelay: `${600 + index * 80}ms` }}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div
              className={`inline-flex items-center gap-3 px-5 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-[#a0a0a0]">Available for new projects</span>
            </div>
          </div>

          {/* Form Side */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                      ? '-top-2.5 text-xs text-[#ff6b35] bg-[#0a0a0a] px-1'
                      : 'top-4 text-[#666]'
                      }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                      ? '-top-2.5 text-xs text-[#ff6b35] bg-[#0a0a0a] px-1'
                      : 'top-4 text-[#666]'
                      }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <label
                  htmlFor="subject"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formData.subject
                    ? '-top-2.5 text-xs text-[#ff6b35] bg-[#0a0a0a] px-1'
                    : 'top-4 text-[#666]'
                    }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                    ? '-top-2.5 text-xs text-[#ff6b35] bg-[#0a0a0a] px-1'
                    : 'top-4 text-[#666]'
                    }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="form-input resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full btn-primary flex items-center justify-center gap-2 group transition-all duration-500 ${isSubmitted ? 'bg-green-500 hover:bg-green-500' : ''
                  }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
