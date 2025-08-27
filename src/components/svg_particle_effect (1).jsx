import React, { useEffect, useRef } from "react";

export default function ParticleEffect() {
  const svgPath = "/final-images/logo/wolf_5.png"; // Path to your SVG file
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const settings = useRef({
    particleCount: 15000,
    particleColor: "#ff0066",
    speed: 1,
    hoverForce: 3,
  });

  let imageMask = null;
  let particles = [];

  // Particle class
  class Particle {
    constructor(x, y) {
      this.baseX = x;
      this.baseY = y;
      this.x = x + Math.random() * 10 - 5;
      this.y = y + Math.random() * 10 - 5;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.life = Math.random() * 150 + 100;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    isInsideMask(x, y) {
      if (!imageMask) return false;
      const px = Math.floor(x);
      const py = Math.floor(y);
      if (px < 0 || py < 0 || px >= imageMask.width || py >= imageMask.height) return false;
      const index = (py * imageMask.width + px) * 4;
      return imageMask.data[index + 3] > 128;
    }

    update(mouse) {
      this.life -= 1;
      this.x += this.vx * settings.current.speed;
      this.y += this.vy * settings.current.speed;

      // Keep particles inside mask
      if (!this.isInsideMask(this.x, this.y)) {
        this.x = this.baseX + Math.random() * 10 - 5;
        this.y = this.baseY + Math.random() * 10 - 5;
      }

      // Respawn particle when life ends
      if (this.life <= 0) {
        this.x = this.baseX + Math.random() * 10 - 5;
        this.y = this.baseY + Math.random() * 10 - 5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 150 + 100;
      }

      // Mouse hover repulsion effect
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          this.x += dx * 0.05 * settings.current.hoverForce * force;
          this.y += dy * 0.05 * settings.current.hoverForce * force;
        }
      }
    }

    draw(ctx) {
      ctx.fillStyle = settings.current.particleColor;
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];
    let mouse = { x: null, y: null };

    // Load SVG and create particle mask
    if (svgPath) {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          // Scale image to fit canvas while maintaining aspect ratio
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8;
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const x = (canvas.width - scaledWidth) / 2;
          const y = (canvas.height - scaledHeight) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
          imageMask = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Generate particles based on image mask
          for (let py = 0; py < canvas.height; py += 3) {
            for (let px = 0; px < canvas.width; px += 3) {
              const index = (py * canvas.width + px) * 4;
              if (imageMask.data[index + 3] > 128) {
                particles.push(new Particle(px, py));
                if (particles.length >= settings.current.particleCount) break;
              }
            }
            if (particles.length >= settings.current.particleCount) break;
          }

          console.log(`Created ${particles.length} particles`);
        } catch (error) {
          console.error('Error processing image:', error);
        }
      };

      img.onerror = () => {
        console.error('Failed to load SVG:', svgPath);
      };

      img.src = svgPath;
    }

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(mouse);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [svgPath]);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}