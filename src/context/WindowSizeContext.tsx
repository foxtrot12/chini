import React, { createContext, useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

interface WindowSize {
  width: number;
  height: number;
}

export const WindowSizeContext = createContext<WindowSize>({
  width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  height: typeof window !== 'undefined' ? window.innerHeight : 800,
});

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Throttle window resize emissions to limit excessive re-renders
    const resize$ = fromEvent(window, 'resize').pipe(
      throttleTime(100, undefined, { leading: true, trailing: true }),
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    );

    const subscription = resize$.subscribe(setWindowSize);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};
