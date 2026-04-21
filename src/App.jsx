import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu, Shield, Terminal, Moon, Sun, GraduationCap, Award, Briefcase, Users, ChevronUp, ExternalLink, Trophy, Search } from 'lucide-react';
import algoVid from './assets/Algo.mov';
import rpiImg from './assets/RPI.jpg';
import stmVid from './assets/STM.MOV';
import authImg from './assets/AuthMsg.png'; // Registration/Auth pic
import leaveMsgImg from './assets/LeaveMsg.png'; // Leave application msg pic

// ─── MATRIX RAIN ────────────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const cols = Math.floor(w / 16);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|\\;:!@#$%^&*';
    const draw = () => {
      ctx.fillStyle = 'rgba(2,6,23,0.07)';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.fillStyle = '#0ea5e9';
        }
        ctx.font = `${Math.random() > 0.9 ? 'bold ' : ''}14px monospace`;
        ctx.fillText(char, i * 16, drops[i] * 16);
        if (drops[i] * 16 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 40);
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────────────
function GlitchText({ text, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text.split('').map((c, i) => {
          if (c === ' ') return ' ';
          if (i < iter) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iter >= text.length) { setDone(true); clearInterval(interval); }
      iter += 0.4;
    }, 35);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span className={`${className} ${done ? '' : 'tracking-widest'}`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {displayed || text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')}
    </span>
  );
}

// ─── TERMINAL LINES ──────────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: '> INITIALIZING SECURE BOOT SEQUENCE...', delay: 0, color: '#38bdf8' },
  { text: '> LOADING KERNEL MODULES [OK]', delay: 400, color: '#4ade80' },
  { text: '> CHECKING NETWORK INTERFACES... eth0 [UP] wlan0 [UP]', delay: 800, color: '#94a3b8' },
  { text: '> SCANNING FOR INTRUSIONS... 0 THREATS DETECTED', delay: 1300, color: '#4ade80' },
  { text: '> MOUNTING ENCRYPTED VOLUMES [OK]', delay: 1700, color: '#94a3b8' },
  { text: '> VERIFYING IDENTITY CERTIFICATES... RSA-4096 [VALID]', delay: 2100, color: '#38bdf8' },
  { text: '> ESTABLISHING TLS 1.3 HANDSHAKE...', delay: 2500, color: '#94a3b8' },
  { text: '> BYPASSING HONEYPOT DETECTION [STEALTH MODE ON]', delay: 2900, color: '#a78bfa' },
  { text: '> DECRYPTING PORTFOLIO ARCHIVE...', delay: 3300, color: '#38bdf8' },
  { text: '> ACCESS GRANTED. WELCOME, VISITOR.', delay: 3800, color: '#fbbf24' },
];

