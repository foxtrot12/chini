import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";

export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  tech: string[];
  github?: string;
  demo?: string;
  isFeatured?: boolean;
  type: "game" | "web" | "lib";
}

const mockProjects: Project[] = [
  {
    id: "tc-plus",
    title: "TC+",
    descriptionKey: "projects.tc.desc",
    tech: [
      "Angular",
      "ReactJS",
      "HTML",
      "SCSS",
      "Javascript",
      "Reactive forms",
      "Canvas API",
      "Hooks API",
      "Context API",
      "Responsive UI",
      "Mobile First Design",
    ],
    demo: "https://www.shl.com/shldirect/en/practice-tests/",
    type: "web",
  },
  {
    id: "avatar-assessment",
    title: "Avatar-based Assessment",
    descriptionKey: "projects.avatar.desc",
    tech: ["Angular", "HTML", "Javascript", "SCSS", "Reactive forms"],
    type: "web",
  },
  {
    id: "process-monitoring",
    title: "Process Monitoring",
    descriptionKey: "projects.pm.desc",
    tech: ["Angular", "HTML", "SCSS", "Javascript", "Canvas API"],
    demo: "https://www.shl.com/shldirect/en/practice-tests/",
    type: "web",
  },
  {
    id: "sia-screener",
    title: "SIA - AI Screener",
    descriptionKey: "projects.sia.desc",
    tech: [
      "ReactJS",
      "Typescript",
      "Canvas API",
      "Angular",
      "Context API",
      "Hooks API",
    ],
    type: "web",
  },
  {
    id: "mario-game",
    title: "Super Mario",
    descriptionKey: "projects.mario.desc",
    tech: ["Unity", "C#"],
    github: "https://github.com/foxtrot12/vitrol-enigma",
    demo: "https://foxtrot12.github.io/vitrol-enigma/",
    isFeatured: true,
    type: "game",
  },
  {
    id: "tc-mft",
    title: "TC+ Microfrontend Transition",
    descriptionKey: "projects.mft.desc",
    tech: [
      "ReactJS",
      "Typescript",
      "Angular",
      "Single-SPA",
      "RxJS",
      "Hooks API",
    ],
    type: "web",
  },
  {
    id: "tc-accessibility",
    title: "TC+ Accessibility Initiative",
    descriptionKey: "projects.access.desc",
    tech: [
      "WCAG",
      "Angular",
      "ReactJS",
      "Reactive forms",
      "Javascript",
      "Canvas API",
      "SCSS",
      "Hooks API",
    ],
    type: "web",
  },
  {
    id: "migration-initiatives",
    title: "Migration Initiatives",
    descriptionKey: "projects.mig.desc",
    tech: [
      "ReactJS",
      "Angular",
      "Angular JS",
      "Reactive forms",
      "Javascript",
      "SCSS",
      "Hooks API",
      "Context API",
    ],
    type: "web",
  },
  {
    id: "atom-lib",
    title: "Atom",
    descriptionKey: "projects.atom.desc",
    tech: ["React", "Zustand", "Typescript"],
    type: "lib",
  },
  {
    id: "raga-reactive",
    title: "RagaReactive",
    descriptionKey: "projects.raga.desc",
    tech: ["Typescript", "RxJS"],
    demo: "https://www.npmjs.com/package/raga-reactive",
    type: "lib",
  },
];

export const ProjectService = {
  getProjects(): Observable<Project[]> {
    return of(mockProjects).pipe(delay(300));
  },
};
