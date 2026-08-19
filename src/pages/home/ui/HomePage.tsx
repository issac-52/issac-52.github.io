import { useState } from 'react';
import { LegacyPage } from '@/widgets/legacy-page/ui/LegacyPage';
import { ModernPage } from '@/widgets/modern-page/ui/ModernPage';
import { MigrationConsole } from '@/widgets/migration-console/ui/MigrationConsole';
import { DetailModal } from '@/features/node-detail/ui/DetailModal';
import { useMigrationStore } from '@/features/migration/model/useMigrationStore';

export function HomePage() {
  const { migrated, reset } = useMigrationStore();
  const [running, setRunning] = useState(false);

  return (
    <>
      <LegacyPage />
      <ModernPage />
      <MigrationConsole running={running} onFinished={() => setRunning(false)} />
      <DetailModal />

      <div className="fixed right-[18px] bottom-[18px] z-[80]">
        {!migrated && (
          <button
            onClick={() => setRunning(true)}
            disabled={running}
            className="font-semibold text-sm px-[18px] py-2.5 rounded-full text-white bg-lgblue-bot shadow-lg disabled:opacity-60"
          >
            🔧 마이그레이션 시작
          </button>
        )}
        {migrated && (
          <button
            onClick={reset}
            className="font-semibold text-sm px-[18px] py-2.5 rounded-full text-bg bg-ink shadow-lg"
          >
            ↩️ 되돌리기
          </button>
        )}
      </div>
    </>
  );
}
