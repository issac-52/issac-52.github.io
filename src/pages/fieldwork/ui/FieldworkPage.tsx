import results from '../model/performance.json';
import { Arrow, Bullets, CaseStudy, Decisions, Diagram, Flow, Metrics, Prose, Section, useT, type L } from '@/widgets/case-study/ui/CaseStudy';

/** `codex` is kept so old links still work; it now renders the overview. */
export type FieldworkSection = 'overview' | 'performance' | 'codex';
const base = '#/projects/field-work';
const source = 'https://github.com/issac-52/field-worker';

export function FieldworkPage({ section }: { section: FieldworkSection }) {
  const t = useT();
  const performance = section === 'performance';
  const first20 = results.comparisons.find(r => r.name === 'list_20_first_page')!;
  const first100 = results.comparisons.find(r => r.name === 'list_100_first_page')!;
  const tabs = [
    { href: base, label: { ko: '개요', en: 'Overview', ja: '概要' }, current: !performance },
    { href: `${base}/performance`, label: { ko: '성능 개선 기록', en: 'Performance work', ja: '性能改善' }, current: performance },
  ];
  const metrics = <Metrics items={[
    { value: `${first20.beforeSql} → ${first20.afterSql}`, label: { ko: '목록 20건 조회 시 SQL 실행 수', en: 'SQL calls, 20-row list' } },
    { value: `${first100.beforeSql} → ${first100.afterSql}`, label: { ko: '목록 100건 조회 시 SQL 실행 수', en: 'SQL calls, 100-row list' } },
    { value: `${results.tests}`, label: { ko: '통과한 PostgreSQL 회귀 테스트', en: 'PostgreSQL regression tests passed' } },
  ]}/>;

  return <CaseStudy
    id="field-work"
    title={{ ko: '수도관리자', en: 'Water Operations Manager', ja: '水道現場業務管理システム' }}
    pageTitle={performance ? { ko: '수도관리자 · 성능 개선 기록', en: 'Water Operations Manager · Performance' } : undefined}
    status={{ ko: '실서비스 운영 중 · 실사용자 약 30명', en: 'Live in production · about 30 active users', ja: '本番運用中・利用者約30名' }}
    summary={{
      ko: '약 2만 수용가의 상수도 검침 업무를 위한 현장 업무 시스템입니다. Excel 등록, 지도에서 대상 찾기, START/END 검침과 사진 기록, 정산, HWPX 검침카드 출력을 한 흐름으로 연결했고, 현재 약 30명이 실제 업무에 쓰고 있습니다.',
      en: 'A field operations system for water-meter readings across about 20,000 service sites. It connects Excel import, map lookup, START/END readings with photos, settlement and HWPX reading cards in one workflow, and about 30 people use it in daily work.',
    }}
    role={{ ko: '외주 · 설계, 개발, 배포, 운영', en: 'Client work · Design, development, deployment and operation' }}
    stack={['Java 21', 'Spring Boot', 'PostgreSQL 17', 'React / Vite', 'Cloudflare Workers · R2', 'AWS EC2', 'Codex']}
    links={[{ href: source, label: { ko: 'GitHub', en: 'GitHub' } }]}
    tabs={tabs}
  >
    {!performance ? <>
      <Section title={{ ko: '업무 흐름', en: 'Workflow', ja: '業務フロー' }}>
        <Flow steps={[
          { ko: 'Excel로 수용가 등록, 중복과 삭제 대상 미리보기', en: 'Import sites from Excel with duplicate and deletion previews' },
          { ko: '주소를 좌표로 변환해 지도에서 대상 찾기', en: 'Geocode addresses and find sites on the map' },
          { ko: 'START·END 검침과 사진 기록', en: 'Record START and END readings with photos' },
          { ko: '이력 확인과 정산', en: 'Review history and settle' },
          { ko: 'Excel과 HWPX 검침카드로 출력', en: 'Export to Excel and HWPX reading cards' },
        ]}/>
      </Section>

      <Section title={{ ko: '시스템 구성', en: 'Architecture', ja: 'システム構成' }}>
        <Diagram
          path={[
            { name: 'React / Vite', role: { ko: '현장 입력 · 관리자 화면', en: 'Field and admin UI' } },
            { name: 'Cloudflare Workers', role: { ko: '정적 자산 · API 프록시', en: 'Assets · API proxy' } },
            { name: 'Spring Boot / EC2', role: { ko: '인증 · 업무 API · 문서 생성', en: 'Auth · domain APIs · documents' } },
          ]}
          stores={[
            { ko: 'PostgreSQL 17 · 업무 데이터', en: 'PostgreSQL 17 · business records' },
            { ko: 'Cloudflare R2 · 사진, HWPX, ZIP', en: 'Cloudflare R2 · photos, HWPX, ZIP' },
            { ko: 'NAVER · 지도와 좌표 변환', en: 'NAVER · maps and geocoding' },
          ]}
          caption={{ ko: 'GitHub Actions에서 빌드한 JAR를 EC2에 배포합니다.', en: 'GitHub Actions builds the JAR that is deployed to EC2.' }}
        />
        <Prose>{{ ko: '백엔드는 기능별 패키지로 나눈 단일 Spring Boot 애플리케이션입니다. 업무 데이터는 PostgreSQL에, 사진과 생성 문서는 비공개 R2에 둡니다.', en: 'The backend is a single Spring Boot application organized by feature. Business data lives in PostgreSQL; photos and generated documents live in a private R2 bucket.' }}</Prose>
      </Section>

      <Section title={{ ko: '설계에서 중요하게 본 것', en: 'Key design decisions', ja: '設計で重視したこと' }}>
        <Decisions items={[
          {
            title: { ko: '수용가를 정확히 식별한다', en: 'Identify every site exactly once' },
            body: { ko: '수용가번호는 중복을 허용하지 않고, 번호가 없는 자료는 주소와 이름으로 식별합니다. 중복은 먼저 들어온 행을 남기고 보고하며, 삭제는 미리보기로 영향 범위를 확인한 뒤 실행합니다.', en: 'Customer numbers are unique; sites without one are identified by address and name. Duplicates keep the first row and are reported, and deletions show their impact before they run.' },
          },
          {
            title: { ko: '검침 기록은 증빙이 된다', en: 'Readings double as evidence' },
            body: { ko: 'START와 END의 날짜와 작업자를 따로 관리하고, END 지침이 START보다 작으면 저장하지 않습니다. 변경 이력과 현장당 최대 6장의 사진을 남깁니다.', en: 'START and END keep their own dates and workers, and an END reading lower than START is rejected. Change history and up to six photos per site are kept.' },
          },
          {
            title: { ko: '정산 자료는 함부로 바뀌지 않는다', en: 'Settled data stays settled' },
            body: { ko: '관리자가 발급한 계정만 쓰고 첫 로그인 때 비밀번호를 바꾸게 합니다. 권한과 CSRF는 서버에서 검사하고, 확정·지급된 정산은 수정할 수 없습니다.', en: 'Only administrator-issued accounts exist, with a forced password change on first login. Roles and CSRF are enforced on the server, and confirmed or paid settlements are locked.' },
          },
          {
            title: { ko: '무거운 문서 작업은 뒤에서', en: 'Heavy documents run in the background' },
            body: { ko: '사진이 들어간 HWPX 검침카드는 백그라운드에서 만들고 캐시합니다. 전체 ZIP 다운로드, 작업 취소와 생성물 정리를 지원합니다.', en: 'HWPX reading cards with photos are generated in the background and cached, with full ZIP downloads, cancellation and cleanup.' },
          },
        ]}/>
      </Section>

      <Section title={{ ko: '조회 성능 개선', en: 'Query performance', ja: '照会性能の改善' }}>
        {metrics}
        <Prose>{{ ko: '목록 한 페이지를 읽을 때 수용가마다 상세·사진·검침을 따로 조회하는 구조를 찾아, 페이지 단위로 한 번에 읽도록 바꿨습니다. 가상 데이터 2만 건으로 전후를 측정했습니다.', en: 'The list endpoint loaded each site’s details, photos and readings separately. I changed it to read a whole page in bulk and measured before and after on a 20,000-site synthetic dataset.' }}</Prose>
        <a className="cs-more" href={`${base}/performance`}>{t({ ko: '성능 개선 기록 보기', en: 'Read the performance write-up', ja: '性能改善の記録を見る' })}<Arrow/></a>
      </Section>

      <Section title={{ ko: 'Codex로 개발한 방식', en: 'How I worked with Codex', ja: 'Codexでの開発' }}>
        <Prose>{{ ko: '구현과 테스트 작성은 Codex와 함께 진행하고, 업무 규칙·데이터 보호 범위·배포와 PR 병합은 제가 결정했습니다. 저장소 규칙은 AGENTS.md에 두고, 고객 Excel·사진·자격 증명은 커밋하지 않습니다.', en: 'Implementation and tests were written with Codex; business rules, data-protection scope, deployments and PR merges were my decisions. Repository rules live in AGENTS.md, and customer spreadsheets, photos and credentials are never committed.' }}</Prose>
        <Flow steps={[
          { ko: '조사: 실제 코드와 측정으로 원인 확인', en: 'Inspect: confirm the cause in code and measurements' },
          { ko: '재현: 실패하는 테스트를 먼저 작성', en: 'Reproduce: write a failing test first' },
          { ko: '변경: 최소 범위로 수정', en: 'Change: keep the fix minimal' },
          { ko: '검증: 전체 회귀 테스트와 같은 조건 재측정', en: 'Verify: full regression suite and the same benchmark again' },
          { ko: '검토: PR로 남기고 직접 리뷰 후 병합', en: 'Review: leave a PR, review it myself, then merge' },
        ]}/>
      </Section>

      <Section title={{ ko: '남은 과제', en: 'Next steps', ja: '今後の課題' }}>
        <Bullets items={[
          { ko: '사진이 많은 HWPX 생성 속도', en: 'Faster generation of photo-heavy HWPX cards' },
          { ko: '생성된 ZIP 재사용', en: 'Reuse of generated ZIP files' },
          { ko: '검색과 좌표 조회용 인덱스', en: 'Indexes for search and coordinate lookups' },
        ]}/>
      </Section>
    </> : <PerformanceContent metrics={metrics}/>}
  </CaseStudy>;
}

