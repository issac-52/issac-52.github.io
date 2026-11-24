import { useEffect, useState } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore, type Language } from '@/shared/model/useLanguageStore';
import './editorial.css';

type L3 = Record<Language, string>;
/** Intro copy as segments; `true` marks a phrase the highlighter draws over on load. */
type Segment = [string, boolean?];

const introSegments: Record<Language, Segment[]> = {
  ko: [['다나와에서 '], ['Java·Spring 상품 API와 데이터 정합성 복구', true], ['를 맡았고, 에누리·다나와 '], ['통합 관리자 플랫폼의 프론트엔드', true], ['를 개발했습니다. 지금은 MG신용정보에서 '], ['PowerBuilder 업무 화면의 규칙을 분석해 Java API와 Vue 화면으로', true], [' 옮기고 있습니다.']],
  en: [['At Danawa I worked on '], ['Java/Spring product APIs and data-consistency recovery', true], [', then built '], ['the frontend of a unified Enuri–Danawa admin platform', true], ['. At MG Credit Information I now '], ['trace business rules in PowerBuilder screens and rebuild them as Java APIs and Vue screens', true], ['.']],
  ja: [['ダナワでは'], ['Java・Springの商品APIとデータ整合性の復旧', true], ['を担当し、エヌリ・ダナワの'], ['統合管理プラットフォームのフロントエンド', true], ['を開発しました。現在はMG信用情報で'], ['PowerBuilder業務画面のルールを分析し、Java APIとVue画面へ', true], ['移行しています。']],
};

const highlights: { workId: string; figure: string; label: L3; note: L3 }[] = [
  {
    workId: 'mg-query', figure: '55s → 0.041s',
    label: { ko: '레거시 조회 SQL의 전체 스캔 개선', en: 'Removed full scans from a legacy query', ja: 'レガシーSQLのフルスキャン改善' },
    note: { ko: 'MySQL 5.7 실행 계획을 보고 인덱스와 조건을 조정했습니다. 단일 SELECT 재측정값입니다.', en: 'Adjusted indexes and predicates from the MySQL 5.7 plan. Single SELECT, isolated retest.', ja: 'MySQL 5.7の実行計画からインデックスと条件を調整。単一SELECTの再測定値です。' },
  },
  {
    workId: 'consistency', figure: 'ES ⇄ Altibase',
    label: { ko: '상품 데이터 정합성 오류 해소', en: 'Resolved product data consistency errors', ja: '商品データ整合性エラーの解消' },
    note: { ko: 'RabbitMQ Consumer에 복구 로직을 더해 반복되던 오류 로그가 사라졌습니다.', en: 'Recovery logic in a RabbitMQ consumer stopped the recurring error logs.', ja: 'RabbitMQ Consumerに復旧処理を加え、繰り返すエラーログを解消しました。' },
  },
  {
    workId: 'delivery', figure: 'GitLab → Harbor → ArgoCD',
    label: { ko: '애플리케이션 빌드·배포 연동', en: 'Connected application build and delivery', ja: 'アプリケーションのビルド・デプロイ連携' },
    note: { ko: '이미지 태그 갱신을 ArgoCD 배포로 잇고, 뉴오피스에는 Blue-Green 배포를 구성했습니다.', en: 'Linked image-tag updates to ArgoCD and set up blue-green releases for New Office.', ja: 'イメージタグ更新をArgoCDにつなぎ、New OfficeにBlue-Greenデプロイを構成しました。' },
  },
];

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

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-35% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = ['about', 'experience', 'projects', 'toolkit', 'contact'];