function TerminalLog({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Array to store timeout IDs so we can clear them
    const timeouts = [];

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => {
          // Check if line already exists to prevent duplication
          if (prev.find(l => l.text === line.text)) return prev;
          return [...prev, line];
        });
        
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        
        if (i === BOOT_LINES.length - 1) {
          const finalT = setTimeout(onDone, 800);
          timeouts.push(finalT);
        }
      }, line.delay + 600);
      
      timeouts.push(t);
    });

    // Cleanup function: This stops the "double run" effect
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [onDone]);

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-sky-500/20 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-sky-500/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/3">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">jonah@portfolio ~ boot</span>
        </div>
        <div className="p-5 min-h-[220px] space-y-1.5">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono"
              style={{ color: line.color }}
            >
              {line.text}
              {i === visibleLines.length - 1 && (
                <span className="animate-pulse ml-0.5">█</span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">BOOT PROGRESS</span>
            <span className="text-[9px] font-mono text-sky-400">{progress}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0ea5e9, #818cf8)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('name'); // name → terminal → done
  useEffect(() => {
    // After name reveal (2.8s), show terminal
    const t = setTimeout(() => setPhase('terminal'), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
      {/* Google Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');`}</style>

      <MatrixRain />

      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
      }} />

      {/* Corner decorations */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 border-sky-500/40`} style={{
          borderTopWidth: i < 2 ? '1px' : 0,
          borderBottomWidth: i >= 2 ? '1px' : 0,
          borderLeftWidth: i % 2 === 0 ? '1px' : 0,
          borderRightWidth: i % 2 === 1 ? '1px' : 0,
        }} />
      ))}

      {/* Status dot top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span className="text-[9px] font-mono text-sky-400/60 uppercase tracking-[0.3em]">SECURE SESSION</span>
        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 w-full max-w-3xl">
        {/* ── NAME REVEAL ── */}
        <AnimatePresence>
          {phase === 'name' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              {/* Tiny label */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-[9px] font-mono text-sky-400/70 uppercase"
              >
                IDENTITY VERIFIED
              </motion.div>

              {/* JONAH */}
              <motion.div
                initial={{ opacity: 0, y: 60, skewX: -5 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(4rem,15vw,9rem)] font-black leading-none text-white"
                style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '-0.02em' }}
              >
                JONAH
              </motion.div>

              {/* CHOON with glitch */}
              <motion.div
                initial={{ opacity: 0, y: 60, skewX: 5 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(4rem,15vw,9rem)] font-black leading-none"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)',
                  backgroundSize: '200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 2s linear infinite',
                }}
              >
                CHOON
              </motion.div>

              {/* Subtitle tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-2 mt-2"
              >
                {['CS @ NTU', 'Cybersecurity', 'Networks', 'AI Red Teaming'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 text-[9px] font-mono text-sky-400 uppercase tracking-[0.2em]">
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Decrypting line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.4 }}
                className="mt-4 text-[10px] font-mono text-slate-500"
              >
                <GlitchText text="> DECRYPTING PORTFOLIO... PLEASE STAND BY" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TERMINAL PHASE ── */}
        <AnimatePresence>
          {phase === 'terminal' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-8"
            >
              {/* Name - smaller persistent */}
              <div className="text-center">
                <div
                  className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-none"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background: 'linear-gradient(135deg, #fff 40%, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  JONAH CHOON
                </div>
              </div>
              <TerminalLog onDone={onComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

// ─── PORTFOLIO COMPONENTS (unchanged) ────────────────────────────────────────
const Card = ({ children, title, className = "", icon: Icon, isLight }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={`border rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 ${
      isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#0f172a] border-white/5"
    } ${className}`}
  >
    <div>
      {Icon && <Icon className="text-blue-500 mb-6" size={24} />}
      {title && (
        <h2 className={`font-bold text-xs uppercase tracking-[0.2em] mb-4 ${
          isLight ? "text-slate-400" : "text-slate-500"
        }`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  </motion.div>
);

function ProjectCard({ project, isLight, isOpen, onClick }) {
  const cardRef = useRef(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      setTimeout(() => { 
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      }, 100);
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  return (
    <motion.div 
      ref={cardRef} 
      layout 
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} 
      className={`border rounded-[2rem] overflow-hidden transition-colors ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5 hover:bg-white/[0.07]"}`}
    >
      <div onClick={onClick} className="p-6 flex items-center justify-between cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl transition-colors ${isLight ? "bg-white shadow-sm" : "bg-black/20 group-hover:bg-blue-500/10"}`}>
            <project.icon className={project.color} size={24} />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">{project.subtitle}</p>
            <h3 className={`text-lg font-bold leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>{project.title}</h3>
          </div>
        </div>
        <div className="text-slate-500 p-2">
          {isOpen ? (
            <motion.div initial={{ opacity: 0, rotate: -180 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.3 }}>
              <ChevronUp size={20} className="text-blue-400" />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ExternalLink size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
            <div className={`px-8 pb-8 pt-4 border-t ${isLight ? "border-slate-200 bg-white/50" : "border-white/5 bg-black/10"}`}>
              {project.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} // <--- THIS BRACE WAS MISSING
// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [activeTab, setActiveTab] = useState('experience');
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const email = "jonahchooncm@gmail.com";
  const github = "https://github.com/jonahchoon";
  const linkedin = "https://www.linkedin.com/in/jonahchooncm/";

  useEffect(() => {
    document.title = "Jonah's Portfolio";
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');`}</style>

      {/* ── LOADING OVERLAY ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN PORTFOLIO ── */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`min-h-screen p-6 md:p-12 font-sans transition-colors duration-500 selection:bg-blue-500/30 overflow-x-hidden relative ${
            isLight ? "bg-slate-50 text-slate-900" : "bg-[#020617] text-slate-200"
          }`}
        >
          {/* Background Decor */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full transition-opacity duration-500 ${
              isLight ? "bg-blue-200/20 opacity-50" : "bg-blue-600/5"
            }`} />
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] blur-[120px] rounded-full transition-opacity duration-500 ${
              isLight ? "bg-indigo-200/20 opacity-50" : "bg-indigo-600/5"
            }`} />
          </div>

          {/* Theme Toggle */}
          <div className="max-w-6xl mx-auto flex justify-end mb-6 relative z-20">
            <button
              onClick={() => setIsLight(!isLight)}
              className={`p-3 rounded-full border transition-all ${
                isLight ? "bg-white border-slate-200 text-slate-900 shadow-sm" : "bg-white/5 border-white/10 text-white"
              }`}
            >
              {isLight ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">

              {/* BIO CARD */}
              <Card isLight={isLight} className="md:col-span-8 py-10 justify-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                  JONAH <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">CHOON.</span>
                </h1>
                <p className={`mt-6 text-lg max-w-xl leading-relaxed transition-colors ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>
                  I am a <span className={`font-medium italic ${isLight ? "text-slate-900" : "text-white"}`}>Year 4 Computer Science student at Nanyang Technological University</span>.
                  My focus is on <span className="text-blue-400 font-medium">Computer Networks</span> and
                  <span className="text-blue-400 font-medium"> Cybersecurity</span>. I'm interested in
                  understanding how systems connect and building tools to keep those connections secure.
                </p>
              </Card>

              {/* CONTACT HUB */}
              <Card isLight={isLight} className="md:col-span-4 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className={`text-[10px] uppercase tracking-widest font-mono ${isLight ? "text-slate-400" : "text-slate-500"}`}>Current Status</p>
                    <p className="text-sm font-bold">Intern @ HDB (Smart Systems Cybersecurity)</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] uppercase tracking-widest font-mono ${isLight ? "text-slate-400" : "text-slate-500"}`}>Specialization</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] rounded-md border border-blue-500/20 font-medium">Network</span>
                      <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] rounded-md border border-purple-500/20 font-medium">Cybersecurity</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="flex justify-center items-center gap-3">
                    {[
                      { icon: Mail, href: `mailto:${email}` },
                      { icon: Github, href: github },
                      { icon: Linkedin, href: linkedin }
                    ].map((social, idx) => (
                      <a key={idx} href={social.href} target="_blank" rel="noreferrer"
                        className={`w-12 h-12 rounded-2xl transition border flex items-center justify-center shrink-0 ${
                          isLight ? "bg-slate-50 border-slate-200 hover:bg-blue-50 text-slate-600" : "bg-white/5 border-white/5 hover:bg-blue-500/10 text-white"
                        }`}>
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                  <a href={`mailto:${email}`} className="block w-full text-center py-4 bg-blue-600 rounded-2xl font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition">
                    Contact Me
                  </a>
                </div>
              </Card>
            </div>

            {/* TABS */}
            <div className="mb-6">
              <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                    { id: 'projects', label: 'Projects', icon: Cpu }, // New Tab
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'certs', label: 'Certifications', icon: Award },
                    { id: 'activities', label: 'Community', icon: Users }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shrink-0 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : isLight ? "bg-white text-slate-400 hover:text-slate-900 shadow-sm" : "bg-[#0f172a] text-slate-500 hover:text-white"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card isLight={isLight} className="md:col-span-12 min-h-[400px]">
                    {activeTab === 'experience' && (
                      <div className="space-y-12">
                        <div className="relative pl-8 border-l-2 border-blue-500">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Housing & Development Board (HDB)</h4>
                            <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">Jan 2025 — Present</span>
                          </div>
                          <p className="text-blue-400 text-xs font-bold mb-4 uppercase tracking-[0.2em]">Smart System Cybersecurity Intern</p>
                          <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Attached to the Centre of Excellence of Smart and Sustainability Research in HDB's Building & Research Institute.</li>
                            <li>• Analyze current work processes and GovTech's Instruction Manual (IM) for ICT&SS Management to highlight gaps and cybersecurity vulnerabilities in smart systems.</li>
                            <li>• Propose simplified work processes and technical terms to manage the cybersecurity posture of government smart systems.</li>
                            <li>• Assist in creating documentation and guidelines for best practices in smart systems cybersecurity management.</li>
                          </ul>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617]" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Nanyang Technological University</h4>
                            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Mar 2024 — Apr 2024</span>
                          </div>
                          <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">Data Transformation Assistant</p>
                          <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>Assisted in administrative work of data entry and transformation tasks for the new website under the Work-Study Scheme.</p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617]" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Temasek Polytechnic</h4>
                            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Jun 2021 — Sep 2021</span>
                          </div>
                          <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">Temporary Executive</p>
                          <ul className={`text-sm space-y-2 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Prepared and graded course materials for Cisco Networking & Red Hat Linux.</li>
                            <li>• Mentored WorldSkills Singapore Competitor in IT Network & System Administration.</li>
                          </ul>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>SBM Offshore</h4>
                            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Mar 2021 — May 2021</span>
                          </div>
                          <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">IT Support - Residential Engineer</p>
                          <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>Served as primary point of contact for users, diagnosing and resolving technical issues for users daily, achieving a high resolution rate within first interaction, and improving overall user satisfaction.</p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>SystemEngineer360</h4>
                            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Oct 2020 — Mar 2021</span>
                          </div>
                          <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Technical Consultant - Internship</p>
                          <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Deployed and maintained advanced network infrastructure, including Cisco technologies, firewalls (Palo Alto & Fortinet), and wireless systems (WLCs & APs), ensuring optimal performance and achieving 90% uptime.</li>
                            <li>• Improved system security and reliability by implementing solutions reduced vulnerabilities by 35% across critical infrastructures, while ensuring higher operational efficiency and compliance with industry standards.</li>
                          </ul>
                        </div>
                      </div>
                    )}

           {activeTab === 'projects' && (
  <div className="grid grid-cols-1 gap-6">
    {[
      {
        id: 'robotics',
        title: "Autonomous Multi-Agent Robotics System",
        subtitle: "Full-Stack Robotics & Computer Vision",
        icon: Cpu,
        color: "text-blue-400",
        tags: ["YOLOv8", "RPi 4", "STM32", "A* Pathfinding", "BLE 5.0"],
        summary: "An integrated robotics platform capable of autonomous navigation and high-accuracy image recognition in non-ideal environments.",
        details: (
          <div className="space-y-12">
            {/* 01. SYSTEM OVERVIEW (MOVED TO TOP) */}
            <section className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/20">
              <h4 className="text-blue-400 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">01. Project Mission & System Integration</h4>
              <div className={`space-y-4 text-xs leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <p>
                  The objective was to engineer a fully autonomous loop. The process begins with <strong>Environment Mapping</strong>: 
                  Obstacles are placed on a coordinate grid via an Android tablet, each assigned a specific ID and bearing. The system then 
                  autonomously navigates to these targets, performs visual verification, and reports back.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 font-mono text-[10px]">
                  <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-blue-400 block mb-1">PHASE 1: ANALYZE</span>
                    The <strong>A* Algorithm</strong> calculates the shortest path and transmits vectors to the <strong>STM32</strong> via the <strong>Raspberry Pi</strong> bridge.
                  </div>
                  <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-emerald-400 block mb-1">PHASE 2: ACTUATE</span>
                    STM32 drives the motors with PID correction. The <strong>RPi Camera</strong> scans visuals to verify numeric/alphabet IDs with high accuracy.
                  </div>
                  <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-purple-400 block mb-1">PHASE 3: FEEDBACK</span>
                    Once detected, real-time image updates are transmitted back to the <strong>Android Tablet</strong> to confirm mission progress.
                  </div>
                </div>
              </div>
            </section>

            {/* 02. RPI & VISION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
              <div>
                <h4 className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">02. Perception Layer (RPi 4)</h4>
                <p className={`text-xs leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  The Raspberry Pi 4 acts as the high-level compute node. Its primary role is to process 
                  visual data and bridge the Android interface with the low-level hardware.
                </p>
                <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-blue-500/20 pl-4">
                  <li>• <strong>Robust Detection:</strong> YOLOv8 model trained specifically on datasets with <strong>noisy backgrounds</strong> to maintain {'>'}80% confidence in real-world lab conditions.</li>
                  <li>• <strong>Middleware:</strong> Handles bi-directional communication, routing pathfinding coordinates to the STM32 via Serial UART.</li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <img src={rpiImg} alt="RPi Vision Output" className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity" />
                <p className="p-2 text-[9px] font-mono text-center opacity-50 uppercase">Visual Inference Results</p>
              </div>
            </section>

            {/* 03. ALGO & PATHFINDING */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
              <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <video src={algoVid} autoPlay loop muted playsInline className="w-full h-auto" />
                <p className="p-2 text-[9px] font-mono text-center opacity-50 uppercase">A* Grid Mapping & Trajectory Calculation</p>
              </div>
              <div className="order-1 md:order-2">
                <h4 className="text-amber-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">03. Navigation Logic (A* Algorithm)</h4>
                <p className={`text-xs leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  The algorithm determines the shortest collision-free path across a 20x20 coordinate system.
                </p>
                <div className={`p-4 rounded-2xl ${isLight ? "bg-slate-200/50" : "bg-black/40 text-blue-300"} font-mono text-[10px]`}>
                  <p className="mb-2 text-amber-500 font-bold">// Logic Selection</p>
                  <p className="opacity-80 leading-normal italic">
                    "Calculates Euclidean distance while prioritizing 'Safe Zone' buffers around obstacles. 
                    The path is weighted based on the robot's turning radius to ensure fluid motion and maximize motor efficiency."
                  </p>
                </div>
              </div>
            </section>

            {/* 04. STM32 ACTUATION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
              <div>
                <h4 className="text-emerald-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">04. Actuation Layer (STM32)</h4>
                <p className={`text-xs leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  The STM32 manages deterministic motor control, translating coordinate deltas into physical displacement.
                </p>
                <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-emerald-500/20 pl-4">
                  <li>• <strong>PID Control:</strong> Implements Proportional-Integral-Derivative loops to synchronize DC motors for precise straight-line and angular movement.</li>
                  <li>• <strong>Precision:</strong> High-resolution encoder feedback ensures sub-millimeter accuracy for every command executed.</li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <video src={stmVid} autoPlay loop muted playsInline className="w-full h-auto" />
                <p className="p-2 text-[9px] font-mono text-center opacity-50 uppercase">Actuation & PID Stability Demo</p>
              </div>
            </section>
          </div>
        )
      },
   {
  id: 'saf',
  title: "Personnel Accountability & Reporting Bot [SAF]",
  subtitle: "Automated Workflow & Admin Security",
  icon: Terminal,
  color: "text-emerald-400",
  tags: ["Google Apps Script", "Telegram Bot API", "G-Suite API", "Logic Orchestration"],
  summary: "A streamlined reporting tool that replaced manual tracking with a verified, button-based system to sync personnel status with Google Calendar.",
  details: (
    <div className="space-y-12">
      {/* 01. PROJECT OVERVIEW */}
      <section className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/20">
        <h4 className="text-emerald-400 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">01. Project Overview</h4>
        <div className={`space-y-4 text-xs leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
          <p>
            The main task of this project was to <strong>track where everyone is at all times.</strong> Managing statuses for Offs, Leaves, and Medical Appointments was a manual mess that took way too long, especially when personnel were coming off MC but hadn't reported their status yet.
          </p>
          <p>
            I built a bot that collates everything into a shared Google Calendar. Instead of typing commands, I designed the frontend with <strong>clickable buttons</strong> so it’s easy for non-technical staff to use. No more command typos—just tap and report.
          </p>
        </div>
      </section>

      {/* 02. FRONTEND & SECURITY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
        <div>
          <h4 className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">02. Frontend & Access Security</h4>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            Security was a priority. First-time users are blocked from using the bot until they are <strong>manually verified by administrators</strong> (the Regulars).
          </p>
          <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-blue-500/20 pl-4">
            <li>• <strong>Registration Gate:</strong> Unauthorized users are prompted to register and must wait for Admin approval.</li>
            <li>• <strong>Button UI:</strong> Purely menu-based interaction for standardized reporting without manual text commands.</li>
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <img src={authImg} alt="Registration Gate" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
          <p className="p-2 text-[9px] font-mono text-center opacity-50 uppercase">Fig 1.1: Authorization & Registration Prompt</p>
        </div>
      </section>

      {/* 03. LOGIC & REPORTING */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
        <div className="order-2 md:order-1 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <img src={leaveMsgImg} alt="Leave Application" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
          <p className="p-2 text-[9px] font-mono text-center opacity-50 uppercase">Fig 2.1: Automated Leave Status Update</p>
        </div>
        <div className="order-1 md:order-2">
          <h4 className="text-emerald-400 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">03. Automated Status Reporting</h4>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            The bot acts as a high-speed data entry tool, converting button taps into structured notifications and calendar events.
          </p>
          <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-emerald-500/20 pl-4">
            <li>• <strong>Instant Notifications:</strong> When someone applies for leave, the bot pushes a clean summary (Rank, Date, Type) to the group.</li>
            <li>• <strong>Overseas Tracking:</strong> Includes logic to capture specific countries for personnel going overseas for better accountability.</li>
          </ul>
        </div>
      </section>

      {/* 04. DATA PERSISTENCE & SAMPLE REPORT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
        <div>
          <h4 className="text-amber-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">04. Record Keeping (G-Suite)</h4>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            Everything is logged into a shared Google Calendar for visual tracking and a spreadsheet for administrative records.
          </p>
          <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-amber-500/20 pl-4">
            <li>• <strong>Dynamic Sync:</strong> Automatically adds events like "[RankName] Leave (Singapore)" to the calendar.</li>
            <li>• <strong>Report Generator:</strong> Admins can trigger a "Generate Report" button that builds a clean summary for higher-ups.</li>
          </ul>
        </div>
        <div className={`p-5 rounded-2xl border ${isLight ? "bg-slate-100" : "bg-black/40 text-blue-300"} font-mono text-[9px] leading-tight`}>
          <p className="mb-2 text-amber-500 font-bold uppercase tracking-tighter">// Sample Internal Report Output</p>
          <p className="opacity-80">
            Internal Report: 31-11-2024<br/><br/>
            Duty Standby: Mr Alex, LCP Jordan, LCP Amos<br/>
            Duty Storeman: LCP Raymond<br/>
            Total Strength: 23/30<br/>
            Perm Staff: 10/15<br/><br/>
            <span className="text-blue-400">Leave/Off/OIL: 3 Pax</span><br/>
            <span className="text-red-400">Reporting Sick: PTE William</span>
          </p>
        </div>
      </section>
    </div>
  )
},
    {
  id: 'avenlis',
  title: "Avenlis StateraSolv",
  subtitle: "AI Security & Red Teaming Platform",
  icon: Shield,
  color: "text-purple-400",
  tags: ["LLM Security", "Adversarial Attacks", "MITRE ATLAS", "Risk Benchmarking"],
  summary: "A specialized AI Security assistant designed to stress-test Large Language Models (LLMs) against prompt injections, jailbreaks, and adversarial exploits.",
  details: (
    <div className="space-y-12">
      {/* 01. EXTERNAL LINK & PROJECT MISSION */}
      <section className="bg-purple-500/5 p-6 rounded-3xl border border-purple-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h4 className="text-purple-400 font-mono text-[10px] font-black uppercase tracking-[0.2em]">01. Platform Overview</h4>
          <a 
            href="https://avenlis.staterasolv.com/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-600/20"
          >
            Launch Live Site <ExternalLink size={12} />
          </a>
        </div>
        <div className={`space-y-4 text-xs leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
          <p>
            <strong>The Mission:</strong> Avenlis is an advanced AI Security platform built to address the vulnerabilities inherent in modern Large Language Models. As AI integration grows, the surface area for <strong>Adversarial Attacks</strong> expands; Avenlis provides a controlled environment to simulate these threats.
          </p>
          <p>
            <strong>The Core Goal:</strong> To evaluate and enhance the resilience of AI systems. By simulating complex attack vectors—ranging from prompt injections to sophisticated jailbreaks—Avenlis helps developers identify safety gaps before deployment.
          </p>
        </div>
      </section>

      {/* 02. RED TEAMING MODULES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
        <div>
          <h4 className="text-blue-500 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">02. Adversarial Simulation Logic</h4>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            The platform utilizes a structured red-teaming approach to probe LLM safety guardrails.
          </p>
          <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-blue-500/20 pl-4">
            <li>• <strong>Prompt Injection:</strong> Simulating indirect and direct overrides to high-level system instructions.</li>
            <li>• <strong>Jailbreak Vectors:</strong> Testing resilience against role-playing scenarios and cognitive hacking techniques designed to bypass safety filters.</li>
            <li>• <strong>Data Leakage:</strong> Probing for unauthorized extraction of training data or sensitive system prompts.</li>
          </ul>
        </div>
        <div className={`p-5 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
          <div className="flex flex-col gap-2 font-mono text-[10px]">
            <span className="text-purple-400 opacity-50">// Red Teaming Matrix</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-black/20 rounded border border-white/5 text-center">Safety Benchmarking</div>
              <div className="p-2 bg-black/20 rounded border border-white/5 text-center">Adversarial Probing</div>
              <div className="p-2 bg-black/20 rounded border border-white/5 text-center">Robustness Scoring</div>
              <div className="p-2 bg-black/20 rounded border border-white/5 text-center">MITRE ATLAS Alignment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. TECHNICAL SPECIFICATIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
        <div className="order-2 md:order-1 p-5 rounded-2xl border border-white/5 bg-black/40 font-mono text-[10px]">
          <p className="text-emerald-500 mb-2 uppercase tracking-tighter">// Security Documentation Sample</p>
          <div className="opacity-70 space-y-2 text-[9px] leading-tight">
             <p className="text-blue-400"># Vulnerability Analysis</p>
             <p>Target: GPT-4o-mini / Llama-3</p>
             <p>Method: Automated Gradient-based Probing</p>
             <p>Status: Safety Override Detected (Prompt Injection Level 4)</p>
             <p>---</p>
             <p className="text-red-400">Recommendation: Implement Input Sanitization Layer</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h4 className="text-emerald-400 font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4">03. Logic & Evaluation Engine</h4>
          <p className="text-xs opacity-70 leading-relaxed mb-4">
            Avenlis goes beyond simple testing by providing quantitative risk assessments.
          </p>
          <ul className="space-y-2 font-mono text-[11px] opacity-90 border-l-2 border-emerald-500/20 pl-4">
            <li>• <strong>Risk Benchmarking:</strong> Automated scoring based on the probability of safety filter failure.</li>
            <li>• <strong>Framework Alignment:</strong> Mapping exploits to the <strong>MITRE ATLAS™</strong> (Adversarial Threat Landscape for Artificial-Intelligence Systems) framework.</li>
            <li>• <strong>Remediation Insights:</strong> Provides actionable data for refining LLM system prompts and RLHF guardrails.</li>
          </ul>
        </div>
      </section>

      {/* 04. FINAL IMPACT */}
      <section className="border-t border-white/5 pt-8">
        <div className={`p-4 rounded-2xl ${isLight ? "bg-slate-100" : "bg-black/40 text-blue-300"} font-mono text-[10px]`}>
          <p className="mb-2 text-purple-400 font-bold tracking-widest">// AI SECURITY IMPACT</p>
          <p className="opacity-80 leading-normal italic">
            "Avenlis StateraSolv bridges the gap between AI development and offensive security. By proactively simulating the 'adversarial mindset,' we enable the creation of more secure, reliable, and ethically-aligned AI ecosystems."
          </p>
        </div>
      </section>
    </div>
  )
}
    ].map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isLight={isLight} 
            isOpen={expandedProjectId === project.id}
            onClick={() => {
              setExpandedProjectId(expandedProjectId === project.id ? null : project.id);
            }}
          />
        ))}
      </div>
    )}

                    {activeTab === 'education' && (
                      <div className="space-y-12">
                        <div className="relative pl-8 border-l-2 border-blue-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Nanyang Technological University</h4>
                            <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">2023 — 2027</span>
                          </div>
                          <p className="text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">Bachelor of Computing in Computer Science (Security Specialization)</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm leading-relaxed">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-500 mb-3">Core Security Mods</p>
                              <ul className={`space-y-1.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                <li>• Cyber Threat Intelligence (SC4016)</li>
                                <li>• Applied Cryptography (SC4010)</li>
                                <li>• Software Security (SC4012)</li>
                                <li>• Network Security (SC4063)</li>
                                <li>• Cyber Physical System Security (SC4015)</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-500 mb-3">Networking & Systems</p>
                              <ul className={`space-y-1.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                <li>• Advanced Computer Networks (SC3030)</li>
                                <li>• Wireless & Mobile Networks (SC4030)</li>
                                <li>• Operating Systems (SC2005)</li>
                                <li>• Cloud Computing Foundations</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-500/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617]" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Temasek Polytechnic</h4>
                            <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">2018 — 2021</span>
                          </div>
                          <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">Diploma in Cybersecurity & Digital Forensics</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm leading-relaxed mt-4">
                            <div>
                              <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Cybersecurity & Forensics</p>
                              <ul className={`space-y-1.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                <li>• Ethical Hacking & Intrusion Prevention</li>
                                <li>• Malware Analysis & Digital Forensics</li>
                                <li>• Incident Response & Management</li>
                                <li>• Forensics in Digital Security</li>
                              </ul>
                            </div>
                            <div>
                              <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Development & Infrastructure</p>
                              <ul className={`space-y-1.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                <li>• Secure Web Applications</li>
                                <li>• Enterprise Networking & Security</li>
                                <li>• Data Structures and Algorithms</li>
                                <li>• Application Development Project</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="relative pl-8 border-l-2 border-slate-700/20">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700 border-4 border-[#020617]" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Institute of Technical Education (ITE)</h4>
                            <span className="text-slate-600 font-mono text-xs font-bold uppercase tracking-widest">2016 — 2018</span>
                          </div>
                          <p className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">Higher Nitec in Cyber & Network Security</p>
                          <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                            Foundational training in network administration, server configuration, and baseline security protocols.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'certs' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Cisco Certified Network Associate (CCNA)", org: "Cisco", date: "In Progress", id: "-" },
                          { name: "Certified in Cybersecurity (CC)", org: "ISC2", date: "In Progress", id: "-" },
                          { name: "Google Project Management Specialization", org: "Google", date: "Oct 2025", id: "2U0OU89MMSW9" },
                          { name: "Google Prompting Essentials Specialization", org: "Google", date: "Oct 2025", id: "AFZULS9P7QO5" },
                          { name: "Google Advanced Data Analytics Specialization", org: "Google", date: "Jun 2024", id: "HJF2RJXLGXAZ" },
                          { name: "Google Data Analytics Specialization", org: "Google", date: "Jun 2024", id: "S62D3NSTMDWH" },
                          { name: "Google Cybersecurity Specialization", org: "Google", date: "May 2024", id: "JAQAWB5P346P" },
                          { name: "Google IT Automation with Python Specialization", org: "Google", date: "May 2024", id: "2Q2VHWXDEXLD" },
                          { name: "Google IT Support Specialization", org: "Google", date: "May 2024", id: "3MF99XTAVQ4C" },
                          { name: "Huawei Certified ICT Associate - Datacom (HCIA - Datacom)", org: "Huawei", date: "Apr 2021 — 2024", id: "01010010173980843097916345" },
                          { name: "Certified Ethical Hacker (CEH)", org: "EC-Council", date: "Mar 2021 — 2024", id: "ECC6391025748" },
                          { name: "Certified Network Security Specialist (CNSS)", org: "DefensityOne", date: "May 2020", id: "18809742" },
                          { name: "Cisco Certified Entry Networking Technician (CCENT)", org: "Cisco", date: "Feb 2020 — 2023", id: "MDEBN04DWD1QQRCN" },
                          { name: "Red Hat Certified System Administrator (RHCSA)", org: "Red Hat", date: "Apr 2019 — 2022", id: "190-079-467" }
                        ].map((cert, i) => (
                          <div key={i} className={`p-6 rounded-3xl border transition-all duration-300 group ${
                            cert.date === "In Progress"
                              ? (isLight ? "bg-blue-50 border-blue-200" : "bg-blue-500/5 border-blue-500/20")
                              : (isLight ? "bg-slate-50 border-slate-100" : "bg-white/5 border-white/5")
                          }`}>
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <div className="space-y-1">
                                <h4 className={`font-bold text-sm leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>{cert.name}</h4>
                                <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-wider">{cert.org}</p>
                              </div>
                              {cert.date === "In Progress" && (
                                <span className="shrink-0 px-2 py-0.5 rounded-full bg-blue-500 text-[8px] text-white font-black uppercase animate-pulse">Active</span>
                              )}
                            </div>
                            <div className={`mt-auto pt-4 border-t ${isLight ? "border-slate-200/50" : "border-white/5"}`}>
                              <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-[9px] font-mono">
                                  <span className="text-slate-500 uppercase tracking-tighter">Credential ID</span>
                                  <span className={`px-2 py-0.5 rounded bg-blue-500/10 ${isLight ? "text-blue-700" : "text-blue-400"}`}>{cert.id}</span>
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-mono">
                                  <span className="text-slate-500 uppercase tracking-tighter">Status Date</span>
                                  <span className={cert.date === "In Progress" ? "text-blue-500 font-bold" : "text-slate-400"}>{cert.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'activities' && (
                      <div className="space-y-12">
                        <div className="relative pl-8 border-l-2 border-purple-500">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>ISC2 Youth Wing Executive Committee</h4>
                            <span className="text-purple-500 font-mono text-xs font-bold uppercase tracking-widest">Jan 2025 — Present</span>
                          </div>
                          <p className="text-purple-400 text-xs font-bold mb-4 uppercase tracking-widest">Secretary</p>
                          <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Coordinating strategic initiatives to empower the next generation of cybersecurity professionals through community engagement.</li>
                            <li>• Collaborating with educational institutions, industry leaders, and government agencies to facilitate high-impact mentorship programs and industry visits.</li>
                            <li>• Strengthening national cybersecurity talent pipelines by fostering cross-ecosystem collaboration and knowledge sharing.</li>
                          </ul>
                        </div>
                        <div className="relative pl-8 border-l-2 border-blue-500">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>InnovationLab @ NTU CCDS</h4>
                            <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">Aug 2024 — Present</span>
                          </div>
                          <p className="text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">Main Committee (Secretary)</p>
                          <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Spearheading administrative operations and overseeing organizational workflows to ensure efficient lab governance.</li>
                            <li>• Curating and hosting technical workshops and mentoring sessions designed to bridge the gap between academic theory and industry practice.</li>
                            <li>• Successfully facilitated SummerBuild'25, a premier 5-week educational hackathon for over 100 participants to develop innovative software solutions.</li>
                          </ul>
                        </div>
                        <div className="relative pl-8 border-l-2 border-emerald-500">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-4 border-[#020617] transition-colors" />
                          <div className="flex justify-between items-start mb-2 flex-wrap">
                            <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>NTU Residential Hall Council</h4>
                            <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Aug 2025 — Present</span>
                          </div>
                          <p className="text-emerald-400 text-xs font-bold mb-4 uppercase tracking-widest">Logistics Officer (Elected)</p>
                          <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            <li>• Orchestrating full-scale logistics operations for hall-wide residential events, managing end-to-end resource planning and distribution.</li>
                            <li>• Maintaining rigorous oversight of hall equipment inventory, ensuring 100% operational readiness for diverse student-led community initiatives.</li>
                            <li>• Directing procurement processes and coordinating with external vendors to optimize budget allocation for large-scale hall functions.</li>
                            <li>• Collaborating with the Hall Council to streamline venue management and technical setups for complex multidisciplinary events.</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>


            {/* ACHIEVEMENTS */}
            <Card isLight={isLight} title="Awards & Achievements" icon={Trophy} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Award className="text-yellow-600" size={20}/>
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isLight ? "text-slate-900" : "text-white"}`}>MINDEF IGNITE Innovation Award</h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>Digitalization Drone Logs | Telegram x Google Calendar SAF Tasking Report</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Trophy className="text-blue-600" size={20}/>
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isLight ? "text-slate-900" : "text-white"}`}>Worldskills Singapore 2020</h4>
                    <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>IT Network Systems Administrator - Bronze Medalist</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* TECH STACK */}
            <Card isLight={isLight} title="Technical Expertise" className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { label: "Networking", items: ["TCP/IP & Routing", "Cisco Technologies", "Firewalls (Palo Alto/Fortinet)", "Wireless Systems"] },
                  { label: "Cybersecurity", items: ["AI Red Teaming", "MITRE ATLAS", "Vulnerability Research", "Digital Forensics"] },
                  { label: "Development", items: ["Python / C++", "React.js / Vite", "Android SDK", "YOLOv8"] },
                  { label: "Infrastructure", items: ["Red Hat Linux", "Server Admin", "Cloud Foundations", "Automation"] }
                ].map((stack, i) => (
                  <div key={i}>
                    <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {stack.label}
                    </h4>
                    <ul className="space-y-2">
                      {stack.items.map(item => (
                        <li key={item} className={`text-xs transition cursor-default hover:text-blue-500 ${isLight ? "text-slate-500" : "text-slate-500 hover:text-slate-300"}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            <footer className={`py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t mt-12 transition-colors ${isLight ? "border-slate-200" : "border-white/5"}`}>
              <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-mono">
                © 2026 Jonah Choon Cai Ming
              </div>
              <div className="flex items-center gap-8 text-slate-500">
                <a href={github} target="_blank" className="group flex items-center gap-2 hover:text-blue-500 transition-all text-[10px] font-mono uppercase tracking-[0.2em]">
                  <Github size={14} /> Github
                </a>
                <a href={linkedin} target="_blank" className="group flex items-center gap-2 hover:text-blue-500 transition-all text-[10px] font-mono uppercase tracking-[0.2em]">
                  <Linkedin size={14} /> Linkedin
                </a>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
}