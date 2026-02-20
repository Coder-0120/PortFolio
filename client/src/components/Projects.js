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
    title:"InvoicePro", tagline:"Professional Invoicing Made Effortless.",
    desc:"A modern invoicing platform that enables users to create, manage, track, and download professional invoices with ease. Built to streamline billing workflows through a clean interface, secure data handling, and efficient invoice management.",
    tech:["React","Node.js","MongoDB","Express"],
    gh:"https://github.com/Coder-0120/InvoicePro", live:"https://invoice-pro-sepia.vercel.app/home",
    featured:true, color:"#00d4aa", color2:"#7c3aed",
    img:"/images/invoicepro.png",   // 👈 replace with your screenshot path
  },
  {
    title:"Customer-Management System", tagline:"Team task management API",
    desc:"A robust backend-driven customer management system designed to handle transactions, track dues, and manage customer data efficiently. Features secure authentication, role-based access, and scalable REST APIs for reliable business operations.",
    tech:["Express.js","MongoDB","JWT","REST","Bcrypt"],
    gh:"https://github.com/Coder-0120/Customer-Management-System", live:"https://taskflow.live",
    featured:true, color:"#7c3aed", color2:"#f59e0b",
    img:"/images/customer-management.png",     // 👈 replace with your screenshot path
  },
];
const REST = [
  {
    title:"Abes-Findify", tagline:"Reuniting What Matters.",
    desc:"A full-stack campus lost-and-found platform that enables ABES Engineering College students to report, discover, and reclaim lost items—making recovery fast, simple, and community-driven.",
    tech:["React","Canvas API","JavaScript"],
    gh:"https://github.com/Coder-0120/ABES_FINDIFY", live:"https://abes-findify.vercel.app/",
    color:"#f59e0b", color2:"#00d4aa",
    img:"/images/abes-findify.png",      // 👈 replace with your screenshot path
  },
  {
    title:"APIFlux", tagline:"Real-Time Insights for Reliable APIs.",
    desc:"APIFlux is a real-time API monitoring system that helps developers and businesses track API uptime, performance, and response trends through live health checks, detailed logs, and visual analytics.",
    tech:["React","Node.js","MongoDB","Stripe"],
    gh:"https://github.com/Coder-0120/API-Monitoring", live:"https://apiflux.live",
    color:"#00d4aa", color2:"#f43f5e",
    img:"/images/apiflux.png",     // 👈 replace with your screenshot path
  },
  {
    title:"GoFood", tagline:"Delicious Food, Just a Click Away.",
    desc:"A modern food ordering web application built using the MERN stack, providing a fast, secure, and intuitive platform for users to browse food categories, place orders, and enjoy a seamless dining experience.",
    tech:["React","OpenAI","Node.js"],
    gh:"https://github.com/Coder-0120/GoFood", live:"https://gofood.live",
    color:"#7c3aed", color2:"#00d4aa",
    img:"/images/gofood.png",    // 👈 replace with your screenshot path
  },
];

export default function Projects() {
  return (
    <section className="proj-sec" id="projects">
      <div className="proj-glow glow-violet" />
      <div className="proj-inner">
        <div className="proj-hd rv">
          <div>
            <div className="eyebrow">04 — Projects</div>
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