import { useEffect, useRef } from "react";
import styles from "./Confetti.module.css";

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const retina = window.devicePixelRatio || 1;
    const PI = Math.PI;
    const sqrt = Math.sqrt;

    const random = Math.random;
    const cos = Math.cos;
    const sin = Math.sin;
    const rAF = window.requestAnimationFrame;
    const cAF = window.cancelAnimationFrame;

    function Vector2(this: any, _x: number, _y: number) {
      this.x = _x; this.y = _y;
      this.Length = function () { return sqrt(this.SqrLength()); };
      this.SqrLength = function () { return this.x * this.x + this.y * this.y; };
      this.Add = function (_vec: any) { this.x += _vec.x; this.y += _vec.y; };
      this.Sub = function (_vec: any) { this.x -= _vec.x; this.y -= _vec.y; };
      this.Div = function (_f: number) { this.x /= _f; this.y /= _f; };
      this.Mul = function (_f: number) { this.x *= _f; this.y *= _f; };
      this.Normalize = function () {
        const sqrLen = this.SqrLength();
        if (sqrLen !== 0) {
          const factor = 1.0 / sqrt(sqrLen);
          this.x *= factor; this.y *= factor;
        }
      };
      this.Normalized = function () {
        const sqrLen = this.SqrLength();
        if (sqrLen !== 0) {
          const factor = 1.0 / sqrt(sqrLen);
          return new (Vector2 as any)(this.x * factor, this.y * factor);
        }
        return new (Vector2 as any)(0, 0);
      };
    }
    (Vector2 as any).Sub = function(_vec0: any, _vec1: any) {
      return new (Vector2 as any)(_vec0.x - _vec1.x, _vec0.y - _vec1.y);
    };

    function EulerMass(this: any, _x: number, _y: number, _mass: number, _drag: number) {
      this.position = new (Vector2 as any)(_x, _y);
      this.mass = _mass;
      this.drag = _drag;
      this.force = new (Vector2 as any)(0, 0);
      this.velocity = new (Vector2 as any)(0, 0);
      this.AddForce = function(_f: any) {
        this.force.Add(_f);
      };
      this.Integrate = function(_dt: number) {
        const acc = this.CurrentForce(this.position);
        acc.Div(this.mass);
        const posDelta = new (Vector2 as any)(this.velocity.x, this.velocity.y);
        posDelta.Mul(_dt);
        this.position.Add(posDelta);
        acc.Mul(_dt);
        this.velocity.Add(acc);
        this.force = new (Vector2 as any)(0, 0);
      };
      this.CurrentForce = function(_pos: any, _vel?: any) {
        const totalForce = new (Vector2 as any)(this.force.x, this.force.y);
        const speed = this.velocity.Length();
        const dragVel = new (Vector2 as any)(this.velocity.x, this.velocity.y);
        dragVel.Mul(this.drag * this.mass * speed);
        totalForce.Sub(dragVel);
        return totalForce;
      };
    }

    function ConfettiPaper(this: any, _x: number, _y: number) {
      this.pos = new (Vector2 as any)(_x, _y);
      this.rotationSpeed = (random() * 600 + 800);
      this.angle = (PI / 180) * random() * 360;
      this.rotation = (PI / 180) * random() * 360;
      this.cosA = 1.0;
      this.size = 5.0;
      this.oscillationSpeed = (random() * 1.5 + 0.5);
      this.xSpeed = 40.0;
      this.ySpeed = (random() * 60 + 50.0);
      this.corners = new Array();
      this.time = random();
      const ci = Math.floor(random() * ribbonColors.length);
      this.frontColor = ribbonColors[ci];
      this.backColor = ribbonColors[ci];
      for (let i = 0; i < 4; i++) {
        const dx = cos(this.angle + (PI / 180) * (i * 90 + 45));
        const dy = sin(this.angle + (PI / 180) * (i * 90 + 45));
        this.corners[i] = new (Vector2 as any)(dx, dy);
      }
      this.Update = function(_dt: number) {
        this.time += _dt;
        this.rotation += this.rotationSpeed * _dt;
        this.cosA = cos((PI / 180) * this.rotation);
        this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
        this.pos.y += this.ySpeed * _dt;
        if (this.pos.y > (ConfettiPaper as any).bounds.y) {
          this.pos.x = random() * (ConfettiPaper as any).bounds.x;
          this.pos.y = 0;
        }
      };
      this.Draw = function(_g: any) {
        _g.save();
        if (this.cosA > 0) {
          _g.fillStyle = this.frontColor;
        } else {
          _g.fillStyle = this.backColor;
        }
        _g.beginPath();
        _g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
        for (let i = 1; i < 4; i++) {
          _g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
        }
        _g.closePath();
        _g.fill();
        _g.restore();
      };
    }
    (ConfettiPaper as any).bounds = new (Vector2 as any)(0, 0);

    function ConfettiRibbon(this: any, _x: number, _y: number, _count: number, _dist: number, _thickness: number, _angle: number, _mass: number, _drag: number) {
      this.particleDist = _dist;
      this.particleCount = _count;
      this.particleMass = _mass;
      this.particleDrag = _drag;
      this.particles = new Array();
      this.color = ribbonColors[Math.floor(random() * ribbonColors.length)];
      this.xOff = (cos((PI / 180) * _angle) * _thickness);
      this.yOff = (sin((PI / 180) * _angle) * _thickness);
      this.position = new (Vector2 as any)(_x, _y);
      this.prevPosition = new (Vector2 as any)(_x, _y);
      this.velocityInherit = (random() * 2 + 4);
      this.time = random() * 100;
      this.oscillationSpeed = (random() * 2 + 2);
      this.oscillationDistance = (random() * 40 + 40);
      this.ySpeed = (random() * 40 + 80);
      for (let i = 0; i < this.particleCount; i++) {
        this.particles[i] = new (EulerMass as any)(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
      }
      this.Update = function(_dt: number) {
        let i = 0;
        this.time += _dt * this.oscillationSpeed;
        this.position.y += this.ySpeed * _dt;
        this.position.x += cos(this.time) * this.oscillationDistance * _dt;
        this.particles[0].position = this.position;
        const dX = this.prevPosition.x - this.position.x;
        const dY = this.prevPosition.y - this.position.y;
        const delta = sqrt(dX * dX + dY * dY);
        this.prevPosition = new (Vector2 as any)(this.position.x, this.position.y);
        for (i = 1; i < this.particleCount; i++) {
          const dirP = (Vector2 as any).Sub(this.particles[i - 1].position, this.particles[i].position);
          dirP.Normalize();
          dirP.Mul((delta / _dt) * this.velocityInherit);
          this.particles[i].AddForce(dirP);
        }
        for (i = 1; i < this.particleCount; i++) {
          this.particles[i].Integrate(_dt);
        }
        for (i = 1; i < this.particleCount; i++) {
          const rp2 = new (Vector2 as any)(this.particles[i].position.x, this.particles[i].position.y);
          rp2.Sub(this.particles[i - 1].position);
          rp2.Normalize();
          rp2.Mul(this.particleDist);
          rp2.Add(this.particles[i - 1].position);
          this.particles[i].position = rp2;
        }
        if (this.position.y > (ConfettiRibbon as any).bounds.y + this.particleDist * this.particleCount) {
          this.Reset();
        }
      };
      this.Reset = function() {
        this.position.y = -random() * (ConfettiRibbon as any).bounds.y;
        this.position.x = random() * (ConfettiRibbon as any).bounds.x;
        this.prevPosition = new (Vector2 as any)(this.position.x, this.position.y);
        this.velocityInherit = random() * 2 + 4;
        this.time = random() * 100;
        this.oscillationSpeed = random() * 2.0 + 1.5;
        this.oscillationDistance = (random() * 40 + 40);
        this.ySpeed = random() * 40 + 80;
        this.color = ribbonColors[Math.floor(random() * ribbonColors.length)];
        this.particles = new Array();
        for (let i = 0; i < this.particleCount; i++) {
          this.particles[i] = new (EulerMass as any)(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
        }
      };
      this.Draw = function(_g: any) {
        for (let i = 0; i < this.particleCount - 1; i++) {
          const p0 = new (Vector2 as any)(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
          const p1 = new (Vector2 as any)(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
          _g.fillStyle = this.color;
          _g.strokeStyle = this.color;
          if (i === 0) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
            _g.beginPath();
            _g.moveTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else if (i === this.particleCount - 2) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
            _g.beginPath();
            _g.moveTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
          } else {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            _g.lineTo(p1.x * retina, p1.y * retina);
            _g.lineTo(p0.x * retina, p0.y * retina);
            _g.closePath();
            _g.stroke();
            _g.fill();
          }
        }
      };
      this.Side = function(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
      };
    }
    (ConfettiRibbon as any).bounds = new (Vector2 as any)(0, 0);

    const speed = 50;
    const duration = (1.0 / speed);
    const confettiRibbonCount = 7;
    const ribbonPaperCount = 28;  
    const ribbonPaperDist = 8.0;
    const ribbonPaperThick = 8.0;
    const confettiPaperCount = 95;
    // const ribbonGradients = [
    //   ["rgba(90, 139, 150, 0.0)", "rgba(226, 187, 105, 1)", "rgba(90, 139, 150, 0.7)"]
    // ];
    // const colors = [
    //   ["#df0049", "#660671"],
    //   ["#00e857", "#005291"],
    //   ["#2bebbc", "#05798a"],
    //   ["#ffd200", "#b06c00"]
    // ];
    const ribbonColors = [
      "rgba(90, 139, 150, 1)",
      "rgba(154, 162, 129, 1)",
      "rgba(226, 187, 105, 1)"
    ];

    let animationId: number;
    let confettiRibbons: any[] = [];
    let confettiPapers: any[] = [];
    let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null;

    function resize() {
      if (!canvasRef.current) return;
      canvas = canvasRef.current;
      const parent = canvas.parentNode as HTMLElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      canvas.width = width * retina;
      canvas.height = height * retina;
      context = canvas.getContext('2d');
      (ConfettiPaper as any).bounds = new (Vector2 as any)(width, height);
      (ConfettiRibbon as any).bounds = new (Vector2 as any)(width, height);
    }

    function start() {
      stop();
      update();
    }

    function stop() {
      if (animationId) cAF(animationId);
    }

    function update() {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < confettiPaperCount; i++) {
        confettiPapers[i].Update(duration);
        confettiPapers[i].Draw(context);
      }
      for (let i = 0; i < confettiRibbonCount; i++) {
        confettiRibbons[i].Update(duration);
        confettiRibbons[i].Draw(context);
      }
      animationId = rAF(update);
    }

    resize();
    confettiRibbons = [];
    for (let i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons[i] = new (ConfettiRibbon as any)(
        random() * (canvasRef.current?.parentNode ? (canvasRef.current.parentNode as HTMLElement).offsetWidth : 0),
        -random() * (canvasRef.current?.parentNode ? (canvasRef.current.parentNode as HTMLElement).offsetHeight : 0) * 2,
        ribbonPaperCount,
        ribbonPaperDist,
        ribbonPaperThick,
        45,
        1,
        0.05
      );
    }
    confettiPapers = [];
    for (let i = 0; i < confettiPaperCount; i++) {
      confettiPapers[i] = new (ConfettiPaper as any)(
        random() * (canvasRef.current?.parentNode ? (canvasRef.current.parentNode as HTMLElement).offsetWidth : 0),
        random() * (canvasRef.current?.parentNode ? (canvasRef.current.parentNode as HTMLElement).offsetHeight : 0)
      );
    }
    start();
    window.addEventListener('resize', resize);
    return () => {
      stop();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.confetti} />;
};

export default Confetti; 