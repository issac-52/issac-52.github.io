import { useMemo } from 'react';

const PARTICLE_COUNT = 70;
const COLORS = ['teal', 'violet', 'amber'] as const;

interface ParticleFieldProps {
  /** 0~1. 스크롤 진행률 등, 높을수록 더 많은 파티클이 켜짐 */
  progress: number;
}

/**
 * 스크롤 진행률에 비례해 배경 파티클 밀도가 늘어나는 장식 레이어.
 * "보면 볼수록 더 많은 걸 마이그레이션했다"는 은유로 사용합니다.
 */
export function ParticleField({ progress }: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const visibleCount = Math.round(progress * PARTICLE_COUNT);

  const colorClass: Record<(typeof COLORS)[number], string> = {
    teal: 'bg-teal shadow-[0_0_6px_rgba(43,212,184,.8)]',
    violet: 'bg-violet shadow-[0_0_6px_rgba(124,123,255,.8)]',
    amber: 'bg-amber shadow-[0_0_6px_rgba(240,184,96,.8)]',
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={p.id}
          className={`absolute w-[3px] h-[3px] rounded-full transition-all duration-500 ease-out ${colorClass[p.color]} ${
            i < visibleCount ? 'opacity-55 scale-100' : 'opacity-0 scale-[.4]'
          }`}
          style={{ left: p.left, top: p.top }}
        />
      ))}
    </div>
  );
}
