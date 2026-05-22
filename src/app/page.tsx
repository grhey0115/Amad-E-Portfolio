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

        .drawn-heading {
          font-family: "Trebuchet MS", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          text-shadow:
            0.7px 0 currentColor,
            -0.5px 0 currentColor,
            0 0.7px currentColor;
          filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.16));
        }

        .drawn-heading::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -0.16em;
          width: min(72%, 560px);
          height: 0.16em;
          border-bottom: 3px solid currentColor;
          border-radius: 48% 52% 45% 55%;
          opacity: 0.35;
          transform: translateX(-50%) rotate(-1.4deg);
        }

        .drawn-section-title {
          font-family: "Trebuchet MS", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          text-shadow: 0.45px 0 currentColor;
        }

        .notebook-ink {
          color: var(--notebook-ink);
        }

        .notebook-wash {
          background-color: var(--notebook-wash);
        }

        .sketch-panel {
          position: relative;
        }

        .sketch-panel::before,
        .sketch-panel::after {
          content: "";
          position: absolute;
          pointer-events: none;
          border: 1px solid currentColor;
          border-radius: 12px 9px 14px 10px;
          opacity: 0.18;
        }

        .sketch-panel::before {
          inset: -8px 7px 8px -7px;
          transform: rotate(-0.7deg);
        }

        .sketch-panel::after {
          inset: 7px -8px -7px 8px;
          border-style: dashed;
          transform: rotate(0.8deg);
        }

        .marker-underline {
          position: relative;
          display: inline-block;
        }

        .marker-underline::after {
          content: "";
          position: absolute;
          left: -2%;
          right: -2%;
          bottom: 0.08em;
          height: 0.36em;
          border-radius: 999px;
          background: currentColor;
          opacity: 0.12;
          transform: rotate(-1deg);
          z-index: -1;
        }

        .pin-dot {
          position: absolute;
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 999px;
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.12);
        }

        .paper-tape {
          position: absolute;
          top: -0.75rem;
          left: 1.25rem;
          height: 1.5rem;
          width: 5.25rem;
          border-radius: 3px;
          transform: rotate(-2deg);
          opacity: 0.78;
        }

        .sketch-logo {
          position: relative;
        }

        .sketch-logo::before,
        .sketch-logo::after {
          content: "";
          position: absolute;
          inset: -5px -8px;
          border: 1px solid currentColor;
          border-radius: 45% 55% 48% 52% / 55% 43% 57% 45%;
          opacity: 0.26;
          transform: rotate(-4deg);
        }

        .sketch-logo::after {
          inset: -7px -10px;
          border-style: dashed;
          opacity: 0.16;
          transform: rotate(5deg);
        }

        .sketch-image-frame {
          position: relative;
        }

        .sketch-image-frame::after {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid currentColor;
          border-radius: 9px 12px 8px 13px;
          opacity: 0.28;
          pointer-events: none;
          transform: rotate(-0.6deg);
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
          '--notebook-ink': theme === 'dark' ? '#7dd3fc' : '#0369a1',
          '--notebook-wash': theme === 'dark' ? 'rgba(125, 211, 252, 0.09)' : 'rgba(224, 242, 254, 0.72)',
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
      <header className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 backdrop-blur-md ${
        theme === 'dark' ? 'border-white/10 bg-gray-950/78' : 'border-black/10 bg-white/82'
      } ${showScrollTop ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`sketch-logo flex items-center px-2 py-1 code-font ${
                theme === 'dark' ? 'text-sky-300' : 'text-sky-700'
              }`}
            >
              <span className="relative z-10 text-xl font-bold tracking-tight">
                JRA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center rounded-full border px-2 py-1 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/[0.03]'
                : 'border-black/10 bg-black/[0.025]'
            }`}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    activeSection === link.href.substring(1)
                      ? theme === 'dark'
                        ? 'bg-sky-300/10 text-sky-300 font-semibold'
                        : 'bg-sky-50 text-sky-700 font-semibold'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-sky-300'
                        : 'text-gray-600 hover:text-sky-700'
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
                className={`rounded-full border p-2 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/[0.04] text-sky-300'
                    : 'border-black/10 bg-black/[0.04] text-sky-700'
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
                className={`md:hidden rounded-full border p-2 focus:outline-none ${
                  theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.04]'
                }`}
                aria-label="Open menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-sky-500" />
                ) : (
                  <Menu className="h-6 w-6 text-sky-500" />
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
            className={`fixed top-16 right-0 bottom-0 z-40 w-64 border-l ${
              theme === 'dark'
                ? 'border-white/10 bg-gray-950/95'
                : 'border-black/10 bg-white/95'
            } backdrop-blur-md shadow-xl`}
          >
            <nav className="flex flex-col p-6 h-full">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                  className={`mb-2 flex items-center rounded-lg border px-3 py-3 text-base font-medium ${
                    activeSection === link.href.substring(1)
                      ? theme === 'dark'
                        ? 'border-sky-300/20 bg-sky-300/10 text-sky-300'
                        : 'border-sky-900/20 bg-sky-50 text-sky-700'
                      : theme === 'dark'
                        ? 'border-white/10 text-gray-300 hover:text-sky-300'
                        : 'border-black/10 text-gray-700 hover:text-sky-700'
                  }`}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.name}
                </motion.a>
              ))}
              
              <div className={`mt-6 pt-6 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
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
                        theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-sky-400' : 'hover:bg-gray-200 text-gray-600 hover:text-sky-600'
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
                ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                : 'bg-sky-500 hover:bg-sky-600 text-white'
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
            className={`drawn-heading relative inline-block text-5xl md:text-7xl font-bold mb-8 ${
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
              className="text-sky-500"
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
            className="max-w-5xl mx-auto"
          >
            <h2 className={`drawn-section-title text-4xl font-semibold mb-12 text-center tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              About Me
            </h2>
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] items-stretch">
              <div className={`sketch-panel rounded-lg border p-7 md:p-8 shadow-xl ${
                theme === 'dark'
                  ? 'border-white/10 bg-gray-900/65 text-white'
                  : 'border-black/10 bg-white/75 text-black'
              } backdrop-blur-md`}>
                <p className={`text-xs uppercase code-font mb-4 ${
                  theme === 'dark' ? 'text-sky-300' : 'text-sky-700'
                }`}>
                  Developer note
                </p>
                <p className={`text-lg md:text-xl mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  I build <span className="marker-underline">practical web systems</span> for business workflows: dashboards, CMS tools, ecommerce stores, automation flows, and internal apps.
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I like working close to the actual problem: how users move through the product, where teams lose time, and which parts of the system need to be simple, fast, and maintainable.
                </p>
              </div>

              <div className={`sketch-panel rounded-lg border p-6 shadow-xl ${
                theme === 'dark'
                  ? 'border-sky-300/15 bg-sky-300/5 text-sky-50'
                  : 'border-sky-900/15 bg-sky-50/70 text-sky-950'
              } backdrop-blur-md`}>
                <p className="code-font text-sm mb-5">// current focus</p>
                <div className="space-y-4 code-font text-sm">
                  {[
                    ["builds", "dashboards, CMS, ecommerce"],
                    ["stack", "React, Next.js, Laravel, PHP"],
                    ["also", "Supabase, WordPress, Shopware"],
                    ["style", "clean, useful, maintainable"],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[88px_1fr] gap-3">
                      <span className={theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}>{label}</span>
                      <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 rounded-lg border p-4 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/20 text-gray-300'
                    : 'border-black/10 bg-white/60 text-gray-700'
                }`}>
                  <p className="code-font text-xs leading-relaxed">
                    {"{ idea -> interface -> data flow -> shipped feature }"}
                  </p>
                </div>
              </div>
            </div>
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
            className={`drawn-section-title text-4xl font-semibold text-center mb-4 tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {activeNav === 'developer' ? 'Technical Toolkit' : 'Design Toolkit'}
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
            The tools I reach for most when turning rough requirements into usable products.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(activeNav === 'developer' ? [
              {
                title: "Frontend I ship",
                note: "Interfaces, dashboards, and responsive product screens.",
                skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive UI", "Dashboard UX"]
              },
              {
                title: "Backend I build",
                note: "APIs, auth, data models, and admin workflows.",
                skills: ["Laravel & PHP", "Node.js", "Supabase", "MySQL & PostgreSQL", "REST APIs", "Authentication"]
              },
              {
                title: "Tools I use",
                note: "The practical stack around shipping and maintaining work.",
                skills: ["Git & GitHub", "Vercel", "Docker Basics", "WordPress", "Shopware 6", "AI Integration"]
              }
            ] : [
              {
                title: "Interfaces I shape",
                note: "Flows, structure, and interaction decisions.",
                skills: ["Figma & Adobe XD", "User Research", "Prototyping", "Wireframing", "Interaction Design", "Accessibility"]
              },
              {
                title: "Visuals I refine",
                note: "Clear hierarchy, spacing, and visual polish.",
                skills: ["Typography", "Color Theory", "Branding", "Motion Graphics", "Iconography", "Layout Design"]
              },
              {
                title: "Systems I maintain",
                note: "Reusable patterns for consistent product work.",
                skills: ["Component Libraries", "Design Tokens", "Style Guides", "Responsive Design", "Cross-Platform Design", "User Testing"]
              }
            ]).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className={`sketch-panel p-6 rounded-lg border shadow-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-gray-900/65 text-white'
                    : 'border-black/10 bg-white/75 text-black'
                } backdrop-blur-md`}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      theme === 'dark'
                        ? 'border-sky-300/20 bg-sky-300/10 text-sky-300'
                        : 'border-sky-900/20 bg-sky-50 text-sky-800'
                    }`}>
                      <Code className="h-4 w-4" />
                    </span>
                    <h3 className={`text-xl font-semibold code-font tracking-tight ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>{category.title}</h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {category.note}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ y: -2, rotate: skillIndex % 2 === 0 ? -1 : 1 }}
                      className={`rounded-full border px-3 py-1.5 text-xs code-font ${
                        theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-gray-200'
                          : 'border-black/10 bg-black/[0.03] text-gray-700'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
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
            className={`drawn-section-title text-4xl font-semibold text-center mb-4 tracking-tight ${
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
                  className={`sketch-panel relative rounded-lg border p-5 md:p-6 shadow-lg ${
                    theme === 'dark'
                      ? 'border-white/10 bg-gray-900/70'
                      : 'border-black/10 bg-white/75'
                  } backdrop-blur-md`}
                  style={{ rotate: `${index % 2 === 0 ? -0.25 : 0.25}deg` }}
                >
                  <span className={`absolute -left-[31px] md:-left-[47px] top-7 h-3 w-3 rounded-full ring-4 ${
                    theme === 'dark'
                      ? 'bg-sky-300 ring-gray-950'
                      : 'bg-sky-700 ring-gray-50'
                  }`} />
                  <span className={`pin-dot right-5 top-5 ${
                    theme === 'dark' ? 'bg-sky-300' : 'bg-sky-700'
                  }`} />

                  <div>
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <p className={`rounded-full border px-3 py-1 text-xs uppercase code-font ${
                          theme === 'dark'
                            ? 'border-sky-300/20 bg-sky-300/10 text-sky-300'
                            : 'border-sky-900/20 bg-sky-50 text-sky-700'
                        }`}>
                          {experience.context}
                        </p>
                        <span className={`text-xs code-font ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          note #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
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
                        <span className={`mt-1 shrink-0 code-font ${
                          theme === 'dark' ? 'text-sky-300' : 'text-sky-700'
                        }`}>→</span>
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
                            ? 'bg-sky-900/30 text-sky-300'
                            : 'bg-sky-100/60 text-sky-800'
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
            className={`drawn-section-title text-4xl font-semibold text-center mb-4 tracking-tight ${
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
            Case-study sheets from client and freelance work: what the project needed, how I approached it, and what changed after it shipped.
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
                  className={`sketch-panel project-card relative flex-shrink-0 w-[85vw] sm:w-[400px] snap-start rounded-lg border overflow-visible ${
                    theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/70'
                  } ${theme === 'dark' ? 'border-white/10 text-white' : 'border-black/10 text-black'} backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
                  style={{ rotate: `${index % 2 === 0 ? -0.35 : 0.35}deg` }}
                >
                  <span className={`paper-tape ${
                    theme === 'dark' ? 'bg-sky-200/15' : 'bg-sky-900/10'
                  }`} />
                  <div className={`sketch-image-frame relative w-full h-48 md:h-64 overflow-hidden rounded-t-lg ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
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
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <p className={`text-[11px] uppercase code-font leading-relaxed ${
                          theme === 'dark' ? 'text-sky-300' : 'text-sky-700'
                        }`}>
                          {project.role}
                        </p>
                        <span className={`shrink-0 text-xs code-font ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="marker-underline text-lg md:text-xl font-semibold code-font tracking-tight">{project.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className={`text-xs md:text-sm leading-relaxed code-font line-clamp-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <strong>Problem:</strong> {project.problem}
                      </p>
                      <p className={`text-xs md:text-sm leading-relaxed code-font line-clamp-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <strong>Approach:</strong> {project.solution}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 my-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full code-font font-medium tracking-tighter ${
                            theme === 'dark'
                              ? 'border border-sky-300/15 bg-sky-300/10 text-sky-300'
                              : 'border border-sky-900/15 bg-sky-50 text-sky-800'
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
                        ? 'border-sky-300/20 bg-sky-300/10 text-sky-100'
                        : 'border-sky-900/20 bg-sky-50 text-sky-900'
                    }`}>
                      <p className="text-[11px] uppercase code-font font-semibold mb-1">Result note</p>
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
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className={`drawn-section-title text-4xl font-semibold text-center mb-4 tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Let's Collaborate
          </h2>
          <p className={`mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Send a short project brief and I will get back to you about scope, timeline, and the cleanest way to build it.
          </p>
          
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`sketch-panel rounded-lg border p-6 shadow-xl ${
                theme === 'dark'
                  ? 'border-sky-300/15 bg-sky-300/5 text-sky-50'
                  : 'border-sky-900/15 bg-sky-50/70 text-sky-950'
              } backdrop-blur-md`}
            >
              <p className="code-font text-sm mb-5">// project brief</p>
              <div className="space-y-4 text-sm code-font">
                {[
                  ["good fit", "dashboards, CMS, ecommerce, automations"],
                  ["handoff", "clear scope, clean UI, maintainable code"],
                  ["start with", "problem, users, timeline, budget range"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[86px_1fr] gap-3">
                    <span className={theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}>{label}</span>
                    <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{value}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:amadjohnrey01@gmail.com"
                className={`mt-7 inline-flex items-center rounded-full border px-4 py-2 text-sm code-font ${
                  theme === 'dark'
                    ? 'border-sky-300/20 bg-sky-300/10 text-sky-300 hover:bg-sky-300/15'
                    : 'border-sky-900/20 bg-white/70 text-sky-700 hover:bg-sky-50'
                }`}
              >
                <Mail className="h-4 w-4 mr-2" />
                email directly
              </a>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`sketch-panel relative rounded-lg border p-6 md:p-8 shadow-xl ${
                theme === 'dark'
                  ? 'border-white/10 bg-gray-900/65 text-white'
                  : 'border-black/10 bg-white/75 text-black'
              } backdrop-blur-md`}
            >
              <span className={`paper-tape ${
                theme === 'dark' ? 'bg-sky-200/15' : 'bg-sky-900/10'
              }`} />
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
                      className={`w-full rounded-lg border p-3 code-font text-sm tracking-tight transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 ${
                        theme === 'dark'
                          ? 'border-white/10 bg-black/20 text-gray-200'
                          : 'border-black/10 bg-white/70 text-gray-900'
                      }`}
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
                      className={`w-full rounded-lg border p-3 code-font text-sm tracking-tight transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 ${
                        theme === 'dark'
                          ? 'border-white/10 bg-black/20 text-gray-200'
                          : 'border-black/10 bg-white/70 text-gray-900'
                      }`}
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
                    Project Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`w-full rounded-lg border p-3 code-font text-sm tracking-tight transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-black/20 text-gray-200'
                        : 'border-black/10 bg-white/70 text-gray-900'
                    }`}
                    placeholder="What are we building, who is it for, and what should it help with?"
                    required
                    minLength={10}
                    maxLength={1000}
                  ></textarea>
                </div>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`rounded-full px-7 py-3 text-base font-semibold code-font tracking-wide shadow-lg transform hover:scale-105 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-sky-600 text-white hover:bg-sky-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Brief'}
                  </Button>
                  {submitStatus === 'success' && (
                    <p className="text-sm code-font text-sky-500">Message sent successfully.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-sm code-font text-red-500">Failed to send. Please try again.</p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
          
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
                  theme === 'dark' ? 'text-sky-400 hover:text-sky-300' : 'text-sky-700 hover:text-sky-600'
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
                    theme === 'dark' ? 'hover:bg-gray-800/50 text-gray-400 hover:text-sky-400' : 'hover:bg-gray-200/50 text-gray-600 hover:text-sky-600'
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
