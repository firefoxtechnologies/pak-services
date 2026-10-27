import { createElement, useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

export const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useMedia(query: string) {
  const [m, setM] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query), on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/** Fades an element up once it scrolls into view (uses the .reveal / .in CSS classes). */
export function Reveal({ as = "div", delay = 0, anim, className = "", style, children, ...rest }: {
  as?: ElementType; delay?: number; anim?: "zoom"; className?: string; style?: CSSProperties; children?: ReactNode; [k: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, {
    ref, ...rest,
    className: `${className} reveal${shown ? " in" : ""}`.trim(),
    "data-anim": anim,
    style: { ["--d" as string]: `${delay}ms`, ...style }
  }, children);
}

/** Counts a number up from 0 when it becomes visible. */
export function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [val, setVal] = useState(reduceMotion() ? end : 0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || !("IntersectionObserver" in window)) { setVal(end); return; }
    let raf = 0;
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 1400);
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);
  return <b ref={ref}>{val}{suffix}</b>;
}

/** Spins an image once on hover / tap / focus of its wrapper. */
export function useSpin() {
  const [spin, setSpin] = useState(false);
  return {
    wrapProps: { onPointerEnter: () => setSpin(true), onClick: () => setSpin(true), onFocus: () => setSpin(true) },
    imgProps: { className: spin ? "spin-once" : undefined, onAnimationEnd: () => setSpin(false) }
  };
}

export const Icon = ({ id, className = "i" }: { id: "wa" | "fb" | "ig"; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><use href={`#${id}`} /></svg>
);
