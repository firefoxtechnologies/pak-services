import { useState } from "react";
import { SLABS, SURCHARGE } from "../data/site";
import { useApp, waLink } from "../context";
import { Icon, Reveal } from "../hooks";

function taxFor(income: number) {
  let lower = 0;
  for (const [upper, rate, base] of SLABS) {
    if (income <= upper) {
      let tax = base + rate * (income - lower);
      if (income > SURCHARGE.above) tax *= 1 + SURCHARGE.rate;
      return tax;
    }
    lower = upper;
  }
  return 0;
}
const rs = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-PK");

export default function TaxTool() {
  const { t } = useApp();
  const [salary, setSalary] = useState("150000");
  const m = Math.max(0, Number(salary) || 0), a = m * 12, tx = taxFor(a);
  const rows: [string, string][] = [["calc_annual", rs(a)], ["calc_month", rs(tx / 12)], ["calc_net", rs(m - tx / 12)]];
  return (
    <section id="tools">
      <div className="container">
        <Reveal className="taxgrid">
          <div className="tax-in">
            <span className="tax-eyebrow">{t("tools_eyebrow")} /</span>
            <h2 className="tax-title">{t("tools_title")}</h2>
            <p className="lead">{t("tools_lead")}</p>
            <label className="tax-label" htmlFor="salary">{t("calc_label")}</label>
            <div className="tax-field">
              <span>Rs.</span>
              <input id="salary" type="number" inputMode="numeric" min={0} step={1000} placeholder="e.g. 150000" value={salary} onChange={e => setSalary(e.target.value)} />
            </div>
            <a className="btn btn-gold" target="_blank" rel="noopener"
              href={waLink(`Assalam o Alaikum! I want to file my tax return. Monthly salary: ${rs(m)} (estimated annual tax ${rs(tx)}).`)}>
              <Icon id="wa" /><span>{t("calc_cta")}</span></a>
          </div>
          <div className="tax-out" aria-live="polite">
            <span className="tax-label">{t("calc_tax")}</span>
            <div className="tax-big">{rs(tx)}</div>
            <ul className="tax-list">
              {rows.map(([k, v]) => <li key={k}><span>{t(k)}</span><b>{v}</b></li>)}
            </ul>
            <p className="tax-note">{t("calc_note")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
