import { create } from 'zustand';
export type Language = 'ko' | 'en';
const initialLanguage = (): Language => {
  const value = new URLSearchParams(window.location.search).get('lang');
  if (value === 'en' || value === 'ko') return value;
  try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'ko'; } catch { return 'ko'; }
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
