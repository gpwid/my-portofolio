import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Download,
} from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';
import logo from './assets/logogpwid.png';
import logoHover from './assets/redlogo.png';

/* --- TYPES --- */

interface LogEntry {
  text: string;
  status: string;
}

/* --- UTILITY COMPONENTS --- */

// Matrix Rain Canvas Component
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Fallback / Base
      ctx.fillStyle = '#C00'; // Darker "Blood" Red for less eye strain
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 z-0" />;
};

/* --- MAIN APP COMPONENT (LAYOUT) --- */

export default function App() {
  const [bootSequence, setBootSequence] = useState<boolean>(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);

  // Contact Form State
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleContact = () => {
    window.location.href = `mailto:gustipanji2006@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  // Boot Sequence Logic
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');

    if (hasBooted) {
      setBootSequence(false);
      setShowContent(true);
      return;
    }

    const bootLines: LogEntry[] = [
      { text: "Loading kernel modules...", status: "OK" },
      { text: "Mounting virtual file systems...", status: "OK" },
      { text: "Initializing graphics adapter...", status: "OK" },
      { text: "Starting Network Manager...", status: "OK" },
      { text: "Compiling shaders...", status: "OK" },
      { text: "Hydrating DOM...", status: "OK" },
      { text: "System Ready.", status: "SUCCESS" }
    ];

    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLogs(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
          setTimeout(() => {
            setBootSequence(false);
            sessionStorage.setItem('hasBooted', 'true');
            setTimeout(() => setShowContent(true), 500);
          }, 800);
        }
      }, delay);
    });
  }, []);

  if (bootSequence) {
    return (
      <div className="min-h-screen min-w-screen bg-black text-gray-300 font-mono p-8 flex flex-col justify-center max-w-3xl mx-auto">
        <div className="mb-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-800"></div>
          <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
          <div className="w-3 h-3 rounded-full bg-red-900/30"></div>
          <span className="ml-4 opacity-50 text-red-500/50">user@gpwid: ~</span>
        </div>
        <div className="border-t border-white/10 pt-4 space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className={`font-bold ${log.status === 'OK' ? 'text-red-600' : log.status === 'INFO' ? 'text-blue-400' : 'text-gray-500'}`}>
                [ {log.status} ]
              </span>
              <span className="opacity-80 typing-cursor text-gray-400">{log.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right text-xs opacity-50 animate-pulse">
          INITIALIZING...
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'} font-mono`}>

      {/* --- GLOBAL BACKGROUND --- */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <MatrixRain />
        {/* Scanlines Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />
      </div>

      {/* --- NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={isLogoHovered ? logoHover : logo}
              alt="Gusti Panji Widodo"
              className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-gray-400">
          <Link to="/work" className="hover:text-red-500 cursor-pointer hover:underline decoration-red-500 decoration-2 underline-offset-4 transition-colors">
            /work
          </Link>
          <Link to="/blog" className="hover:text-red-500 cursor-pointer hover:underline decoration-red-500 decoration-2 underline-offset-4 transition-colors">
            /blog
          </Link>
        </nav>
        <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 text-xs hover:bg-red-500 hover:text-black transition-all uppercase tracking-wider">
          Resume.pdf <Download size={14} />
        </button>
      </header>

      {/* --- PAGE CONTENT --- */}
      <main className="relative pt-24 min-h-screen">
        <Outlet />
      </main>

      {/* --- FOOTER / CONTACT (Unified Design) --- */}
      <footer className="w-full bg-black border-t border-white/10 p-12 md:p-24 flex flex-col items-center justify-center font-mono relative overflow-hidden min-h-[50vh]">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div className="text-red-500 text-xs mb-4">&gt; initiates_contact_sequence</div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            SYSTEM <span className="text-red-600 bg-red-900/20 px-2">ONLINE</span>
          </h2>

          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
            Ready to deploy robust solutions. Execute command below to begin transmission.
          </p>

          <div className="flex flex-col gap-4 max-w-xl mx-auto mb-12 w-full">
            <input
              type="text"
              placeholder="Subject // Title"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 p-4 w-full focus:outline-none focus:border-red-500 placeholder-gray-600 font-mono transition-colors"
            />
            <textarea
              placeholder="Message content..."
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={4}
              className="bg-white/5 border border-white/10 text-gray-300 p-4 w-full focus:outline-none focus:border-red-500 placeholder-gray-600 font-mono resize-none transition-colors"
            />
            <button
              onClick={handleContact}
              className="bg-red-700 text-white px-8 py-4 font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider w-full"
            >
              [ EXECUTE TRANSMISSION ]
            </button>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/gpwid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors uppercase text-xs tracking-wider border border-gray-800 px-6 py-3 hover:border-red-500">
              <Github size={16} /> Github
            </a>
            <a href="https://www.linkedin.com/in/gusti-panji-widodo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors uppercase text-xs tracking-wider border border-gray-800 px-6 py-3 hover:border-red-500">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-black text-[#333] py-4 px-8 text-[10px] uppercase flex justify-between tracking-widest font-mono">
        <span>© 2026 GPWID. Built with duck tape.</span>
        <span className="cursor-pointer hover:text-red-500" onClick={() => window.scrollTo(0, 0)}>Back to Top ↑</span>
      </div>

    </div>
  );
}