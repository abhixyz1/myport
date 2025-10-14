"use client";

import React, { useRef, useEffect } from 'react';

/**
 * AnimatedBackground component creates a dynamic, physics-based visual effect.
 * It adapts particle density and spawn rates based on the device to prioritize
 * either performance (desktop) or smoothness (mobile).
 * @returns {JSX.Element} A canvas element that fills the viewport.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Animation constants for framerate capping.
    let lastFrameTime = 0;
    const targetFPS = 27;
    const frameInterval = 1000 / targetFPS;

    // Simulation state variables.
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const isMobile = width <= 768;
    let maxParticles = isMobile ? 20 : 30; 
    let virtualPairSpawnRate = isMobile ? 0.15 : 0.25;

    const particlePool: Particle[] = [];
    const activeParticles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      charge: 1 | -1;
      color: string;
      auraRadius: number;
      auraPulse: number;
      auraMax: number;
      inUse: boolean = false;
      isVirtual: boolean;
      life: number = 1;

      constructor(isVirtual = false) {
        this.isVirtual = isVirtual;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.charge = 1;
        this.color = '';
        this.auraRadius = 0;
        this.auraPulse = 0;
        this.auraMax = 0;
        this.reset();
      }

      reset(x?: number, y?: number, charge?: 1 | -1) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.charge = charge ?? (Math.random() > 0.5 ? 1 : -1);
        this.radius = this.isVirtual ? 1.2 : Math.random() * 1.5 + 1;
        this.color = this.charge > 0 ? 'hsl(210, 100%, 75%)' : 'hsl(340, 100%, 75%)';
        this.auraMax = this.isVirtual ? 0 : this.radius + 8;
        this.auraPulse = Math.random() * Math.PI * 2;
        this.auraRadius = this.auraMax / 2;
        this.life = this.isVirtual ? Math.random() * 0.6 + 0.3 : 1;
        this.inUse = true;
        return this;
      }
      
      update(particles: Particle[]) {
        if (!this.isVirtual) {
          particles.forEach(other => {
            if (this === other || !other.inUse || other.isVirtual) return;
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 0 && distSq < 200 * 200) { // Added distSq > 0 check
              const force = (this.charge * other.charge) / Math.max(distSq, 1); // Prevent division by zero
              const angle = Math.atan2(dy, dx);
              this.vx -= Math.cos(angle) * force * 2.5;
              this.vy -= Math.sin(angle) * force * 2.5;
            }
          });
        }
        
        this.x += this.vx;
        this.y += this.vy;

        // Clamp position to canvas bounds
        this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));

        // Bounce off edges
        if (this.x <= this.radius || this.x >= width - this.radius) this.vx *= -1;
        if (this.y <= this.radius || this.y >= height - this.radius) this.vy *= -1;
        
        this.auraPulse += 0.03;
        this.auraRadius = this.auraMax * (0.6 + Math.sin(this.auraPulse) * 0.4);

        if (this.isVirtual) {
          this.life -= 0.01;
          if (this.life <= 0) this.inUse = false;
        }
      }

      draw() {
        if (!ctx) return;
        
        try {
          const auraAlpha = this.isVirtual ? this.life * 0.25 : 0.15;
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.auraRadius);
          gradient.addColorStop(0, `hsla(${this.charge > 0 ? 210 : 340}, 100%, 75%, ${auraAlpha})`);
          gradient.addColorStop(1, `hsla(0, 0%, 100%, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.auraRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          const coreAlpha = this.isVirtual ? this.life * 0.9 : 1;
          ctx.fillStyle = `hsla(${this.charge > 0 ? 210 : 340}, 100%, 80%, ${coreAlpha})`;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        } catch (error) {
          console.warn('Error drawing particle:', error);
        }
      }
    }

    const getParticle = (isVirtual = false) => {
        const available = particlePool.filter(p => !p.inUse && p.isVirtual === isVirtual);
        return available.length > 0 ? available[0].reset() : new Particle(isVirtual);
    }
    
    const init = () => {
      activeParticles.length = 0;
      particlePool.length = 0;
      for (let i = 0; i < maxParticles * 3; i++) {
         particlePool.push(new Particle(i >= maxParticles));
      }
      for (let i = 0; i < maxParticles; i++) {
        activeParticles.push(getParticle(false));
      }
    }

    const spawnVirtualPair = () => {
        if (activeParticles.filter(p => p.isVirtual).length > 40) return;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const p1 = getParticle(true).reset(x, y, 1);
        const p2 = getParticle(true).reset(x + Math.random()*10-5, y + Math.random()*10-5, -1);
        activeParticles.push(p1, p2);
    }

    const animate = (timestamp: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = timestamp - (elapsed % frameInterval);

      try {
        ctx.fillStyle = 'hsl(180, 50%, 98%)';
        ctx.fillRect(0, 0, width, height);
        
        if (Math.random() < virtualPairSpawnRate) {
            spawnVirtualPair();
        }

        // Draw "Photon Exchange" Lines
        for (let i = 0; i < activeParticles.length; i++) {
          for (let j = i + 1; j < activeParticles.length; j++) {
            const p1 = activeParticles[i];
            const p2 = activeParticles[j];
            if (!p1.inUse || !p2.inUse || p1.isVirtual || p2.isVirtual) continue;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150 && dist > 0) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 30;
              const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 30;
              ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
              ctx.strokeStyle = `hsla(50, 100%, 70%, ${0.9 - dist / 150})`;
              ctx.lineWidth = 2;
              ctx.shadowColor = 'hsl(50, 100%, 80%)';
              ctx.shadowBlur = 10;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        }

        // Update and Draw all active particles
        for (let i = activeParticles.length - 1; i >= 0; i--) {
          const p = activeParticles[i];
          if (p.inUse) {
              p.update(activeParticles);
              p.draw();
          } else {
              activeParticles.splice(i, 1);
          }
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newIsMobile = width <= 768;
      maxParticles = newIsMobile ? 20 : 30;
      virtualPairSpawnRate = newIsMobile ? 0.15 : 0.25;
      init();
    }
    
    window.addEventListener('resize', handleResize);
    
    init();
    animate(0);

    const cleanup = () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    
    return cleanup;
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default AnimatedBackground;