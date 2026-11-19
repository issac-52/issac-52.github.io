import { create } from 'zustand';
export type Language = 'ko' | 'en' | 'ja';
const initialLanguage = (): Language => {
  const value = new URLSearchParams(window.location.search).get('lang');
  if (value === 'en' || value === 'ko' || value === 'ja') return value;
  try { const stored = localStorage.getItem('portfolio-language'); return stored === 'en' || stored === 'ja' ? stored : 'ko'; } catch { return 'ko'; }
};
export const useLanguageStore = create<{ language: Language; setLanguage: (language: Language) => void }>((set) => ({
  language: initialLanguage(),
  setLanguage: (language) => {
    try { localStorage.setItem('portfolio-language', language); } catch { /* Storage may be disabled. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(null, '', url);
    set({ language });
  },
}));
