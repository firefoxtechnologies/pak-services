import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CONFIG, type Lang } from "./data/site";
import { I18N } from "./data/i18n";

export const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
};

type Theme = "light" | "dark";
interface Bilingual { en: string; ur: string; den?: string; dur?: string }

interface Ctx {
  lang: Lang;
  theme: Theme;
  t: (key: string) => string;
  pick: (o: Bilingual, f?: "d") => string;
  toggleLang: () => void;
  toggleTheme: () => void;
}
const AppCtx = createContext<Ctx>(null!);
export const useApp = () => useContext(AppCtx);

export const waLink = (msg: string) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
export const orderLink = (service: string) => waLink(`Assalam o Alaikum! I would like to order: ${service} (Pak Services)`);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (store.get("lang") === "ur" ? "ur" : "en"));
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = store.get("theme");
    if (saved === "dark" || saved === "light") return saved;
    return "light";   // light by default; the toggle (and a saved choice) still switch to dark
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", theme === "dark" ? "#071430" : "#0a1f44");
  }, [theme]);

  const t = useCallback((k: string) => I18N[lang][k] || I18N.en[k] || k, [lang]);
  const pick = useCallback((o: Bilingual, f?: "d") =>
    lang === "ur" ? (f ? o.dur || o.den! : o.ur) : (f ? o.den! : o.en), [lang]);

  const value = useMemo<Ctx>(() => ({
    lang, theme, t, pick,
    toggleLang: () => setLang(l => { const n = l === "ur" ? "en" : "ur"; store.set("lang", n); return n; }),
    toggleTheme: () => setTheme(th => { const n = th === "dark" ? "light" : "dark"; store.set("theme", n); return n; })
  }), [lang, theme, t, pick]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
