import React, { useState, useEffect, useRef } from "react";
import "../styles/Sections.css";
import "../styles/Skills.css";

/* ── devicons CDN — colored SVG logos ── */
const di = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const diPlain = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`;

const ALL = [
  { nm: "React",      ico: di("react"),          pct: 88, cat: "Frontend" },
  { nm: "JavaScript", ico: diPlain("javascript"), pct: 91, cat: "Frontend" },
  { nm: "HTML",       ico: di("html5"),           pct: 93, cat: "Frontend" },
  { nm: "CSS",        ico: di("css3"),            pct: 90, cat: "Frontend" },
  { nm: "Node.js",    ico: di("nodejs"),          pct: 83, cat: "Backend"  },
  { nm: "Express",    ico: di("express"),         pct: 81, cat: "Backend", cls: "sk-ico-express" },
  { nm: "MongoDB",    ico: di("mongodb"),         pct: 79, cat: "Backend"  },
  // No devicon for REST API — using a clean network SVG inline
  { nm: "REST API",   ico: "rest",                pct: 84, cat: "Backend"  },
  { nm: "Git",        ico: di("git"),             pct: 86, cat: "Tools"    },
  { nm: "Postman",    ico: diPlain("postman"),    pct: 81, cat: "Tools"    },
  // DSA — no icon, use inline brain SVG
  { nm: "DSA",        ico: "dsa",                 pct: 77, cat: "CS"       },
  { nm: "Java",       ico: di("java"),            pct: 79, cat: "CS"       },
];

const CATS = ["All", "Frontend", "Backend", "Tools", "CS"];
const MQ   = [...ALL, ...ALL].map(s => s.nm);

/* ── Custom inline SVGs for REST API and DSA ── */
const CustomIcon = ({ type }) => {
  if (type === "rest") return (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#00d4aa" strokeWidth="2.5" fill="none"/>
      <path d="M14 24h20M24 14l10 10-10 10" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="24" r="3" fill="#7c3aed"/>
      <circle cx="34" cy="24" r="3" fill="#00d4aa"/>
    </svg>
  );
  if (type === "dsa") return (
    <svg viewBox="0 0 48 48" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6"  y="30" width="8"  height="12" rx="2" fill="#7c3aed"/>
      <rect x="16" y="22" width="8"  height="20" rx="2" fill="#00d4aa"/>
      <rect x="26" y="14" width="8"  height="28" rx="2" fill="#7c3aed" opacity="0.8"/>
      <rect x="36" y="6"  width="8"  height="36" rx="2" fill="#00d4aa" opacity="0.9"/>
      <path d="M10 30 L20 22 L30 14 L40 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
  return null;
};

/* ── SVG gradient defs ── */
const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
    <defs>
      <linearGradient id="skillRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="var(--teal)"  />
        <stop offset="100%" stopColor="var(--violet)" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── Single card ── */
function SkillCard({ sk, index }) {
  const cardRef               = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count,   setCount]   = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let val = 0;
    const inc = sk.pct / (1300 / 16);
    const id  = setInterval(() => {
      val += inc;
      if (val >= sk.pct) { setCount(sk.pct); clearInterval(id); }
      else                 { setCount(Math.floor(val)); }
    }, 16);
    return () => clearInterval(id);
  }, [visible, sk.pct]);

  const r             = 36;
  const circumference = 2 * Math.PI * r;
  const filled        = (count / 100) * circumference;
  const isCustom      = sk.ico === "rest" || sk.ico === "dsa";

  return (
    <div
      className={`sk-card-new${visible ? " sk-card-visible" : ""}`}
      ref={cardRef}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="sk-ring-wrap">
        <svg className="sk-ring" viewBox="0 0 80 80">
          <circle className="sk-ring-bg" cx="40" cy="40" r={r} />
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

        {isCustom
          ? <span className="sk-ico-new sk-ico-custom"><CustomIcon type={sk.ico} /></span>
          : <img className={`sk-ico-new${sk.cls ? " " + sk.cls : ""}`} src={sk.ico} alt={sk.nm} width="30" height="30" loading="lazy" />
        }
      </div>

      <div className="sk-info">
        <div className="sk-name-new">{sk.nm}</div>
        <div className="sk-cat-pill">{sk.cat}</div>
      </div>

      <div className="sk-count-wrap">
        <span className="sk-count">{count}</span>
        <span className="sk-count-sym">%</span>
      </div>

      <div className="sk-scan" />
    </div>
  );
}

/* ── Section ── */
export default function Skills() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? ALL : ALL.filter(s => s.cat === cat);

  return (
    <section className="skills-sec" id="skills">
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
              >{c}</button>
            ))}
          </div>
        </div>

        <div className="sk-grid-new rv" style={{ transitionDelay: ".2s" }}>
          {filtered.map((sk, i) => (
            <SkillCard key={sk.nm} sk={sk} index={i} />
          ))}
        </div>

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