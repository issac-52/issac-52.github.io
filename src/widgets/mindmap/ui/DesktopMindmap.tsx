import { useMigrationStore } from '@/features/migration/model/useMigrationStore';
import { useDetailModalStore } from '@/features/node-detail/model/useDetailModalStore';
import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';

type BranchId = 'connectwave' | 'mgsinyong' | 'personal';

interface ChildNode {
  parent: BranchId;
  kind: 'experience' | 'project';
  id: string;
  label: string;
  x: number;
  y: number;
  ongoing?: boolean;
}

const CHILDREN: ChildNode[] = [
  { parent: 'connectwave', kind: 'experience', id: 'exp-1', label: '레거시 현대화 & 백오피스 유지보수', x: 9, y: 6 },
  { parent: 'connectwave', kind: 'experience', id: 'exp-2', label: '에누리+다나와 통합 관리 툴 TF', x: 9, y: 20 },
  { parent: 'connectwave', kind: 'experience', id: 'exp-3', label: '데이터/AI 관련 툴 UI 개발', x: 9, y: 34 },
  { parent: 'mgsinyong', kind: 'experience', id: 'exp-0', label: 'PowerBuilder→Vue3 마이그레이션', x: 91, y: 6, ongoing: true },
  { parent: 'personal', kind: 'project', id: 'proj-0', label: 'LoL Match Analyzer', x: 19, y: 95, ongoing: true },
  { parent: 'personal', kind: 'project', id: 'proj-1', label: 'meter-admin', x: 50, y: 97 },
  { parent: 'personal', kind: 'project', id: 'proj-2', label: 'bandcast', x: 81, y: 95 },
];

const PRIMARY: { id: BranchId; label: string; sub: string; x: number; y: number }[] = [
  { id: 'connectwave', label: '커넥트웨이브', sub: '(구 다나와)', x: 18, y: 18 },
  { id: 'mgsinyong', label: 'MG신용정보', sub: '마이그레이션 TF', x: 82, y: 18 },
  { id: 'personal', label: '개인 프로젝트', sub: 'Side Projects', x: 50, y: 84 },
];

export function DesktopMindmap() {
  const { expandedBranch, toggleBranch } = useMigrationStore();
  const openDetail = useDetailModalStore((s) => s.open);

  return (
    <div className="hidden md:block max-w-[1160px] mx-auto mt-7 mb-1.5 px-5">
      <div className="relative w-full aspect-[16/10.5]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          {PRIMARY.map((p) => (
            <line
              key={p.id}
              x1={50} y1={44} x2={p.x} y2={p.y}
              className="stroke-cardline"
              strokeWidth={0.25}
              style={{ strokeDasharray: '1.5 2.2', animation: 'mindmap-flow 2.4s linear infinite' }}
            />
          ))}
          {CHILDREN.map((c) => (
            <line
              key={c.id}
              x1={PRIMARY.find((p) => p.id === c.parent)!.x}
              y1={PRIMARY.find((p) => p.id === c.parent)!.y}
              x2={c.x} y2={c.y}
              stroke="#2bd4b8"
              strokeWidth={0.25}
              style={{ opacity: expandedBranch === c.parent ? 0.85 : 0, transition: 'opacity .35s ease' }}
            />
          ))}
        </svg>

        {/* center node */}
        <button
          onClick={() => openDetail({ kind: 'person' })}
          style={{ left: '50%', top: '44%' }}
          className="group absolute -translate-x-1/2 -translate-y-1/2 z-[3] font-display font-semibold text-[19px] px-6 py-5 rounded-2xl bg-card border border-amber
            shadow-[0_0_0_1px_rgba(240,184,96,.15),0_20px_50px_-20px_rgba(240,184,96,.35)] animate-node-breathe
            transition-transform hover:-translate-y-[3px] hover:scale-[1.04]"
        >
          오이삭
          <span className="block font-mono font-normal text-[10px] text-dim mt-1">Issac Oh</span>
        </button>

        {PRIMARY.map((p) => (
          <button
            key={p.id}
            onClick={() => toggleBranch(p.id)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-[3] font-display font-semibold text-[14.5px] px-4 py-3 rounded-2xl bg-card border
              transition-transform hover:-translate-y-[3px] hover:scale-[1.04] whitespace-nowrap
              ${expandedBranch === p.id
                ? 'border-teal shadow-[0_14px_34px_-14px_rgba(43,212,184,.5)]'
                : 'border-violet shadow-[0_14px_34px_-18px_rgba(124,123,255,.4)]'}`}
          >
            {p.label}
            <span className="block font-mono font-normal text-[10px] text-dim mt-1">{p.sub}</span>
          </button>
        ))}

        {CHILDREN.map((c) => {
          const item = c.kind === 'experience'
            ? experiences.find((e) => e.id === c.id)
            : projects.find((p) => p.id === c.id);
          return (
            <button
              key={c.id}
              onClick={() => openDetail({ kind: c.kind, id: c.id })}
              style={{
                left: `${c.x}%`, top: `${c.y}%`,
                opacity: expandedBranch === c.parent ? 1 : 0,
                pointerEvents: expandedBranch === c.parent ? 'auto' : 'none',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-[3] max-w-[150px] text-left font-medium text-xs leading-snug
                px-3.5 py-2.5 rounded-xl bg-card border border-cardline transition-opacity duration-300"
            >
              {item?.ongoing && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal mr-1.5 shadow-[0_0_8px_rgba(43,212,184,.9)]" />
              )}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
