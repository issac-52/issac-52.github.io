import { useEffect, type ReactNode } from 'react';
import { siteConfig } from '@/shared/config/site';
import { useLanguageStore, type Language } from '@/shared/model/useLanguageStore';
import '@/widgets/modern-page/ui/editorial.css';
import './case-study.css';

/** Localized text. Japanese falls back to English where a translation is not written yet. */
export type L = { ko: string; en: string; ja?: string };

export function useT() {
  const language = useLanguageStore(s => s.language);
  return (text: L) => text[language] ?? text.en;
}

const ui = {
  back: { ko: '오이삭', en: 'Yisak Oh', ja: 'Yisak Oh' },
  role: { ko: '역할', en: 'Role', ja: '役割' },
  stack: { ko: '기술', en: 'Stack', ja: '技術' },
  sections: { ko: '상세 기록', en: 'Case study sections', ja: '詳細' },
  allProjects: { ko: '프로젝트 목록으로', en: 'Back to projects', ja: 'プロジェクト一覧へ' },
};

export const Arrow = () => <svg className="hp-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export interface CaseStudyProps {
  id: string;
  title: L;
  status: L;
  summary: L;
  role: L;
  stack: string[];
  links: { href: string; label: L }[];
  tabs?: { href: string; label: L; current: boolean }[];
  pageTitle?: L;
  children: ReactNode;
}

export function CaseStudy({ id, title, status, summary, role, stack, links, tabs, pageTitle, children }: CaseStudyProps) {
  const { language, setLanguage } = useLanguageStore();
  const t = useT();
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${t(pageTitle ?? title)} | ${t(ui.back)}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(summary));
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="hp cs">
    <a className="skip-link" href="#cs-main" onClick={event => { event.preventDefault(); document.getElementById('cs-main')?.focus(); }}>{t({ ko: '본문으로 바로가기', en: 'Skip to content', ja: '本文へ' })}</a>
    <header className="hp-bar">
      <a href="#projects" className="hp-brand cs-back"><span aria-hidden="true">←</span> {t(ui.back)}</a>
      <div className="hp-lang" role="group" aria-label={t({ ko: '언어', en: 'Language', ja: '言語' })}>{(['ko', 'en', 'ja'] as Language[]).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{{ ko: '한국어', en: 'English', ja: '日本語' }[lang]}</button>)}</div>
    </header>
    <main id="cs-main" tabIndex={-1} className="hp-body cs-body">
      <header className="cs-head">
        <div className={'hp-thumb cs-thumb ' + id} aria-hidden="true">{id === 'meter-admin'
          ? <img src="/notebook/cover.svg" alt=""/>
          : id === 'weekly-blog' ? <span>Browinfo</span>
          : <img src="/water-study.webp" alt=""/>}</div>
        <p className="cs-status">{t(status)}</p>
        <h1>{t(title)}</h1>
        <p className="cs-summary">{t(summary)}</p>
        <dl className="cs-meta">
          <div><dt>{t(ui.role)}</dt><dd>{t(role)}</dd></div>
          <div><dt>{t(ui.stack)}</dt><dd>{stack.join(', ')}</dd></div>
        </dl>
        {links.length > 0 && <ul className="cs-links">{links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{t(link.label)}<Arrow/></a></li>)}</ul>}
        {tabs && <nav className="cs-tabs" aria-label={t(ui.sections)}>{tabs.map(tab => <a key={tab.href} href={tab.href} aria-current={tab.current ? 'page' : undefined}>{t(tab.label)}</a>)}</nav>}
      </header>
      {children}
    </main>
    <footer className="hp-foot">
      <a className="hp-email" href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
      <p>© {new Date().getFullYear()} {t(ui.back)} · <a href="#projects">{t(ui.allProjects)}</a></p>
    </footer>
  </div>;
}

export function Section({ title, children }: { title: L; children: ReactNode }) {
  const t = useT();
  return <section className="cs-section"><h2>{t(title)}</h2>{children}</section>;
}

export function Prose({ children }: { children: L | L[] }) {
  const t = useT();
  return <>{(Array.isArray(children) ? children : [children]).map(p => <p key={p.en} className="cs-prose">{t(p)}</p>)}</>;
}

/** Ordered workflow — the content really is a sequence, so it is numbered. */
export function Flow({ steps }: { steps: L[] }) {
  const t = useT();
  return <ol className="cs-flow">{steps.map(step => <li key={step.en}>{t(step)}</li>)}</ol>;
}

export function Decisions({ items }: { items: { title: L; body: L }[] }) {
  const t = useT();
  return <dl className="cs-decisions">{items.map(item => <div key={item.title.en}><dt>{t(item.title)}</dt><dd>{t(item.body)}</dd></div>)}</dl>;
}

export function Bullets({ items }: { items: L[] }) {
  const t = useT();
  return <ul className="cs-bullets">{items.map(item => <li key={item.en}>{t(item)}</li>)}</ul>;
}

export function Diagram({ path, stores, caption }: { path: { name: string; role: L }[]; stores: L[]; caption: L }) {
  const t = useT();
  return <figure className="cs-diagram">
    <ol>{path.map(node => <li key={node.name}><b>{node.name}</b><span>{t(node.role)}</span></li>)}</ol>
    <ul>{stores.map(store => <li key={store.en}>{t(store)}</li>)}</ul>
    <figcaption>{t(caption)}</figcaption>
  </figure>;
}

export function Metrics({ items }: { items: { value: string; label: L }[] }) {
  const t = useT();
  return <dl className="cs-metrics">{items.map(item => <div key={item.label.en}><dt>{t(item.label)}</dt><dd>{item.value}</dd></div>)}</dl>;
}

const choiceUi = {
  over: { ko: '대안', en: 'Instead of', ja: '代替案' },
  cost: { ko: '감수한 점', en: 'Trade-off', ja: '引き受けた点' },
};

/** Technology choices: what was picked, over what, why, and what it costs. */
export function Choices({ items }: { items: { choice: L; over: L; why: L; cost?: L }[] }) {
  const t = useT();
  return <dl className="cs-choices">{items.map(item => <div key={item.choice.en}>
    <dt><span>{t(item.choice)}</span><small>{t(choiceUi.over)}: {t(item.over)}</small></dt>
    <dd><p>{t(item.why)}</p>{item.cost && <p className="cs-cost"><b>{t(choiceUi.cost)}</b> {t(item.cost)}</p>}</dd>
  </div>)}</dl>;
}
