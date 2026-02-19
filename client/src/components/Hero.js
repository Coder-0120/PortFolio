import React, { useEffect, useRef } from "react";
import "../styles/Hero.css";

const TAGS = ["React", "Node.js", "MongoDB", "Express", "DSA", "Git"];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], raf;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    for (let i = 0; i < 60; i++) {
      pts.push({
        x: Math.random() * 1400, y: Math.random() * 900,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * 1.6 + .4,
        col: Math.random() > .55 ? "0,212,170" : "124,58,237",
        o: Math.random() * .45 + .08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${p.o})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,170,${(1 - d/120) * .1})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="glow-teal hero-orb-1" />
      <div className="glow-violet hero-orb-2" />
      <div className="glow-teal hero-orb-3" />
      <div className="hero-grid" />

      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            Hi, I'm
            <em className="hero-name-em">Anshul Verma</em>
          </h1>

          <div className="hero-role">// Full-Stack MERN Developer</div>

          <p className="hero-sub">
            I build scalable web apps from database to UI —
            fast, clean, and <strong style={{ color: "var(--text)", fontWeight: 500 }}>production-ready</strong>.
            
          </p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-teal">View Projects ↗</a>
            <a href="/resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Download CV ↓</a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-float hero-float-1">
            <span className="hero-float-dot" style={{ background: "#4ade80" }} />
            Open to work
          </div>
          <div className="hero-float hero-float-2">
            <span className="hero-float-dot" style={{ background: "var(--teal)" }} />
            3rd Year · B.Tech CSE
          </div>

          <div className="hero-card">
            <div className="hc-avatar">👨‍💻</div>
            <div className="hc-name">Anshul Verma</div>
            <div className="hc-role">MERN Stack Developer</div>

            <div className="hc-stats">
              {[
                { n: "10+", l: "Projects" },
                { n: "300+", l: "DSA" },
                { n: "5+", l: "Tech" },
              ].map(s => (
                <div className="hc-stat" key={s.l}>
                  <div className="hc-stat-n">{s.n}</div>
                  <div className="hc-stat-l">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="hc-tags">
              {TAGS.map(t => <div className="hc-tag" key={t}>{t}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span className="scroll-text">Scroll</span>
      </div>

      <div className="hero-border" />
    </section>
  );
}