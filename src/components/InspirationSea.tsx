import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { inspirationBubbles } from '../data';
import { InspirationBubble } from '../types';

interface InspirationSeaProps {
  onOpenBubble: (bubble: InspirationBubble) => void;
}

interface MiniParticle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
}

export const InspirationSea: React.FC<InspirationSeaProps> = ({ onOpenBubble }) => {
  const [poppedIds, setPoppedIds] = useState<number[]>([]);
  const [shards, setShards] = useState<MiniParticle[]>([]);
  const [shardsCount, setShardsCount] = useState(0);

  // Trigger bubble explosion particles & crystal audio pop
  const provokeBurst = (e: React.MouseEvent, bubble: InspirationBubble) => {
    if (poppedIds.includes(bubble.id)) return;

    // 🔊 1. 采用 HTML5 Web Audio API 实时生成极具实体质感的“彭”弹破气泡音效
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        
        // --- 彭声多谐振合成器极其深度质感 ---
        // 1. 低频声波重击 (Sub-bass "Peng" impact fundamental)
        const oscBass = ctx.createOscillator();
        const gainBass = ctx.createGain();
        oscBass.type = 'sine';
        oscBass.frequency.setValueAtTime(260, ctx.currentTime);
        oscBass.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.18);
        
        gainBass.gain.setValueAtTime(0.42, ctx.currentTime);
        gainBass.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        
        oscBass.connect(gainBass);
        gainBass.connect(ctx.destination);
        
        // 2. 中频共鸣共形器 (Resonant wet water pop body)
        const oscMid = ctx.createOscillator();
        const gainMid = ctx.createGain();
        oscMid.type = 'triangle';
        oscMid.frequency.setValueAtTime(420, ctx.currentTime);
        oscMid.frequency.exponentialRampToValueAtTime(85, ctx.currentTime + 0.13);
        
        gainMid.gain.setValueAtTime(0.28, ctx.currentTime);
        gainMid.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        
        oscMid.connect(gainMid);
        gainMid.connect(ctx.destination);
        
        // 3. 高频薄膜爆裂瞬态 (Crisp snap and treble air pop transient)
        const oscSnap = ctx.createOscillator();
        const gainSnap = ctx.createGain();
        oscSnap.type = 'sine';
        oscSnap.frequency.setValueAtTime(1500, ctx.currentTime);
        oscSnap.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.035);
        
        gainSnap.gain.setValueAtTime(0.15, ctx.currentTime);
        gainSnap.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
        
        oscSnap.connect(gainSnap);
        gainSnap.connect(ctx.destination);
        
        // 启动各波形音轨
        oscBass.start();
        oscMid.start();
        oscSnap.start();
        
        oscBass.stop(ctx.currentTime + 0.25);
        oscMid.stop(ctx.currentTime + 0.20);
        oscSnap.stop(ctx.currentTime + 0.06);
      }
    } catch (err) {
      console.warn("Audio Context blocked by browser autoplay rules:", err);
    }

    // Get clicked coordinates relative to the screen viewport
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = ['#F472B6', '#FDA4AF', '#A78BFA', '#C084FC', '#60A5FA', '#E9D5FF', '#FFFFFF'];
    const count = 35; // Increased density for spectacular burst feel
    const newShards: MiniParticle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 160 + 50; // Dynamic thrust range
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      newShards.push({
        id: shardsCount + i,
        x: originX,
        y: originY,
        tx,
        ty,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 7 + 3.5, // slightly larger particles
      });
    }

    setShardsCount(prev => prev + count);
    setShards(prev => [...prev, ...newShards]);
    setPoppedIds(prev => [...prev, bubble.id]);

    // Lift open the corresponding insight drawer
    setTimeout(() => {
      onOpenBubble(bubble);
    }, 400);

    // Fade out particles after animation completes
    setTimeout(() => {
      setShards(prev => prev.filter(p => !newShards.some(x => x.id === p.id)));
    }, 1200);
  };

  const reinitializeBubbles = () => {
    setPoppedIds([]);
  };

  return (
    <div className="relative h-[480px] w-full flex items-center justify-center border border-white/5 rounded-3xl glassmorphism bg-white/[0.015] overflow-hidden select-none">
      
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#A78BFA]/5 to-transparent opacity-40 pointer-events-none" />

      {/* Floating Crystals */}
      {inspirationBubbles.map((bubble, idx) => {
        const isPopped = poppedIds.includes(bubble.id);

        // Customize drifting offsets dynamically based on bubble index
        const animationDelay = `${idx * 1.2}s`;
        const duration = `${7 + idx * 1.6}s`;

        // Map index to different irregular 2D path classes to avoid synchronized movement
        const floatClasses = ['animate-float-a', 'animate-float-b', 'animate-float-c'];
        const floatClass = floatClasses[idx % floatClasses.length];

        return (
          <button
            key={bubble.id}
            onClick={(e) => provokeBurst(e, bubble)}
            style={{
              top: bubble.top,
              left: bubble.left,
              animationDelay,
              animationDuration: duration,
            }}
            className={`bubble-btn absolute w-28 h-28 md:w-36 md:h-36 rounded-full crystal-bubble flex flex-col justify-center items-center cursor-pointer text-center p-4 transition-all duration-500 hover:scale-115 active:scale-95 ${floatClass} ${
              isPopped 
                ? 'scale-0 opacity-0 pointer-events-none rotate-45' 
                : 'scale-100 opacity-100'
            }`}
          >
            {/* Gloss Highlight Inside Spheres */}
            <div className="absolute top-1.5 left-5 w-7 h-3.5 bg-white/20 rounded-full blur-[1px] rotate-[-12deg]" />

            <span className="text-2xl md:text-3xl mb-1.5 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-pulse">
              {bubble.icon}
            </span>
            <span className="text-[11px] md:text-xs font-semibold tracking-wider text-slate-100 leading-snug drop-shadow-sm font-sans px-1">
              {bubble.title.replace(/^[^：:]*[：:]/, '')}
            </span>
          </button>
        );
      })}

      {/* Explosive Physics Shards Renderer */}
      {shards.map((p) => (
        <div
          key={p.id}
          className="fixed rounded-full pointer-events-none z-50 shadow-[0_0_12px_currentColor]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            color: p.color,
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: 'translate(-50%, -50%) scale(1.8)',
            opacity: 1,
            transition: 'transform 0.85s cubic-bezier(0.1, 0.8, 0.25, 1), opacity 0.85s cubic-bezier(0.1, 0.8, 0.25, 1)',
          }}
          ref={(el) => {
            if (!el) return;
            // Force browser layout repaint to anchor transform transition starting from center
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (el) {
                  el.style.transform = `translate(calc(-50% + ${p.tx}px), calc(-50% + ${p.ty}px)) scale(0.08)`;
                  el.style.opacity = '0';
                }
              });
            });
          }}
        />
      ))}

      {/* Reset trigger */}
      {poppedIds.length === inspirationBubbles.length && (
        <button
          onClick={reinitializeBubbles}
          className="px-6 py-3 rounded-full glassmorphism text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-500 scale-100 opacity-100 flex items-center gap-2 cursor-pointer shadow-lg tracking-wider text-xs uppercase animate-fade-in"
        >
          <RefreshCw className="w-4 h-4 text-[#A78BFA]" />
          <span>✨ 重新聚集虚空中的灵感晶粒</span>
        </button>
      )}

      {/* Simple instructions for unpopped bubbles */}
      {poppedIds.length === 0 && (
        <div className="absolute bottom-4 text-center pointer-events-none opacity-40 text-[10px] font-mono tracking-widest text-slate-400">
          TOUCH THE SPECTRUM DEW DROPS TO UNVEIL INSIGHTS
        </div>
      )}
    </div>
  );
};
