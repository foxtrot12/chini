# Project Outline: Vibrant React Portfolio with RxJS & Canvas

This document outlines the architecture, layout, design systems, and engineering decisions implemented in this portfolio website. 

---

## 🚀 Key Features

1. **Vibrant & Premium Aesthetics**: Implements glassmorphism panel styling, neon gradients, keyframe glowing text animations, and three switchable color schemes (Cyberpunk, Sunset, and Obsidian) using Tailwind CSS v4.
2. **RxJS-Driven State Store**: State stores built with RxJS `BehaviorSubject` manage the active translation language and the current layout theme, guaranteeing zero-delay state synchronization.
3. **Interactive HTML5 Canvas**:
   - **Interactive Background Network**: Floating connection points tracked by RxJS mousemove streams.
4. **Super Mario Game Integration**: Embeds the author's custom Mario platformer game (`https://foxtrot12.github.io/vitrol-enigma/`) inside a styled retro cabinet console overlay via iframe.
5. **Reactive Input Fields**: A contact form using RxJS input validation streams. Keystrokes are debounced (`debounceTime(400)`) and validated on the fly.

---

## 📁 Directory Structure

```text
chini/
├── src/
│   ├── assets/           # Starter SVG logos
│   ├── components/       # Custom React UI components
│   │   ├── CanvasBackground.tsx  # Dynamic floating particles canvas
│   │   ├── Contact.tsx           # Contact form with RxJS validations
│   │   ├── Footer.tsx            # Footer copyright and email actions
│   │   ├── Hero.tsx              # Welcoming layout and external links
│   │   ├── MarioGame.tsx         # Playable Mario canvas platformer
│   │   ├── Navbar.tsx            # Sticky navigation and toggles
│   │   ├── Projects.tsx          # Grid filters and catalog
│   │   └── Skills.tsx            # Technical credentials grids
│   ├── context/          # React Context providers
│   │   ├── LanguageContext.tsx   # Context-based translation provider
│   │   └── WindowSizeContext.tsx # Throttled window dimension provider
│   ├── hooks/            # Custom React hooks consuming RxJS or context
│   │   ├── useObservable.ts      # Custom hook to subscribe to streams
│   │   ├── useTranslation.ts     # Context wrapper for translation
│   │   └── useWindowSize.ts      # Context wrapper for window dimensions
│   ├── i18n/             # Dictionary files for language translations
│   │   ├── en.json               # English locales
│   │   └── es.json               # Spanish locales
│   ├── services/         # RxJS BehaviorSubject logic layers
│   │   ├── ProjectService.ts     # Project catalog fetch simulation
│   │   └── ThemeService.ts       # Layout theme coordinator
│   ├── App.tsx           # Layout root assembler
│   ├── index.css         # Styling system & Tailwind overrides
│   └── main.tsx          # Document mount point
├── package.json          # Package dependencies
└── tsconfig.json         # TypeScript configuration
```

---

## 🎨 Theme & Styling System

The application uses **Tailwind CSS v4** coupled with semantic CSS custom properties in `src/index.css`.

Instead of hardcoding color names in markup, components utilize abstract semantic classes:
- `text-primary`: Highlights key words, logos, active buttons.
- `text-secondary`: Handles secondary branding, warnings, state badges.
- `bg-primary`: Core layout background.
- `bg-secondary`: Frame layouts, input panels, card containers.
- `border-glass-border`: Card borders and dividers.
- `bg-glass-bg`: Semi-transparent card backdrops.

### Configured Themes
- **Cyberpunk (Default)**: Deep blue-blacks with neon cyan (`#00f0ff`) and pink (`#ff007f`) accents.
- **Sunset**: Dark plum blacks with warm orange (`#f97316`) and hot pink (`#ec4899`) highlights.
- **Obsidian**: Deep forest charcoals with emerald green (`#10b981`) and bright teal (`#14b8a6`) tones.

---

## ⚡ RxJS Logic Implementations

### 1. Unified State Store
By wrapping `BehaviorSubject` variables, the portfolio broadcasts updates to listeners. A custom `useObservable` hook handles the subscription state:
```typescript
export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(() => {
    if (observable$ instanceof BehaviorSubject) return observable$.value;
    return initialValue;
  });

  useEffect(() => {
    const sub = observable$.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [observable$]);

  return value;
}
```

### 2. High-Frequency Throttling (Canvas cursor background)
To avoid performance degradation, mouse movements are throttled to sync with the refresh rate of the browser window before updating coordinates inside the animation loop:
```typescript
fromEvent<MouseEvent>(window, 'mousemove')
  .pipe(throttleTime(16, animationFrameScheduler))
  .subscribe(e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
```

### 3. Keystroke Debouncing (Contact Form validations)
Validations for Name, Email, and Message are piped through `debounceTime` to delay showing error warnings until the user pauses typing:
```typescript
fromEvent(emailInput, 'input')
  .pipe(
    map(e => e.target.value),
    debounceTime(400),
    distinctUntilChanged()
  )
  .subscribe(value => {
    errors.email = validate(value);
  });
```

---

## 🎮 Super Mario Integration (`MarioGame.tsx`)

The featured Mario Game card integrates the author's custom game build (`https://foxtrot12.github.io/vitrol-enigma/`) inside a styled glassmorphic cabinet console frame.

- **Sandboxed Playback**: The game runs inside an iframe container configured with security sandbox attributes, allowing clean keyboard input maps and audio synthesis capabilities.
- **Console Interface**: Includes an arcade cabinet border layout with insert coin trigger to toggle active state overlays.
