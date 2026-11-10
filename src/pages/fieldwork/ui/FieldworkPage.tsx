import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLanguageStore } from '@/shared/model/useLanguageStore';
import results from '../model/performance.json';

export type FieldworkSection = 'overview' | 'performance' | 'codex';
const base = '#/projects/field-work';
const sources = 'https://github.com/issac-52/field-worker';
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="study-section"><h2>{title}</h2>{children}</section>;
}
function Diagram({ en }: { en: boolean }) {
  return <figure className="study-diagram">
    <div><b>React / Vite</b><span>{en ? 'Field & admin UI' : '현장 입력 · 관리자 화면'}</span></div><span aria-hidden="true">→</span>
    <div><b>Cloudflare Workers</b><span>{en ? 'Assets & API proxy' : '정적 자산 · API 프록시'}</span></div><span aria-hidden="true">→</span>
    <div><b>Spring Boot / EC2</b><span>{en ? 'Authentication · domain APIs' : '인증 · 업무 API · 문서 작업'}</span></div>
    <div className="study-storage"><span>PostgreSQL 17 · {en ? 'Business records' : '업무 데이터'}</span><span>Cloudflare R2 · {en ? 'Photos / HWPX / ZIP' : '사진 / HWPX / ZIP'}</span><span>NAVER · {en ? 'Maps / geocoding' : '지도 / 좌표 변환'}</span></div>
    <figcaption>{en ? 'Architecture schematic based on code and deployment configuration; not a production screenshot.' : '코드와 배포 구성을 요약한 구조도이며 운영 화면 캡처가 아닙니다.'}</figcaption>
  </figure>;
}
export function FieldworkPage({ section }: { section: FieldworkSection }) {
  const { language, setLanguage } = useLanguageStore();
  const en = language === 'en';
  const tabs: [FieldworkSection, string][] = [['overview', en ? 'Project' : '프로젝트 개요'], ['performance', en ? 'Performance' : '성능 개선 기록'], ['codex', en ? 'With Codex' : 'Codex 기반 개발']];
  const title = tabs.find(([key]) => key === section)![1];
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${title} · Field Work Manager | Issac Oh`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', en ? 'A Codex-assisted field operations MVP. Architecture, synthetic 20k-site performance experiments and transparent engineering evidence.' : '약 2만 수용가 현장 검침 시스템. 프로젝트 구조와 Codex 협업, 가상 데이터 성능 개선의 실행 근거를 기록합니다.');
  }, [language, title, en]);
  const first20 = results.comparisons.find(r => r.name === 'list_20_first_page')!;
  const first100 = results.comparisons.find(r => r.name === 'list_100_first_page')!;
  const number = (v: number) => v.toFixed(2);
  const scope = en ? 'Synthetic 20,000 sites · Java 21 / PostgreSQL 17 · Development benchmark, not production HTTP latency.' : '가상 수용가 20,000건 · Java 21 / PostgreSQL 17 · 운영 HTTP 응답시간이 아닌 개발 환경 측정';
  return <div className="portfolio study-page text-ink font-body">
    <a className="skip-link" href="#study-main" onClick={event => {event.preventDefault(); document.getElementById('study-main')?.focus(); document.getElementById('study-main')?.scrollIntoView();}}>{en ? 'Skip to content' : '본문으로 바로가기'}</a>
    <header className="site-header"><a className="brand" href="#projects">Issac<span>.dev</span></a>
      <nav aria-label={en ? 'Project navigation' : '프로젝트 메뉴'}><a href="#projects">{en ? 'All projects' : '전체 프로젝트'} ↗</a>
        <div className="language-switch" role="group" aria-label={en ? 'Language' : '언어'}>
          <button lang="ko" aria-pressed={!en} onClick={() => setLanguage('ko')}>KR</button>
          <button lang="en" aria-pressed={en} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </nav>
    </header>
    <main id="study-main" tabIndex={-1} className="page-shell">
      <div className="study-hero"><p className="section-kicker">FIELD WORK MANAGER / ENGINEERING JOURNAL</p>
        <h1>{section === 'overview' ? (en ? 'From field records to a connected workflow.' : '현장의 기록을,\n하나의 업무 흐름으로.') : section === 'performance' ? (en ? 'Measure first. Reduce the actual cost.' : '먼저 측정하고,\n실제 비용을 줄였습니다.') : (en ? 'Building with Codex. Verifying with evidence.' : 'Codex와 구현하고,\n실행 결과로 검증합니다.')}</h1>
        <p>{en ? 'Client work · MVP implemented, deployment connected · Ongoing improvements' : '외주 프로젝트 · MVP 구현 및 배포 연결 · 지속 개선 중'}<br />{en ? 'Last documented: 10 November 2026' : '기록 기준: 2026년 11월 10일'}</p>
      </div>
      <nav className="study-tabs" aria-label={en ? 'Case study sections' : '상세 기록'}>
        {tabs.map(([key, label]) => <a key={key} href={`${base}${key === 'overview' ? '' : `/${key}`}`} aria-current={section === key ? 'page' : undefined}>{label}<span>↗</span></a>)}
      </nav>
      {section === 'overview' && <>
        <Section title={en ? 'The workflow, not just the screens' : '화면보다 먼저 연결한 업무 흐름'}>
          <p>{en ? 'Field workers and administrators need a shared record of who inspected each site, which photos belong to START/END readings, and how completed work enters settlement and printable cards. The MVP connects these steps across approximately 20,000 service sites and an expected team of around 20 users.' : '조사자와 관리자는 누가 어떤 현장을 검침했는지, 사진이 어느 단계에 속하는지, 작업 결과가 정산과 검침카드에 어떻게 반영되는지 함께 확인해야 합니다. 약 2만 수용가와 약 20명 사용자를 대상으로 Excel 등록부터 현장 기록·정산·출력을 연결했습니다.'}</p>
          <ol className="study-flow">{(en ? ['Import Excel', 'Geocode & find on map', 'Record START / END + photos', 'Review & settle', 'Export Excel / HWPX'] : ['Excel 수용가 등록', '주소 좌표 변환·지도 조회', 'START / END·사진 기록', '이력 확인·정산', 'Excel / HWPX 출력']).map(t => <li key={t}>{t}</li>)}</ol>
        </Section>
        <Section title={en ? 'System boundaries' : '시스템 구성과 경계'}><Diagram en={en} /><p>{en ? 'The backend stays a feature-organized Spring Boot application. PostgreSQL owns business records; private R2 stores photos and generated artifacts. The frontend proxies API requests through Workers. GitHub Actions builds the backend JAR for EC2 delivery.' : '백엔드는 기능별 패키지로 구성한 단일 Spring Boot 애플리케이션입니다. PostgreSQL이 업무 데이터를, 비공개 R2가 사진과 생성 파일을 보관합니다. 프론트는 Workers의 API 프록시를 거치며, GitHub Actions에서 빌드한 JAR를 EC2로 전달합니다.'}</p></Section>
        <Section title={en ? 'Business rules shape the implementation' : '업무 규칙을 구현의 기준으로'}>
          <div className="study-grid">{(en ? [
            ['Import identity', 'Unique consumer numbers; unnumbered sites use address and name. Preserve first rows, report duplicates, support visible-row imports and preview deletion.'],
            ['Readings & evidence', 'Independent START/END dates and workers, reject END readings below START, retain history, and allow up to six photos per site.'],
            ['Access & settlement', 'Administrator-issued accounts, forced initial password change, server-side roles/CSRF and protection for confirmed/paid settlement.'],
            ['Documents', 'HWPX cards include site data and photos. Reuse cached documents, run background jobs, offer combined ZIP downloads and cancellation/cleanup.'],
          ] : [
            ['등록과 식별', '수용가번호 UNIQUE, 번호 없는 자료는 주소·이름으로 식별합니다. 최초 행 우선·중복 보고·보이는 행 업로드와 삭제 미리보기를 제공합니다.'],
            ['검침과 증빙', 'START/END의 날짜·작업자를 독립 관리하고 END 지침이 START보다 작으면 거부합니다. 변경 이력과 현장당 최대 6장 사진을 관리합니다.'],
            ['권한과 정산', '관리자 발급 계정과 최초 비밀번호 변경, 서버 권한·CSRF 검증, 확정·지급 정산 자료 보호를 적용합니다.'],
            ['문서와 파일', '사진을 포함한 HWPX 검침카드를 생성합니다. 문서 캐시, 백그라운드 작업, 전체 ZIP 다운로드, 작업 취소·생성물 정리를 제공합니다.'],
          ]).map(([h,p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
        </Section>
        <Section title={en ? 'From implementation to measured improvement' : '구현 이후, 측정 가능한 개선으로'}>
          <p>{en ? `The list endpoint issued ${first20.beforeSql} SQL executions for 20 rows and ${first100.beforeSql} for 100 rows. A repeatable experiment led to batched reads, with ${first100.afterSql} SQL executions for either page size. The next page presents measurements and their limits.` : `목록 20건에 SQL ${first20.beforeSql}회, 100건에 ${first100.beforeSql}회가 발생하는 구조를 측정했습니다. 페이지 단위 일괄 조회로 두 경우 모두 ${first100.afterSql}회로 줄였고, 응답 호환성과 권한을 테스트했습니다. 다음 페이지에 조건·결과·해석의 한계를 함께 남겼습니다.`}</p>
          <a className="primary-link" href={`${base}/performance`}>{en ? 'Read the performance experiment' : '성능 개선 기록 보기'} →</a>
        </Section>
      </>}
      {section === 'performance' && <>
        <div className="study-callout"><b>{en ? 'A local paired experiment, not a production speed claim' : '운영 속도 성과와 개발 환경 실험을 구분합니다'}</b><p>{scope}</p></div>
        <div className="study-metrics"><article><span>{en ? '20-row list SQL' : '20건 목록 SQL'}</span><strong>{first20.beforeSql} → {first20.afterSql}</strong></article><article><span>{en ? '100-row list SQL' : '100건 목록 SQL'}</span><strong>{first100.beforeSql} → {first100.afterSql}</strong></article><article><span>{en ? 'PostgreSQL regression tests' : 'PostgreSQL 회귀 테스트'}</span><strong>{results.tests} PASS</strong></article></div>
        <Section title={en ? 'Observation → hypothesis → change' : '관측 → 가설 → 변경'}>
          <p>{en ? 'The old list endpoint fetched IDs, then loaded each site’s detail, photos and inspections separately: 2 + 3N JDBC executions. Before adding a cache, I focused on this per-row database access pattern.' : '기존 목록은 전체 건수와 ID 목록을 조회한 뒤 각 수용가의 기본정보·사진·검침을 다시 읽었습니다. JDBC 실행 수가 2 + 3N으로 늘어나므로 캐시 도입 전에 이 반복 조회 구조를 우선 개선했습니다.'}</p>
          <div className="study-code">{en ? 'Before: count + IDs + N × (site + photos + readings)' : '개선 전: 전체 건수 + ID 목록 + N × (기본정보 + 사진 + 검침)'}<br /><span>↓</span><br />{en ? 'After: count + page sites + grouped photo counts + page readings' : '개선 후: 전체 건수 + 페이지 기본정보 + 사진 수 집계 + 페이지 검침'}</div>
          <p>{en ? 'The page’s IDs bound two bulk queries. Shared mapping preserves the detail response semantics; worker responses still omit fees and settlement state. No Redis, message broker, schema migration or public API change was needed.' : '선택된 페이지의 ID만 모아 사진 수와 검침을 일괄 조회합니다. 상세와 공통 매핑을 사용하되 작업자에게 금액·정산 상태가 노출되지 않게 유지했습니다. Redis·메시지 시스템·DB 마이그레이션·공개 API 변경 없이 적용했습니다.'}</p>
        </Section>
        <Section title={en ? 'Measured results' : '실제 측정 결과'}>
          <figure className="study-chart"><img src="/fieldwork/query-count.png" alt={en ? 'SQL count before and after: 62 to 4 for 20 rows and 302 to 4 for 100 rows' : 'SQL 실행 수: 20건 62→4회, 100건 302→4회'} /><figcaption>{en ? 'JDBC execute calls per request. This metric is independent of timing noise.' : '요청당 JDBC execute 호출 수. 응답시간 변동과 별개로 확인한 구조적 변화입니다.'}</figcaption></figure>
          <figure className="study-chart"><img src="/fieldwork/latency.png" alt={en ? 'Measured list latency before and after' : '목록 조회 개선 전후 실측 시간 그래프'} /><figcaption>{en ? 'Same 20k fixture, environment and harness; 10–20 samples per read scenario.' : '동일한 가상 2만 건·실행 환경·측정 코드. 조회별 표본 10~20회입니다.'}</figcaption></figure>
          <div className="study-table"><table><thead><tr>{(en ? ['Scenario','SQL before → after','p50 before → after (ms)','p95 before → after (ms)'] : ['시나리오','SQL 전 → 후','p50 전 → 후 (ms)','p95 전 → 후 (ms)']).map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{results.comparisons.map(r=><tr key={r.name}><th>{en?r.labelEn:r.label}</th><td>{r.beforeSql} → {r.afterSql}</td><td>{number(r.beforeP50)} → {number(r.afterP50)}</td><td>{number(r.beforeP95)} → {number(r.afterP95)}</td></tr>)}</tbody></table></div>
          <p>{en ? `With concurrency 10 and 100 list requests, p50 changed from ${number(results.concurrent.beforeP50)} to ${number(results.concurrent.afterP50)} ms and p95 from ${number(results.concurrent.beforeP95)} to ${number(results.concurrent.afterP95)} ms. This bounded closed-loop test does not establish maximum RPS.` : `동시성 10·목록 100회 실험에서 p50은 ${number(results.concurrent.beforeP50)}→${number(results.concurrent.afterP50)}ms, p95는 ${number(results.concurrent.beforeP95)}→${number(results.concurrent.afterP95)}ms였습니다. 제한된 반복 실험으로 최대 RPS를 산정하지 않았습니다.`}</p>
        </Section>
        <Section title={en ? 'How the result was verified' : '결과를 검증한 방법'}>
          <ul>{(en ? ['Re-measured the latest develop revision before changing code; retained both raw JSON files.', 'Observed three failing query-budget cases, then verified a constant four-query budget for page sizes 1, 20 and 100.', 'Compared list records to detail records for both roles; tested filters, order, page clamping, missing numbers and empty pages.', 'Ran the complete PostgreSQL regression suite and built the JAR.'] : ['최신 develop에서 개선 전을 다시 측정하고 전후 원시 JSON을 보관했습니다.', '쿼리 상한 테스트 3개가 실패하는 것을 먼저 확인하고 1·20·100건 요청에서 4회 이하를 검증했습니다.', '관리자·작업자 각각 목록과 상세를 비교하고 필터·정렬·페이지 보정·번호 미등록·빈 목록을 검증했습니다.', '전체 PostgreSQL 회귀 테스트와 실행 JAR 빌드를 통과했습니다.']).map(x=><li key={x}>{x}</li>)}</ul>
          <p>{en ? 'Conditions: CPU allocation 2, environment memory cap 8 GiB, JVM heap 768 MiB, connection pool 10, Java 21, PostgreSQL 17, 10k START and 5k END records. Service/controller + JSON serialization; no HTTP/auth filters, browser, Cloudflare or real R2. No production change was made in this experiment.' : '조건: CPU 할당 2개, 환경 메모리 한도 8GiB, JVM 힙 768MiB, 커넥션 풀 10개, Java 21·PostgreSQL 17, START 1만·END 5천 건. 서비스/컨트롤러와 JSON 직렬화를 측정했으며 HTTP·인증 필터·브라우저·Cloudflare·실제 R2는 제외했습니다. 이번 개선의 운영 적용은 별도입니다.'}</p>
          <p>{en ? 'Timing is one paired run with small warm sample sets, not a long-running load test or a confidence interval. SQL-call reduction is the primary confirmed result. Unchanged map/document scenarios serve as context, not evidence of improvements to those paths.' : '예열 후 소표본으로 전후 한 쌍을 측정한 결과이며 장시간 부하나 신뢰구간을 제시한 실험은 아닙니다. SQL 횟수 감소를 핵심 검증 결과로 삼았습니다. 수정하지 않은 지도·문서의 시간 차이를 해당 기능의 개선 성과로 주장하지 않습니다.'}</p>
          <div className="study-links"><a href="/fieldwork/report.pdf" target="_blank" rel="noreferrer">{en ? 'Download report PDF' : '개선 결과 PDF'} ↗</a><a href="/fieldwork/before.json" target="_blank" rel="noreferrer">Before JSON ↗</a><a href="/fieldwork/after.json" target="_blank" rel="noreferrer">After JSON ↗</a></div>
        </Section>
        <Section title={en ? 'What remains' : '다음 개선 대상으로 남긴 것'}><p>{en ? 'Photo-heavy HWPX rendering, ZIP reuse, search and spatial indexes need their own experiments. The earlier document-cache comparison was first generation versus cache reuse, not a code optimization result. Redis and SQS remain options to evaluate against measured needs.' : '사진 포함 HWPX 생성기, ZIP 재사용, 검색·좌표 인덱스는 별도 실험이 필요합니다. 앞선 문서 측정의 최초 생성/캐시 재사용 차이는 코드 개선 전후 성과가 아닙니다. Redis·SQS도 필요가 관측될 때 검토할 후보로 남겼습니다.'}</p></Section>
      </>}
      {section === 'codex' && <>
        <Section title={en ? 'Make AI assistance visible' : 'AI의 기여와 사람의 판단을 구분합니다'}><p>{en ? 'This project was developed with Codex assistance. Rather than present generated code as independently hand-written work, this case study records the business decisions, implementation changes, executed checks and remaining limits separately.' : '이 프로젝트는 Codex를 활용해 개발했습니다. AI가 작성한 코드를 모두 직접 작성한 것처럼 표현하기보다, 업무 판단·구현 변경·실제 실행 검증·남은 한계를 구분해 기록합니다.'}</p></Section>
        <Section title={en ? 'Division of responsibility' : '역할과 책임'}><div className="study-grid"><article><h3>{en ? 'My decisions & review' : '사용자·개발자로서 결정한 것'}</h3><ul>{(en ? ['Confirm field workflows and acceptance rules with business context.', 'Decide identity, settlement protection and destructive-operation scope.', 'Configure deployment accounts and environments; review and merge pull requests.'] : ['현장 업무 흐름과 수용 기준을 구체화합니다.', '수용가 식별, 정산 보호, 삭제 대상과 영향 범위를 결정합니다.', '운영 계정·환경을 설정하고 변경 내용을 검토한 뒤 PR을 병합합니다.']).map(x=><li key={x}>{x}</li>)}</ul></article><article><h3>{en ? 'Codex assistance' : 'Codex가 지원한 것'}</h3><ul>{(en ? ['Inspect repository instructions, API contracts and existing code.', 'Implement changes, write tests and execute checks in an isolated environment.', 'Create reproducible measurements, investigate failures and draft reports/PRs.'] : ['저장소 지침·API 계약·현재 구현을 조사합니다.', '변경 구현과 테스트 작성을 지원하고 독립 환경에서 검증을 실행합니다.', '재현 가능한 측정, 오류 원인 조사, 문서·PR 정리를 지원합니다.']).map(x=><li key={x}>{x}</li>)}</ul></article></div></Section>
        <Section title={en ? 'A concrete feedback loop' : '이번 개선에서 실제로 진행한 순서'}><ol className="study-steps">{(en ? [
          ['Inspect', 'Measured 62/302 SQL calls for 20/100 list rows. Read the actual service instead of assuming a cache was required.'],
          ['Reproduce', 'Added query-budget and response-compatibility tests. Three budget cases failed before the change.'],
          ['Change', 'Replaced per-site detail loading with page-level bulk reads and shared mapping.'],
          ['Verify', `Passed ${results.tests} PostgreSQL regression tests, built the JAR and repeated the same benchmark.`],
          ['Review', 'Preserved raw results and scope limits in reports and reviewable PRs; did not deploy the change automatically.'],
        ] : [
          ['조사', '20/100건 목록에서 SQL 62/302회를 측정했습니다. 캐시부터 도입하지 않고 실제 서비스 코드를 확인했습니다.'],
          ['재현', '쿼리 상한과 응답 호환성 테스트를 작성했고 상한 테스트 3개가 실패하는 것을 확인했습니다.'],
          ['변경', '수용가별 상세 호출을 페이지 단위 일괄 조회와 공통 매핑으로 교체했습니다.'],
          ['검증', `PostgreSQL 회귀 ${results.tests}개와 JAR 빌드를 통과한 뒤 같은 조건으로 성능을 재측정했습니다.`],
          ['검토', '원시 결과와 해석 한계를 문서·PR로 남기고 운영에 자동 반영하지 않았습니다.'],
        ]).map(([h,p])=><li key={h}><h3>{h}</h3><p>{p}</p></li>)}</ol></Section>
        <Section title={en ? 'Evidence over generated confidence' : '생성된 설명보다 실행 근거를 우선합니다'}><p>{en ? 'Repository rules are kept in AGENTS.md. Customer workbooks/photos and credentials stay out of commits. Existing Flyway migrations are preserved. Successful synthetic tests do not establish production R2 behavior or real-user latency; unrun checks are identified explicitly.' : 'AGENTS.md에 작업 지침을 두고 개인정보 Excel·사진·자격 증명은 커밋하지 않습니다. 기존 Flyway 이력을 유지하고 새 마이그레이션을 추가합니다. 합성 테스트 통과를 실제 R2나 운영 사용자 응답시간의 검증으로 바꾸어 표현하지 않고, 실행하지 않은 검증은 명시합니다.'}</p><p>{en ? 'The portfolio separates the original Field Survey Manager, built primarily with Claude Code, from this Spring Boot project, developed with Codex assistance.' : '기존 야장관리자(Claude Code 중심 개발)와 이번 Spring Boot 기반 수도관리자(Codex 활용)는 서로 다른 프로젝트로 구분합니다.'}</p></Section>
      </>}
      <section className="study-resources"><h2>{en ? 'Source & evidence' : '소스와 검증 근거'}</h2><div className="study-links"><a href={sources} target="_blank" rel="noreferrer">GitHub / field-worker ↗</a><a href={results.pullRequestUrl || sources} target="_blank" rel="noreferrer">{en ? 'Performance pull request' : '성능 개선 PR'} ↗</a><a href="/fieldwork/report.pdf" target="_blank" rel="noreferrer">{en ? 'Measurement report' : '측정 리포트'} ↗</a></div><p>{en ? 'All published charts use fictional data. No customer records, locations or photos are included.' : '공개 그래프는 가상 데이터만 사용했습니다. 고객 정보·실제 좌표·사진은 포함하지 않았습니다.'}</p></section>
    </main>
    <footer className="site-footer"><span>FIELD WORK MANAGER · 2026.11.10</span><a href="#projects">{en ? 'Back to projects' : '프로젝트 목록으로'} ↑</a></footer>
  </div>;
}
