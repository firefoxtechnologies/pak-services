import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryItem = { src: string; alt?: string };

interface Props {
  items: GalleryItem[];
  index: number;
  onIndexChange: (i: number) => void;
  height?: string;
  autoplay?: number;
}

const wrap = (i: number, n: number) => (n <= 0 ? 0 : ((i % n) + n) % n);

const Chevron = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={dir === "l" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
  </svg>
);

/** Poster gallery: one image at a time (shown whole on navy), arrows, swipe, keys, thumbnails. */
export default function Gallery({ items, index, onIndexChange, height = "min(76vh, 640px)", autoplay = 0 }: Props) {
  const n = items.length;
  const active = wrap(index, n);
  const [paused, setPaused] = useState(false);
  const swipe = useRef<number | null>(null);
  const go = useCallback((i: number) => onIndexChange(wrap(i, n)), [n, onIndexChange]);

  useEffect(() => {
    if (!autoplay || paused || n < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(active + 1), autoplay);
    return () => clearInterval(id);
  }, [autoplay, paused, active, go, n]);

  useEffect(() => {
    const on = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
  };

  return (
    <>
      <div className="mg-stage" style={{ height }} role="region" aria-roledescription="carousel" aria-label="Campaign gallery" tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={e => { swipe.current = e.clientX; }}
        onPointerUp={e => { const x = swipe.current; swipe.current = null; if (x !== null && Math.abs(e.clientX - x) > 48) go(active + (e.clientX < x ? 1 : -1)); }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        {items.map((it, i) => (
          <img key={it.src} className="mg-fb" src={it.src} alt={it.alt ?? ""} draggable={false}
            loading={i === 0 ? "eager" : "lazy"} style={{ opacity: i === active ? 1 : 0 }} aria-hidden={i !== active} />
        ))}
        {n > 1 && (<>
          <button type="button" className="mg-arrow prev" onClick={() => go(active - 1)} aria-label="Previous image"><Chevron dir="l" /></button>
          <button type="button" className="mg-arrow next" onClick={() => go(active + 1)} aria-label="Next image"><Chevron dir="r" /></button>
        </>)}
        <span className="sr" aria-live="polite">{items[active]?.alt ?? `Image ${active + 1}`} — {active + 1} of {n}</span>
      </div>
      {n > 1 && (
        <ul className="mg-thumbs">
          {items.map((it, i) => (
            <li key={it.src}>
              <button type="button" onClick={() => go(i)} aria-current={i === active} aria-label={it.alt ? `Show ${it.alt}` : `Show image ${i + 1}`}>
                <img src={it.src} alt="" width={56} height={70} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
