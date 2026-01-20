import { useEffect, useRef } from "react";
import styles from "./Confetti.module.css";

const ribbonColors = [
  "rgba(90, 139, 150, 1)",
  "rgba(154, 162, 129, 1)",
  "rgba(226, 187, 105, 1)",
];

/* =========================
   Math helpers
========================= */

const PI = Math.PI;
const random = Math.random;
const cos = Math.cos;
const sin = Math.sin;

/* =========================
   Vector
========================= */

class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(v: Vector2): void {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v: Vector2): void {
    this.x -= v.x;
    this.y -= v.y;
  }

  mul(f: number): void {
    this.x *= f;
    this.y *= f;
  }

  div(f: number): void {
    this.x /= f;
    this.y /= f;
  }

  normalize(): void {
    const len = this.length();
    if (len !== 0) {
      this.div(len);
    }
  }

  static sub(a: Vector2, b: Vector2): Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }
}

/* =========================
   Physics
========================= */

class EulerMass {
  position: Vector2;
  velocity: Vector2;
  force: Vector2;
  mass: number;
  drag: number;

  constructor(x: number, y: number, mass: number, drag: number) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.force = new Vector2(0, 0);
    this.mass = mass;
    this.drag = drag;
  }

  addForce(f: Vector2): void {
    this.force.add(f);
  }

  integrate(dt: number): void {
    const acc = new Vector2(this.force.x, this.force.y);
    acc.div(this.mass);

    const velDelta = new Vector2(this.velocity.x, this.velocity.y);
    velDelta.mul(dt);
    this.position.add(velDelta);

    acc.mul(dt);
    this.velocity.add(acc);

    this.force = new Vector2(0, 0);
  }
}

/* =========================
   Confetti Paper
========================= */

class ConfettiPaper {
  static bounds = new Vector2(0, 0);

  pos: Vector2;
  rotationSpeed = random() * 600 + 800;
  angle = random() * PI * 2;
  rotation = random() * PI * 2;
  cosA = 1;
  size = 5;
  oscillationSpeed = random() * 1.5 + 0.5;
  xSpeed = 40;
  ySpeed = random() * 60 + 50;
  time = random();
  corners: Vector2[] = [];
  frontColor: string;
  backColor: string;

  constructor(x: number, y: number, colors: string[]) {
    this.pos = new Vector2(x, y);
    const color = colors[Math.floor(random() * colors.length)];
    this.frontColor = color;
    this.backColor = color;

    for (let i = 0; i < 4; i++) {
      const a = this.angle + (PI / 2) * i;
      this.corners.push(new Vector2(cos(a), sin(a)));
    }
  }

  update(dt: number): void {
    this.time += dt;
    this.rotation += this.rotationSpeed * dt;
    this.cosA = cos(this.rotation);

    this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * dt;
    this.pos.y += this.ySpeed * dt;

    if (this.pos.y > ConfettiPaper.bounds.y) {
      this.pos.y = 0;
      this.pos.x = random() * ConfettiPaper.bounds.x;
    }
  }

