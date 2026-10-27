import { useState } from "react";
import { CATEGORIES, SERVICES, serviceImg } from "../data/site";
import { orderLink, useApp } from "../context";
import { Icon, Reveal } from "../hooks";

export default function Services({ onDetails }: { onDetails: (i: number) => void }) {
  const { t, pick, lang } = useApp();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const list = SERVICES.map((s, i) => ({ s, i })).filter(({ s }) =>
    (cat === "all" || s.cat === cat) && (!query || [s.en, s.ur, s.den, s.dur].join(" ").toLowerCase().includes(query)));

  return (
    <section id="services">
      <div className="container">
        <Reveal className="svc-head">
          <div>
            <span className="svc-pill">{t("svc_eyebrow")}</span>
            <h2 className="svc-title">{t("svc_title")}</h2>
            <p className="svc-sub">{t("svc_lead")}</p>
          </div>
          <div className="search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 105.3 14l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" /></svg>
            <input type="search" placeholder={t("search_ph")} aria-label="Search services" autoComplete="off" value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </Reveal>

        <div className="svc-pills" role="group" aria-label="Service categories">
          {CATEGORIES.map(c => <button key={c.id} type="button" aria-pressed={c.id === cat} onClick={() => setCat(c.id)}>{lang === "ur" ? c.ur : c.en}</button>)}
        </div>

        <div className="svc-grid" aria-live="polite">
          {list.map(({ s, i }, k) => (
            <article key={s.en} className="svc-card reveal in" style={{ ["--d" as string]: `${Math.min(k, 8) * 60}ms` }}>
              <img src={serviceImg(s.en)} alt="" loading="lazy" decoding="async" />
              <div className="svc-glass">
                <h3><span aria-hidden="true">{s.icon}</span> {pick(s)}</h3>
                <p>{pick(s, "d")}</p>
                {s.from && <div className="from" dir="ltr">{s.from}</div>}
                <div className="svc-acts">
                  <button type="button" className="svc-view" onClick={() => onDetails(i)}>{t("details")}</button>
                  <a className="svc-go" target="_blank" rel="noopener" href={orderLink(s.en)} aria-label={`${t("order")}: ${pick(s)}`} title={t("order")}><Icon id="wa" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!list.length && <p className="empty">{t("empty")}</p>}
      </div>
    </section>
  );
}
