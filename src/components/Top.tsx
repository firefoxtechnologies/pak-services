import { useEffect, useRef, useState } from "react";
import { CONFIG } from "../data/site";
import { store, useApp } from "../context";
import { useSpin } from "../hooks";

export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      if (ref.current) ref.current.style.transform = `scaleX(${h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)})`;
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

export function Announcement() {
  const { lang, t } = useApp();
  const [closed, setClosed] = useState(() => !!store.get("annClosed"));
  const a = CONFIG.announcement;
  if (!a || closed) return null;
  return (
    <div className="ann">
      <div className="container">
        <span>{lang === "ur" ? a.ur : a.en}</span>
        <a href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Assalam o Alaikum! I want to join the Pak Services Membership.")}`} target="_blank" rel="noopener">{t("ann_btn")}</a>
        <button aria-label="Close announcement" onClick={() => { setClosed(true); store.set("annClosed", "1"); }}>✕</button>
      </div>
    </div>
  );
}

const LINKS: [string, string][] = [
  ["services", "nav_services"], ["how", "nav_how"], ["work", "nav_work"], ["membership", "nav_membership"],
  ["tools", "nav_tools"], ["faq", "nav_faq"], ["contact", "nav_contact"]
];

export function Navbar() {
  const { lang, theme, t, toggleLang, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");
  const spin = useSpin();

  useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > 10);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => { if (!(e.target as Element).closest("#links, #burger")) setOpen(false); };
    // highlight the nav link of the section currently in view (last one whose top passed 40% of the screen)
    const spy = () => {
      const line = innerHeight * 0.4, atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
      let cur = "";
      for (const [id] of LINKS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) cur = id; }
      setCurrent(atEnd ? "contact" : cur);
    };
    addEventListener("scroll", spy, { passive: true }); spy();
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { removeEventListener("scroll", spy); removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-in">
        <a className="brand" href="#top" aria-label="Pak Services home" {...spin.wrapProps}>
          <img src="/assets/logo.jpg" alt="Pak Services logo" width={44} height={44} {...spin.imgProps} />
          <span>Pak Services</span>
        </a>
        <nav className={`links${open ? " open" : ""}`} id="links" aria-label="Main" onClick={e => { if ((e.target as Element).tagName === "A") setOpen(false); }}>
          {LINKS.map(([id, k]) => <a key={id} href={`#${id}`} aria-current={current === id ? "true" : undefined}>{t(k)}</a>)}
        </nav>
        <div className="tools">
          <button className="icon-btn" aria-label="Switch language English / Urdu" onClick={toggleLang}>{lang === "ur" ? "EN" : "اردو"}</button>
          <button className="icon-btn" aria-label="Toggle light and dark mode" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button className="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded={open} aria-controls="links" onClick={() => setOpen(o => !o)}>☰</button>
        </div>
      </div>
    </header>
  );
}
