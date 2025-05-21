
import React, { useEffect, useRef } from 'react';

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circle properties
    const circles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];
    const totalCircles = 15;
    const baseRadius = Math.min(canvas.width, canvas.height) / 30;

    // Initialize circles
    for (let i = 0; i < totalCircles; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: baseRadius * (0.2 + Math.random() * 0.8),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: 0.1 + Math.random() * 0.2
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw circles
      circles.forEach(circle => {
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Bounce off walls
        if (circle.x < 0 || circle.x > canvas.width) circle.vx = -circle.vx;
        if (circle.y < 0 || circle.y > canvas.height) circle.vy = -circle.vy;

        // Draw circle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        gradient.addColorStop(0, `rgba(155, 135, 245, ${circle.alpha})`);
        gradient.addColorStop(1, `rgba(155, 135, 245, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-70"
    />
  );
};

export default BackgroundEffect;
