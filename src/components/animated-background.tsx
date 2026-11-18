/**
 * @file src/components/animated-background.tsx
 * @description A modern, theme-aware interactive constellation & aurora spotlight background.
 */
"use client";

import React, { useRef, useEffect } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      pulse: number;
    }

    const createNodes = (): Node[] => {
      const count = width <= 768 ? 28 : 52;
      const list: Node[] = [];
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.8 + 0.8,
          hue: Math.random() > 0.45 ? 168 : 252, // Emerald-Teal or Electric Indigo
          pulse: Math.random() * Math.PI * 2,
        });
      }
      return list;
    };

    let nodes = createNodes();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = createNodes();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // Draw subtle cursor radial aura
      if (mouse.x > 0 && mouse.y > 0) {
        const cursorGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          360
        );
        cursorGrad.addColorStop(
          0,
          isDark ? 'hsla(168, 88%, 48%, 0.08)' : 'hsla(170, 84%, 34%, 0.06)'
        );
        cursorGrad.addColorStop(
          0.5,
          isDark ? 'hsla(252, 88%, 68%, 0.04)' : 'hsla(252, 80%, 60%, 0.03)'
        );
        cursorGrad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Gentle cursor interaction
        const dxMouse = mouse.x - n.x;
        const dyMouse = mouse.y - n.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          n.x -= (dxMouse / distMouse) * force * 0.8;
          n.y -= (dyMouse / distMouse) * force * 0.8;
        }

        const alpha = (0.35 + Math.sin(n.pulse) * 0.2) * (isDark ? 1 : 0.7);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 88%, ${isDark ? 65 : 42}%, ${alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.14 : 0.09);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `hsla(${n.hue}, 80%, ${isDark ? 60 : 40}%, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect node to mouse cursor if close
        if (distMouse < mouse.radius) {
          const cursorLineAlpha = (1 - distMouse / mouse.radius) * (isDark ? 0.28 : 0.18);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `hsla(168, 90%, ${isDark ? 55 : 38}%, ${cursorLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle geometric grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70" />

      {/* Top & bottom ambient aurora glows */}
      <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[130px] animate-pulse-slow" />
      <div
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[130px] animate-pulse-slow"
        style={{ animationDelay: '3s' }}
      />
      <div className="absolute -bottom-40 left-1/3 h-[360px] w-[480px] rounded-full bg-teal-500/10 blur-[140px]" />

      {/* Interactive constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default AnimatedBackground;
