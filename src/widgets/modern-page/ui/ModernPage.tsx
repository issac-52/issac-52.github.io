import { SocialIcon } from './SocialIcon';
import { useEffect } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore } from '@/shared/model/useLanguageStore';

const copy = {
  ko: {
    skip: '본문으로 바로가기', nav: '주요 메뉴', experience: '경력', projects: '프로젝트', about: '소개', contact: '연락하기',
    name: 'SAC · BACKEND-FOCUSED FULL-STACK DEVELOPER', headline: '업무의 맥락을 읽고,', headlineEnd: '시스템을 개선합니다.',
    intro: 'Java/Spring API부터 React·Next.js·Vue 관리자 화면까지.',
    introEnd: '데이터 정합성과 업무 자동화, 레거시 현대화를 경험한 백엔드 중심 풀스택 개발자입니다.',
    explore: '프로젝트 살펴보기', experienceTitle: '실무에서 쌓은 경험', experienceCaption: '시스템 전환부터 운영과 배포까지',
    current: '현재 참여 중', detail: '자세히 보기', projectsTitle: '사이드 프로젝트',
    aboutTitle: '기술보다 먼저,', aboutTitleEnd: '문제의 맥락을 봅니다.',
    aboutCopy: '약 4년간 기업 업무 시스템의 API·DB·배치와 관리자 화면을 개발했습니다. 상품 데이터 정합성 오류를 복구하고 반복 업무를 자동화했으며, 현재 Java/Vue 기반 시스템 전환에 참여하고 있습니다.', deliveryNote: 'Kubernetes·ArgoCD는 기존 인프라에 애플리케이션 배포를 연동한 경험입니다.', workTitle: '문제를 해결한 경험', workCaption: '커넥트웨이브 · 다나와사업부', demo: '시연 영상 보기', projectDetail: '프로젝트 상세',
    top: '맨 위로',
  },
  ja: {
    skip: '本文へ移動', nav: 'メインメニュー', experience: '経歴', projects: 'プロジェクト', about: '自己紹介', contact: 'お問い合わせ',
    name: 'SAC · BACKEND-FOCUSED FULL-STACK DEVELOPER', headline: '業務を理解し、', headlineEnd: 'より良いシステムをつくる。',
    intro: 'Java / Springを中心に、React・Next.js・Vueも活用。',
    introEnd: 'データ整合性、業務自動化、レガシーシステムのモダナイゼーションに取り組むバックエンド中心のフルスタックエンジニアです。',
    explore: 'プロジェクトを見る', experienceTitle: '職務経歴', experienceCaption: '移行・運用・デリバリーの経験',
    current: '現在', detail: '詳しく見る', projectsTitle: '個人・受託プロジェクト',
    aboutTitle: '技術の前に、', aboutTitleEnd: '課題の背景を理解する。',
    aboutCopy: '約4年間、企業向け業務システムのAPI、データベース、バッチ処理、管理画面を開発してきました。データ不整合の改善や定型業務の自動化に取り組み、現在はJava / Vueによる既存システムのWeb移行に参画しています。',
    deliveryNote: 'Kubernetes・ArgoCDは既存基盤へのアプリケーションデプロイ連携の経験です。', workTitle: 'エンジニアリング事例', workCaption: '課題・設計・実装の記録', demo: 'デモを見る', projectDetail: '詳細を見る', top: 'ページ上部へ',
  },
  en: {
    skip: 'Skip to content', nav: 'Main navigation', experience: 'Experience', projects: 'Projects', about: 'About', contact: 'Get in touch',
    name: 'SAC · BACKEND-FOCUSED FULL-STACK DEVELOPER', headline: 'Understand the workflow.', headlineEnd: 'Improve the system.',
    intro: 'Java/Spring APIs. React, Next.js and Vue administration interfaces.',
    introEnd: 'I’m a backend-focused full-stack developer with experience in data consistency, workflow automation and legacy modernization.',
    explore: 'Explore my work', experienceTitle: 'Professional experience', experienceCaption: 'From migration to operations and delivery',
    current: 'Current', detail: 'View details', projectsTitle: 'Side projects',
    aboutTitle: 'Understand the problem.', aboutTitleEnd: 'Then choose the technology.',
    aboutCopy: 'Over approximately four years, I have developed enterprise APIs, database features, batch jobs and administration interfaces. My work includes recovering inconsistent product data, automating operational workflows and contributing to Java/Vue system modernization.', deliveryNote: 'My Kubernetes and ArgoCD experience focuses on application delivery integration with existing infrastructure.', workTitle: 'Selected engineering work', workCaption: 'Connectwave · Danawa Division', demo: 'Watch demo', projectDetail: 'Project details',
    top: 'Back to top',
  },
};

