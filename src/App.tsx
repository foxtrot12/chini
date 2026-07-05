import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { WindowSizeProvider } from './context/WindowSizeContext';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <LanguageProvider>
      <WindowSizeProvider>
        <div className="relative min-h-screen flex flex-col selection:bg-primary selection:text-white">
          {/* Interactive canvas background tracking cursor */}
          <CanvasBackground />

          {/* Grid overlay */}
          <div className="grid-bg animate-fadeIn" />

          {/* Navigation header */}
          <Navbar />

          {/* Main layout sections */}
          <main className="flex-grow">
            <Hero />
            <Skills />
            <Projects />
            <Contact />
          </main>

          {/* Footer copyright and contact copy */}
          <Footer />
        </div>
      </WindowSizeProvider>
      <Analytics />

    </LanguageProvider>
  );
}

export default App;
