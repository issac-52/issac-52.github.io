import { useEffect } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore } from '@/shared/model/useLanguageStore';
import results from '@/pages/fieldwork/model/performance.json';
import { SignalSculpture } from './SignalSculpture';
import './editorial.css';

export function ModernPage() {
  const open = useDetailModalStore(s => s.open);
  const { language, setLanguage } = useLanguageStore();
  const en = language === 'en';
  const pick = (ko: string, english: string) => en ? english : ko;
  const intro = pick('Java와 Spring으로 업무 시스템을 만드는 오이삭입니다. 상품 데이터 복구부터 현장 검침 자동화까지, 운영자가 매일 쓰는 도구를 개발합니다.', 'I’m Issac Oh, a backend-focused developer building Java and Spring systems for the people who run commerce platforms and field operations.');
  const projectList = getProjects(language);
  const benchmark = results.comparisons.find(row => row.name === 'list_100_first_page')!;
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = en ? 'Issac Oh | Backend-focused Full-stack Developer' : '오이삭 | 백엔드 중심 풀스택 개발자';
    document.querySelector('meta[name="description"]')?.setAttribute('content', intro);
  }, [language, en, intro]);
  return <div className="io-page" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기','Skip to content')}</a>
    <header className="io-nav"><a href="#top" className="io-brand" aria-label="Issac Oh"><i aria-hidden="true">io</i> Issac Oh</a>
      <nav aria-label={pick('주요 메뉴','Navigation')}><a href="#projects">{pick('프로젝트','Projects')}</a><a href="#experience">{pick('경력','Experience')}</a><a href="#contact">{pick('연락','Contact')}</a></nav>
      <div className="io-lang">{(['ko','en'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="io-hero">
        <div className="io-intro"><p className="io-label">Backend / Full-stack Developer</p><h1>Issac <em>Oh.</em></h1><p className="io-bio">{intro}</p><a className="io-cta" href="#projects">{pick('대표 프로젝트 보기','View selected projects')}</a></div>
        <SignalSculpture />
      </section>
      <section id="projects" className="io-section"><header><h2>Selected <em>work.</em></h2><span>{pick('외주 프로젝트','Client projects')}</span></header>
        <div className="io-projects">{projectList.map(p => {
          const field = p.id === 'field-work';
          return <a className="io-project" key={p.id} href={p.caseStudyHref}>
            <div className={'io-cover '+(field ? 'io-benchmark':'io-survey')} aria-hidden="true">{field ? <><small>SQL / FIRST 100 ROWS</small><strong>{benchmark.beforeSql}<i> → </i>{benchmark.afterSql}</strong><div className="io-bars"><b/><b style={{width:100*benchmark.afterSql/benchmark.beforeSql+'%'}}/></div></> :
              <><small>FIELD SURVEY / WORKBOOK</small><div className="io-sheets"><i/><i/><i><b>野帳</b><span>FIELD SURVEY</span></i></div></>}</div>
            <div className="io-project-meta">{p.period}</div><h3>{p.name}</h3><p>{field ? pick('가상 수용가 2만 건으로 조회 병목을 측정하고, 첫 100건에 필요한 SQL을 302회에서 4회로 줄였습니다.','Benchmarked 20,000 synthetic sites and cut SQL queries for the first 100 records from 302 to 4.') : pick('Excel을 다시 올려도 조사값과 사진을 보존하고, 완료한 현장 기록을 발주처의 원본 양식에 출력합니다.','Preserves survey values and photos across Excel reimports, then exports field records into the client’s original workbook.')}</p>
            <span className="io-link">{pick('구현 기록 읽기','Read case study')}</span>
          </a>;
        })}</div>
      </section>
      <section id="experience" className="io-section"><header><h2>Experience<em>.</em></h2><span>{pick('경력과 담당 업무','Roles & responsibilities')}</span></header>
        {getExperiences(language).map(item => <button className="io-row" key={item.id} onClick={() => open({kind:'experience',id:item.id})}><small>{item.period}</small><span><strong>{item.name}</strong><span>{item.role}</span></span><i aria-hidden="true">＋</i></button>)}
      </section>
      <section className="io-section"><header><h2>Engineering <em>notes.</em></h2><span>{pick('다나와사업부 실무 기록','Danawa engineering work')}</span></header>
        {getWorks(language).map(work => <button className="io-row io-note" key={work.id} onClick={() => open({kind:'work',id:work.id})}><small>{work.tags[0]}</small><strong>{work.title}</strong><i aria-hidden="true">＋</i></button>)}
      </section>
      <section id="about" className="io-section"><header><h2>Toolkit<em>.</em></h2><span>{pick('실무에서 사용한 기술','Technologies used at work')}</span></header><dl className="io-skills">{Object.entries(personalInfo.skills).map(([group,skills]) => <div key={group}><dt>{group}</dt><dd>{skills.join(' · ')}</dd></div>)}</dl></section>
    </main>
    <footer id="contact"><p className="io-label">{pick('채용 및 협업 문의','Hiring & collaboration')}</p><a className="io-email" href={'mailto:'+siteConfig.email}>{siteConfig.email}</a><div><span>© {new Date().getFullYear()} Issac Oh</span><a href={siteConfig.githubUrl}>GitHub</a><a href="#top">{pick('맨 위로','Back to top')}</a></div></footer>
  </div>;
}