function PerformanceContent({ metrics }: { metrics: JSX.Element }) {
  const t = useT();
  const ms = (v: number) => v.toFixed(1);
  const head: L[] = [
    { ko: '시나리오', en: 'Scenario' }, { ko: 'SQL 전 → 후', en: 'SQL before → after' },
    { ko: 'p50 전 → 후 (ms)', en: 'p50 before → after (ms)' }, { ko: 'p95 전 → 후 (ms)', en: 'p95 before → after (ms)' },
  ];
  return <>
    <Section title={{ ko: '결과 요약', en: 'Summary', ja: '結果' }}>
      {metrics}
      <Prose>{{ ko: '가상 수용가 2만 건, Java 21과 PostgreSQL 17의 개발 환경에서 측정한 값입니다. 실제 운영 응답 시간과는 다를 수 있어, 환경에 덜 흔들리는 SQL 실행 수를 핵심 지표로 봤습니다.', en: 'Measured in a development environment with 20,000 synthetic sites on Java 21 and PostgreSQL 17. Because timings vary with the environment, the SQL call count is the primary result.' }}</Prose>
    </Section>

    <Section title={{ ko: '문제와 변경', en: 'Problem and change', ja: '問題と変更' }}>
      <Prose>{[
        { ko: '기존 목록은 전체 건수와 ID 목록을 읽은 뒤, 수용가마다 기본정보·사진·검침을 다시 조회했습니다. 그래서 SQL 실행 수가 2 + 3N으로 늘어났습니다.', en: 'The old list read the total count and the IDs, then queried details, photos and readings again for every site, so SQL calls grew as 2 + 3N.' },
        { ko: '캐시를 먼저 붙이지 않고, 현재 페이지의 ID로 사진 수와 검침을 한 번에 읽도록 바꿨습니다. 상세 화면과 같은 매핑을 써서 응답 형식을 유지하고, 작업자에게 금액과 정산 상태가 보이지 않는 규칙도 그대로 지켰습니다. Redis, 메시지 큐, DB 마이그레이션은 필요하지 않았습니다.', en: 'Instead of adding a cache, the page’s IDs are used to read photo counts and readings in bulk. The detail mapping is reused so responses stay identical, and workers still cannot see fees or settlement state. No Redis, message queue or schema migration was needed.' },
      ]}</Prose>
    </Section>

    <Section title={{ ko: '측정 결과', en: 'Measurements', ja: '測定結果' }}>
      <figure className="cs-figure"><img src="/fieldwork/query-count.png" alt={t({ ko: 'SQL 실행 수: 20건 62에서 4회, 100건 302에서 4회', en: 'SQL calls: 62 to 4 for 20 rows, 302 to 4 for 100 rows' })}/><figcaption>{t({ ko: '요청당 JDBC 실행 수', en: 'JDBC executions per request' })}</figcaption></figure>
      <figure className="cs-figure"><img src="/fieldwork/latency.png" alt={t({ ko: '목록 조회 개선 전후 응답 시간', en: 'List latency before and after' })}/><figcaption>{t({ ko: '같은 데이터·환경·측정 코드, 조회별 10~20회 측정', en: 'Same data, environment and harness; 10–20 samples per scenario' })}</figcaption></figure>
      <div className="cs-table"><table>
        <thead><tr>{head.map(h => <th key={h.en}>{t(h)}</th>)}</tr></thead>
        <tbody>{results.comparisons.map(r => <tr key={r.name}><th>{t({ ko: r.label, en: r.labelEn })}</th><td>{r.beforeSql} → {r.afterSql}</td><td>{ms(r.beforeP50)} → {ms(r.afterP50)}</td><td>{ms(r.beforeP95)} → {ms(r.afterP95)}</td></tr>)}</tbody>
      </table></div>
      <Prose>{{ ko: `동시 요청 10개로 목록을 100번 조회했을 때 p50은 ${ms(results.concurrent.beforeP50)}ms에서 ${ms(results.concurrent.afterP50)}ms로, p95는 ${ms(results.concurrent.beforeP95)}ms에서 ${ms(results.concurrent.afterP95)}ms로 줄었습니다.`, en: `With 10 concurrent clients making 100 list requests, p50 went from ${ms(results.concurrent.beforeP50)} to ${ms(results.concurrent.afterP50)} ms and p95 from ${ms(results.concurrent.beforeP95)} to ${ms(results.concurrent.afterP95)} ms.` }}</Prose>
    </Section>

    <Section title={{ ko: '검증 방법', en: 'How it was verified', ja: '検証方法' }}>
      <Bullets items={[
        { ko: '변경 전 최신 코드로 다시 측정하고, 전후 원본 데이터를 모두 보관했습니다.', en: 'Re-measured the latest code before the change and kept raw data for both runs.' },
        { ko: '쿼리 수 상한 테스트가 실패하는 것을 먼저 확인한 뒤, 1·20·100건 모두 4회 이하임을 검증했습니다.', en: 'Saw the query-budget tests fail first, then verified at most four queries for 1, 20 and 100 rows.' },
        { ko: '관리자와 작업자 각각 목록과 상세 응답을 비교하고, 필터·정렬·빈 페이지를 확인했습니다.', en: 'Compared list and detail responses for both roles, including filters, ordering and empty pages.' },
        { ko: `PostgreSQL 회귀 테스트 ${results.tests}개와 JAR 빌드를 통과했습니다.`, en: `Passed all ${results.tests} PostgreSQL regression tests and the JAR build.` },
      ]}/>
      <p className="cs-note">{t({ ko: '조건: CPU 2개, JVM 힙 768MiB, 커넥션 풀 10, START 1만·END 5천 건. 서비스와 JSON 직렬화까지 측정했고 HTTP·인증 필터·Cloudflare는 제외했습니다. 공개 자료는 모두 가상 데이터입니다.', en: 'Conditions: 2 CPUs, 768 MiB JVM heap, pool size 10, 10k START and 5k END records. Service and JSON serialization were measured; HTTP filters and Cloudflare were excluded. All published data is synthetic.' })}</p>
    </Section>

    <Section title={{ ko: '자료', en: 'Materials', ja: '資料' }}>
      <div className="cs-inline-links">
        <a href={results.pullRequestUrl || source} target="_blank" rel="noreferrer">{t({ ko: '성능 개선 PR', en: 'Pull request' })} ↗</a>
        <a href="/fieldwork/report.pdf" target="_blank" rel="noreferrer">{t({ ko: '측정 리포트 PDF', en: 'Report PDF' })} ↗</a>
        <a href="/fieldwork/before.json" target="_blank" rel="noreferrer">Before JSON ↗</a>
        <a href="/fieldwork/after.json" target="_blank" rel="noreferrer">After JSON ↗</a>
      </div>
    </Section>
  </>;
}
