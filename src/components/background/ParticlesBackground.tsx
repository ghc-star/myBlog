import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  impulseX: number;
  impulseY: number;
  radius: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  drag: number;
  radius: number;
  life: number;
  maxLife: number;
}

interface MouseState {
  x: number;
  y: number;
  active: boolean;
  repulseUntil: number;
}

interface ParticleStyleConfig {
  particleRgb: string;
  particleOpacity: number;
  particleLinkOpacity: number;
  particleMouseLinkOpacity: number;
  burstGlowAlpha: number;
}

function readParticleStyles(): ParticleStyleConfig {
  const rootStyles = getComputedStyle(document.documentElement);

  const particleRgb =
    rootStyles.getPropertyValue("--particle-rgb").trim() || "243, 175, 202";

  const particleOpacity = Number.parseFloat(
    rootStyles.getPropertyValue("--particle-opacity"),
  );

  const particleLinkOpacity = Number.parseFloat(
    rootStyles.getPropertyValue("--particle-link-opacity"),
  );

  const particleMouseLinkOpacity = Number.parseFloat(
    rootStyles.getPropertyValue("--particle-mouse-link-opacity"),
  );

  return {
    particleRgb,
    particleOpacity: Number.isNaN(particleOpacity) ? 0.6 : particleOpacity,
    particleLinkOpacity: Number.isNaN(particleLinkOpacity)
      ? 0.35
      : particleLinkOpacity,
    particleMouseLinkOpacity: Number.isNaN(particleMouseLinkOpacity)
      ? 0.9
      : particleMouseLinkOpacity,
    burstGlowAlpha: 0.45,
  };
}

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const burstsRef = useRef<BurstParticle[]>([]);
  const stylesRef = useRef<ParticleStyleConfig>(readParticleStyles());
  const mouseRef = useRef<MouseState>({
    x: 0,
    y: 0,
    active: false,
    repulseUntil: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particleCount = window.innerWidth < 768 ? 35 : 90;
    const linkDistance = 100;
    const mouseLinkDistance = 180;
    const repulseDistance = 250;

    const linkDistanceSq = linkDistance * linkDistance;
    const mouseLinkDistanceSq = mouseLinkDistance * mouseLinkDistance;
    const repulseDistanceSq = repulseDistance * repulseDistance;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let running = true;
    let lastFrameTime = performance.now();

    const syncParticleStyles = () => {
      stylesRef.current = readParticleStyles();
    };

    const createParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        impulseX: 0,
        impulseY: 0,
        radius: Math.random() * 2 + 1,
      }));
    };

    const createBurst = (x: number, y: number, scale = 1) => {
      const burstParticles = burstsRef.current;
      const burstCount = window.innerWidth < 768 ? 8 : 12;

      for (let i = 0; i < burstCount; i += 1) {
        const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.35;
        const speed = (1.3 + Math.random() * 2.2) * scale;
        const life = 260 + Math.random() * 260;

        burstParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          drag: 0.94 + Math.random() * 0.02,
          radius: 1 + Math.random() * 2.2,
          life,
          maxLife: life,
        });
      }

      if (burstParticles.length > 220) {
        burstParticles.splice(0, burstParticles.length - 220);
      }
    };

    const createRepulseBursts = (x: number, y: number) => {
      const nearbyParticles = particlesRef.current.filter((particle) => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        return dx * dx + dy * dy < repulseDistanceSq * 0.34;
      });

      const originPool = nearbyParticles.length
        ? [...nearbyParticles]
        : [{ x, y }];

      const originCount = Math.min(
        window.innerWidth < 768 ? 2 : 4,
        originPool.length,
      );

      for (let i = 0; i < originCount; i += 1) {
        const index = Math.floor(Math.random() * originPool.length);
        const origin = originPool.splice(index, 1)[0];

        createBurst(
          origin.x + (Math.random() - 0.5) * 8,
          origin.y + (Math.random() - 0.5) * 8,
          0.8 + Math.random() * 0.45,
        );
      }
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (!particlesRef.current.length) {
        createParticles();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (event: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
      mouse.repulseUntil = performance.now() + 250;

      createRepulseBursts(mouse.x, mouse.y);
    };

    const drawBursts = (delta: number) => {
      const { particleRgb, burstGlowAlpha } = stylesRef.current;
      const bursts = burstsRef.current;

      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const burst = bursts[i];
        burst.x += burst.vx;
        burst.y += burst.vy;
        burst.vx *= burst.drag;
        burst.vy *= burst.drag;
        burst.vy += 0.015;
        burst.life -= delta;

        if (burst.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        const progress = burst.life / burst.maxLife;

        context.beginPath();
        context.arc(burst.x, burst.y, burst.radius * progress + 0.35, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particleRgb}, ${Math.max(0.08, progress * 0.95)})`;
        context.shadowBlur = 10 * progress;
        context.shadowColor = `rgba(${particleRgb}, ${burstGlowAlpha * progress})`;
        context.fill();
      }

      context.shadowBlur = 0;
      context.shadowColor = "transparent";
    };

    const draw = () => {
      if (!running) return;

      const now = performance.now();
      const delta = Math.min(now - lastFrameTime, 32);
      lastFrameTime = now;

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const {
        particleRgb,
        particleOpacity,
        particleLinkOpacity,
        particleMouseLinkOpacity,
      } = stylesRef.current;

      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgba(${particleRgb}, ${particleOpacity})`;
      context.lineWidth = 1;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        if (mouse.active && now < mouse.repulseUntil) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const mouseDistanceSq = dx * dx + dy * dy;

          if (mouseDistanceSq < repulseDistanceSq) {
            const mouseDistance = Math.sqrt(mouseDistanceSq);
            const force = (1 - mouseDistance / repulseDistance) * 3.5;
            const angle = Math.atan2(dy, dx);

            particle.impulseX += Math.cos(angle) * force * 0.18;
            particle.impulseY += Math.sin(angle) * force * 0.18;
          }
        }

        particle.x += particle.vx + particle.impulseX;
        particle.y += particle.vy + particle.impulseY;

        particle.impulseX *= 0.9;
        particle.impulseY *= 0.9;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.impulseX *= -0.4;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.impulseY *= -0.4;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const nextParticle = particles[j];
          const dx = particle.x - nextParticle.x;
          const dy = particle.y - nextParticle.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < linkDistanceSq) {
            const distance = Math.sqrt(distanceSq);
            const opacity = (1 - distance / linkDistance) * particleLinkOpacity;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(${particleRgb}, ${opacity})`;
            context.stroke();
          }
        }

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const mouseDistanceSq = dx * dx + dy * dy;

          if (mouseDistanceSq < mouseLinkDistanceSq) {
            const mouseDistance = Math.sqrt(mouseDistanceSq);
            const opacity =
              (1 - mouseDistance / mouseLinkDistance) *
              particleMouseLinkOpacity;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(mouse.x, mouse.y);
            context.strokeStyle = `rgba(${particleRgb}, ${opacity})`;
            context.stroke();
          }
        }
      }

      drawBursts(delta);
      animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrame);
      } else {
        running = true;
        lastFrameTime = performance.now();
        animationFrame = requestAnimationFrame(draw);
      }
    };

    syncParticleStyles();
    resize();

    if (!particlesRef.current.length) {
      createParticles();
    }

    const themeObserver = new MutationObserver(syncParticleStyles);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    animationFrame = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      running = false;

      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div id="particles-js" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ParticlesBackground;
