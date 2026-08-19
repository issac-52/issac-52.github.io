import { useState } from 'react';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';

type Kind = 'experience' | 'project';

const BRANCHES: { id: string; label: string; items: { kind: Kind; id: string }[] }[] = [
  {
    id: 'connectwave',
    label: '커넥트웨이브 (구 다나와)',
    items: [{ kind: 'experience', id: 'exp-1' }, { kind: 'experience', id: 'exp-2' }, { kind: 'experience', id: 'exp-3' }],
  },
  { id: 'mgsinyong', label: 'MG신용정보 · 마이그레이션 TF', items: [{ kind: 'experience', id: 'exp-0' }] },
  {
    id: 'personal',
    label: '개인 프로젝트',
    items: [{ kind: 'project', id: 'proj-0' }, { kind: 'project', id: 'proj-1' }, { kind: 'project', id: 'proj-2' }],
  },
];

function findItem(kind: Kind, id: string) {
  return kind === 'experience' ? experiences.find((e) => e.id === id) : projects.find((p) => p.id === id);
}

export function MobileMindmap() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openDetail = useDetailModalStore((s) => s.open);

  return (
    <div className="block md:hidden max-w-[520px] mx-auto mt-7 px-5 pb-1.5">
      <button
        onClick={() => openDetail({ kind: 'person' })}
        className="w-full bg-card border border-amber rounded-2xl p-[18px] text-center font-display font-bold text-lg shadow-[0_16px_40px_-20px_rgba(240,184,96,.4)]"
      >
        오이삭
        <span className="block font-mono font-normal text-[11px] text-dim mt-1">탭해서 자기소개 보기</span>
      </button>
      <div className="w-px h-[22px] bg-cardline mx-auto" />

      {BRANCHES.map((b) => {
        const open = openId === b.id;
        return (
          <div className="mb-1.5" key={b.id}>
            <button
              onClick={() => setOpenId(open ? null : b.id)}
              className={`w-full bg-card border rounded-[14px] px-4 py-3.5 flex items-center justify-between font-display font-semibold text-[14.5px] transition-colors
                ${open ? 'border-teal' : 'border-violet'}`}
            >
              <span>{b.label}</span>
              <span className={`text-xs text-dim transition-transform ${open ? 'rotate-180 !text-teal' : ''}`}>▾</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
              {b.items.map((it) => {
                const item = findItem(it.kind, it.id);
                if (!item) return null;
                return (
                  <button
                    key={it.id}
                    onClick={() => openDetail({ kind: it.kind, id: it.id })}
                    className="w-full text-left mt-2 ml-3.5 px-3 py-2.5 bg-[#0e1119] border border-cardline rounded-[10px] text-[12.5px] text-dim"
                  >
                    <b className="text-ink font-semibold block mb-0.5 font-display text-[13px]">
                      {item.ongoing && <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal mr-1.5" />}
                      {item.name}
                    </b>
                    {item.period}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
