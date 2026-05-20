import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useObservable } from '../hooks/useObservable';
import { ThemeService } from '../services/ThemeService';
import type { Theme } from '../services/ThemeService';
import { Palette, Globe, Menu, X, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, lang, changeLanguage } = useTranslation();
  const activeTheme = useObservable(ThemeService.activeTheme$, ThemeService.getTheme());
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const toggleLanguage = () => {
    changeLanguage(lang === 'en' ? 'es' : 'en');
  };

  const selectTheme = (theme: Theme) => {
    ThemeService.setTheme(theme);
    setShowThemeMenu(false);
  };

  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-glass-border bg-glass-bg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand logo */}
        <a href="#home" className="flex items-center gap-2 font-display text-xl font-black tracking-tight text-white hover:opacity-85">
          <Terminal className="text-primary w-6 h-6 animate-pulse" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Chini.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg hover:border-primary text-sm font-semibold transition-all cursor-pointer text-text-primary"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4 text-secondary" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg hover:border-primary text-sm font-semibold transition-all cursor-pointer capitalize text-text-primary"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-primary" />
              <span>{activeTheme}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl glass-panel border border-glass-border bg-bg-secondary p-1 shadow-2xl z-50">
                {(['cyberpunk', 'sunset', 'obsidian'] as Theme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => selectTheme(theme)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize font-medium transition-colors hover:bg-glass-bg cursor-pointer ${
                      activeTheme === theme ? 'text-primary bg-glass-bg' : 'text-text-secondary'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="p-1.5 rounded-lg border border-glass-border bg-glass-bg text-text-primary text-xs font-bold cursor-pointer"
          >
            {lang.toUpperCase()}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-1.5 rounded-lg border border-glass-border bg-glass-bg text-text-primary cursor-pointer"
            >
              <Palette className="w-4.5 h-4.5" />
            </button>
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl glass-panel border border-glass-border bg-bg-secondary p-1 shadow-2xl z-50">
                {(['cyberpunk', 'sunset', 'obsidian'] as Theme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => selectTheme(theme)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs capitalize text-text-primary hover:bg-glass-bg cursor-pointer"
                  >
                    {theme}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-primary focus:outline-none cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden mt-4 p-4 rounded-xl bg-bg-secondary border border-glass-border flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-primary font-medium py-1 border-b border-glass-border/30"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
