import { useState } from "react";
import { CITIES } from "../data/site";
import { useApp } from "../context";
import { Reveal, useMedia } from "../hooks";

export default function Cities() {
  const { t, lang } = useApp();
  const [active, setActive] = useState(0);
  const desk = useMedia("(min-width:768px)");
  const tracks = CITIES.map((_, i) => (i === active ? "5fr" : "1fr")).join(" ");
  return (
    <section className="cities" id="cities">
      <Reveal className="container center">
        <h2 className="title" style={{ fontSize: "1.6rem" }}>{t("cities_title")}</h2>
        <p className="lead">{t("cities_lead")}</p>
        <div className="chips" style={desk ? { gridTemplateColumns: tracks, gridTemplateRows: "1fr" } : { gridTemplateColumns: "1fr", gridTemplateRows: tracks }}>
          {CITIES.map((c, i) => {
            const n = lang === "ur" ? c.ur : c.en;
            return (
              <div key={c.en} className={`chip${c.live ? " live" : ""}`} tabIndex={0} data-active={i === active}
                onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} onFocus={() => setActive(i)}>
                <img className="cimg" src={`/${c.img}`} alt={n} />
                <div className="body">
                  <span className="vt">{n}</span>
                  <svg className="pin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>
                  <h3>{n}</h3>
                  <span className="tag">{c.live ? t("live") : t("soon")}</span>
                  <p className="d">{c.live ? t("city_live_d") : t("city_soon_d")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
