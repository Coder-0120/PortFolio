import React, { useState } from "react";
import "../styles/Sections.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// 👇 Get your free key at web3forms.com → Enter your email → Copy key
const WEB3FORMS_KEY = "d60c7cb2-7e44-4f02-aa57-18b9ac1a1521";

const SOCIALS = [
  { ico: <FaGithub />,   lbl: "GitHub",   href: "https://github.com/Coder-0120" },
  { ico: <FaLinkedin />, lbl: "LinkedIn", href: "https://www.linkedin.com/in/anshul-verma180705/" },
  { ico: <FaTwitter />,  lbl: "Twitter",  href: "#" },
  { ico: <MdEmail />,    lbl: "Email",    href: "mailto:av4862187@gmail.com" },
];
export default function Contact() {
  const [form, setForm]     = useState({ name:"", email:"", msg:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":        "application/json",
        },
        body: JSON.stringify({
          access_key:      WEB3FORMS_KEY,
          name:            form.name,
          email:           form.email,
          message:         form.msg,
          // Optional extras — Web3Forms supports these out of the box:
          subject:         `New portfolio message from ${form.name}`,
          from_name:       "Portfolio Contact Form",
          botcheck:        "",              // honeypot spam field — leave empty
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("ok");
        setForm({ name:"", email:"", msg:"" });
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }

    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  return (
    <section className="contact-sec" id="contact">
      <div className="contact-wm">HI</div>

      <div className="contact-inner">
        <div className="rv">
          <div className="eyebrow">05 — Contact</div>
          <h2 className="display">Let's build<br />something <em>great</em></h2>
          <p className="contact-sub">
            Have an idea, opportunity or want to say hello? I respond within
            24 hours — let's connect and make it happen.
          </p>
        </div>

        <div className="contact-body">

          {/* ── Form ── */}
          <div className="rv-l" style={{ transitionDelay:".1s" }}>
            {status === "ok" ? (
              <div className="cf-ok">
                <span className="cf-ok-ico">🎉</span>
                <div className="cf-ok-title">Message Sent!</div>
                <p className="cf-ok-sub">Thanks! I'll reply within 24 hours.</p>
                <button
                  className="cf-btn"
                  style={{ marginTop:"1.5rem", cursor:"pointer" }}
                  onClick={() => setStatus("idle")}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form className="cf" onSubmit={submit} noValidate>

                {/* Honeypot — hidden, catches bots, keep this */}
                <input type="checkbox" name="botcheck" style={{ display:"none" }} />

                <div className="cf-f">
                  <label className="cf-l" htmlFor="cf-name">Your Name</label>
                  <input
                    id="cf-name" name="name" className="cf-i"
                    type="text" placeholder="John Doe" required
                    value={form.name} onChange={set("name")}
                  />
                </div>

                <div className="cf-f">
                  <label className="cf-l" htmlFor="cf-email">Email Address</label>
                  <input
                    id="cf-email" name="email" className="cf-i"
                    type="email" placeholder="hello@example.com" required
                    value={form.email} onChange={set("email")}
                  />
                </div>

                <div className="cf-f">
                  <label className="cf-l" htmlFor="cf-msg">Message</label>
                  <textarea
                    id="cf-msg" name="message" className="cf-t"
                    placeholder="Tell me about your project or idea..."
                    required rows={5}
                    value={form.msg} onChange={set("msg")}
                  />
                </div>

                {status === "error" && (
                  <div style={{
                    fontFamily:"var(--f-mono)", fontSize:".7rem", color:"#f43f5e",
                    padding:".65rem 1rem", borderRadius:"8px",
                    background:"rgba(244,63,94,.08)",
                    border:"1px solid rgba(244,63,94,.2)",
                    letterSpacing:".04em"
                  }}>
                    ⚠ Something went wrong — try emailing me at av4862187@gmail.com
                  </div>
                )}

                <button className="cf-btn" type="submit" disabled={status === "sending"}>
                  {status === "sending"
                    ? <><div className="cf-spin" /> Sending…</>
                    : "Send Message →"}
                </button>

              </form>
            )}
          </div>

          {/* ── Info ── */}
          <div className="rv-r ci" style={{ transitionDelay:".15s" }}>
            <div className="ci-div" />
            <div className="socials">
              {SOCIALS.map(s => (
                <a key={s.lbl} href={s.href} className="soc"
                  target="_blank" rel="noopener noreferrer">
                  <span className="soc-ico">{s.ico}</span>
                  <span className="soc-lbl">{s.lbl}</span>
                  <span className="soc-arr">↗</span>
                </a>
              ))}
            </div>
            <div className="status-p">
              <div className="sp-dot" />
              <span className="sp-txt">Open to internships &amp; freelance</span>
            </div>
          </div>

        </div>

        <div className="footer rv" style={{ transitionDelay:".25s" }}>
          <p className="footer-c">
            Crafted with ♥ by <em>Anshul Verma</em> · {new Date().getFullYear()}
          </p>
          <a href="#hero" className="footer-top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}