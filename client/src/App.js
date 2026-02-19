import React, { useEffect, useRef } from "react";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

/* ── Magnetic Cursor ──────────────────────────────────────── */
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  let mx = 0, my = 0, rx = 0, ry = 0;

  useEffect(() => {
    const move = e => {
      mx = e.clientX; my = e.clientY;
      dot.current.style.left = mx + "px";
      dot.current.style.top  = my + "px";
    };

    let raf;
    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.current.style.left = rx + "px";
      ring.current.style.top  = ry + "px";
      raf = requestAnimationFrame(tick);
    };

    const expand   = () => ring.current?.classList.add("expanded");
    const contract = () => ring.current?.classList.remove("expanded");

    window.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a, button, [role=button]").forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", contract);
    });

    tick();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

/* ── App ──────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("vis");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".rv, .rv-l, .rv-r").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}