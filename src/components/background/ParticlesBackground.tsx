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
    //粒子数量
    const particleCount = window.innerWidth < 768 ? 55 : 160;
    const linkDistance = 110;
    const mouseLinkDistance = 200;

    if (!particlesRef.current.length) {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        impulseX: 0,
        impulseY: 0,
        radius: Math.random() * 2 + 1,
      }));
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
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
      const now = performance.now();
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle, index) => {
        if (mouse.active) {
          const mouseDistance = Math.hypot(
            particle.x - mouse.x,
            particle.y - mouse.y,
          );

          if (now < mouse.repulseUntil && mouseDistance < 250) {
            const force = (1 - mouseDistance / 250) * 3.5;
            const angle = Math.atan2(
              particle.y - mouse.y,
              particle.x - mouse.x,
            );
            particle.impulseX += Math.cos(angle) * force * 0.18;
            particle.impulseY += Math.sin(angle) * force * 0.18;
          }
        }

        particle.x += particle.vx + particle.impulseX;
        particle.y += particle.vy + particle.impulseY;
        particle.impulseX *= 0.9;
        particle.impulseY *= 0.9;

        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
          particle.impulseX *= -0.4;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
          particle.impulseY *= -0.4;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(243, 175, 202, 0.6)";
        context.fill();

        for (
          let nextIndex = index + 1;
          nextIndex < particles.length;
          nextIndex += 1
        ) {
          const nextParticle = particles[nextIndex];
          const distance = Math.hypot(
            particle.x - nextParticle.x,
            particle.y - nextParticle.y,
          );

          if (distance < linkDistance) {
            const opacity = (1 - distance / linkDistance) * 0.35;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(243, 175, 202, ${opacity})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }

        if (mouse.active) {
          const mouseDistance = Math.hypot(
            particle.x - mouse.x,
            particle.y - mouse.y,
          );

          if (mouseDistance < mouseLinkDistance) {
            const opacity = (1 - mouseDistance / mouseLinkDistance) * 0.9;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(mouse.x, mouse.y);
            context.strokeStyle = `rgba(243, 175, 202, ${opacity})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    let animationFrame = 0;
    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
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
