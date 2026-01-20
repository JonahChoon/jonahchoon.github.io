import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu, Shield, Terminal, Moon, Sun, GraduationCap, Award, Briefcase, Users, ExternalLink, Trophy, Search } from 'lucide-react';

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

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const [activeTab, setActiveTab] = useState('experience');
  
  const email = "jonahchooncm@gmail.com";
  const github = "https://github.com/jonahchoon";
  const linkedin = "https://www.linkedin.com/in/jonahchooncm/";

  useEffect(() => {
    document.title = "Jonah's Portfolio";
  }, []);

  return (
    <div className={`min-h-screen p-6 md:p-12 font-sans transition-colors duration-500 selection:bg-blue-500/30 overflow-x-hidden relative ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-[#020617] text-slate-200"
    }`}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden text-slate-900">
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
              <span className="text-blue-400 font-medium"> Cybersecurity</span>. I’m interested in 
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

        {/* WORK SAMPLES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card isLight={isLight} title="Robotics & AI" icon={Cpu}>
            <h3 className="text-xl font-bold mb-3 mt-2 font-sans text-blue-500">Autonomous AI Vehicle</h3>
            <p className={`text-sm leading-relaxed mb-6 transition-colors ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Engineered a system with an <span className="text-blue-400 font-medium">Raspberry Pi brain</span> running 
              <span className="text-blue-400 font-medium"> YOLOv8</span> for vision-based navigation. 
              Interfaced with <span className="text-blue-400 font-medium">STM32</span> for motor control and 
              developed an <span className="text-emerald-400 font-medium">Android App</span> to remotely plot 
              detected obstacles and visualize real-time telemetry.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-blue-400 uppercase tracking-widest font-bold">
              <span>YOLOv8</span> <span>Raspberry Pi</span> <span>STM32</span> <span>Android Telemetry</span>
            </div>
          </Card>

          <Card isLight={isLight} title="Automation" icon={Terminal}>
            <h3 className="text-xl font-bold mb-3 mt-2 font-sans text-emerald-500">SAF Operations Automation</h3>
            <p className={`text-sm leading-relaxed mb-6 transition-colors ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Automated <span className="text-emerald-400 font-medium">SAF daily reporting</span> by 
              syncing Telegram inputs with <span className="text-emerald-400 font-medium">Google Calendar</span> via Apps Script. 
              Eliminated manual attendance taking for leave, courses, and medical appointments, 
              generating instant tasking reports for the unit.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
              <span>Google Apps Script</span> <span>Telegram API</span> <span>System Integration</span>
            </div>
            <p className={`mt-4 text-[10px] font-mono transition-colors ${isLight ? "text-slate-500" : "text-slate-500"}`}>
              Personal: Email Notifier and To-Do Bot.
            </p>
          </Card>

          <Card isLight={isLight} title="AI Red Teaming" icon={Shield}>
            <h3 className="text-xl font-bold mb-3 mt-2 font-sans underline decoration-purple-500/30">
              <a href="https://avenlis.staterasolv.com/" target="_blank" className="flex items-center gap-2">Avenlis StateraSolv <ExternalLink size={14}/></a>
            </h3>
            <p className={`text-sm leading-relaxed mb-6 transition-colors ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Core team member in implementing <span className="text-purple-400 font-medium">Avenlis</span>, 
              an AI Security assistant. I helped build the platform's ability to simulate 
              <span className="text-purple-400 font-medium"> adversarial attacks</span> including prompt 
              injections and jailbreaks to stress-test LLM resilience and safety guardrails.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-purple-400 uppercase tracking-widest font-bold">
              <span>AI Security</span> <span>Red Teaming</span> <span>LLM Safety</span> <span>MITRE ATLAS</span>
            </div>
          </Card>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'experience', label: 'Experience', icon: Briefcase },
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
    {/* NEW: HDB Internship */}
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

    {/* Data Transformation Assistant */}
    <div className="relative pl-8 border-l-2 border-slate-500/20">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617]" />
      <div className="flex justify-between items-start mb-2 flex-wrap">
        <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Nanyang Technological University</h4>
        <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Mar 2024 — Apr 2024</span>
      </div>
      <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">Data Transformation Assistant</p>
      <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>Assisted in administrative work of data entry and transformation tasks for the new website under the Work-Study Scheme.</p>
    </div>

    {/* Temasek Poly Job */}
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
                    {/* SBM Offshore - Residential Engineer */}
                    <div className="relative pl-8 border-l-2 border-slate-500/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-4 border-[#020617] transition-colors" />
                      <div className="flex justify-between items-start mb-2 flex-wrap">
                        <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>SBM Offshore</h4>
                        <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Mar 2021 — May 2021</span>
                      </div>
                      <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">IT Support - Residential Engineer</p>
                      <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>Served as primary point of contact for users, diagnosing and resolving technical issues for users daily, achieving a high resolution rate within first interaction, and improving overall user satisfaction.</p>
                    </div>

                    {/* SystemEngineer360 - Internship */}
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

                {activeTab === 'education' && (
                  <div className="space-y-12">
                    <div className="relative pl-8 border-l-2 border-blue-500/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#020617] transition-colors" />
                      <div className="flex justify-between items-start mb-2 flex-wrap">
                        <h4 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Nanyang Technological University</h4>
                        <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">2023 — 2027</span>
                      </div>
                      <p className="text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">Bachelor of Computing in Computer Science (Security Specialization)</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm leading-relaxed transition-colors duration-300">
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
                    
                    {/* Polytechnic Education FULL RESTORE */}
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
                    {/* ITE Entry */}
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
)}{activeTab === 'certs' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[  
      /* --- IN PROGRESS --- */
      { name: "Cisco Certified Network Associate (CCNA)", org: "Cisco", date: "In Progress", id: "-" },
      { name: "Certified in Cybersecurity (CC)", org: "ISC2", date: "In Progress", id: "-" },
      
      /* --- GOOGLE SPECIALIZATIONS --- */
      { name: "Google Project Management Specialization", org: "Google", date: "Oct 2025", id: "2U0OU89MMSW9" },
      { name: "Google Prompting Essentials Specialization", org: "Google", date: "Oct 2025", id: "AFZULS9P7QO5" },
      { name: "Google Advanced Data Analytics Specialization", org: "Google", date: "Jun 2024", id: "HJF2RJXLGXAZ" },                   
      { name: "Google Data Analytics Specialization", org: "Google", date: "Jun 2024", id: "S62D3NSTMDWH" },            
      { name: "Google Cybersecurity Specialization", org: "Google", date: "May 2024", id: "JAQAWB5P346P" },            
      { name: "Google IT Automation with Python Specialization", org: "Google", date: "May 2024", id: "2Q2VHWXDEXLD" },  
      { name: "Google IT Support Specialization", org: "Google", date: "May 2024", id: "3MF99XTAVQ4C" }, 

      /* --- CORE TECHNICAL CREDENTIALS --- */
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
            <h4 className={`font-bold text-sm leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
              {cert.name}
            </h4>
            <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-wider">{cert.org}</p>
          </div>
          {cert.date === "In Progress" && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-blue-500 text-[8px] text-white font-black uppercase animate-pulse">
              Active
            </span>
          )}
        </div>

        <div className={`mt-auto pt-4 border-t ${isLight ? "border-slate-200/50" : "border-white/5"}`}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-slate-500 uppercase tracking-tighter">Credential ID</span>
              <span className={`px-2 py-0.5 rounded bg-blue-500/10 ${isLight ? "text-blue-700" : "text-blue-400"}`}>
                {cert.id}
              </span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-slate-500 uppercase tracking-tighter">Status Date</span>
              <span className={cert.date === "In Progress" ? "text-blue-500 font-bold" : "text-slate-400"}>
                {cert.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

                {activeTab === 'activities' && (
                  <div className="space-y-12">
                    <div className="relative pl-8 border-l-2 border-purple-500/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#020617]" />
                      <div className="flex justify-between items-start mb-2 flex-wrap">
                        <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>ISC2 Youth Wing Executive Committee</h4>
                        <span className="text-purple-500 font-mono text-xs font-bold uppercase tracking-widest">Jan 2025 — Present</span>
                      </div>
                      <p className="text-purple-400 text-xs font-bold mb-4 uppercase tracking-widest">Secretary</p>
                      <ul className={`text-sm space-y-3 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        <li>• Fostered growth of a vibrant youth cybersecurity community by coordinating initiatives engaged, educated, and empowered students and young professionals.</li>
                        <li>• Collaborated with educational institutions, industry leaders, and government agencies to deliver events, mentorships, and industry visits.</li>
                        <li>• Emphasized to strengthening cybersecurity talent pipelines and fostering collaboration across ecosystem.</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 border-l-2 border-blue-500/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#020617]" />
                      <div className="flex justify-between items-start mb-2 flex-wrap">
                        <h4 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>InnovationLab @ NTU CCDS</h4>
                        <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-widest">Aug 2024 — Present</span>
                      </div>
                      <p className="text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">Top 4 (Secretary)</p>
                      <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>Facilitated SummerBuild'25, a 5-week educational hackathon for ~100 participants to build software projects of any theme. Supported participant learning and innovation in alignment with LOFA values.</p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ACHIEVEMENTS CARD */}
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

        {/* Tech Stack */}
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
    </div>
  );
}