import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  {href: "#experience", label: "Experience"},
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a href="#hero" className="nav-logo">
            <div className="nav-logo-mark">AV</div>
            <span className="nav-logo-name">Anshul<span>.</span></span>
          </a>

          {/* Links */}
          <ul className="nav-links">
            {LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="/resume.pdf" className="nav-cta" download="Anshul_Verma_Resume.pdf">Resume ↓</a>
{/* ndnsnddkskd */}

          {/* Hamburger */}
          <button
            className={`nav-ham${open ? " open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-mob${open ? " open" : ""}`}>
        <div className="nav-mob-inner">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} className="nav-mob-link"
              onClick={() => setOpen(false)}>
              {l.label}
              {/* <span className="mob-num">0{i + 1}</span> */}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}