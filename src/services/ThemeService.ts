import { BehaviorSubject } from 'rxjs';

export type Theme = 'cyberpunk' | 'sunset' | 'obsidian';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('portfolio_theme');
  if (stored === 'cyberpunk' || stored === 'sunset' || stored === 'obsidian') {
    return stored;
  }
  return 'cyberpunk';
};

const activeThemeSubject = new BehaviorSubject<Theme>(getInitialTheme());

// Side effect to sync HTML root node on import/initial load
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', activeThemeSubject.value);
}

export const ThemeService = {
  activeTheme$: activeThemeSubject.asObservable(),

  setTheme(theme: Theme) {
    localStorage.setItem('portfolio_theme', theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    activeThemeSubject.next(theme);
  },

  getTheme(): Theme {
    return activeThemeSubject.value;
  }
};
