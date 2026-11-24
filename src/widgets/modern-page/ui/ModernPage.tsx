import { useEffect } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore, type Language } from '@/shared/model/useLanguageStore';
import './editorial.css';

type L3 = Record<Language, string>;

const skillLabels: Record<string, L3> = {
  BACKEND: { ko: '백엔드', en: 'Backend', ja: 'バックエンド' },
  FRONTEND: { ko: '프론트엔드', en: 'Frontend', ja: 'フロントエンド' },
  'DATA & MESSAGING': { ko: '데이터·메시징', en: 'Data & messaging', ja: 'データ・メッセージング' },
  'UI & API': { ko: 'UI·API 도구', en: 'UI & API tooling', ja: 'UI・APIツール' },
  DELIVERY: { ko: '빌드·배포', en: 'Build & delivery', ja: 'ビルド・デプロイ' },
  CLOUD: { ko: '클라우드', en: 'Cloud', ja: 'クラウド' },
  'AI TOOLS': { ko: 'AI 개발 도구', en: 'AI coding tools', ja: 'AI開発ツール' },
};

const education: { school: L3; detail: L3; period: string }[] = [
  { school: { ko: '한국방송통신대학교', en: 'Korea National Open University', ja: '韓国放送通信大学' }, detail: { ko: '3학년 재학 중', en: 'Enrolled, 3rd year', ja: '在学中（3年）' }, period: '' },
  { school: { ko: '인하공업전문대학교 정보통신과', en: 'Inha Technical College, Information & Communication Eng.', ja: '仁荷工業専門大学 情報通信科' }, detail: { ko: '졸업', en: 'Graduated', ja: '卒業' }, period: '2017.03 – 2021.02' },
];

const Arrow = () => <svg className="hp-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export function ModernPage() {
  const open = useDetailModalStore(s => s.open);
  const { language, setLanguage } = useLanguageStore();
  const t = (text: L3) => text[language];
  const pick = (ko: string, en: string, ja: string) => t({ ko, en, ja });
  const works = getWorks(language);
  const projectList = getProjects(language);
  const intro = pick('기업 업무 시스템의 API와 관리자 화면을 만듭니다.', 'I build APIs and admin screens for business systems.', '企業の業務システムのAPIと管理画面を作っています。');

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = pick('오이삭 | Java 중심 풀스택 개발자', 'Yisak Oh | Java-focused full-stack engineer', 'Yisak Oh | Java中心のフルスタックエンジニア');
    document.querySelector('meta[name="description"]')?.setAttribute('content', intro);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="hp" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기', 'Skip to content', '本文へ')}</a>
    <header className="hp-bar">
      <a href="#top" className="hp-brand">issac-52.github.io</a>
      <div className="hp-lang" role="group" aria-label={pick('언어', 'Language', '言語')}>{(['ko', 'en', 'ja'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{{ ko: '한국어', en: 'English', ja: '日本語' }[lang]}</button>)}</div>
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hp-hero" aria-labelledby="name-h">
        <div className="hp-hero-inner">
          <img className="hp-avatar" src="/sac-profile.png" alt="" width="132" height="132"/>
          <div>
            <p className="hp-hello">{pick('안녕하세요,', 'Hello, I’m', 'こんにちは、')}</p>
            <h1 id="name-h" className="hp-name">{pick('오이삭', 'Yisak Oh', 'Yisak Oh')}</h1>
            <p className="hp-role">{pick('Java 중심 풀스택 개발자', 'Java-focused full-stack engineer', 'Java中心のフルスタックエンジニア')}</p>
            <p className="hp-tagline">{intro}</p>
            <div className="hp-actions">
              <a className="hp-mail" href={'mailto:' + siteConfig.email}>{pick('이메일 보내기', 'Send an email', 'メールを送る')}</a>
              <a className="hp-icon" href={siteConfig.githubUrl} aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.43-2.21 1.14-2.99-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.14 1.77 1.14 2.99 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a>
              <a className="hp-icon" href={siteConfig.linkedinUrl} aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.3-1.96 2.62v5.04h-4v-11Z"/></svg></a>
            </div>
          </div>
        </div>
        <a className="hp-scroll" href="#experience"><span aria-hidden="true">↓</span> {pick('스크롤해서 보기', 'Scroll to explore', 'スクロールして見る')}</a>
      </section>

      <div className="hp-body">
        <section id="experience" className="hp-section" aria-labelledby="experience-h">
          <h2 id="experience-h">{pick('경력', 'Experience', '職歴')}</h2>
          <ol className="hp-list">{getExperiences(language).map(item => {
            const records = works.filter(work => work.experienceId === item.id);
            return <li key={item.id} className="hp-entry">
              <p className="hp-period">{item.period}</p>
              <div>
                <h3>{item.name}</h3>
                <p className="hp-sub">{item.role}</p>
                <p className="hp-desc">{item.desc}</p>
                <ul className="hp-notes" aria-label={pick('개발 기록', 'Engineering notes', '開発記録')}>{records.map(work => <li key={work.id}>
                  <button onClick={() => open({ kind: 'work', id: work.id })}>{work.title}<Arrow/></button>
                </li>)}</ul>
              </div>
            </li>;
          })}</ol>
        </section>

        <section id="projects" className="hp-section" aria-labelledby="projects-h">
          <h2 id="projects-h">{pick('프로젝트', 'Projects', 'プロジェクト')}</h2>
          <ul className="hp-list">{projectList.map(p => <li key={p.id} className="hp-entry hp-project">
            <div className={'hp-thumb ' + p.id} aria-hidden="true">{p.id === 'meter-admin'
              ? <img src="/notebook/cover.svg" alt=""/>
              : p.id === 'weekly-blog' ? <span>Browinfo</span>
              : <img src="/water-study.webp" alt=""/>}</div>
            <div>
              <p className="hp-status">{p.period}</p>
              <h3><a href={p.caseStudyHref} className="hp-cover-link">{p.name}<Arrow/></a></h3>
              <p className="hp-desc">{p.desc}</p>
              <p className="hp-stack">{p.tags.join(', ')}</p>
            </div>
          </li>)}</ul>
        </section>

        <section id="toolkit" className="hp-section" aria-labelledby="toolkit-h">
          <h2 id="toolkit-h">{pick('기술', 'Toolkit', '技術')}</h2>
          <dl className="hp-skills">{Object.entries(personalInfo.skills).map(([group, skills]) => <div key={group}><dt>{skillLabels[group] ? t(skillLabels[group]) : group}</dt><dd>{skills.join(', ')}</dd></div>)}</dl>
          <h3 className="hp-minor">{pick('학력', 'Education', '学歴')}</h3>
          <ul className="hp-edu">{education.map(item => <li key={item.school.ko}><span>{t(item.school)}</span><span>{item.period ? item.period + ' ' : ''}{t(item.detail)}</span></li>)}</ul>
        </section>
      </div>
    </main>

    <footer className="hp-foot">
      <a className="hp-email" href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
      <p>© {new Date().getFullYear()} {pick('오이삭', 'Yisak Oh', 'Yisak Oh')} · <a href="#top">{pick('맨 위로', 'Back to top', 'トップへ')}</a></p>
    </footer>
  </div>;
}
