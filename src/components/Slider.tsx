import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORIES, SERVICES, serviceImg } from "../data/site";
import { orderLink, useApp } from "../context";

import { Icon, Reveal } from "../hooks";

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "l" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7"} />
  </svg>
);

/** Card strip: tall photo cards you drag / swipe / scroll sideways, with prev + next buttons. */
export default function Slider({ onDetails }: { onDetails: (i: number) => void }) {
  const { t, pick, lang } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const update = useCallback(() => {
    const el = trackRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < max);
  }, []);

  useEffect(() => {
    update();
    addEventListener("resize", update);
    return () => removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current; if (!el) return;
    const card = el.querySelector<HTMLElement>(".wcard");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };

  // mouse drag-to-scroll (touch already scrolls natively)
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current!;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => { drag.current.down = false; setTimeout(() => { drag.current.moved = false; }, 0); };

  const catName = (id: string) => { const c = CATEGORIES.find(x => x.id === id); return c ? (lang === "ur" ? c.ur : c.en) : ""; };

  return (
    <section className="show" id="showcase" aria-label="Services">
      <Reveal className="container center">
        <span className="eyebrow">{t("show_eyebrow")}</span>
        <h2 className="title show-title">{t("show_title")}</h2>
      </Reveal>
      <div className="wtrack" ref={trackRef} dir="ltr" onScroll={update}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
        {SERVICES.map((s, i) => (
          <article key={s.en} className="wcard" dir={lang === "ur" ? "rtl" : "ltr"}>
            <img src={serviceImg(s.en)} alt="" loading="lazy" decoding="async" draggable={false} />
            <div className="wtxt">
              <p className="wcat">{catName(s.cat)}</p>
              <h3>{pick(s)}</h3>
              <p className="wdesc">{pick(s, "d")}</p>
            </div>
            <div className="wacts">
              <a className="btn btn-gold btn-sm" target="_blank" rel="noopener" href={orderLink(s.en)} onClick={e => { if (drag.current.moved) e.preventDefault(); }}><Icon id="wa" />{t("order")}</a>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => { if (!drag.current.moved) onDetails(i); }}>{t("details")}</button>
            </div>
          </article>
        ))}
      </div>
      <div className="container wctrl">
        <button type="button" className="wbtn" onClick={() => step(-1)} disabled={!canPrev} aria-label="Previous"><Arrow dir="l" /></button>
        <button type="button" className="wbtn" onClick={() => step(1)} disabled={!canNext} aria-label="Next"><Arrow dir="r" /></button>
      </div>
    </section>
  );
}
