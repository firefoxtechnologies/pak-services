import { useState } from "react";
import { CONFIG, SERVICES } from "../data/site";
import { useApp, waLink } from "../context";
import { Icon, Reveal } from "../hooks";
import { validPK } from "./forms";

type Mail = { kind: "wait" | "ok" | "fail"; } | null;

export default function Contact() {
  const { t, pick } = useApp();
  const empty = { name: "", phone: "", service: "", msg: "", honey: "" };
  const [v, setV] = useState(empty);
  const [err, setErr] = useState({ name: "", phone: "", service: "" });
  const [mail, setMail] = useState<Mail>(null);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  const validate = () => {
    const next = { name: v.name.trim().length < 2 ? "e_name" : "", phone: validPK(v.phone.trim()) ? "" : "e_phone", service: v.service ? "" : "e_service" };
    setErr(next);
    return !next.name && !next.phone && !next.service;
  };
  const text = () => `Assalam o Alaikum! I need: ${v.service}\nName: ${v.name.trim()}\nPhone: ${v.phone.trim()}` + (v.msg.trim() ? `\nMessage: ${v.msg.trim()}` : "");

  const sendMail = async () => {
    if (!validate() || v.honey) return;       // honeypot: bots fill the hidden field
    const subject = "Service request: " + v.service;
    setBusy(true); setMail({ kind: "wait" });
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: v.name.trim(), phone: v.phone.trim(), service: v.service, message: v.msg.trim(), _subject: subject, _template: "table", _captcha: "false" })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false || data.success === "false") throw new Error("send failed");
      setMail({ kind: "ok" }); setV(empty);
    } catch {
      setMail({ kind: "fail" });
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text())}`;
    } finally { setBusy(false); }
  };

  const pin = `${CONFIG.mapLat},${CONFIG.mapLng}`;
  const field = (k: "name" | "phone" | "service", label: string, children: React.ReactNode) => (
    <div className={`field${err[k] ? " bad" : ""}`}><label className="sr" htmlFor={`f-${k}`}>{label}</label>{children}<div className="err">{err[k] && t(err[k])}</div></div>
  );

  const addr = CONFIG.address.replace(/^Pak Services, /, "");
  const sv = (d: React.ReactNode) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
  const info = (icon: React.ReactNode, title: string, lines: React.ReactNode[]) => (
    <div className="cinfo">
      <span className="cico">{icon}</span>
      <div><h4>{title}</h4>{lines.map((l, i) => <p key={i}>{l}</p>)}</div>
    </div>
  );
  const ph = (label: string) => label.replace(/ \(optional\)| \(اختیاری\)/, "");

  return (
    <section className="why" id="contact">
      <div className="container cgrid">
        <Reveal className="cside">
          <h2 className="ctitle">{t("ct_title")}</h2>
          <div className="cinfos">
            {info(sv(<><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>), t("loc_h"),
              [<a href={`https://www.google.com/maps/search/?api=1&query=${pin}`} target="_blank" rel="noopener">{addr}</a>])}
            {info(sv(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>), "Email",
              [<a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>])}
            {info(sv(<path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1l-2.2 2.2z" />), t("f_phone"),
              [<a href={waLink("Assalam o Alaikum!")} target="_blank" rel="noopener" dir="ltr">{CONFIG.displayPhone}</a>])}
            {info(sv(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" /></>), t("foot_follow"),
              [<a className="clink fb" href={CONFIG.facebook} target="_blank" rel="noopener"><Icon id="fb" className="" />pakservicespvtltd</a>, <a className="clink ig" href={CONFIG.instagram} target="_blank" rel="noopener"><Icon id="ig" className="" />@pakservices2026</a>])}
          </div>

          <h3 className="cq">{t("ct_lead")}</h3>
          <form className="cform" noValidate onSubmit={e => { e.preventDefault(); if (validate()) window.open(waLink(text()), "_blank", "noopener"); }}>
            {field("name", t("f_name"), <input id="f-name" autoComplete="name" required placeholder={t("f_name")} value={v.name} onChange={set("name")} aria-invalid={!!err.name} />)}
            {field("phone", t("f_phone"), <input id="f-phone" type="tel" inputMode="tel" placeholder={t("f_phone")} autoComplete="tel" required value={v.phone} onChange={set("phone")} aria-invalid={!!err.phone} />)}
            {field("service", t("f_service"), (
              <select id="f-service" required value={v.service} onChange={set("service")} aria-invalid={!!err.service}>
                <option value="">{t("f_service")}</option>
                {SERVICES.map(s => <option key={s.en} value={s.en}>{pick(s)}</option>)}
              </select>
            ))}
            <div className="field"><label className="sr" htmlFor="f-msg">{t("f_msg")}</label><textarea id="f-msg" placeholder={ph(t("f_msg"))} value={v.msg} onChange={set("msg")} /></div>
            <div className="form-btns">
              <button className="btn btn-navy" type="submit"><span>{t("f_send")}</span><Icon id="wa" /></button>
              <button className="btn btn-outline" type="button" disabled={busy} onClick={sendMail}>{t("f_mail")}</button>
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.honey} onChange={set("honey")} style={{ position: "absolute", insetInlineStart: 0, width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
            <p role="status" style={{ fontSize: ".88rem", minHeight: "1.2em", color: mail?.kind === "ok" ? "var(--green)" : mail?.kind === "fail" ? "#d93025" : "var(--muted)" }}>
              {mail && t(mail.kind === "wait" ? "mail_wait" : mail.kind === "ok" ? "mail_ok" : "mail_fail")}
            </p>
          </form>
        </Reveal>
        <Reveal className="cmapbox"><iframe title="Pak Services office location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${pin}&z=16&output=embed`} /></Reveal>
      </div>
    </section>
  );
}
