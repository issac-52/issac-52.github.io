import { Modal } from '@/shared/ui/Modal';
import { Tag } from '@/shared/ui/Tag';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { useDetailModalStore } from '../model/useDetailModalStore';
import { getExperiences, getProjects } from '@/shared/config/localizedContent';
import { getWorks } from '@/entities/work/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { useLanguageStore } from '@/shared/model/useLanguageStore';

export function DetailModal() {
  const { target, close } = useDetailModalStore();
  const language = useLanguageStore(s => s.language);
  const en = language === 'en';
  const item = target?.kind === 'experience'
    ? getExperiences(language).find(item => item.id === target.id)
    : target?.kind === 'project' ? getProjects(language).find(item => item.id === target.id) : undefined;
  const project = target?.kind === 'project' ? getProjects(language).find(item => item.id === target.id) : undefined;
  const work = target?.kind === 'work' ? getWorks(language).find(item => item.id === target.id) : undefined;
  return (
    <Modal open={!!target} onClose={close} maxWidthClassName={work || project?.videoUrl ? 'max-w-[780px]' : 'max-w-[580px]'}>
      {target?.kind === 'person' ? <>
        <Eyebrow>ABOUT ME</Eyebrow>
        <h2 className="font-display text-xl mb-2 pr-16">{en ? 'Issac Oh' : personalInfo.name}</h2>
        <p className="text-sm leading-7 text-[#c3c8db] mb-5">{en ? 'Backend-focused full-stack developer with approximately four years of experience in Java/Spring APIs, enterprise administration interfaces, data consistency and legacy modernization.' : personalInfo.bio}</p>
        {Object.entries(personalInfo.skills).map(([group, skills]) => <div key={group} className="mb-4"><h3 className="text-xs text-dim mb-2">{group}</h3><div className="flex flex-wrap gap-2">{skills.map(skill => <Tag key={skill}>{skill}</Tag>)}</div></div>)}
      </> : work ? <>
        <Eyebrow>ENGINEERING WORK · CONNECTWAVE</Eyebrow>
        <h2 className="font-display text-xl mb-5 pr-16">{work.title}</h2>
        <div className="case-section"><h3>{en ? 'Context' : '배경과 문제'}</h3><p>{work.context}</p></div>
        <div className="case-section"><h3>{en ? 'My contribution' : '담당한 일'}</h3><ul>{work.actions.map(action => <li key={action}>{action}</li>)}</ul></div>
        <div className="case-section"><h3>{en ? 'Outcome & scope' : '결과와 담당 범위'}</h3><p>{work.result}</p></div>
        <div className="flex flex-wrap gap-1.5">{work.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
      </> : item && <>
        <Eyebrow>{target?.kind === 'experience' ? 'WORK EXPERIENCE' : 'SIDE PROJECT'}</Eyebrow>
        <h2 className="font-display text-xl mb-3 pr-16">{item.name}</h2>
        <div className="text-sm text-dim mb-4 leading-7">{item.role} · {item.period}</div>
        {item.desc && <p className="text-sm leading-7 text-[#c3c8db] mb-5 whitespace-pre-line">{item.desc}</p>}
        <div className="flex flex-wrap gap-1.5">{item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
        {project?.videoUrl && <figure className="demo-video">
          <video key={project.id} src={project.videoUrl} controls playsInline preload="metadata" aria-label={en ? 'Field Survey Manager demonstration' : '야장관리자 시연 영상'}>
            <a href={project.videoUrl}>{en ? 'Open demonstration video' : '시연 영상 열기'}</a>
          </video>
          <figcaption>{en ? 'Field Survey Manager · Product demo' : '야장관리자 · 서비스 시연 영상'} · <a className="text-teal underline" href={project.videoUrl} target="_blank" rel="noreferrer">{en ? 'Open video' : '영상 직접 열기'} ↗</a></figcaption>
        </figure>}
      </>}
    </Modal>
  );
}
