import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Cpu, Layout, Activity, Code, CheckCircle } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
}

export const Skills: React.FC = () => {
  const { t } = useTranslation();

  const categories: SkillCategory[] = [
    {
      title: 'Frontend Frameworks',
      icon: <Layout className="w-6 h-6" />,
      color: 'text-primary border-primary/20',
      skills: ['React 19', 'Next.js', 'Vite', 'HTML5 Semantic markup'],
    },
    {
      title: 'Reactive & Async',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-secondary border-secondary/20',
      skills: ['RxJS Streams', 'WebSockets', 'REST APIs', 'Async Programming'],
    },
    {
      title: 'Programming Languages',
      icon: <Code className="w-6 h-6" />,
      color: 'text-accent border-accent/20',
      skills: ['TypeScript', 'JavaScript (ESNext)', 'HTML5 Canvas API', 'WebGL (Basic)'],
    },
    {
      title: 'Styling & Design',
      icon: <Cpu className="w-6 h-6" />,
      color: 'text-tertiary border-tertiary/20',
      skills: ['Tailwind CSS v4', 'Vanilla CSS Custom Properties', 'Responsive UI/UX', 'Glassmorphism'],
    },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 flex flex-col items-center gap-3">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white">
          {t('skills.title')}
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl font-light">
          {t('skills.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl glass-panel relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl bg-bg-secondary border ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
            </div>

            <ul className="grid grid-cols-2 gap-4">
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium text-text-primary">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
