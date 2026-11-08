import React, { useEffect, useRef } from 'react';

export interface SparkBurstEventDetail {
  x?: number;
  y?: number;
  count?: number;
  grand?: boolean;
}

export const triggerSparkBurst = (detail: SparkBurstEventDetail = {}) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<SparkBurstEventDetail>('diwali-spark-burst', { detail }));
  }
};

interface AmbientSparkleCanvasProps {
  litCount: number;
  sparklerCursorEnabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
  isBurst: boolean;
}

const SPARK_COLORS = ['#FFF3B0', '#FFB703', '#FFD166', '#FB8500', '#E63946', '#4CC9F0'];

export const AmbientSparkleCanvas: React.FC<AmbientSparkleCanvasProps> = ({
  litCount,
  sparklerCursorEnabled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const litCountRef = useRef(litCount);
  const cursorEnabledRef = useRef(sparklerCursorEnabled);

  useEffect(() => {
    litCountRef.current = litCount;
  }, [litCount]);

  useEffect(() => {
    cursorEnabledRef.current = sparklerCursorEnabled;
  }, [sparklerCursorEnabled]);

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

    const particles: Particle[] = [];

    // Seed gentle ambient floating embers
    const createAmbientParticle = (randomY = false): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 10,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.25 + Math.random() * 0.65),
      radius: 0.9 + Math.random() * 1.9,
      alpha: 0.2 + Math.random() * 0.55,
      decay: 0.0008 + Math.random() * 0.0012,
      color: SPARK_COLORS[Math.floor(Math.random() * 4)],
      isBurst: false,
    });

    for (let i = 0; i < 42; i++) {
      particles.push(createAmbientParticle(true));
    }

    // Spawn a radial phuljhari sparkler burst
    const spawnBurst = (bx: number, by: number, count = 38) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 1.4 + Math.random() * 5.2;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          radius: 1.2 + Math.random() * 2.2,
          alpha: 0.95,
          decay: 0.014 + Math.random() * 0.018,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          isBurst: true,
        });
      }
    };

    const handleCustomBurst = (e: Event) => {
      const custom = e as CustomEvent<SparkBurstEventDetail>;
      const detail = custom.detail || {};
      if (detail.grand) {
        // Multi-point celebration burst across the upper courtyard
        const points = [
          { x: width * 0.25, y: height * 0.32 },
          { x: width * 0.5, y: height * 0.24 },
          { x: width * 0.75, y: height * 0.32 },
          { x: width * 0.38, y: height * 0.45 },
          { x: width * 0.62, y: height * 0.45 },
        ];
        points.forEach((pt, idx) => {
          setTimeout(() => {
            spawnBurst(pt.x, pt.y, 44);
          }, idx * 130);
        });
      } else {
        const bx = detail.x ?? width / 2;
        const by = detail.y ?? height * 0.42;
        spawnBurst(bx, by, detail.count ?? 34);
      }
    };

    let lastMouseSpawn = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorEnabledRef.current) return;
      const now = performance.now();
      if (now - lastMouseSpawn < 24) return;
      lastMouseSpawn = now;

      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.2;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 1.6,
          alpha: 0.85,
          decay: 0.025 + Math.random() * 0.02,
          color: SPARK_COLORS[Math.floor(Math.random() * 4)],
          isBurst: true,
        });
      }
    };

    window.addEventListener('diwali-spark-burst', handleCustomBurst);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetAmbientCount = 26 + litCountRef.current * 5;
      let ambientCount = 0;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p.isBurst) ambientCount++;

        p.x += p.vx;
        p.y += p.vy;

        if (p.isBurst) {
          p.vy += 0.065; // subtle gravity on phuljhari sparks
          p.vx *= 0.985;
        } else {
          p.x += Math.sin(p.y * 0.015) * 0.15;
        }

        p.alpha -= p.decay;

        if (p.alpha <= 0.02 || p.y < -20 || p.y > height + 30) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isBurst ? 8 : 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      while (ambientCount < targetAmbientCount) {
        particles.push(createAmbientParticle(false));
        ambientCount++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('diwali-spark-burst', handleCustomBurst);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
};
