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

interface MouseState {
  x: number;
  y: number;
  active: boolean;
  repulseUntil: number;
}

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
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

    const baseParticleOpacity = Number.isNaN(particleOpacity)
      ? 0.6
      : particleOpacity;

    const baseParticleLinkOpacity = Number.isNaN(particleLinkOpacity)
      ? 0.35
      : particleLinkOpacity;

    const baseParticleMouseLinkOpacity = Number.isNaN(particleMouseLinkOpacity)
      ? 0.9
      : particleMouseLinkOpacity;

    // 重点优化 1：降低粒子数量
    const particleCount = window.innerWidth < 768 ? 35 : 90;

    const linkDistance = 100;
    const mouseLinkDistance = 180;

    const linkDistanceSq = linkDistance * linkDistance;
    const mouseLinkDistanceSq = mouseLinkDistance * mouseLinkDistance;
    const repulseDistance = 250;
    const repulseDistanceSq = repulseDistance * repulseDistance;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let running = true;

    const particleColor = `rgba(${particleRgb}, ${baseParticleOpacity})`;

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

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // 如果窗口变化很大，可以重新生成粒子
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
    };

    const draw = () => {
      if (!running) return;

      const now = performance.now();
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      context.clearRect(0, 0, width, height);

      context.fillStyle = particleColor;
      context.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // 鼠标排斥，先用平方距离判断，少开平方
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

        // 粒子之间连线
        for (let j = i + 1; j < particles.length; j++) {
          const nextParticle = particles[j];

          const dx = particle.x - nextParticle.x;
          const dy = particle.y - nextParticle.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < linkDistanceSq) {
            const distance = Math.sqrt(distanceSq);
            const opacity =
              (1 - distance / linkDistance) * baseParticleLinkOpacity;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(${particleRgb}, ${opacity})`;
            context.stroke();
          }
        }

        // 鼠标连线
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const mouseDistanceSq = dx * dx + dy * dy;

          if (mouseDistanceSq < mouseLinkDistanceSq) {
            const mouseDistance = Math.sqrt(mouseDistanceSq);
            const opacity =
              (1 - mouseDistance / mouseLinkDistance) *
              baseParticleMouseLinkOpacity;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(mouse.x, mouse.y);
            context.strokeStyle = `rgba(${particleRgb}, ${opacity})`;
            context.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrame);
      } else {
        running = true;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    resize();

    if (!particlesRef.current.length) {
      createParticles();
    }

    animationFrame = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      running = false;

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
