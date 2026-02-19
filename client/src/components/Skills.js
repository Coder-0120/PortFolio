import React, { useState, useEffect, useRef } from "react";
import "../styles/Sections.css";
import "../styles/Skills.css";

const ALL = [
  { nm: "React",      ico: "⚛️", pct: 88, cat: "Frontend" },
  { nm: "JavaScript", ico: "⚡", pct: 91, cat: "Frontend" },
  { nm: "HTML",       ico: "🏗️", pct: 93, cat: "Frontend" },
  { nm: "CSS",        ico: "🎨", pct: 90, cat: "Frontend" },
  { nm: "Node.js",    ico: "🟢", pct: 83, cat: "Backend"  },
  { nm: "Express",    ico: "🚂", pct: 81, cat: "Backend"  },
  { nm: "MongoDB",    ico: "🍃", pct: 79, cat: "Backend"  },
  { nm: "REST API",   ico: "🔌", pct: 84, cat: "Backend"  },
  { nm: "Git",        ico: "🔀", pct: 86, cat: "Tools"    },
  { nm: "Postman",    ico: "📮", pct: 81, cat: "Tools"    },
  { nm: "DSA",        ico: "🧠", pct: 77, cat: "CS"       },
  { nm: "Java",       ico: "⚙️", pct: 79, cat: "CS"       },
];

const CATS = ["All", "Frontend", "Backend", "Tools", "CS"];
const MQ = [...ALL, ...ALL].map(s => s.nm);

/* ── SVG gradient injected once ── */
const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
    <defs>
      <linearGradient id="skillRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="var(--teal)"   />
        <stop offset="100%" stopColor="var(--violet)"  />
      </linearGradient>
    </defs>
  </svg>
);

/* ── Individual skill card ── */
function SkillCard({ sk, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  /* Intersection → trigger animation */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Count-up when visible */
  useEffect(() => {
    if (!visible) return;
    let val = 0;
    const step  = 16;
    const total = 1300;
    const inc   = sk.pct / (total / step);
    const id = setInterval(() => {
      val += inc;
      if (val >= sk.pct) { setCount(sk.pct); clearInterval(id); }
      else                { setCount(Math.floor(val)); }
    }, step);
    return () => clearInterval(id);
  }, [visible, sk.pct]);

  /* Circular stroke animation values */
  const r = 36;
  const circumference = 2 * Math.PI * r;   /* ≈ 226.2 */
  const filled = (count / 100) * circumference;

  return (
    <div
      className={`sk-card-new${visible ? " sk-card-visible" : ""}`}
      ref={cardRef}
      style={{ animationDelay: `${index * 0.06}s`, transitionDelay: `${index * 0.06}s` }}
    >
      {/* Ring */}
      <div className="sk-ring-wrap">
        <svg className="sk-ring" viewBox="0 0 80 80">
          <circle className="sk-ring-bg"   cx="40" cy="40" r={r} />
          <circle
            className="sk-ring-fill"
            cx="40" cy="40" r={r}
            stroke="url(#skillRingGrad)"
            strokeDasharray={`${filled} ${circumference}`}
            style={{
              transition: visible
                ? `stroke-dasharray 1.3s cubic-bezier(.4,0,.2,1) ${index * 0.06}s`
                : "none",
            }}
          />
        </svg>
        <span className="sk-ico-new">{sk.ico}</span>
      </div>

      {/* Info */}
      <div className="sk-info">
        <div className="sk-name-new">{sk.nm}</div>
        <div className="sk-cat-pill">{sk.cat}</div>
      </div>

      {/* Counter */}
      <div className="sk-count-wrap">
        <span className="sk-count">{count}</span>
        <span className="sk-count-sym">%</span>
      </div>

      {/* Scan line (CSS handles animation on hover) */}
      <div className="sk-scan" />
    </div>
  );
}

/* ── Main section ── */
export default function Skills() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? ALL : ALL.filter(s => s.cat === cat);

  return (
    <section className="skills-sec" id="skills">
      {/* Inject gradient defs once */}
      <SvgDefs />

      <div className="skills-glow glow-violet" />

      <div className="skills-inner">
        <div className="skills-top">
          <div className="rv">
            <div className="eyebrow">02 — Skills</div>
            <h2 className="display">My <em>tech</em><br />arsenal</h2>
          </div>

          <div className="sk-filters rv" style={{ transitionDelay: ".15s" }}>
            {CATS.map(c => (
              <button
                key={c}
                className={`sk-filter${cat === c ? " on" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* New ring-card grid */}
        <div className="sk-grid-new rv" style={{ transitionDelay: ".2s" }}>
          {filtered.map((sk, i) => (
            <SkillCard key={sk.nm} sk={sk} index={i} />
          ))}
        </div>

        {/* Marquee — unchanged */}
        <div className="mq rv" style={{ transitionDelay: ".3s" }}>
          <div className="mq-track">
            {MQ.map((n, i) => (
              <span className="mq-item" key={`${n}-${i}`}>
                {n}<span className="mq-sep">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}