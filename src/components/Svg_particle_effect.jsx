import React, { useEffect, useRef } from "react";

export default function ParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const settings = {
      particleCount: 36000,
      particleColor: "#ED510C",
      speed: 9,
      hoverForce: 50,
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    let imageMask = null;
    let particles = [];
    let mouse = { x: null, y: null };
    let rafId = null;

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x + (Math.random() - 0.5) * 10;
        this.y = y + (Math.random() - 0.5) * 10;
        this.size = Math.random() * 1.6 + 0.4;
        this.age = 0;
        this.life = Math.floor(Math.random() * 200 + 100);
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.alpha = 0;
      }

      isInsideMask(x, y) {
        if (!imageMask) return false;
        const px = Math.floor(x);
        const py = Math.floor(y);
        if (px < 0 || py < 0 || px >= imageMask.width || py >= imageMask.height) return false;
        const index = (py * imageMask.width + px) * 4;
        return imageMask.data[index + 3] > 128;
      }

      respawn() {
        this.x = this.baseX + (Math.random() - 0.5) * 10;
        this.y = this.baseY + (Math.random() - 0.5) * 10;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.age = 0;
        this.life = Math.floor(Math.random() * 200 + 100);
      }

      update() {
        this.age += 1;
        this.vx += (Math.random() - 0.5) * 0.06;
        this.vy += (Math.random() - 0.5) * 0.06;
        this.x += this.vx * settings.speed * 0.6;
        this.y += this.vy * settings.speed * 0.6;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const radius = 100;
          if (dist < radius) {
            const force = (1 - dist / radius) * settings.hoverForce * 0.6;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }

        if (!this.isInsideMask(this.x, this.y)) {
          this.x += (this.baseX - this.x) * 0.12;
          this.y += (this.baseY - this.y) * 0.12;
        }

        const lifeRatio = Math.max(0, Math.min(1, this.age / this.life));
        if (lifeRatio < 0.15) this.alpha = lifeRatio / 0.15;
        else if (lifeRatio > 0.85) this.alpha = (1 - lifeRatio) / 0.15;
        else this.alpha = 1;

        if (this.age >= this.life) this.respawn();
      }

      draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = settings.particleColor;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function loadImage(path) {
      if (!path) return;
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try {
          imageMask = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (err) {
          console.warn("Unable to extract image data (CORS?)", err);
          imageMask = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        generateParticlesFromMask();
      };
      img.onerror = (e) => {
        console.warn("Failed to load image", e);
      };
      img.src = path;
    }

    function generateParticlesFromMask() {
      particles = [];
      if (!imageMask) return;
      const area = imageMask.width * imageMask.height;
      const target = Math.max(1, settings.particleCount);
      const step = Math.max(1, Math.floor(Math.sqrt(area / target)));

      for (let y = 0; y < imageMask.height; y += step) {
        for (let x = 0; x < imageMask.width; x += step) {
          const idx = (y * imageMask.width + x) * 4;
          if (imageMask.data[idx + 3] > 128) {
            particles.push(new Particle(x, y));
            if (particles.length >= settings.particleCount) break;
          }
        }
        if (particles.length >= settings.particleCount) break;
      }
    }

        function onMouseMove(e) {
          const rect = canvas.getBoundingClientRect();
          // Account for canvas CSS scaling
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          mouse.x = (e.clientX - rect.left) * scaleX;
          mouse.y = (e.clientY - rect.top) * scaleY;
        }
    function onMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }
    // window.addEventListener("mousemove", onMouseMove);
    // window.addEventListener("mouseleave", onMouseLeave);

    function onResize() {
      resizeCanvas();
      if (imagePath) loadImage(imagePath);
    }
    window.addEventListener("resize", onResize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
      }
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Load image from backend/localhost
    const imagePath = "/final-images/utils/1.png"; // Replace with backend-served path
    loadImage(imagePath);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-1/3 h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[.78]" />;
}