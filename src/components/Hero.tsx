import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { FileText, ArrowRight } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MediumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1043.63 592.71" fill="currentColor" {...props}>
    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
  </svg>
);

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[calc(100vh-76px)] flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center gap-8 py-16">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border bg-glass-bg text-sm font-semibold tracking-wide text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Available for Frontend Roles</span>
        </div>

        {/* Headings with Neon Text animations */}
        <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight leading-none text-white max-w-3xl">
          <span className="block text-text-primary">{t('hero.title').split(' ').slice(0, -1).join(' ')}</span>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-neon-text">
            {t('hero.title').split(' ').slice(-1)}
          </span>
        </h1>

        {/* Short Bio */}
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-light">
          {t('hero.intro')}
        </p>

        {/* Direct Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-glass-border bg-glass-bg text-white hover:border-secondary hover:scale-[1.02] active:scale-95 transition-all shadow-md cursor-pointer"
          >
            {t('hero.cta.contact')}
          </a>
        </div>

        {/* Social channels and mock PDF Resume */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          <a
            href="https://github.com/foxtrot12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary hover:scale-110 transition-all cursor-pointer"
            title="GitHub"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/chinmayas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-secondary hover:scale-110 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a
            href="https://medium.com/@chinmayasharma_56001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent hover:scale-110 transition-all cursor-pointer"
            title="Medium"
          >
            <MediumIcon className="w-6 h-6" />
          </a>
          <a
            href="https://foxtrot12.github.io/resume/Chinmaya_Sharma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-glass-border bg-glass-bg text-sm text-text-primary hover:border-accent hover:text-accent transition-all cursor-pointer"
            title="Resume PDF"
          >
            <FileText className="w-4 h-4 text-accent" />
            <span>{t('hero.cta.resume')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