export function ModernPage() {
  const open = useDetailModalStore(s => s.open);
  const { language, setLanguage } = useLanguageStore();
  const t = (text: L3) => text[language];
  const pick = (ko: string, en: string, ja: string) => t({ ko, en, ja });
  const works = getWorks(language);
  const projectList = getProjects(language);
  const active = useActiveSection(sectionIds);
  const introText = introSegments[language].map(([text]) => text).join('');

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = pick('오이삭 | Java 중심 풀스택 개발자', 'Yisak Oh | Java-focused full-stack engineer', 'Yisak Oh | Java中心のフルスタックエンジニア');
    document.querySelector('meta[name="description"]')?.setAttribute('content', introText);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const nav: [string, string][] = [
    ['about', pick('소개', 'About', '紹介')],
    ['experience', pick('경력', 'Experience', '職歴')],
    ['projects', pick('프로젝트', 'Projects', 'プロジェクト')],
    ['toolkit', pick('기술', 'Toolkit', '技術')],
    ['contact', pick('연락', 'Contact', '連絡先')],
  ];

  return <div className="hp" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기', 'Skip to content', '本文へ')}</a>
    <div className="hp-shell">
      <header className="hp-side">
        <div>
          <img className="hp-avatar" src="/sac-profile.png" alt="" width="56" height="56"/>
          <h1 className="hp-name">{pick('오이삭', 'Yisak Oh', 'Yisak Oh')}</h1>
          <p className="hp-role">{pick('Java 중심 풀스택 개발자, 경력 4년', 'Java-focused full-stack engineer, 4 years', 'Java中心のフルスタックエンジニア、経験4年')}</p>
          <p className="hp-tagline">{pick('오래된 업무 시스템을 읽고, 데이터가 어긋나지 않는 웹 시스템으로 옮깁니다.', 'I read old business systems and move them to web systems whose data stays consistent.', '古い業務システムを読み解き、データが食い違わないWebシステムへ移します。')}</p>
          <nav className="hp-nav" aria-label={pick('섹션', 'Sections', 'セクション')}>
            <ul>{nav.map(([id, label]) => <li key={id}><a href={'#' + id} aria-current={active === id ? 'true' : undefined}><i aria-hidden="true"/>{label}</a></li>)}</ul>
          </nav>
        </div>
        <div className="hp-side-foot">
          <a className="hp-mail" href={'mailto:' + siteConfig.email}>{pick('이메일 보내기', 'Send an email', 'メールを送る')}</a>
          <ul className="hp-social">
            <li><a href={siteConfig.githubUrl} aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.43-2.21 1.14-2.99-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.14 1.77 1.14 2.99 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a></li>
            <li><a href={siteConfig.linkedinUrl} aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.3-1.96 2.62v5.04h-4v-11Z"/></svg></a></li>
          </ul>
          <div className="hp-lang" role="group" aria-label={pick('언어', 'Language', '言語')}>{(['ko', 'en', 'ja'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{{ ko: '한국어', en: 'English', ja: '日本語' }[lang]}</button>)}</div>
        </div>
      </header>

      <main id="main" className="hp-main" tabIndex={-1}>
        <section id="about" className="hp-section" aria-labelledby="about-h">
          <h2 id="about-h" className="hp-sticky">{nav[0][1]}</h2>
          <p className="hp-intro">{introSegments[language].map(([text, marked], i) => marked ? <mark key={language + i} style={{ ['--i' as string]: i }}>{text}</mark> : <span key={i}>{text}</span>)}</p>
          <ul className="hp-highlights">{highlights.map(item => <li key={item.workId}>
            <button className="hp-highlight" onClick={() => open({ kind: 'work', id: item.workId })}>
              <span className="hp-figure">{item.figure}</span>
              <span className="hp-highlight-body"><strong>{t(item.label)}<Arrow/></strong><span>{t(item.note)}</span></span>
            </button>
          </li>)}</ul>
        </section>

        <section id="experience" className="hp-section" aria-labelledby="experience-h">
          <h2 id="experience-h" className="hp-sticky">{nav[1][1]}</h2>
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
          <h2 id="projects-h" className="hp-sticky">{nav[2][1]}</h2>
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
          <h2 id="toolkit-h" className="hp-sticky">{nav[3][1]}</h2>
          <dl className="hp-skills">{Object.entries(personalInfo.skills).map(([group, skills]) => <div key={group}><dt>{skillLabels[group] ? t(skillLabels[group]) : group}</dt><dd>{skills.join(', ')}</dd></div>)}</dl>
          <h3 className="hp-minor">{pick('학력', 'Education', '学歴')}</h3>
          <ul className="hp-edu">{education.map(item => <li key={item.school.ko}><span>{t(item.school)}</span><span>{item.period ? item.period + ' ' : ''}{t(item.detail)}</span></li>)}</ul>
        </section>

        <section id="contact" className="hp-section hp-contact" aria-labelledby="contact-h">
          <h2 id="contact-h" className="hp-sticky">{nav[4][1]}</h2>
          <p className="hp-contact-line">{pick('업무 시스템 전환, 관리자 화면, 데이터 연계 일을 함께할 팀을 찾고 있습니다.', 'I’m looking for a team working on system migrations, admin tools or data integration.', '業務システムの移行、管理画面、データ連携に取り組むチームを探しています。')}</p>
          <a className="hp-email" href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
          <p className="hp-colophon">© {new Date().getFullYear()} {pick('오이삭', 'Yisak Oh', 'Yisak Oh')}. {pick('React와 Vite로 만들어 GitHub Pages에 배포합니다.', 'Built with React and Vite, deployed on GitHub Pages.', 'ReactとViteで作り、GitHub Pagesで公開しています。')}</p>
        </section>
      </main>
    </div>
  </div>;
}