export function ModernPage() {
  const open = useDetailModalStore((s) => s.open);
  const { language, setLanguage } = useLanguageStore();
  const t = copy[language];
  const experiences = getExperiences(language);
  const projects = getProjects(language);
  const works = getWorks(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'ja' ? 'SAC | バックエンドエンジニア' : language === 'en' ? 'SAC | Backend-focused Full-stack Developer' : 'SAC | 백엔드 중심 풀스택 개발자';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'ja' ? 'Java / Springを中心としたバックエンドエンジニアSACの職務経歴と開発事例。' : language === 'en'
      ? 'Java/Spring backend-focused full-stack developer. Enterprise systems, data consistency, workflow automation and legacy modernization.'
      : 'Java/Spring 백엔드 중심 풀스택 개발자 오이삭. 데이터 정합성, 업무 자동화, 관리자 플랫폼과 레거시 현대화 경험을 소개합니다.');
  }, [language]);

  return (
    <div className="portfolio portfolio-v2 min-h-screen bg-bg text-ink font-body">
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="SAC portfolio home">SAC<span>.</span></a>
        <nav aria-label={t.nav}>
          <a href="#experience">{t.experience}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#about">{t.about}</a>
          <a className="nav-contact" href={`mailto:${siteConfig.email}`}>{t.contact} ↗</a>
          <div className="language-switch" role="group" aria-label="Language">
            <button type="button" lang="ko" aria-pressed={language === 'ko'} onClick={() => setLanguage('ko')}>KR</button>
            <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
            <button type="button" lang="ja" aria-pressed={language === 'ja'} onClick={() => setLanguage('ja')}>JP</button>
          </div>
        </nav>
      </header>
      <main id="main" className="page-shell">
        <div className="editorial-side-note" aria-hidden="true">SAC / ENGINEERING PORTFOLIO — EST. 2022</div>
        <section className="hero" aria-labelledby="hero-title"><div className="hero-index"><span>PORTFOLIO / 2026</span><span>BACKEND ENGINEERING · SEOUL, KR</span></div>
          <div className="hero-identity"><span className="hero-identity-mark" aria-hidden="true">S/</span><p className="section-kicker">HELLO, I’M SAC <span aria-hidden="true">✳</span></p><span className="hero-identity-index">INDEPENDENT ENGINEER<br />SEOUL · SOUTH KOREA</span></div>
          <h1 id="hero-title">{t.headline}<br /><span>{t.headlineEnd}</span></h1>
          <p className="hero-description">{t.intro}<br className="desktop-break" /> {t.introEnd}</p>
          <div className="hero-actions">
            <a className="primary-link" href="#projects">{t.explore} <span>↓</span></a>
            <div className="social-icons" aria-label="Social profiles">
              <a className="social-icon" href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><SocialIcon kind="github" /></a>
              <a className="social-icon" href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><SocialIcon kind="linkedin" /></a>
              <a className="social-icon" href={`mailto:${siteConfig.email}`} aria-label="Email" title="Email"><SocialIcon kind="email" /></a>
            </div>
          </div>
          <div className="hero-focus"><span>LEGACY → MODERN</span><p>PowerBuilder · PHP · JSP <span>→</span> Java / Spring · Next.js · Vue.js</p><span className="focus-symbol" aria-hidden="true">↗</span></div>
        </section>
        <section id="experience" className="content-section" aria-labelledby="experience-title">
          <div className="section-heading"><div><p className="section-kicker">01 / EXPERIENCE</p><h2 id="experience-title">{t.experienceTitle}</h2></div><p>{t.experienceCaption}</p></div>
          <div className="experience-list">
            {experiences.map((item, index) => (
              <button className="experience-row" key={item.id} onClick={() => open({ kind: 'experience', id: item.id })}>
                <span className="item-number">0{index + 1}</span>
                <span className="experience-info"><span className="item-title">{item.name}</span><span className="item-role">{item.role}</span><span className="inline-tags">{item.tags.slice(0, 4).join(' / ')}</span></span>
                <span className="experience-meta"><span>{item.period}</span>{item.ongoing && <span className="status">{t.current}</span>}<span className="detail-hint">{t.detail} ↗</span></span>
              </button>
            ))}
          </div>
        </section>
        <section id="work" className="content-section" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="section-kicker">02 / ENGINEERING WORK</p><h2 id="work-title">{t.workTitle}</h2></div><p>{t.workCaption}</p></div>
          <div className="work-grid">
            {works.map((work, index) => (
              <button className="work-card" key={work.id} onClick={() => open({ kind: 'work', id: work.id })}>
                <div className="work-card-top"><span className="section-kicker">CASE / 0{index + 1}</span><span className="work-card-arrow" aria-hidden="true">↗</span></div>
                <h3>{work.title}</h3>
                <p>{work.context}</p>
                <span className="inline-tags">{work.tags.slice(0, 4).join(' · ')}</span>
                <span className="work-link">{t.detail} ↗</span>
              </button>
            ))}
          </div>
        </section>
        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="section-kicker">03 / SELECTED PROJECTS</p><h2 id="projects-title">{t.projectsTitle}</h2></div></div>
          <div className="project-grid">
            {projects.map(project => (
              <article className={`project-card side-project project-${project.id}`} key={project.id}>
                <div className="project-art" aria-hidden="true"><span className="project-art-label">SELECTED PROJECT / {String(projects.indexOf(project) + 1).padStart(2, '0')}</span><span className="project-art-symbol">{project.id === 'weekly-blog' ? 'B/' : project.id === 'meter-admin' ? 'M.' : 'F↗'}</span><span className="project-art-footer">SAC — INDEPENDENT WORK <span>2026</span></span></div>
                <div className="project-content">
                  <p className="project-period">{project.role}</p>
                  <h3>{project.name}</h3>
                  <p className="status project-status">{project.period}</p>
                  <p className="project-summary">{project.desc}</p>
                  <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  {project.caseStudyHref ? <a className="project-detail" href={project.caseStudyHref}>
                    {t.projectDetail}<span>↗</span>
                  </a> : <button className="project-detail" onClick={() => open({ kind: 'project', id: project.id })}>
                    {project.videoUrl ? t.demo : t.projectDetail}<span>↗</span>
                  </button>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="content-section about-section" aria-labelledby="about-title">
          <div><div className="about-monogram" aria-hidden="true">SAC<span>✳</span></div><p className="section-kicker">04 / ABOUT ME</p><h2 id="about-title">{t.aboutTitle}<br />{t.aboutTitleEnd}</h2><p className="about-copy">{t.aboutCopy}</p><a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email} ↗</a></div>
          <div className="skills-list">{Object.entries(personalInfo.skills).map(([group, skills]) => <div key={group}><h3>{group}</h3><p>{skills.join(' · ')}</p></div>)}<p className="skills-note">{t.deliveryNote}</p></div>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} SAC · Built with care</span><div><a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#">{t.top} ↑</a></div></footer>
    </div>
  );
}
