import results from '../model/performance.json';
import { Arrow, Bullets, CaseStudy, Decisions, Diagram, Flow, Metrics, Prose, Section, useT, type L } from '@/widgets/case-study/ui/CaseStudy';

/** `codex` is kept so old links still work; it now renders the overview. */
export type FieldworkSection = 'overview' | 'performance' | 'codex';
const base = '#/projects/field-work';
const source = 'https://github.com/issac-52/field-worker';

const jaScenario: Record<string, string> = {
  list_20_first_page: '先頭ページ20件',
  list_100_first_page: '先頭ページ100件',
  list_20_last_page: '最終ページ20件',
  list_20_text_search: '文字列検索20件',
};

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
    { value: `${first20.beforeSql} → ${first20.afterSql}`, label: { ko: '목록 20건 조회 시 SQL 실행 수', en: 'SQL calls, 20-row list', ja: '一覧20件取得時のSQL実行回数' } },
    { value: `${first100.beforeSql} → ${first100.afterSql}`, label: { ko: '목록 100건 조회 시 SQL 실행 수', en: 'SQL calls, 100-row list', ja: '一覧100件取得時のSQL実行回数' } },
    { value: `${results.tests}`, label: { ko: '통과한 PostgreSQL 회귀 테스트', en: 'PostgreSQL regression tests passed', ja: '通過したPostgreSQL回帰テスト' } },
  ]}/>;

  return <CaseStudy
    id="field-work"
    title={{ ko: '수도관리자', en: 'Water Operations Manager', ja: '水道現場業務管理システム' }}
    pageTitle={performance ? { ko: '수도관리자 · 성능 개선 기록', en: 'Water Operations Manager · Performance', ja: '水道現場業務管理システム・性能改善' } : undefined}
    status={{ ko: '실서비스 운영 중 · 실사용자 약 30명', en: 'Live in production · about 30 active users', ja: '本番運用中・利用者約30名' }}
    summary={{
      ko: '약 2만 수용가의 상수도 검침 업무를 위한 현장 업무 시스템입니다. Excel 등록, 지도에서 대상 찾기, START/END 검침과 사진 기록, 정산, HWPX 검침카드 출력을 한 흐름으로 연결했고, 현재 약 30명이 실제 업무에 쓰고 있습니다.',
      en: 'A field operations system for water-meter readings across about 20,000 service sites. It connects Excel import, map lookup, START/END readings with photos, settlement and HWPX reading cards in one workflow, and about 30 people use it in daily work.',
      ja: '約2万件の需要家を対象にした上水道の検針業務のための現場業務システムです。Excel登録、地図での対象検索、START/ENDの検針と写真記録、精算、HWPX検針カードの出力を一つの流れにつなぎ、現在約30名が実際の業務で使っています。',
    }}
    role={{ ko: '외주 · 설계, 개발, 배포, 운영', en: 'Client work · Design, development, deployment and operation', ja: '受託・設計、開発、デプロイ、運用' }}
    stack={['Java 21', 'Spring Boot', 'PostgreSQL 17', 'React / Vite', 'Cloudflare Workers · R2', 'AWS EC2', 'Codex']}
    links={[{ href: source, label: { ko: 'GitHub', en: 'GitHub', ja: 'GitHub' } }]}
    tabs={tabs}
  >
    {!performance ? <>
      <Section title={{ ko: '업무 흐름', en: 'Workflow', ja: '業務フロー' }}>
        <Flow steps={[
          { ko: 'Excel로 수용가 등록, 중복과 삭제 대상 미리보기', en: 'Import sites from Excel with duplicate and deletion previews', ja: 'Excelで需要家を登録し、重複と削除対象をプレビュー' },
          { ko: '주소를 좌표로 변환해 지도에서 대상 찾기', en: 'Geocode addresses and find sites on the map', ja: '住所を座標に変換し、地図で対象を探す' },
          { ko: 'START·END 검침과 사진 기록', en: 'Record START and END readings with photos', ja: 'START・ENDの検針と写真を記録' },
          { ko: '이력 확인과 정산', en: 'Review history and settle', ja: '履歴の確認と精算' },
          { ko: 'Excel과 HWPX 검침카드로 출력', en: 'Export to Excel and HWPX reading cards', ja: 'ExcelとHWPXの検針カードに出力' },
        ]}/>
      </Section>

      <Section title={{ ko: '시스템 구성', en: 'Architecture', ja: 'システム構成' }}>
        <Diagram
          path={[
            { name: 'React / Vite', role: { ko: '현장 입력 · 관리자 화면', en: 'Field and admin UI', ja: '現場入力・管理画面' } },
            { name: 'Cloudflare Workers', role: { ko: '정적 자산 · API 프록시', en: 'Assets · API proxy', ja: '静的アセット・APIプロキシ' } },
            { name: 'Spring Boot / EC2', role: { ko: '인증 · 업무 API · 문서 생성', en: 'Auth · domain APIs · documents', ja: '認証・業務API・文書生成' } },
          ]}
          stores={[
            { ko: 'PostgreSQL 17 · 업무 데이터', en: 'PostgreSQL 17 · business records', ja: 'PostgreSQL 17・業務データ' },
            { ko: 'Cloudflare R2 · 사진, HWPX, ZIP', en: 'Cloudflare R2 · photos, HWPX, ZIP', ja: 'Cloudflare R2・写真、HWPX、ZIP' },
            { ko: 'NAVER · 지도와 좌표 변환', en: 'NAVER · maps and geocoding', ja: 'NAVER・地図と座標変換' },
          ]}
          caption={{ ko: 'GitHub Actions에서 빌드한 JAR를 EC2에 배포합니다.', en: 'GitHub Actions builds the JAR that is deployed to EC2.', ja: 'GitHub ActionsでビルドしたJARをEC2にデプロイします。' }}
        />
        <Prose>{{ ko: '백엔드는 기능별 패키지로 나눈 단일 Spring Boot 애플리케이션입니다. 업무 데이터는 PostgreSQL에, 사진과 생성 문서는 비공개 R2에 둡니다.', en: 'The backend is a single Spring Boot application organized by feature. Business data lives in PostgreSQL; photos and generated documents live in a private R2 bucket.', ja: 'バックエンドは機能別パッケージで構成した単一のSpring Bootアプリケーションです。業務データはPostgreSQLに、写真と生成文書は非公開のR2に置いています。' }}</Prose>
      </Section>

      <Section title={{ ko: '설계에서 중요하게 본 것', en: 'Key design decisions', ja: '設計で重視したこと' }}>
        <Decisions items={[
          {
            title: { ko: '수용가를 정확히 식별한다', en: 'Identify every site exactly once', ja: '需要家を正確に識別する' },
            body: { ko: '수용가번호는 중복을 허용하지 않고, 번호가 없는 자료는 주소와 이름으로 식별합니다. 중복은 먼저 들어온 행을 남기고 보고하며, 삭제는 미리보기로 영향 범위를 확인한 뒤 실행합니다.', en: 'Customer numbers are unique; sites without one are identified by address and name. Duplicates keep the first row and are reported, and deletions show their impact before they run.', ja: '需要家番号は重複を許さず、番号のないデータは住所と氏名で識別します。重複は先に入った行を残して報告し、削除はプレビューで影響範囲を確認してから実行します。' },
          },
          {
            title: { ko: '검침 기록은 증빙이 된다', en: 'Readings double as evidence', ja: '検針記録は証跡になる' },
            body: { ko: 'START와 END의 날짜와 작업자를 따로 관리하고, END 지침이 START보다 작으면 저장하지 않습니다. 변경 이력과 현장당 최대 6장의 사진을 남깁니다.', en: 'START and END keep their own dates and workers, and an END reading lower than START is rejected. Change history and up to six photos per site are kept.', ja: 'STARTとENDの日付と作業者を別々に管理し、ENDの指針がSTARTより小さい場合は保存しません。変更履歴と現場ごとに最大6枚の写真を残します。' },
          },
          {
            title: { ko: '정산 자료는 함부로 바뀌지 않는다', en: 'Settled data stays settled', ja: '精算データはむやみに変わらない' },
            body: { ko: '관리자가 발급한 계정만 쓰고 첫 로그인 때 비밀번호를 바꾸게 합니다. 권한과 CSRF는 서버에서 검사하고, 확정·지급된 정산은 수정할 수 없습니다.', en: 'Only administrator-issued accounts exist, with a forced password change on first login. Roles and CSRF are enforced on the server, and confirmed or paid settlements are locked.', ja: '管理者が発行したアカウントだけを使い、初回ログイン時にパスワードを変更させます。権限とCSRFはサーバーで検証し、確定・支払済みの精算は変更できません。' },
          },
          {
            title: { ko: '무거운 문서 작업은 뒤에서', en: 'Heavy documents run in the background', ja: '重い文書処理はバックグラウンドで' },
            body: { ko: '사진이 들어간 HWPX 검침카드는 백그라운드에서 만들고 캐시합니다. 전체 ZIP 다운로드, 작업 취소와 생성물 정리를 지원합니다.', en: 'HWPX reading cards with photos are generated in the background and cached, with full ZIP downloads, cancellation and cleanup.', ja: '写真入りのHWPX検針カードはバックグラウンドで生成してキャッシュします。全体ZIPのダウンロード、処理のキャンセルと生成物の整理に対応しています。' },
          },
          {
            title: { ko: '같은 요청이 여러 번 와도 한 번만 반영', en: 'Repeated requests apply once', ja: '同じ要求が何度来ても反映は一度だけ' },
            body: { ko: '저장 버튼은 요청이 끝날 때까지 다시 실행되지 않습니다. 서버는 이미 등록된 검침 단계를 409로 거절하고, 다른 사람이 먼저 고친 검침은 버전 검사로 막습니다. 주소 변환과 문서 생성은 동시에 두 개가 돌지 않습니다.', en: 'Save buttons ignore repeat clicks until the request finishes. The server rejects an already-recorded reading phase with 409 and blocks edits to a reading someone else changed first through a version check. Address conversion and document generation never run twice at once.', ja: '保存ボタンはリクエストが終わるまで再実行されません。サーバーは登録済みの検針段階を409で拒否し、他の人が先に修正した検針はバージョン検査で防ぎます。住所変換と文書生成は同時に二つ動きません。' },
          },
        ]}/>
      </Section>

      <Section title={{ ko: '조회 성능 개선', en: 'Query performance', ja: '照会性能の改善' }}>
        {metrics}
        <Prose>{{ ko: '목록 한 페이지를 읽을 때 수용가마다 상세·사진·검침을 따로 조회하는 구조를 찾아, 페이지 단위로 한 번에 읽도록 바꿨습니다. 가상 데이터 2만 건으로 전후를 측정했습니다.', en: 'The list endpoint loaded each site’s details, photos and readings separately. I changed it to read a whole page in bulk and measured before and after on a 20,000-site synthetic dataset.', ja: '一覧の1ページを読む際に需要家ごとに詳細・写真・検針を個別に取得していた構造を見つけ、ページ単位でまとめて読むように変えました。仮想データ2万件で改善前後を測定しました。' }}</Prose>
        <a className="cs-more" href={`${base}/performance`}>{t({ ko: '성능 개선 기록 보기', en: 'Read the performance write-up', ja: '性能改善の記録を見る' })}<Arrow/></a>
      </Section>

      <Section title={{ ko: 'AI가 만든 코드에서 찾아 고친 문제', en: 'Defects I found in AI-written code', ja: 'AIが書いたコードで見つけて直した問題' }}>
        <Prose>{{ ko: '구현은 Codex가 맡고, 업무 규칙·데이터 보호 범위·배포와 PR 병합은 제가 결정했습니다. 운영 중 보고된 실패나 점검에서 찾은 문제는 먼저 실패하는 테스트로 재현한 뒤 고쳤습니다.', en: 'Codex wrote the implementation; business rules, data-protection scope, deployments and PR merges were my decisions. Failures reported in production or found in review were first reproduced as failing tests, then fixed.', ja: '実装はCodexが担当し、業務ルール・データ保護の範囲・デプロイとPRのマージは私が決めました。運用中に報告された失敗や点検で見つけた問題は、まず失敗するテストで再現してから修正しました。' }}</Prose>
        <Decisions items={[
          {
            title: { ko: '연결이 끊긴 순간의 중복 전송', en: 'Duplicate sends when the connection drops', ja: '接続が切れた瞬間の重複送信' },
            body: { ko: '현장에서 연결이 끊기면 전송 요청이 끝나지 않고, 같은 현장이 동시에 두 번 전송될 수 있었습니다. 수용가별 전송 잠금과 15초 제한을 넣고, 응답만 유실된 요청은 서버의 검침·사진과 대조해 다시 보내지 않게 했습니다. 브라우저에서 응답만 끊은 뒤 재연결해 중복 등록이 없는 것을 확인했습니다.', en: 'When the connection dropped on site, sends could hang and the same site could be sent twice at once. I added a per-site send lock and a 15-second timeout, and requests whose response was lost are now checked against the server’s readings and photos instead of being resent. I verified it by cutting only the response in the browser and reconnecting: no duplicate records.', ja: '現場で接続が切れると送信が終わらず、同じ現場が同時に二度送信されることがありました。需要家ごとの送信ロックと15秒の制限を入れ、応答だけが失われた要求はサーバーの検針・写真と照合して再送しないようにしました。ブラウザで応答だけを切って再接続し、重複登録がないことを確認しました。' },
          },
          {
            title: { ko: '외부 API 한 건의 실패가 배치 전체를 날림', en: 'One external API error discarded a whole batch', ja: '外部API一件の失敗がバッチ全体を消す' },
            body: { ko: 'NAVER 좌표 변환 중 한 건이 실패하면 이미 성공한 결과까지 사라졌습니다. 성공분은 저장하고 다음 묶음만 멈추게 바꿨고, 재시도는 502·503·504에만 최대 두 번으로 제한해 할당량 오류를 반복 호출하지 않게 했습니다.', en: 'During NAVER geocoding, one failed address threw away results that had already succeeded. Successful results are now saved and only the next batch stops; retries are limited to two attempts on 502, 503 and 504 so quota errors are never hammered.', ja: 'NAVERの座標変換中に一件が失敗すると、すでに成功した結果まで消えていました。成功分は保存して次のまとまりだけを止めるように変え、再試行は502・503・504に限り最大2回とし、割り当て超過エラーを繰り返し呼ばないようにしました。' },
          },
          {
            title: { ko: '특수문자 주소의 반복 실패', en: 'Addresses with special characters kept failing', ja: '特殊文字を含む住所の繰り返し失敗' },
            body: { ko: '특정 현장만 좌표 변환이 계속 실패했고, 주소의 중괄호가 URL 템플릿 변수로 해석되는 것이 원인이었습니다. 가상 주소로 실패를 재현한 뒤 주소를 값으로 인코딩하고, 한 건의 실패는 기록만 남기고 나머지는 계속 진행하게 했습니다.', en: 'Geocoding failed repeatedly for one site because braces in its address were parsed as URL template variables. I reproduced it with a synthetic address, encoded the address as a value, and made single-row failures get recorded while the batch continues.', ja: '特定の現場だけ座標変換が失敗し続け、住所の波括弧がURLテンプレートの変数として解釈されていたのが原因でした。仮の住所で失敗を再現してから住所を値としてエンコードし、一件の失敗は記録だけ残して残りは処理を続けるようにしました。' },
          },
          {
            title: { ko: '대용량 Excel 업로드 실패', en: 'Large Excel uploads failing', ja: '大容量Excelのアップロード失敗' },
            body: { ko: '28MB 최종본은 압축을 풀면 시트가 약 227MB였고, 파일 전체를 메모리에 읽는 경로에서 실패했습니다. 임시 파일로 열어 시트를 스트리밍하도록 바꿨고, 실제 파일로 1만 8천여 건 등록과 재업로드를 확인했습니다.', en: 'A 28 MB final workbook expands to about 227 MB of sheet XML and failed on a path that read the whole file into memory. It now opens a temporary file and streams the sheet; I confirmed import and re-import of over 18,000 rows with the real file.', ja: '28MBの最終版は展開するとシートが約227MBになり、ファイル全体をメモリに読む経路で失敗していました。一時ファイルで開いてシートをストリーミングするように変え、実ファイルで約1万8千件の登録と再アップロードを確認しました。' },
          },
        ]}/>
        <Flow steps={[
          { ko: '조사: 실제 코드와 측정으로 원인 확인', en: 'Inspect: confirm the cause in code and measurements', ja: '調査：実際のコードと測定で原因を確認' },
          { ko: '재현: 실패하는 테스트를 먼저 작성', en: 'Reproduce: write a failing test first', ja: '再現：失敗するテストを先に書く' },
          { ko: '변경: 최소 범위로 수정', en: 'Change: keep the fix minimal', ja: '変更：最小限の範囲で修正' },
          { ko: '검증: 전체 회귀 테스트와 같은 조건 재측정', en: 'Verify: full regression suite and the same benchmark again', ja: '検証：全回帰テストと同条件での再測定' },
          { ko: '검토: PR로 남기고 직접 리뷰 후 병합', en: 'Review: leave a PR, review it myself, then merge', ja: 'レビュー：PRに残し、自分でレビューしてからマージ' },
        ]}/>
      </Section>

    </> : <PerformanceContent metrics={metrics}/>}
  </CaseStudy>;
}

