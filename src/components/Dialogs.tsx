import { useEffect, useRef } from "react";
import { DETAILS, DETAILS_DEFAULT, SERVICES, serviceImg } from "../data/site";
import { orderLink, useApp } from "../context";
import { Icon } from "../hooks";

/** Opens a native <dialog> while `open` is true and locks page scrolling behind it. */
function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) { d.showModal(); document.body.style.overflow = "hidden"; }
    if (!open && d.open) d.close();
  }, [open]);
  return {
    ref,
    onClose: () => { document.body.style.overflow = ""; onClose(); },
    onClick: (e: React.MouseEvent) => { if (e.target === e.currentTarget) ref.current?.close(); }   // click outside to close
  };
}

export function DetailsDialog({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { t, pick, lang } = useApp();
  const dlg = useDialog(index !== null, onClose);
  const s = index !== null ? SERVICES[index] : null;
  const need = s ? (DETAILS[s.en] || DETAILS_DEFAULT)[lang] : [];
  return (
    <dialog {...dlg} aria-labelledby="dTitle">
      {s && (
        <div className="dlg">
          <img className="dimg" src={serviceImg(s.en)} alt="" />
          <h3 id="dTitle">{pick(s)}</h3>
          <p style={{ color: "var(--muted)" }}>{pick(s, "d")}</p>
          <div><h4>{t("need_h")}</h4><ul>{need.map(x => <li key={x}>{x}</li>)}</ul></div>
          <div className="row">
            <a className="btn btn-wa btn-sm" target="_blank" rel="noopener" href={orderLink(s.en)}><Icon id="wa" /><span>{t("order")}</span></a>
            <button className="btn btn-outline btn-sm" type="button" onClick={() => dlg.ref.current?.close()}>{t("close")}</button>
          </div>
        </div>
      )}
    </dialog>
  );
}