  draw(ctx: CanvasRenderingContext2D, retina: number): void {
    ctx.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
    ctx.beginPath();

    this.corners.forEach((c, i) => {
      const x = (this.pos.x + c.x * this.size) * retina;
      const y = (this.pos.y + c.y * this.size * this.cosA) * retina;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.closePath();
    ctx.fill();
  }
}

/* =========================
   Confetti Ribbon
========================= */

class ConfettiRibbon {
  static bounds = new Vector2(0, 0);

  particleDist: number;
  particleCount: number;
  particleMass: number;
  particleDrag: number;

  particles: EulerMass[];
  position: Vector2;
  prevPosition: Vector2;

  xOff: number;
  yOff: number;
  color: string;

  velocityInherit: number;
  time: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  ySpeed: number;

  constructor(
    x: number,
    y: number,
    count: number,
    dist: number,
    thickness: number,
    angleDeg: number,
    mass: number,
    drag: number,
    colors: string[],
  ) {
    this.particleDist = dist;
    this.particleCount = count;
    this.particleMass = mass;
    this.particleDrag = drag;

    this.color = colors[Math.floor(random() * colors.length)];

    const angle = (PI / 180) * angleDeg;
    this.xOff = cos(angle) * thickness;
    this.yOff = sin(angle) * thickness;

    this.position = new Vector2(x, y);
    this.prevPosition = new Vector2(x, y);

    this.velocityInherit = random() * 2 + 4;
    this.time = random() * 100;
    this.oscillationSpeed = random() * 2 + 2;
    this.oscillationDistance = random() * 40 + 40;
    this.ySpeed = random() * 40 + 80;

    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(
        new EulerMass(x, y - i * this.particleDist, mass, drag),
      );
    }
  }

  update(dt: number): void {
    this.time += dt * this.oscillationSpeed;

    this.position.y += this.ySpeed * dt;
    this.position.x += cos(this.time) * this.oscillationDistance * dt;

    this.particles[0].position = this.position;

    const dx = this.prevPosition.x - this.position.x;
    const dy = this.prevPosition.y - this.position.y;
    const delta = Math.sqrt(dx * dx + dy * dy);

    this.prevPosition = new Vector2(this.position.x, this.position.y);

    for (let i = 1; i < this.particleCount; i++) {
      const dir = Vector2.sub(
        this.particles[i - 1].position,
        this.particles[i].position,
      );
      dir.normalize();
      dir.mul((delta / dt) * this.velocityInherit);
      this.particles[i].addForce(dir);
      this.particles[i].integrate(dt);

      // ⚠️ ВАЖЛИВО: збереження відстані (як у старому коді)
      const rp = Vector2.sub(
        this.particles[i].position,
        this.particles[i - 1].position,
      );
      rp.normalize();
      rp.mul(this.particleDist);
      rp.add(this.particles[i - 1].position);
      this.particles[i].position = rp;
    }

    if (
      this.position.y >
      ConfettiRibbon.bounds.y + this.particleDist * this.particleCount
    ) {
      this.reset();
    }
  }

  reset(): void {
    this.position.y = -random() * ConfettiRibbon.bounds.y;
    this.position.x = random() * ConfettiRibbon.bounds.x;
    this.prevPosition = new Vector2(this.position.x, this.position.y);

    this.velocityInherit = random() * 2 + 4;
    this.time = random() * 100;
    this.oscillationSpeed = random() * 1 + 1; // горизонтально повільніше
    this.oscillationDistance = random() * 20 + 20; // менші «крутилки»
    this.ySpeed = random() * 20 + 30; // вертикально повільніше

    this.color = ribbonColors[Math.floor(random() * ribbonColors.length)];

    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(
        new EulerMass(
          this.position.x,
          this.position.y - i * this.particleDist,
          this.particleMass,
          this.particleDrag,
        ),
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D, retina: number): void {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    for (let i = 0; i < this.particleCount - 1; i++) {
      const p = this.particles[i].position;
      const pNext = this.particles[i + 1].position;

      const p0 = new Vector2(p.x + this.xOff, p.y + this.yOff);
      const p1 = new Vector2(pNext.x + this.xOff, pNext.y + this.yOff);

      ctx.beginPath();

      ctx.moveTo(p.x * retina, p.y * retina);
      ctx.lineTo(pNext.x * retina, pNext.y * retina);
      ctx.lineTo(p1.x * retina, p1.y * retina);
      ctx.lineTo(p0.x * retina, p0.y * retina);

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
}

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const retina = window.devicePixelRatio || 1;

    const colors = [
      "rgba(90, 139, 150, 1)",
      "rgba(154, 162, 129, 1)",
      "rgba(226, 187, 105, 1)",
    ];

    let animationId: number | null = null;
    const papers: ConfettiPaper[] = [];
    const ribbons: ConfettiRibbon[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth * retina;
      canvas.height = parent.offsetHeight * retina;

      ConfettiPaper.bounds = new Vector2(
        parent.offsetWidth,
        parent.offsetHeight,
      );
      ConfettiRibbon.bounds = new Vector2(
        parent.offsetWidth,
        parent.offsetHeight,
      );
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      papers.forEach((p) => {
        p.update(1 / 60);
        p.draw(ctx, retina);
      });

      ribbons.forEach((r) => {
        r.update(1 / 60);
        r.draw(ctx, retina);
      });

      animationId = requestAnimationFrame(update);
    };

    resize();

    for (let i = 0; i < 90; i++) {
      papers.push(
        new ConfettiPaper(
          random() * ConfettiPaper.bounds.x,
          random() * ConfettiPaper.bounds.y,
          colors,
        ),
      );
    }

    for (let i = 0; i < 7; i++) {
      ribbons.push(
        new ConfettiRibbon(
          random() * ConfettiRibbon.bounds.x,
          -random() * ConfettiRibbon.bounds.y,
          28, // particle count
          8, // distance
          8, // thickness ← важливо
          45, // angle
          1,
          0.05,
          colors,
        ),
      );
    }

    update();
    window.addEventListener("resize", resize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.confetti} />;
};

export default Confetti;
