import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useObservable } from '../hooks/useObservable';
import { ProjectService } from '../services/ProjectService';
import type { Project } from '../services/ProjectService';
import { MarioGame } from './MarioGame';
import { ExternalLink, Gamepad2, Award } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects: React.FC = () => {
  const { t } = useTranslation();
  const projects = useObservable<Project[]>(ProjectService.getProjects(), []);
  const [filterType, setFilterType] = useState<'all' | 'game' | 'web' | 'lib'>('all');

  const filteredProjects = projects.filter(
    (p) => filterType === 'all' || p.type === filterType
  );

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto border-t border-glass-border/40">
      <div className="text-center mb-16 flex flex-col items-center gap-3">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white">
          {t('projects.title')}
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl font-light">
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Playable Mario Game Card */}
      <div className="mb-20 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-glass-bg text-sm font-semibold text-secondary">
          <Award className="w-4 h-4" />
          <span>{t('projects.featured')}</span>
        </div>
        <MarioGame />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {(['all', 'game', 'web', 'lib'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide border transition-all cursor-pointer capitalize ${filterType === type
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-glass-bg border-glass-border text-text-secondary hover:border-secondary hover:text-text-primary'
              }`}
          >
            {type === 'all' ? 'All Projects' : type}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-text-secondary">
            Loading projects...
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl glass-panel flex flex-col justify-between h-80 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 text-glass-border group-hover:text-primary transition-colors">
                <Gamepad2 className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 font-light">
                  {t(project.descriptionKey)}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-bg-secondary text-text-primary border border-glass-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Links */}
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors font-semibold"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>{t('projects.viewCode')}</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-1.5 text-xs text-text-primary hover:text-secondary transition-colors font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
