import React, { useEffect, useRef, useState } from "react";
import "../styles/Sections.css";
import "../styles/About.css";

const LINES = [
  { k: "name",    v: "Anshul Verma",           cls: "" },
  { k: "role",    v: "MERN Stack Developer",    cls: "" },
  { k: "edu",     v: "B.Tech CSE · 3rd Year",   cls: "" },
  { k: "passion", v: "Full-Stack + DSA",         cls: "" },
  { k: "status",  v: "✓ Open to Opportunities",  cls: "t-g" },
];

const CHIPS = [
  "Problem Solving", "Clean Code", "API Design", "Team Player",
  "Open Source", "Performance", "System Design", "Communication",
];

const STATS = [
  { target: 10,  suffix: "+", label: "Projects Shipped" },
  { target: 300, suffix: "+", label: "DSA Problems"      },
  { target: 5,   suffix: "+", label: "Technologies"      },
];

/* ── Animated stat card ── */
function AnimatedStat({ stat, index }) {
  const ref = useRef(null);
  const [count, setCount]   = useState(0);
  const [visible, setVisible] = useState(false);

  /* Fire when scrolled into view */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Count up from 0 → target at 60 fps */
  useEffect(() => {
    if (!visible) return;
    let val = 0;
    const duration = 1400;
    const fps      = 60;
    const steps    = (duration / 1000) * fps;
    const inc      = stat.target / steps;
    const id = setInterval(() => {
      val += inc;
      if (val >= stat.target) { setCount(stat.target); clearInterval(id); }
      else                     { setCount(Math.floor(val)); }
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [visible, stat.target]);

  /* Arc circumference for r=26 → 2π×26 ≈ 163.4 */
  const circ = 2 * Math.PI * 26;

  return (
    <div
      className={`ac ac-animated${visible ? " ac-in" : ""}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Subtle SVG arc behind number */}
      <svg className="ac-ring" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="26" className="ac-ring-bg" />
        <circle
          cx="30" cy="30" r="26"
          className="ac-ring-fill"
          strokeDasharray={visible ? `${circ} ${circ}` : `0 ${circ}`}
          style={{
            transition: visible
              ? `stroke-dasharray ${1.4 + index * 0.1}s cubic-bezier(.4,0,.2,1)`
              : "none",
          }}
        />
      </svg>

      {/* Number */}
      <div className="ac-n">
        <span className="ac-num">{count}</span>
        <span className="ac-sfx">{stat.suffix}</span>
      </div>
      <div className="ac-l">{stat.label}</div>
    </div>
  );
}

/* ── Section ── */
export default function About() {
  return (
    <section className="about-sec" id="about">
      <div className="about-wm">ME</div>
      <div className="about-inner">

        <div className="rv">
          <div className="eyebrow">01 — About Me</div>
          <h2 className="display">The person<br />behind the <em>code</em></h2>
        </div>

        <div className="about-grid">
          {/* Left */}
          <div className="rv-l" style={{ transitionDelay: ".1s" }}>
            <div className="about-text">
              <p>I'm a <strong>3rd year B.Tech Computer Science student</strong> obsessed with building things for the web — not just to make them work, but to make them <em>fast, elegant, and maintainable</em>.</p>
              <p>My world is the <strong>MERN stack</strong>, but I go deep at every layer — MongoDB indexing, Express middleware, React performance patterns, and REST API architecture. I grind <em>DSA daily</em> because great engineers think algorithmically.</p>
              <p>Actively seeking <strong>internships, freelance work, and collaborations</strong> where I can ship real software and grow fast. Let's build something great.</p>
            </div>
            <div className="about-chips">
              {CHIPS.map((c, i) => (
                <div
                  className="chip chip-anim"
                  key={c}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="rv-r" style={{ transitionDelay: ".2s" }}>
            <div className="term">
              <div className="term-bar">
                <div className="tc" style={{ background: "#ff5f57" }} />
                <div className="tc" style={{ background: "#febc2e" }} />
                <div className="tc" style={{ background: "#28c840" }} />
                <span className="term-fname">~/anshul/whoami.sh</span>
              </div>
              <div className="term-body">
                {LINES.map((l, i) => (
                  <div
                    className="tl tl-anim"
                    key={l.k}
                    style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                  >
                    <span className="t-pmt">$</span>
                    <div className="t-cmd">
                      <span className="t-k">echo ${l.k}</span>
                      <span className={`t-v ${l.cls}`}>{l.v}</span>
                    </div>
                  </div>
                ))}
                <div className="tl">
                  <span className="t-pmt">$</span>
                  <span className="t-cursor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated stat counters */}
        <div className="about-counts rv" style={{ transitionDelay: ".3s" }}>
          {STATS.map((s, i) => (
            <AnimatedStat key={s.label} stat={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}