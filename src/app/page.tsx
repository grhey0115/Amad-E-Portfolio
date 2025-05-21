'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowUp,
  ExternalLink,
  Sun,
  Moon,
  Calendar,
  User,
  Briefcase,
  FileCode,
  PenTool,
  Send,
  MessageSquare
} from "lucide-react";

type Theme = 'dark' | 'light';

interface Project {
  id: number;
  title: string;
  problem: string;
  solution: string;
  challenges: string;
  impact: string;
  technologies: string[];
  image: string;
  link: string;
  github?: string;
  description?: string;
}

interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export default function Home() {
  // State variables
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'developer' | 'designer'>('developer');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Hero section animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Scroll progress indicator
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Projects data with storytelling
  const projects: Project[] = [
    {
      id: 1,
      title: "LotschFashion E-commerce",
      problem: "Small businesses struggled with managing online inventory and secure payments.",
      solution: "Built a WordPress-based e-commerce platform using Elementor and WooCommerce, integrating real-time inventory and secure payment gateways.",
      challenges: "Ensuring seamless inventory sync and optimizing for mobile performance.",
      impact: "Increased sales by 30% and improved user retention with an intuitive UI.",
      technologies: ["Wordpress", "PHP", "MySQL", "Elementor", "WooCommerce"],
      image: "/lotschfashion.png",
      link: "https://demo.ayon.ph",
      github: "https://github.com/grhey0115/lotschfashion-E-commerce",
      description: "A complete e-commerce solution for a fashion retailer featuring real-time inventory management, secure payment processing, and a responsive mobile-first design. The platform provides an intuitive shopping experience with personalized recommendations and easy checkout flow."
    },
    {
      id: 2,
      title: "SK Information System",
      problem: "Youth organizations needed automated data management and analytics.",
      solution: "Developed a Laravel and React system with AI-powered content generation and real-time analytics.",
      challenges: "Integrating AI models and ensuring data security across users.",
      impact: "Reduced manual reporting time by 40% and enhanced decision-making.",
      technologies: ["Laravel", "React", "MySQL", "Filament", "AI Integration"],
      image: "/skyouth.png",
      link: "https://skyouthfiles.site",
      github: "https://github.com/grhey0115/YouthFiles",
      description: "A comprehensive data management system for youth organizations featuring AI-assisted content generation, real-time analytics dashboards, and secure multi-user access controls. The platform streamlines administrative tasks and provides valuable insights for better program planning."
    },
    {
      id: 3,
      title: "Water Refilling System",
      problem: "Water stations required efficient inventory and sales tracking.",
      solution: "Created a C# desktop app with Windows Forms for inventory and sales analytics.",
      challenges: "Designing a user-friendly interface for non-technical staff.",
      impact: "Improved operational efficiency by 25% and reduced errors.",
      technologies: ["C#", "Windows Forms", "Chart.js", "SQL Server"],
      image: "/aquaease.png",
      link: "https://example.com/project3",
      description: "A desktop application for water refilling stations that manages inventory, tracks sales, and provides comprehensive analytics. The system features an intuitive interface designed for non-technical users, automated reporting, and integration with point-of-sale hardware."
    },
  ];

  
  

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home", icon: User },
    { name: "About", href: "#about", icon: User },
     { name: "Skills", href: "#skills", icon: PenTool },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FileCode },
    { name: "Contact", href: "#contact", icon: Send }
  ];

  // Effect to observe sections and update active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Effect to control animations when sections are in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Effect to detect system theme preference
  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(systemPrefersDark ? 'dark' : 'light');
  }, []);

  // Effect to apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Effect to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await emailjs.sendForm(
        'service_kwsrmt4', 
        'template_1aztb6g', 
        form,
        'FEnNG0JVbIdUs4rTv' 
      );
      
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen font-[Poppins] transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-gray-50' 
        : 'bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 text-gray-900'
    } overflow-x-hidden relative`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Poppins', sans-serif;
        }
        .code-font {
          font-family: 'Space Mono', monospace;
        }

        .loader {
          --path: #2f3545;
          --dot: rgb(191, 64, 191);
          --duration: 3s;
          width: 44px;
          height: 44px;
          position: relative;
          display: inline-block;
          margin: 0 16px;
        }

        .loader:before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: var(--dot);
          top: 37px;
          left: 19px;
          transform: translate(-18px, -18px);
          animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        .loader svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .loader svg rect,
        .loader svg polygon,
        .loader svg circle {
          fill: none;
          stroke: var(--path);
          stroke-width: 10px;
          stroke-linejoin: round;
          stroke-linecap: round;
        }

        .loader svg polygon {
          stroke-dasharray: 145 76 145 76;
          stroke-dashoffset: 0;
          animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        .loader svg rect {
          stroke-dasharray: 192 64 192 64;
          stroke-dashoffset: 0;
          animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        .loader svg circle {
          stroke-dasharray: 150 50 150 50;
          stroke-dashoffset: 75;
          animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        .loader.triangle {
          width: 48px;
        }

        .loader.triangle:before {
          left: 21px;
          transform: translate(-10px, -18px);
          animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        @keyframes pathTriangle {
          33% {
            stroke-dashoffset: 74;
          }
          66% {
            stroke-dashoffset: 147;
          }
          100% {
            stroke-dashoffset: 221;
          }
        }

        @keyframes dotTriangle {
          33% {
            transform: translate(0, 0);
          }
          66% {
            transform: translate(10px, -18px);
          }
          100% {
            transform: translate(-10px, -18px);
          }
        }

        @keyframes pathRect {
          25% {
            stroke-dashoffset: 64;
          }
          50% {
            stroke-dashoffset: 128;
          }
          75% {
            stroke-dashoffset: 192;
          }
          100% {
            stroke-dashoffset: 256;
          }
        }

        @keyframes dotRect {
          25% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(18px, -18px);
          }
          75% {
            transform: translate(0, -36px);
          }
          100% {
            transform: translate(-18px, -18px);
          }
        }

        @keyframes pathCircle {
          25% {
            stroke-dashoffset: 125;
          }
          50% {
            stroke-dashoffset: 175;
          }
          75% {
            stroke-dashoffset: 225;
          }
          100% {
            stroke-dashoffset: 275;
          }
        }
      `}</style>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
          >
            <div className="flex items-center justify-center">
              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <circle r={32} cy={40} cx={40} id="test" />
                </svg>
              </div>
              <div className="loader triangle">
                <svg viewBox="0 0 86 80">
                  <polygon points="43 8 79 72 7 72" />
                </svg>
              </div>
              <div className="loader">
                <svg viewBox="0 0 80 80">
                  <rect height={64} width={64} y={8} x={8} />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50"
        style={{ 
          width: scrollProgress,
          transform: 'translateZ(0)',
          willChange: 'width'
        }}
      />

      {/* Fixed Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md ${
        theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
      } ${showScrollTop ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-xl font-bold code-font tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                JRA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    activeSection === link.href.substring(1) 
                      ? 'text-indigo-500 font-semibold' 
                      : theme === 'dark' ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-indigo-600'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full focus:outline-none"
                aria-label="Open menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-indigo-500" />
                ) : (
                  <Menu className="h-6 w-6 text-indigo-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed top-16 right-0 bottom-0 z-40 w-64 ${
              theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
            } backdrop-blur-md shadow-xl`}
          >
            <nav className="flex flex-col p-6 h-full">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center py-4 px-2 text-lg font-medium border-b ${
                    theme === 'dark' 
                      ? 'border-gray-800 text-gray-300 hover:text-indigo-400' 
                      : 'border-gray-100 text-gray-700 hover:text-indigo-600'
                  } ${activeSection === link.href.substring(1) ? 'text-indigo-500' : ''}`}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.name}
                </motion.a>
              ))}
              
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex space-x-4 justify-center">
                  {[
                    { href: "https://github.com/grhey0115", icon: Github },
                    { href: "https://linkedin.com/in/johnamad", icon: Linkedin },
                    { href: "mailto:amadjohnrey01@gmail.com", icon: Mail },
                  ].map(({ href, icon: Icon }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className={`p-3 rounded-full transform transition-all duration-200 ${
                        theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-indigo-400' : 'hover:bg-gray-200 text-gray-600 hover:text-indigo-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-40 ${
              theme === 'dark' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            } transition-all duration-300`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section with Profile Picture */}
      <motion.section 
        id="home"
        ref={heroRef}
        style={{ 
          opacity: heroOpacity, 
          scale: heroScale,
          y: heroY
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="min-h-screen flex items-center justify-center relative pt-20"
      >
        <div className="container mx-auto px-6 text-center relative z-10 pt-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden"
          >
            <Image
              src="/profile.png"
              alt="John Rey Amad"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: isLoading ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
            className={`text-5xl md:text-7xl font-bold code-font mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-indigo-300 via-purple-400 to-pink-400' 
                : 'from-indigo-600 via-purple-600 to-pink-600'
            }`}
          >
            John Rey Amad
          </motion.h1>
          <motion.p 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`text-xl md:text-2xl mb-6 font-light tracking-wide ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {activeNav === 'developer' ? 'Full Stack Developer & Code Architect' : 'Creative Designer & UI Innovator'}
          </motion.p>
          <motion.p 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {activeNav === 'developer' 
              ? 'Building robust, scalable solutions with modern technologies' 
              : 'Crafting intuitive, visually stunning digital experiences'}
          </motion.p>

          {/* Developer/Designer Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className={`inline-flex p-1 rounded-full ${
              theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-200/70'
            }`}>
              {['developer', 'designer'].map((nav) => (
                <button
                  key={nav}
                  onClick={() => setActiveNav(nav as 'developer' | 'designer')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeNav === nav
                      ? theme === 'dark' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-indigo-500 text-white'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {nav.charAt(0).toUpperCase() + nav.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              asChild
              className={`px-8 py-3 rounded-full text-lg font-semibold code-font tracking-wide shadow-lg transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
              }`}
            >
              <a href="#projects">Explore My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`px-8 py-3 rounded-full text-lg font-semibold code-font tracking-wide border-2 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-950/20'
                  : 'border-indigo-400 text-indigo-700 hover:bg-indigo-100/20'
              }`}
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex justify-center space-x-6"
          >
            {[
              { href: "https://github.com/grhey0115", icon: Github },
              { href: "https://linkedin.com/in/johnamad", icon: Linkedin },
              { href: "mailto:amadjohnrey01@gmail.com", icon: Mail },
            ].map(({ href, icon: Icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`p-3 rounded-full transform transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-800/50 text-gray-400 hover:text-indigo-400' : 'hover:bg-gray-200/50 text-gray-600 hover:text-indigo-600'
                }`}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12"
          >
            <motion.a
              href="#about"
              whileHover={{ y: -5 }}
              className="text-indigo-500"
            >
              <ChevronDown className="h-8 w-8 mx-auto animate-bounce" />
            </motion.a>
          </motion.div>
        </div>
        
        {/* 3D Particle Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
                y: [Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
                scale: [0.5, 1.5, 0.5],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className={`absolute w-16 h-16 rounded-full blur-xl ${
                theme === 'dark' ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30' : 'bg-gradient-to-r from-indigo-300/30 to-purple-300/30'
              }`}
            />
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
            } backdrop-blur-md`}
          >
            <h2 className="text-4xl font-semibold code-font mb-6 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              About Me
            </h2>
            <p className={`text-lg mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I'm John Rey Amad, a full-stack developer and designer passionate about creating impactful digital solutions. With a degree in Information Technology, I blend technical expertise with creative design to build user-centric applications.
            </p>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              My niche expertise in AI integration and modern frameworks like React and Laravel drives my work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold code-font text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            {activeNav === 'developer' ? 'Technical Expertise' : 'Design Proficiency'}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(activeNav === 'developer' ? [
              {
                title: "Frontend Development",
                skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Responsive Design"]
              },
              {
                title: "Backend Development",
                skills: ["Node.js & Express", "Laravel & PHP", "MongoDB & MySQL", "RESTful APIs", "Authentication", "AI Integration"]
              },
              {
                title: "DevOps & Tools",
                skills: ["Git & GitHub", "Docker & CI/CD", "AWS & Vercel", "Testing", "Agile Methodologies", "Open Source"]
              }
            ] : [
              {
                title: "UI/UX Design",
                skills: ["Figma & Adobe XD", "User Research", "Prototyping", "Wireframing", "Interaction Design", "Accessibility"]
              },
              {
                title: "Visual Design",
                skills: ["Typography", "Color Theory", "Branding", "Motion Graphics", "Iconography", "Layout Design"]
              },
              {
                title: "Design Systems",
                skills: ["Component Libraries", "Design Tokens", "Style Guides", "Responsive Design", "Cross-Platform Design", "User Testing"]
              }
            ]).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
                } backdrop-blur-md`}
              >
                <h3 className="text-xl font-semibold code-font mb-4 text-indigo-500 tracking-tight">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      className="flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <Code className="h-4 w-4 mr-2 text-indigo-500 group-hover:scale-110 transition-transform" />
                      <span className={`code-font group-hover:text-indigo-500 transition-colors ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold code-font text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            Professional Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 md:block hidden" />
              
              {/* Experience item */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mb-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900 md:block hidden" />
                
                <div className={`md:ml-auto md:w-[calc(50%-2rem)] w-full p-6 rounded-2xl shadow-xl ${
                  theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
                } backdrop-blur-md`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold code-font text-indigo-400 mb-2">Software Engineer Intern</h3>
                      <p className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>RAFI-MFI IT Unit</p>
                    </div>
                    <p className={`text-sm code-font mt-2 md:mt-0 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      January 2025 - June 2025
                    </p>
                  </div>
                  <div className={`space-y-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    <p className="leading-relaxed">
                      Developed a Service in their Kawani App for Purchase Requisitions, using Flutter and .NET API framework.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Flutter", ".NET", "API Development", "Mobile Development", "State Management"].map((tech, index) => (
                        <span
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full code-font font-medium ${
                            theme === 'dark' 
                              ? 'bg-indigo-900/30 text-indigo-300' 
                              : 'bg-indigo-100/50 text-indigo-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={ref} className="py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="container mx-auto px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold code-font text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
                className={`rounded-2xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
                } backdrop-blur-md shadow-lg transition-all duration-300`}
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-white code-font">
                      <strong>Challenges:</strong> {project.challenges}
                    </p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold code-font mb-3 tracking-tight">{project.title}</h3>
                  <p className={`mb-4 text-sm leading-relaxed code-font ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <strong>Problem:</strong> {project.problem}<br />
                    <strong>Solution:</strong> {project.solution}<br />
                    <strong>Impact:</strong> {project.impact}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full code-font font-medium tracking-tighter ${
                          theme === 'dark' 
                            ? 'bg-indigo-900/30 text-indigo-300' 
                            : 'bg-indigo-100/50 text-indigo-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      className={`inline-flex items-center text-sm code-font font-medium tracking-tight ${
                        theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-700 hover:text-indigo-600'
                      }`}
                    >
                      🌐 Live Demo
                    </motion.a>
                    {project.github && (
                      <motion.a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className={`inline-flex items-center text-sm code-font font-medium tracking-tight ${
                          theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-700 hover:text-indigo-600'
                        }`}
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`py-24 ${
          theme === 'dark' ? 'bg-gray-950/30' : 'bg-gray-100/30'
        }`}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-semibold code-font text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Let's Collaborate
          </h2>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl shadow-xl ${
              theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
            } backdrop-blur-md`}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block mb-2 text-sm code-font font-medium tracking-tight ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    className={`w-full p-3 rounded-lg code-font text-sm tracking-tight ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-700 text-gray-200 focus:border-indigo-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500'
                    } border focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="Your name"
                    required
                    minLength={2}
                    maxLength={50}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className={`block mb-2 text-sm code-font font-medium tracking-tight ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    className={`w-full p-3 rounded-lg code-font text-sm tracking-tight ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-700 text-gray-200 focus:border-indigo-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500'
                    } border focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200`}
                    placeholder="example@email.com"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </div>
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className={`block mb-2 text-sm code-font font-medium tracking-tight ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full p-3 rounded-lg code-font text-sm tracking-tight ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700 text-gray-200 focus:border-indigo-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500'
                  } border focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-200`}
                  placeholder="Tell me about your project..."
                  required
                  minLength={10}
                  maxLength={1000}
                ></textarea>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-full text-lg font-semibold code-font tracking-wide shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitStatus === 'success' && (
                  <p className="mt-4 text-green-500">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-red-500">Failed to send message. Please try again.</p>
                )}
              </div>
            </form>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className={`mb-4 text-sm code-font tracking-tight ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Or connect directly:
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a 
                href="mailto:amadjohnrey01@gmail.com"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center text-sm code-font tracking-tight ${
                  theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-700 hover:text-indigo-600'
                }`}
              >
                <Mail className="h-5 w-5 mr-2" />
                amadjohnrey01@gmail.com
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-8 ${
        theme === 'dark' ? 'bg-gray-950/50' : 'bg-gray-100/50'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm code-font tracking-tight ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {new Date().getFullYear()} John Rey Amad. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {[
                { href: "https://github.com/grhey0115", icon: Github },
                { href: "https://linkedin.com/in/johnamad", icon: Linkedin },
                { href: "mailto:amadjohnrey01@gmail.com", icon: Mail },
              ].map(({ href, icon: Icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`p-2 rounded-full transform transition-all duration-200 ${
                    theme === 'dark' ? 'hover:bg-gray-800/50 text-gray-400 hover:text-indigo-400' : 'hover:bg-gray-200/50 text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}