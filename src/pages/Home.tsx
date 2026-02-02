import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { projects } from '../data/projects';

/* --- UTILITY COMPONENTS --- */

const WELCOME_LANGUAGES = [
    "WELCOME",          // English
    "SELAMAT DATANG",   // Indonesian/Malay
    "欢迎",             // Chinese (Simplified)
    "WELCOME",
    "ようこそ",          // Japanese
    "SELAMAT DATANG",
    "환영합니다",         // Korean
    "WELCOME",
    "ДОБРО ПОЖАЛОВАТЬ", // Russian (Cyrillic)
    "SELAMAT DATANG",
    "BIENVENIDO",       // Spanish
    "WELCOME",
    "BIENVENUE",        // French
    "SELAMAT DATANG",
    "WILLKOMMEN",       // German
    "WELCOME",
    "أهلاً وسهلاً",       // Arabic
    "SELAMAT DATANG",
    "नमस्ते",            // Hindi
    "WELCOME",
    "BENVENUTO",        // Italian
    "SELAMAT DATANG",
    "BEM-VINDO",        // Portuguese
    "WELCOME",
    "ΚΑΛΩΣ ΗΡΘΑΤΕ",     // Greek
    "SELAMAT DATANG",
    "ยินดีต้อนรับ",        // Thai
    "WELCOME",
    "CHÀO MỪNG",        // Vietnamese
    "SELAMAT DATANG",
    "WELKOM",           // Dutch
    "WELCOME",
    "TERVETULOA",       // Finnish
    "SELAMAT DATANG",
    "WITAMY",           // Polish
    "WELCOME",
    "HOŞ GELDINIZ",     // Turkish
    "SELAMAT DATANG",
    "MABUHAY",          // Tagalog
    "WELCOME",
    "KARIBU",           // Swahili
    "SELAMAT DATANG",
    "FAILTE",           // Irish
    "WELCOME",
    "CROESO"            // Welsh
];

const Typewriter: React.FC = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % WELCOME_LANGUAGES.length;
            const fullText = WELCOME_LANGUAGES[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <div className="text-3xl md:text-5xl font-display font-bold italic text-white mb-0 tracking-tighter mix-blend-difference leading-none">
            <span>{text}</span>
            <span className="animate-pulse">_</span>
        </div>
    );
};

export default function Home() {
    // Only show the first 2 projects on Home
    const selectedProjects = projects.slice(0, 2);

    return (
        <>
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen bg-transparent overflow-hidden font-mono flex flex-col">

                {/* Hero Content */}
                <div className="relative z-20 grow flex flex-col justify-center items-start px-6 md:px-20 max-w-7xl mx-auto w-full">

                    <Typewriter />

                    {/* Glitch Effect Name: Widodo */}
                    <div className="relative mt-2">
                        <h1 className="text-2xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-none">
                            I'm <span className='text-red-600'>Gusti Panji </span><span className="text-transparent stroke-red-600" style={{ WebkitTextStroke: '2px #DC2626' }}>Widodo</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:items-center text-gray-400 text-lg md:text-xl border-l-4 border-red-600 pl-6 mt-4">
                        <span className="text-gray-300">Full Stack Developer</span>
                        <span className="hidden md:inline text-red-800">•</span>
                        <span className="text-gray-300">Game Developer</span>
                        <span className="hidden md:inline text-red-800">•</span>
                        <span className="text-gray-300">Artist</span>
                    </div>
                </div>

                <div className="relative z-20 p-8 flex justify-end text-red-500 animate-bounce">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest cursor-pointer">
                        Scroll to Initialize <ChevronDown size={16} />
                    </div>
                </div>
            </section>

            {/* --- DEVELOPER SECTION (Brutalist) --- */}
            <section className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 font-mono text-gray-300 border-t border-white/10 relative">
                <div className="absolute top-0 left-0 bg-white/10 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    Sector 01 // Projects
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8 mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase">
                            Selected Works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProjects.map((project, idx) => (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={idx}
                                className="block group bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors duration-300 rounded-sm overflow-hidden"
                            >
                                <div className="h-48 w-full relative overflow-hidden bg-black">
                                    <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-red-400 text-[10px] font-mono px-3 py-1 border border-red-500/30 rounded-full">
                                        {project.status}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-red-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <ArrowRight size={18} className="text-gray-500 group-hover:text-red-400 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6 leading-relaxed font-mono">
                                        {project.desc}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono uppercase bg-white/5 text-gray-300 px-2 py-1 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SKILLS SECTION --- */}
            <section className="bg-[#050505] min-h-[50vh] py-20 px-6 md:px-12 font-mono text-gray-300 border-t border-white/10 relative">
                <div className="absolute top-0 left-0 bg-white/10 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    Sector 02 // Skills
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8 mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase">
                            Skills & Technologies
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-red-500/30 transition-colors group">
                            <h4 className="text-white group-hover:text-red-500 transition-colors font-display text-xl font-bold mb-6">Languages</h4>
                            <ul className="space-y-3 text-sm text-gray-400 font-mono">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Python</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>TypeScript / JavaScript</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Java</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>PHP</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>C# / C++</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-red-500/30 transition-colors group">
                            <h4 className="text-white group-hover:text-red-500 transition-colors font-display text-xl font-bold mb-6">Frameworks</h4>
                            <ul className="space-y-3 text-sm text-gray-400 font-mono">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>React</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Next.js</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Vue.js</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Laravel</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Tailwind CSS</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Node.js</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-red-500/30 transition-colors group">
                            <h4 className="text-white group-hover:text-red-500 transition-colors font-display text-xl font-bold mb-6">Tools & Engines</h4>
                            <ul className="space-y-3 text-sm text-gray-400 font-mono">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Unity</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Godot Engine</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Roblox Studio</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm hover:border-red-500/30 transition-colors group">
                            <h4 className="text-white group-hover:text-red-500 transition-colors font-display text-xl font-bold mb-6">Others</h4>
                            <ul className="space-y-3 text-sm text-gray-400 font-mono">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Linux</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Computer Networking</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Git</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Blender</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>Graphic Design</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
