import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  tech: string[];
  github?: string;
  demo?: string;
  isFeatured?: boolean;
  type: 'game' | 'web' | 'lib';
}

const mockProjects: Project[] = [
  {
    id: 'mario-game',
    title: 'Super Mario Canvas',
    descriptionKey: 'projects.mario.desc',
    tech: ['HTML5 Canvas', 'Vanilla JS', 'Physics Engine', 'Web Audio API'],
    github: 'https://github.com/fox/super-mario-canvas',
    demo: '#mario-game', // will scroll/navigate to play game container
    isFeatured: true,
    type: 'game'
  },
  {
    id: 'rxjs-dashboard',
    title: 'Reactive Telemetry Dashboard',
    descriptionKey: 'projects.rxjs.desc',
    tech: ['React', 'RxJS', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/fox/reactive-dashboard',
    demo: 'https://github.com/fox/reactive-dashboard',
    isFeatured: false,
    type: 'web'
  },
  {
    id: 'glass-ui',
    title: 'Vibrant Glassmorphic UI Kit',
    descriptionKey: 'projects.glass.desc',
    tech: ['Vanilla CSS', 'Tailwind CSS', 'React', 'Framer Motion'],
    github: 'https://github.com/fox/vibrant-glass-ui',
    demo: 'https://github.com/fox/vibrant-glass-ui',
    isFeatured: false,
    type: 'lib'
  }
];

export const ProjectService = {
  getProjects(): Observable<Project[]> {
    // Simulate HTTP fetch delay to demonstrate RxJS async streams
    return of(mockProjects).pipe(delay(300));
  }
};
