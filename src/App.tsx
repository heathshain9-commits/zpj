import React, { useState } from 'react';
import { Star, ArrowDown, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Components
import { ParticleCanvas } from './components/ParticleCanvas';
import { ProjectCardKunlun } from './components/ProjectCard';
import { Kunlun3DCarousel } from './components/Kunlun3DCarousel';
import { InspirationSea } from './components/InspirationSea';

// Data / Types
import { InspirationBubble } from './types';

export default function App() {
  const [kunlunOpen, setKunlunOpen] = useState(false);
  const [selectedBubble, setSelectedBubble] = useState<InspirationBubble | null>(null);

  return (
    <div className="bg-[#070A13] text-slate-100 overflow-x-hidden min-h-screen relative font-sans selection:bg-[#A78BFA] selection:text-[#070A13]">
      
      {/* 1. Fluid Starry & Cursor Repelled Background Particle Canvas */}
      <ParticleCanvas />

      {/* 2. Top Minimalist Exhibition Header Nav */}
      <nav className="fixed top-0 left-0 w-full z-40 glassmorphism border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F472B6] via-[#A78BFA] to-[#60A5FA] animate-pulse flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-white/20" />
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline md:space-x-2">
            <span className="font-bold tracking-widest text-[#F472B6] text-sm uppercase">
              刘家伊 / JIAYI LIU
            </span>
            <span className="text-[10px] text-[#A78BFA]/90 border border-[#A78BFA]/30 px-1.5 py-0.2 rounded font-mono w-max">
              ART & TECH 2401
            </span>
          </div>
        </div>
        <div className="flex space-x-6 text-xs tracking-widest font-mono text-slate-300">
          <a href="#home" className="hover:text-[#A78BFA] transition-colors duration-200">HOME</a>
          <a href="#works" className="hover:text-[#A78BFA] transition-colors duration-200">WORKS</a>
          <a href="#inspiration" className="hover:text-[#A78BFA] transition-colors duration-200">INSPIRATION</a>
        </div>
      </nav>

      {/* 3. Hero Presentation Area */}
      <header id="home" className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20 text-center select-none">
        <div className="max-w-5xl z-10">
          {/* Subtle showcase floating tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase font-semibold">
              JIAYI LIU • GRADUATION PORTFOLIO
            </span>
          </motion.div>
          
          {/* Main Display Typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#A78BFA]">
              ART & TECHNOLOGY
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#60A5FA]">
              PORTFOLIO
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12 backdrop-blur-md bg-white/[0.015] p-6 rounded-2xl border border-white/5"
          >
            跨越理性算法与感性美学边界的探索者。
            <br />
            致力于用代码雕刻光物，以具身化数字声音与生成艺术，重塑人类对民族五音与自然感官的想象。
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#works" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] text-white font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-[#A78BFA]/30 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              浏览展品 WORKS
            </a>
            <a 
              href="#inspiration" 
              className="px-8 py-4 rounded-full glassmorphism text-slate-200 border border-white/10 font-semibold text-xs tracking-wider uppercase hover:bg-white/10 active:scale-95 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-[#A78BFA]" />
              探索灵感 INSPIRATION
            </a>
          </motion.div>
        </div>
        
        {/* Animated scrolling hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-widest">SCROLL DOWN</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </header>

      {/* 4. Selected Portfolio Works section */}
      <section id="works" className="py-28 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-4 font-serif text-white">
            作品展示 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] font-sans">WORKS</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] mx-auto mb-5 rounded-full" />
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            倾斜你的鼠标或倾侧物理指针，感受高级双重钢化玻璃材质在角度变迁中折射出的微茫。
          </p>
        </div>

        {/* Highlight centered Kunlun showcase layout (Sized up for majestic presence) */}
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <ProjectCardKunlun onOpen={() => setKunlunOpen(true)} />
        </div>
      </section>

      {/* 5. Inspiration Sea Section */}
      <section id="inspiration" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest mb-4 font-serif text-white">
            灵感气泡 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#A78BFA] font-sans">INSPIRATION</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#F472B6] to-[#A78BFA] mx-auto mb-5 rounded-full" />
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            戳破空中悬浮的透明晶格，解封隐藏在自然算法背后的思想档案。
          </p>
        </div>

        {/* Interactive Dew-bubble Space Canvas */}
        <InspirationSea onOpenBubble={(b) => setSelectedBubble(b)} />
      </section>

      {/* 6. Comprehensive Immersive 3D Rotating Cylinder Gallery Modal */}
      <Kunlun3DCarousel isOpen={kunlunOpen} onClose={() => setKunlunOpen(false)} />

      {/* 7. Bubble Popped Insight Card Dialog Modal */}
      <AnimatePresence>
        {selectedBubble && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative glassmorphism max-w-lg w-full p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_30px_70px_rgba(167,139,250,0.2)] text-center text-slate-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Absolut highlights inside popped cards */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#60A5FA]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Icon button */}
              <button 
                onClick={() => setSelectedBubble(null)} 
                className="absolute top-5 right-5 text-slate-400 hover:text-white hover:scale-105 transition-all cursor-pointer"
              >
                <XButton />
              </button>
              
              <div className="text-5xl mb-5 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] animate-bounce select-none">
                {selectedBubble.icon}
              </div>
              
              <h4 className="text-xl md:text-2xl font-bold mb-3 tracking-wide text-white">
                {selectedBubble.title}
              </h4>
              <div className="w-14 h-1 bg-gradient-to-r from-[#F472B6] via-[#A78BFA] to-[#60A5FA] mx-auto mb-6 rounded-full" />
              
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-left whitespace-pre-line font-sans max-h-[280px] overflow-y-auto pr-2 bg-black/10 p-5 rounded-2xl border border-white/5 scrollbar-thin">
                {selectedBubble.desc}
              </p>
              
              <button 
                onClick={() => setSelectedBubble(null)}
                className="w-full mt-7 py-3 rounded-2xl bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg shadow-[#A78BFA]/15"
              >
                收纳此篇灵感 INSIGHTS RETRIEVED
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. Master tribute Footer */}
      <footer className="py-20 px-6 border-t border-white/5 glassmorphism mt-28 relative z-10 text-center select-none overflow-hidden">
        {/* Subtle decorative glow in footer center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#A78BFA]/5 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-7 relative z-10">
          <div className="flex items-center justify-center space-x-2 animate-pulse h-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F472B6]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" />
          </div>
          
          <p className="text-slate-300 italic text-xs md:text-sm max-w-2xl mx-auto leading-relaxed px-4 font-sans font-medium">
            “诚挚谨谢领航我们在数字媒介中孜孜探索的所有艺术科技导师。你们的耐心培育，使我们明悟：技术纵然能够载着梦想探索星海之瀚，终需艺术指引那一颗温存、敏锐而丰沛的人文心灵。敬谢师恩。”
          </p>

          <div className="text-slate-500 text-[10px] md:text-[11px] font-mono pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© 2026 刘家伊 | 艺术与科技 2401 | 跨媒体艺术毕业设计及多维交互发布</div>
            <div className="flex space-x-4">
              <span className="hover:text-[#A78BFA] transition-all">Generative Sound Healing</span>
              <span>•</span>
              <span className="hover:text-[#60A5FA] transition-all">Receptive Computing</span>
              <span>•</span>
              <span className="hover:text-[#F472B6] transition-all">Digital Tangibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Inner SVG Helper for Popped Modal Close Key
const XButton = () => (
  <svg className="w-5 h-5 transition-transform hover:rotate-90 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