function PerformanceContent({ metrics }: { metrics: JSX.Element }) {
  const t = useT();
  const ms = (v: number) => v.toFixed(1);
  const head: L[] = [
    { ko: '시나리오', en: 'Scenario', ja: 'シナリオ' }, { ko: 'SQL 전 → 후', en: 'SQL before → after', ja: 'SQL 前 → 後' },
    { ko: 'p50 전 → 후 (ms)', en: 'p50 before → after (ms)', ja: 'p50 前 → 後 (ms)' }, { ko: 'p95 전 → 후 (ms)', en: 'p95 before → after (ms)', ja: 'p95 前 → 後 (ms)' },
  ];
  return <>
    <Section title={{ ko: '결과 요약', en: 'Summary', ja: '結果' }}>
      {metrics}
      <Prose>{{ ko: '가상 수용가 2만 건, Java 21과 PostgreSQL 17의 개발 환경에서 측정한 값입니다. 실제 운영 응답 시간과는 다를 수 있어, 환경에 덜 흔들리는 SQL 실행 수를 핵심 지표로 봤습니다.', en: 'Measured in a development environment with 20,000 synthetic sites on Java 21 and PostgreSQL 17. Because timings vary with the environment, the SQL call count is the primary result.', ja: '仮想の需要家2万件、Java 21とPostgreSQL 17の開発環境で測定した値です。実際の本番の応答時間とは異なる可能性があるため、環境に左右されにくいSQL実行回数を主な指標としました。' }}</Prose>
    </Section>

    <Section title={{ ko: '문제와 변경', en: 'Problem and change', ja: '問題と変更' }}>
      <Prose>{[
        { ko: '기존 목록은 전체 건수와 ID 목록을 읽은 뒤, 수용가마다 기본정보·사진·검침을 다시 조회했습니다. 그래서 SQL 실행 수가 2 + 3N으로 늘어났습니다.', en: 'The old list read the total count and the IDs, then queried details, photos and readings again for every site, so SQL calls grew as 2 + 3N.', ja: '以前の一覧は全件数とIDリストを読んだ後、需要家ごとに基本情報・写真・検針を再び取得していました。そのためSQL実行回数が2 + 3Nで増えていました。' },
        { ko: '캐시를 먼저 붙이지 않고, 현재 페이지의 ID로 사진 수와 검침을 한 번에 읽도록 바꿨습니다. 상세 화면과 같은 매핑을 써서 응답 형식을 유지하고, 작업자에게 금액과 정산 상태가 보이지 않는 규칙도 그대로 지켰습니다. Redis, 메시지 큐, DB 마이그레이션은 필요하지 않았습니다.', en: 'Instead of adding a cache, the page’s IDs are used to read photo counts and readings in bulk. The detail mapping is reused so responses stay identical, and workers still cannot see fees or settlement state. No Redis, message queue or schema migration was needed.', ja: 'キャッシュを先に導入せず、現在のページのIDで写真の件数と検針をまとめて読むように変えました。詳細画面と同じマッピングを使って応答形式を保ち、作業者に金額や精算状態が見えないルールもそのまま守りました。Redis、メッセージキュー、DBマイグレーションは不要でした。' },
      ]}</Prose>
    </Section>

    <Section title={{ ko: '측정 결과', en: 'Measurements', ja: '測定結果' }}>
      <figure className="cs-figure"><img src="/fieldwork/query-count.png" alt={t({ ko: 'SQL 실행 수: 20건 62에서 4회, 100건 302에서 4회', en: 'SQL calls: 62 to 4 for 20 rows, 302 to 4 for 100 rows', ja: 'SQL実行回数：20件で62回から4回、100件で302回から4回' })}/><figcaption>{t({ ko: '요청당 JDBC 실행 수', en: 'JDBC executions per request', ja: 'リクエストあたりのJDBC実行回数' })}</figcaption></figure>
      <figure className="cs-figure"><img src="/fieldwork/latency.png" alt={t({ ko: '목록 조회 개선 전후 응답 시간', en: 'List latency before and after', ja: '一覧取得の改善前後の応答時間' })}/><figcaption>{t({ ko: '같은 데이터·환경·측정 코드, 조회별 10~20회 측정', en: 'Same data, environment and harness; 10–20 samples per scenario', ja: '同じデータ・環境・測定コード、照会ごとに10〜20回測定' })}</figcaption></figure>
      <div className="cs-table"><table>
        <thead><tr>{head.map(h => <th key={h.en}>{t(h)}</th>)}</tr></thead>
        <tbody>{results.comparisons.map(r => <tr key={r.name}><th>{t({ ko: r.label, en: r.labelEn, ja: jaScenario[r.name] })}</th><td>{r.beforeSql} → {r.afterSql}</td><td>{ms(r.beforeP50)} → {ms(r.afterP50)}</td><td>{ms(r.beforeP95)} → {ms(r.afterP95)}</td></tr>)}</tbody>
      </table></div>
      <Prose>{{ ko: `동시 요청 10개로 목록을 100번 조회했을 때 p50은 ${ms(results.concurrent.beforeP50)}ms에서 ${ms(results.concurrent.afterP50)}ms로, p95는 ${ms(results.concurrent.beforeP95)}ms에서 ${ms(results.concurrent.afterP95)}ms로 줄었습니다.`, en: `With 10 concurrent clients making 100 list requests, p50 went from ${ms(results.concurrent.beforeP50)} to ${ms(results.concurrent.afterP50)} ms and p95 from ${ms(results.concurrent.beforeP95)} to ${ms(results.concurrent.afterP95)} ms.`, ja: `同時リクエスト10件で一覧を100回取得したとき、p50は${ms(results.concurrent.beforeP50)}msから${ms(results.concurrent.afterP50)}msに、p95は${ms(results.concurrent.beforeP95)}msから${ms(results.concurrent.afterP95)}msに短縮しました。` }}</Prose>
    </Section>

    <Section title={{ ko: '검증 방법', en: 'How it was verified', ja: '検証方法' }}>
      <Bullets items={[
        { ko: '변경 전 최신 코드로 다시 측정하고, 전후 원본 데이터를 모두 보관했습니다.', en: 'Re-measured the latest code before the change and kept raw data for both runs.', ja: '変更前の最新コードで改めて測定し、前後の生データをすべて保管しました。' },
        { ko: '쿼리 수 상한 테스트가 실패하는 것을 먼저 확인한 뒤, 1·20·100건 모두 4회 이하임을 검증했습니다.', en: 'Saw the query-budget tests fail first, then verified at most four queries for 1, 20 and 100 rows.', ja: 'クエリ数上限テストが失敗することを先に確認し、1・20・100件のいずれも4回以下であることを検証しました。' },
        { ko: '관리자와 작업자 각각 목록과 상세 응답을 비교하고, 필터·정렬·빈 페이지를 확인했습니다.', en: 'Compared list and detail responses for both roles, including filters, ordering and empty pages.', ja: '管理者と作業者それぞれで一覧と詳細の応答を比較し、フィルター・並び順・空のページを確認しました。' },
        { ko: `PostgreSQL 회귀 테스트 ${results.tests}개와 JAR 빌드를 통과했습니다.`, en: `Passed all ${results.tests} PostgreSQL regression tests and the JAR build.`, ja: `PostgreSQL回帰テスト${results.tests}件とJARビルドを通過しました。` },
      ]}/>
      <p className="cs-note">{t({ ko: '조건: CPU 2개, JVM 힙 768MiB, 커넥션 풀 10, START 1만·END 5천 건. 서비스와 JSON 직렬화까지 측정했고 HTTP·인증 필터·Cloudflare는 제외했습니다. 공개 자료는 모두 가상 데이터입니다.', en: 'Conditions: 2 CPUs, 768 MiB JVM heap, pool size 10, 10k START and 5k END records. Service and JSON serialization were measured; HTTP filters and Cloudflare were excluded. All published data is synthetic.', ja: '条件：CPU 2個、JVMヒープ768MiB、コネクションプール10、START 1万件・END 5千件。サービスとJSONシリアライズまでを測定し、HTTP・認証フィルター・Cloudflareは除外しました。公開資料はすべて仮想データです。' })}</p>
    </Section>

    <Section title={{ ko: '자료', en: 'Materials', ja: '資料' }}>
      <div className="cs-inline-links">
        <a href={results.pullRequestUrl || source} target="_blank" rel="noreferrer">{t({ ko: '성능 개선 PR', en: 'Pull request', ja: '性能改善のPR' })} ↗</a>
        <a href="/fieldwork/report.pdf" target="_blank" rel="noreferrer">{t({ ko: '측정 리포트 PDF', en: 'Report PDF', ja: '測定レポートPDF' })} ↗</a>
        <a href="/fieldwork/before.json" target="_blank" rel="noreferrer">Before JSON ↗</a>
        <a href="/fieldwork/after.json" target="_blank" rel="noreferrer">After JSON ↗</a>
      </div>
    </Section>
  </>;
}
