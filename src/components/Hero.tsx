import { useEffect, useMemo, useState } from "react";
import { CONFIG, SERVICES, serviceImg } from "../data/site";
import { useApp, waLink } from "../context";
import { Icon, reduceMotion, useSpin } from "../hooks";

const PROOF = ["Electrical Services", "Plumbing", "Renovation & Painting", "Property Consultancy"];

export default function Hero() {
  const { t, pick, lang } = useApp();
  const [rot, setRot] = useState(0);
  const spin = useSpin();

  useEffect(() => {
    if (reduceMotion()) return;
    const id = setInterval(() => setRot(r => r + 1), 2300);
    return () => clearInterval(id);
  }, []);

  const dots = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 37 + 8) % 100}%`, s: `${7 + (i * 5) % 9}s`, dl: `${-(i * 1.7)}s`, z: `${3 + (i % 4) * 2}px`
  })), []);
  const brands = SERVICES.map(s => `${s.icon} ${pick(s)}`);

  return (
    <section className="hero hero2">
      <div className="hero-bg" aria-hidden="true">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" />
        {dots.map((d, i) => <b key={i} className="dot" style={{ left: d.left, ["--s" as string]: d.s, ["--dl" as string]: d.dl, ["--z" as string]: d.z }} />)}
      </div>
      <div className="container hero-c">
        <div className="hero-mark" {...spin.wrapProps}>
          <img src="/assets/logo.jpg" alt="Pak Services — One Platform, Multiple Solutions" width={84} height={84} {...{ fetchpriority: "high" }} {...spin.imgProps} />
        </div>
        <span className="pill">{t("hero_pill")}</span>
        <h1>{t("hero_h1a")} <span className="gold-text">{t("hero_h1b")}</span></h1>
        <div className="rotline" aria-hidden="true">{t("rot_pre")} <b key={`${rot}-${lang}`} className="swap">{pick(SERVICES[rot % SERVICES.length])}</b></div>
        <p>{t("hero_sub")}</p>
        <div className="cta">
          <a className="btn btn-wa" href={waLink("Assalam o Alaikum! I would like to know more about Pak Services.")} target="_blank" rel="noopener"><Icon id="wa" /><span>{t("cta_chat")}</span></a>
          <a className="btn btn-ghost" href="#services">{t("cta_view")}</a>
          <a className="btn btn-ghost" href={`tel:${CONFIG.phoneTel}`}><span aria-hidden="true">📞</span> <span>{t("cta_call")}</span></a>
        </div>
        <div className="hero-proof">
          <div className="avs" aria-hidden="true">
            {PROOF.map(n => <img key={n} src={serviceImg(n)} alt="" width={44} height={44} />)}
            <span>12+</span>
          </div>
          <div className="proof-txt">
            <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
            <small>{t("g_from")}</small>
          </div>
        </div>
        <div className="hero-strip"><span><b>✓</b> <span>{t("s1")}</span></span><span><b>✓</b> <span>{t("s2")}</span></span><span><b>✓</b> <span>{t("s3")}</span></span></div>
      </div>
      <div className="hero-brands" aria-hidden="true">
        <div className="marq"><div className="row">{[...brands, ...brands].map((x, i) => <span key={i}>{x}</span>)}</div></div>
      </div>
    </section>
  );
}
