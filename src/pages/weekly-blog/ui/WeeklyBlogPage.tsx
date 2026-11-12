import { useLanguageStore } from '@/shared/model/useLanguageStore';

const copy = {
  ko: {
    back: '← 프로젝트 목록', title: 'Browinfo · 주간 매거진',
    intro: '주간 기사 초안을 모으고, 출처를 확인한 뒤 관리자가 승인한 글을 발행하는 사이드 프로젝트입니다.',
    problem: '초안이 들어오면 바로 발행할 수 없었습니다',
    problemBody: '기존 weekly-blog를 주간 매거진으로 옮기면서 초안 접수와 공개 발행 사이에 검토 단계를 두었습니다. 작성된 기사마다 원문 출처를 연결하고, 관리자가 내용을 수정하거나 반려할 수 있게 했습니다. 공개 조회 API는 발행된 글만 돌려줍니다.',
    workflow: '초안 접수부터 발행까지',
    workflowBody: 'ChatGPT에서 작성한 초안은 OAuth로 보호된 MCP/API를 통해 검토 대기 상태로 저장합니다. 같은 주간 실행 키를 사용한 재시도는 중복 제출을 막습니다. 관리자는 출처 접근과 원문을 확인하고 체크리스트를 마친 뒤 승인·발행합니다. 수정과 상태 변경 이력은 별도로 남깁니다.',
    choice: '운영하며 정한 기준',
    choiceBody: '기사의 출처 도메인은 관리자 화면에서 추가·수정·비활성화합니다. 자동 접근 확인과 사람의 원문 확인을 구분했습니다. Supabase Auth의 관리자 이메일 허용 목록으로 쓰기 기능을 보호하고, 비공개 배포에서는 사이트 접근 비밀번호를 사용합니다.',
    stack: '구성과 현재 상태',
    stackBody: 'Next.js 16, TypeScript, Supabase PostgreSQL·Auth, Vercel을 사용합니다. 초안 수신 설정과 관리자 승인 화면을 확인했고 비공개로 배포했습니다. 공개 발행과 실제 OAuth 연결의 정상 동작은 별도로 확인해야 합니다.',
    source: 'GitHub 소스 보기 ↗',
  },
  en: {
    back: '← Projects', title: 'Browinfo · Weekly Magazine',
    intro: 'A side project for collecting weekly article drafts, checking sources and publishing after editorial approval.',
    problem: 'Drafts need review before publication',
    problemBody: 'While migrating weekly-blog into a magazine, I added a review stage between draft intake and public release. Articles carry source references, and administrators can edit or reject them. Public read APIs return published articles only.',
    workflow: 'From intake to publication',
    workflowBody: 'ChatGPT drafts arrive through an OAuth-protected MCP/API and enter review. A weekly idempotency key prevents duplicate submissions on retry. Administrators check source access and original material, complete the checklist and approve publication. Edits and status changes are recorded.',
    choice: 'Editorial and access rules',
    choiceBody: 'Administrators can add, update and disable source domains. Automated reachability checks are separate from human review of originals. Supabase Auth and an email allowlist protect writes, while private deployment uses an access password.',
    stack: 'Stack and current status',
    stackBody: 'Next.js 16, TypeScript, Supabase PostgreSQL and Auth, and Vercel. Draft intake settings and the administrative approval screen have been checked in a private deployment. Public publication and live OAuth connection still need separate validation.',
    source: 'View GitHub repository ↗',
  },
};

export function WeeklyBlogPage() {
  const { language } = useLanguageStore();
  const t = copy[language];
  return <main className="portfolio min-h-screen bg-bg text-ink font-body">
    <div className="page-shell" style={{ maxWidth: 920, paddingTop: 64, paddingBottom: 96 }}>
      <a className="text-link" href="#projects">{t.back}</a>
      <p className="section-kicker" style={{ marginTop: 44 }}>SIDE PROJECT</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.2 }}>{t.title}</h1>
      <p className="hero-description">{t.intro}</p>
      {([
        [t.problem, t.problemBody],
        [t.workflow, t.workflowBody],
        [t.choice, t.choiceBody],
        [t.stack, t.stackBody],
      ] as const).map(([title, body]) => <section className="content-section" key={title}>
        <h2 style={{ fontSize: '1.4rem' }}>{title}</h2><p className="about-copy">{body}</p>
      </section>)}
      <a className="text-link" href="https://github.com/issac-52/weekly-blog" target="_blank" rel="noreferrer">{t.source}</a>
    </div>
  </main>;
}
