import { useMigrationStore } from '@/features/migration/model/useMigrationStore';
import { useScrollProgress } from '@/features/scroll-progress/lib/useScrollProgress';
import { ParticleField } from '@/widgets/particle-field/ui/ParticleField';
import { MindmapWidget } from '@/widgets/mindmap/ui/MindmapWidget';
import { siteConfig } from '@/shared/config/site';

export function ModernPage() {
  const migrated = useMigrationStore((s) => s.migrated);
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-bg text-ink font-body transition-[clip-path] duration-[1050ms] ease-[cubic-bezier(.65,0,.16,1)]
        ${migrated ? '[clip-path:circle(150%_at_94%_94%)] pointer-events-auto' : '[clip-path:circle(0%_at_94%_94%)] pointer-events-none'}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 15%, rgba(124,123,255,.10), transparent 40%), radial-gradient(circle at 82% 20%, rgba(43,212,184,.09), transparent 42%), radial-gradient(circle at 50% 90%, rgba(240,184,96,.06), transparent 45%)',
      }}
    >
      <ParticleField progress={progress} />

      <Topbar />
      <Hero />
      <MindmapWidget />
      <Footer />
    </div>
  );
}

function Topbar() {
  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto pt-[26px] px-5 flex items-center justify-between">
      <div className="font-display font-bold text-[17px] tracking-tight">
        Issac<span className="text-teal">.</span>dev
      </div>
      <nav className="flex items-center gap-3.5 text-[13px] text-dim">
        <a
          className="border border-cardline px-3.5 py-1.5 rounded-full text-ink transition-all hover:border-teal hover:-translate-y-px"
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="border border-cardline px-3.5 py-1.5 rounded-full text-ink transition-all hover:border-teal hover:-translate-y-px"
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          resume.pdf ⬇
        </a>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative z-[1] max-w-[1200px] mx-auto mt-[34px] px-5 text-center">
      <div className="font-mono text-xs text-teal mb-2.5">$ whoami — FRONTEND ENGINEER</div>
      <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,36px)] leading-[1.28] tracking-tight">
        레거시를 다음 세대로 마이그레이션하는
        <br />
        4년차 프론트엔드 개발자입니다
      </h1>
      <div className="mt-2.5 text-[12.5px] text-dimmer font-mono">
        노드를 눌러서 살펴보세요 · 오이삭 = 자기소개 · 나머지 = 프로젝트
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative z-[1] max-w-[1160px] mx-auto mt-3.5 px-5 pt-4 pb-16 flex justify-between text-xs text-dimmer border-t border-cardline">
      <span>© Issac — Frontend Engineer</span>
      <span>
        <a className="hover:text-teal" href={siteConfig.githubUrl}>GitHub</a>
        &nbsp;·&nbsp;
        <a className="hover:text-teal" href={siteConfig.velogUrl}>Velog</a>
      </span>
    </div>
  );
}
