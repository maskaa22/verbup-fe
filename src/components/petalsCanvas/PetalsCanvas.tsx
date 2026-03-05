import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: number;
};

const PETAL_COUNT = 15;

const PetalsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petals = useRef<Petal[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // створення пелюсток
    petals.current = Array.from({ length: PETAL_COUNT }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 10,
      speedY: 0.1 + Math.random() * 1,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * Math.PI,
      rotationSpeed: Math.random() * 0.02 - 0.01,
      type: Math.floor(Math.random() * 3),
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();

      const w = p.size;
      const h = p.size * 1.6;

      // форма реалістичної пелюстки (крапля + вигин)
      ctx.moveTo(0, -h / 2);

      ctx.bezierCurveTo(w, -h / 2, w, h / 3, 0, h / 2);

      ctx.bezierCurveTo(-w, h / 3, -w, -h / 2, 0, -h / 2);

      // м'який градієнт
      const gradient = ctx.createRadialGradient(0, 0, w * 0.2, 0, 0, h);

      gradient.addColorStop(0, "rgba(255, 220, 230, 1)");
      gradient.addColorStop(1, "rgba(255, 160, 190, 0.9)");

      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.current.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
    p.rotation += p.rotationSpeed;

    drawPetal(p);
  });

  // 🔥 Видаляємо ті що вилетіли
  petals.current = petals.current.filter(
    (p) => p.y < canvas.height + 40
  );

  // 🔥 Рідке створення нової пелюстки
  if (Math.random() < 0.02) {
    const fastFly = Math.random() < 0.3; // 30% швидкі

    petals.current.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: 4 + Math.random() * 10,
      speedY: fastFly
        ? 2 + Math.random() * 2
        : 0.3 + Math.random() * 0.8,
      speedX: fastFly
        ? Math.random() * 2 - 1
        : Math.random() * 0.5 - 0.25,
      rotation: Math.random() * Math.PI,
      rotationSpeed: Math.random() * 0.03 - 0.015,
      type: Math.floor(Math.random() * 3),
    });
  }

  requestAnimationFrame(update);
};

    update();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default PetalsCanvas;
