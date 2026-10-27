import { useState } from "react";
import { SERVICES } from "../data/site";
import { useApp, waLink } from "../context";
import { Icon } from "../hooks";
import { validPK } from "./forms";

export default function QuickQuote() {
  const { t, pick } = useApp();
  const [v, setV] = useState({ name: "", phone: "", service: "" });
  const [err, setErr] = useState({ name: "", phone: "", service: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = v.name.trim(), p = v.phone.trim();
    const next = { name: n.length < 2 ? "e_name" : "", phone: validPK(p) ? "" : "e_phone", service: v.service ? "" : "e_service" };
    setErr(next);
    if (!next.name && !next.phone && !next.service)
      window.open(waLink(`Assalam o Alaikum! Please send me a free quote for: ${v.service}\nName: ${n}\nPhone: ${p}`), "_blank", "noopener");
  };

  const field = (k: "name" | "phone" | "service", label: string, input: React.ReactNode) => (
    <div className={`field${err[k] ? " bad" : ""}`}>
      <label className="sr" htmlFor={`q-${k}`}>{label}</label>{input}
      <div className="err">{err[k] && t(err[k])}</div>
    </div>
  );

  return (
    <section className="quick" aria-labelledby="qh">
      <div className="container">
        <form onSubmit={submit} noValidate>
          <h2 id="qh"><span>{t("q_title")}</span><small>{t("q_sub")}</small></h2>
          {field("name", t("f_name"), <input id="q-name" autoComplete="name" placeholder={t("f_name")} value={v.name} onChange={e => setV({ ...v, name: e.target.value })} aria-invalid={!!err.name} />)}
          {field("phone", t("f_phone"), <input id="q-phone" type="tel" inputMode="tel" placeholder="03XX-XXXXXXX" autoComplete="tel" value={v.phone} onChange={e => setV({ ...v, phone: e.target.value })} aria-invalid={!!err.phone} />)}
          {field("service", t("f_service"), (
            <select id="q-service" value={v.service} onChange={e => setV({ ...v, service: e.target.value })} aria-invalid={!!err.service}>
              <option value="">{t("choose")}</option>
              {SERVICES.map(s => <option key={s.en} value={s.en}>{pick(s)}</option>)}
            </select>
          ))}
          <button className="btn btn-wa" type="submit"><Icon id="wa" /><span>{t("q_btn")}</span></button>
        </form>
      </div>
    </section>
  );
}
