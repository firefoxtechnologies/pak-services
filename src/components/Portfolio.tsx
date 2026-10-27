import { useState } from "react";
import { PCATS, PORTFOLIO } from "../data/portfolio";
import { orderLink, useApp, waLink } from "../context";
import { Icon, Reveal } from "../hooks";
import Gallery from "./Gallery";

export default function Portfolio() {
  const { t, lang } = useApp();
  const [cat, setCat] = useState("all");
  const [idx, setIdx] = useState(0);
  const list = PORTFOLIO.filter(x => cat === "all" || x.cat === cat);
  const x = list[idx] ?? list[0];
  const title = (p: typeof x) => (lang === "ur" ? p.ur : p.en);

  return (
    <section id="work">
      <div className="container">
        <Reveal className="center"><span className="eyebrow">{t("work_eyebrow")}</span><h2 className="title">{t("work_title")}</h2></Reveal>
        <div className="pcats tabs" role="group" aria-label="Portfolio categories">
          {PCATS.map(c => <button key={c.id} className="tab" type="button" aria-pressed={c.id === cat} onClick={() => { setCat(c.id); setIdx(0); }}>{lang === "ur" ? c.ur : c.en}</button>)}
        </div>
        <div className="mg">
          <Gallery key={cat} index={idx} onIndexChange={setIdx} autoplay={5000}
            items={list.map(p => ({ src: `/assets/portfolio/${p.f}.jpg`, alt: `${title(p)} — Pak Services` }))} />
          {x && (
            <div className="mg-cta">
              <a className="btn btn-gold" target="_blank" rel="noopener"
                href={x.svc ? orderLink(x.svc) : waLink(`Assalam o Alaikum! I saw "${x.en}" on your website and would like to know more.`)}>
                <Icon id="wa" /><span>{x.svc ? t("order") : t("cta_chat")}</span></a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
