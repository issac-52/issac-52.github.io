import { Modal } from '@/shared/ui/Modal';
import { Tag } from '@/shared/ui/Tag';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { useDetailModalStore } from '../model/useDetailModalStore';
import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import { personalInfo } from '@/entities/person/model/personalInfo';
import { mockCommits } from '@/entities/commit/model/mockCommits';

export function DetailModal() {
  const { target, close } = useDetailModalStore();

  return (
    <Modal open={!!target} onClose={close}>
      {target?.kind === 'person' && <PersonalContent />}
      {target?.kind === 'experience' && <ItemContent id={target.id} type="experience" />}
      {target?.kind === 'project' && <ItemContent id={target.id} type="project" />}
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

function ItemContent({ id, type }: { id: string; type: 'experience' | 'project' }) {
  const item =
    type === 'experience'
      ? experiences.find((e) => e.id === id)
      : projects.find((p) => p.id === id);
  if (!item) return null;

  const commits = mockCommits[id] ?? [];

  return (
    <>
      <Eyebrow>{type === 'experience' ? 'WORK EXPERIENCE' : 'SIDE PROJECT'}</Eyebrow>
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

      {commits.length > 0 && (
        <div className="mt-5 pt-4 border-t border-cardline">
          <div className="font-mono text-[10.5px] text-dimmer mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_6px_theme(colors.teal)]" />
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
      )}
    </>
  );
}
