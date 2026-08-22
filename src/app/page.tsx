'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

type SubmitStatus = 'idle' | 'success' | 'error';

type Project = {
  title: string;
  role: string;
  summary: string;
  result: string;
  technologies: string[];
  image: string;
};

const projects: Project[] = [
  {
    title: 'Polerisdigital.com',
    role: 'Frontend development · Interaction design · Responsive delivery',
    summary:
      'A service-focused website that gives businesses a clear view of Poleris Digital’s capabilities and approach.',
    result:
      'Built responsive service pages and conversion paths with reusable frontend patterns and restrained motion.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    image: '/polerisdigital.png',
  },
  {
    title: 'Gloryyfunding',
    role: 'Full-stack development · Checkout · Dashboard UX',
    summary:
      'A prop-trading platform where clients purchase challenges, follow evaluations, and manage payout workflows.',
    result:
      'Built secure checkout and account flows that connect challenge purchases with progress tracking and operational review.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
    image: '/gloryyfunding.png',
  },
  {
    title: 'Ersatzteil-Store',
    role: 'Shopware development · Catalog architecture',
    summary:
      'A specialist ecommerce store designed around the search and inventory demands of automotive spare parts.',
    result:
      'Created a more direct path from technical part search to product selection and purchase.',
    technologies: ['Shopware 6', 'PHP', 'MySQL', 'Vue.js'],
    image: '/ersatzteil-store.png',
  },
  {
    title: 'Construction Ops',
    role: 'Product engineering · Realtime workflows',
    summary:
      'An internal operations tool for project tracking, team coordination, and day-to-day construction workflows.',
    result:
      'Brought project status and team communication into one shared workflow with realtime updates.',
    technologies: ['Next.js', 'Supabase', 'Twilio', 'TypeScript'],
    image: '/construction-ops.png',
  },
  {
    title: 'SK Information System',
    role: 'Laravel development · Data modeling · Analytics dashboards',
    summary:
      'An information system for youth organizations to manage records, reporting, and operational data in one place.',
    result:
      'Reduced manual reporting work by organizing data entry, analytics, and content workflows around the team’s process.',
    technologies: ['Laravel', 'React', 'MySQL', 'Filament'],
    image: '/skyouth.png',
  },
];

const experience = [
  {
    company: 'Poleris LLC',
    role: 'Full Stack Developer',
    detail: 'SaaS and service websites built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
  },
  {
    company: 'Gloryyfunding',
    role: 'Full Stack Developer',
    detail: 'Checkout, trader dashboards, evaluation flows, and internal operations for a prop-trading platform.',
  },
  {
    company: 'Stanton Management LLC',
    role: 'Full Stack Developer',
    detail: 'Construction and property-management tools for project visibility, communication, and administration.',
  },
  {
    company: 'Freelance',
    role: 'Web & Automation Developer',
    detail: 'Ecommerce, CMS, and publishing workflows across WordPress, WooCommerce, Shopware, PHP, and Node.js.',
  },
  {
    company: 'RAFI-MFI IT Unit',
    role: 'Software Engineer Intern',
    detail: 'Purchase requisition workflows across Flutter screens and .NET API endpoints for the Kawani app.',
  },
];

const archive = [
  'Tenant Management System',
  'Blog Post Generator & Scheduler',
  'LotschFashion Ecommerce',
  'Water Refilling System',
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/grhey0115', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amad-johnrey/', icon: Linkedin },
  { label: 'Email', href: 'mailto:amadjohnrey01@gmail.com', icon: Mail },
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = event.currentTarget;

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.sendForm(
        'service_kwsrmt4',
        'template_1aztb6g',
        form,
        'FEnNG0JVbIdUs4rTv',
      );
      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <a className="skip-link" href="#work">Skip to work</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="John Rey Amad, home">
          JRA<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="mailto:amadjohnrey01@gmail.com">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="availability"><span aria-hidden="true" /> Available for select projects</p>
          <h1>I build software that makes work feel simpler.</h1>
          <p className="hero-intro">
            I’m John Rey Amad, a full-stack developer focused on dashboards, ecommerce,
            CMS platforms, and internal tools. I turn operational problems into clear,
            maintainable products.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">See selected work</a>
            <a className="text-action" href="mailto:amadjohnrey01@gmail.com">
              amadjohnrey01@gmail.com <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="portrait">
          <Image
            src="/profile.png"
            alt="John Rey Amad"
            fill
            sizes="(max-width: 760px) 72vw, 34vw"
            priority
          />
        </figure>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <h2>Selected work</h2>
          <p>Products built around real workflows—not portfolio concepts.</p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className="project-media">
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  fill
                  sizes="(max-width: 760px) 100vw, 56vw"
                  loading={index === 0 || project.image === '/ersatzteil-store.png' ? 'eager' : 'lazy'}
                />
              </div>
              <div className="project-copy">
                <p className="project-role">{project.role}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="result">
                  <strong>What I delivered</strong>
                  <p>{project.result}</p>
                </div>
                <ul className="tech-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="archive" aria-labelledby="archive-title">
          <h3 id="archive-title">More work</h3>
          <ul>
            {archive.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading">
          <h2>Experience</h2>
          <p>Client work, product teams, and practical systems.</p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`}>
              <h3>{item.company}</h3>
              <p className="experience-role">{item.role}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="education">
          <h3>Education</h3>
          <div>
            <strong>Cebu Technological University</strong>
            <p>Bachelor of Science in Information Technology · Magna Cum Laude</p>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div>
          <h2>Useful software, thoughtfully made.</h2>
        </div>
        <div className="about-copy">
          <p>
            I work across interface design, frontend implementation, APIs, data models,
            and admin workflows. The goal is straightforward: understand how the work
            actually happens, then build the clearest system around it.
          </p>
          <p>
            My regular toolkit includes React, Next.js, TypeScript, Laravel, PHP,
            Supabase, PostgreSQL, WordPress, and Shopware.
          </p>
          <div className="socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <Icon aria-hidden="true" /> {label}
              </a>
            ))}
          </div>
          <p className="repository-note">
            Most professional work is held in private repositories under client NDAs.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <h2>Have a project in mind?</h2>
          <p>Tell me what you’re building, who it’s for, and where the current process gets stuck.</p>
          <a href="mailto:amadjohnrey01@gmail.com">Email me directly <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name
              <input name="from_name" autoComplete="name" required minLength={2} maxLength={50} />
            </label>
            <label>
              Email
              <input name="from_email" type="email" autoComplete="email" required />
            </label>
          </div>
          <label>
            Project details
            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={1000}
              placeholder="What needs to be built or improved?"
            />
          </label>
          <div className="form-footer">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send project details'}
              {!isSubmitting && <ArrowUpRight aria-hidden="true" />}
            </button>
            <p className="form-status" aria-live="polite">
              {submitStatus === 'success' && 'Thanks—your message was sent.'}
              {submitStatus === 'error' && 'The message did not send. Please email me directly.'}
            </p>
          </div>
        </form>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} John Rey Amad</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
