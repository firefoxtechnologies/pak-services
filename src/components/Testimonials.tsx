import { useEffect, useState } from "react";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "../data/site";
import { useApp } from "../context";
import { Reveal, reduceMotion } from "../hooks";

export default function Testimonials() {
  const { t } = useApp();
  const [cur, setCur] = useState(0);
  // Restarts the 6s timer whenever the visitor picks a review by hand.
  useEffect(() => {
    if (reduceMotion() || REVIEWS.length < 2) return;
    const id = setInterval(() => setCur(c => (c + 1) % REVIEWS.length), 6000);
    return () => clearInterval(id);
  }, [cur]);

  return (
    <section className="why" id="reviews">
      <div className="container">
        <div className="tgrid">
          <Reveal className="tl">
            <span className="tbadge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" /></svg><span>{t("rev_eyebrow")}</span></span>
            <h2 className="title">{t("rev_title")}</h2>
            <p className="lead">{t("g_from")}</p>
            <div className="tdots">{REVIEWS.map((r, i) => <button key={r.name} type="button" aria-label={`Review ${i + 1}`} className={i === cur ? "on" : ""} onClick={() => setCur(i)} />)}</div>
            <a className="btn btn-outline btn-sm" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">{t("g_all")}</a>
          </Reveal>
          <Reveal className="tr" style={{ ["--d" as string]: "0ms" }}>
            <div aria-live="polite" style={{ position: "absolute", inset: 0 }}>
              {REVIEWS.map((r, i) => (
                <figure key={r.name} className={`tcard${i === cur ? " on" : ""}`}>
                  <div className="stars" aria-label="5 stars">★★★★★</div>
                  <blockquote>“{r.text}”</blockquote>
                  <hr />
                  <figcaption><span className="av">{r.name.charAt(0)}</span><span><b>{r.name}</b><small>{t("g_ver")}</small></span></figcaption>
                </figure>
              ))}
            </div>
            <span className="tdeco d1" /><span className="tdeco d2" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
