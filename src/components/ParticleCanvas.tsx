import React, { useEffect, useRef } from 'react';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      originX: number;
      originY: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      elasticity: number; // 弹性系数，粒子返回原点位置的敏捷度
    }> = [];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      active: false,
    };

    // ==========================================
    // 💡 粒子动力学控制台 - 以下参数可自由调整
    // ==========================================
    const config = {
      baseSpeed: 0.12,          // 【自主漂浮速率】数值越高，粒子在背景中的流动速度越快
      repulsionRadius: 130,     // 【鼠标排斥影响半径】鼠标经过该像素直径内开始产生推开动作
      repulsionStrength: 5.5,   // 【排斥力强度系数】决定粒子在鼠标推动下产生的位移速度
      growthSpeed: 0.015,       // 【缩放敏捷系数】
      
      // 【彩虹/霓虹色域】柔和霓虹/幻彩光晕（粉、蓝、浅紫、珍珠白）
      colors: [
        'rgba(244, 114, 182, 0.55)', // 幻彩霓虹粉
        'rgba(167, 139, 250, 0.55)', // 薰衣草淡紫
        'rgba(96, 165, 250, 0.55)',  // 空灵极光蓝
        'rgba(255, 255, 255, 0.65)'  // 珍珠母贝白
      ]
    };

    let isFirstLoad = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(isFirstLoad);
      isFirstLoad = false; // 首次初始化完成后重置标记，避免窗口大小调整时重新触发居中扩散
    };

    const initParticles = (firstLoad = false) => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      
      // 【粒子总数调节】高阶渲染优化设计：
      // - 电脑客户端桌面展现 1800 个微粒，保证极致密度的梦幻感
      // - 移动端折中生成 500 个，确保丝滑 60 帧高性能流畅体验
      const count = isMobile ? 500 : 1800; 

      // 获取当前屏幕的几何中心点
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < count; i++) {
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * canvas.height;
        
        // 【首发优雅入场设计】: 
        // 首次载入时，所有粒子物理位置(x, y) 诞生于屏幕正核心 (centerX, centerY)，
        // 而归宿锚点设为全屏随机坐标原点。这会激发内置弹簧动力学，使全域碎光如星辰爆裂般由内而外渐进扩散。
        particles.push({
          x: firstLoad ? centerX : targetX,
          y: firstLoad ? centerY : targetY,
          originX: targetX,
          originY: targetY,
          size: Math.random() * 2.0 + 0.4, // 微小粒子，突出精致感
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          vx: (Math.random() - 0.5) * config.baseSpeed,
          vy: (Math.random() - 0.5) * config.baseSpeed,
          elasticity: Math.random() * 0.015 + 0.008, // 略微提升入场扩散的流线弹性，渲染出更具张力的律动
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    // 绘制循环
    const animate = () => {
      // 关键性能优化：透明度遮罩创造柔和的长尾拖曳流动轨迹，避免渲染死板
      ctx.fillStyle = 'rgba(7, 10, 19, 0.22)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. 基准背景漫步浮动
        p.originX += p.vx;
        p.originY += p.vy;

        // 2. 屏幕边缘循环重连
        if (p.originX < 0) p.originX = canvas.width;
        if (p.originX > canvas.width) p.originX = 0;
        if (p.originY < 0) p.originY = canvas.height;
        if (p.originY > canvas.height) p.originY = 0;

        // 3. 优雅归位拉力（弹簧回正算法，创造水流缓缓聚拢效果）
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.x += dx * p.elasticity;
        p.y += dy * p.elasticity;

        // 4. 鼠标经过涟漪互动推动力
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < config.repulsionRadius) {
            // 利用圆滑缓动插值，离鼠标越近受力越大
            const force = (config.repulsionRadius - dist) / config.repulsionRadius;
            const dirX = mdx / dist;
            const dirY = mdy / dist;

            // 轻缓温和地将粒子向外推开
            p.x -= dirX * force * config.repulsionStrength;
            p.y -= dirY * force * config.repulsionStrength;
          }
        }

        // 5. 极佳发光美学渲染
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particleCanvas"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};
