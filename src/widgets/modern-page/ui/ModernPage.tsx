import { useEffect } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore } from '@/shared/model/useLanguageStore';
import { SocialLinks } from './SocialLinks';
import './editorial.css';

type L3 = { ko: string; en: string; ja: string };

const highlights: { workId: string; figure: string; label: L3; note: L3 }[] = [
  {
    workId: 'mg-query', figure: '55s → 0.041s',
    label: { ko: '레거시 조회 SQL 전체 스캔 개선', en: 'Removing full scans from a legacy query', ja: 'レガシーSQLのフルスキャン改善' },
    note: { ko: 'MySQL 5.7 실행 계획 분석 · 단일 SELECT 재측정', en: 'MySQL 5.7 EXPLAIN · single SELECT, isolated retest', ja: 'MySQL 5.7のEXPLAIN分析・単一SELECTの再測定' },
  },
  {
    workId: 'consistency', figure: 'ES ⇄ Altibase',
    label: { ko: '상품 데이터 정합성 오류 해소', en: 'Resolving product data consistency errors', ja: '商品データ整合性エラーの解消' },
    note: { ko: 'RabbitMQ Consumer 보상·복구 로직 · 반복 오류 로그 해소', en: 'Compensation logic in a RabbitMQ consumer · recurring error logs resolved', ja: 'RabbitMQ Consumerへの補償処理追加・繰り返すエラーログを解消' },
  },
  {
    workId: 'delivery', figure: 'GitLab → Harbor → ArgoCD',
    label: { ko: '애플리케이션 빌드·배포 연동', en: 'Application build & delivery pipeline', ja: 'アプリケーションのビルド・デプロイ連携' },
    note: { ko: '이미지 태그 갱신 → ArgoCD 반영 · Blue-Green 배포 구성', en: 'Image-tag updates to ArgoCD · blue-green rollout', ja: 'イメージタグ更新→ArgoCD反映・Blue-Greenデプロイ' },
  },
];

const education: { school: L3; detail: L3; period: string }[] = [
  { school: { ko: '한국방송통신대학교', en: 'Korea National Open University', ja: '韓国放送通信大学' }, detail: { ko: '3학년 재학 중', en: 'Currently enrolled (3rd year)', ja: '在学中（3年）' }, period: '' },
  { school: { ko: '인하공업전문대학교 · 정보통신과', en: 'Inha Technical College · Information & Communication Engineering', ja: '仁荷工業専門大学・情報通信科' }, detail: { ko: '졸업', en: 'Graduated', ja: '卒業' }, period: '2017.03 – 2021.02' },
];

