import { useEffect } from 'react';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { siteConfig } from '@/shared/config/site';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { useLanguageStore } from '@/shared/model/useLanguageStore';
import { SocialLinks } from './SocialLinks';
import './editorial.css';


export function ModernPage() {
  const open = useDetailModalStore(s => s.open);
  const { language, setLanguage } = useLanguageStore();
  const en = language === 'en';
  const pick = (ko: string, english: string) => en ? english : ko;
  const intro = pick('다나와에서는 누락된 상품 데이터를 복구하는 로직을 만들었습니다. 지금은 PowerBuilder 업무 화면을 Java와 Vue로 옮기고 있습니다.', 'At Danawa, I built recovery logic for missing product data. Today I’m moving PowerBuilder workflows to Java and Vue.');
  const projectList = getProjects(language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = en ? 'Issac Oh | Backend-focused Full-stack Developer' : '오이삭 | 백엔드 중심 풀스택 개발자';
    document.querySelector('meta[name="description"]')?.setAttribute('content', intro);
  }, [language, en, intro]);
  return <div className="io-page" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기','Skip to content')}</a>
    <header className="io-nav">
      <a href="#top" className="io-brand" aria-label="Issac Oh">ISSAC OH<span aria-hidden="true">✳︎</span></a>
      <nav aria-label={pick('주요 메뉴','Navigation')}><a href="#projects">{pick('작업','Work')}</a><a href="#experience">{pick('경력','Experience')}</a></nav>
      <div className="io-lang" aria-label={pick('언어 선택','Language')}>{(['ko','en'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="io-hero">
        <div className="io-intro">
          <p className="io-role">Software engineer <span>/</span> Seoul, KR</p>
          <h1>Issac<br/><em>Oh.</em></h1>
          <p className="io-lede">{pick('백오피스와 현장 업무 도구를 만드는 오이삭입니다.', 'I build software for the people who run operations.')}</p>
          <p className="io-bio">{intro}</p>
          <SocialLinks />
        </div>

        <img className="sac-profile" src="/sac-profile.png" width="460" height="460" alt="SAC"/>
      </section>
      <section id="projects" className="io-section"><header><h2>{pick('프로젝트','Selected work')}</h2><span>Selected work</span></header>
        {projectList.map(p => <a className="io-project" key={p.id} href={p.caseStudyHref}>
          <div><small>{p.period}</small><h3>{p.name}</h3></div>
          <div><p>{p.id === 'field-work'
            ? pick('검침원이 남긴 시작·종료 기록과 사진을 정산 내역과 HWPX 검침카드로 연결했습니다.', 'Connected field readings and photos to settlements and printable inspection cards.')
            : pick('엑셀을 다시 올려도 현장 조사값을 보존하고, 작업이 끝나면 발주처의 원본 양식에 결과를 채웁니다.', 'Preserves survey entries across Excel imports and fills the client’s original workbook when fieldwork ends.')}</p>
            <small>{p.tags.filter(tag => !['Codex','Claude Code'].includes(tag)).slice(0,3).join(' / ')}</small></div>
          <span className="io-arrow" aria-hidden="true">↗︎</span>
        </a>)}
      </section>
      <section id="experience" className="io-section"><header><h2>{pick('경력','Experience')}</h2></header>
        {getExperiences(language).map(item => <button className="io-row io-timeline" key={item.id} onClick={() => open({kind:'experience',id:item.id})}><small>{item.period}</small><span><strong>{item.name}</strong><span>{item.role}</span></span><i aria-hidden="true">＋</i></button>)}
      </section>
      <section className="io-section"><header><h2>{pick('개발 기록','Engineering notes')}</h2></header>
        {getWorks(language).map(work => <button className="io-row io-note" key={work.id} onClick={() => open({kind:'work',id:work.id})}><small>{work.company}</small><strong>{work.title}</strong><i aria-hidden="true">＋</i></button>)}
      </section>
      <section id="about" className="io-section"><header><h2>{pick('기술','Toolkit')}</h2></header><dl className="io-skills">{Object.entries(personalInfo.skills).map(([group,skills]) => <div key={group}><dt>{group}</dt><dd>{skills.join(' · ')}</dd></div>)}</dl></section>
    </main>
    <footer><div><span>© {new Date().getFullYear()} Issac Oh</span><a href={siteConfig.githubUrl}>GitHub</a><a href="#top">{pick('맨 위로','Back to top')}</a></div></footer>
  </div>;
}
