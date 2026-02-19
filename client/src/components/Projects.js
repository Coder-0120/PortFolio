import React, { useRef, useState } from "react";
import "../styles/Sections.css";

/* ── Tilt Card ──────────────────────────────────────────── */
function PCard({ p, large }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    ref.current.style.transform =
      `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*4}deg) translateY(-6px)`;
  };
  const onEnter = () => {
    ref.current.style.transition = "transform .08s ease, box-shadow .4s";
    setHov(true);
  };
  const onLeave = () => {
    ref.current.style.transition = "transform .7s cubic-bezier(.16,1,.3,1), box-shadow .4s";
    ref.current.style.transform  = "";
    setHov(false);
  };

  return (
    <div ref={ref} className={`pc ${large?"pc-lg":"pc-sm"}`}
      onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="pc-border" />

      {/* Browser mockup with project screenshot */}
      <div className="pc-img">
        <div className="pc-chrome">
          <div className="pc-wdots">
            <span style={{background:"#ff5f57"}}/><span style={{background:"#febc2e"}}/><span style={{background:"#28c840"}}/>
          </div>
          <div className="pc-addr">
            <span style={{marginRight:3,opacity:.6}}>🔒</span>
            {p.live.replace("https://","")}
          </div>
          <div style={{width:48,flexShrink:0}}/>
        </div>

        {/* Project screenshot */}
        <div className="pc-mockup">
          <img
            src={p.img}
            alt={p.title}
            className="pc-screenshot"
          />
          {/* Fallback gradient if no image loads */}
          <div
            className="pc-img-fallback"
            style={{background:`linear-gradient(135deg, ${p.color}22 0%, ${p.color2}18 50%, #0a0f1a 100%)`}}
          />
        </div>

        {/* Hover veil */}
        <div
          className={`pc-veil${hov?" on":""}`}
          style={{background:`linear-gradient(135deg,${p.color}18,${p.color2}10,transparent 60%)`}}
        />
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-toprow">
          <div style={{flex:1,minWidth:0}}>
            {p.featured && (
              <div className="pc-fbadge"><span className="pc-fp"/>Featured</div>
            )}
            <h3 className="pc-title">{p.title}</h3>
            <div className="pc-tagline">{p.tagline}</div>
          </div>
          <a href={p.gh} className="pc-ghbtn" title="GitHub"
            target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>

        <p className="pc-desc">{p.desc}</p>

        <div className="pc-pills">
          {p.tech.map(t=><span className="pc-pill" key={t}>{t}</span>)}
        </div>

        <div className="pc-acts">
          <a href={p.live} className="pc-live" target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}>
            <span className="pc-ldot"/>
            Live Demo
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
          <a href={p.gh} className="pc-code" target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}>
            View Code
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
/*
  ADD YOUR OWN SCREENSHOTS:
  • Put images in /public/images/ (e.g. /public/images/devconnect.png)
  • Then set  img: "/images/devconnect.png"
  • Recommended size: 1280×720px or 960×540px (16:9)
  • If you have no screenshot yet, the gradient fallback shows automatically
*/
const FEAT = [
  {
    title:"DevConnect", tagline:"Social platform for developers",
    desc:"Real-time social hub — live chat via Socket.io, JWT auth, project showcases and instant notifications. Fully responsive.",
    tech:["React","Node.js","MongoDB","Socket.io","JWT","Express"],
    gh:"https://github.com/anshulverma", live:"https://devconnect.live",
    featured:true, color:"#00d4aa", color2:"#7c3aed",
    img:"/images/devconnect.png",   // 👈 replace with your screenshot path
  },
  {
    title:"TaskFlow", tagline:"Team task management API",
    desc:"Production REST API with role-based access, team workspaces, deadline tracking and full Postman documentation collection.",
    tech:["Express.js","MongoDB","JWT","REST","Bcrypt"],
    gh:"https://github.com/anshulverma", live:"https://taskflow.live",
    featured:true, color:"#7c3aed", color2:"#f59e0b",
    img:"/images/taskflow.png",     // 👈 replace with your screenshot path
  },
];
const REST = [
  {
    title:"AlgoVisualizer", tagline:"DSA animations in the browser",
    desc:"Interactive visualizer for sorting, graph traversals & DP. Watch algorithms run step by step with Canvas.",
    tech:["React","Canvas API","JavaScript"],
    gh:"https://github.com/anshulverma", live:"https://algoviz.live",
    color:"#f59e0b", color2:"#00d4aa",
    img:"/images/algoviz.png",      // 👈 replace with your screenshot path
  },
  {
    title:"ShopEase", tagline:"E-commerce with Stripe",
    desc:"Full e-commerce stack — products, cart, Stripe payments and an admin dashboard with live analytics.",
    tech:["React","Node.js","MongoDB","Stripe"],
    gh:"https://github.com/anshulverma", live:"https://shopease.live",
    color:"#00d4aa", color2:"#f43f5e",
    img:"/images/shopease.png",     // 👈 replace with your screenshot path
  },
  {
    title:"CodePulse", tagline:"AI-powered code reviewer",
    desc:"Paste JS or Python, get instant AI feedback — bug detection, complexity analysis, refactor hints inline.",
    tech:["React","OpenAI","Node.js"],
    gh:"https://github.com/anshulverma", live:"https://codepulse.live",
    color:"#7c3aed", color2:"#00d4aa",
    img:"/images/codepulse.png",    // 👈 replace with your screenshot path
  },
];

export default function Projects() {
  return (
    <section className="proj-sec" id="projects">
      <div className="proj-glow glow-violet" />
      <div className="proj-inner">
        <div className="proj-hd rv">
          <div>
            <div className="eyebrow">03 — Projects</div>
            <h2 className="display">Things I've<br /><em>shipped</em></h2>
          </div>
          <a href="https://github.com/anshulverma" className="proj-gh"
            target="_blank" rel="noopener noreferrer">
            github.com/anshulverma ↗
          </a>
        </div>

        <div className="proj-feat">
          {FEAT.map((p,i)=>(
            <div key={p.title} className="rv" style={{transitionDelay:`${i*.1}s`}}>
              <PCard p={p} large />
            </div>
          ))}
        </div>

        <div className="proj-rest">
          {REST.map((p,i)=>(
            <div key={p.title} className="rv" style={{transitionDelay:`${.2+i*.08}s`}}>
              <PCard p={p} large={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}