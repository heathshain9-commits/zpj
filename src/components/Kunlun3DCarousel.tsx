import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { kunlunChapters } from '../data';

interface Kunlun3DCarouselProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Kunlun3DCarousel: React.FC<Kunlun3DCarouselProps> = ({ isOpen, onClose }) => {
  const [chapters, setChapters] = useState(kunlunChapters);
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [radius, setRadius] = useState(520); // Cylindrical depth radius (further enlarged for magnificent gallery feel)
  const [isMobile, setIsMobile] = useState(false);
  const [isDraggingActive, setIsDraggingActive] = useState(false);

  // Drag states
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const baseRotationRef = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);

  // Trigger a majestic sweep-in rotational entry on mount or open
  useEffect(() => {
    if (isOpen) {
      // Begin with a 120-degree rotation shift
      setRotation(120);
      const timer = setTimeout(() => {
        // Glide smoothly into alignment pointing at first scroll
        setRotation(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle responsive dimensions (exquisitely scaled for maximum visual impact)
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setRadius(mobile ? 280 : 520);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay Effect (Rotates automatically, pauses ONLY when user is actively dragging, resumes instantly on release)
  useEffect(() => {
    if (!isOpen || isDraggingActive) return;

    const interval = setInterval(() => {
      setRotation(prev => prev - 60);
    }, 4000); // 4 seconds interval for comfortable breathing pace

    return () => clearInterval(interval);
  }, [isOpen, isDraggingActive]);

  // Update active slide when rotation changes
  // Total 6 cards, each 60 degrees. Let's calculate active item based on rotation.
  useEffect(() => {
    // Normalise rotation back into 0 .. 360 values
    let normalized = Math.round(-rotation / 60) % 6;
    if (normalized < 0) normalized += 6;
    setActiveIdx(normalized);
  }, [rotation]);

  // Drag Handlers
  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    setIsDraggingActive(true);
    startXRef.current = clientX;
    baseRotationRef.current = rotation;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    // Speed constant
    const speed = isMobile ? 0.6 : 0.45;
    const targetRot = baseRotationRef.current + deltaX * speed;
    setRotation(targetRot);
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingActive(false);
    // Align/snap to nearest 60deg milestone
    const snapped = Math.round(rotation / 60) * 60;
    setRotation(snapped);
  };

  // Mouse drag listeners
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const onMouseUpOrLeave = () => {
    handleEnd();
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  // Turn left / right
  const spinLeft = () => {
    setRotation(prev => Math.round(prev / 60) * 60 + 60);
  };

  const spinRight = () => {
    setRotation(prev => Math.round(prev / 60) * 60 - 60);
  };



  if (!isOpen) return null;

  const currentChapter = chapters[activeIdx];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col justify-between overflow-x-hidden animate-fade-in select-none">
      
      {/* Dynamic atmospheric color glow overlay based on selected chapter of the five elements */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-20 -z-10 blur-[130px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentChapter.color} 0%, transparent 60%)`
        }}
      />

      {/* Header */}
      <header className="w-full py-3.5 px-8 flex justify-between items-center border-b border-white/5 bg-[#070A13]/40 backdrop-blur-md shrink-0">
        <div>
          <span className="text-[10px] text-[#F472B6] font-mono tracking-widest block mb-0.5 font-semibold uppercase">
            IMMERSIVE EXHIBITION SCROLL
          </span>
          <h4 className="text-lg md:text-xl font-bold font-serif tracking-wider text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            昆仑谣之五音疗愈 • 3D 概念长卷
          </h4>
        </div>
        <button 
          onClick={onClose}
          className="w-9 h-9 rounded-full glassmorphism flex items-center justify-center text-slate-300 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 3D Stage area (Tighter spacing) */}
      <main className="flex-grow flex flex-col items-center justify-center relative touch-none py-1.5 md:py-3 select-none">
        <p className="text-[10px] text-[#A78BFA] tracking-widest mb-2.5 font-mono uppercase bg-[#A78BFA]/10 px-3 py-0.5 rounded-full border border-[#A78BFA]/15">
          ← 左右拖拽或使用底部按钮旋转长卷观赏 →
        </p>

        {/* 3D viewport view container (Height compressed from 620px to 440px to pull details exceptionally close) */}
        <div 
          className="w-full max-w-6xl h-[230px] md:h-[430px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
          style={{ perspective: '1300px' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Cylinder Ring Container (Enlarged card dimensions) */}
          <div
            ref={ringRef}
            className="w-[310px] h-[174px] md:w-[630px] md:h-[354px] relative transition-transform duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            }}
          >
            {chapters.map((ch, idx) => {
              const angle = idx * 60;
              // Dim cards which are not currently in the front to increase clarity
              const isFront = activeIdx === idx;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-2xl overflow-hidden border transition-all duration-500 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group/card"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                    borderColor: isFront ? `${ch.color}50` : 'rgba(255, 255, 255, 0.08)',
                    opacity: isFront ? 1.0 : 0.28,
                    boxShadow: isFront ? `0 0 40px ${ch.color}35` : 'none',
                  }}
                >
                  <img
                    src={ch.image}
                    alt={ch.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none scale-100 duration-1000 group-hover/card:scale-105"
                  />
                  
                  {/* Subtle dark gradient bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                  {/* Left bottom count bubble */}
                  <div className="absolute bottom-3 left-3 bg-[#070A13]/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-slate-300 font-medium border border-white/5 uppercase select-none">
                    0{idx + 1} / {ch.tone}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Showcase controller cards (pushed tight and elegant) */}
      <footer className="w-full py-4 px-8 border-t border-white/5 bg-[#070A13]/70 backdrop-blur-lg flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-0.5 h-6">
            <span 
              className="text-xs font-mono font-medium tracking-widest uppercase transition-all"
              style={{ color: currentChapter.color }}
            >
              {currentChapter.label}
            </span>
            <span className="w-1 h-3 rounded bg-white/20" />
            <span className="text-[10px] font-mono text-slate-400 font-semibold px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
              {currentChapter.element}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-semibold px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
              {currentChapter.tone}
            </span>
          </div>
          <h5 className="text-base md:text-lg font-bold font-serif text-white tracking-wide">
            {currentChapter.title}
          </h5>
          <p className="text-slate-300 text-[11px] md:text-xs mt-1 md:mt-1.5 max-w-xl md:max-w-3xl leading-relaxed text-center md:text-left font-sans">
            {currentChapter.desc}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4 shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={spinLeft}
              className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={spinRight}
              className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer border border-white/10"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
