import React, { useState } from 'react';
import { Play, Gamepad2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const MarioGame: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
  };

  const stopGame = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden glass-panel border border-glass-border flex flex-col items-center bg-bg-secondary p-6 shadow-2xl relative"
    >
      {/* Controls Header */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-glass-border/30 pb-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-semibold tracking-wider text-text-primary">
            {t('mario.cabinet')}
          </span>
        </div>

        {isPlaying && (
          <button
            onClick={stopGame}
            className="px-3 py-1 rounded-lg border border-glass-border bg-glass-bg text-xs font-bold text-secondary hover:border-secondary transition-colors cursor-pointer text-text-primary"
          >
            {t('mario.reset')}
          </button>
        )}
      </div>

      {/* Screen Frame */}
      <div className="relative w-full aspect-[2/1] bg-black rounded-lg overflow-hidden border-2 border-glass-border shadow-inner">
        {!isPlaying ? (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex flex-col items-center justify-center p-6 text-center z-10">
            <h4 className="font-display text-2xl md:text-3xl font-black text-white mb-2 tracking-wide">
              {t('mario.title')}
            </h4>
            <p className="text-xs text-text-secondary max-w-sm mb-6 leading-relaxed">
              {t('mario.subtitle')}
            </p>

            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-primary text-white hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-primary/30 cursor-pointer text-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t('mario.play')}</span>
            </button>
          </div>
        ) : (
          <iframe
            src="https://foxtrot12.github.io/vitrol-enigma/"
            className="w-full h-full border-none bg-black"
            title="Super Mario Vitrol Enigma"
            allow="autoplay; keyboard-map; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </div>

      <span className="text-[10px] text-text-secondary mt-3">
        {t('mario.sandbox')}
      </span>
    </div>
  );
};
