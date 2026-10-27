import { CONFIG, TIERS } from "../data/site";
import { useApp, waLink } from "../context";
import { CountUp, Icon, Reveal } from "../hooks";

export function Membership() {
  const { t, lang } = useApp();
  return (
    <section className="members" id="membership">
      <div className="container">
        <Reveal className="center">
          <span className="eyebrow">{t("mem_eyebrow")}</span>
          <h2 className="title">{t("mem_title")}</h2>
          <p className="lead">{t("mem_lead")}</p>
        </Reveal>
        <div className="mband">
          {TIERS.map((x, i) => (
            <Reveal key={x.cls} className="mstat" delay={i * 120}>
              <div className="mlabel">{lang === "ur" ? x.ur : x.en} {t("membership")}</div>
              <div className="mnum" dir="ltr"><CountUp end={x.lo} suffix="%" /><span className="mdash">–</span><CountUp end={x.hi} suffix="%" /></div>
              <p className="mdet"><strong>{t("discount")}</strong></p>
            </Reveal>
          ))}
        </div>
        <div className="pmarq" aria-label={t("mem_title")}>
          <div className="prow">
            {[1, 2].map(copy => [1, 2, 3, 4, 5].map(n => (
              <span key={`${copy}-${n}`} className="pitem2" aria-hidden={copy === 2}><i aria-hidden="true">✓</i>{t("perk" + n)}</span>
            )))}
          </div>
        </div>
        <div className="center acts" style={{ justifyContent: "center" }}>
          <a className="btn btn-gold" href={CONFIG.membershipForm} target="_blank" rel="noopener">📝 <span>{t("mem_form")}</span></a>
          <a className="btn btn-gold" href={CONFIG.affiliationForm} target="_blank" rel="noopener">🤝 <span>{t("aff_form")}</span></a>
          <a className="btn btn-ghost" href={waLink("Assalam o Alaikum! I want to join the Pak Services Membership.")} target="_blank" rel="noopener"><span>{t("mem_cta")}</span></a>
          <a className="btn btn-wa" href={CONFIG.channel} target="_blank" rel="noopener"><Icon id="wa" /><span>{t("chan")}</span></a>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useApp();
  return (
    <section id="how">
      <div className="container hgrid">
        <Reveal className="hleft">
          <span className="eyebrow">{t("how_eyebrow")}</span>
          <h2 className="htitle">{t("how_title")}</h2>
          <p className="lead">{t("how_lead")}</p>
        </Reveal>
        <ol className="hsteps">
          {[1, 2, 3, 4].map(n => (
            <Reveal as="li" key={n} className="hstep" delay={(n - 1) * 100}>
              <span className="hnum">{n}</span>
              <svg className="hchk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
              <div><h3>{t(`st${n}h`)}</h3><p>{t(`st${n}p`)}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const WHY: { k: string; t: string; d: string; icon: React.ReactNode }[] = [
  { k: "trust", t: "t1h", d: "t1p", icon: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></> },
  { k: "pro", t: "t2h", d: "t2p", icon: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" /></> },
  { k: "price", t: "pr3", d: "pr3s", icon: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" /><circle cx="7.5" cy="7.5" r="1.2" /></> },
  { k: "fast", t: "t3h", d: "t3p", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { k: "support", t: "t4h", d: "t4p", icon: <><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M21 18c0 2-2 3-5 3h-2" /></> },
  { k: "quote", t: "pr1", d: "pr1s", icon: <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></> }
];

export function WhyUs() {
  const { t, lang } = useApp();
  const item = (w: (typeof WHY)[number], i: number) => (
    <Reveal key={w.k} className={`witem w${i}`} delay={i * 90}>
      <div className="wtext" dir={lang === "ur" ? "rtl" : "ltr"}><h3>{t(w.t)}</h3><p>{t(w.d)}</p></div>
      <span className="wic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{w.icon}</svg></span>
    </Reveal>
  );
  return (
    <section className="why whyus" id="why">
      <div className="container">
        <Reveal className="center why-head">
          <span className="why-badge">{t("why_eyebrow")}</span>
          <h2 className="why-title">{t("why_title")}</h2>
        </Reveal>
        <div className="wgrid" dir="ltr">
          <div className="wcol left">{WHY.slice(0, 3).map((w, i) => item(w, i))}</div>
          <div className="wlogo"><div><img src="/assets/logo.jpg" alt="Pak Services" width={240} height={240} /></div></div>
          <div className="wcol right">{WHY.slice(3).map((w, i) => item(w, i + 3))}</div>
        </div>
        {/* EDIT: replace these sample numbers with your real stats */}
        <div className="stats">
          <Reveal className="stat" anim="zoom"><CountUp end={12} suffix="+" /><span>{t("stat1")}</span></Reveal>
          <Reveal className="stat" anim="zoom" delay={90}><CountUp end={30} suffix="%" /><span>{t("stat2")}</span></Reveal>
          <Reveal className="stat" anim="zoom" delay={180}><CountUp end={7} suffix=" days" /><span>{t("stat3")}</span></Reveal>
          <Reveal className="stat" anim="zoom" delay={270}><b>PK</b><span>{t("stat4")}</span></Reveal>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const { t } = useApp();
  return (
    <section id="faq">
      <div className="container">
        <Reveal className="center"><span className="eyebrow">FAQ</span><h2 className="title">{t("faq_title")}</h2></Reveal>
        <div className="faq">
          {[1, 2, 3, 4, 5].map(n => <Reveal as="details" key={n} delay={(n - 1) * 90}><summary>{t("q" + n)}</summary><p>{t("a" + n)}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}
