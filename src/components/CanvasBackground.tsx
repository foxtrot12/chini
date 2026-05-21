import React, { useEffect, useRef } from 'react';
import { fromEvent, animationFrameScheduler, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { ThemeService } from '../services/ThemeService';
import type { Theme } from '../services/ThemeService';
import { useWindowSize } from '../hooks/useWindowSize';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const themeRef = useRef<Theme>('cyberpunk');
  const windowSize = useWindowSize();

  useEffect(() => {
    const subsManager = new Subscription(); 
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
    };
    resizeCanvas();

    subsManager.add(fromEvent<MouseEvent>(window, 'mousemove')
      .pipe(throttleTime(16, animationFrameScheduler))
      .subscribe((e) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        mouseRef.current.active = true;
      }));

    subsManager.add(fromEvent(window, 'mouseleave').subscribe(() => {
      mouseRef.current.active = false;
    }));

    subsManager.add(ThemeService.activeTheme$.subscribe((theme) => {
      themeRef.current = theme;
    }));

    const particleCount = Math.min(60, Math.floor((windowSize.width * windowSize.height) / 25000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      });
    }

    const getThemeColors = (theme: Theme) => {
      switch (theme) {
        case 'sunset':
          return {
            particle: '#ec4899', // pink
            line: '249, 115, 22', // orange
          };
        case 'obsidian':
          return {
            particle: '#14b8a6', // teal
            line: '16, 185, 129', // emerald
          };
        case 'cyberpunk':
        default:
          return {
            particle: '#ff007f', // pink
            line: '0, 240, 255', // cyan
          };
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getThemeColors(themeRef.current);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const mouse = mouseRef.current;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += dx * 0.005;
            p.y += dy * 0.005;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      const mouse = mouseRef.current;
      if (mouse.active) {
        particles.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      subsManager.add(animationFrameScheduler.schedule(animate, 0, true))
    
    };

    animate()

    return () => {
      subsManager.unsubscribe();
    };
  }, [windowSize]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />;
};
