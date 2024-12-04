// a component that draws falling snow in a canvas
import { useEffect, useRef } from 'react';

export const Snow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth / 4;
        canvas.height = parent.offsetHeight / 4;
      }
    };

    setCanvasSize();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const flakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1,
      speed: Math.random() * 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((flake) => {
        flake.y += flake.speed;
        // only change every 10th frame
        if (Math.random() > 0.9) flake.x += Math.sin(flake.y / 10);
        if (flake.y > canvas.height) {
          flake.y = 0;
        }
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      draw();
    };

    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="snow-canvas" />;
};
