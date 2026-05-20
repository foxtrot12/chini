import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Mail, Copy, Check, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const email = 'hello@chini.dev';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-12 px-6 border-t border-glass-border/30 bg-bg-secondary/40 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand logo */}
        <div className="flex items-center gap-2">
          <Terminal className="text-primary w-5 h-5" />
          <span className="font-display font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Chini.dev
          </span>
        </div>

        {/* Clipboard copy action */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-glass-border bg-glass-bg text-sm text-text-primary">
          <Mail className="w-4 h-4 text-primary" />
          <span className="font-medium text-xs md:text-sm">{email}</span>
          <button
            onClick={copyEmail}
            className="p-1 rounded hover:bg-glass-bg/85 transition-colors cursor-pointer text-text-secondary hover:text-white"
            title={t('footer.emailCopy')}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-primary animate-scaleIn" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Copyright notice */}
        <div className="text-xs text-text-secondary font-light">
          &copy; {new Date().getFullYear()} Chini.dev. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};
