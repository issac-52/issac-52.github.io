import { useEffect, type ReactNode } from 'react';
import { projects } from '@/entities/project/model/data';
import { useLanguageStore } from '@/shared/model/useLanguageStore';

const source = 'https://github.com/issac-52/meter-admin';
const revision = `${source}/blob/04425a90bcf4f7d69107d6266fa18b9dbbcc4b8f`;
const videoUrl = projects.find(project => project.id === 'meter-admin')!.videoUrl;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="study-section"><h2>{title}</h2>{children}</section>;
}

export function MeterAdminPage() {
  const { language, setLanguage } = useLanguageStore();
  const en = language === 'en';
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = en ? 'Field Survey Manager · Case study | Issac Oh' : '야장관리자 · 프로젝트 기록 | 오이삭';
    document.querySelector('meta[name="description"]')?.setAttribute('content', en
      ? 'A Next.js field survey application: Excel imports that preserve survey values, template exports, photos, maps and Claude Code collaboration.'
      : '수용가·밸브 현장 조사 도구. 기존 조사값을 보존하는 Excel 등록, 원본 양식 출력, 사진·지도와 Claude Code 협업을 소개합니다.');
  }, [language, en]);

  const englishDecisions = [
    ['Preserve completed field work', 'Match consumer imports by block and row number. Update only name, address, old meter number, final reading and block; insert new rows. Existing survey values and photo references are outside that update set. Rows missing from an import are retained.'],
    ['Keep the original deliverable', 'Fill the supplied workbook through JSZip and direct worksheet/shared-string XML edits rather than rebuilding the workbook. This approach aims to retain its existing layout and formatting. Template changes still require output comparison.'],
    ['Separate records from photo objects', 'Supabase PostgreSQL holds business records and photo references; Cloudflare R2 stores image objects. The code supports server uploads and five-minute presigned upload URLs. Object operations and DB updates remain separate failure boundaries.'],
    ['Support field and office use', 'Desktop navigation and mobile navigation serve the same survey workflows. NAVER Maps and geocoding connect records to locations; consumer surveys support four photo references and valve surveys two.'],
  ];
  const koreanDecisions = [
    ['입력한 현장 조사값 보존', '수용가 Excel을 블록과 도면번호(row_no)로 기존 행과 대조합니다. 기존 행은 이름·주소·구계량기번호·최종지침·블록 5개 필드만 갱신하고 신규 행을 추가합니다. 조사값과 사진 참조는 갱신 대상에서 제외하며, 파일에 없는 기존 행도 유지합니다.'],
    ['원본 제출 양식 유지', '통합문서를 새로 만드는 대신 JSZip으로 압축을 열어 시트와 공유 문자열 XML에 결과를 채웁니다. 원본 레이아웃과 서식을 유지하려는 선택이며, 양식이 바뀌면 실제 출력물을 대조해야 합니다.'],
    ['업무 데이터와 사진 객체 분리', 'Supabase PostgreSQL에는 업무 데이터와 사진 참조를, Cloudflare R2에는 이미지 객체를 보관합니다. 서버 업로드와 5분 만료 Presigned URL을 지원하며, 객체 처리와 DB 갱신은 별도 실패 경계로 다룹니다.'],
    ['현장과 사무실에서 같은 업무 연결', 'PC와 모바일 탐색 메뉴로 같은 조사 업무에 접근합니다. NAVER 지도와 주소 좌표 변환으로 위치를 확인하고, 수용가는 사진 참조 4개, 밸브는 2개를 관리합니다.'],
  ];

  return <div className="portfolio study-page meter-study text-ink font-body">
    <a className="skip-link" href="#meter-study-main" onClick={event => {
      event.preventDefault();
      document.getElementById('meter-study-main')?.focus();
      document.getElementById('meter-study-main')?.scrollIntoView();
    }}>{en ? 'Skip to content' : '본문으로 바로가기'}</a>
    <header className="site-header">
      <a className="brand" href="#projects">Issac<span>.dev</span></a>
      <nav aria-label={en ? 'Project navigation' : '프로젝트 메뉴'}>
        <a href="#projects">{en ? 'All projects' : '전체 프로젝트'} ↗</a>
        <div className="language-switch" role="group" aria-label={en ? 'Language' : '언어'}>
          <button lang="ko" aria-pressed={!en} onClick={() => setLanguage('ko')}>KR</button>
          <button lang="en" aria-pressed={en} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </nav>
    </header>
    <main id="meter-study-main" tabIndex={-1} className="page-shell">
      <div className="study-hero">
        <p className="section-kicker">METER ADMIN / FIELD SURVEY MANAGER</p>
        <h1>{en ? 'Keep field evidence.\nDeliver it in the required format.' : '현장의 기록을 지키고,\n필요한 양식으로 전달합니다.'}</h1>
        <p>{en ? 'Client work · Live in production · Ongoing maintenance' : '외주 프로젝트 · 실서비스 운영 · 유지보수 중'}<br />Next.js 16 · React 19 · Supabase · Cloudflare R2 · NAVER Maps</p>
      </div>
      <nav className="study-tabs" aria-label={en ? 'Related project' : '연관 프로젝트'}>
        <a href="#/projects/field-work">{en ? 'Field Work Manager case study' : '수도관리자 사례도 보기'} ↗</a>
      </nav>
      <Section title={en ? 'From spreadsheet to field survey to delivery' : 'Excel에서 시작해 현장 조사와 제출까지'}>
        <p>{en ? 'Office users register consumer and valve lists, field users add readings, photos and location information, and administrators review progress and export results. The application connects these steps for water-meter, gate-valve, air-valve and hydrant surveys.' : '사무실에서 수용가·밸브 목록을 등록하고, 현장에서 지침·사진·위치를 기록한 뒤, 관리자가 진행상태와 결과물을 확인합니다. 수도 계량기와 제수밸브·공기밸브·소화전 조사의 등록부터 결과 추출까지 연결한 도구입니다.'}</p>
        <ol className="study-flow">{(en ? ['Import & preview Excel', 'Find by block / map', 'Record survey & photos', 'Review progress', 'Export / fill template'] : ['Excel 등록·미리보기', '블록·지도에서 대상 조회', '조사값·사진 기록', '진행상태 확인', 'Excel 추출·원본 양식 채우기']).map(step => <li key={step}>{step}</li>)}</ol>
      </Section>
      <Section title={en ? 'Architecture around the workflow' : '업무 흐름을 기준으로 나눈 구성'}>
        <figure className="study-diagram">
          <div><b>{en ? 'Browser' : '브라우저'}</b><span>{en ? 'Desktop / mobile' : 'PC / 모바일'}</span></div><span aria-hidden="true">→</span>
          <div><b>Next.js App Router</b><span>Server Actions / Route Handlers</span></div><span aria-hidden="true">→</span>
          <div><b>Supabase</b><span>Auth / PostgreSQL</span></div>
          <div className="study-storage"><span>Cloudflare R2 · {en ? 'Photos' : '조사 사진'}</span><span>NAVER · {en ? 'Maps / geocoding' : '지도 / 좌표 변환'}</span><span>JSZip / xlsx / Zod · Excel</span></div>
          <figcaption>{en ? 'A code-based schematic. Presigned uploads can send photos directly from the browser to R2.' : '소스 기반 구성도입니다. Presigned 업로드에서는 브라우저가 사진을 R2로 직접 전송합니다.'}</figcaption>
        </figure>
        <p>{en ? 'The features directory groups authentication, consumer surveys, valve surveys and Excel workflows. Shared modules contain Supabase clients, R2 access and navigation. This keeps domain-specific parsing and update policies close to each workflow.' : 'features 아래에 인증·수용가 조사·밸브 조사·Excel 업무를 구분하고, Supabase 클라이언트·R2 접근·탐색 메뉴를 shared에 모았습니다. 도메인마다 다른 파싱 방식과 갱신 정책을 각 업무 가까이에 둔 구조입니다.'}</p>
      </Section>
      <Section title={en ? 'Implementation choices and their tradeoffs' : '구현에서 중요하게 다룬 선택'}>
        <div className="study-grid">{(en ? englishDecisions : koreanDecisions).map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Section>
      <Section title={en ? 'Different domains need different update rules' : '같은 Excel 업로드라도 갱신 규칙은 다르게'}>
        <p>{en ? 'Consumer imports protect existing field values. Valve imports instead match by block and valve number and update a broader set of uploaded fields. The two paths cannot share a blanket “safe reimport” guarantee. Insert and update requests also run separately, so partial failure needs reconciliation.' : '수용가 재업로드는 기존 현장 입력값을 보존하지만, 밸브는 블록과 밸브번호로 매칭해 업로드 필드를 더 넓게 갱신합니다. 두 경로를 같은 보존 정책으로 설명할 수 없습니다. INSERT와 UPSERT도 별도 요청이므로 일부 성공 후 실패한 경우의 대조가 필요합니다.'}</p>
        <p>{en ? 'The general list treats a survey as complete when meter number, reading, seal, location, usage type and floor are all present, with separate terminal statuses. Some export paths use different filters; list totals and export totals must be compared before treating them as equivalent.' : '일반 목록은 계량기번호·지침·봉인·위치·용도·층수 6개 필드로 완료를 판단하고 종결 사유를 별도로 구분합니다. 일부 추출 경로의 필터는 다르므로 목록 집계와 Excel 건수를 동일 지표로 단정하지 않습니다.'}</p>
      </Section>
      <Section title={en ? 'Development with Claude Code' : 'Claude Code 중심의 개발과 검토'}>
        <p>{en ? 'Designed and developed with Claude Code as the primary AI coding tool. The collaboration rules separate AI implementation support from developer approval of requirements, data-consistency policies, acceptance criteria and production changes. This project uses Claude Code; the separate Field Work Manager case study describes Codex-assisted work.' : '프로젝트 전반을 Claude Code 중심으로 설계·개발했습니다. 협업 규칙은 AI의 구현 지원과 개발자의 요구사항·정합성 정책·수용 기준·운영 변경 승인을 구분합니다. 야장관리자의 Claude Code 활용과 별도 수도관리자 프로젝트의 Codex 활용을 구분해 기록합니다.'}</p>
        <ul>{(en ? ['Define update boundaries before changing Excel logic.', 'Review generated changes against existing domain rules and source code.', 'Validate imports, exports, roles, photos and maps before production changes.'] : ['Excel 처리 변경 전 기존 값의 보존 범위와 갱신 범위를 정리합니다.', 'AI가 작성한 변경을 기존 업무 규칙과 소스에 대조합니다.', '운영 반영 전 입출력·권한·사진·지도의 실제 시나리오를 검증 대상으로 둡니다.']).map(item => <li key={item}>{item}</li>)}</ul>
      </Section>
      <Section title={en ? 'Product demonstration' : '서비스 시연'}>
        <figure className="demo-video">
          <video src={videoUrl} controls playsInline preload="none" aria-label={en ? 'Field Survey Manager demonstration' : '야장관리자 시연 영상'} />
          <figcaption><a className="text-teal underline" href={videoUrl} target="_blank" rel="noreferrer">{en ? 'Open the existing demonstration video' : '기존 시연 영상 직접 열기'} ↗</a></figcaption>
        </figure>
      </Section>
      <div className="study-callout">
        <b>{en ? 'Evidence and remaining verification' : '기록의 근거와 남은 검증'} </b>
        <p>{en ? 'Implementation details were checked against repository revision 04425a9 on 10 November 2026. Production/maintenance status follows the existing project description; live infrastructure, customer records and performance were not tested for this write-up. The source documents outstanding endpoint authorization checks, DB/storage consistency and shared infrastructure. This page does not claim those concerns are resolved.' : '2026년 11월 10일 저장소 04425a9 소스와 문서를 대조해 작성했습니다. 운영·유지보수 상태는 기존 프로젝트 설명을 따르며, 이번 정리에서 실제 운영 인프라·고객 데이터·성능을 검증하지 않았습니다. 원본 문서의 엔드포인트 인가 점검, DB·스토리지 일관성, 공유 인프라 확인 과제는 해결 완료로 표현하지 않습니다.'}</p>
      </div>
      <section className="study-resources" aria-labelledby="meter-sources">
        <h2 id="meter-sources">{en ? 'Source and engineering notes' : '소스와 구현 근거'}</h2>
        <div className="study-links">{[
          [source, 'GitHub'],
          [`${revision}/features/meter-survey/api/actions.ts`, en ? 'Import policy' : '수용가 갱신 정책'],
          [`${revision}/features/excel-manager/api/template-fill.ts`, en ? 'Template export' : '원본 양식 채우기'],
          [`${revision}/ARCHITECTURE.md`, en ? 'Architecture & limitations' : '구조와 검토 과제'],
          [`${revision}/CLAUDE.md`, en ? 'AI collaboration rules' : 'AI 협업 규칙'],
        ].map(([href, label]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Issac Oh</span><a href="#projects">{en ? 'All projects' : '전체 프로젝트'} ↑</a></footer>
  </div>;
}
