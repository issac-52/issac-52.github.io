import { useEffect, useState } from 'react';
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
  const [expanded, setExpanded] = useState<string | null>(null);
  const works = getWorks(language);
  const projectList = getProjects(language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = en ? 'Issac Oh | Backend-focused Full-stack Developer' : '오이삭 | 백엔드 중심 풀스택 개발자';
    document.querySelector('meta[name="description"]')?.setAttribute('content', intro);
  }, [language, en, intro]);
  return <div className="io-page" id="top">
    <a className="skip-link" href="#main">{pick('본문으로 바로가기','Skip to content')}</a>
    <header className="io-nav">
      <a href="#top" className="io-brand" aria-label="Issac Oh"><i aria-hidden="true"/>issac-52.github.io</a>
      <div className="io-lang" aria-label={pick('언어 선택','Language')}>{(['ko','en'] as const).map(lang => <button key={lang} aria-pressed={language === lang} lang={lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="profile-landing">
        <div className="profile-pair">
          <img className="profile-avatar" src="/sac-profile.png" alt="SAC" width="144" height="144"/>
          <div><p className="profile-hello">{pick('안녕하세요,','Hello, I’m')}</p><h1>Issac Oh</h1>
            <p className="profile-role">BACKEND / FULL-STACK DEVELOPER</p>
            <p className="profile-line">{pick('백오피스와 현장 업무 도구를 만드는 오이삭입니다.', 'I build back-office systems and tools for field teams.')}</p>
            <span className="profile-location">◎ Seoul, Korea</span><SocialLinks/>
          </div>
        </div>
        <a className="profile-explore" href="#experience">↓　Scroll to Explore</a>
      </section>
      <section id="experience" className="io-section chapter"><header><h2>{pick('경력','Experience')}</h2></header>
        {getExperiences(language).map(item => {
          const records = works.filter(work => work.experienceId === item.id);
          const isOpen = expanded === item.id;
          return <div className="company-entry" key={item.id}>
            <button className="io-row company-toggle" id={item.id + '-toggle'} aria-expanded={isOpen}
              aria-controls={item.id + '-records'} onClick={() => setExpanded(isOpen ? null : item.id)}>
              <small>{item.period}</small>
              <span><strong>{item.name}</strong><span>{item.role}</span></span>
              <span className="company-count">{records.length}{pick('건',' notes')} <i aria-hidden="true">{isOpen ? '−' : '+'}</i></span>
            </button>
            <div className="company-records" id={item.id + '-records'} role="region"
              aria-labelledby={item.id + '-toggle'} hidden={!isOpen}>
              <p>{item.desc}</p>
              <h3>{pick('개발 기록','Engineering notes')}</h3>
              <ul>{records.map(work => <li key={work.id}>
                <button onClick={() => open({kind:'work', id:work.id})}>
                  <span>{work.title}</span><span aria-hidden="true">↗︎</span>
                </button>
              </li>)}</ul>
            </div>
          </div>;
        })}
      </section>
      <section id="projects" className="featured-work"><h2>{pick('프로젝트','Selected projects')}</h2>
        {projectList.map(p => <a className="work-feature" key={p.id} href={p.caseStudyHref}
          onPointerMove={event => {
            if (event.pointerType !== 'mouse') return;
            const el = event.currentTarget;
            const box = el.getBoundingClientRect();
            el.style.setProperty('--px', Math.min(box.width-70,Math.max(70,event.clientX-box.left))+'px');
            el.style.setProperty('--py', Math.min(box.height-35,Math.max(35,event.clientY-box.top))+'px');
          }}>
          <div className={'work-art '+p.id} aria-hidden="true">{p.id==='meter-admin'
            ? <><img className="survey-cover" src="/notebook/cover.svg" alt=""/><img className="survey-sheet" src="/notebook/meter-admin.svg" alt=""/></>
            : <><span className="water-ripples"/><img className="water-object" src="/water-study.webp" alt=""/></>}</div>
          <div className="feature-caption"><small>{p.tags.filter(tag => !['Claude Code','Codex'].includes(tag)).slice(0,2).join(' / ')}</small><h3>{p.name}</h3></div>
          <span className="see-project">See Project <span aria-hidden="true">↗</span></span>
        </a>)}
      </section>
      <section id="about" className="io-section chapter"><header><h2>{pick('기술','Toolkit')}</h2></header><dl className="io-skills">{Object.entries(personalInfo.skills).map(([group,skills]) => <div key={group}><dt>{group}</dt><dd>{skills.join(' · ')}</dd></div>)}</dl></section>
    </main>
    <footer><div><span>© {new Date().getFullYear()} Issac Oh</span><a href={siteConfig.githubUrl}>GitHub</a><a href="#top">{pick('맨 위로','Back to top')}</a></div></footer>
  </div>;
}
