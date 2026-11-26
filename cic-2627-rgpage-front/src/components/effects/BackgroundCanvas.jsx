import { useEffect, useRef } from 'react';

const GLYPHS = ['0x1F', '0xFF', '01', '10', '0x4D', 'SYN', 'ACK', '0x00', '11', '0xA3', 'ESC'];

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv.getContext('2d');
    let W, H, pts = [], edges = [], glyphs = [], raf;

    function rand(n) { return Math.random() * n; }

    function build() {
      pts = [];
      const n = Math.floor((W * H) / 17000);
      for (let i = 0; i < n; i++) {
        pts.push({
          x: rand(W),
          y: rand(H),
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1.1 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
        });
      }

      glyphs = [];
      const gn = Math.floor((W * H) / 90000);
      for (let i = 0; i < gn; i++) {
        glyphs.push({
          x: rand(W),
          y: rand(H),
          text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          vy: -0.12 - Math.random() * 0.1,
          phase: Math.random() * Math.PI * 2,
          life: Math.random() * 400,
        });
      }
    }

    function step(t) {
      cx.clearRect(0, 0, W, H);

      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      });

      edges = [];
      cx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        let links = 0;
        for (let j = i + 1; j < pts.length && links < 2; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            const alpha = (1 - d / 150) * 0.35;
            cx.strokeStyle = `rgba(77,201,230,${alpha})`;
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.lineTo(a.x, b.y);
            cx.lineTo(b.x, b.y);
            cx.stroke();
            edges.push([a, b]);
            links++;
          }
        }

        const mdx = a.x - mouse.current.x, mdy = a.y - mouse.current.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 180) {
          const alpha = (1 - md / 180) * 0.5;
          cx.strokeStyle = `rgba(77,201,230,${alpha})`;
          cx.lineWidth = 0.8;
          cx.beginPath();
          cx.moveTo(a.x, a.y);
          cx.lineTo(mouse.current.x, mouse.current.y);
          cx.stroke();
          cx.lineWidth = 0.6;
        }
      }

      // data packets traveling along a sample of edges
      const packetCount = Math.min(10, edges.length);
      for (let i = 0; i < packetCount; i++) {
        const e = edges[(i * 37) % edges.length];
        if (!e) continue;
        const [a, b] = e;
        const speed = 0.00035;
        const prog = (t * speed + i * 0.37) % 1;
        const px = a.x + (b.x - a.x) * prog;
        const py = a.y + (b.y - a.y) * prog;
        cx.fillStyle = 'rgba(180,235,255,0.9)';
        cx.beginPath();
        cx.arc(px, py, 1.6, 0, Math.PI * 2);
        cx.fill();
      }

      // nodes with pulsing brightness
      pts.forEach(p => {
        const pulse = 0.55 + Math.sin(t / 900 + p.phase) * 0.35;
        cx.fillStyle = `rgba(77,201,230,${Math.max(0.25, pulse)})`;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fill();
      });

      // drifting hex/binary glyphs
      cx.font = '10px "Space Mono", monospace';
      glyphs.forEach(g => {
        g.y += g.vy;
        g.life += 1;
        if (g.y < -20) { g.y = H + 20; g.x = rand(W); g.life = 0; }
        const fade = Math.sin(g.life / 140) * 0.5 + 0.5;
        cx.fillStyle = `rgba(77,201,230,${0.12 + fade * 0.22})`;
        cx.fillText(g.text, g.x, g.y);
      });

      raf = requestAnimationFrame(step);
    }

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = Math.max(document.body.scrollHeight, window.innerHeight);
      build();
    }

    function onMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    resize();
    raf = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef} />
      <div className="scanline" />
    </>
  );
}
