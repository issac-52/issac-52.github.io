import { Modal } from '@/shared/ui/Modal';
import { Tag } from '@/shared/ui/Tag';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { useDetailModalStore } from '../model/useDetailModalStore';
import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { mockCommits } from '@/entities/commit/model/mockCommits';
import type { Project } from '@/entities/project/model/types';
import type { Experience } from '@/entities/experience/model/types';

export function DetailModal() {
  const { target, close } = useDetailModalStore();

  const project = target?.kind === 'project' ? projects.find((p) => p.id === target.id) : undefined;
  const hasVideo = !!project?.videoUrl;

  return (
    <Modal open={!!target} onClose={close} maxWidthClassName={hasVideo ? 'max-w-[860px]' : 'max-w-[480px]'}>
      {target?.kind === 'person' && <PersonalContent />}
      {target?.kind === 'experience' && <ExperienceContent id={target.id} />}
      {target?.kind === 'project' && project && (
        hasVideo ? <ProjectVideoContent project={project} /> : <ProjectPlainContent project={project} />
      )}
    </Modal>
  );
}

function PersonalContent() {
  return (
    <>
      <Eyebrow>ABOUT ME</Eyebrow>
      <h2 className="font-display text-xl mb-2 pr-8">{personalInfo.name}</h2>
      <div className="font-mono text-[12.5px] text-dim mb-4">{personalInfo.role}</div>
      <p className="text-sm leading-7 text-[#c3c8db] mb-5">{personalInfo.bio}</p>
      {Object.entries(personalInfo.skills).map(([label, skills]) => (
        <div className="mb-3.5" key={label}>
          <div className="font-mono text-[10.5px] text-dimmer mb-1.5">{label}</div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-cardline text-sm text-dim flex flex-col gap-1.5">
        {Object.entries(personalInfo.contact).map(([k, v]) => (
          <div key={k}>
            <b className="text-ink font-semibold inline-block w-14">{k}</b>
            {v}
          </div>
        ))}
      </div>
    </>
  );
}

function CommitLog({ id }: { id: string }) {
  const commits = mockCommits[id] ?? [];
  if (commits.length === 0) return null;
  return (
    <div className="mt-5 pt-4 border-t border-cardline">
      <div className="font-mono text-[10.5px] text-dimmer mb-2 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_6px_rgba(43,212,184,.9)]" />
        RECENT COMMITS
      </div>
      {commits.map((c) => (
        <div key={c.hash} className="font-mono text-[11.5px] leading-8 text-[#aeb4c9] flex gap-2">
          <span className="text-amber">{c.hash}</span>
          <span>{c.msg}</span>
          <span className="ml-auto text-dimmer whitespace-nowrap">{c.time}</span>
        </div>
      ))}
      <div className="mt-1.5 font-mono text-[10px] text-dimmer italic">
        * 데모용 임의 데이터 · GitHub API 연동 예정
      </div>
    </div>
  );
}

function ExperienceContent({ id }: { id: string }) {
  const item = experiences.find((e) => e.id === id);
  if (!item) return null;
  return <ItemBody item={item} eyebrow="WORK EXPERIENCE" id={id} />;
}

function ProjectPlainContent({ project }: { project: Project }) {
  return <ItemBody item={project} eyebrow="SIDE PROJECT" id={project.id} />;
}

function ItemBody({
  item,
  eyebrow,
  id,
}: {
  item: Experience | Project;
  eyebrow: string;
  id: string;
}) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-xl mb-2 pr-8">{item.name}</h2>
      <div className="font-mono text-[12.5px] text-dim mb-4">
        {item.role} · {item.period}
        {item.ongoing ? ' · 진행중' : ''}
      </div>
      <p className="text-sm leading-7 text-[#c3c8db] mb-5 whitespace-pre-line">{item.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <CommitLog id={id} />
    </>
  );
}

/** 시연영상이 있는 사이드 프로젝트: 왼쪽 영상 / 오른쪽 설명 2단 레이아웃 + 스와이프 인 애니메이션 */
function ProjectVideoContent({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-7">
      <div className="animate-swipe-in-left">
        <div className="rounded-xl overflow-hidden border border-cardline bg-black aspect-[9/16] md:aspect-auto md:h-full">
          <video
            src={project.videoUrl}
            poster={project.posterUrl}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-2 font-mono text-[10px] text-dimmer text-center">1분 시연영상</div>
      </div>

      <div className="animate-swipe-in-right pr-8">
        <Eyebrow>SIDE PROJECT</Eyebrow>
        <h2 className="font-display text-xl mb-2">{project.name}</h2>
        <div className="font-mono text-[12.5px] text-dim mb-4">
          {project.role} · {project.period}
          {project.ongoing ? ' · 진행중' : ''}
        </div>
        <p className="text-sm leading-7 text-[#c3c8db] mb-5 whitespace-pre-line">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <CommitLog id={project.id} />
      </div>
    </div>
  );
}
