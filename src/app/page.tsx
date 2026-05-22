'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  Sun,
  Moon,
  User,
  Briefcase,
  FileCode,
  PenTool,
  Send,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type Theme = 'dark' | 'light';

interface Project {
  id: number;
  title: string;
  role: string;
  problem: string;
  solution: string;
  challenges: string;
  impact: string;
  technologies: string[];
  image: string;
}

export default function Home() {
  // State variables
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'developer' | 'designer'>('developer');
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeSlide, setActiveSlide] = useState(0);

  // Refs
  const carouselRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Hero section animations
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0.7]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(heroScrollProgress, [0, 0.5], [0, 50]);

  // Scroll progress indicator for entire page
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Projects data with storytelling
  const projects: Project[] = [
    {
      id: 1,
      title: "Gloryyfunding",
      role: "Full-stack development, checkout architecture, dashboard UX",
      problem: "Prop trading firms needed a comprehensive platform for managing client challenges, payments, and trading evaluations.",
      solution: "Built a full-featured prop trading platform with secure payment gateway integration, challenge tracking system, and risk management tools.",
      challenges: "Implementing secure payment processing with fraud detection, PCI compliance, and seamless checkout experience while handling high-value transactions.",
      impact: "Enabled traders to purchase challenges, track their progress, and withdraw profits through a secure, automated system.",
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe API", "Security", "TypeScript"],
      image: "/gloryyfunding.png"
    },
    {
      id: 2,
      title: "Polerisdigital.com",
      role: "Frontend development, interaction design, responsive delivery",
      problem: "Businesses needed a comprehensive digital platform to establish their online presence and showcase services.",
      solution: "Created a modern SaaS website with responsive design, service showcases, and client engagement features.",
      challenges: "Balancing aesthetic appeal with functionality while ensuring optimal performance across devices.",
      impact: "Provided businesses with a professional digital platform that enhanced their online visibility and client engagement.",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
      image: "/polerisdigital.png"
    },
    {
      id: 3,
      title: "Construction Ops",
      role: "Product engineering, realtime workflows, team coordination",
      problem: "Construction companies needed streamlined operations management and workflow tracking.",
      solution: "Built a comprehensive construction operations platform with real-time project tracking and team coordination.",
      challenges: "Managing complex workflows and ensuring real-time updates across multiple teams.",
      impact: "Streamlined construction workflows and improved team collaboration.",
      technologies: ["Next.js", "Supabase", "Twilio", "React", "TypeScript"],
      image: "/construction-ops.png"
    },
    {
      id: 4,
      title: "Tenant Management System",
      role: "Full-stack development, notifications, admin workflow design",
      problem: "Property managers struggled with tenant communications and lease management.",
      solution: "Developed an integrated tenant management platform with automated notifications and document handling.",
      challenges: "Ensuring seamless communication between property managers and tenants.",
      impact: "Improved tenant satisfaction and reduced administrative overhead.",
      technologies: ["Next.js", "Supabase", "Twilio", "React", "TypeScript"],
      image: "/tenant-management.png"
    },
    {
      id: 5,
      title: "Ersatzteil-Store",
      role: "Shopware development, catalog architecture, API integration",
      problem: "Auto parts retailers needed an efficient e-commerce platform for spare parts.",
      solution: "Created a specialized e-commerce store with advanced part search and inventory management.",
      challenges: "Building intuitive search functionality for technical automotive parts.",
      impact: "Enhanced customer experience and streamlined parts procurement.",
      technologies: ["Shopware 6", "PHP", "MySQL", "Vue.js", "REST API"],
      image: "/ersatzteil-store.png"
    },
    {
      id: 6,
      title: "Blog Post Generator & Scheduler",
      role: "Automation engineering, CMS workflow, AI-assisted tooling",
      problem: "Content creators needed automated blog generation and scheduling capabilities.",
      solution: "Built an AI-powered content generation system with automated publishing and scheduling.",
      challenges: "Integrating AI content generation while maintaining quality and consistency.",
      impact: "Automated content workflow and increased publishing efficiency.",
      technologies: ["Node.js", "AI Integration", "CMS", "React", "MongoDB"],
      image: "/blog-generator.png"
    },
    {
      id: 7,
      title: "LotschFashion E-commerce",
      role: "WordPress development, WooCommerce setup, mobile optimization",
      problem: "Small businesses struggled with managing online inventory and secure payments.",
      solution: "Built a WordPress-based e-commerce platform using Elementor and WooCommerce, integrating real-time inventory and secure payment gateways.",
      challenges: "Ensuring seamless inventory sync and optimizing for mobile performance.",
      impact: "Increased sales by 30% and improved user retention with an intuitive UI.",
      technologies: ["Wordpress", "PHP", "MySQL", "Elementor", "WooCommerce"],
      image: "/lotschfashion.png"
    },
    {
      id: 8,
      title: "SK Information System",
      role: "Laravel development, data modeling, analytics dashboards",
      problem: "Youth organizations needed automated data management and analytics.",
      solution: "Developed a Laravel and React system with AI-powered content generation and real-time analytics.",
      challenges: "Integrating AI models and ensuring data security across users.",
      impact: "Reduced manual reporting time by 40% and enhanced decision-making.",
      technologies: ["Laravel", "React", "MySQL", "Filament", "AI Integration"],
      image: "/skyouth.png"
    },
    {
      id: 9,
      title: "Water Refilling System",
      role: "Desktop app development, reporting, operational UX",
      problem: "Water stations required efficient inventory and sales tracking.",
      solution: "Created a C# desktop app with Windows Forms for inventory and sales analytics.",
      challenges: "Designing a user-friendly interface for non-technical staff.",
      impact: "Improved operational efficiency by 25% and reduced errors.",
      technologies: ["C#", "Windows Forms", "Chart.js", "SQL Server"],
      image: "/aquaease.png"
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

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Poleris LLC",
      context: "SaaS and business websites",
      summary: "Delivered responsive web experiences for digital service clients, with emphasis on clean UI, performance, and reusable frontend patterns.",
      highlights: [
        "Built polished Next.js pages and components for service-focused business sites.",
        "Used Tailwind CSS and Framer Motion to create responsive interfaces with restrained motion.",
        "Turned client content and service offerings into clearer product pages and calls to action."
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Full Stack Developer",
      company: "Gloryyfunding",
      context: "Prop trading platform",
      summary: "Built customer-facing and internal features for a trading challenge platform, including checkout, dashboards, evaluation flows, and payout-related workflows.",
      highlights: [
        "Developed a secure checkout experience around high-value challenge purchases.",
        "Built dashboard views for traders to follow account progress and evaluation status.",
        "Worked on data flows for challenge tracking, client management, and operational review."
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe API", "TypeScript"]
    },
    {
      title: "Full Stack Developer",
      company: "Stanton Management LLC",
      context: "Operations and property tools",
      summary: "Created internal tools for construction operations and tenant management, focused on communication, workflow visibility, and administrative efficiency.",
      highlights: [
        "Built project tracking and coordination features for construction workflows.",
        "Developed tenant communication flows with notification support.",
        "Designed admin screens around practical day-to-day property and operations tasks."
      ],
      technologies: ["Next.js", "Supabase", "Twilio", "React", "TypeScript"]
    },
    {
      title: "Web Developer / CMS Developer",
      company: "Freelance",
      context: "Ecommerce and CMS",
      summary: "Built and customized WordPress, WooCommerce, and Shopware experiences for clients that needed storefronts, catalog workflows, and content tools.",
      highlights: [
        "Customized ecommerce storefronts with product, inventory, and checkout considerations.",
        "Worked with CMS structures that made content updates easier for non-technical users.",
        "Handled PHP-based plugin and theme adjustments across WordPress and Shopware projects."
      ],
      technologies: ["Shopware 6", "WordPress", "WooCommerce", "PHP", "MySQL", "CMS"]
    },
    {
      title: "Automation Developer",
      company: "Freelance",
      context: "Content systems",
      summary: "Built blog generation and scheduling workflows that helped content teams reduce repetitive publishing work.",
      highlights: [
        "Created scheduling logic for planned content releases.",
        "Connected content generation workflows with CMS-style review and publishing steps.",
        "Focused automation on repeatable tasks while keeping human review in the process."
      ],
      technologies: ["JavaScript", "Node.js", "CMS", "Automation", "API Integration"]
    },
    {
      title: "Software Engineer Intern",
      company: "RAFI-MFI IT Unit",
      context: "Mobile and API development",
      summary: "Contributed to the Kawani app by building a purchase requisition service across Flutter screens and .NET API endpoints.",
      highlights: [
        "Implemented requisition workflows for request creation, review, and status tracking.",
        "Connected mobile UI states with backend API responses for a smoother internal user flow.",
        "Worked inside an existing engineering process, balancing feature delivery with maintainable code."
      ],
      technologies: ["Flutter", ".NET", "API Development", "Mobile UI", "State Management"]
    }
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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Effect to track carousel scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const cardWidth = 432;
        const gap = 32;
        const scrollLeft = container.scrollLeft;
        const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
        setActiveSlide(Math.min(currentIndex, projects.length - 1));
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [projects.length]);

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
      const emailjs = (await import('@emailjs/browser')).default;
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
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-50'
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900'
    } overflow-x-hidden relative`}>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .code-font {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        }

        .screen-backdrop {
          background-image:
            linear-gradient(to right, var(--screen-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--screen-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--scan-line) 1px, transparent 1px);
          background-size: 64px 64px, 64px 64px, 100% 8px;
          mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
        }

        .screen-backdrop::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, transparent 0%, var(--screen-vignette) 74%);
        }

        .hero-doodles {
          animation: sketchFloat 9s ease-in-out infinite;
        }

        @keyframes sketchFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-1deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(1deg);
          }
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

      <div
        aria-hidden="true"
        className="screen-backdrop pointer-events-none fixed inset-0 z-0"
        style={{
          '--screen-line': theme === 'dark' ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.055)',
          '--scan-line': theme === 'dark' ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.03)',
          '--screen-vignette': theme === 'dark' ? 'rgba(3,7,18,0.52)' : 'rgba(249,250,251,0.48)',
        } as React.CSSProperties}
      />

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
        className={`fixed top-0 left-0 right-0 h-1 z-50 ${
          theme === 'dark' ? 'bg-white' : 'bg-black'
        }`}
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
              <span className={`text-xl font-bold code-font tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
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
                      ? theme === 'dark' ? 'text-white font-semibold' : 'text-black font-semibold'
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-indigo-600'
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
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
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: isLoading ? 0 : theme === 'dark' ? 0.34 : 0.24, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hero-doodles pointer-events-none absolute inset-x-0 top-20 z-0 hidden h-[calc(100%-5rem)] lg:block"
        >
          <Image
            src="/hero-tech-doodles.png"
            alt=""
            fill
            sizes="100vw"
            className={`object-contain ${
              theme === 'dark' ? 'invert brightness-125' : 'brightness-75'
            }`}
            priority
          />
        </motion.div>

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
              sizes="192px"
              className="object-cover"
              priority
            />
          </motion.div>
          
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: isLoading ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
            className={`text-5xl md:text-7xl font-bold code-font mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-black'
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
            {activeNav === 'developer' ? 'Full Stack Developer for web apps, CMS, and automation' : 'Designer-minded developer focused on clean product experiences'}
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
              ? 'I build production-ready tools with React, Next.js, Laravel, PHP, Supabase, and AI integrations for clients who need software that actually supports daily operations.' 
              : 'I pair practical engineering with thoughtful UI decisions so dashboards, storefronts, and internal systems feel clear, fast, and easy to use.'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className={`max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Recent work includes trading dashboards, property tools, ecommerce stores, CMS workflows, and internal systems for teams that need practical software.
          </motion.p>

          {/* Developer/Designer Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
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
                        ? 'bg-white text-black'
                        : 'bg-black text-white'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-black'
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
            transition={{ delay: 1.45, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              asChild
              className={`px-8 py-3 rounded-full text-lg font-semibold code-font tracking-wide shadow-lg transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <a href="#projects">View Case Studies</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`px-8 py-3 rounded-full text-lg font-semibold code-font tracking-wide border-2 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-black text-black hover:bg-black/10'
              }`}
            >
              <a href="#contact">Start a Project</a>
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
                  theme === 'dark' ? 'hover:bg-gray-800/50 text-gray-400 hover:text-white' : 'hover:bg-gray-200/50 text-gray-600 hover:text-black'
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
                theme === 'dark' ? 'bg-gradient-to-r from-gray-600/20 to-gray-700/20' : 'bg-gradient-to-r from-gray-300/20 to-gray-400/20'
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
            <h2 className={`text-4xl font-semibold code-font mb-6 text-center tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              About Me
            </h2>
            <p className={`text-lg mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I'm John Rey Amad, a full-stack developer who turns business workflows into dependable web apps, CMS tools, dashboards, and automation systems. I like working close to the actual problem: how users move through the product, where teams lose time, and which parts of the system need to be simple, fast, and maintainable.
            </p>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              My strongest stack is React, Next.js, Laravel, PHP, TypeScript, Supabase, and WordPress/Shopware. I also build AI-assisted workflows when they make the product more useful rather than just more flashy.
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
            className={`text-4xl font-semibold code-font text-center mb-16 tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {activeNav === 'developer' ? 'Technical Expertise' : 'Design Proficiency'}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(activeNav === 'developer' ? [
              {
                title: "Frontend Development",
                skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive UI", "Dashboard UX"]
              },
              {
                title: "Backend Development",
                skills: ["Laravel & PHP", "Node.js", "Supabase", "MySQL & PostgreSQL", "REST APIs", "Authentication"]
              },
              {
                title: "DevOps & Tools",
                skills: ["Git & GitHub", "Vercel", "Docker Basics", "WordPress", "Shopware 6", "AI Integration"]
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
                <h3 className={`text-xl font-semibold code-font mb-4 tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      className="flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <Code className={`h-4 w-4 mr-2 group-hover:scale-110 transition-transform ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`code-font transition-colors ${
                        theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'
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
            className={`text-4xl font-semibold code-font text-center mb-4 tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`max-w-2xl mx-auto text-center mb-14 text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Roles and client work where I shipped practical software across web apps, ecommerce, internal tools, mobile features, and automation.
          </motion.p>

          <div className="max-w-5xl mx-auto">
            <div className={`relative border-l pl-6 md:pl-10 space-y-8 ${
              theme === 'dark' ? 'border-white/15' : 'border-black/15'
            }`}>
              {experiences.map((experience, index) => (
                <motion.article
                  key={`${experience.company}-${experience.title}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative rounded-lg border p-5 md:p-6 shadow-lg ${
                    theme === 'dark'
                      ? 'border-white/10 bg-gray-900/70'
                      : 'border-black/10 bg-white/75'
                  } backdrop-blur-md`}
                >
                  <span className={`absolute -left-[31px] md:-left-[47px] top-7 h-3 w-3 rounded-full ring-4 ${
                    theme === 'dark'
                      ? 'bg-cyan-300 ring-gray-950'
                      : 'bg-cyan-700 ring-gray-50'
                  }`} />

                  <div>
                    <div>
                      <p className={`mb-2 text-xs uppercase code-font ${
                        theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                      }`}>
                        {experience.context}
                      </p>
                      <h3 className={`text-xl md:text-2xl font-semibold code-font tracking-tight ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {experience.title}
                      </h3>
                      <p className={`mt-1 text-base ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {experience.company}
                      </p>
                    </div>
                  </div>

                  <p className={`mt-5 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {experience.summary}
                  </p>

                  <ul className={`mt-5 space-y-3 text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          theme === 'dark' ? 'bg-cyan-300' : 'bg-cyan-700'
                        }`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-3 py-1 rounded-full code-font font-medium ${
                          theme === 'dark'
                            ? 'bg-cyan-900/30 text-cyan-300'
                            : 'bg-cyan-100/60 text-cyan-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
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
            className={`text-4xl font-semibold code-font text-center mb-4 tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Selected Case Studies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-center mb-12 text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            A focused look at the problems, implementation decisions, and outcomes behind each build. Public links are intentionally omitted here to keep client work and private repositories private.
          </motion.p>

{/* Projects Carousel */}
          <div className="relative group/carousel py-4">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = 432;
                  carouselRef.current.scrollBy({ left: -(cardWidth), behavior: 'smooth' });
                }
              }}
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = 432;
                  carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
              }}
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={carouselRef}
              id="projects-carousel"
              className="relative flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-12 md:px-20 pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  carouselRef.current?.scrollBy({ left: -432, behavior: 'smooth' });
                } else if (e.key === 'ArrowRight') {
                  carouselRef.current?.scrollBy({ left: 432, behavior: 'smooth' });
                }
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`project-card flex-shrink-0 w-[85vw] sm:w-[400px] snap-start rounded-lg overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
                  } backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
                >
                  <div className="relative w-full h-48 md:h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 85vw, 400px"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 pointer-events-none"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-white code-font line-clamp-3">
                        <strong>Challenges:</strong> {project.challenges}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="mb-4">
                      <p className={`mb-2 text-[11px] uppercase code-font ${
                        theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
                      }`}>
                        {project.role}
                      </p>
                      <h3 className="text-lg md:text-xl font-semibold code-font tracking-tight">{project.title}</h3>
                    </div>
                    <p className={`mb-3 text-xs md:text-sm leading-relaxed code-font line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <strong>Problem:</strong> {project.problem}
                    </p>
                    <p className={`mb-4 text-xs md:text-sm leading-relaxed code-font line-clamp-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <strong>Solution:</strong> {project.solution}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full code-font font-medium tracking-tighter ${
                            theme === 'dark'
                              ? 'bg-indigo-900/30 text-indigo-300'
                              : 'bg-indigo-100/50 text-indigo-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`text-xs px-2 py-1 rounded-full code-font font-medium tracking-tighter ${
                          theme === 'dark'
                            ? 'bg-gray-800 text-gray-400'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className={`rounded-lg border p-3 ${
                      theme === 'dark'
                        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                        : 'border-emerald-700/20 bg-emerald-50 text-emerald-900'
                    }`}>
                      <p className="text-[11px] uppercase code-font font-semibold mb-1">Outcome</p>
                      <p className="text-xs md:text-sm leading-relaxed code-font">{project.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (carouselRef.current) {
                      const cardWidth = 432;
                      carouselRef.current.scrollTo({
                        left: index * (cardWidth + 32),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? theme === 'dark'
                        ? 'bg-white w-6'
                        : 'bg-black w-6'
                      : theme === 'dark'
                        ? 'bg-gray-600 w-2 hover:bg-gray-400'
                        : 'bg-gray-400 w-2 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <p className={`text-center mt-8 text-sm code-font ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            9 project snapshots across SaaS, operations, ecommerce, CMS, and automation.
          </p>
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
