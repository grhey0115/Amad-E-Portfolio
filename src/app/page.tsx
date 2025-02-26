'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Github, Linkedin, Mail, Code, ExternalLink } from "lucide-react";

type Theme = 'dark' | 'light';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github?: string;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "LotschFashion E-commerce",
      description: "A comprehensive dashboard for managing online store inventory, sales, and customer data with real-time analytics.",
      technologies: ["Wordpress", "PHP", "MySql", "Elementor"],
      image: "/lotschfashion.png",
      link: "https://demo.ayon.ph",
      github: "https://github.com/grhey0115/lotschfashion-E-commerce"
    },
    {
      id: 2,
      title: "SK Information System",
      description: "An application that leverages AI models to help creators generate blog posts, marketing copy, and social media content.",
      technologies: ["Laravel", "React", "MySQL", "Filament"],
      image: "/skyouth.png",
      link: "https://skyouthfiles.site",
      github: "https://github.com/grhey0115/YouthFiles"
    },
    {
      id: 3,
      title: "Water Refilling System",
      description: "Mobile-first web application for tracking workouts, nutrition, and health metrics with custom goal setting.",
      technologies: ["C#", "Windows", "Chart.js", "Redux"],
      image: "/aquaease.png",
      link: "https://example.com/project3"
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // Check system preference on initial load
    if (typeof window !== 'undefined') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

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
      transition: { duration: 0.5 },
    },
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white' 
        : 'bg-gradient-to-br from-gray-100 via-purple-100 to-white text-gray-900'
    } overflow-x-hidden relative`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md w-full">
        <div className={`container mx-auto px-4 py-4 flex justify-between items-center ${
          theme === 'dark' ? 'bg-black/30' : 'bg-white/30'
        }`}>
          <a href="#" className="text-2xl font-bold">JA</a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 my-1.5 transition-all ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
            <div className={`w-6 h-0.5 my-1.5 transition-all ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
            <div className={`w-6 h-0.5 my-1.5 transition-all ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden absolute w-full transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md z-40`}>
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium py-2 ${
                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center relative pt-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className={`text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-800'
            }`}
          >
            John Rey Amad
          </motion.h1>
          <motion.p 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xl md:text-2xl mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Creative Developer | Designer | Innovator
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              asChild
              className={`px-8 py-3 rounded-full text-lg font-semibold ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              <a href="#work">View My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`px-8 py-3 rounded-full text-lg font-semibold border-2 ${
                theme === 'dark'
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-950/30'
                  : 'border-purple-400 text-purple-700 hover:bg-purple-100/50'
              }`}
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-4"
          >
            <a 
              href="https://github.com/grhey0115" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/johnamad" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:john@example.com" 
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{ 
              x: ["-20%", "120%"],
              y: ["10%", "60%"],
            }} 
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 20,
            }}
            className={`absolute w-64 h-64 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-300/30'
            }`} 
          />
          <motion.div 
            animate={{ 
              x: ["120%", "-20%"],
              y: ["60%", "10%"],
            }} 
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 25,
            }}
            className={`absolute w-72 h-72 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-300/20'
            }`} 
          />
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`max-w-3xl mx-auto p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/60'
            } backdrop-blur-sm`}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm a passionate full-stack developer and designer, 
            recently graduated with a degree in Information Technology. 
            I specialize in building dynamic, user-focused web applications, 
            with experience in both front-end and back-end development. 
            I'm eager to apply my skills and continuously grow in the 
            field of software development.
            </p>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              With a background in both design and development, I bring a unique perspective to projects 
              that bridges the gap between aesthetics and functionality. I believe in creating digital 
              experiences that not only look great but also solve real problems for users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            My Skills
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Frontend Development",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
              },
              {
                title: "Backend Development",
                skills: ["Node.js", "Laravel", "MongoDB", "MySQL", "Firebase",]
              },
              {
                title: "Design & Tools",
                skills: ["Figma", "UI/UX Design", "Git", "CI/CD"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/60'
                } backdrop-blur-sm`}
              >
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li 
                      key={skillIndex}
                      className="flex items-center"
                    >
                      <Code className="h-4 w-4 mr-2 text-purple-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" ref={ref} className="py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="container mx-auto px-4"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`rounded-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
                } backdrop-blur-sm shadow-lg transition-all`}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-purple-900/60 text-purple-300' 
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-sm font-medium ${
                        theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                      }`}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </a>
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center text-sm font-medium ${
                          theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                        }`}
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
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
        className={`py-20 ${theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-100/30'}`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${
              theme === 'dark' ? 'bg-gray-800/40' : 'bg-white/60'
            } backdrop-blur-sm`}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block mb-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-3 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className={`block mb-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full p-3 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label 
                  htmlFor="message" 
                  className={`block mb-2 text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full p-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className={`px-8 py-3 rounded-full text-lg font-semibold ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  }`}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Or reach out directly via
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:amadjohnrey01@gmail.com" 
                className={`flex items-center ${
                  theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                }`}
              >
                <Mail className="h-5 w-5 mr-2" />
                amadjohnrey01@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              © {new Date().getFullYear()} John Rey Amad. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="https://github.com/johnamad" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-black'
                }`}
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/johnamad" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-black'
                }`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:john@example.com"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-600 hover:text-black'
                }`}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}