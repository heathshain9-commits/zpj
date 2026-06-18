import React, { useState, useRef, MouseEvent } from 'react';
import { Sparkles, Eye, Music } from 'lucide-react';

export const ProjectCardKunlun: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rX: 0, rY: 0, gX: 50, gY: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    // 数值微调：倾斜范围控制在 -10 到 +10 度，实现柔和高贵的 3D Tilt 视差
    const rY = (px - 0.5) * 20; 
    const rX = -(py - 0.5) * 20; 

    setCoords({
      rX,
      rY,
      gX: px * 100,
      gY: py * 100,
      opacity: 0.28, // 柔和温润的幻彩反光亮度
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rX: 0, rY: 0, gX: 50, gY: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      style={{
        transform: `perspective(1200px) rotateX(${coords.rX}deg) rotateY(${coords.rY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: coords.opacity === 0 ? 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      className="glassmorphism rounded-3xl p-10 md:p-14 relative overflow-hidden h-[510px] md:h-[560px] flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:shadow-[0_30px_70px_rgba(167,139,250,0.25)] hover:scale-[1.01]"
    >
      {/* 🔮 动态幻彩（Iridescent）高光折射层，随着鼠标指针坐标（gX / gY）进行物理镜面折射模拟 */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${coords.gX}% ${coords.gY}%, 
            rgba(255, 255, 255, 0.35) 0%, 
            rgba(244, 114, 182, 0.22) 20%, 
            rgba(167, 139, 250, 0.14) 45%, 
            rgba(96, 165, 250, 0.08) 70%, 
            transparent 90%)`,
          opacity: coords.opacity,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-widest text-[#F472B6] border border-[#F472B6]/30 px-3 py-0.5 rounded-full uppercase bg-[#F472B6]/5 font-semibold">
            Featured Project
          </span>
          <span className="text-xs text-[#A78BFA] font-mono flex items-center gap-1.5 font-medium">
            <Music className="w-3.5 h-3.5" /> GENERATIVE MEDIA ART
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4.5xl lg:text-5xl font-black font-sans mt-8 text-white group-hover:text-glow transition-all duration-300 tracking-wide leading-tight">
          昆仑谣之五音疗愈
        </h3>
        
        <p className="text-slate-200 text-xs md:text-sm lg:text-[15px] mt-6 leading-relaxed font-sans font-medium max-w-4xl">
          《昆仑谣之五音疗愈》将东方传统民族医学“宫商角徵羽”五行声动力理论与尖端新媒体交互算法深度重组。本项目运用自研流微粒振荡组件，实时采集声音气流并解析傅里叶波，生成万千虚实互补的水墨微粒星芒，探寻技术世界里温柔而带有体温的康复治愈数字场域。
        </p>
      </div>

      <div className="relative z-10">
        <div className="mb-6 flex items-center space-x-3 text-base md:text-lg font-extrabold tracking-wider uppercase font-mono animate-pulse drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]">
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F472B6] opacity-90"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F472B6] shadow-[0_0_15px_#F472B6]"></span>
          </span>
          <span className="bg-gradient-to-r from-[#F472B6] via-[#FDA4AF] to-[#E9D5FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,114,182,0.5)]">
            点击巡礼：3D 沉浸式五音长卷空间 ✨
          </span>
        </div>

        <div className="flex justify-between items-center pt-5 border-t border-white/5">
          <span className="text-[11px] text-slate-500 font-mono tracking-wide">2026 / 声音可视化互动艺术</span>
          <div className="w-11 h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300">
            <Eye className="w-5 h-5 text-slate-300 group-hover:scale-105 group-hover:text-white transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

