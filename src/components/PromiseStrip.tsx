import { useApp } from "../context";

const ITEMS: [string, string][] = [["🆓", "pr1"], ["✅", "pr2"], ["💬", "pr3"], ["🎧", "pr4"]];

export default function PromiseStrip() {
  const { t } = useApp();
  return (
    <section className="promise" aria-label="Our promise">
      <div className="container">
        <ul>{ITEMS.map(([e, k]) => <li key={k}><span>{e}</span><div><span>{t(k)}</span><small>{t(k + "s")}</small></div></li>)}</ul>
      </div>
    </section>
  );
}
