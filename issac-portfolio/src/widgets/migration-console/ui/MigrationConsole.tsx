import { useEffect, useRef, useState } from 'react';
import { useMigrationStore } from '@/features/migration/model/useMigrationStore';

interface LogLine {
  text: string;
  cls?: 'cmd' | 'ok';
}

const STEPS = [
  '레거시 DOM 구조 분석 중...',
  '컴포넌트 트리 재구성 중...',
  '상태 관리 로직 이관 중...',
  'FSD 아키텍처 적용 및 빌드 중...',
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface MigrationConsoleProps {
  running: boolean;
  onFinished: () => void;
}

export function MigrationConsole({ running, onFinished }: MigrationConsoleProps) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const migrate = useMigrationStore((s) => s.migrate);

  useEffect(() => {
    if (!running) return;
    let cancelled = false;

    async function run() {
      setLines([{ text: '$ git checkout -b migrate/vue3-fsd', cls: 'cmd' }]);
      await delay(400);

      for (let i = 0; i < STEPS.length; i++) {
        if (cancelled) return;
        setLines((prev) => [...prev, { text: `[${i + 1}/${STEPS.length}] ${STEPS[i]}` }]);
        await delay(360);
        if (cancelled) return;
        setLines((prev) =>
          prev.map((l, idx) =>
            idx === prev.length - 1
              ? { text: `[${i + 1}/${STEPS.length}] ${STEPS[i].replace('중...', '완료')}`, cls: 'ok' }
              : l
          )
        );
      }
      if (cancelled) return;
      setLines((prev) => [...prev, { text: '빌드 성공 — 배포 완료', cls: 'ok' }]);
      await delay(500);
      if (cancelled) return;

      migrate();
      onFinished();
    }
    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  return (
    <div
      className={`fixed left-[18px] bottom-[18px] w-[340px] max-w-[calc(100vw-36px)] bg-[#0e1116] border border-[#262b36] rounded-[10px] shadow-2xl z-[60] transition-all duration-300 ${
        running ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="bg-[#171b22] px-3 py-2 flex gap-1.5 rounded-t-[10px]">
        <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
      </div>
      <div ref={bodyRef} className="font-mono text-[11.5px] leading-[1.85] text-[#c9d1d9] px-3.5 py-3 max-h-[190px] overflow-y-auto">
        {lines.map((l, i) => (
          <div key={i} className={l.cls === 'cmd' ? 'text-amber' : l.cls === 'ok' ? '' : undefined}>
            {l.cls === 'ok' ? (
              <>
                {l.text} <span className="text-[#3fd68a]">✓</span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