export function ModernPage() {
  const open = useDetailModalStore(s => s.open);
  const { language, setLanguage } = useLanguageStore();
  const t = (text: L3) => text[language];
  const pick = (ko: string, en: string, ja: string) => t({ ko, en, ja });
  const intro = pick(
    '다나와에서 Java·Spring 기반 상품 API와 데이터 정합성 복구 로직을 개발하고, 에누리·다나와 통합 관리자 플랫폼의 프론트엔드를 맡았습니다. 지금은 MG신용정보에서 PowerBuilder 업무 화면의 규칙을 분석해 Java API와 Vue 화면으로 옮기고 있습니다.',
    'At Danawa I built Java/Spring product APIs and data-consistency recovery logic, then led frontend work on a unified Enuri–Danawa admin platform. At MG Credit Information I now trace business rules in PowerBuilder screens and rebuild them as Java APIs and Vue screens.',
    'ダナワではJava・Springによる商品APIとデータ整合性の復旧処理を開発し、エヌリ・ダナワ統合管理プラットフォームのフロントエンドを担当しました。現在はMG信用情報で、PowerBuilder業務画面のルールを分析し、Java APIとVue画面へ移行しています。',
  );
  const works = getWorks(language);
  const projectList = getProjects(language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = pick('오이삭 | Java 중심 풀스택 개발자', 'Yisak Oh | Java-focused Full-stack Engineer', 'Yisak Oh | Java中心のフルスタックエンジニア');
    document.querySelector('meta[name="description"]')?.setAttribute('content', intro);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const nav = [
    ['#experience', pick('경력', 'Experience', '職歴')],
    ['#projects', pick('프로젝트', 'Projects', 'プロジェクト')],
    ['#about', pick('기술', 'Toolkit', '技術')],
    ['#contact', pick('연락', 'Contact', '連絡先')],
  ];

  return <div className="io-page" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기', 'Skip to content', '本文へ')}</a>
    <header className="io-nav">
      <a href="#top" className="io-brand" aria-label="Yisak Oh"><i aria-hidden="true"/>issac-52.github.io</a>
      <nav className="io-sections" aria-label={pick('섹션', 'Sections', 'セクション')}>{nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="io-lang" aria-label={pick('언어 선택', 'Language', '言語')}>{(['ko', 'en', 'ja'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="profile-landing">
        <div className="profile-pair">
          <img className="profile-avatar" src="/sac-profile.png" alt="" width="144" height="144"/>
          <div>
            <p className="profile-hello">{pick('안녕하세요,', 'Hello, I’m', 'こんにちは、')}</p>
            <h1>{pick('오이삭', 'Yisak Oh', 'Yisak Oh')}</h1>
            <p className="profile-role">{pick('Java 중심 풀스택 개발자 · 경력 4년', 'Java-focused Full-stack Engineer · 4 years', 'Java中心のフルスタックエンジニア・経験4年')}</p>
            <p className="profile-line">{pick('업무 시스템 현대화 · API/데이터 연계 · 개발/배포 자동화', 'Business-system modernization · API & data integration · Delivery automation', '業務システムの刷新・API／データ連携・開発／デプロイ自動化')}</p>
            <p className="profile-intro">{intro}</p>
            <div className="profile-actions">
              <a className="cta-primary" href={'mailto:' + siteConfig.email}>{pick('이메일 보내기', 'Email me', 'メールを送る')}</a>
              <a className="cta-ghost" href="#projects">{pick('프로젝트 보기', 'View projects', 'プロジェクトを見る')} ↓</a>
            </div>
            <div className="profile-meta"><span className="profile-location">◎ Seoul, Korea</span><SocialLinks/></div>
          </div>
        </div>
      </section>

      <section className="highlights" aria-label={pick('주요 성과', 'Highlights', '主な成果')}>
        {highlights.map(item => <button key={item.workId} className="highlight" onClick={() => open({ kind: 'work', id: item.workId })}>
          <strong>{item.figure}</strong>
          <span>{t(item.label)}</span>
          <small>{t(item.note)}</small>
          <i aria-hidden="true">↗</i>
        </button>)}
      </section>

      <section id="experience" className="io-section chapter"><header><h2>{pick('경력', 'Experience', '職歴')}</h2></header>
        {getExperiences(language).map(item => {
          const records = works.filter(work => work.experienceId === item.id);
          return <article className="company-entry" key={item.id}>
            <div className="io-row company-head">
              <small>{item.period}</small>
              <span><strong>{item.name}</strong><span>{item.role}</span></span>
            </div>
            <div className="records-body">
              <p>{item.desc}</p>
              <h3>{pick('개발 기록', 'Engineering notes', '開発記録')} <span>{records.length}</span></h3>
              <ul>{records.map(work => <li key={work.id}>
                <button onClick={() => open({ kind: 'work', id: work.id })}>
                  <span>{work.title}</span><span aria-hidden="true">↗︎</span>
                </button>
              </li>)}</ul>
            </div>
          </article>;
        })}
      </section>

      <section id="projects" className="featured-work"><h2>{pick('프로젝트', 'Selected projects', 'プロジェクト')}</h2>
        {projectList.map(p => <a className="work-feature" key={p.id} href={p.caseStudyHref}
          onPointerMove={event => {
            if (event.pointerType !== 'mouse') return;
            const el = event.currentTarget;
            const box = el.getBoundingClientRect();
            el.style.setProperty('--px', Math.min(box.width - 70, Math.max(70, event.clientX - box.left)) + 'px');
            el.style.setProperty('--py', Math.min(box.height - 35, Math.max(35, event.clientY - box.top)) + 'px');
          }}>
          <div className={'work-art ' + p.id} aria-hidden="true">{p.id === 'meter-admin'
            ? <><img className="survey-cover" src="/notebook/cover.svg" alt=""/><img className="survey-sheet" src="/notebook/meter-admin.svg" alt=""/></>
            : p.id === 'weekly-blog' ? <span className="magazine-cover">Browinfo</span>
            : <><span className="water-ripples"/><img className="water-object" src="/water-study.webp" alt=""/></>}</div>
          <div className="feature-caption">
            <small className="feature-status">{p.period}</small>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <small className="feature-tags">{p.tags.join(' · ')}</small>
          </div>
          <span className="see-project">{pick('자세히 보기', 'See project', '詳しく見る')} <span aria-hidden="true">↗</span></span>
        </a>)}
      </section>

      <section id="about" className="io-section chapter"><header><h2>{pick('기술', 'Toolkit', '技術')}</h2></header>
        <dl className="io-skills">{Object.entries(personalInfo.skills).map(([group, skills]) => <div key={group} className={group === 'BACKEND' || group === 'FRONTEND' ? 'primary-skills' : undefined}><dt>{group}</dt><dd>{skills.join(' · ')}</dd></div>)}</dl>
        <div className="education">
          <h3>{pick('학력', 'Education', '学歴')}</h3>
          <ul>{education.map(item => <li key={item.school.ko}><span><strong>{t(item.school)}</strong><span>{t(item.detail)}</span></span><small>{item.period}</small></li>)}</ul>
        </div>
      </section>

      <section id="contact" className="contact">
        <p className="contact-kicker">{pick('함께 일할 기회를 찾고 있습니다', 'Open to new opportunities', '新しい機会を探しています')}</p>
        <h2>{pick('업무 시스템을 더 단단하게 만드는 일에 관심이 있다면 연락 주세요.', 'If you need someone to make business systems more reliable, let’s talk.', '業務システムをより堅牢にする仕事に興味があれば、ご連絡ください。')}</h2>
        <a className="contact-email" href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
        <div className="contact-links">
          <a href={siteConfig.githubUrl}>GitHub ↗</a>
          <a href={siteConfig.linkedinUrl}>LinkedIn ↗</a>
        </div>
      </section>
    </main>
    <footer><div><span>© {new Date().getFullYear()} Yisak Oh</span><a href={siteConfig.githubUrl}>GitHub</a><a href="#top">{pick('맨 위로', 'Back to top', 'トップへ')}</a></div></footer>
  </div>;
}
