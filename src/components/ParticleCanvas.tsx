import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Particle Palette for Light Canvas
    const colors = [
      '#7c3aed', // violet
      '#8b5cf6', // purple
      '#db2777', // pink/magenta
      '#4f46e5', // indigo
      '#d97706', // amber
      '#059669', // emerald
      '#0284c7'  // sky blue
    ];

    // Initialize 65 particle nodes
    const particleCount = window.innerWidth < 768 ? 32 : 68;
    const particles: Particle[] = [];

    const centerX = width * 0.65;
    const centerY = height * 0.42;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = 80 + Math.random() * (Math.min(width, height) * 0.45);
      const x = centerX + Math.cos(angle) * orbitRadius + (Math.random() - 0.5) * 100;
      const y = centerY + Math.sin(angle) * (orbitRadius * 0.6) + (Math.random() - 0.5) * 100;

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        targetAlpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        angle,
        orbitRadius,
        orbitSpeed: (0.0006 + Math.random() * 0.0012) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentCenterX = (width * 0.62) + mouseRef.current.x * 0.4;
      const currentCenterY = (height * 0.42) + mouseRef.current.y * 0.4;

      // Draw subtle orbital guide paths
      ctx.save();
      ctx.lineWidth = 1;
      const orbits = [180, 290, 420];
      orbits.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.ellipse(
          currentCenterX,
          currentCenterY,
          radius,
          radius * 0.52,
          -0.25,
          0,
          Math.PI * 2
        );
        const strokeColor = idx === 0 
          ? 'rgba(168, 85, 247, 0.07)' 
          : idx === 1 
          ? 'rgba(236, 72, 153, 0.05)' 
          : 'rgba(245, 158, 11, 0.04)';
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      });
      ctx.restore();

      // Render and update each particle
      particles.forEach((p, idx) => {
        // Orbit update
        p.angle += p.orbitSpeed;
        const targetX = currentCenterX + Math.cos(p.angle) * p.orbitRadius + (mouseRef.current.x * (idx % 3 + 1) * 0.2);
        const targetY = currentCenterY + Math.sin(p.angle) * (p.orbitRadius * 0.52) + (mouseRef.current.y * (idx % 3 + 1) * 0.2);

        p.x += (targetX - p.x) * 0.03;
        p.y += (targetY - p.y) * 0.03;

        // Twinkle
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle light paths
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.save();
            const connAlpha = (1 - dist / 90) * 0.15 * p.alpha;
            ctx.globalAlpha = connAlpha;
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
