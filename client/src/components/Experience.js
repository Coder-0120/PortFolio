import React, { useEffect, useRef, useState } from "react";
import "../styles/Experience.css";

const EXP = {
  role:    "Full Stack Developer Intern",
  org:     "SmartBridge",
  partner: "MongoDB",
  type:    "Virtual Internship",
  period:  "Sep 2025 – Oct 2025",
  certId:  "VIP-FSD-2025-30215",
  stack:   ["React", "Node.js", "MongoDB", "Express.js", "REST API", "JWT"],
  points: [
    { icon: "⚡", text: "Built full-stack MERN apps end-to-end" },
    { icon: "🔐", text: "JWT auth & secure REST API architecture" },
    { icon: "🍃", text: "MongoDB indexing & aggregation pipelines" },
    { icon: "🚀", text: "Deployed production-grade apps independently" },
  ],
  stats: [
    { val: 2,   suffix: "mo", label: "Duration"      },
    { val: 100, suffix: "%",  label: "Completion"    },
    { val: 5,   suffix: "+",  label: "Projects"      },
  ],
};

/* ── Animated counter ── */
function Counter({ target, suffix, trigger }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let v = 0;
    const inc = target / (900 / 16);
    const id = setInterval(() => {
      v += inc;
      if (v >= target) { setN(target); clearInterval(id); }
      else              { setN(Math.floor(v)); }
    }, 16);
    return () => clearInterval(id);
  }, [trigger, target]);
  return <>{n}{suffix}</>;
}

export default function Experience() {
  const secRef        = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.2 });
    if (secRef.current) io.observe(secRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="exp-sec" id="experience" ref={secRef}>

      {/* ── BG effects ── */}
      <div className="exp-bg-ring exp-ring-1" />
      <div className="exp-bg-ring exp-ring-2" />
      <div className="exp-bg-ring exp-ring-3" />
      <div className="exp-blob exp-blob-1" />
      <div className="exp-blob exp-blob-2" />
      <div className="exp-particles" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <span key={i} className="exp-particle"
            style={{ "--x": `${(i * 7.3 + 5) % 95}%`, "--d": `${5 + (i % 5)}s`, "--delay": `${(i * 0.7) % 5}s` }} />
        ))}
      </div>

      <div className="exp-inner">

        {/* ── Heading ── */}
        <div className={`exp-hd${vis ? " exp-in" : ""}`}>
          <div className="eyebrow">03 — Experience</div>
          <h2 className="display">My <em>Experience</em></h2>
        </div>

        {/* ── Horizontal card ── */}
        <div className={`exp-card${vis ? " exp-in" : ""}`} style={{ transitionDelay: ".15s" }}>

          {/* Glowing border line on top */}
          <div className="exp-card-topline" />

          {/* Left: org info */}
          <div className="exp-card-left">
            <div className="exp-org-logo">SB</div>
            <div className="exp-org-info">
              <div className="exp-org-name">
                {EXP.org}<span className="exp-org-x"> × </span>
                <span className="exp-org-partner">{EXP.partner}</span>
              </div>
              <div className="exp-org-role">{EXP.role}</div>
              <div className="exp-org-meta">
                <span className="exp-period-chip">{EXP.period}</span>
                <span className="exp-type-chip">
                  <span className="exp-live-dot" />
                  {EXP.type}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="exp-card-div" />

          {/* Middle: points */}
          <div className="exp-card-mid">
            {EXP.points.map((p, i) => (
              <div key={i} className={`exp-point${vis ? " exp-point-in" : ""}`}
                style={{ transitionDelay: `${0.3 + i * 0.08}s` }}>
                <span className="exp-point-ico">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="exp-card-div" />

          {/* Right: stats + pills */}
          <div className="exp-card-right">
            <div className="exp-stats">
              {EXP.stats.map((s, i) => (
                <div key={i} className="exp-stat">
                  <div className="exp-stat-n">
                    <Counter target={s.val} suffix={s.suffix} trigger={vis} />
                  </div>
                  <div className="exp-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="exp-stack">
              {EXP.stack.map(s => (
                <span key={s} className="exp-pill">{s}</span>
              ))}
            </div>
          </div>

        </div>
        {/* end exp-card */}

      </div>
    </section>
  );
}