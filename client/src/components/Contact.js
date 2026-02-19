import React, { useState } from "react";
import "../styles/Sections.css";

const SOCIALS = [
  { ico:"🐙", lbl:"GitHub",   href:"https://github.com/anshulverma" },
  { ico:"💼", lbl:"LinkedIn", href:"https://linkedin.com/in/anshulverma" },
  { ico:"🐦", lbl:"Twitter",  href:"https://twitter.com/anshulverma" },
  { ico:"📧", lbl:"Email",    href:"mailto:anshul@example.com" },
];

export default function Contact() {
  const [form, setForm]       = useState({ name:"", email:"", msg:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  return (
    <section className="contact-sec" id="contact">
      <div className="contact-wm">HI</div>

      <div className="contact-inner">
        <div className="rv">
          <div className="eyebrow">04 — Contact</div>
          <h2 className="display">Let's build<br />something <em>great</em></h2>
          <p className="contact-sub">
            Have an idea, opportunity or want to say hello? I respond within 24 hours — let's connect and make it happen.
          </p>
        </div>

        <div className="contact-body">
          {/* Form */}
          <div className="rv-l" style={{ transitionDelay: ".1s" }}>
            {done ? (
              <div className="cf-ok">
                <span className="cf-ok-ico">🎉</span>
                <div className="cf-ok-title">Message Sent!</div>
                <p className="cf-ok-sub">Thanks! I'll reply within 24 hours.</p>
              </div>
            ) : (
              <form className="cf" onSubmit={submit}>
                <div className="cf-f">
                  <label className="cf-l">Your Name</label>
                  <input className="cf-i" type="text" placeholder="John Doe"
                    value={form.name} onChange={set("name")} required />
                </div>
                <div className="cf-f">
                  <label className="cf-l">Email Address</label>
                  <input className="cf-i" type="email" placeholder="hello@example.com"
                    value={form.email} onChange={set("email")} required />
                </div>
                <div className="cf-f">
                  <label className="cf-l">Message</label>
                  <textarea className="cf-t" placeholder="Tell me about your project or idea..."
                    value={form.msg} onChange={set("msg")} required />
                </div>
                <button className="cf-btn" type="submit" disabled={loading}>
                  {loading
                    ? <><div className="cf-spin" />Sending…</>
                    : "Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="rv-r ci" style={{ transitionDelay: ".15s" }}>
          

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

        <div className="footer rv" style={{ transitionDelay: ".25s" }}>
          <p className="footer-c">
            Crafted with ♥ by <em>Anshul Verma</em> · {new Date().getFullYear()}
          </p>
          <a href="#hero" className="footer-top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}